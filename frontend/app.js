const chatEl = document.getElementById("chat");
const form = document.getElementById("form");
const input = document.getElementById("input");

const BACKEND_URL = "http://127.0.0.1:8000";

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.className = `message ${sender}`;

  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.textContent = sender === "user" ? "🧑" : "🤖";

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = text;

  msg.appendChild(avatar);
  msg.appendChild(bubble);
  chatEl.appendChild(msg);

  chatEl.scrollTop = chatEl.scrollHeight;
  return bubble;
}

async function callBackend(message) {
  const response = await fetch(`${BACKEND_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });

  const data = await response.json();
  return data.reply;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const message = input.value.trim();
  if (!message) return;

  input.value = "";
  addMessage(message, "user");

  const botBubble = addMessage("Typing...", "bot");

  try {
    const reply = await callBackend(message);
    botBubble.textContent = reply;
  } catch (err) {
    botBubble.textContent = "⚠️ Unable to reach backend.";
    console.error(err);
  }
});
