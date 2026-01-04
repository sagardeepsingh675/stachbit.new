import { Link } from 'react-router-dom';
import {
    Globe,
    Smartphone,
    Code2,
    Layers,
    ArrowRight,
    Sparkles,
    Zap,
    Shield,
    Clock,
    Users,
    CheckCircle2,
    Play,
    Star,
} from 'lucide-react';

// UI Components
import AnimatedCounter from '../components/ui/AnimatedCounter';
import ScrollReveal from '../components/ui/ScrollReveal';
import TestimonialCarousel from '../components/ui/TestimonialCarousel';
import TechStack from '../components/ui/TechStack';
import { FloatingShapes } from '../components/ui/FloatingElement';

const services = [
    {
        icon: Globe,
        title: 'Website Development',
        description: 'Modern, responsive websites that convert visitors into customers. From landing pages to complex web apps.',
        color: 'from-blue-500 to-cyan-500',
        bgColor: 'bg-blue-500/10',
    },
    {
        icon: Layers,
        title: 'SaaS Applications',
        description: 'Scalable SaaS products with powerful dashboards, user management, and billing integrations.',
        color: 'from-primary-500 to-accent-500',
        bgColor: 'bg-primary-500/10',
    },
    {
        icon: Smartphone,
        title: 'Android Apps',
        description: 'Native and cross-platform mobile applications that deliver exceptional user experiences.',
        color: 'from-purple-500 to-pink-500',
        bgColor: 'bg-purple-500/10',
    },
    {
        icon: Code2,
        title: 'Custom Solutions',
        description: 'APIs, integrations, automation tools, and bespoke software tailored to your specific needs.',
        color: 'from-orange-500 to-red-500',
        bgColor: 'bg-orange-500/10',
    },
];

const features = [
    {
        icon: Sparkles,
        title: 'Modern Design',
        description: 'Stunning interfaces that captivate users and drive engagement.',
    },
    {
        icon: Zap,
        title: 'Lightning Fast',
        description: 'Optimized for speed with sub-second load times.',
    },
    {
        icon: Shield,
        title: 'Secure & Reliable',
        description: 'Enterprise-grade security built into every project.',
    },
    {
        icon: Clock,
        title: 'On-Time Delivery',
        description: 'We respect deadlines and deliver as promised.',
    },
];

const stats = [
    { value: 50, suffix: '+', label: 'Projects Delivered' },
    { value: 25, suffix: '+', label: 'Happy Clients' },
    { value: 99, suffix: '%', label: 'Client Satisfaction' },
    { value: 24, suffix: '/7', label: 'Support Available' },
];

const processSteps = [
    {
        step: '01',
        title: 'Discovery',
        description: 'We dive deep into your requirements, goals, and target audience.',
    },
    {
        step: '02',
        title: 'Design',
        description: 'Creating stunning visuals and intuitive user experiences.',
    },
    {
        step: '03',
        title: 'Development',
        description: 'Building with cutting-edge technology and best practices.',
    },
    {
        step: '04',
        title: 'Delivery',
        description: 'Rigorous testing, deployment, and ongoing support.',
    },
];

