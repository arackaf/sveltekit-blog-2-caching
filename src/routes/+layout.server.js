export function load({ cookies, isDataRequest }) {
	const initialRequest = !isDataRequest;

	const cacheValue = initialRequest ? +new Date() : cookies.get('todos-cache');

	if (initialRequest) {
		cookies.set('todos-cache', cacheValue, { path: '/', httpOnly: false });
	}

	return {
		todosCacheBust: cacheValue
	};
}
