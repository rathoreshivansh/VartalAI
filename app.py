from flask import Flask, request, render_template, jsonify
from flask_cors import CORS
import json
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer

app = Flask(__name__)
CORS(app)

model_name = "facebook/blenderbot-400M-distill"
model = AutoModelForSeq2SeqLM.from_pretrained(model_name)
tokenizer = AutoTokenizer.from_pretrained(model_name)
conversation_history = []

# This should render index.html when you visit the root route
@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')  # Make sure this is correct

@app.route('/chatbot', methods=['POST'])
def handle_prompt():
    data = json.loads(request.data)
    input_text = data.get('prompt', '')

    # Generate conversation history string
    history = "\n".join(conversation_history)
    # Tokenize input
    inputs = tokenizer.encode_plus(history, input_text, return_tensors="pt")
    # Generate response
    outputs = model.generate(**inputs)
    response = tokenizer.decode(outputs[0], skip_special_tokens=True).strip()

    # Update conversation history
    conversation_history.append(input_text)
    conversation_history.append(response)

    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)
