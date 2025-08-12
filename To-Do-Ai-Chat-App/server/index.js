const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  const { message, tasks } = req.body;

  // ✅ Sanitize tasks input
  const safeTasks = Array.isArray(tasks)
    ? tasks
        .filter(t => t && typeof t.text === "string" && typeof t.status === "string")
        .map(t => ({
          text: t.text.trim(),
          status: t.status === "done" ? "done" : "pending"
        }))
    : [];

  // ✅ Generate readable task list
  const taskList = safeTasks.length
    ? safeTasks.map((t, i) => `${i + 1}. ${t.text} (${t.status.toUpperCase()})`).join("\n")
    : "You have no tasks.";

  const prompt = `
You are a helpful assistant for managing a to-do list.

Here is the current list:
${taskList}

The user might say things like:
- "Add task run"
- "Delete task 2"
- "Mark 1 as done"
- "Show tasks"

Assume the to-do list has already been updated. Do NOT change the list yourself.
Only confirm the user's request and echo the updated list based on the assumption that the requested action succeeded.

User said: "${message}"
`;



const controller = new AbortController();
const timeout = setTimeout(()=> controller.abort(),60000);

  try {
    const start = Date.now();
    const response = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3",
        messages: [{ role: "user", content: prompt }],
        stream: false,
      }),
      signal:controller.signal,
    });
    const duration = Date.now()-start;
    console.log(`Ollama replied in ${duration}ms`);

    clearTimeout(timeout);
    const data = await response.json();
    const reply = data.message?.content || "I couldn't find a task-related answer.";
    res.json({ reply });
  }catch (err) {
  if (err.name === 'AbortError') {
    console.error("❌ Ollama timed out (AbortError)");
    res.status(504).json({ error: "Ollama request timed out. Please try again." });
  } else {
    console.error("❌ Ollama error:", err);
    res.status(500).json({ error: "Chat failed" });
  }
}
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
