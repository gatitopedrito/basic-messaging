// ----------------------
// Firebase Setup (v8)
// ----------------------
const firebaseConfig = {
  apiKey: "YOUR-KEY",
  authDomain: "YOUR-DOMAIN",
  databaseURL: "YOUR-DATABASE-URL",
  projectId: "YOUR-PROJECT-ID",
  storageBucket: "YOUR-BUCKET",
  messagingSenderId: "YOUR-SENDER-ID",
  appId: "YOUR-APP-ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

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

  db.ref("messages").push({
    user: username,
    text: text
  });

  input.value = "";
}


renderMessages();

db.ref("messages").on("child_added", snapshot => {
  const msg = snapshot.val();
  addMessage(msg.user, msg.text);
});
