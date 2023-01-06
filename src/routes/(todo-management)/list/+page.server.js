import { getTodo, updateTodo, wait } from '$lib/data/todoData';

export const actions = {
	async reloadTodos({ cookies }) {
		cookies.set('todos-cache', +new Date(), { path: '/', httpOnly: false });
	},
	async editTodo({ request }) {
		const formData = await request.formData();

		const id = formData.get('id');
		const newTitle = formData.get('title');

		await wait(250);
		updateTodo(id, newTitle);
	}
};
