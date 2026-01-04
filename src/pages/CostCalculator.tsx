import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
    Globe,
    Smartphone,
    Code2,
    Layers,
    Calculator,
    Plus,
    Minus,
    ArrowRight,
    CheckCircle2,
    Info,
} from 'lucide-react';

// Service types with base packages
const serviceTypes = [
    {
        id: 'web_dev',
        name: 'Website Development',
        icon: Globe,
        color: 'from-blue-500 to-cyan-500',
        packages: [
            { name: 'Basic', basePrice: 15000, deliveryDays: 7 },
            { name: 'Professional', basePrice: 35000, deliveryDays: 14, popular: true },
            { name: 'Enterprise', basePrice: 75000, deliveryDays: 30 },
        ],
        addons: [
            { id: 'cms', name: 'CMS Integration', price: 5000 },
            { id: 'ecommerce', name: 'E-commerce (up to 50 products)', price: 15000 },
            { id: 'seo', name: 'SEO Optimization', price: 8000 },
            { id: 'analytics', name: 'Analytics Setup', price: 3000 },
            { id: 'hosting', name: '1 Year Hosting', price: 5000 },
            { id: 'maintenance', name: '6 Months Maintenance', price: 12000 },
        ],
    },
    {
        id: 'saas',
        name: 'SaaS Application',
        icon: Layers,
        color: 'from-primary-500 to-accent-500',
        packages: [
            { name: 'MVP', basePrice: 50000, deliveryDays: 21 },
            { name: 'Standard', basePrice: 100000, deliveryDays: 45, popular: true },
            { name: 'Enterprise', basePrice: 200000, deliveryDays: 90 },
        ],
        addons: [
            { id: 'auth', name: 'Advanced Auth (OAuth, 2FA)', price: 15000 },
            { id: 'billing', name: 'Subscription Billing', price: 20000 },
            { id: 'dashboard', name: 'Admin Dashboard', price: 25000 },
            { id: 'api', name: 'Public API', price: 30000 },
            { id: 'notifications', name: 'Email/Push Notifications', price: 10000 },
            { id: 'analytics', name: 'Analytics Dashboard', price: 18000 },
        ],
    },
    {
        id: 'android',
        name: 'Android Application',
        icon: Smartphone,
        color: 'from-purple-500 to-pink-500',
        packages: [
            { name: 'Basic', basePrice: 40000, deliveryDays: 21 },
            { name: 'Professional', basePrice: 80000, deliveryDays: 45, popular: true },
            { name: 'Enterprise', basePrice: 150000, deliveryDays: 75 },
        ],
        addons: [
            { id: 'ios', name: 'iOS Version', price: 35000 },
            { id: 'push', name: 'Push Notifications', price: 8000 },
            { id: 'offline', name: 'Offline Mode', price: 15000 },
            { id: 'payment', name: 'Payment Integration', price: 12000 },
            { id: 'maps', name: 'Maps Integration', price: 10000 },
            { id: 'playstore', name: 'Play Store Publishing', price: 5000 },
        ],
    },
    {
        id: 'custom',
        name: 'Custom Solution',
        icon: Code2,
        color: 'from-orange-500 to-red-500',
        packages: [
            { name: 'Small Project', basePrice: 25000, deliveryDays: 14 },
            { name: 'Medium Project', basePrice: 60000, deliveryDays: 30, popular: true },
            { name: 'Large Project', basePrice: 120000, deliveryDays: 60 },
        ],
        addons: [
            { id: 'api', name: 'REST API Development', price: 20000 },
            { id: 'integration', name: 'Third-party Integration', price: 15000 },
            { id: 'automation', name: 'Automation Scripts', price: 10000 },
            { id: 'migration', name: 'Data Migration', price: 18000 },
            { id: 'documentation', name: 'Technical Documentation', price: 8000 },
            { id: 'support', name: '3 Months Support', price: 15000 },
        ],
    },
];

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(price);
};

