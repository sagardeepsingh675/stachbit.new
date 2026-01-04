import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPortfolioProjects } from '../lib/supabase';
import type { PortfolioProject } from '../lib/supabase';
import {
    ExternalLink,
    Globe,
    Smartphone,
    Code2,
    Layers,
    Filter,
    Loader2,
} from 'lucide-react';

// Static demo projects (until database is populated)
const demoProjects: PortfolioProject[] = [
    {
        id: '1',
        title: 'E-Commerce Platform',
        description: 'A modern e-commerce platform with payment integration, inventory management, and admin dashboard.',
        service_type: 'web_dev',
        client_name: 'RetailMax',
        image_url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
        project_url: '#',
        technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
        is_featured: true,
        is_active: true,
        display_order: 1,
        created_at: new Date().toISOString(),
    },
    {
        id: '2',
        title: 'SaaS Analytics Dashboard',
        description: 'Real-time analytics dashboard for tracking business metrics with custom reporting.',
        service_type: 'saas',
        client_name: 'DataFlow Inc',
        image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
        project_url: '#',
        technologies: ['Next.js', 'TypeScript', 'Supabase', 'Chart.js'],
        is_featured: true,
        is_active: true,
        display_order: 2,
        created_at: new Date().toISOString(),
    },
    {
        id: '3',
        title: 'Fitness Tracking App',
        description: 'Mobile app for tracking workouts, nutrition, and fitness goals with social features.',
        service_type: 'android',
        client_name: 'FitLife',
        image_url: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&h=400&fit=crop',
        project_url: '#',
        technologies: ['React Native', 'Firebase', 'Node.js'],
        is_featured: true,
        is_active: true,
        display_order: 3,
        created_at: new Date().toISOString(),
    },
    {
        id: '4',
        title: 'Restaurant Booking System',
        description: 'Custom booking and reservation system with table management and customer CRM.',
        service_type: 'custom',
        client_name: 'DineEasy',
        image_url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop',
        project_url: '#',
        technologies: ['Vue.js', 'Laravel', 'MySQL'],
        is_featured: false,
        is_active: true,
        display_order: 4,
        created_at: new Date().toISOString(),
    },
    {
        id: '5',
        title: 'Corporate Website',
        description: 'Professional corporate website with blog, careers section, and contact forms.',
        service_type: 'web_dev',
        client_name: 'TechCorp Solutions',
        image_url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop',
        project_url: '#',
        technologies: ['Next.js', 'TailwindCSS', 'Vercel'],
        is_featured: false,
        is_active: true,
        display_order: 5,
        created_at: new Date().toISOString(),
    },
    {
        id: '6',
        title: 'Task Management SaaS',
        description: 'Project and task management platform with team collaboration features.',
        service_type: 'saas',
        client_name: 'TaskMaster',
        image_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop',
        project_url: '#',
        technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
        is_featured: false,
        is_active: true,
        display_order: 6,
        created_at: new Date().toISOString(),
    },
];

const serviceFilters = [
    { id: 'all', name: 'All Projects', icon: Filter },
    { id: 'web_dev', name: 'Websites', icon: Globe },
    { id: 'saas', name: 'SaaS', icon: Layers },
    { id: 'android', name: 'Android', icon: Smartphone },
    { id: 'custom', name: 'Custom', icon: Code2 },
];

export default function Portfolio() {
    const [projects, setProjects] = useState<PortfolioProject[]>(demoProjects);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const fetchProjects = async () => {
            const { data, error } = await getPortfolioProjects();
            if (data && data.length > 0) {
                setProjects(data);
            } else if (error) {
                console.log('Using demo projects:', error.message);
                // Keep demo projects
            }
            setLoading(false);
        };
        fetchProjects();
    }, []);

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter((p) => p.service_type === filter);

    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <section className="relative py-20 lg:py-32">
                <div className="absolute inset-0 bg-hero-gradient"></div>
                <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl"></div>

                <div className="container-custom relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display mb-6">
                            <span className="text-white">Our </span>
                            <span className="text-gradient">Portfolio</span>
                        </h1>
                        <p className="text-lg text-dark-300">
                            Explore our recent projects and see how we've helped businesses achieve their digital goals.
                        </p>
                    </div>
                </div>
            </section>

            {/* Filter & Projects */}
            <section className="section">
                <div className="container-custom">
                    {/* Filters */}
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        {serviceFilters.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setFilter(item.id)}
                                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${filter === item.id
                                    ? 'bg-primary-500 text-white'
                                    : 'glass text-dark-300 hover:text-white'
                                    }`}
                            >
                                <item.icon className="w-4 h-4" />
                                {item.name}
                            </button>
                        ))}
                    </div>

                    {/* Projects Grid */}
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
                        </div>
                    ) : filteredProjects.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-dark-400">No projects found for this category.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProjects.map((project) => (
                                <div key={project.id} className="card group overflow-hidden">
                                    {/* Image */}
                                    <div className="relative -mx-6 -mt-6 mb-6 overflow-hidden">
                                        <img
                                            src={project.image_url || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop'}
                                            alt={project.title}
                                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        {project.is_featured && (
                                            <span className="absolute top-4 left-4 px-3 py-1 bg-primary-500 text-white text-xs font-medium rounded-full">
                                                Featured
                                            </span>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                                    {project.client_name && (
                                        <p className="text-primary-400 text-sm mb-2">{project.client_name}</p>
                                    )}
                                    <p className="text-dark-400 text-sm mb-4 line-clamp-2">{project.description}</p>

                                    {/* Technologies */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.technologies?.slice(0, 3).map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-2 py-1 text-xs bg-dark-800 text-dark-300 rounded"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                        {project.technologies && project.technologies.length > 3 && (
                                            <span className="px-2 py-1 text-xs bg-dark-800 text-dark-400 rounded">
                                                +{project.technologies.length - 3}
                                            </span>
                                        )}
                                    </div>

                                    {/* Link */}
                                    {project.project_url && project.project_url !== '#' && (
                                        <a
                                            href={project.project_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors"
                                        >
                                            View Project <ExternalLink className="w-4 h-4" />
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="section bg-dark-900/50">
                <div className="container-custom text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold font-display mb-4">
                        <span className="text-white">Want to Be Our </span>
                        <span className="text-gradient">Next Success Story?</span>
                    </h2>
                    <p className="text-dark-300 text-lg max-w-2xl mx-auto mb-8">
                        Let's discuss your project and create something amazing together.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/contact" className="btn-primary text-lg px-8">
                            Start Your Project
                        </Link>
                        <Link to="/calculator" className="btn-secondary text-lg px-8">
                            Get Estimate
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
