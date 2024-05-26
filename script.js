function sendMessage() {
    const inputField = document.getElementById("user-input");
    const userText = inputField.value;

    if (userText) {
        // Adding message to the UI
        addToConversation("user", userText);

        // Sending a POST request to the Flask server
        fetch('http://127.0.0.1:5000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userText })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                // If there's an error in the data, display it
                addToConversation("bot", "Error: " + data.error);
            } else {
                // If there's a response message, display it
                addToConversation("bot", data.response);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            addToConversation("bot", "An error occurred while trying to send the message.");
        });

        // Clearing the input field
        inputField.value = '';
    }
}

function addToConversation(sender, message) {
    const conversationElement = document.getElementById("conversation");
    const messageElement = document.createElement("li");
    messageElement.textContent = message;
    messageElement.classList.add(sender);
    conversationElement.appendChild(messageElement);
}
