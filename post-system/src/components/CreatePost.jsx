import React, { useState } from "react";
import PostModal from "./PostModal";
import PostList from "./PostList";
import "../App.css";

const CreatePost = () => {
  const [posts, setPosts] = useState(() => {
    return JSON.parse(sessionStorage.getItem("posts")) || [];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [votedPosts, setVotedPosts] = useState({});


  // crear vote ans
  const clearVoteOnEdit = (postId) => {
  setVotedPosts((prev) => {
    const updated = { ...prev };
    delete updated[postId];
    sessionStorage.setItem("votedPosts", JSON.stringify(updated)); // optional
    return updated;
  });
};


  // Open modal to create a new post
  const openCreateModal = () => {
    setEditingPost(null);
    setIsModalOpen(true);
  };

  // Open modal to edit a post
  const openEditModal = (post) => {
    const updated = posts.map((p)=>
    p.id=== post.id ? { ...p, selectedOption:null}:p);
    sessionStorage.setItem("posts",JSON.stringify(updated));
    setPosts(updated);
    setEditingPost({ ...post, selectedOption:null });
    setIsModalOpen(true);
  };

  return (
    <>
      {isModalOpen && (
        <PostModal
          posts={posts}
          setPosts={setPosts}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          editingPost={editingPost}
          setEditingPost={setEditingPost}
          clearVoteOnEdit={clearVoteOnEdit}
        />
        
      )}

      <div className={`app ${isModalOpen ? "blurred" : ""}`}>
  <div className={`post-button-wrapper ${posts.length === 0 ? "center-screen" : "top-center"}`}>
    <button onClick={openCreateModal} className="open-btn">
      Post
    </button>
  </div>

  <PostList 
    posts={posts} 
    setPosts={setPosts} 
    onEdit={openEditModal} 
    votedPosts={votedPosts}
    setVotedPosts={setVotedPosts}
  />
</div>
    </>
  );
};

export default CreatePost;
