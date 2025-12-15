import React, { useState } from 'react';
import DiscussionThread, { Post, Comment, FileAttachment } from './DiscussionThread';

const MOCK_POSTS: Post[] = [
    {
        id: 'POST-1',
        title: 'Can someone explain the concept of Moment of Inertia simply?',
        content: 'I am struggling to understand the physical significance of Moment of Inertia. Is it just mass but for rotation? How does the distribution of mass affect it practically? Any real-life examples would be appreciated!',
        author: 'physics_enthusiast',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        votes: 42,
        tags: ['Physics', 'Mechanics', 'Doubt'],
        viewCount: 156,
        comments: [
            {
                id: 'c1',
                author: 'Dr_Quantum',
                content: 'Think of it as "rotational mass". Just as mass resists linear acceleration (F=ma), moment of inertia resists angular acceleration (τ=Iα). The further the mass is from the axis of rotation, the harder it is to spin.',
                timestamp: new Date(Date.now() - 3000000).toISOString(),
                votes: 15,
                isMentor: true
            },
            {
                id: 'c2',
                author: 'student_01',
                content: 'This makes so much sense! Like how a figure skater spins faster when they pull their arms in?',
                timestamp: new Date(Date.now() - 1000000).toISOString(),
                votes: 8
            }
        ]
    },
    {
        id: 'POST-2',
        title: 'Best resources for Organic Chemistry mechanisms?',
        content: 'I keep forgetting the reagents for different reactions. Does anyone have a good cheat sheet or a YouTube channel recommendation for mastering organic reaction mechanisms?',
        author: 'chem_wizard',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        votes: 128,
        tags: ['Chemistry', 'Organic', 'Resources'],
        viewCount: 450,
        comments: [
            {
                id: 'c3',
                author: 'Mentor_Alice',
                content: 'I highly recommend "The Organic Chemistry Tutor" on YouTube. Also, try making flashcards for each reagent.',
                timestamp: new Date(Date.now() - 80000000).toISOString(),
                votes: 45,
                isMentor: true
            }
        ]
    },
    {
        id: 'POST-3',
        title: 'Calculus: Integration by Parts trick',
        content: 'Just found out about the DI method (Tabular method) for integration by parts. It saves so much time! Sharing it here for anyone who struggles with repeated IBP.',
        author: 'math_geek',
        timestamp: new Date(Date.now() - 172800000).toISOString(),
        votes: 256,
        tags: ['Math', 'Calculus', 'Tips'],
        viewCount: 890,
        comments: []
    }
];

