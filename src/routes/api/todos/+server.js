import { json } from '@sveltejs/kit';

import { getTodos } from '$lib/data/todoData';

export async function GET({ url, setHeaders, request }) {
	const search = url.searchParams.get('search') || '';

	const currentCacheBust = request.headers.get('todos-cache');

	//if (currentCacheBust) {
	setHeaders({
		'cache-control': 'max-age=60',
		Vary: 'todos-cache'
	});
	//}

	const todos = await getTodos(search);

	return json(todos);
}
