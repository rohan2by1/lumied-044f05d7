import React, { useState } from "react";
import Layout from "@/components/layout/Layout";

interface ForumPost {
  id: number;
  author: string;
  title: string;
  imageUrl?: string;
  description?: string;
  community?: string;
  timestamp: string;
  likes: number;
  comments: { id: number; author: string; content: string }[];
}

const initialPosts: ForumPost[] = [
  {
    id: 1,
    author: "Alice",
    title: "Staying Motivated in Tough Courses",
    imageUrl: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
    description: "How do you keep yourself motivated when the going gets tough? Any tips or routines?",
    community: "General",
    timestamp: new Date().toLocaleString(),
    likes: 3,
    comments: [
      { id: 1, author: "Bob", content: "I set small goals and reward myself!" },
      { id: 2, author: "Diana", content: "Music helps me focus and relax." }
    ],
  },
  {
    id: 2,
    author: "Charlie",
    title: "Study Group for Calculus?",
    imageUrl: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
    description: "Looking for people to form a study group for Calculus 101. Anyone interested?",
    community: "Math",
    timestamp: new Date().toLocaleString(),
    likes: 1,
    comments: [],
  },
  {
    id: 3,
    author: "Priya",
    title: "Cool Python Visualization!",
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
    description: "Just finished a data visualization project using matplotlib. Sharing a screenshot!",
    community: "Python",
    timestamp: new Date().toLocaleString(),
    likes: 5,
    comments: [
      { id: 1, author: "Alice", content: "Looks awesome!" }
    ],
  },
  {
    id: 4,
    author: "Lucas",
    title: "JavaScript Async/Await Explained",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    description: "Here's a simple diagram I made to explain async/await in JS. Hope it helps!",
    community: "JavaScript",
    timestamp: new Date().toLocaleString(),
    likes: 2,
    comments: [
      { id: 1, author: "Charlie", content: "Very helpful, thanks!" }
    ],
  },
  {
    id: 5,
    author: "Emma",
    title: "Motivational Quote for the Day",
    imageUrl: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    description: "\"Success is not the key to happiness. Happiness is the key to success.\"",
    community: "General",
    timestamp: new Date().toLocaleString(),
    likes: 4,
    comments: [],
  },
];