const Community: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
    const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<'Hot' | 'New' | 'Top'>('Hot');
    const [showCreateModal, setShowCreateModal] = useState(false);

    // Create Post State
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');
    const [newTag, setNewTag] = useState('Physics');
    const [newAttachments, setNewAttachments] = useState<FileAttachment[]>([]);

    const selectedPost = posts.find(p => p.id === selectedPostId);

    const handleVote = (postId: string, delta: number) => {
        setPosts(prev => prev.map(p =>
            p.id === postId ? { ...p, votes: p.votes + delta } : p
        ));
    };

    const handleVoteComment = (commentId: string, delta: number) => {
        if (!selectedPostId) return;
        setPosts(prev => prev.map(p => {
            if (p.id === selectedPostId) {
                return {
                    ...p,
                    comments: p.comments.map(c =>
                        c.id === commentId ? { ...c, votes: c.votes + delta } : c
                    )
                };
            }
            return p;
        }));
    };

    const handleAddComment = (postId: string, content: string) => {
        const newComment: Comment = {
            id: `c${Date.now()}`,
            author: 'You',
            content,
            timestamp: new Date().toISOString(),
            votes: 1
        };

        setPosts(prev => prev.map(p =>
            p.id === postId ? { ...p, comments: [...p.comments, newComment] } : p
        ));
    };

    const handleCreatePost = (e: React.FormEvent) => {
        e.preventDefault();
        const newPost: Post = {
            id: `POST-${Date.now()}`,
            title: newTitle,
            content: newContent,
            author: 'You',
            timestamp: new Date().toISOString(),
            votes: 1,
            tags: [newTag],
            viewCount: 0,
            comments: []
        };

        setPosts([newPost, ...posts]);
        setShowCreateModal(false);
        setNewTitle('');
        setNewContent('');
    };

    if (selectedPost) {
        return (
            <DiscussionThread
                post={selectedPost}
                onBack={() => setSelectedPostId(null)}
                onAddComment={handleAddComment}
                onVotePost={handleVote}
                onVoteComment={handleVoteComment}
            />
        );
    }

    return (
        <div className="max-w-5xl mx-auto">
            {/* Header & Controls */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Community</h1>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                    Create Post
                </button>
            </div>

            {/* Sort Bar */}
            <div className="flex items-center gap-4 mb-6 bg-white p-2 rounded-xl border border-gray-100 shadow-sm w-fit">
                {['Hot', 'New', 'Top'].map((sort) => (
                    <button
                        key={sort}
                        onClick={() => setSortBy(sort as any)}
                        className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${sortBy === sort
                            ? 'bg-gray-100 text-blue-600'
                            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                    >
                        {sort}
                    </button>
                ))}
            </div>

            {/* Feed */}
            <div className="space-y-4">
                {posts.map(post => (
                    <div
                        key={post.id}
                        onClick={() => setSelectedPostId(post.id)}
                        className="bg-white p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all cursor-pointer flex gap-4"
                    >
                        {/* Vote Sidebar */}
                        <div className="flex flex-col items-center gap-1 bg-gray-50 p-2 rounded-lg h-fit min-w-[48px]">
                            <button
                                onClick={(e) => { e.stopPropagation(); handleVote(post.id, 1); }}
                                className="text-gray-400 hover:text-orange-500 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" /></svg>
                            </button>
                            <span className="font-bold text-sm text-gray-700">{post.votes}</span>
                            <button
                                onClick={(e) => { e.stopPropagation(); handleVote(post.id, -1); }}
                                className="text-gray-400 hover:text-blue-500 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 py-1">
                            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                <span className="font-bold text-gray-900">r/{post.tags[0] || 'General'}</span>
                                <span>• Posted by u/{post.author}</span>
                                <span>• {new Date(post.timestamp).toLocaleDateString()}</span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{post.title}</h3>
                            <p className="text-gray-500 text-sm line-clamp-2 mb-3">{post.content}</p>

                            <div className="flex items-center gap-4">
                                <div className="flex gap-2">
                                    {post.tags.map(tag => (
                                        <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex items-center gap-1 text-gray-500 text-xs font-bold hover:bg-gray-100 px-2 py-1 rounded transition-colors">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                                    {post.comments.length} Comments
                                </div>
                                <div className="flex items-center gap-1 text-gray-500 text-xs font-bold hover:bg-gray-100 px-2 py-1 rounded transition-colors">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                                    Share
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Create Post Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-2xl w-full">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900">Create a Post</h3>
                            <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-gray-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <form onSubmit={handleCreatePost}>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    required
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    placeholder="Title"
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 font-bold text-lg"
                                />
                                <textarea
                                    required
                                    value={newContent}
                                    onChange={(e) => setNewContent(e.target.value)}
                                    placeholder="Text (optional)"
                                    rows={6}
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 resize-none"
                                />
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Tag</label>
                                    <div className="flex gap-2">
                                        {['Physics', 'Chemistry', 'Math', 'Biology', 'General'].map(tag => (
                                            <button
                                                key={tag}
                                                type="button"
                                                onClick={() => setNewTag(tag)}
                                                className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${newTag === tag
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                    }`}
                                            >
                                                {tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 mt-8">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateModal(false)}
                                    className="px-6 py-2.5 rounded-full font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold shadow-lg shadow-blue-500/30 transition-all"
                                >
                                    Post
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Community;
