import sys
sys.path.append('..')

import random
from datetime import datetime, timedelta
from apis.influx import InfluxWrapper

i_client = InfluxWrapper()

reading_range = (200000, 210000)
sensor_id_range = (1, 10)

data_points = []
batch_size = 10000
total_readings = 500000

for i in range(total_readings):
    data_point = {
        "measurement": "o2_reading",
        "tags": {
            "sensor_name": "o2",
            "sensor_id": str(random.randint(*sensor_id_range)),
            "data_type_of_sensor": "univariate",
            "subsensor": "o2"
        },
        "time": (datetime.now() - timedelta(seconds=5*i)).isoformat("T") + "Z",
        "fields": {
            "value": str(random.uniform(*reading_range)),
            "units": "ppm"
        }
    }

    data_points.append(data_point)

    if (i + 1) % batch_size == 0:
        print("Writing batch: ", int((i + 1) / batch_size))
        i_client.write(data_points)
        data_points = []


if len(data_points) > 0:
    print("Writing remaining records.")
    i_client.write(data_points)
