import { writable } from 'svelte/store';

import { getCurrentCookieValue } from '$lib/util/cookieUtils';

export async function load({ fetch, url, setHeaders, depends }) {
	depends('reload-todos');
	const search = url.searchParams.get('search') || '';

	let headers = {};
	if (typeof window === 'object') {
		headers['todos-cache'] = getCurrentCookieValue('todos-cache');
	}

	const resp = await fetch(`/api/todos?search=${encodeURIComponent(search)}`, {
		headers
	});

	const todos = await resp.json();

	return {
		todos
	};
}
