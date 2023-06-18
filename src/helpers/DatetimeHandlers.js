const getDates = (delta) => {
    let dateStart, dateEnd;
    const date = new Date();

    date.setHours(0, 0, 0, 0);

    if (delta === 0) {
        dateStart = date.toISOString();
        date.setDate(date.getDate() + 1);
        date.setHours(23, 59, 59, 999);
        dateEnd = date.toISOString();
    } else {
        date.setDate(date.getDate() - 1);
        dateEnd = date.toISOString();
        date.setHours(0, 0, 0, 0);
        date.setDate(date.getDate() - delta);
        dateStart = date.toISOString();
        date.setHours(23, 59, 59, 999);
        dateEnd = date.toISOString();
    }

    return { start: dateStart, stop: dateEnd };
};

function getHours({ start, stop, currentMax }) {
    let now = new Date()
    if (currentMax) {
        now = new Date(currentMax)
    }

    const startTime = new Date(now.getTime() + start * 60 * 60 * 1000);
    const endTime = new Date(now.getTime() + stop * 60 * 60 * 1000);

    return { start: startTime.toISOString(), stop: endTime.toISOString() }
}

const getDateTimeRange = dateTimeDelta => {
    const { days, hours } = dateTimeDelta
    if (days) return getDates(days)

    return getHours(hours)
}


export { getDateTimeRange };