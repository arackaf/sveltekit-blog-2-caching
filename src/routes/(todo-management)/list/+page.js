import { writable } from 'svelte/store';

import { getCurrentCookieValue } from '$lib/util/cookieUtils';

export async function load({ fetch, parent, url, setHeaders, depends }) {
	depends('reload-todos');
	const parentData = await parent();

	const cacheBust = getCurrentCookieValue('todos-cache') || parentData.todosCacheBust;
	const search = url.searchParams.get('search') || '';

	const resp = await fetch(`/api/todos?search=${encodeURIComponent(search)}&cache=${cacheBust}`);
	const todos = await resp.json();

	return {
		todos
	};
}
