import { ReactNode } from 'react';

interface FloatingElementProps {
    children?: ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    variant?: 'circle' | 'square' | 'rounded';
    gradient?: string;
}

export default function FloatingElement({
    children,
    className = '',
    delay = 0,
    duration = 6,
    size = 'md',
    variant = 'circle',
    gradient = 'from-primary-500/20 to-accent-500/20',
}: FloatingElementProps) {
    const sizeClasses = {
        sm: 'w-16 h-16',
        md: 'w-24 h-24',
        lg: 'w-32 h-32',
        xl: 'w-48 h-48',
    };

    const variantClasses = {
        circle: 'rounded-full',
        square: 'rounded-none',
        rounded: 'rounded-2xl',
    };

    return (
        <div
            className={`bg-gradient-to-br ${gradient} ${sizeClasses[size]} ${variantClasses[variant]} blur-2xl ${className}`}
            style={{
                animation: `float ${duration}s ease-in-out infinite`,
                animationDelay: `${delay}s`,
            }}
        >
            {children}
        </div>
    );
}

// Floating shapes composition for hero sections
export function FloatingShapes() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Primary blobs */}
            <FloatingElement
                className="absolute top-1/4 left-[10%]"
                size="xl"
                delay={0}
                gradient="from-primary-500/30 to-primary-600/10"
            />
            <FloatingElement
                className="absolute bottom-1/4 right-[15%]"
                size="lg"
                delay={1}
                gradient="from-accent-500/30 to-accent-600/10"
            />
            <FloatingElement
                className="absolute top-1/2 right-[30%]"
                size="md"
                delay={2}
                gradient="from-purple-500/20 to-pink-500/10"
            />

            {/* Smaller accent shapes */}
            <FloatingElement
                className="absolute top-[15%] right-[40%]"
                size="sm"
                delay={0.5}
                variant="rounded"
                gradient="from-primary-400/20 to-transparent"
            />
            <FloatingElement
                className="absolute bottom-[20%] left-[25%]"
                size="sm"
                delay={1.5}
                variant="rounded"
                gradient="from-accent-400/20 to-transparent"
            />

            {/* Grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px',
                }}
            />
        </div>
    );
}
