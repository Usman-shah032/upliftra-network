import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CommunityPost } from '../../types';
import {
  MessageSquare,
  ThumbsUp,
  Share2,
  Plus,
  Send,
  Sparkles,
  Tag,
  X,
  User
} from 'lucide-react';

export const CommunityForum: React.FC = () => {
  const { posts, createPost, toggleUpvotePost, addCommentToPost, currentUser } = useApp();

  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTags, setNewTags] = useState('Career Advice, Tech');
  const [activePostIdForComment, setActivePostIdForComment] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState('');

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    createPost(
      newTitle,
      newContent,
      newTags.split(',').map((t) => t.trim())
    );

    setIsNewPostModalOpen(false);
    setNewTitle('');
    setNewContent('');
  };

  const handleAddComment = (postId: string) => {
    if (!commentInput.trim()) return;
    addCommentToPost(postId, commentInput);
    setCommentInput('');
    setActivePostIdForComment(null);
  };

  return (
    <div className="py-10 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top Header */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">
              Community & Discussions
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Ask questions, share interview experiences, FYP guidance, and scholarship tips.
            </p>
          </div>

          <button
            id="btn-create-post-trigger"
            onClick={() => setIsNewPostModalOpen(true)}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition shadow-xs flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Start Discussion</span>
          </button>
        </div>

        {/* Posts Feed */}
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              id={`post-${post.id}`}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4"
            >
              {/* Author Row */}
              <div className="flex items-center gap-3">
                <img
                  src={post.authorAvatar}
                  alt={post.authorName}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                />
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    {post.authorName}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {post.authorHeadline} • {post.createdAt}
                  </p>
                </div>
              </div>

              {/* Title & Body */}
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {post.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                  {post.content}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {post.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-medium"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              {/* Action Bar */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleUpvotePost(post.id)}
                    className={`flex items-center gap-1.5 font-bold transition ${
                      post.isUpvoted
                        ? 'text-blue-600'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    <ThumbsUp className={`w-4 h-4 ${post.isUpvoted ? 'fill-current' : ''}`} />
                    <span>{post.upvotes} Upvotes</span>
                  </button>

                  <button
                    onClick={() =>
                      setActivePostIdForComment(activePostIdForComment === post.id ? null : post.id)
                    }
                    className="flex items-center gap-1.5 font-bold text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 transition"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{post.commentCount} Comments</span>
                  </button>
                </div>
              </div>

              {/* Comments Section */}
              {post.comments && post.comments.length > 0 && (
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800/60 space-y-2">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Comments
                  </div>
                  {post.comments.map((comm) => (
                    <div
                      key={comm.id}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                          {comm.authorName} ({comm.authorRole})
                        </span>
                        <span className="text-[10px] text-slate-400">{comm.createdAt}</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300">{comm.content}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Comment Input */}
              {activePostIdForComment === post.id && (
                <div className="pt-2 flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Write a helpful response..."
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAddComment(post.id);
                    }}
                    className="flex-1 px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                  <button
                    onClick={() => handleAddComment(post.id)}
                    className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl"
                  >
                    Post
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* New Post Modal */}
      {isNewPostModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Start a Discussion on Upliftra
              </h3>
              <button onClick={() => setIsNewPostModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="p-6 space-y-4 text-xs sm:text-sm">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Topic / Headline *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tips for Systems Ltd Graduate Trainee assessments?"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Discussion Content *
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Provide context, what you have tried, and how the community can help..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Tags (Comma separated)
                </label>
                <input
                  type="text"
                  placeholder="Jobs, Interview, Fast NUCES, FullStack"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewPostModalOpen(false)}
                  className="px-4 py-2 text-slate-600 dark:text-slate-400 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl"
                >
                  Publish Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
