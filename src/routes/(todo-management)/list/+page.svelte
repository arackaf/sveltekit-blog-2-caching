<script>
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';

	$: ({ todos, tags } = $page.data);

	let reloading = false;
	const reloadTodos = () => {
		reloading = true;

		return async () => {
			invalidate('reload-todos').then(() => {
				reloading = false;
			});
		};
	};

	$: currentSearch = $page.url.searchParams.get('search') || '';
</script>

<div class="search-form">
	<form action="/list">
		<label>Search</label>
		<input
			autofocus
			name="search"
			on:blur={evt => (evt.target.value = currentSearch)}
			value={currentSearch}
		/>
	</form>
</div>

<div class="reload-container">
	{#if reloading}
		<span>Reloading ...</span>
	{/if}
	<form method="POST" action="?/reloadTodos" use:enhance={reloadTodos}>
		<button>Reload todos</button>
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
		{#each todos as t}
			<tr>
				<td>{t.title}</td>
				<td>{t.tags.map(id => tags[id].name).join(', ')}</td>
				<td>{t.assigned}</td>
				<td><a href={`/details?id=${t.id}`}>Edit</a></td>
			</tr>
			<tr>
				<td colspan="4">
					<form use:enhance method="post" action="?/editTodo">
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

	.search-form,
	.reload-container {
		margin: 20px;
	}
</style>
