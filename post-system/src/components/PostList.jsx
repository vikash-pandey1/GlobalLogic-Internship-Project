import React, { useState } from "react";
import "./PostList.css"
import { useTranslation } from "react-i18next";
import { Trash2,Edit2 } from "lucide-react"; // Lucide trash icon

const PostList = ({ posts, setPosts,onEdit }) => {
  const { t } = useTranslation();
  const [votedPosts, setVotedPosts] = useState({});

  const deletePost = (id) => {
    const filtered = posts.filter((p) => p.id !== id);
    sessionStorage.setItem("posts", JSON.stringify(filtered));
    setPosts(filtered);
  };

  const handleVote = (postId, index) => {
    const updated = posts.map((p) => {
      if (p.id === postId) {
        return { ...p, selectedOption: index };
      }
      return p;
    });
    sessionStorage.setItem("posts", JSON.stringify(updated));
    setPosts(updated);
    setVotedPosts({ ...votedPosts, [postId]: index });
  };


  return (
    <div className="container">
      {posts.map((post) => (
        <div
          key={post.id}
          className="post-card"
        >
          <div className="post-content">

            <div className="post-header">
              <span>
                <strong>{t("postedBy")}:</strong> 👤 {post.postedBy}
              </span>
            </div>

            <div className="post-body">
              {post.isAskMode ? (
                <>
                  <p>
                    <strong>{t("question")}:</strong> ❓ {post.question}
                  </p>
                  {post.selectedOption == null ? (
                    post.options.map((opt, idx) => (
                      <button
                        key={idx}
                        className="option-button"
                        onClick={() => handleVote(post.id, idx)}
                      >
                        {opt}
                      </button>
                    ))
                  ) : (
                    <p className="option-selected">
                     <strong> {t("you selected")}: </strong> {post.options[post.selectedOption]}
                    </p>
                  )}
                </>
              ) : (
                <>
                  <p>{post.description}</p>
                  {post.files &&
                    post.files.map((media, i) =>
                      media.type === "video/mp4" ? (
                        <video
                          key={i}
                          role="video" 
                          src={media.base64}
                          controls
                          // style={{
                          //   width: "100%",
                          //   maxHeight: "300px",
                          //   borderRadius: "10px",
                          //   marginTop: "10px",
                          //   objectFit: "cover",
                          // }}
                        />
                      ) : (
                        <img
                          key={i}
                          role="img"
                          src={media.base64}
                          alt={`Post visual ${i}`}

                          // style={{
                          //   width: "100%",
                          //   maxHeight: "300px",
                          //   borderRadius: "10px",
                          //   marginTop: "10px",
                          //   objectFit: "cover",
                          // }}
                        />
                      )
                    )}
                </>
              )}
            </div>

          </div>

          <div className="post-actions">
            <button
              data-testid={`edit-btn-${post.id}`}
              onClick={() => onEdit(post)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#007bff",
                fontSize: "1.2rem",
              }}
              title={t("edit")}
            >
              <Edit2 />
            </button>
              <Trash2
              size={20}
              color="red"
              style={{ cursor: "pointer" }}
              onClick={() => deletePost(post.id)}
              title={t("delete")}
            />
          </div>

        </div>
      ))}
    </div>
  );
};

export default PostList;
