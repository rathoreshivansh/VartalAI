# Insert the full content for chatbot.py here
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

# Load model
model_name = "facebook/blenderbot-400M-distill"
model = AutoModelForSeq2SeqLM.from_pretrained(model_name)
tokenizer = AutoTokenizer.from_pretrained(model_name)

# Initialize conversation history
conversation_history = []

while True:
    # Create conversation history string
    history_string = "\n".join(conversation_history)
    
    # Get user input
    input_text = input("> ")

    # Tokenize input and history
    inputs = tokenizer.encode_plus(history_string, input_text, return_tensors="pt")

    # Generate response from model
    outputs = model.generate(**inputs)

    # Decode response
    response = tokenizer.decode(outputs[0], skip_special_tokens=True).strip()

    print(response)

    # Update conversation history
    conversation_history.append(input_text)
    conversation_history.append(response)
