let messages = JSON.parse(localStorage.getItem("messages")) || [];
let username = localStorage.getItem("username") || "User";

function setUsername() {
  const input = document.getElementById("usernameInput");
  const name = input.value.trim();

  if (name === "") return;

  username = name;
  localStorage.setItem("username", username);
  input.value = "";
}

function renderMessages() {
  const box = document.getElementById("messages");
  box.innerHTML = "";

  messages.forEach(msg => {
    const div = document.createElement("div");
    div.className = "message";
    div.innerHTML = `<span class="username">[${msg.user}]</span> ${msg.text}`;
    box.appendChild(div);
  });

  box.scrollTop = box.scrollHeight;
}

function sendMessage() {
  const input = document.getElementById("msgInput");
  const text = input.value.trim();

  if (text === "") return;

  messages.push({ user: username, text });
  localStorage.setItem("messages", JSON.stringify(messages));

  input.value = "";
  renderMessages();
}

renderMessages();
