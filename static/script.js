// Get elements
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-message");

// Function to send message to the server and display response
function sendMessage() {
  const userText = userInput.value.trim();
  if (userText === "") return;

  // Append the user's message to the chatbox
  appendMessage("user", userText);

  // Clear the input field
  userInput.value = "";

  // Send the user's message to the backend
  fetch("http://127.0.0.1:5000/chatbot", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt: userText }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Append the bot's response
      appendMessage("bot", data.response);
    })
    .catch((error) => {
      console.error("Error:", error);
      appendMessage(
        "bot",
        "Sorry, there was an error processing your request."
      );
    });
}

// Function to append messages to the chatbox
function appendMessage(sender, message) {
  const messageContainer = document.createElement("div");
  messageContainer.classList.add("message");
  messageContainer.classList.add(
    sender === "bot" ? "bot-message" : "user-message"
  );

  // Create avatar for the sender
  const avatarImg = document.createElement("img");
  avatarImg.classList.add(sender === "bot" ? "bot-avatar" : "user-avatar");
  avatarImg.src =
    sender === "bot"
      ? "{{ url_for('static', filename='bot-avatar.png') }}" // Bot avatar
      : "{{ url_for('static', filename='shivansh-avatar.png') }}"; // User avatar

  // Add avatar and message text to the message container
  messageContainer.appendChild(avatarImg);
  const textNode = document.createElement("p");
  textNode.textContent = message;
  messageContainer.appendChild(textNode);

  // Append the message to the chatbox
  chatBox.appendChild(messageContainer);

  // Scroll to the bottom of the chatbox
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Optional: Add event listener for Enter key to send messages
userInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});
