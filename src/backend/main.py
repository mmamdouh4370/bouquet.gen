from flask import Flask, request, jsonify
from flask_cors import CORS
import json, requests, os
from dotenv import load_dotenv
from openai import OpenAI
from prisma import Prisma, register
from datetime import datetime
from waitress import serve
from prisma import Prisma, register
from prisma.models import User, SavedBouquet

load_dotenv()

db = Prisma()
db.connect()
register(db)

client = OpenAI(
    api_key = os.getenv("OPENAI_API_KEY"),
)

app = Flask(__name__)
CORS(app)


def searchImage(query):
    api_key = os.getenv("GI_API_KEY")
    
    cx = os.getenv("GI_CX")
    
    search_type = "image"
    url = f"https://www.googleapis.com/customsearch/v1?key={api_key}&cx={cx}&searchType={search_type}&q={query}"

    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        if "items" in data and len(data["items"]) > 0:
            return data["items"][0]["link"]
    return None

@app.route("/api/gen", methods=["POST"])
def gen():
    data = request.get_json()
    userInput = data.get('prompt')

    if not userInput:
        return jsonify({"error" : "No prompt provided"}), 400

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        response_format={"type" : "json_object"},
        messages=[
            {"role": "system", "content": 
            """You are an assistant who will recommend flowers based on a user's input for a bouquet in a json format. 
            Relate the flowers in meaning and symbolism to the input. 
            Make sure the flower combinations are aesthetic and meaningful. 
            Make sure to always refer to flowers as plural.
            Be sure to recommend 4-6 flowers.
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
    responseMessageDict = json.loads(responseMessage)

    numFlowers = int(responseMessageDict["numOfFlowers"])

    for i in range(1, numFlowers+1): 
        flowerName = responseMessageDict[f"flower{i}Name"]
        searchQuery = f"{flowerName} flower"
        responseMessageDict[f"flower{i}Img"] = searchImage(searchQuery)

    print(json.dumps(responseMessageDict))
    return jsonify(json.dumps(responseMessageDict))
    
@app.route("/api/saveBouquet", methods=["POST"])
def saveBouquet():
    data = request.get_json()
    userId = data.get('userId')
    flowers = data.get('flowerList')
    try:
        for flower in flowers:
            db.savedbouquet.create(
                data={
                    "name": flower['name'],
                    "description": flower['description'],
                    "img": flower['img'],
                    "userId": userId
                }
            )
        return jsonify({"status": "success"}), 200
    except Exception as e:
        print(e)
        return jsonify({"error": "Failed to save data"}), 500
        
    return data

@app.route("/api/createUser", methods=["POST"])
def createUser():
    data = request.get_json()
    userId = data.get('id')
    
    isAlreadyUser = db.user.findUnique({
        where: {
            id: userId
        }
    })
    if isAlreadyUser:
        return jsonify({"status": "User ID already exists"})

    try:
        db.user.create(
            data={
                "id": userId
            }
        )
        return jsonify({"status": "User created successfully"}), 200
    except Exception as e:
        print(e)
        return jsonify({"error": "Failed to create user"}), 500



if __name__ == "__main__":
    serve(app, host="127.0.0.1", port=3001)
