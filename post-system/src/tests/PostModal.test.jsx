import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PostModal from "../components/PostModal";
import React from "react";

const baseProps = {
  posts: [],
  setPosts: vi.fn(),
  isModalOpen: true,
  setIsModalOpen: vi.fn(),
  editingPost: null,
  setEditingPost: vi.fn(),
  clearVoteOnEdit: vi.fn(),
};

describe("PostModal Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

   // ✅ Test 1: Should render the modal in default (thought) mode
  it("renders modal in 'thought' mode by default", () => {
    render(<PostModal {...baseProps} />);
    expect(screen.getByText("Share Your Thoughts")).toBeInTheDocument();
    expect(screen.getByLabelText(/Posted By/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Your Thoughts/i)).toBeInTheDocument();
  });


  // ✅ Test 2: Should switch to 'question' mode when button is clicked
  it("switches to question mode and renders question-specific fields", () => {
    render(<PostModal {...baseProps} />);
    fireEvent.click(screen.getByText("Ask a Question"));
    expect(screen.getByText("Write Your Question")).toBeInTheDocument();
    expect(screen.getByLabelText("Option 1")).toBeInTheDocument();
    expect(screen.getByLabelText("Option 2")).toBeInTheDocument();
  });

  // ✅ Test 3: Should show validation error for invalid name
  it("shows validation error when invalid name is entered", async () => {
    render(<PostModal {...baseProps} />);
    fireEvent.change(screen.getByLabelText(/Posted By/i), { target: { value: "!!!!" } });
    expect(await screen.findByText(/Name must be alphanumeric/i)).toBeInTheDocument();
  });

  // ✅ Test 4: Should allow adding and removing options in question mode
  it("allows adding and removing options in question mode", async () => {
    render(<PostModal {...baseProps} />);
    fireEvent.click(screen.getByText("Ask a Question"));
    fireEvent.click(screen.getByText("Add Option"));
    expect(screen.getByLabelText("Option 3")).toBeInTheDocument();
    fireEvent.click(screen.getAllByText("Remove")[0]);
    expect(screen.queryByLabelText("Option 3")).not.toBeInTheDocument();
  });

  // ✅ Test 5: Should display uploaded file names and remove them
  it("uploads and displays files with remove option", async () => {
    render(<PostModal {...baseProps} />);
    const file = new File(["dummy"], "test.png", { type: "image/png" });
    const input = screen.getByLabelText(/Attach Media/i);
    fireEvent.change(input, { target: { files: [file] } });
    expect(await screen.findByText(/test\.png/)).toBeInTheDocument();
    fireEvent.click(screen.getByText("✕"));
    expect(screen.queryByText(/test\.png/)).not.toBeInTheDocument();
  });

  // ✅ Test 6: Should close modal and reset editing on close button click
  it("closes modal on delete icon click", () => {
    render(<PostModal {...baseProps} />);
    const closeBtn = screen.getByRole("button", { name: /Close modal/i });
    fireEvent.click(closeBtn);
    expect(baseProps.setIsModalOpen).toHaveBeenCalledWith(false);
    expect(baseProps.setEditingPost).toHaveBeenCalledWith(null);
  });
  

  // ✅ Test 7: Should create a valid post and call setPosts
it("submits a valid post", async () => {
  const setPostsMock = vi.fn();
  const setIsModalOpenMock = vi.fn();

  render(
    <PostModal
      posts={[]}
      setPosts={setPostsMock}
      isModalOpen={true}
      setIsModalOpen={setIsModalOpenMock}
      editingPost={null}
      setEditingPost={() => {}}
      clearVoteOnEdit={() => {}}
    />
  );

  // Fill in valid name
  fireEvent.change(screen.getByLabelText(/Posted By/i), {
    target: { value: "User123" }, // must be alphanumeric and ≤ 20 chars
  });

  // Fill in description
  fireEvent.change(screen.getByLabelText(/Add Your Thoughts/i), {
    target: { value: "This is a test post description." },
  });

  // Submit form
  fireEvent.click(screen.getByRole("button", { name: /Create/i }));

  await waitFor(() => {
    expect(setPostsMock).toHaveBeenCalledTimes(1);
    expect(setIsModalOpenMock).toHaveBeenCalledWith(false);
  });
});

});

