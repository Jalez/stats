const getApiData = async (url: string) => {
	const controller = new AbortController();
	const signal = controller.signal;
	setTimeout(() => controller.abort(), 5000);
	try {
		const response = await fetch(url, { signal });
		const contentType = response.headers.get('content-type')
		if (contentType && contentType.includes("application/json")) {
			const data = await response.json();
			return data;
		} else {
			console.log('Oops, ', url, ' does not give JSON (perhaps you are working without the api?)');
			return null;
		}
	} catch (error) {
		console.error(error);
	}
}

export default getApiData;