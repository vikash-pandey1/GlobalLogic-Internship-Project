import React, { useState, useEffect } from "react";
import "./PostModal.css";
import { Trash2 } from "lucide-react";

const PostModal = ({
  posts,
  setPosts,
  isModalOpen,
  setIsModalOpen,
  editingPost,
  setEditingPost,
  clearVoteOnEdit,
}) => {
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    question: "",
    options: [],
  });
  const [validationError, setvalidationError] = useState("");
  const [mode, setMode] = useState("thought");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);

  useEffect(() => {
    if (editingPost) {
      clearVoteOnEdit?.(editingPost.id);
      setName(editingPost.postedBy || "");
      setMode(editingPost.type || "thought");
      setDescription(editingPost.description || "");
      setFiles(editingPost.files || []);
      setQuestion(editingPost.question || "");
      setOptions(
        editingPost.options && editingPost.options.length
          ? editingPost.options
          : ["", ""]
      );
      setvalidationError("");
      setErrors({ name: "", description: "", question: "", options: [] });
    } else {
      resetForm();
    }
  }, [editingPost]);

  const resetForm = () => {
    setName("");
    setDescription("");
    setFiles([]);
    setQuestion("");
    setOptions(["", ""]);
    setMode("thought");
    setvalidationError("");
  };

  const validate = () => {
  const nameValid = /^[a-zA-Z0-9 ]{1,20}$/.test(name.trim());
  const descriptionValid =
    mode === "thought"
      ? description.trim() !== "" && /^[a-zA-Z0-9 ,.\n]{1,200}$/.test(description)
      : true;

  const filesValid =
    mode === "thought"
      ? files.length <= 10 &&
        files.every((file) =>
          ["image/png", "image/jpeg", "video/mp4"].includes(file.type)
        )
      : true;

  const questionValid =
    mode === "question"
      ? question.trim() !== "" &&
        /^[a-zA-Z0-9 ?]{1,100}$/.test(question)
      : true;

  const optionsValid =
    mode === "question"
      ? options.length >= 2 &&
        options.length <= 5 &&
        options.every((opt) => opt.trim() !== "" && /^[a-zA-Z0-9 ]+$/.test(opt))
      : true;

  return nameValid && descriptionValid && filesValid && questionValid && optionsValid;
};


  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          resolve({ base64: reader.result, type: file.type });
        } else {
          reject(new Error("File read error"));
        }
      };
      reader.onerror = () => reject(new Error("FileReader failed"));
      reader.readAsDataURL(file);
    });
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setErrors({ name: errors.name, description: "", question: "", options: [] });
  };

  return (
    <>
      {isModalOpen && (
        <>
          <div className="modal-overlay" />
          <div className="modal">
            <div className="modal-header">
              <h2>{editingPost ? "Edit Your Post" : "Share Your Thoughts"}</h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingPost(null);
                }}
                className="delete-btn"
                type="button"
                aria-label="Close modal"
              >
                <Trash2 />
              </button>
            </div>

            <form
              className="modal-body"
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  if (!validate()) {
                    setvalidationError(
                      "Please enter valid data in all required fields before submitting."
                    );
                    setTimeout(() => setvalidationError(""), 3000);
                    return;
                  }

                  const mediaFiles = files.length
                    ? await Promise.all(
                        files.map((f) => {
                          if (f.base64 && f.type) return f;
                          return convertToBase64(f).catch((err) => {
                            console.error("File processing failed:", err);
                            throw new Error("Failed to process files.");
                          });
                        })
                      )
                    : [];

                  if (editingPost) {
                    const updatedPosts = posts.map((post) =>
                      post.id === editingPost.id
                        ? {
                            ...post,
                            postedBy: name,
                            type: mode,
                            isAskMode: mode === "question",
                            description,
                            files: mediaFiles.length > 0 ? mediaFiles : post.files,
                            question,
                            options,
                          }
                        : post
                    );
                    sessionStorage.setItem("posts", JSON.stringify(updatedPosts));
                    setPosts(updatedPosts);
                    setEditingPost(null);
                  } else {
                    const newPost = {
                      id: Date.now(),
                      postedBy: name,
                      type: mode,
                      isAskMode: mode === "question",
                      description,
                      files: mediaFiles,
                      question,
                      options,
                    };
                    const updatedPosts = [...posts, newPost];
                    sessionStorage.setItem("posts", JSON.stringify(updatedPosts));
                    setPosts(updatedPosts);
                  }

                  setIsModalOpen(false);
                  resetForm();
                } catch (error) {
                  console.error("Submit error:", error.message);
                  setvalidationError(error.message || "Something went wrong.");
                  setTimeout(() => setvalidationError(""), 3000);
                }
              }}
            >
              <label htmlFor="postedBy">Posted By</label>
              <input
                id="postedBy"
                className={errors.name ? "error": ""}
                value={name}
                onChange={(e) => {
                  const value = e.target.value;
                  setName(value);
                  const isValid = /^[a-zA-Z0-9 ]{1,20}$/.test(value.trim());
                  setErrors((prev) => ({
                    ...prev,
                    name: isValid
                      ? ""
                      : "Name must be alphanumeric (max 20 characters)",
                  }));
                  if (!isValid) {
                    setTimeout(() => {
                      setErrors((prev) => ({ ...prev, name: "" }));
                    }, 3000);
                  }
                }}
              />
              {errors.name && <div className="validation-error">{errors.name}</div>}

              <div className="toggle">
                <button
                  type="button"
                  className={mode === "thought" ? "active" : ""}
                  onClick={() => handleModeChange("thought")}
                >
                  Thought
                </button>
                <button
                  type="button"
                  className={mode === "question" ? "active" : ""}
                  onClick={() => handleModeChange("question")}
                >
                  Ask a Question
                </button>
              </div>

              {mode === "thought" ? (
                <>
                  <label htmlFor="thoughtInput">Add Your Thoughts</label>
                  <textarea
                    id="thoughtInput"
                    className={errors.description ? "error":""}
                    value={description}
                    onChange={(e) => {
                      const value = e.target.value;
                      setDescription(value);
                      const isValid = /^[a-zA-Z0-9 ,.]{1,200}$/.test(value.trim());
                      setErrors((prev) => ({
                        ...prev,
                        description: isValid
                          ? ""
                          : "Invalid characters or empty description",
                      }));
                      if (!isValid) {
                        setTimeout(() => {
                          setErrors((prev) => ({ ...prev, description: "" }));
                        }, 3000);
                      }
                    }}
                  />
                  {errors.description && (
                    <div className="validation-error">{errors.description}</div>
                  )}
                </>
              ) : (
                <>
                  <label>Write Your Question</label>
                  <input
                    className={errors.question ? "erro":""}
                    value={question}
                    onChange={(e) => {
                      const value = e.target.value;
                      setQuestion(value);
                      const isValid = /^[a-zA-Z0-9 ?]{1,100}$/.test(value.trim());
                      setErrors((prev) => ({
                        ...prev,
                        question: isValid
                          ? ""
                          : "Only letters, numbers, and ? allowed",
                      }));
                    }}
                  />
                  {errors.question && (
                    <div className="validation-error">{errors.question}</div>
                  )}

                  {options.map((opt, i) => (
                    <div key={i}>
                      <label htmlFor={`option-${i}`}>{`Option ${i + 1}`}</label>
                      <input
                        id={`option-${i}`}
                        className={errors.options[i] ? "error":""}
                        value={opt}
                        onChange={(e) => {
                          const newOpts = [...options];
                          newOpts[i] = e.target.value;
                          setOptions(newOpts);

                          const newErrors = [...errors.options];
                          newErrors[i] = /^[a-zA-Z0-9 ]+$/.test(e.target.value)
                            ? ""
                            : "Only letters and numbers allowed";
                          setErrors((prev) => ({
                            ...prev,
                            options: newErrors,
                          }));
                        }}
                      />
                      {errors.options[i] && (
                        <div className="validation-error">{errors.options[i]}</div>
                      )}
                      {options.length > 2 && (
                        <button
                          type="button"
                          onClick={() => {
                            setOptions(options.filter((_, idx) => idx !== i));
                            setErrors((prev) => {
                              const newErrors = [...prev.options];
                              newErrors.splice(i, 1);
                              return { ...prev, options: newErrors };
                            });
                          }}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  {options.length < 5 && (
                    <button
                      type="button"
                      onClick={() => setOptions([...options, ""])}
                    >
                      Add Option
                    </button>
                  )}
                </>
              )}

              {mode === "thought" && (
                <>
                  <label htmlFor="file-upload">Attach Media</label>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".png, .jpeg, .mp4"
                    multiple
                    onChange={(e) => {
                      const selectedFiles = Array.from(e.target.files);
                      const maxSize = 4 * 1024 * 1024;

                      const validFiles = selectedFiles.filter(
                        (file) => file.size <= maxSize
                      );
                      const tooBig = selectedFiles.length !== validFiles.length;

                      if (tooBig) {
                        setvalidationError(
                          "One or more files are too large (max 4 MB each)."
                        );
                        setTimeout(() => setvalidationError(""), 3000);
                      }

                      setFiles((prev) => [...prev, ...validFiles]);
                    }}
                  />

                  <div className="selected-files">
                    {files.map((file, index) => (
                      <div key={index} className="file-item">
                        <span>
                          {file.name ||
                            `Uploaded Media ${index + 1} (${file.type?.split("/")[1] || "file"})`}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setFiles(files.filter((_, i) => i !== index))
                          }
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {validationError && (
                <div className="validation-error">{validationError}</div>
              )}

              <div className="modal-footer">
                <button type="submit" disabled={!validate()} >
                  {editingPost ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default PostModal;
