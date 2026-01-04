import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';
import { getContactSettings, getSocialLinks, type ContactSettings, type SocialLinks } from '../../lib/supabase';

const footerLinks = {
    services: [
        { name: 'Website Development', href: '/services#web-dev' },
        { name: 'SaaS Applications', href: '/services#saas' },
        { name: 'Android Apps', href: '/services#android' },
        { name: 'Custom Solutions', href: '/services#custom' },
    ],
    company: [
        { name: 'About Us', href: '/about' },
        { name: 'Portfolio', href: '/portfolio' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contact', href: '/contact' },
        { name: 'Cost Calculator', href: '/calculator' },
    ],
    tools: [
        { name: 'AI Lead Generator', href: 'https://ai.stachbit.in', external: true },
    ],
};

export default function Footer() {
    const [contactInfo, setContactInfo] = useState<ContactSettings | null>(null);
    const [socialLinksData, setSocialLinksData] = useState<SocialLinks | null>(null);

    useEffect(() => {
        async function loadSettings() {
            const [contact, social] = await Promise.all([
                getContactSettings(),
                getSocialLinks(),
            ]);
            setContactInfo(contact);
            setSocialLinksData(social);
        }
        loadSettings();
    }, []);

    // Default values while loading
    const email = contactInfo?.contact_email || 'hello@stachbit.in';
    const phone = contactInfo?.contact_phone || '+91 98765 43210';
    const location = contactInfo?.contact_location || 'India';

    // Build social links array
    const activeSocialLinks = socialLinksData ? [
        { name: 'Twitter', icon: Twitter, href: socialLinksData.twitter },
        { name: 'LinkedIn', icon: Linkedin, href: socialLinksData.linkedin },
        { name: 'GitHub', icon: Github, href: socialLinksData.github },
    ].filter(link => link.href) : [];

    return (
        <footer className="bg-dark-950 border-t border-white/5">
            <div className="container-custom py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <img
                                src="/logo.png"
                                alt="Stachbit Logo"
                                className="w-10 h-10 rounded-xl object-contain"
                            />
                            <span className="text-xl font-bold font-display">
                                <span className="text-white">Stach</span>
                                <span className="text-gradient">bit</span>
                            </span>
                        </Link>
                        <p className="text-dark-400 text-sm mb-6">
                            Transforming ideas into powerful digital solutions. We build modern websites, SaaS applications, and mobile apps.
                        </p>
                        <div className="flex gap-3">
                            {activeSocialLinks.length > 0 ? (
                                activeSocialLinks.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-xl glass flex items-center justify-center text-dark-400 hover:text-primary-400 hover:border-primary-500/30 transition-all"
                                        aria-label={item.name}
                                    >
                                        <item.icon className="w-5 h-5" />
                                    </a>
                                ))
                            ) : (
                                <>
                                    <a href="https://twitter.com/stachbit" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl glass flex items-center justify-center text-dark-400 hover:text-primary-400 transition-all" aria-label="Twitter">
                                        <Twitter className="w-5 h-5" />
                                    </a>
                                    <a href="https://linkedin.com/company/stachbit" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl glass flex items-center justify-center text-dark-400 hover:text-primary-400 transition-all" aria-label="LinkedIn">
                                        <Linkedin className="w-5 h-5" />
                                    </a>
                                    <a href="https://github.com/stachbit" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl glass flex items-center justify-center text-dark-400 hover:text-primary-400 transition-all" aria-label="GitHub">
                                        <Github className="w-5 h-5" />
                                    </a>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Services</h3>
                        <ul className="space-y-3">
                            {footerLinks.services.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="text-dark-400 text-sm hover:text-primary-400 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Company</h3>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="text-dark-400 text-sm hover:text-primary-400 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Contact</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-dark-400 text-sm">
                                <Mail className="w-4 h-4 text-primary-500" />
                                <a href={`mailto:${email}`} className="hover:text-primary-400 transition-colors">
                                    {email}
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-dark-400 text-sm">
                                <Phone className="w-4 h-4 text-primary-500" />
                                <a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-primary-400 transition-colors">
                                    {phone}
                                </a>
                            </li>
                            <li className="flex items-start gap-3 text-dark-400 text-sm">
                                <MapPin className="w-4 h-4 text-primary-500 mt-0.5" />
                                <span>{location}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-dark-500 text-sm">
                        © {new Date().getFullYear()} Stachbit. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link to="/privacy" className="text-dark-500 text-sm hover:text-dark-300 transition-colors">
                            Privacy Policy
                        </Link>
                        <Link to="/terms" className="text-dark-500 text-sm hover:text-dark-300 transition-colors">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
