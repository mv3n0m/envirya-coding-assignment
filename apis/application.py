from flask import Flask, request
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

application = Flask(__name__)
CORS(application)

if __name__ == "__main__":
    application.run(host="0.0.0.0", port=8008, debug=True)
