import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import clsx from 'clsx';

const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Calculator', href: '/calculator' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [, setActiveIndex] = useState(-1);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    // Find active nav index
    useEffect(() => {
        const index = navigation.findIndex(item => item.href === location.pathname);
        setActiveIndex(index);
    }, [location.pathname]);

    return (
        <header
            className={clsx(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
                scrolled
                    ? 'py-2'
                    : 'py-4'
            )}
        >
            {/* Blur background */}
            <div
                className={clsx(
                    'absolute inset-0 transition-all duration-500',
                    scrolled
                        ? 'bg-dark-950/80 backdrop-blur-xl border-b border-white/5'
                        : 'bg-transparent'
                )}
            />

            <div className="container-custom relative">
                <nav className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="relative">
                            <img
                                src="/logo.png"
                                alt="Stachbit Logo"
                                className="w-10 h-10 rounded-xl object-contain group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-primary-500/25"
                            />
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                        </div>
                        <span className="text-xl font-bold font-display">
                            <span className="text-white">Stach</span>
                            <span className="text-gradient">bit</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1 bg-dark-800/50 rounded-full px-2 py-1 backdrop-blur-sm border border-white/5">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={clsx(
                                    'relative px-4 py-2 text-sm font-medium transition-colors rounded-full',
                                    location.pathname === item.href
                                        ? 'text-white'
                                        : 'text-dark-400 hover:text-white'
                                )}
                            >
                                {/* Active indicator */}
                                {location.pathname === item.href && (
                                    <span
                                        className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-full"
                                        style={{
                                            animation: 'fadeIn 0.3s ease-out',
                                        }}
                                    />
                                )}
                                <span className="relative z-10">{item.name}</span>
                            </Link>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="hidden lg:flex items-center gap-3">
                        <a
                            href="https://ai.stachbit.in"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 text-sm font-medium text-dark-300 hover:text-white transition-colors"
                        >
                            AI Lead Tool
                        </a>
                        <Link
                            to="/contact"
                            className="btn-primary text-sm group"
                        >
                            Get Started
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden relative w-10 h-10 flex items-center justify-center text-white"
                        aria-label="Toggle menu"
                    >
                        <span
                            className={clsx(
                                'absolute w-6 h-0.5 bg-white rounded-full transition-all duration-300',
                                isOpen ? 'rotate-45' : '-translate-y-2'
                            )}
                        />
                        <span
                            className={clsx(
                                'absolute w-6 h-0.5 bg-white rounded-full transition-all duration-300',
                                isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                            )}
                        />
                        <span
                            className={clsx(
                                'absolute w-6 h-0.5 bg-white rounded-full transition-all duration-300',
                                isOpen ? '-rotate-45' : 'translate-y-2'
                            )}
                        />
                    </button>
                </nav>

                {/* Mobile Navigation */}
                <div
                    className={clsx(
                        'lg:hidden overflow-hidden transition-all duration-500 ease-out',
                        isOpen ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'
                    )}
                >
                    <div className="glass rounded-2xl p-4 space-y-1">
                        {navigation.map((item, index) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={clsx(
                                    'block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300',
                                    location.pathname === item.href
                                        ? 'bg-gradient-to-r from-primary-500/20 to-accent-500/20 text-white'
                                        : 'text-dark-300 hover:bg-white/5 hover:text-white hover:translate-x-2'
                                )}
                                style={{
                                    transitionDelay: `${index * 50}ms`,
                                    opacity: isOpen ? 1 : 0,
                                    transform: isOpen ? 'translateX(0)' : 'translateX(-10px)',
                                }}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <div className="pt-4 space-y-2 border-t border-white/10 mt-4">
                            <a
                                href="https://ai.stachbit.in"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-secondary text-sm w-full justify-center"
                            >
                                AI Lead Tool
                            </a>
                            <Link
                                to="/contact"
                                className="btn-primary text-sm w-full justify-center"
                            >
                                Get Started
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