export default function CostCalculator() {
    const [selectedService, setSelectedService] = useState<string | null>(null);
    const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
    const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
    const [pages, setPages] = useState(5);

    const currentService = serviceTypes.find((s) => s.id === selectedService);

    const toggleAddon = (addonId: string) => {
        setSelectedAddons((prev) =>
            prev.includes(addonId)
                ? prev.filter((id) => id !== addonId)
                : [...prev, addonId]
        );
    };

    const { totalPrice, deliveryDays, breakdown } = useMemo(() => {
        if (!currentService || selectedPackage === null) {
            return { totalPrice: 0, deliveryDays: 0, breakdown: [] };
        }

        const pkg = currentService.packages[selectedPackage];
        const items: { name: string; price: number }[] = [];

        // Base package
        let basePrice = pkg.basePrice;

        // Add extra pages for web dev (if more than 5)
        if (selectedService === 'web_dev' && pages > 5) {
            const extraPages = pages - 5;
            const extraPagesCost = extraPages * 2000;
            basePrice += extraPagesCost;
            items.push({ name: `${pkg.name} Package (${pages} pages)`, price: basePrice });
        } else {
            items.push({ name: `${pkg.name} Package`, price: basePrice });
        }

        // Addons
        let addonsTotal = 0;
        currentService.addons.forEach((addon) => {
            if (selectedAddons.includes(addon.id)) {
                items.push({ name: addon.name, price: addon.price });
                addonsTotal += addon.price;
            }
        });

        return {
            totalPrice: basePrice + addonsTotal,
            deliveryDays: pkg.deliveryDays,
            breakdown: items,
        };
    }, [currentService, selectedPackage, selectedAddons, pages, selectedService]);

    const handleServiceChange = (serviceId: string) => {
        setSelectedService(serviceId);
        setSelectedPackage(null);
        setSelectedAddons([]);
        setPages(5);
    };

    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <section className="relative py-20 lg:py-32">
                <div className="absolute inset-0 bg-hero-gradient"></div>
                <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>

                <div className="container-custom relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                            <Calculator className="w-4 h-4 text-primary-400" />
                            <span className="text-sm text-dark-300">Instant Estimate</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display mb-6">
                            <span className="text-white">Cost </span>
                            <span className="text-gradient">Calculator</span>
                        </h1>
                        <p className="text-lg text-dark-300">
                            Get an instant estimate for your project. Customize your requirements and see the price in real-time.
                        </p>
                    </div>
                </div>
            </section>

            {/* Calculator Section */}
            <section className="section">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Calculator Form */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Step 1: Select Service */}
                            <div className="glass rounded-2xl p-6">
                                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-sm">1</span>
                                    Select Service Type
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {serviceTypes.map((service) => (
                                        <button
                                            key={service.id}
                                            onClick={() => handleServiceChange(service.id)}
                                            className={`p-4 rounded-xl border-2 transition-all text-left ${selectedService === service.id
                                                    ? 'border-primary-500 bg-primary-500/10'
                                                    : 'border-white/10 hover:border-white/30'
                                                }`}
                                        >
                                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center mb-3`}>
                                                <service.icon className="w-5 h-5 text-white" />
                                            </div>
                                            <h3 className="text-white font-medium">{service.name}</h3>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Step 2: Select Package */}
                            {currentService && (
                                <div className="glass rounded-2xl p-6 animate-fade-in">
                                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                        <span className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-sm">2</span>
                                        Select Package
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        {currentService.packages.map((pkg, index) => (
                                            <button
                                                key={pkg.name}
                                                onClick={() => setSelectedPackage(index)}
                                                className={`relative p-4 rounded-xl border-2 transition-all text-center ${selectedPackage === index
                                                        ? 'border-primary-500 bg-primary-500/10'
                                                        : 'border-white/10 hover:border-white/30'
                                                    }`}
                                            >
                                                {pkg.popular && (
                                                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary-500 text-white text-xs font-medium rounded-full">
                                                        Popular
                                                    </span>
                                                )}
                                                <h3 className="text-white font-medium mb-2">{pkg.name}</h3>
                                                <p className="text-primary-400 font-bold text-lg mb-1">
                                                    {formatPrice(pkg.basePrice)}
                                                </p>
                                                <p className="text-dark-400 text-sm">{pkg.deliveryDays} days</p>
                                            </button>
                                        ))}
                                    </div>

                                    {/* Page count for web dev */}
                                    {selectedService === 'web_dev' && selectedPackage !== null && (
                                        <div className="mt-6 p-4 bg-dark-800/50 rounded-xl">
                                            <div className="flex items-center justify-between gap-4">
                                                <div>
                                                    <p className="text-white font-medium">Number of Pages</p>
                                                    <p className="text-dark-400 text-sm">Base includes 5 pages. ₹2,000/extra page</p>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() => setPages(Math.max(1, pages - 1))}
                                                        className="w-10 h-10 rounded-lg bg-dark-700 flex items-center justify-center text-white hover:bg-dark-600 transition-colors"
                                                    >
                                                        <Minus className="w-4 h-4" />
                                                    </button>
                                                    <span className="text-white font-bold text-xl w-12 text-center">{pages}</span>
                                                    <button
                                                        onClick={() => setPages(pages + 1)}
                                                        className="w-10 h-10 rounded-lg bg-dark-700 flex items-center justify-center text-white hover:bg-dark-600 transition-colors"
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Step 3: Add-ons */}
                            {currentService && selectedPackage !== null && (
                                <div className="glass rounded-2xl p-6 animate-fade-in">
                                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                        <span className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-sm">3</span>
                                        Add-ons (Optional)
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {currentService.addons.map((addon) => (
                                            <button
                                                key={addon.id}
                                                onClick={() => toggleAddon(addon.id)}
                                                className={`p-4 rounded-xl border-2 transition-all text-left flex items-center justify-between ${selectedAddons.includes(addon.id)
                                                        ? 'border-primary-500 bg-primary-500/10'
                                                        : 'border-white/10 hover:border-white/30'
                                                    }`}
                                            >
                                                <div>
                                                    <h3 className="text-white font-medium">{addon.name}</h3>
                                                    <p className="text-primary-400">{formatPrice(addon.price)}</p>
                                                </div>
                                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${selectedAddons.includes(addon.id)
                                                        ? 'border-primary-500 bg-primary-500'
                                                        : 'border-dark-500'
                                                    }`}>
                                                    {selectedAddons.includes(addon.id) && (
                                                        <CheckCircle2 className="w-4 h-4 text-white" />
                                                    )}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Price Summary */}
                        <div className="lg:col-span-1">
                            <div className="glass rounded-2xl p-6 sticky top-24">
                                <h3 className="text-xl font-bold text-white mb-6">Price Summary</h3>

                                {totalPrice > 0 ? (
                                    <>
                                        <div className="space-y-3 mb-6">
                                            {breakdown.map((item, index) => (
                                                <div key={index} className="flex justify-between text-sm">
                                                    <span className="text-dark-300">{item.name}</span>
                                                    <span className="text-white">{formatPrice(item.price)}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="border-t border-white/10 pt-4 mb-6">
                                            <div className="flex justify-between items-center">
                                                <span className="text-dark-300">Estimated Total</span>
                                                <span className="text-2xl font-bold text-gradient">
                                                    {formatPrice(totalPrice)}
                                                </span>
                                            </div>
                                            <p className="text-dark-500 text-sm mt-2">
                                                Estimated delivery: {deliveryDays} days
                                            </p>
                                        </div>

                                        <div className="space-y-3">
                                            <Link to="/contact" className="btn-primary w-full justify-center">
                                                Get Detailed Quote
                                                <ArrowRight className="w-5 h-5" />
                                            </Link>
                                        </div>

                                        <div className="mt-6 p-4 bg-dark-800/50 rounded-xl">
                                            <div className="flex items-start gap-3">
                                                <Info className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                                                <p className="text-dark-400 text-sm">
                                                    This is an estimate. Final pricing may vary based on specific requirements and complexity.
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center py-8">
                                        <Calculator className="w-12 h-12 text-dark-600 mx-auto mb-4" />
                                        <p className="text-dark-400">
                                            Select a service and package to see your estimate
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
