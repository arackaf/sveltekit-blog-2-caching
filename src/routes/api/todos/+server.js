import { json } from '@sveltejs/kit';
import { getTodos } from '$lib/data/todoData';

export async function GET({ url, setHeaders, request }) {
	const search = url.searchParams.get('search') || '';

	setHeaders({
		'cache-control': 'max-age=60'
	});

	const todos = await getTodos(search);

	return json(todos);
}
