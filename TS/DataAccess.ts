export interface HttpResponse {
	ok: boolean;
	body: any;
}

/** Attempts to fetch data from the specified url with the Authorization header
 *
 * @param method string to specify the HTTP method ('GET','POST','PUT', etc.)
 * @param endPoint string to specify the endpoint of the api (api/example/route)
 * @param body object with the parameters to be sent to the specified url
 * @returns {HttpResponse}
 */
const FetchPrivate = async (method: string, endPoint: string, token: string, body?: object) => {
	const headers = new Headers();
	headers.append("Content-Type", "application/json");
	headers.append("Authorization", "Bearer " + (token));

	let requestOptions: RequestInit;

	if (body != null && body != undefined) {
		requestOptions = {
			method: method,
			mode: "cors",
			body: JSON.stringify(body),
			headers: headers,
			redirect: "follow",
		};
	} else {
		requestOptions = {
			method: method,
			mode: "cors",
			headers: headers,
			redirect: "follow",
		};
	}

	const url = import.meta.env.VITE_API_URL + endPoint;

	return await fetch(url, requestOptions)
		.then((response) => {
			return Promise.all([response.ok, response.json().catch(() => null)]);
		})
		.then(([ok, body]) => {
			return { ok, body };
		});
};

/** Attempts to fetch data from the specified url without the Authorization header
 *
 * @param method string to specify the HTTP method ('GET','POST','PUT', etc.)
 * @param endPoint string to specify the endpoint of the api (api/example/route)
 * @param body object with the parameters to be sent to the specified url
 * @returns {HttpResponse}
 */
const FetchPublic = async (method: string, endPoint: string, body?: object): Promise<HttpResponse> => {
	const headers = new Headers();
	headers.append("Content-Type", "application/json");

	let requestOptions: RequestInit;

	if (body != null && body != undefined) {
		requestOptions = {
			method: method,
			mode: "cors",
			body: JSON.stringify(body),
			headers: headers,
			redirect: "follow",
		};
	} else {
		requestOptions = {
			method: method,
			mode: "cors",
			headers: headers,
			redirect: "follow",
		};
	}

	const url = import.meta.env.VITE_API_URL + endPoint;

	return await fetch(url, requestOptions)
		.then((response) => {
			return Promise.all([response.ok, response.json().catch(() => null)]);
		})
		.then(([ok, body]) => {
			return { ok, body };
		});
};

export { FetchPrivate, FetchPublic }