import React, { useState } from 'react';

export interface FileAttachment {
    id: string;
    name: string;
    type: string;
    size: number;
    url: string;
    preview?: string; // For images
}

export interface Comment {
    id: string;
    author: string;
    content: string;
    timestamp: string;
    votes: number;
    isMentor?: boolean;
    replies?: Comment[];
    attachments?: FileAttachment[];
}

export interface Post {
    id: string;
    title: string;
    content: string;
    author: string;
    timestamp: string;
    votes: number;
    tags: string[];
    comments: Comment[];
    viewCount: number;
    attachments?: FileAttachment[];
}

interface DiscussionThreadProps {
    post: Post;
    onBack: () => void;
    onAddComment: (postId: string, content: string) => void;
    onVotePost: (postId: string, delta: number) => void;
    onVoteComment: (commentId: string, delta: number) => void;
}

const DiscussionThread: React.FC<DiscussionThreadProps> = ({ post, onBack, onAddComment, onVotePost, onVoteComment }) => {
    const [newComment, setNewComment] = useState('');

    const handleSubmitComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (newComment.trim()) {
            onAddComment(post.id, newComment);
            setNewComment('');
        }
    };

    const CommentItem = ({ comment }: { comment: Comment }) => (
        <div className="flex gap-3 mb-6">
            <div className="flex flex-col items-center gap-1 text-gray-400">
                <button onClick={() => onVoteComment(comment.id, 1)} className="hover:text-orange-500 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" /></svg>
                </button>
                <span className="text-xs font-bold">{comment.votes}</span>
                <button onClick={() => onVoteComment(comment.id, -1)} className="hover:text-blue-500 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </button>
            </div>
            <div className="flex-1 bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                    <span className={`font-bold text-sm ${comment.isMentor ? 'text-blue-600' : 'text-gray-900'}`}>
                        {comment.author}
                    </span>
                    {comment.isMentor && (
                        <span className="bg-blue-100 text-blue-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full">MENTOR</span>
                    )}
                    <span className="text-xs text-gray-400">• {new Date(comment.timestamp).toLocaleDateString()}</span>
                </div>
                <p className="text-gray-800 text-sm leading-relaxed">{comment.content}</p>
                <div className="mt-3 flex gap-4 text-xs text-gray-500 font-bold">
                    <button className="hover:bg-gray-200 px-2 py-1 rounded transition-colors">Reply</button>
                    <button className="hover:bg-gray-200 px-2 py-1 rounded transition-colors">Share</button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-white min-h-full">
            {/* Header */}
            <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 p-4 flex items-center gap-4 z-10">
                <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </button>
                <h2 className="font-bold text-gray-900 text-lg truncate flex-1">{post.title}</h2>
            </div>

            <div className="max-w-4xl mx-auto p-6">
                {/* Main Post */}
                <div className="flex gap-4 mb-8">
                    {/* Vote Sidebar */}
                    <div className="flex flex-col items-center gap-1 text-gray-500">
                        <button onClick={() => onVotePost(post.id, 1)} className="p-1 hover:bg-gray-100 rounded hover:text-orange-500 transition-colors">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" /></svg>
                        </button>
                        <span className="font-bold text-lg">{post.votes}</span>
                        <button onClick={() => onVotePost(post.id, -1)} className="p-1 hover:bg-gray-100 rounded hover:text-blue-500 transition-colors">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                        </button>
                    </div>

                    {/* Post Content */}
                    <div className="flex-1">
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                            <span className="font-bold text-gray-900">r/{post.tags[0] || 'General'}</span>
                            <span>• Posted by u/{post.author}</span>
                            <span>• {new Date(post.timestamp).toLocaleDateString()}</span>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">{post.title}</h1>
                        <div className="prose prose-blue max-w-none text-gray-800 mb-6">
                            <p>{post.content}</p>
                        </div>
                        <div className="flex gap-2 mb-6">
                            {post.tags.map(tag => (
                                <span key={tag} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                        <div className="flex items-center gap-6 text-gray-500 text-sm font-bold border-t border-gray-100 pt-4">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                                {post.comments.length} Comments
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                                Share
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                                Save
                            </div>
                        </div>
                    </div>
                </div>

                {/* Comment Input */}
                <div className="mb-8 ml-12">
                    <form onSubmit={handleSubmitComment} className="border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 transition-all">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="What are your thoughts?"
                            className="w-full p-4 bg-gray-50 focus:bg-white outline-none min-h-[100px] resize-y"
                        />
                        <div className="bg-gray-50 px-4 py-2 flex justify-end border-t border-gray-200">
                            <button
                                type="submit"
                                disabled={!newComment.trim()}
                                className="bg-blue-600 text-white px-4 py-1.5 rounded-full font-bold text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Comment
                            </button>
                        </div>
                    </form>
                </div>

                {/* Comments List */}
                <div className="ml-12">
                    {post.comments.map(comment => (
                        <CommentItem key={comment.id} comment={comment} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DiscussionThread;
