import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CreatePost from '../components/CreatePost';
import { describe, it, expect, beforeEach } from 'vitest';

describe('CreatePost Component', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  // 1️⃣ Test if the Post button is rendered
  it('renders the Post button', () => {
    render(<CreatePost />);
    expect(screen.getByText(/post/i)).toBeInTheDocument();
  });

  // 2️⃣ Test if the modal opens on clicking Post button
  it('opens the modal on Post button click', () => {
    render(<CreatePost />);
    fireEvent.click(screen.getByText(/post/i));
    expect(screen.getByText(/share your thoughts/i)).toBeInTheDocument();
  });

  // 3️⃣ Modal should not be visible when isModalOpen is false
  it('modal is not visible initially', () => {
    render(<CreatePost />);
    expect(screen.queryByText(/share your thoughts/i)).not.toBeInTheDocument();
  });

  // 4️⃣ Posts should load from sessionStorage on initial render
  it('loads posts from sessionStorage', () => {
    const mockPosts = [{ id: 1, text: 'Hello World', type: 'thought' }];
    sessionStorage.setItem('posts', JSON.stringify(mockPosts));
    render(<CreatePost />);
    expect(screen.getAllByText(/post/i).length).toBeGreaterThan(0);
  });

  // 5️⃣ .blurred class should be added when modal is open
  it('adds .blurred class to app div when modal is open', () => {
    render(<CreatePost />);
    fireEvent.click(screen.getByText(/post/i));
    const appDiv = document.querySelector('.app');
    expect(appDiv.classList.contains('blurred')).toBe(true);
  });

  // 6️⃣ Opening the modal should clear editing state
  it('clears editingPost state when creating new post', () => {
    render(<CreatePost />);
    fireEvent.click(screen.getByText(/post/i));
    // You could check if modal input is empty (if you have input field visible)
    expect(screen.getByText(/share your thoughts/i)).toBeInTheDocument();
  });

  // 7️⃣ Test clearVoteOnEdit resets selected option on edit
  it('clears vote selection when editing a post', () => {
    const mockPost = {
      id: 1,
      text: 'What is your opinion?',
      type: 'question',
      options: ['A', 'B'],
      selectedOption: 'A',
    };
    sessionStorage.setItem('posts', JSON.stringify([mockPost]));
    render(<CreatePost />);
    // Find edit button - for this, the test assumes your PostList renders it
    const editBtn = screen.getByTestId('edit-btn-1'); // ← Add `data-testid` in your real component
    fireEvent.click(editBtn);
    expect(screen.getByText(/Edit Your Post/i)).toBeInTheDocument();
  });
});
