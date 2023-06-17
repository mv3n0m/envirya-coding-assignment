from flask import make_response, jsonify

def responsify(response, status_code=400):
    if isinstance(response, dict):
        return make_response(jsonify(response), status_code)
    return make_response(jsonify({"data": response}))
