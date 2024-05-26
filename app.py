from flask import Flask, request, jsonify
import openai

app = Flask(__name__)

# Ensure you replace 'YOUR_OPENAI_API_KEY' with your actual OpenAI API key.
openai.api_key = 'Openai_API_Key_Here'

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('message')

    try:
        response = openai.Completion.create(
            engine="gpt-3.5-turbo",
            prompt=user_message,
            max_tokens=150,
            n=1,
            stop=None,
            temperature=0.7,
        )
        bot_response = response.choices[0].text.strip()
        return jsonify({'response': bot_response})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
