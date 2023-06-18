# Envirya Coding Assignment

- The UI consists of a Line Chart that displays datapoints having 5 seconds interval amongst them. A user can paginate with a range of 6 minutes back and forth using buttons.
- The UI also consists of a DoughnutChart displaying the contrbutions of each sensor to the database. By default, the data is shown for Last day. One can select different date ranges from the date selector present there.

- There is a script @ apis/scripts, which is responsible to push 500,000 datapoints (batch-wise) to the InfluxDB.
- The API currently has only one route to fetch data from the InfluxDB, wherein it requires a datetime range to query on.

        Route:          { hostname }/fetch-data

        Method:         POST

        Request JSON:   { "start": "2023-06-18T20:47:09.393Z", "stop": "2023-06-18T20:53:09.393Z" }
                        // stop is an optional parameter, default is now.

        Response JSON:  {
                            "data": [
                                {
                                    "_time": "2023-06-18T20:47:19.393818+00:00",
                                    "_value": 201473.73248584903,
                                    "sensor_id": "1",
                                    "table": 0
                                },
                                ...
                            ]
                        }