export default function Landing() {
    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center py-20 lg:py-32">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950" />
                <FloatingShapes />

                <div className="container-custom relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="text-center lg:text-left">
                            {/* Badge */}
                            <ScrollReveal direction="fade">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
                                    <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
                                    <span className="text-sm text-dark-300">Transforming Ideas into Digital Reality</span>
                                </div>
                            </ScrollReveal>

                            {/* Headline */}
                            <ScrollReveal delay={100}>
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold font-display mb-6 leading-tight">
                                    <span className="text-white">Build Your </span>
                                    <span className="text-gradient">Digital Future</span>
                                    <span className="text-white"> With Us</span>
                                </h1>
                            </ScrollReveal>

                            {/* Subheadline */}
                            <ScrollReveal delay={200}>
                                <p className="text-lg sm:text-xl text-dark-300 mb-10 max-w-xl mx-auto lg:mx-0">
                                    We create stunning websites, powerful SaaS applications, and mobile apps that help businesses thrive in the digital age.
                                </p>
                            </ScrollReveal>

                            {/* CTA Buttons */}
                            <ScrollReveal delay={300}>
                                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
                                    <Link to="/contact" className="btn-primary text-lg px-8 py-4 group">
                                        Start Your Project
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <Link to="/portfolio" className="btn-secondary text-lg px-8 py-4 group">
                                        <Play className="w-5 h-5" />
                                        View Our Work
                                    </Link>
                                </div>
                            </ScrollReveal>

                            {/* Trust indicators */}
                            <ScrollReveal delay={400}>
                                <div className="flex items-center justify-center lg:justify-start gap-4 text-dark-400">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div
                                                key={i}
                                                className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 border-2 border-dark-900"
                                            />
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <div className="flex">
                                            {[1, 2, 3, 4, 5].map((i) => (
                                                <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                            ))}
                                        </div>
                                        <span className="text-sm">from 25+ happy clients</span>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>

                        {/* Hero Image */}
                        <ScrollReveal direction="right" delay={200}>
                            <div className="relative">
                                <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-primary-500/10">
                                    <img
                                        src="/images/hero-illustration.png"
                                        alt="Digital Agency Illustration"
                                        className="w-full h-auto object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-dark-950/50 to-transparent" />
                                </div>

                                {/* Floating stats cards */}
                                <div className="absolute -bottom-6 -left-6 glass rounded-2xl p-4 animate-float">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center">
                                            <Zap className="w-6 h-6 text-primary-400" />
                                        </div>
                                        <div>
                                            <div className="text-xl font-bold text-white">99%</div>
                                            <div className="text-xs text-dark-400">Client Satisfaction</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute -top-4 -right-4 glass rounded-2xl p-4 animate-float" style={{ animationDelay: '1s' }}>
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl bg-accent-500/20 flex items-center justify-center">
                                            <Globe className="w-6 h-6 text-accent-400" />
                                        </div>
                                        <div>
                                            <div className="text-xl font-bold text-white">50+</div>
                                            <div className="text-xs text-dark-400">Projects Delivered</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 rounded-full border-2 border-dark-500 flex items-start justify-center p-2">
                        <div className="w-1 h-2 bg-primary-500 rounded-full animate-pulse" />
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 relative">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />
                <div className="container-custom">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <ScrollReveal key={stat.label} delay={index * 100}>
                                <div className="text-center group">
                                    <div className="text-4xl sm:text-5xl font-bold text-gradient mb-2">
                                        <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                                    </div>
                                    <div className="text-dark-400 group-hover:text-dark-300 transition-colors">
                                        {stat.label}
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />
            </section>

            {/* Tech Stack Marquee */}
            <section className="py-12 bg-dark-900/30">
                <div className="container-custom mb-8 text-center">
                    <ScrollReveal>
                        <p className="text-dark-400 text-sm uppercase tracking-wider">Technologies We Master</p>
                    </ScrollReveal>
                </div>
                <TechStack />
            </section>

            {/* Services Section */}
            <section className="section">
                <div className="container-custom">
                    <ScrollReveal>
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 mb-4">
                                <span className="text-sm text-primary-400 font-medium">Our Services</span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display mb-4">
                                <span className="text-white">What We </span>
                                <span className="text-gradient">Build</span>
                            </h2>
                            <p className="text-dark-400 text-lg max-w-2xl mx-auto">
                                From concept to launch, we create digital products that drive business growth
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {services.map((service, index) => (
                            <ScrollReveal key={service.title} delay={index * 100}>
                                <div className="card group hover:scale-[1.02] hover:border-primary-500/50 cursor-pointer h-full">
                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary-500/25 transition-all duration-300`}>
                                        <service.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gradient transition-all">
                                        {service.title}
                                    </h3>
                                    <p className="text-dark-400 mb-4">{service.description}</p>
                                    <Link
                                        to="/services"
                                        className="inline-flex items-center gap-2 text-primary-400 font-medium group-hover:gap-3 transition-all"
                                    >
                                        Learn More <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="section bg-dark-900/50">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <ScrollReveal direction="left">
                            <div>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 mb-4">
                                    <span className="text-sm text-accent-400 font-medium">Why Choose Us</span>
                                </div>
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display mb-6">
                                    <span className="text-white">Built for </span>
                                    <span className="text-gradient">Excellence</span>
                                </h2>
                                <p className="text-dark-400 text-lg mb-8">
                                    We combine cutting-edge technology with creative design to deliver solutions that exceed expectations.
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {features.map((feature, index) => (
                                        <ScrollReveal key={feature.title} delay={index * 100}>
                                            <div className="flex items-start gap-4 group">
                                                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-500/20 group-hover:scale-110 transition-all">
                                                    <feature.icon className="w-6 h-6 text-primary-400" />
                                                </div>
                                                <div>
                                                    <h4 className="text-white font-semibold mb-1">{feature.title}</h4>
                                                    <p className="text-dark-400 text-sm">{feature.description}</p>
                                                </div>
                                            </div>
                                        </ScrollReveal>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal direction="right">
                            <div className="relative">
                                <div className="glass rounded-3xl p-8">
                                    <div className="text-center mb-8">
                                        <h3 className="text-2xl font-bold text-white mb-2">Ready to Start?</h3>
                                        <p className="text-dark-400">Get an instant estimate for your project</p>
                                    </div>
                                    <div className="space-y-4">
                                        <Link to="/calculator" className="btn-primary w-full justify-center text-lg">
                                            Use Cost Calculator
                                            <ArrowRight className="w-5 h-5" />
                                        </Link>
                                        <Link to="/contact" className="btn-outline w-full justify-center">
                                            Contact Us
                                        </Link>
                                    </div>
                                </div>

                                {/* Decorative elements */}
                                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-2xl -z-10 animate-float blur-xl" />
                                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-accent-500/20 to-primary-500/20 rounded-xl -z-10 animate-float blur-xl" style={{ animationDelay: '0.5s' }} />
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="section">
                <div className="container-custom">
                    <ScrollReveal>
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 mb-4">
                                <span className="text-sm text-primary-400 font-medium">Our Process</span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display mb-4">
                                <span className="text-white">How We </span>
                                <span className="text-gradient">Work</span>
                            </h2>
                            <p className="text-dark-400 text-lg max-w-2xl mx-auto">
                                A streamlined process that ensures quality delivery every time
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {processSteps.map((step, index) => (
                            <ScrollReveal key={step.step} delay={index * 150}>
                                <div className="relative group">
                                    <div className="card h-full hover:border-primary-500/30">
                                        <div className="text-6xl font-bold text-gradient opacity-20 mb-4 group-hover:opacity-40 transition-opacity">
                                            {step.step}
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                                        <p className="text-dark-400 text-sm">{step.description}</p>
                                    </div>
                                    {/* Connector line */}
                                    {index < processSteps.length - 1 && (
                                        <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-primary-500/50 to-transparent" />
                                    )}
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="section bg-dark-900/50">
                <div className="container-custom">
                    <ScrollReveal>
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 mb-4">
                                <span className="text-sm text-accent-400 font-medium">Testimonials</span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display mb-4">
                                <span className="text-white">What Our </span>
                                <span className="text-gradient">Clients Say</span>
                            </h2>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal>
                        <TestimonialCarousel />
                    </ScrollReveal>
                </div>
            </section>

            {/* AI Tool CTA Section */}
            <section className="section bg-gradient-to-r from-primary-900/50 via-dark-900 to-accent-900/50">
                <div className="container-custom">
                    <ScrollReveal>
                        <div className="glass rounded-3xl p-8 lg:p-12 text-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl" />

                            <div className="relative z-10">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 mb-6">
                                    <Zap className="w-4 h-4 text-primary-400" />
                                    <span className="text-sm text-primary-400 font-medium">AI-Powered Tool</span>
                                </div>

                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display mb-4">
                                    <span className="text-white">Find Leads </span>
                                    <span className="text-gradient">Automatically</span>
                                </h2>

                                <p className="text-dark-300 text-lg max-w-2xl mx-auto mb-8">
                                    Our AI-powered lead generation tool helps you discover businesses that need your services. Find potential clients who need websites, apps, or digital solutions.
                                </p>

                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <a
                                        href="https://ai.stachbit.in"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-primary text-lg px-8 group"
                                    >
                                        Try AI Lead Tool
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </div>

                                <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
                                    <div className="flex items-center gap-2 text-dark-400">
                                        <CheckCircle2 className="w-5 h-5 text-primary-500" />
                                        <span>Free Trial Available</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-dark-400">
                                        <CheckCircle2 className="w-5 h-5 text-primary-500" />
                                        <span>No Credit Card Required</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-dark-400">
                                        <CheckCircle2 className="w-5 h-5 text-primary-500" />
                                        <span>Find 25+ Leads Free</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="section">
                <div className="container-custom">
                    <ScrollReveal>
                        <div className="text-center">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display mb-4">
                                <span className="text-white">Let's Build </span>
                                <span className="text-gradient">Something Amazing</span>
                            </h2>
                            <p className="text-dark-400 text-lg max-w-2xl mx-auto mb-8">
                                Have a project in mind? We'd love to hear about it. Get in touch and let's create something extraordinary together.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link to="/contact" className="btn-primary text-lg px-8 group">
                                    <Users className="w-5 h-5" />
                                    Get In Touch
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link to="/portfolio" className="btn-secondary text-lg px-8">
                                    View Our Work
                                </Link>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </div>
    );
}
