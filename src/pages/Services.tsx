import { Link } from 'react-router-dom';
import {
    Globe,
    Smartphone,
    Code2,
    Layers,
    ArrowRight,
    CheckCircle2,
    Server,
    Database,
    Paintbrush,
    ShoppingCart,
    BarChart3,
    Users,
    Settings,
    Wrench,
    Sparkles,
    Zap,
    MessageCircle,
    Bot,
} from 'lucide-react';

// UI Components
import ScrollReveal from '../components/ui/ScrollReveal';
import TechStack from '../components/ui/TechStack';
import { FloatingShapes } from '../components/ui/FloatingElement';

const services = [
    {
        id: 'web-dev',
        icon: Globe,
        title: 'Website Development',
        description: 'Create stunning, responsive websites that drive conversions and establish your online presence.',
        color: 'from-blue-500 to-cyan-500',
        borderColor: 'hover:border-blue-500/50',
        features: [
            { icon: Paintbrush, text: 'Custom UI/UX Design' },
            { icon: Server, text: 'Responsive Development' },
            { icon: BarChart3, text: 'SEO Optimization' },
            { icon: Settings, text: 'CMS Integration' },
        ],
        offerings: [
            'Business Websites',
            'Landing Pages',
            'E-commerce Stores',
            'Portfolio Sites',
            'Blog Platforms',
            'Corporate Websites',
        ],
        pricing: 'Starting from ₹15,000',
    },
    {
        id: 'saas',
        icon: Layers,
        title: 'SaaS Applications',
        description: 'Build scalable software-as-a-service products with modern architecture and powerful features.',
        color: 'from-primary-500 to-accent-500',
        borderColor: 'hover:border-primary-500/50',
        features: [
            { icon: Database, text: 'Database Design' },
            { icon: Users, text: 'User Management' },
            { icon: BarChart3, text: 'Analytics Dashboard' },
            { icon: Settings, text: 'API Development' },
        ],
        offerings: [
            'Custom SaaS Products',
            'Admin Dashboards',
            'Subscription Platforms',
            'Multi-tenant Systems',
            'Billing Integration',
            'API Development',
        ],
        pricing: 'Starting from ₹50,000',
    },
    {
        id: 'android',
        icon: Smartphone,
        title: 'Android Applications',
        description: 'Native and cross-platform mobile apps that deliver exceptional user experiences on any device.',
        color: 'from-purple-500 to-pink-500',
        borderColor: 'hover:border-purple-500/50',
        features: [
            { icon: Paintbrush, text: 'Material Design' },
            { icon: Server, text: 'Offline Support' },
            { icon: Settings, text: 'Push Notifications' },
            { icon: Database, text: 'Cloud Sync' },
        ],
        offerings: [
            'Native Android Apps',
            'Cross-Platform Apps',
            'E-commerce Apps',
            'Social Applications',
            'Utility Apps',
            'Enterprise Apps',
        ],
        pricing: 'Starting from ₹40,000',
    },
    {
        id: 'custom',
        icon: Code2,
        title: 'Custom Web Solutions',
        description: 'Tailor-made software solutions designed to meet your unique business requirements.',
        color: 'from-orange-500 to-red-500',
        borderColor: 'hover:border-orange-500/50',
        features: [
            { icon: Wrench, text: 'Custom Development' },
            { icon: Database, text: 'System Integration' },
            { icon: Server, text: 'Automation Tools' },
            { icon: ShoppingCart, text: 'E-commerce Solutions' },
        ],
        offerings: [
            'REST APIs',
            'Payment Integrations',
            'CRM Systems',
            'Automation Scripts',
            'Data Migration',
            'Third-party Integrations',
        ],
        pricing: 'Custom Quote',
    },
    {
        id: 'whatsapp-bot',
        icon: MessageCircle,
        title: 'WhatsApp Bot Solutions',
        description: 'AI-powered WhatsApp bots for automating orders, customer support, and business operations.',
        color: 'from-green-500 to-emerald-500',
        borderColor: 'hover:border-green-500/50',
        features: [
            { icon: Bot, text: 'AI-Powered Responses' },
            { icon: ShoppingCart, text: 'Order Management' },
            { icon: Users, text: 'Customer Support' },
            { icon: Settings, text: 'Business Automation' },
        ],
        offerings: [
            'Order Placing Bot',
            'AI Customer Support',
            'Appointment Booking',
            'Product Catalog Bot',
            'FAQ Automation',
            'Lead Generation Bot',
        ],
        pricing: 'Starting from ₹25,000',
    },
];

const benefits = [
    {
        icon: Sparkles,
        title: 'Premium Quality',
        description: 'Every project is crafted with attention to detail and industry best practices.',
    },
    {
        icon: Zap,
        title: 'Fast Delivery',
        description: 'We understand the importance of time-to-market and deliver on schedule.',
    },
    {
        icon: Users,
        title: 'Dedicated Support',
        description: 'Our team provides ongoing support and maintenance for all projects.',
    },
];

