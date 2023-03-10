import { getTodo, updateTodo, wait } from '$lib/data/todoData';

export const actions = {
	async editTodo({ request, cookies }) {
		const formData = await request.formData();

		const id = formData.get('id');
		const newTitle = formData.get('title');

		await wait(250);
		updateTodo(id, newTitle);

		cookies.set('todos-cache', +new Date(), { path: '/', httpOnly: false });
	}
};
