import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
    BookOpen,
    Clock,
    ArrowLeft,
    Tag,
    Twitter,
    Facebook,
    Linkedin,
    Link as LinkIcon,
    ArrowRight,
} from 'lucide-react';
import { getBlogBySlug, getPublishedBlogs, recordBlogView, type BlogPost } from '../lib/supabase';
import SEOHead, { ArticleStructuredData } from '../components/SEOHead';
import ScrollReveal from '../components/ui/ScrollReveal';

export default function BlogPostPage() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (slug) {
            loadPost(slug);
        }
    }, [slug]);

    async function loadPost(postSlug: string) {
        setLoading(true);

        const { data, error } = await getBlogBySlug(postSlug);

        if (error || !data) {
            navigate('/blog', { replace: true });
            return;
        }

        setPost(data);

        // Record view
        recordBlogView(data.id, document.referrer);

        // Load related posts
        if (data.category) {
            const { data: related } = await getPublishedBlogs({
                category: data.category,
                limit: 3,
            });
            if (related) {
                setRelatedPosts(related.filter((p) => p.id !== data.id).slice(0, 2));
            }
        }

        setLoading(false);
    }

    const formatDate = (date: string | null) => {
        if (!date) return '';
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const shareUrl = `https://stachbit.in/blog/${slug}`;
    const shareTitle = post?.title || '';

    const handleShare = (platform: string) => {
        const urls: Record<string, string> = {
            twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
        };

        if (urls[platform]) {
            window.open(urls[platform], '_blank', 'width=600,height=400');
        }
    };

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    // Improved markdown parser
    const renderContent = (content: string) => {
        // Normalize line endings
        const normalizedContent = content.replace(/\r\n/g, '\n');

        // Split by code blocks first to preserve them
        const codeBlockRegex = /(```[\s\S]*?```)/g;
        const parts = normalizedContent.split(codeBlockRegex);

        return parts.map((part, partIndex) => {
            // Render code blocks as-is
            if (part.startsWith('```')) {
                const lines = part.split('\n');
                const language = lines[0].replace('```', '').trim();
                const code = lines.slice(1, -1).join('\n');
                return (
                    <pre key={partIndex} className="bg-dark-800/80 backdrop-blur border border-dark-700 rounded-xl p-6 overflow-x-auto my-8">
                        {language && (
                            <div className="text-xs text-dark-500 mb-3 uppercase tracking-wide">{language}</div>
                        )}
                        <code className="text-sm text-primary-300 font-mono leading-relaxed">{code}</code>
                    </pre>
                );
            }

            // Process regular content by splitting into lines
            const lines = part.split('\n');
            const elements: React.ReactElement[] = [];
            let currentParagraph: string[] = [];
            let inList = false;
            let listItems: string[] = [];

            const flushParagraph = () => {
                if (currentParagraph.length > 0) {
                    const text = currentParagraph.join(' ').trim();
                    if (text) {
                        elements.push(
                            <p key={`p-${elements.length}`} className="text-dark-200 text-lg leading-relaxed mb-6">
                                {renderInlineFormatting(text)}
                            </p>
                        );
                    }
                    currentParagraph = [];
                }
            };

            const flushList = () => {
                if (listItems.length > 0) {
                    elements.push(
                        <ul key={`ul-${elements.length}`} className="my-6 space-y-3 pl-6">
                            {listItems.map((item, i) => (
                                <li key={i} className="text-dark-200 text-lg leading-relaxed flex items-start gap-3">
                                    <span className="w-2 h-2 rounded-full bg-primary-400 mt-3 flex-shrink-0" />
                                    <span>{renderInlineFormatting(item)}</span>
                                </li>
                            ))}
                        </ul>
                    );
                    listItems = [];
                    inList = false;
                }
            };

            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                const trimmedLine = line.trim();

                // Empty line - flush current elements
                if (!trimmedLine) {
                    if (inList) flushList();
                    flushParagraph();
                    continue;
                }

                // H1 heading
                if (trimmedLine.startsWith('# ')) {
                    if (inList) flushList();
                    flushParagraph();
                    elements.push(
                        <h1 key={`h1-${elements.length}`} className="text-3xl md:text-4xl font-bold text-white mt-12 mb-6 leading-tight">
                            {renderInlineFormatting(trimmedLine.replace(/^# /, ''))}
                        </h1>
                    );
                    continue;
                }

                // H2 heading
                if (trimmedLine.startsWith('## ')) {
                    if (inList) flushList();
                    flushParagraph();
                    elements.push(
                        <h2 key={`h2-${elements.length}`} className="text-2xl md:text-3xl font-bold text-white mt-10 mb-5 leading-tight border-l-4 border-primary-500 pl-4">
                            {renderInlineFormatting(trimmedLine.replace(/^## /, ''))}
                        </h2>
                    );
                    continue;
                }

                // H3 heading
                if (trimmedLine.startsWith('### ')) {
                    if (inList) flushList();
                    flushParagraph();
                    elements.push(
                        <h3 key={`h3-${elements.length}`} className="text-xl md:text-2xl font-semibold text-white mt-8 mb-4">
                            {renderInlineFormatting(trimmedLine.replace(/^### /, ''))}
                        </h3>
                    );
                    continue;
                }

                // H4 heading
                if (trimmedLine.startsWith('#### ')) {
                    if (inList) flushList();
                    flushParagraph();
                    elements.push(
                        <h4 key={`h4-${elements.length}`} className="text-lg md:text-xl font-semibold text-white mt-6 mb-3">
                            {renderInlineFormatting(trimmedLine.replace(/^#### /, ''))}
                        </h4>
                    );
                    continue;
                }

                // Bullet list items (- or *)
                if (trimmedLine.match(/^[-*] /)) {
                    if (!inList) {
                        flushParagraph();
                        inList = true;
                    }
                    listItems.push(trimmedLine.replace(/^[-*] /, ''));
                    continue;
                }

                // Numbered list items
                if (trimmedLine.match(/^\d+\. /)) {
                    if (inList) flushList();
                    flushParagraph();
                    // Collect all numbered items
                    const orderedItems: string[] = [trimmedLine.replace(/^\d+\. /, '')];
                    while (i + 1 < lines.length && lines[i + 1].trim().match(/^\d+\. /)) {
                        i++;
                        orderedItems.push(lines[i].trim().replace(/^\d+\. /, ''));
                    }
                    elements.push(
                        <ol key={`ol-${elements.length}`} className="my-6 space-y-3 pl-6 list-decimal list-inside">
                            {orderedItems.map((item, idx) => (
                                <li key={idx} className="text-dark-200 text-lg leading-relaxed pl-2">
                                    {renderInlineFormatting(item)}
                                </li>
                            ))}
                        </ol>
                    );
                    continue;
                }

                // Blockquote
                if (trimmedLine.startsWith('> ')) {
                    if (inList) flushList();
                    flushParagraph();
                    elements.push(
                        <blockquote key={`bq-${elements.length}`} className="border-l-4 border-primary-500 pl-6 my-8 py-2 bg-primary-500/5 rounded-r-lg">
                            <p className="text-dark-200 text-lg italic">
                                {renderInlineFormatting(trimmedLine.replace(/^> /, ''))}
                            </p>
                        </blockquote>
                    );
                    continue;
                }

                // Horizontal rule
                if (trimmedLine.match(/^[-*_]{3,}$/)) {
                    if (inList) flushList();
                    flushParagraph();
                    elements.push(
                        <hr key={`hr-${elements.length}`} className="my-10 border-dark-700" />
                    );
                    continue;
                }

                // Regular text - add to current paragraph
                if (inList) flushList();
                currentParagraph.push(trimmedLine);
            }

            // Flush any remaining content
            if (inList) flushList();
            flushParagraph();

            return elements.length > 0 ? <div key={partIndex}>{elements}</div> : null;
        });
    };

    // Render inline formatting (bold, italic, code, links)
    const renderInlineFormatting = (text: string): React.ReactNode => {
        // Process the text and return React elements
        const parts: React.ReactNode[] = [];
        let remaining = text;
        let key = 0;

        while (remaining.length > 0) {
            // Bold: **text**
            const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
            // Italic: *text* or _text_
            const italicMatch = remaining.match(/(?<!\*)\*([^*]+?)\*(?!\*)|_([^_]+?)_/);
            // Inline code: `code`
            const codeMatch = remaining.match(/`([^`]+)`/);
            // Link: [text](url)
            const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);

            // Find the earliest match
            const matches = [
                { match: boldMatch, type: 'bold' },
                { match: italicMatch, type: 'italic' },
                { match: codeMatch, type: 'code' },
                { match: linkMatch, type: 'link' },
            ].filter(m => m.match !== null)
                .sort((a, b) => (a.match!.index || 0) - (b.match!.index || 0));

            if (matches.length === 0) {
                // No more matches, add remaining text
                parts.push(remaining);
                break;
            }

            const firstMatch = matches[0];
            const match = firstMatch.match!;
            const index = match.index || 0;

            // Add text before the match
            if (index > 0) {
                parts.push(remaining.substring(0, index));
            }

            // Add formatted element
            switch (firstMatch.type) {
                case 'bold':
                    parts.push(
                        <strong key={key++} className="font-bold text-white">
                            {match[1]}
                        </strong>
                    );
                    remaining = remaining.substring(index + match[0].length);
                    break;
                case 'italic':
                    parts.push(
                        <em key={key++} className="italic text-dark-100">
                            {match[1] || match[2]}
                        </em>
                    );
                    remaining = remaining.substring(index + match[0].length);
                    break;
                case 'code':
                    parts.push(
                        <code key={key++} className="bg-dark-800 px-2 py-1 rounded text-primary-400 text-base font-mono">
                            {match[1]}
                        </code>
                    );
                    remaining = remaining.substring(index + match[0].length);
                    break;
                case 'link':
                    parts.push(
                        <a
                            key={key++}
                            href={match[2]}
                            className="text-primary-400 hover:text-primary-300 underline underline-offset-2"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {match[1]}
                        </a>
                    );
                    remaining = remaining.substring(index + match[0].length);
                    break;
            }
        }

        return parts.length === 1 && typeof parts[0] === 'string' ? parts[0] : <>{parts}</>;
    };

    if (loading) {
        return (
            <div className="min-h-screen py-20">
                <div className="container-custom max-w-4xl">
                    <div className="skeleton h-8 w-48 mb-8 rounded" />
                    <div className="skeleton h-12 w-full mb-4 rounded" />
                    <div className="skeleton h-6 w-3/4 mb-8 rounded" />
                    <div className="skeleton h-96 w-full mb-8 rounded-2xl" />
                    <div className="space-y-4">
                        <div className="skeleton h-4 w-full rounded" />
                        <div className="skeleton h-4 w-full rounded" />
                        <div className="skeleton h-4 w-3/4 rounded" />
                    </div>
                </div>
            </div>
        );
    }

    if (!post) {
        return null;
    }

    return (
        <>
            <SEOHead
                title={post.meta_title || post.title}
                description={post.meta_description || post.excerpt || ''}
                keywords={post.meta_keywords || undefined}
                image={post.og_image || post.featured_image || undefined}
                url={`/blog/${post.slug}`}
                type="article"
                author={post.author_name}
                publishedTime={post.published_at || post.created_at}
                modifiedTime={post.updated_at}
            />

            <ArticleStructuredData
                title={post.title}
                description={post.excerpt || post.meta_description || ''}
                image={post.og_image || post.featured_image || undefined}
                url={`/blog/${post.slug}`}
                author={post.author_name}
                publishedTime={post.published_at || post.created_at}
                modifiedTime={post.updated_at}
            />

            <article className="min-h-screen">
                {/* Header */}
                <header className="relative py-20 lg:py-32 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary-900/20 via-dark-900 to-dark-950" />

                    {/* Background Image */}
                    {post.featured_image && (
                        <div className="absolute inset-0">
                            <img
                                src={post.featured_image}
                                alt={post.title}
                                className="w-full h-full object-cover opacity-10"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-dark-950/80 via-dark-950/90 to-dark-950" />
                        </div>
                    )}

                    <div className="container-custom relative z-10 max-w-4xl">
                        <ScrollReveal>
                            <Link
                                to="/blog"
                                className="inline-flex items-center gap-2 text-dark-400 hover:text-white transition-colors mb-8"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to Blog
                            </Link>
                        </ScrollReveal>

                        <ScrollReveal delay={100}>
                            <div className="flex flex-wrap items-center gap-3 mb-6">
                                {post.category && (
                                    <span className="badge-primary">{post.category}</span>
                                )}
                                {post.tags?.slice(0, 3).map((tag) => (
                                    <span key={tag} className="badge">
                                        <Tag className="w-3 h-3 mr-1" />
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={200}>
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white mb-6">
                                {post.title}
                            </h1>
                        </ScrollReveal>

                        {post.excerpt && (
                            <ScrollReveal delay={300}>
                                <p className="text-xl text-dark-300 mb-8">{post.excerpt}</p>
                            </ScrollReveal>
                        )}

                        <ScrollReveal delay={400}>
                            <div className="flex flex-wrap items-center gap-6 text-dark-400">
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-semibold">
                                        {post.author_name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">{post.author_name}</p>
                                        <p className="text-sm">{formatDate(post.published_at)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    <span>{post.read_time_minutes} min read</span>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </header>

                {/* Featured Image */}
                {post.featured_image && (
                    <section className="container-custom max-w-4xl -mt-8 relative z-10">
                        <ScrollReveal>
                            <div className="rounded-2xl overflow-hidden border border-dark-700 shadow-2xl shadow-black/50">
                                <img
                                    src={post.featured_image}
                                    alt={post.title}
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        </ScrollReveal>
                    </section>
                )}

                {/* Content */}
                <section className="py-12">
                    <div className="container-custom max-w-4xl">
                        <div className="flex gap-8">
                            {/* Main Content */}
                            <div className="flex-1 min-w-0">
                                <ScrollReveal>
                                    <div className="prose prose-invert max-w-none">
                                        {renderContent(post.content)}
                                    </div>
                                </ScrollReveal>

                                {/* Tags */}
                                {post.tags && post.tags.length > 0 && (
                                    <div className="mt-12 pt-8 border-t border-dark-700">
                                        <h3 className="text-sm font-semibold text-dark-400 mb-4">Tags</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {post.tags.map((tag) => (
                                                <span key={tag} className="badge">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Share */}
                                <div className="mt-8 pt-8 border-t border-dark-700">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-semibold text-dark-400">Share this article</h3>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleShare('twitter')}
                                                className="p-2 rounded-lg bg-dark-800 hover:bg-[#1DA1F2] text-dark-400 hover:text-white transition-all"
                                                title="Share on Twitter"
                                            >
                                                <Twitter className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleShare('facebook')}
                                                className="p-2 rounded-lg bg-dark-800 hover:bg-[#1877F2] text-dark-400 hover:text-white transition-all"
                                                title="Share on Facebook"
                                            >
                                                <Facebook className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleShare('linkedin')}
                                                className="p-2 rounded-lg bg-dark-800 hover:bg-[#0A66C2] text-dark-400 hover:text-white transition-all"
                                                title="Share on LinkedIn"
                                            >
                                                <Linkedin className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={copyLink}
                                                className="p-2 rounded-lg bg-dark-800 hover:bg-primary-500 text-dark-400 hover:text-white transition-all"
                                                title="Copy link"
                                            >
                                                <LinkIcon className="w-5 h-5" />
                                            </button>
                                            {copied && (
                                                <span className="text-sm text-green-400">Copied!</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <section className="py-12 bg-dark-900/50">
                        <div className="container-custom max-w-4xl">
                            <ScrollReveal>
                                <h2 className="text-2xl font-bold text-white mb-8">Related Articles</h2>
                            </ScrollReveal>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {relatedPosts.map((relatedPost, index) => (
                                    <ScrollReveal key={relatedPost.id} delay={index * 100}>
                                        <Link
                                            to={`/blog/${relatedPost.slug}`}
                                            className="group block card overflow-hidden hover:border-primary-500/50 transition-all"
                                        >
                                            <div className="relative h-40 bg-dark-800">
                                                {relatedPost.featured_image ? (
                                                    <img
                                                        src={relatedPost.featured_image}
                                                        alt={relatedPost.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <BookOpen className="w-8 h-8 text-dark-600" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-4">
                                                <h3 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-primary-400 transition-colors">
                                                    {relatedPost.title}
                                                </h3>
                                                <div className="flex items-center gap-2 text-xs text-dark-500">
                                                    <Clock className="w-3 h-3" />
                                                    {relatedPost.read_time_minutes} min read
                                                </div>
                                            </div>
                                        </Link>
                                    </ScrollReveal>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* CTA */}
                <section className="py-16">
                    <div className="container-custom max-w-4xl">
                        <ScrollReveal>
                            <div className="glass rounded-3xl p-8 text-center">
                                <h2 className="text-2xl font-bold text-white mb-4">
                                    Want to Build Something Amazing?
                                </h2>
                                <p className="text-dark-400 mb-6">
                                    Let's work together to bring your ideas to life.
                                </p>
                                <Link to="/contact" className="btn-primary group">
                                    Get in Touch
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>
            </article>
        </>
    );
}
