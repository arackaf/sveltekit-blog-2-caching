export async function load({ fetch, url, setHeaders }) {
	const search = url.searchParams.get('search') || '';

	let headers = {};
	if (typeof window === 'object') {
		headers['todos-cache'] = localStorage.getItem('todos-cache');
	}

	const resp = await fetch(`/api/todos?search=${encodeURIComponent(search)}`, {
		headers
	});

	const todos = await resp.json();

	return {
		todos
	};
}
