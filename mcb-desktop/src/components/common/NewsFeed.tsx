import React from 'react';
import { useNews } from '../../hooks/useNews';

interface NewsItem {
    title: string;
    link: string;
    description: string;
    pubDate: string;
    source: string;
}

const NewsFeed: React.FC = () => {
    const [selectedFilters, setSelectedFilters] = React.useState<string[]>([]);
    const { news, loading, error } = useNews(30, selectedFilters);

    const examFilters = [
        { label: 'All Exams', value: '' },
        { label: 'JEE', value: 'JEE' },
        { label: 'BITSAT', value: 'BITSAT' },
        { label: 'VITEEE', value: 'VITEEE' },
        { label: 'SRMJEEE', value: 'SRMJEEE' },
        { label: 'WBJEE', value: 'WBJEE' },
        { label: 'MHT CET', value: 'MHT CET' },
        { label: 'KCET', value: 'KCET' },
        { label: 'EAMCET', value: 'EAMCET' },
        { label: 'COMEDK', value: 'COMEDK' },
    ];

    const toggleFilter = (value: string) => {
        if (value === '') {
            setSelectedFilters([]);
        } else {
            setSelectedFilters(prev =>
                prev.includes(value)
                    ? prev.filter(f => f !== value)
                    : [...prev, value]
            );
        }
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto p-8">
                <div className="flex flex-col items-center justify-center min-h-[400px]">
                    <div className="relative mb-6">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {selectedFilters.length > 0
                            ? `Searching for ${selectedFilters.join(', ')} news...`
                            : 'Looking for latest news on internet...'}
                    </h3>
                    <p className="text-gray-500 text-sm">Please wait while we fetch the latest updates</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Unable to load news</h3>
                <p className="text-gray-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-8">
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Education News</h1>
                        <p className="text-gray-500">Latest updates from top sources</p>
                    </div>
                    <div className="hidden md:block">
                        <span className="bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                            <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
                            LIVE UPDATES
                        </span>
                    </div>
                </div>
            </div>

            {/* Filter Chips */}
            <div className="mb-6 overflow-x-auto">
                <div className="flex gap-2 pb-2">
                    {examFilters.map((filter) => (
                        <button
                            key={filter.value}
                            onClick={() => toggleFilter(filter.value)}
                            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${filter.value === '' && selectedFilters.length === 0
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                                : selectedFilters.includes(filter.value)
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.map((item, index) => (
                    <a
                        key={index}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 flex flex-col h-full"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg ${item.source === 'Google News' ? 'bg-blue-50 text-blue-600' :
                                    item.source === 'The Hindu' ? 'bg-green-50 text-green-600' :
                                        item.source === 'Indian Express' ? 'bg-purple-50 text-purple-600' :
                                            item.source === 'Livemint' ? 'bg-orange-50 text-orange-600' :
                                                'bg-gray-50 text-gray-600'
                                }`}>
                                {item.source}
                            </span>
                            <span className="text-xs text-gray-400 font-medium">
                                {new Date(item.pubDate).toLocaleDateString()}
                            </span>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {item.title}
                        </h3>

                        <p className="text-sm text-gray-500 mb-6 line-clamp-3 flex-1">
                            {item.description}
                        </p>

                        <div className="flex items-center text-blue-600 text-sm font-bold group-hover:gap-2 transition-all">
                            Read Full Story
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default NewsFeed;
