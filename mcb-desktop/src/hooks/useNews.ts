import { useState, useEffect } from 'react';

export interface NewsItem {
    title: string;
    link: string;
    description: string;
    pubDate: string;
    source: 'Times of India' | 'Google News' | 'The Hindu' | 'Indian Express' | 'Livemint';
    isoDate: Date;
}

const RSS_FEEDS = [
    {
        url: 'https://timesofindia.indiatimes.com/rssfeeds/913168846.cms',
        source: 'Times of India' as const
    },
    {
        url: 'https://news.google.com/rss/search?q=JEE+BITSAT+VITEEE+entrance+exam+india&hl=en-IN&gl=IN&ceid=IN:en',
        source: 'Google News' as const
    },
    {
        url: 'https://www.thehindu.com/education/feeder/default.rss',
        source: 'The Hindu' as const
    },
    {
        url: 'https://indianexpress.com/section/education/feed/',
        source: 'Indian Express' as const
    },
    {
        url: 'https://www.livemint.com/rss/education',
        source: 'Livemint' as const
    }
];

export const useNews = (limit: number = 10, selectedFilters: string[] = []) => {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true); // Reset loading state when filters change

        const fetchAllNews = async () => {
            try {
                const promises = RSS_FEEDS.map(async (feed) => {
                    try {
                        const response = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(feed.url)}`);
                        if (!response.ok) return [];

                        const text = await response.text();
                        const parser = new DOMParser();
                        const xml = parser.parseFromString(text, 'text/xml');

                        return Array.from(xml.querySelectorAll('item')).map(item => {
                            const description = item.querySelector('description')?.textContent || '';
                            const cleanDescription = description.replace(/<[^>]*>?/gm, '').slice(0, 150) + (description.length > 150 ? '...' : '');
                            const pubDateStr = item.querySelector('pubDate')?.textContent || '';

                            return {
                                title: item.querySelector('title')?.textContent || '',
                                link: item.querySelector('link')?.textContent || '',
                                description: cleanDescription,
                                pubDate: pubDateStr,
                                source: feed.source,
                                isoDate: new Date(pubDateStr)
                            };
                        });
                    } catch (err) {
                        console.error(`Error fetching ${feed.source}:`, err);
                        return [];
                    }
                });

                const results = await Promise.all(promises);
                const allNews = results.flat();

                // Sort by date (newest first)
                const sortedNews = allNews.sort((a, b) => b.isoDate.getTime() - a.isoDate.getTime());

                // Deduplicate by title (simple exact match)
                const seenTitles = new Set();
                const uniqueNews = sortedNews.filter(item => {
                    if (seenTitles.has(item.title)) return false;
                    seenTitles.add(item.title);
                    return true;
                });

                // Filter by keywords - broad engineering/entrance exam filter
                const KEYWORDS = [
                    'JEE', 'IIT', 'NIT', 'IIIT', 'BITS', 'VIT', 'SRM', 'Manipal', 'CET', 'GATE', 'Engineering', 'Entrance',
                    'BITSAT', 'VITEEE', 'SRMJEEE', 'WBJEE', 'MHT CET', 'KCET', 'EAMCET', 'COMEDK', 'admission', 'exam'
                ];
                const filteredNews = uniqueNews.filter(item => {
                    const text = `${item.title} ${item.description}`.toLowerCase();
                    return KEYWORDS.some(keyword => text.includes(keyword.toLowerCase()));
                });

                // Apply selected filters if any
                let finalNews = filteredNews;
                if (selectedFilters.length > 0) {
                    finalNews = filteredNews.filter(item => {
                        const text = `${item.title} ${item.description}`.toLowerCase();
                        // Check if ANY of the selected filters match
                        return selectedFilters.some(filter => {
                            const filterLower = filter.toLowerCase();
                            // More flexible matching - check for partial matches
                            return text.includes(filterLower) ||
                                text.includes(filterLower.replace(/\s+/g, '')) || // Remove spaces
                                (filterLower === 'jee' && (text.includes('jee main') || text.includes('jee advanced')));
                        });
                    });
                }

                setNews(finalNews.slice(0, limit));
                setLoading(false);
            } catch (err) {
                console.error('Error fetching news:', err);
                setError('Failed to load latest news.');
                setLoading(false);
            }
        };

        fetchAllNews();
    }, [limit, selectedFilters]);

    return { news, loading, error };
};
