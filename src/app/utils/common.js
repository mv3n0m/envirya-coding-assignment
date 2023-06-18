import { Request, getDateTimeRange } from 'helpers'

const processData = (data) => {
    const groupedData = {}

    data.forEach(obj => {
        const sensorId = obj.sensor_id;
        const value = parseFloat(obj._value);
        if (!isNaN(value)) {
            if (!groupedData[sensorId]) {
                groupedData[sensorId] = { label: sensorId, value: 0 };
            }
            groupedData[sensorId].value += value;
        }
    });

    return Object.values(groupedData)
}

const fetchData = async (dateTimeDelta, dataHandler) => {
    try {
        const payload = getDateTimeRange(dateTimeDelta)
        const { jsonResponse } = await Request("/fetch-data", payload)
        dataHandler(jsonResponse.data)
    } catch (err) {
        console.log(err)
        alert("Something went wrong.")
    }
}

const colorsList = [
    "#FA66A4",
    "#009FFD",
    "#86f3b8",
    "#A3A0FB",
    "#818E94",
    "#FA9627",
    "#55D8FE",
    "#FFDA83",
    "#EF929C",
    "#4ae3b5",
    "#FC0900",
    "#4CB050",
    "#FF8373",
]

export { fetchData, processData, colorsList }