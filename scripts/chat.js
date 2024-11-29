document.addEventListener("DOMContentLoaded", () => {

    const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userEmailSpan = document.getElementById("userEmail");

    if (loggedInUserEmail) {
        const loggedInUser = storedUsers.find(user => user.email === loggedInUserEmail);
        if (loggedInUser) {
            userEmailSpan.textContent = loggedInUser.email;
        } else {
            alert("User not found. Redirecting to login.");
            window.location.href = "login.html";
            return;
        }
    } else {
        alert("No logged-in user. Redirecting to login.");
        window.location.href = "login.html";
        return;
    }


    const logoutButton = document.getElementById("logoutButton");
    logoutButton.addEventListener("click", () => {
        localStorage.removeItem("loggedInUserEmail");
        window.location.href = "login.html";
    });


    const chatMessages = document.getElementById("chatMessages");
    const chatForm = document.getElementById("chatForm");
    const messageInput = document.getElementById("messageInput");

    const chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];


    function displayMessages() {
        chatMessages.innerHTML = "";
        chatHistory.forEach(message => {
            const messageElement = document.createElement("div");
            messageElement.className = "mb-2";
            messageElement.innerHTML = `
        <div class="p-2 border rounded">
          <strong>${message.email}:</strong> ${message.text}
          <div class="text-muted" style="font-size: 0.8rem;">${message.time}</div>
        </div>
      `;
            chatMessages.appendChild(messageElement);
        });


        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    displayMessages();


    chatForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const messageText = messageInput.value.trim();
        if (messageText) {
            const newMessage = {
                email: loggedInUserEmail,
                text: messageText,
                time: new Date().toLocaleString()
            };


            chatHistory.push(newMessage);
            localStorage.setItem("chatHistory", JSON.stringify(chatHistory));


            displayMessages();
            messageInput.value = "";
        }
    });
});