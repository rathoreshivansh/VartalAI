# VartalAI - A Simple Chatbot Using Open-Source LLMs

VartalAI is a simple and functional chatbot built using Python, Hugging Face's `transformers` library, and an open-source language model. This version of the project is designed to be run directly on Google Colab, making it easier for users to try out without worrying about setting up dependencies locally.

## Features

- Chat with an AI-powered chatbot in real-time.
- Built with Hugging Face's `transformers` library.
- Uses the `facebook/blenderbot-400M-distill` pre-trained model.
- Simple and interactive terminal-based interface.

## Requirements

This project requires a Google Colab environment for seamless execution. The following libraries will be automatically installed:

- `transformers`
- `torch`

## Running the Chatbot on Google Colab

To run this project on Google Colab, follow the steps below:

### Step 1: Open Google Colab

- Open [Google Colab](https://colab.research.google.com/) in your browser.
- Start a new notebook by selecting **File > New Notebook**.

### Step 2: Set Up the Environment

In the first cell, run the following commands to install the necessary libraries:

```python
!pip install transformers torch
```

This will install the required dependencies (transformers and torch) to run the chatbot model.

### Step 3: Import Required Libraries

In the next cell, import the necessary libraries to interact with the model:

```python
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
```

### Step 4: Load the Model and Tokenizer

You can use the following code to load the facebook/blenderbot-400M-distill pre-trained model and tokenizer:

```python
# Define model name

model_name = "facebook/blenderbot-400M-distill"

# Load the model and tokenizer

model = AutoModelForSeq2SeqLM.from_pretrained(model_name)
tokenizer = AutoTokenizer.from_pretrained(model_name)
```

### Step 5: Initialize Conversation History

Initialize an empty list to store the conversation history, so the model can keep track of past interactions:

```python
conversation_history = []
```

### Step 6: Function to Chat with the Model

Define a function that will handle the interaction with the model, generating a response based on the conversation history:

```python
def chat_with_bot(input_text): # Combine conversation history into a string
history_string = "\n".join(conversation_history)

    # Tokenize the input and history
    inputs = tokenizer.encode_plus(history_string, input_text, return_tensors="pt")

    # Generate a response
    outputs = model.generate(**inputs)

    # Decode the response
    response = tokenizer.decode(outputs[0], skip_special_tokens=True).strip()

    # Update conversation history
    conversation_history.append(input_text)
    conversation_history.append(response)

    return response
```

### Step 7: Start Chatting

Run the following code to test the chatbot. You can type your input in the input_text variable and get a response from the bot.

```python
input_text = "Hello, how are you?"
response = chat_with_bot(input_text)
print("Bot:", response)
```

You can continue changing the input_text and calling chat_with_bot(input_text) to keep the conversation going.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Special thanks to [Hugging Face](https://huggingface.co) for providing the powerful transformers library that made it possible to create this chatbot.
- Thanks to [Google Colab](https://colab.research.google.com/) for providing the cloud-based platform that allows easy collaboration and execution of machine learning models.
- Thanks to the open-source community for providing free and accessible tools for machine learning and natural language processing.
