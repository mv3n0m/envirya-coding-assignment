import os
import sys
from webargs.flaskparser import FlaskParser
from dotenv import load_dotenv

load_dotenv()


BUCKET_NAME = os.environ.get("BUCKET_NAME")
DB_ORG =  os.environ.get("DB_ORG")
DB_TOKEN = os.environ.get("DB_TOKEN")
DB_URL = os.environ.get("DB_URL")
if not (DB_TOKEN and DB_URL):
    print("Missing required env variables.")
    sys.exit(0)

class Parser(FlaskParser):
    DEFAULT_VALIDATION_STATUS = 400

parser = Parser()
use_kwargs = parser.use_kwargs