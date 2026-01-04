-- =====================================================
-- STACHBIT WEBSITE - NEW TABLES FOR STACHBIT.IN
-- =====================================================
-- Run this in Supabase SQL Editor to add tables for the main website
-- =====================================================

-- =====================================================
-- WEBSITE INQUIRIES TABLE (Contact Form Submissions)
-- =====================================================

CREATE TABLE IF NOT EXISTS website_inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    service_interest VARCHAR(100), -- 'web_dev', 'saas', 'android', 'custom'
    budget_range VARCHAR(50),
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'new', -- 'new', 'contacted', 'in_progress', 'completed'
    admin_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- SERVICE PACKAGES TABLE (Cost Calculator Data)
-- =====================================================

CREATE TABLE IF NOT EXISTS service_packages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_type VARCHAR(100) NOT NULL, -- 'web_dev', 'saas', 'android', 'custom'
    name VARCHAR(255) NOT NULL,
    description TEXT,
    base_price DECIMAL(10, 2) NOT NULL,
    features JSONB DEFAULT '[]',
    delivery_days INTEGER,
    is_popular BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- PORTFOLIO PROJECTS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS portfolio_projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    service_type VARCHAR(100), -- 'web_dev', 'saas', 'android', 'custom'
    client_name VARCHAR(255),
    image_url TEXT,
    project_url TEXT,
    technologies TEXT[],
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_website_inquiries_status ON website_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_website_inquiries_service ON website_inquiries(service_interest);
CREATE INDEX IF NOT EXISTS idx_website_inquiries_created ON website_inquiries(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_service_packages_type ON service_packages(service_type);
CREATE INDEX IF NOT EXISTS idx_service_packages_active ON service_packages(is_active);

CREATE INDEX IF NOT EXISTS idx_portfolio_projects_type ON portfolio_projects(service_type);
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_featured ON portfolio_projects(is_featured);
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_order ON portfolio_projects(display_order);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS
ALTER TABLE website_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;

-- Website Inquiries: Anyone can insert, only admin can view/update
CREATE POLICY "Anyone can submit inquiries" ON website_inquiries
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all inquiries" ON website_inquiries
    FOR SELECT USING (is_admin());

CREATE POLICY "Admins can manage inquiries" ON website_inquiries
    FOR ALL USING (is_admin());

-- Service Packages: Anyone can view active, only admin can modify
CREATE POLICY "Anyone can view active packages" ON service_packages
    FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage packages" ON service_packages
    FOR ALL USING (is_admin());

-- Portfolio Projects: Anyone can view active, only admin can modify
CREATE POLICY "Anyone can view active projects" ON portfolio_projects
    FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage portfolio" ON portfolio_projects
    FOR ALL USING (is_admin());

-- =====================================================
-- TRIGGER FOR UPDATED_AT
-- =====================================================

CREATE TRIGGER update_website_inquiries_updated_at
    BEFORE UPDATE ON website_inquiries
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =====================================================
-- INSERT SAMPLE SERVICE PACKAGES (Optional)
-- =====================================================

-- Uncomment below to add sample packages for the cost calculator
/*
INSERT INTO service_packages (service_type, name, description, base_price, features, delivery_days, is_popular) VALUES
('web_dev', 'Basic', 'Simple business website', 15000, '["5 pages", "Responsive design", "Contact form"]', 7, false),
('web_dev', 'Professional', 'Advanced website with CMS', 35000, '["10 pages", "CMS integration", "SEO basics", "Analytics"]', 14, true),
('web_dev', 'Enterprise', 'Full-featured web platform', 75000, '["Unlimited pages", "Custom features", "API integration", "Priority support"]', 30, false),
('saas', 'MVP', 'Minimum viable product', 50000, '["Core features", "User auth", "Basic dashboard"]', 21, false),
('saas', 'Standard', 'Production-ready SaaS', 100000, '["Full features", "Admin panel", "Analytics", "Email notifications"]', 45, true),
('saas', 'Enterprise', 'Enterprise SaaS platform', 200000, '["Advanced features", "Multi-tenancy", "API access", "Custom integrations"]', 90, false);
*/

-- =====================================================
-- DONE! New tables are ready.
-- =====================================================
