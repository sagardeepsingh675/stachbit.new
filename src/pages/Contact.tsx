import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { submitInquiry, getContactSettings, type ContactSettings } from '../lib/supabase';
import {
    Send,
    Mail,
    Phone,
    MapPin,
    Clock,
    CheckCircle2,
    Loader2,
    AlertCircle,
} from 'lucide-react';

const serviceOptions = [
    { value: 'web_dev', label: 'Website Development' },
    { value: 'saas', label: 'SaaS Application' },
    { value: 'android', label: 'Android App' },
    { value: 'custom', label: 'Custom Solution' },
];

const budgetOptions = [
    { value: 'under_25k', label: 'Under ₹25,000' },
    { value: '25k_50k', label: '₹25,000 - ₹50,000' },
    { value: '50k_1l', label: '₹50,000 - ₹1,00,000' },
    { value: '1l_2l', label: '₹1,00,000 - ₹2,00,000' },
    { value: 'above_2l', label: 'Above ₹2,00,000' },
];

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        service_interest: '',
        budget_range: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [contactData, setContactData] = useState<ContactSettings | null>(null);

    useEffect(() => {
        async function loadContactInfo() {
            const settings = await getContactSettings();
            setContactData(settings);
        }
        loadContactInfo();
    }, []);

    // Build contact info array from database
    const contactInfo = [
        {
            icon: Mail,
            label: 'Email',
            value: contactData?.contact_email || 'hello@stachbit.in',
            href: `mailto:${contactData?.contact_email || 'hello@stachbit.in'}`,
        },
        {
            icon: Phone,
            label: 'Phone',
            value: contactData?.contact_phone || '+91 98765 43210',
            href: `tel:${(contactData?.contact_phone || '+91 98765 43210').replace(/\s/g, '')}`,
        },
        {
            icon: MapPin,
            label: 'Location',
            value: contactData?.contact_location || 'India',
            href: null as string | null,
        },
        {
            icon: Clock,
            label: 'Response Time',
            value: contactData?.response_time || 'Within 24 hours',
            href: null as string | null,
        },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Validation
        if (!formData.name || !formData.email || !formData.message) {
            setError('Please fill in all required fields');
            setLoading(false);
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Please enter a valid email address');
            setLoading(false);
            return;
        }

        try {
            const { error: submitError } = await submitInquiry({
                name: formData.name,
                email: formData.email,
                phone: formData.phone || undefined,
                company: formData.company || undefined,
                service_interest: formData.service_interest || undefined,
                budget_range: formData.budget_range || undefined,
                message: formData.message,
            });

            if (submitError) throw submitError;

            // Trigger email notification (fire and forget - don't block on errors)
            try {
                const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
                if (supabaseUrl) {
                    fetch(`${supabaseUrl}/functions/v1/send-contact-notification`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            name: formData.name,
                            email: formData.email,
                            phone: formData.phone,
                            subject: formData.service_interest ? `Inquiry: ${formData.service_interest}` : undefined,
                            message: formData.message,
                            source: 'stachbit.in',
                        }),
                    }).catch(console.error);
                }
            } catch (emailErr) {
                console.error('Email notification error:', emailErr);
            }

            setSuccess(true);
            setFormData({
                name: '',
                email: '',
                phone: '',
                company: '',
                service_interest: '',
                budget_range: '',
                message: '',
            });
        } catch (err: unknown) {
            console.error('Error submitting form:', err);
            setError('Failed to submit form. Please try again or email us directly.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <section className="relative py-20 lg:py-32">
                <div className="absolute inset-0 bg-hero-gradient"></div>
                <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl"></div>

                <div className="container-custom relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display mb-6">
                            <span className="text-white">Get In </span>
                            <span className="text-gradient">Touch</span>
                        </h1>
                        <p className="text-lg text-dark-300">
                            Have a project in mind? Let's discuss how we can help bring your vision to life.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="section">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Contact Info */}
                        <div className="lg:col-span-1 space-y-6">
                            <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>

                            {contactInfo.map((item) => (
                                <div key={item.label} className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                                        <item.icon className="w-6 h-6 text-primary-400" />
                                    </div>
                                    <div>
                                        <p className="text-dark-400 text-sm">{item.label}</p>
                                        {item.href ? (
                                            <a href={item.href} className="text-white hover:text-primary-400 transition-colors">
                                                {item.value}
                                            </a>
                                        ) : (
                                            <p className="text-white">{item.value}</p>
                                        )}
                                    </div>
                                </div>
                            ))}

                            <div className="pt-6">
                                <p className="text-dark-400 text-sm mb-4">
                                    Looking to find businesses that need your services?
                                </p>
                                <a
                                    href="https://ai.stachbit.in"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-secondary text-sm"
                                >
                                    Try Our AI Lead Tool
                                </a>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <div className="glass rounded-3xl p-8">
                                {success ? (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 rounded-full bg-primary-500/20 flex items-center justify-center mx-auto mb-6">
                                            <CheckCircle2 className="w-8 h-8 text-primary-400" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-4">Message Sent!</h3>
                                        <p className="text-dark-300 mb-8">
                                            Thank you for reaching out. We'll get back to you within 24 hours.
                                        </p>
                                        <button
                                            onClick={() => setSuccess(false)}
                                            className="btn-primary"
                                        >
                                            Send Another Message
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-dark-300 mb-2">
                                                    Name <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    placeholder="Your name"
                                                    className="input"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-dark-300 mb-2">
                                                    Email <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    placeholder="your@email.com"
                                                    className="input"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-dark-300 mb-2">
                                                    Phone
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    placeholder="+91 98765 43210"
                                                    className="input"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-dark-300 mb-2">
                                                    Company
                                                </label>
                                                <input
                                                    type="text"
                                                    name="company"
                                                    value={formData.company}
                                                    onChange={handleChange}
                                                    placeholder="Your company name"
                                                    className="input"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-dark-300 mb-2">
                                                    Service Interested In
                                                </label>
                                                <select
                                                    name="service_interest"
                                                    value={formData.service_interest}
                                                    onChange={handleChange}
                                                    className="input"
                                                >
                                                    <option value="">Select a service</option>
                                                    {serviceOptions.map((option) => (
                                                        <option key={option.value} value={option.value}>
                                                            {option.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-dark-300 mb-2">
                                                    Budget Range
                                                </label>
                                                <select
                                                    name="budget_range"
                                                    value={formData.budget_range}
                                                    onChange={handleChange}
                                                    className="input"
                                                >
                                                    <option value="">Select budget range</option>
                                                    {budgetOptions.map((option) => (
                                                        <option key={option.value} value={option.value}>
                                                            {option.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-dark-300 mb-2">
                                                Message <span className="text-red-500">*</span>
                                            </label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                placeholder="Tell us about your project..."
                                                rows={5}
                                                className="input resize-none"
                                                required
                                            />
                                        </div>

                                        {error && (
                                            <div className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 text-red-400">
                                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                                <span>{error}</span>
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="btn-primary w-full text-lg"
                                        >
                                            {loading ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="w-5 h-5" />
                                                    Send Message
                                                </>
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Calculator CTA */}
            <section className="section bg-dark-900/50">
                <div className="container-custom text-center">
                    <h2 className="text-3xl font-bold font-display text-white mb-4">
                        Need a Quick Estimate?
                    </h2>
                    <p className="text-dark-300 mb-8">
                        Use our cost calculator to get an instant price estimate for your project.
                    </p>
                    <Link to="/calculator" className="btn-primary text-lg px-8">
                        Try Cost Calculator
                    </Link>
                </div>
            </section>
        </div>
    );
}
