import { getTodos, getTags } from '$lib/data/todoData';

export function load({ fetch }) {
	const todos = fetch('/api/todos');

	return {
		todos
	};
}
