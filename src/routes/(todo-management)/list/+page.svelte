<script>
	import { page } from '$app/stores';

	$: ({ todos, tags } = $page.data);

	function invalidate() {
		localStorage.setItem('todos-cache', +new Date());
	}
</script>

<div class="search-form">
	<form action="/list">
		<input name="search" />
	</form>
</div>

<br />
<button on:click={invalidate}>Invalidate</button>
<br />

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
