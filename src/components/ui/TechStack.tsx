import { useState, useEffect, useRef } from 'react';

const technologies = [
    { name: 'React', color: '#61DAFB' },
    { name: 'TypeScript', color: '#3178C6' },
    { name: 'Node.js', color: '#339933' },
    { name: 'Next.js', color: '#FFFFFF' },
    { name: 'Tailwind', color: '#06B6D4' },
    { name: 'PostgreSQL', color: '#4169E1' },
    { name: 'Supabase', color: '#3FCF8E' },
    { name: 'Flutter', color: '#02569B' },
    { name: 'Kotlin', color: '#7F52FF' },
    { name: 'Python', color: '#3776AB' },
    { name: 'AWS', color: '#FF9900' },
    { name: 'Docker', color: '#2496ED' },
];

export default function TechStack() {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} className="relative overflow-hidden py-4">
            {/* Gradient masks */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-dark-950 to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-dark-950 to-transparent z-10" />

            {/* Scrolling container */}
            <div
                className="flex gap-6 animate-scroll-left"
                style={{
                    width: 'max-content',
                    animation: isVisible ? 'scrollLeft 30s linear infinite' : 'none',
                }}
            >
                {/* Double the items for seamless loop */}
                {[...technologies, ...technologies].map((tech, index) => (
                    <div
                        key={`${tech.name}-${index}`}
                        className="flex items-center gap-3 px-6 py-3 rounded-full bg-dark-800/50 border border-dark-700/50 hover:border-primary-500/30 transition-colors group"
                    >
                        <div
                            className="w-3 h-3 rounded-full group-hover:scale-125 transition-transform"
                            style={{ backgroundColor: tech.color }}
                        />
                        <span className="text-dark-300 font-medium whitespace-nowrap group-hover:text-white transition-colors">
                            {tech.name}
                        </span>
                    </div>
                ))}
            </div>

            <style>{`
                @keyframes scrollLeft {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
            `}</style>
        </div>
    );
}
