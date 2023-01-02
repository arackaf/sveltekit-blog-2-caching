export function load({ cookies }) {
	cookies.set('todos-cache', +new Date(), { path: '/', httpOnly: false });
}
