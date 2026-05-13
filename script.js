// ----------------------
// Firebase Setup (v8)
// ----------------------
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBC7tvx3rv2Azjbxe8vk3R56hxK2B73_Vw",
  authDomain: "gatitopedrito-messaging.firebaseapp.com",
  databaseURL: "https://gatitopedrito-messaging-default-rtdb.firebaseio.com",
  projectId: "gatitopedrito-messaging",
  storageBucket: "gatitopedrito-messaging.appspot.com",
  messagingSenderId: "662612762605",
  appId: "1:662612762605:web:6b70b16dd14299877111e4",
  measurementId: "G-8SGZ5XC25D"
};

// Initialize Firebase (OUTSIDE the config object)
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


function addMessage(user, text) {
  const box = document.getElementById("messages");

  const div = document.createElement("div");
  div.className = "message";
  div.innerHTML = `<span class="username">[${user}]</span> ${text}`;

  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}


db.ref("messages").on("child_added", snapshot => {
  const msg = snapshot.val();
  addMessage(msg.user, msg.text);
});
