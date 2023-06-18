const urlOf = path => process.env.REACT_APP_BACKEND_API_HOST + path

const buildRequest = (path, payload, headers, method) => {
	let options;
	const url = urlOf(path)

	headers['Content-Type'] = "application/json"

	if (method === "POST") {
		options = {
			method,
			body: JSON.stringify(payload),
			headers: headers
		}
	}

	return { url, options }
}


const Request = async (path, payload = {}, headers = {}, method = "POST") => {
	const { url, options } = buildRequest(path, payload, headers, method)
	const response = await fetch(url, options)
	const statusCode = response.status
	const jsonResponse = statusCode === 204 ? {} : await response.json()

	if (statusCode !== 200) return alert("Something went wrong.")

	return { statusCode, jsonResponse }
}


export default Request;