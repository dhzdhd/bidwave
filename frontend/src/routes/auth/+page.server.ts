import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

const apiUrl = 'http://localhost:1337/api';

export const load: PageServerLoad = async ({ cookies }) => {
	const jwt = cookies.get('sessionjwt');
	// Check for expiry using current time (30 days currently)
	if (jwt) {
		throw redirect(307, '/');
	}
};

export const actions = {
	login: async ({ cookies, request }) => {
		const data = await request.formData();
		const identifier = data.get('email') as string;
		const password = data.get('password') as string;

		if (identifier.trim() === '' || password.trim() === '') {
			return fail(422, { message: 'Invalid credentials' });
		}

		const response = await fetch(`${apiUrl}/auth/local`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ identifier, password })
		});
		const json = await response.json();

		cookies.set('sessionjwt', json.jwt);
		return { success: true };
	},
	register: async ({ cookies, request }) => {
		const data = await request.formData();
		const username = data.get('name') as string;
		const email = data.get('email') as string;
		const password = data.get('password') as string;

		if (username?.trim() === '' || password?.trim() === '' || email?.trim() === '') {
			return fail(422, { message: 'Invalid credentials' });
		}

		try {
			const response = await fetch(`${apiUrl}/auth/local/register`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username: username, email, password })
			});

			if (response.status !== 200) {
				console.log(JSON.stringify(await response.json()));

				return fail(500, { message: 'Failed to register!' });
			}

			const json = await response.json();
			console.log(json);

			cookies.set('sessionjwt', json.jwt);

			return { success: true };
		} catch (err) {
			console.log(err);

			return fail(500, { message: 'Failed to register!' });
		}
	}
} satisfies Actions;
