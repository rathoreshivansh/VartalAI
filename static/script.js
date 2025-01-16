// This function sends the user input to the Flask backend
async function getChatbotResponse(inputText) {
  try {
      const response = await fetch('http://127.0.0.1:5000/chatbot', {
          method: 'POST',  // Use POST request to send data
          headers: {
              'Content-Type': 'application/json'  // Set the request content type to JSON
          },
          body: JSON.stringify({ prompt: inputText })  // Send the user input as a JSON object
      });

      if (response.ok) {
          const data = await response.json();  // Parse the JSON response from the backend
          return data.response;  // Extract the chatbot's response from the JSON object
      } else {
          console.error('Error in chatbot response:', response.status);
          return 'Sorry, there was an error with the chatbot.';
      }
  } catch (error) {
      console.error('Error in fetch request:', error);
      return 'An error occurred while fetching the response.';
  }
}

// This function is triggered when the user submits their input
document.getElementById('user-input-form').addEventListener('submit', async (event) => {
  event.preventDefault();  // Prevent the default form submission behavior

  const userInput = document.getEleme
