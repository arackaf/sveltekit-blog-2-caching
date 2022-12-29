let todos = [
	{ id: 1, title: 'Write SvelteKit intro blog post', assigned: 'Adam', tags: [1] },
	{ id: 2, title: 'Write SvelteKit advanced data loading blog post', assigned: 'Adam', tags: [1] },
	{ id: 3, title: 'Prepare RenderATL talk', assigned: 'Adam', tags: [2] },
	{ id: 4, title: 'Fix all SvelteKit bugs', assigned: 'Rich', tags: [3] },
	{ id: 5, title: "Edit Adam's blog posts", assigned: 'Geoff', tags: [4] },
	{ id: 6, title: 'Read C++ 20 content', assigned: 'Adam', tags: [5] },
	{ id: 7, title: 'Read Swift content', assigned: 'Adam', tags: [5] },
	{ id: 8, title: 'Bug Vercel people for the Next mutations RFC', assigned: 'Adam', tags: [6] }
];

let tags = [
	{ id: 1, name: 'SvelteKit Content', color: 'red' },
	{ id: 2, name: 'Conferences', color: 'purple' },
	{ id: 3, name: 'SvelteKit Development', color: 'pink' },
	{ id: 4, name: 'CSS-Tricks Admin', color: 'blue' },
	{ id: 5, name: 'Education', color: 'green' },
	{ id: 6, name: 'Next', color: 'orange' }
];

export const wait = async amount => new Promise(res => setTimeout(res, amount ?? 250));

export async function getTodos(search) {
	await wait();

	return todos.filter(todo => !search || new RegExp(search, 'i').test(todo.title));
}

export async function getTags() {
	await wait();

	return tags.reduce((lookup, tag) => {
		lookup[tag.id] = tag;
		return lookup;
	}, {});
}

export async function getTodo(id) {
	return todos.find(t => t.id == id);
}

export async function updateTodo(id, newTitle) {
	const todo = todos.find(t => t.id == id);
	Object.assign(todo, { title: newTitle });
}
