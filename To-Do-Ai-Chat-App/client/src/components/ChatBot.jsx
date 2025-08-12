import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ChatBot.css";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! Ask me about your tasks!" }
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [dots, setDots] = useState(".");

  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : "."));
    }, 500);
    return () => clearInterval(interval);
  }, [loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { from: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const rawTasks = JSON.parse(sessionStorage.getItem("tasks")) || [];
    let updatedTasks = rawTasks.map((t) =>
      typeof t === "string" ? { text: t, status: "pending" } : t
    );

    const allowClientHandling = /^(add|create|new|delete|remove|done|complete|mark|update|edit)/i.test(input.trim());

    if (allowClientHandling) {
      // === Handle ADD ===
      const addMatch = input.match(/(?:add|create|new)\s(.+)/i);
      if (addMatch) {
        const newTaskText = addMatch[1].trim();
        if (
          newTaskText &&
          !updatedTasks.some((t) => t.text.toLowerCase() === newTaskText.toLowerCase())
        ) {
          updatedTasks.push({ text: newTaskText, status: "pending" });
        }
      }

      // === Handle DELETE ===
      const deleteMatch = input.match(/(?:delete|remove)(?: task)?\s+(.+)/i);
      if (deleteMatch) {
        const value = deleteMatch[1].trim().toLowerCase();
        updatedTasks = updatedTasks.filter((t, i) => {
          const indexMatch = `${i + 1}` === value;
          const nameMatch = t.text.toLowerCase() === value;
          return !indexMatch && !nameMatch;
        });
      }

      // === Handle DONE ===
      const doneMatch = input.match(/(?:done|complete|mark)(?: task)?\s+(.+)/i);
      if (doneMatch) {
        const value = doneMatch[1].trim().toLowerCase();
        updatedTasks = updatedTasks.map((t, i) => {
          const indexMatch = `${i + 1}` === value;
          const nameMatch = t.text.toLowerCase() === value;
          if (indexMatch || nameMatch) {
            return { ...t, status: "done" };
          }
          return t;
        });
      }

      // === Handle UPDATE/EDIT ===
      const updateMatch = input.match(/(?:update|edit)\s+(?:task\s*)?(\d+|.+?)\s+(?:to\s+)?(.+)/i);
      if (updateMatch) {
        const target = updateMatch[1].trim().toLowerCase();
        const newText = updateMatch[2].trim();

        let indexToUpdate = -1;
        if (/^\d+$/.test(target)) {
          indexToUpdate = parseInt(target) - 1;
        } else {
          indexToUpdate = updatedTasks.findIndex((t) => t.text.toLowerCase() === target);
        }

        if (indexToUpdate >= 0 && indexToUpdate < updatedTasks.length) {
          updatedTasks[indexToUpdate].text = newText;
        }
      }

      // ✅ Clean tasks
      updatedTasks = updatedTasks.filter(
        (t) => t && typeof t.text === "string" && t.text.trim() !== ""
      );

      // 🔁 Save to sessionStorage and notify UI
      const current = sessionStorage.getItem("tasks") || "[]";
      if (current !== JSON.stringify(updatedTasks)) {
        sessionStorage.setItem("tasks", JSON.stringify(updatedTasks));
        window.dispatchEvent(new Event("tasks-updated"));
      }
    }

    // === Call backend for AI reply only
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/chat`, {
        message: input,
        tasks: updatedTasks
      });

      const reply = res.data.reply || "I couldn't understand your request.";
      setMessages((prev) => [...prev, { from: "bot", text: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Error fetching reply." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-box">
      <h2>ChatBot</h2>
      <div className="chat-window">
        {messages.map((m, i) => (
          <div key={i} className={m.from}>
            {m.text.split("\n").map((line, idx) => (
              <div key={idx}>{line}</div>
            ))}
          </div>
        ))}
        {loading && <div className="bot typing">Typing{dots}</div>}
      </div>
      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBot;
