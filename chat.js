const apiKey = "YOUR_OPENAI_API_KEY"; // 🔒 Replace with your own key

async function sendMessage() {
  const inputField = document.getElementById('userInput');
  const chatLog = document.getElementById('chat-log');
  const userMessage = inputField.value.trim();

  if (!userMessage) return;

  chatLog.innerHTML += `<div class="user-msg">🧑‍🎓 You: ${userMessage}</div>`;
  inputField.value = '';

  chatLog.innerHTML += `<div class="ai-msg">🤖 Elimuhub is typing...</div>`;
  chatLog.scrollTop = chatLog.scrollHeight;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo", // You can use "gpt-4" if you have access
      messages: [
        { role: "system", content: "You are an AI Assistant helping students, teachers, and coders in Kenya. Be brief, clear, and friendly." },
        { role: "user", content: userMessage }
      ]
    })
  });

  const data = await response.json();
  const aiReply = data.choices?.[0]?.message?.content || "Error generating reply.";

  // Remove loading
  const allMsgs = chatLog.querySelectorAll('.ai-msg');
  allMsgs[allMsgs.length - 1].remove();

  // Show final reply
  chatLog.innerHTML += `<div class="ai-msg">🤖 Elimuhub: ${aiReply}</div>`;
  chatLog.scrollTop = chatLog.scrollHeight;
}
