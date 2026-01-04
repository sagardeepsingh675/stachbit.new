import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Supabase configuration - uses same database as tootle (ai.stachbit.in)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!import.meta.env.VITE_SUPABASE_URL) {
    console.warn('⚠️ Supabase URL not configured. Please add VITE_SUPABASE_URL to your .env file');
}

if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
    console.warn('⚠️ Supabase Anon Key not configured. Please add VITE_SUPABASE_ANON_KEY to your .env file');
}

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        autoRefreshToken: true,
        persistSession: true,
    },
});

// Types for website-specific tables
export interface WebsiteInquiry {
    id: string;
    name: string;
    email: string;
    phone?: string;
    company?: string;
    service_interest?: 'web_dev' | 'saas' | 'android' | 'custom';
    budget_range?: string;
    message: string;
    status: 'new' | 'contacted' | 'in_progress' | 'completed';
    admin_notes?: string;
    created_at: string;
    updated_at: string;
}

export interface ServicePackage {
    id: string;
    service_type: 'web_dev' | 'saas' | 'android' | 'custom';
    name: string;
    description?: string;
    base_price: number;
    features: string[];
    delivery_days?: number;
    is_popular: boolean;
    is_active: boolean;
    created_at: string;
}

export interface PortfolioProject {
    id: string;
    title: string;
    description?: string;
    service_type?: string;
    client_name?: string;
    image_url?: string;
    project_url?: string;
    technologies: string[];
    is_featured: boolean;
    is_active: boolean;
    display_order: number;
    created_at: string;
}

// Submit contact form inquiry
export const submitInquiry = async (inquiry: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    service_interest?: string;
    budget_range?: string;
    message: string;
}) => {
    const { data, error } = await supabase
        .from('website_inquiries')
        .insert(inquiry)
        .select()
        .single();
    return { data: data as WebsiteInquiry | null, error };
};

// Get service packages for cost calculator
export const getServicePackages = async (serviceType?: string) => {
    let query = supabase
        .from('service_packages')
        .select('*')
        .eq('is_active', true)
        .order('base_price', { ascending: true });

    if (serviceType) {
        query = query.eq('service_type', serviceType);
    }

    const { data, error } = await query;
    return { data: data as ServicePackage[] | null, error };
};

// Get portfolio projects
export const getPortfolioProjects = async (options?: {
    serviceType?: string;
    featured?: boolean;
}) => {
    let query = supabase
        .from('portfolio_projects')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

    if (options?.serviceType) {
        query = query.eq('service_type', options.serviceType);
    }

    if (options?.featured) {
        query = query.eq('is_featured', true);
    }

    const { data, error } = await query;
    return { data: data as PortfolioProject[] | null, error };
};

// Get site settings (reuse from main database)
export const getSiteSettings = async () => {
    const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('is_public', true);

    if (error) return { data: null, error };

    const settings: Record<string, string> = {};
    if (data) {
        data.forEach((setting: { key: string; value: string | null }) => {
            settings[setting.key] = setting.value || '';
        });
    }

    return { data: settings, error: null };
};

// Blog Types
export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    featured_image: string | null;
    author_name: string;
    category: string | null;
    tags: string[];
    meta_title: string | null;
    meta_description: string | null;
    meta_keywords: string | null;
    og_image: string | null;
    is_published: boolean;
    is_featured: boolean;
    view_count: number;
    read_time_minutes: number;
    published_at: string | null;
    created_at: string;
    updated_at: string;
}

// Get published blog posts
export const getPublishedBlogs = async (options?: {
    category?: string;
    featured?: boolean;
    limit?: number;
    offset?: number;
}) => {
    let query = supabase
        .from('blog_posts')
        .select('*', { count: 'exact' })
        .eq('is_published', true)
        .order('published_at', { ascending: false });

    if (options?.category) {
        query = query.eq('category', options.category);
    }

    if (options?.featured) {
        query = query.eq('is_featured', true);
    }

    if (options?.limit) {
        query = query.limit(options.limit);
    }

    if (options?.offset) {
        query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
    }

    const { data, error, count } = await query;
    return { data: data as BlogPost[] | null, error, count };
};

// Get single blog post by slug
export const getBlogBySlug = async (slug: string) => {
    const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();

    return { data: data as BlogPost | null, error };
};

// Record blog view for analytics
export const recordBlogView = async (blogId: string, referrer?: string) => {
    // Record detailed view
    const { error } = await supabase.from('blog_views').insert({
        blog_id: blogId,
        referrer: referrer || null,
        user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
    });

    return { error };
};

// Get blog categories for filtering
export const getBlogCategories = async () => {
    const { data, error } = await supabase
        .from('blog_posts')
        .select('category')
        .eq('is_published', true)
        .not('category', 'is', null);

    if (error) return { data: null, error };

    // Extract unique categories
    const categories = [...new Set(data?.map((d) => d.category).filter(Boolean))];
    return { data: categories as string[], error: null };
};

// ===== Contact Settings (Public Read) =====
export interface ContactSettings {
    contact_email: string;
    contact_phone: string;
    contact_location: string;
    contact_address: string;
    response_time: string;
    whatsapp_number: string;
    business_hours: string;
    support_email: string;
}

export const getContactSettings = async (): Promise<ContactSettings> => {
    const { data, error } = await supabase
        .from('site_contact_settings')
        .select('setting_key, setting_value')
        .eq('is_active', true);

    if (error || !data) {
        // Return defaults
        return {
            contact_email: 'hello@stachbit.in',
            contact_phone: '+91 98765 43210',
            contact_location: 'India',
            contact_address: '',
            response_time: 'Within 24 hours',
            whatsapp_number: '+919876543210',
            business_hours: 'Mon-Fri: 9AM - 6PM IST',
            support_email: 'support@stachbit.in',
        };
    }

    const settings: Record<string, string> = {};
    data.forEach((item: { setting_key: string; setting_value: string | null }) => {
        settings[item.setting_key] = item.setting_value || '';
    });

    return {
        contact_email: settings.contact_email || 'hello@stachbit.in',
        contact_phone: settings.contact_phone || '+91 98765 43210',
        contact_location: settings.contact_location || 'India',
        contact_address: settings.contact_address || '',
        response_time: settings.response_time || 'Within 24 hours',
        whatsapp_number: settings.whatsapp_number || '+919876543210',
        business_hours: settings.business_hours || 'Mon-Fri: 9AM - 6PM IST',
        support_email: settings.support_email || 'support@stachbit.in',
    };
};

export interface SocialLinks {
    twitter: string;
    facebook: string;
    instagram: string;
    linkedin: string;
    youtube: string;
    github: string;
}

export const getSocialLinks = async (): Promise<SocialLinks> => {
    const { data, error } = await supabase
        .from('site_social_links')
        .select('platform, url')
        .eq('is_active', true);

    if (error || !data) {
        return {
            twitter: '',
            facebook: '',
            instagram: '',
            linkedin: '',
            youtube: '',
            github: '',
        };
    }

    const links: Record<string, string> = {};
    data.forEach((item: { platform: string; url: string | null }) => {
        links[item.platform] = item.url || '';
    });

    return {
        twitter: links.twitter || '',
        facebook: links.facebook || '',
        instagram: links.instagram || '',
        linkedin: links.linkedin || '',
        youtube: links.youtube || '',
        github: links.github || '',
    };
};

export default supabase;
