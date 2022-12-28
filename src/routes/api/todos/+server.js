import { json } from '@sveltejs/kit';

export async function GET({ url }) {
	const search = url.searchParams.get('search') || '';

	console.log('search', search);

	return json({});
}
