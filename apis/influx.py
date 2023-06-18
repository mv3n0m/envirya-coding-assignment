import json
from datetime import datetime
from influxdb_client import InfluxDBClient, BucketsApi, Point
from influxdb_client.client.write_api import SYNCHRONOUS
from settings import *


class InfluxWrapper():

    def __init__(self):
        print("Connecting database...")
        self.client = InfluxDBClient(url=DB_URL, token=DB_TOKEN, org=DB_ORG)
        self.check_bucket()

        self.query_api = self.client.query_api()
        self.write_api = None

    def check_bucket(self):
        buckets = BucketsApi(self.client)
        try:
            buckets.find_bucket_by_name(BUCKET_NAME)
        except:
            print("Bucket not found. Creating bucket...")
            buckets.create_bucket(bucket_name=BUCKET_NAME)

    def query(self, query_string):
        tables = self.query_api.query(query_string)
        output = json.loads(tables.to_json())

        return output


    def write(self, data_points):
        if not self.write_api:
            self.write_api = self.client.write_api(write_options=SYNCHRONOUS)

        self.write_api.write(bucket=BUCKET_NAME, org=DB_ORG, record=data_points)


def build_query(query):
    if type(query) != dict:
        raise Exception("query must be a dictionary")

    query_string = f'from( bucket:"{ BUCKET_NAME }" ) '

    if "range" in query:
        _range = query["range"]

        if type(_range) != dict:
            raise Exception("Invalid range provided")

        start = _range["start"]
        stop = _range.get("stop")

        query_string += f" |> range(start: { start }) "

        if stop:
            query_string.replace(")", f", stop: { stop })")

    list_string = lambda x: "[" + ", ".join(list(map(lambda y: f'"{ y }"', x))) + "]"

    general_keys = [ "drop", "keep", "group" ]
    for key in general_keys:
        if key in query:
            items = query[key]

            if type(items) != list:
                raise Exception(f"Invalid { key } values")

            query_string += f" |> { key }(columns: { list_string(items) }) "


    return query_string