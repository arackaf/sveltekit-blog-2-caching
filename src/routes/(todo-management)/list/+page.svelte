<script>
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';

	$: ({ todos, tags } = $page.data);

	function runInvalidate() {
		localStorage.setItem('todos-cache', +new Date());
	}

	function executeSave({ data }) {
		const id = data.get('id');
		const title = data.get('title');

		return async () => {
			todos.update(list =>
				list.map(todo => {
					if (todo.id == id) {
						return Object.assign({}, todo, { title });
					} else {
						return todo;
					}
				})
			);
		};
	}
</script>

<div class="search-form">
	<form action="/list">
		<label>Search</label>
		<input autofocus name="search" />
	</form>
</div>

<table cellspacing="10" cellpadding="10">
	<thead>
		<tr>
			<th>Task</th>
			<th>Tags</th>
			<th>Assigned</th>
			<th>Edit</th>
		</tr>
	</thead>
	<tbody>
		{#each $todos as t}
			<tr>
				<td>{t.title}</td>
				<td>{t.tags.map(id => tags[id].name).join(', ')}</td>
				<td>{t.assigned}</td>
				<td><a href={`/details?id=${t.id}`}>Edit</a></td>
			</tr>
			<tr>
				<td colspan="4">
					<form
						use:enhance={executeSave}
						on:submit={runInvalidate}
						method="post"
						action="?/editTodo"
					>
						<input name="id" value={t.id} type="hidden" />
						<input name="title" value={t.title} />
						<button>Save</button>
					</form>
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	th {
		text-align: left;
	}

	.search-form {
		margin: 20px;
	}
</style>
