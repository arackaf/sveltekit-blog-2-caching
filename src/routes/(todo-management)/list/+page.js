export async function load({ fetch, url }) {
	const search = url.searchParams.get('search') || '';

	let header = {};
	if (typeof window === 'object') {
		if (!localStorage.getItem('todos-cache')) {
			localStorage.setItem('todos-cache', +new Date());
		}

		header['todo-cache'] = localStorage.getItem('todos-cache');
	}

	const resp = await fetch(`/api/todos?search=${encodeURIComponent(search)}`, {
		headers: {
			...header
		}
	});

	const todos = await resp.json();

	return {
		todos
	};
}