export default function Services() {
    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <section className="relative py-20 lg:py-32">
                <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950" />
                <FloatingShapes />

                <div className="container-custom relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <ScrollReveal>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                                <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
                                <span className="text-sm text-dark-300">End-to-End Solutions</span>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={100}>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display mb-6">
                                <span className="text-white">Our </span>
                                <span className="text-gradient">Services</span>
                            </h1>
                        </ScrollReveal>

                        <ScrollReveal delay={200}>
                            <p className="text-lg text-dark-300 mb-8">
                                From concept to deployment, we deliver end-to-end digital solutions that transform your business vision into reality.
                            </p>
                        </ScrollReveal>

                        <ScrollReveal delay={300}>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link to="/calculator" className="btn-primary group">
                                    Get Instant Quote
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link to="/contact" className="btn-secondary">
                                    Discuss Your Project
                                </Link>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Benefits Bar */}
            <section className="py-12 border-y border-dark-800">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {benefits.map((benefit, index) => (
                            <ScrollReveal key={benefit.title} delay={index * 100}>
                                <div className="flex items-center gap-4 justify-center md:justify-start">
                                    <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                                        <benefit.icon className="w-6 h-6 text-primary-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold">{benefit.title}</h4>
                                        <p className="text-dark-400 text-sm">{benefit.description}</p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Detail Section */}
            <section className="section">
                <div className="container-custom space-y-32">
                    {services.map((service, index) => (
                        <ScrollReveal key={service.id}>
                            <div
                                id={service.id}
                                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`}
                            >
                                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                                    <ScrollReveal direction={index % 2 === 0 ? 'left' : 'right'}>
                                        <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 shadow-lg shadow-primary-500/20`}>
                                            <service.icon className="w-10 h-10 text-white" />
                                        </div>

                                        <h2 className="text-3xl sm:text-4xl font-bold font-display text-white mb-4">
                                            {service.title}
                                        </h2>

                                        <p className="text-dark-300 text-lg mb-6">{service.description}</p>

                                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 mb-8">
                                            <span className="text-primary-400 font-semibold">{service.pricing}</span>
                                        </div>

                                        {/* Features */}
                                        <div className="grid grid-cols-2 gap-4 mb-8">
                                            {service.features.map((feature, fIndex) => (
                                                <ScrollReveal key={feature.text} delay={fIndex * 100}>
                                                    <div className="flex items-center gap-3 group">
                                                        <div className="w-10 h-10 rounded-xl bg-dark-800 flex items-center justify-center group-hover:bg-primary-500/20 transition-colors">
                                                            <feature.icon className="w-5 h-5 text-primary-400" />
                                                        </div>
                                                        <span className="text-dark-300 text-sm group-hover:text-white transition-colors">
                                                            {feature.text}
                                                        </span>
                                                    </div>
                                                </ScrollReveal>
                                            ))}
                                        </div>

                                        <Link
                                            to="/contact"
                                            className="btn-primary inline-flex group"
                                        >
                                            Start Project
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </ScrollReveal>
                                </div>

                                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                                    <ScrollReveal direction={index % 2 === 0 ? 'right' : 'left'}>
                                        <div className={`glass rounded-3xl p-8 ${service.borderColor} transition-colors`}>
                                            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                                                <CheckCircle2 className="w-6 h-6 text-primary-500" />
                                                What We Offer
                                            </h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {service.offerings.map((offering, oIndex) => (
                                                    <ScrollReveal key={offering} delay={oIndex * 50}>
                                                        <div className="flex items-center gap-3 group">
                                                            <div className="w-2 h-2 rounded-full bg-primary-500 group-hover:scale-150 transition-transform" />
                                                            <span className="text-dark-300 group-hover:text-white transition-colors">
                                                                {offering}
                                                            </span>
                                                        </div>
                                                    </ScrollReveal>
                                                ))}
                                            </div>
                                        </div>
                                    </ScrollReveal>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            {/* Tech Stack */}
            <section className="py-16 bg-dark-900/30">
                <div className="container-custom mb-8">
                    <ScrollReveal>
                        <div className="text-center">
                            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mb-4">
                                Technologies We Use
                            </h2>
                            <p className="text-dark-400">Modern tech stack for modern solutions</p>
                        </div>
                    </ScrollReveal>
                </div>
                <TechStack />
            </section>

            {/* CTA Section */}
            <section className="section">
                <div className="container-custom">
                    <ScrollReveal>
                        <div className="glass rounded-3xl p-8 lg:p-12 text-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl" />

                            <div className="relative z-10">
                                <h2 className="text-3xl sm:text-4xl font-bold font-display mb-4">
                                    <span className="text-white">Ready to </span>
                                    <span className="text-gradient">Get Started?</span>
                                </h2>
                                <p className="text-dark-300 text-lg max-w-2xl mx-auto mb-8">
                                    Use our cost calculator for an instant estimate, or contact us to discuss your project in detail.
                                </p>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <Link to="/calculator" className="btn-primary text-lg px-8 group">
                                        Cost Calculator
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <Link to="/contact" className="btn-outline text-lg px-8">
                                        Contact Us
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </div>
    );
}
