import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
    name: string;
    role: string;
    company: string;
    content: string;
    avatar?: string;
}

const testimonials: Testimonial[] = [
    {
        name: 'Rajesh Kumar',
        role: 'CEO',
        company: 'TechStart India',
        content: 'Stachbit delivered our SaaS platform on time and exceeded all expectations. Their attention to detail and modern design approach helped us stand out in the market.',
    },
    {
        name: 'Priya Sharma',
        role: 'Founder',
        company: 'GreenLeaf Organics',
        content: 'The e-commerce website they built for us increased our online sales by 300%. The team is professional, responsive, and truly understands business needs.',
    },
    {
        name: 'Amit Patel',
        role: 'Product Manager',
        company: 'FinanceFlow',
        content: 'Working with Stachbit was a game-changer. They transformed our complex financial tool into a beautiful, intuitive application our users love.',
    },
    {
        name: 'Sneha Reddy',
        role: 'Marketing Director',
        company: 'EventPro Solutions',
        content: 'The Android app Stachbit developed for our event management platform is flawless. Fast, reliable, and our customers constantly praise the user experience.',
    },
];

export default function TestimonialCarousel() {
    const [current, setCurrent] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            handleNext();
        }, 5000);

        return () => clearInterval(timer);
    }, [current]);

    const handleNext = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrent((prev) => (prev + 1) % testimonials.length);
        setTimeout(() => setIsAnimating(false), 500);
    };

    const handlePrev = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        setTimeout(() => setIsAnimating(false), 500);
    };

    const testimonial = testimonials[current];

    return (
        <div className="relative max-w-4xl mx-auto">
            <div className="glass rounded-3xl p-8 lg:p-12 relative overflow-hidden">
                {/* Quote icon */}
                <div className="absolute top-4 right-4 opacity-10">
                    <Quote className="w-24 h-24 text-primary-500" />
                </div>

                {/* Content */}
                <div
                    className="relative z-10"
                    style={{
                        opacity: isAnimating ? 0.5 : 1,
                        transform: isAnimating ? 'scale(0.98)' : 'scale(1)',
                        transition: 'all 0.3s ease-out',
                    }}
                >
                    <p className="text-xl lg:text-2xl text-white leading-relaxed mb-8 italic">
                        "{testimonial.content}"
                    </p>

                    <div className="flex items-center gap-4">
                        {/* Avatar placeholder */}
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-xl font-bold">
                            {testimonial.name.charAt(0)}
                        </div>
                        <div>
                            <h4 className="text-white font-semibold">{testimonial.name}</h4>
                            <p className="text-dark-400 text-sm">
                                {testimonial.role} at {testimonial.company}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Navigation buttons */}
                <div className="absolute bottom-8 right-8 flex items-center gap-2">
                    <button
                        onClick={handlePrev}
                        className="w-10 h-10 rounded-full bg-dark-800 hover:bg-dark-700 flex items-center justify-center text-white transition-colors"
                        aria-label="Previous testimonial"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={handleNext}
                        className="w-10 h-10 rounded-full bg-dark-800 hover:bg-dark-700 flex items-center justify-center text-white transition-colors"
                        aria-label="Next testimonial"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                {/* Page indicators */}
                <div className="flex items-center justify-center gap-2 mt-8">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrent(index)}
                            className={`w-2 h-2 rounded-full transition-all ${index === current
                                    ? 'w-8 bg-primary-500'
                                    : 'bg-dark-600 hover:bg-dark-500'
                                }`}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
