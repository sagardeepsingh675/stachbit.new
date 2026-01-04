import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    BookOpen,
    Calendar,
    Clock,
    ArrowRight,
    Search,
    Tag,
    User,
    Star,
} from 'lucide-react';
import { getPublishedBlogs, getBlogCategories, type BlogPost } from '../lib/supabase';
import SEOHead from '../components/SEOHead';
import ScrollReveal from '../components/ui/ScrollReveal';

export default function Blog() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        loadData();
    }, [selectedCategory]);

    async function loadData() {
        setLoading(true);

        // Load featured posts
        const { data: featured } = await getPublishedBlogs({ featured: true, limit: 3 });
        if (featured) setFeaturedPosts(featured);

        // Load all posts
        const { data: allPosts } = await getPublishedBlogs({
            category: selectedCategory || undefined,
        });
        if (allPosts) setPosts(allPosts);

        // Load categories
        const { data: cats } = await getBlogCategories();
        if (cats) setCategories(cats);

        setLoading(false);
    }

    const filteredPosts = posts.filter(
        (post) =>
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const formatDate = (date: string | null) => {
        if (!date) return '';
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <>
            <SEOHead
                title="Blog"
                description="Explore our latest insights on web development, SaaS, mobile apps, and digital solutions. Stay updated with industry trends and expert tips."
                keywords="web development blog, SaaS insights, mobile app development, technology blog, digital solutions"
                url="/blog"
            />

            <div className="min-h-screen">
                {/* Hero Section */}
                <section className="relative py-20 lg:py-32 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary-900/20 via-dark-900 to-dark-950" />
                    <div className="container-custom relative z-10">
                        <ScrollReveal>
                            <div className="text-center max-w-3xl mx-auto">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 mb-6">
                                    <BookOpen className="w-4 h-4 text-primary-400" />
                                    <span className="text-sm text-primary-400 font-medium">Our Blog</span>
                                </div>
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display mb-6">
                                    <span className="text-white">Insights & </span>
                                    <span className="text-gradient">Ideas</span>
                                </h1>
                                <p className="text-lg text-dark-300 mb-8">
                                    Explore our latest articles on web development, SaaS solutions, and digital
                                    innovation. Learn from our experience and stay updated with industry trends.
                                </p>

                                {/* Search Bar */}
                                <div className="relative max-w-xl mx-auto">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
                                    <input
                                        type="text"
                                        placeholder="Search articles..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-dark-800/50 border border-dark-700 rounded-2xl text-white placeholder-dark-400 focus:outline-none focus:border-primary-500/50 transition-colors"
                                    />
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>

                {/* Featured Posts */}
                {featuredPosts.length > 0 && !searchQuery && !selectedCategory && (
                    <section className="py-12 bg-dark-900/30">
                        <div className="container-custom">
                            <ScrollReveal>
                                <div className="flex items-center gap-2 mb-8">
                                    <Star className="w-5 h-5 text-yellow-400" />
                                    <h2 className="text-xl font-bold text-white">Featured Articles</h2>
                                </div>
                            </ScrollReveal>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {featuredPosts.map((post, index) => (
                                    <ScrollReveal key={post.id} delay={index * 100}>
                                        <Link
                                            to={`/blog/${post.slug}`}
                                            className="group block card overflow-hidden hover:border-primary-500/50 transition-all duration-300"
                                        >
                                            <div className="relative h-48 bg-dark-800 overflow-hidden">
                                                {post.featured_image ? (
                                                    <img
                                                        src={post.featured_image}
                                                        alt={post.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-500/20 to-accent-500/20">
                                                        <BookOpen className="w-12 h-12 text-dark-600" />
                                                    </div>
                                                )}
                                                <div className="absolute top-3 left-3 badge-warning flex items-center gap-1">
                                                    <Star className="w-3 h-3" />
                                                    Featured
                                                </div>
                                            </div>
                                            <div className="p-5">
                                                {post.category && (
                                                    <span className="badge-primary text-xs mb-3 inline-block">
                                                        {post.category}
                                                    </span>
                                                )}
                                                <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-primary-400 transition-colors">
                                                    {post.title}
                                                </h3>
                                                {post.excerpt && (
                                                    <p className="text-dark-400 text-sm mb-4 line-clamp-2">
                                                        {post.excerpt}
                                                    </p>
                                                )}
                                                <div className="flex items-center gap-4 text-xs text-dark-500">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-3 h-3" />
                                                        {formatDate(post.published_at)}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        {post.read_time_minutes} min read
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </ScrollReveal>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Categories Filter */}
                {categories.length > 0 && (
                    <section className="py-8 border-b border-dark-800">
                        <div className="container-custom">
                            <ScrollReveal>
                                <div className="flex items-center gap-2 mb-4">
                                    <Tag className="w-4 h-4 text-dark-400" />
                                    <span className="text-sm text-dark-400">Filter by category:</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() => setSelectedCategory(null)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${!selectedCategory
                                                ? 'bg-primary-500 text-white'
                                                : 'bg-dark-800 text-dark-300 hover:bg-dark-700'
                                            }`}
                                    >
                                        All
                                    </button>
                                    {categories.map((category) => (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category
                                                    ? 'bg-primary-500 text-white'
                                                    : 'bg-dark-800 text-dark-300 hover:bg-dark-700'
                                                }`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </ScrollReveal>
                        </div>
                    </section>
                )}

                {/* All Posts */}
                <section className="section">
                    <div className="container-custom">
                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <div key={i} className="card">
                                        <div className="skeleton h-48 rounded-t-2xl" />
                                        <div className="p-5">
                                            <div className="skeleton h-4 w-20 mb-3 rounded" />
                                            <div className="skeleton h-6 w-full mb-2 rounded" />
                                            <div className="skeleton h-4 w-3/4 rounded" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : filteredPosts.length === 0 ? (
                            <div className="text-center py-20">
                                <BookOpen className="w-16 h-16 text-dark-600 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-white mb-2">No articles found</h3>
                                <p className="text-dark-400">
                                    {searchQuery
                                        ? 'Try adjusting your search terms'
                                        : 'Check back soon for new content'}
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredPosts.map((post, index) => (
                                    <ScrollReveal key={post.id} delay={index * 50}>
                                        <Link
                                            to={`/blog/${post.slug}`}
                                            className="group block card overflow-hidden hover:border-primary-500/50 transition-all duration-300 h-full"
                                        >
                                            <div className="relative h-48 bg-dark-800 overflow-hidden">
                                                {post.featured_image ? (
                                                    <img
                                                        src={post.featured_image}
                                                        alt={post.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-500/10 to-accent-500/10">
                                                        <BookOpen className="w-12 h-12 text-dark-600" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-5 flex flex-col flex-1">
                                                <div className="flex items-center gap-2 mb-3">
                                                    {post.category && (
                                                        <span className="badge-primary text-xs">{post.category}</span>
                                                    )}
                                                </div>
                                                <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-primary-400 transition-colors">
                                                    {post.title}
                                                </h3>
                                                {post.excerpt && (
                                                    <p className="text-dark-400 text-sm mb-4 line-clamp-3 flex-1">
                                                        {post.excerpt}
                                                    </p>
                                                )}
                                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-dark-700">
                                                    <div className="flex items-center gap-3 text-xs text-dark-500">
                                                        <span className="flex items-center gap-1">
                                                            <User className="w-3 h-3" />
                                                            {post.author_name}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="w-3 h-3" />
                                                            {post.read_time_minutes} min
                                                        </span>
                                                    </div>
                                                    <span className="text-primary-400 group-hover:translate-x-1 transition-transform">
                                                        <ArrowRight className="w-4 h-4" />
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </ScrollReveal>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="section bg-dark-900/50">
                    <div className="container-custom">
                        <ScrollReveal>
                            <div className="text-center max-w-2xl mx-auto">
                                <h2 className="text-3xl font-bold text-white mb-4">
                                    Ready to Build Something Amazing?
                                </h2>
                                <p className="text-dark-400 mb-8">
                                    Let's discuss your project and bring your ideas to life.
                                </p>
                                <Link to="/contact" className="btn-primary text-lg px-8 group">
                                    Get in Touch
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>
            </div>
        </>
    );
}
