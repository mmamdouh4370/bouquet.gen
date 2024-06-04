from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from openai import OpenAI

client = OpenAI(
    api_key = os.environ.get("OPENAI_API_KEY"),
)

app = Flask(__name__)
CORS(app)

@app.route("/api/gen", methods=["POST"])

def gen():
    data = request.get_json()
    userInput = data.get('prompt')

    if not userInput:
        return jsonify({"error": "No prompt provided"}), 400

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        response_format={"type": "json_object"},
        messages=[
            {"role": "system", "content": 
            """You are an assistant who will recommend flowers based on a user's input for a bouquet in a json format. 
            Relate the flowers in meaning and symbolism to the input. 
            Make sure the flower combinations are aesthetic and meaningful. 
            Make sure to always refer to flowers as plural.
            Be sure to recommend 4-7 flowers.
            Every message you respond with must STRICTLY follow this json format, do not add on anything extra 
            (adjust for number of flowers remembering a minimum of 4 and maximum of 7): 
            "numOfFlowers": "",
            "flower1Name": "", 
            "flower2Name": "",
            (etc for every flower)
            "flower1Desc": "Explanation of flower 1's meaning and symbolism, keep it general and NOT related to the prompt",
            "flower2Desc": "Explanation of flower 2's meaning and symbolism, keep it general and NOT related to the prompt"
            (etc for every flower)

            If the user input does not make sense, return "Please try again."
            """},
            {"role": "user", "content": userInput}
            
        ]
    )

    responseMessage = response.choices[0].message.content
    print(responseMessage)
    return jsonify({"response": responseMessage})


if __name__ == "__main__":
    app.run(debug=True)