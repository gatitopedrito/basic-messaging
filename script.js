// ----------------------
// Firebase Setup (v8)
// ----------------------
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBC7tvx3rv2Azjbxe8vk3R56hxK2B73_Vw",
  authDomain: "gatitopedrito-messaging.firebaseapp.com",
  projectId: "gatitopedrito-messaging",
  storageBucket: "gatitopedrito-messaging.firebasestorage.app",
  messagingSenderId: "662612762605",
  appId: "1:662612762605:web:6b70b16dd14299877111e4",
  measurementId: "G-8SGZ5XC25D"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();


// ----------------------
// Username
// ----------------------
let username = localStorage.getItem("username") || "User";

function setUsername() {
  const input = document.getElementById("usernameInput");
  const name = input.value.trim();
  if (name === "") return;

  username = name;
  localStorage.setItem("username", username);
  input.value = "";
}


// ----------------------
// Send Message
// ----------------------
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


// ----------------------
// Add Message to Screen
// ----------------------
function addMessage(user, text) {
  const box = document.getElementById("messages");

  const div = document.createElement("div");
  div.className = "message";
  div.innerHTML = `<span class="username">[${user}]</span> ${text}`;

  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}


// ----------------------
// Live Listener
// ----------------------
db.ref("messages").on("child_added", snapshot => {
  const msg = snapshot.val();
  addMessage(msg.user, msg.text);
});
