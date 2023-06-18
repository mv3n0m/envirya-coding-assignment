import React from "react";


function DateSelector(props) {
	const { setDateDelta, dateDelta } = props;

	const options = {
		// 0: "Today",
		1: "Last day",
		7: "Last 7 days",
		14: "Last 14 days",
		28: "Last 28 days"
	}

	return (
		<select defaultValue={dateDelta} onChange={(e) => setDateDelta(parseInt(e.target.value, 10))} className="btn shadow">
			{
				Object.entries(options).map(([k, v]) => (
					<option value={k} key={k}>{v}</option>
				))
			}
		</select>
	);
}

export default DateSelector;
