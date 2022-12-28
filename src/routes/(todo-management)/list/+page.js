import { getTodos, getTags } from '$lib/data/todoData';

export function load({ fetch }) {
	console.log({ fetch });

	const xxx = fetch('/api/todos');

	const todos = getTodos();

	return {
		todos
	};
}
