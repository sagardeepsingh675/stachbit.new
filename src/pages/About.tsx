import { Link } from 'react-router-dom';
import {
    Target,
    Lightbulb,
    Users,
    Award,
    ArrowRight,
    CheckCircle2,
    Zap,
} from 'lucide-react';

const values = [
    {
        icon: Target,
        title: 'Client-Focused',
        description: 'We put our clients first, understanding their needs and delivering solutions that exceed expectations.',
    },
    {
        icon: Lightbulb,
        title: 'Innovation',
        description: 'We stay ahead of the curve, using cutting-edge technologies to build modern, future-proof solutions.',
    },
    {
        icon: Award,
        title: 'Quality',
        description: 'We never compromise on quality. Every line of code, every design element is crafted with care.',
    },
    {
        icon: Users,
        title: 'Collaboration',
        description: 'We work as an extension of your team, maintaining transparent communication throughout.',
    },
];

const expertise = [
    'React & Next.js',
    'Node.js',
    'TypeScript',
    'PostgreSQL',
    'Supabase',
    'TailwindCSS',
    'React Native',
    'Android (Kotlin)',
    'REST APIs',
    'Cloud Deployment',
    'UI/UX Design',
    'SEO Optimization',
];

export default function About() {
    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <section className="relative py-20 lg:py-32">
                <div className="absolute inset-0 bg-hero-gradient"></div>
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>

                <div className="container-custom relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display mb-6">
                            <span className="text-white">About </span>
                            <span className="text-gradient">Stachbit</span>
                        </h1>
                        <p className="text-lg text-dark-300">
                            We're a passionate team of developers and designers dedicated to building digital solutions that make a difference.
                        </p>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="section">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl sm:text-4xl font-bold font-display mb-6">
                                <span className="text-white">Our </span>
                                <span className="text-gradient">Story</span>
                            </h2>
                            <div className="space-y-4 text-dark-300">
                                <p>
                                    Stachbit was founded with a simple mission: to help businesses thrive in the digital world by creating exceptional websites, applications, and software solutions.
                                </p>
                                <p>
                                    We noticed that many businesses struggle to find reliable development partners who understand both technology and business needs. That's where we come in.
                                </p>
                                <p>
                                    Our team combines years of experience in web development, SaaS products, and mobile applications. We've worked with startups, small businesses, and enterprises, helping them achieve their digital goals.
                                </p>
                            </div>
                            <div className="mt-8">
                                <Link to="/contact" className="btn-primary">
                                    Work With Us
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>

                        <div className="glass rounded-3xl p-8">
                            <h3 className="text-xl font-bold text-white mb-6">What We Do</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <CheckCircle2 className="w-6 h-6 text-primary-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="text-white font-medium">Website Development</h4>
                                        <p className="text-dark-400 text-sm">Modern, responsive websites that convert visitors into customers</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <CheckCircle2 className="w-6 h-6 text-primary-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="text-white font-medium">SaaS Applications</h4>
                                        <p className="text-dark-400 text-sm">Scalable software products with powerful features</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <CheckCircle2 className="w-6 h-6 text-primary-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="text-white font-medium">Android Apps</h4>
                                        <p className="text-dark-400 text-sm">Native and cross-platform mobile applications</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <CheckCircle2 className="w-6 h-6 text-primary-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="text-white font-medium">Custom Solutions</h4>
                                        <p className="text-dark-400 text-sm">APIs, integrations, and bespoke software</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="section bg-dark-900/50">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold font-display mb-4">
                            <span className="text-white">Our </span>
                            <span className="text-gradient">Values</span>
                        </h2>
                        <p className="text-dark-400 text-lg max-w-2xl mx-auto">
                            These principles guide everything we do
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {values.map((value) => (
                            <div key={value.title} className="card">
                                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center mb-4">
                                    <value.icon className="w-6 h-6 text-primary-400" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                                <p className="text-dark-400">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Expertise Section */}
            <section className="section">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold font-display mb-4">
                            <span className="text-white">Our </span>
                            <span className="text-gradient">Expertise</span>
                        </h2>
                        <p className="text-dark-400 text-lg max-w-2xl mx-auto">
                            Technologies and skills we use to build your projects
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4">
                        {expertise.map((skill) => (
                            <span
                                key={skill}
                                className="px-4 py-2 glass rounded-full text-dark-300 hover:text-primary-400 hover:border-primary-500/30 transition-all cursor-default"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* AI Tool Section */}
            <section className="section bg-dark-900/50">
                <div className="container-custom">
                    <div className="glass rounded-3xl p-8 lg:p-12 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 mb-6">
                            <Zap className="w-4 h-4 text-primary-400" />
                            <span className="text-sm text-primary-400 font-medium">Our Product</span>
                        </div>

                        <h2 className="text-3xl sm:text-4xl font-bold font-display mb-4">
                            <span className="text-white">AI Lead </span>
                            <span className="text-gradient">Generator</span>
                        </h2>

                        <p className="text-dark-300 text-lg max-w-2xl mx-auto mb-8">
                            We built an AI-powered tool to help agencies and freelancers find businesses that need digital services. Find potential clients who need websites, apps, or custom solutions.
                        </p>

                        <a
                            href="https://ai.stachbit.in"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary text-lg px-8"
                        >
                            Try AI Lead Tool
                            <ArrowRight className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section">
                <div className="container-custom text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold font-display mb-4">
                        <span className="text-white">Ready to </span>
                        <span className="text-gradient">Work Together?</span>
                    </h2>
                    <p className="text-dark-400 text-lg max-w-2xl mx-auto mb-8">
                        Let's discuss your project and create something amazing.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/contact" className="btn-primary text-lg px-8">
                            Get In Touch
                        </Link>
                        <Link to="/portfolio" className="btn-secondary text-lg px-8">
                            View Our Work
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
