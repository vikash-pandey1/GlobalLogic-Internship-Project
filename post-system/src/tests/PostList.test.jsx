import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PostList from '../components/PostList';
import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockPosts = [
    {
      id: 1,
      postedBy: 'Alice',
      isAskMode: true,
      question: 'Which color do you prefer?',
      options: ['Red', 'Blue'],
      selectedOption: null,
    },
    {
      id: 2,
      postedBy: 'Bob',
      isAskMode: false,
      description: 'Hello from Bob!',
      files: [],
    },
  ];

describe('PostList Component', () => {
  let setPostsMock;
  let onEditMock;

  beforeEach(() => {
    sessionStorage.clear();
    setPostsMock = vi.fn();
    onEditMock = vi.fn();
  });

  // 1️⃣ Renders all posts
  it('renders all posts correctly', () => {
    render(<PostList posts={mockPosts} setPosts={setPostsMock} onEdit={onEditMock} />);
    expect(screen.getByText(/alice/i)).toBeInTheDocument();
    expect(screen.getAllByText(/bob/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/which color do you prefer/i)).toBeInTheDocument();
    expect(screen.getByText(/hello from bob/i)).toBeInTheDocument();
  });

  // 2️⃣ Displays options when post is in ask mode
  it('shows vote options for question posts', () => {
    render(<PostList posts={mockPosts} setPosts={setPostsMock} onEdit={onEditMock} />);
    expect(screen.getByText('Red')).toBeInTheDocument();
    expect(screen.getByText('Blue')).toBeInTheDocument();
  });

  // 3️⃣ Handles vote button click
  it('updates post on vote', () => {
    render(<PostList posts={mockPosts} setPosts={setPostsMock} onEdit={onEditMock} />);
    fireEvent.click(screen.getByText('Red'));
    expect(setPostsMock).toHaveBeenCalled();
  });

  // 4️⃣ Calls onEdit when edit button is clicked
  it('calls onEdit when Edit button is clicked', () => {
    render(<PostList posts={mockPosts} setPosts={setPostsMock} onEdit={onEditMock} />);
    const editBtn = screen.getAllByTitle(/edit/i)[0];
    fireEvent.click(editBtn);
    expect(onEditMock).toHaveBeenCalledWith(mockPosts[0]);
  });

  // 5️⃣ Deletes a post on delete icon click
  it('deletes a post when Trash icon is clicked', () => {
    render(<PostList posts={mockPosts} setPosts={setPostsMock} onEdit={onEditMock} />);
    const deleteIcon = screen.getAllByTitle(/delete/i)[0];
    fireEvent.click(deleteIcon);
    expect(setPostsMock).toHaveBeenCalledWith([mockPosts[1]]);
  });

  // 6️⃣ Shows selected option after vote
  it('displays selected option after voting', () => {
    const updatedPosts = [{ ...mockPosts[0], selectedOption: 1 }];
    render(<PostList posts={updatedPosts} setPosts={setPostsMock} onEdit={onEditMock} />);
    expect(screen.getByText(/you selected/i)).toBeInTheDocument();
    expect(screen.getByText('Blue')).toBeInTheDocument();
  });

  // 7️⃣ Renders image and video if available
  it('renders media files correctly', () => {
    const postsWithMedia = [
      {
        id: 3,
        postedBy: 'Carol',
        isAskMode: false,
        description: 'With image and video',
        files: [
          { type: 'image/png', base64: 'data:image/png;base64,testimage' },
          { type: 'video/mp4', base64: 'data:video/mp4;base64,testvideo' },
        ],
      },
    ];
    render(<PostList posts={postsWithMedia} setPosts={setPostsMock} onEdit={onEditMock} />);
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('video')).toBeInTheDocument();
  });
});
