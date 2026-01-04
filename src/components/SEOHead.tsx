import { useEffect } from 'react';

interface SEOHeadProps {
    title: string;
    description: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article';
    author?: string;
    publishedTime?: string;
    modifiedTime?: string;
}

export default function SEOHead({
    title,
    description,
    keywords,
    image,
    url,
    type = 'website',
    author,
    publishedTime,
    modifiedTime,
}: SEOHeadProps) {
    const siteName = 'Stachbit';
    const baseUrl = 'https://stachbit.in';
    const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
    const ogImage = image || `${baseUrl}/og-default.png`;

    useEffect(() => {
        // Update document title
        document.title = title ? `${title} | ${siteName}` : siteName;

        // Helper to update or create meta tag
        const updateMeta = (property: string, content: string, isName = false) => {
            const selector = isName ? `meta[name="${property}"]` : `meta[property="${property}"]`;
            let element = document.querySelector(selector);
            if (!element) {
                element = document.createElement('meta');
                if (isName) {
                    element.setAttribute('name', property);
                } else {
                    element.setAttribute('property', property);
                }
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };

        // Helper to update link tag
        const updateLink = (rel: string, href: string) => {
            let element = document.querySelector(`link[rel="${rel}"]`);
            if (!element) {
                element = document.createElement('link');
                element.setAttribute('rel', rel);
                document.head.appendChild(element);
            }
            element.setAttribute('href', href);
        };

        // Basic meta tags
        updateMeta('description', description, true);
        if (keywords) {
            updateMeta('keywords', keywords, true);
        }

        // Open Graph tags
        updateMeta('og:title', title);
        updateMeta('og:description', description);
        updateMeta('og:image', ogImage);
        updateMeta('og:url', fullUrl);
        updateMeta('og:type', type);
        updateMeta('og:site_name', siteName);

        // Twitter Card tags
        updateMeta('twitter:card', 'summary_large_image', true);
        updateMeta('twitter:title', title, true);
        updateMeta('twitter:description', description, true);
        updateMeta('twitter:image', ogImage, true);

        // Article-specific meta tags
        if (type === 'article') {
            if (author) {
                updateMeta('article:author', author);
            }
            if (publishedTime) {
                updateMeta('article:published_time', publishedTime);
            }
            if (modifiedTime) {
                updateMeta('article:modified_time', modifiedTime);
            }
        }

        // Canonical URL
        updateLink('canonical', fullUrl);

        // Cleanup function to reset on unmount
        return () => {
            document.title = siteName;
        };
    }, [title, description, keywords, ogImage, fullUrl, type, author, publishedTime, modifiedTime]);

    return null;
}

// Structured data component for articles
export function ArticleStructuredData({
    title,
    description,
    image,
    url,
    author,
    publishedTime,
    modifiedTime,
}: {
    title: string;
    description: string;
    image?: string;
    url: string;
    author: string;
    publishedTime: string;
    modifiedTime?: string;
}) {
    const baseUrl = 'https://stachbit.in';
    const fullUrl = `${baseUrl}${url}`;
    const ogImage = image || `${baseUrl}/og-default.png`;

    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description: description,
        image: ogImage,
        url: fullUrl,
        author: {
            '@type': 'Person',
            name: author,
        },
        publisher: {
            '@type': 'Organization',
            name: 'Stachbit',
            logo: {
                '@type': 'ImageObject',
                url: `${baseUrl}/logo.png`,
            },
        },
        datePublished: publishedTime,
        dateModified: modifiedTime || publishedTime,
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': fullUrl,
        },
    };

    useEffect(() => {
        // Add structured data script
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = 'article-structured-data';
        script.textContent = JSON.stringify(structuredData);

        // Remove existing script if present
        const existing = document.getElementById('article-structured-data');
        if (existing) {
            existing.remove();
        }

        document.head.appendChild(script);

        return () => {
            const scriptToRemove = document.getElementById('article-structured-data');
            if (scriptToRemove) {
                scriptToRemove.remove();
            }
        };
    }, [title, description, ogImage, fullUrl, author, publishedTime, modifiedTime]);

    return null;
}
