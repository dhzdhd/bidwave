import type { Actions } from './$types';

const apiUrl = 'http://localhost:1337/api';

export const actions = {
	login: async ({ cookies, request }) => {
		const data = await request.formData();
		const identifier = data.get('identifier');
		const password = data.get('password');

		const response = await fetch(`${apiUrl}/auth/local`, {
			method: 'POST',
			body: JSON.stringify({ identifier, password })
		});
		const json = await response.json()

		cookies.set('sessionJwt', json.jwt);
		return { success: true };
	},
	register: async ({ cookies, request }) => {
		const data = await request.formData();
		const username = data.get('username');
		const email = data.get('email');
		const password = data.get('password');

		const response = await fetch(`${apiUrl}/auth/local/register`, {
			method: 'POST',
			body: JSON.stringify({ username, email, password })
		});
		const json = await response.json()

		cookies.set('sessionJwt', json.jwt);
		return { success: true };
	}
} satisfies Actions;