export default function Community() {
  const [posts, setPosts] = useState<ForumPost[]>(initialPosts);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostImage, setNewPostImage] = useState<string | undefined>(
    undefined
  );
  const [newPostImageFile, setNewPostImageFile] = useState<File | null>(null);
  const [newPostDescription, setNewPostDescription] = useState("");
  const [newPostCommunity, setNewPostCommunity] = useState("Python");
  const [showModal, setShowModal] = useState(false);
  const [commentInputs, setCommentInputs] = useState<{ [key: number]: string }>(
    {}
  );

  const communityOptions = ["Python", "JavaScript", "Math", "General"];

  const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setNewPostImageFile(file);
      setNewPostImage(URL.createObjectURL(file));
    }
  };

  const handleImageBrowse = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewPostImageFile(file);
      setNewPostImage(URL.createObjectURL(file));
    }
  };

  const handleAddPost = () => {
    if (!newPostTitle.trim()) return;
    setPosts([
      ...posts,
      {
        id: posts.length + 1,
        author: "You",
        title: newPostTitle,
        imageUrl: newPostImage,
        description: newPostDescription,
        community: newPostCommunity,
        timestamp: new Date().toLocaleString(),
        likes: 0,
        comments: [],
      },
    ]);
    setNewPostTitle("");
    setNewPostImage(undefined);
    setNewPostImageFile(null);
    setNewPostDescription("");
    setNewPostCommunity("Python");
    setShowModal(false);
  };

  const handleLike = (postId: number) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleAddComment = (postId: number) => {
    const comment = commentInputs[postId];
    if (!comment || !comment.trim()) return;
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: post.comments.length + 1,
                  author: "You",
                  content: comment,
                },
              ],
            }
          : post
      )
    );
    setCommentInputs({ ...commentInputs, [postId]: "" });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-6">Community</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Join our vibrant community of learners and educators.
        </p>
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-end mb-4">
            <button
              className="bg-primary text-white px-4 py-2 rounded shadow"
              onClick={() => setShowModal(true)}
            >
              Create Post
            </button>
          </div>
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
                <button
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl"
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                >
                  ×
                </button>
                <h2 className="text-2xl font-semibold mb-4">Create a Post</h2>
                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">
                    Title
                  </label>
                  <input
                    className="w-full border rounded p-2"
                    type="text"
                    placeholder="Enter a descriptive title"
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">
                    Image (optional)
                  </label>
                  <div
                    className="border-dashed border-2 border-gray-300 rounded flex flex-col items-center justify-center py-8 mb-2 cursor-pointer bg-gray-50 hover:bg-gray-100"
                    onDrop={handleImageDrop}
                    onDragOver={(e) => e.preventDefault()}
                    onClick={() =>
                      document.getElementById("image-upload-input")?.click()
                    }
                  >
                    {newPostImage ? (
                      <img
                        src={newPostImage}
                        alt="Preview"
                        className="max-h-40 mb-2 rounded"
                      />
                    ) : (
                      <>
                        <span className="text-4xl mb-2 text-gray-400">📷</span>
                        <span className="text-gray-500">
                          Drag and drop an image here
                        </span>
                        <span className="text-xs text-gray-400">
                          PNG, JPG, GIF up to 10MB
                        </span>
                        <button
                          className="mt-2 px-3 py-1 border rounded text-sm bg-gray-100 hover:bg-gray-200"
                          type="button"
                        >
                          Browse Files
                        </button>
                      </>
                    )}
                    <input
                      id="image-upload-input"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageBrowse}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">
                    Description (optional)
                  </label>
                  <textarea
                    className="w-full border rounded p-2"
                    placeholder="Add more details about your post"
                    value={newPostDescription}
                    onChange={(e) => setNewPostDescription(e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="mb-5">
                  <label className="block text-sm font-medium mb-1">
                    Community
                  </label>
                  <select
                    className="w-full border rounded p-2"
                    value={newPostCommunity}
                    onChange={(e) => setNewPostCommunity(e.target.value)}
                  >
                    {communityOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    className="px-4 py-2 rounded border bg-gray-100 hover:bg-gray-200"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-primary text-white px-4 py-2 rounded"
                    onClick={handleAddPost}
                  >
                    Create Post
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* Discussion Forums */}
          <div className="bg-card p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Discussion Forums</h2>
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="border rounded-lg p-5 bg-white shadow-sm mb-4"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold text-gray-500">
                        {post.author.charAt(0)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-base text-gray-900">
                          {post.author}
                        </span>
                        <span className="text-xs text-gray-400">
                          • {post.timestamp}
                        </span>
                        {post.community && (
                          <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium">
                            {post.community}
                          </span>
                        )}
                      </div>
                      <div className="text-xl font-bold mb-2 text-gray-900">
                        {post.title}
                      </div>
                      {post.imageUrl && (
                        <img
                          src={post.imageUrl}
                          alt="Post"
                          className="w-full max-h-72 object-contain rounded mb-3 border"
                        />
                      )}
                      {post.description && (
                        <div className="mb-2 text-base text-gray-700">
                          {post.description}
                        </div>
                      )}
                      <div className="flex items-center gap-6 text-sm text-gray-500 mb-2 mt-2">
                        <button
                          className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                          onClick={() => handleLike(post.id)}
                        >
                          <span role="img" aria-label="like">
                            ❤️
                          </span>{" "}
                          {post.likes}
                        </button>
                        <span className="flex items-center gap-1">
                          <span role="img" aria-label="comments">
                            💬
                          </span>{" "}
                          {post.comments.length}
                        </span>
                      </div>
                      <div className="ml-2 space-y-1">
                        {post.comments.map((comment) => (
                          <div
                            key={comment.id}
                            className="text-sm text-gray-600"
                          >
                            <span className="font-medium text-gray-800">
                              {comment.author}:
                            </span>{" "}
                            {comment.content}
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 flex gap-2 items-center">
                        <input
                          className="border rounded px-3 py-2 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-blue-200"
                          type="text"
                          placeholder="Write a comment..."
                          value={commentInputs[post.id] || ""}
                          onChange={(e) =>
                            setCommentInputs({
                              ...commentInputs,
                              [post.id]: e.target.value,
                            })
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleAddComment(post.id);
                          }}
                        />
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium"
                          onClick={() => handleAddComment(post.id)}
                        >
                          Post Comment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
