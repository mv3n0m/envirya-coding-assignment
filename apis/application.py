from flask import Flask, request
from flask_cors import CORS
from influx import InfluxWrapper, build_query
from settings import use_kwargs
from args_schema import datetime_args
from validations import validate_datetime_range
from utils import responsify


application = Flask(__name__)
CORS(application)
i_client = InfluxWrapper()

@application.errorhandler(400)
def handle_error(err):
    messages = err.data.get("messages", ["Invalid request."])
    return responsify({"errors": messages}, err.code)


@application.route("/fetch-data", methods=["POST"])
@use_kwargs(datetime_args, validate=validate_datetime_range)
def fetch_data(**kwargs):
    kwargs = {k: int(v.timestamp()) for k, v in kwargs.items()}
    query = {
        "range": kwargs,
        "keep": [ "_time", "_value", "sensor_id" ]
    }

    data = i_client.query(build_query(query))

    valid_data = []
    for d in data:
        try:
            d["_value"] = float(d["_value"])
            valid_data.append(d)
        except:
            pass

    return responsify(valid_data, 200)


if __name__ == "__main__":
    application.run(host="0.0.0.0", port=8008, debug=True)
