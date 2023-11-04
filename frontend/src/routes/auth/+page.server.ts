import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { CMS_URL } from '$lib/constants';

const apiUrl = `${CMS_URL}/api`;

export const actions = {
	login: async ({ cookies, request }) => {
		const data = await request.formData();
		const identifier = data.get('email') as string;
		const password = data.get('password') as string;

		if (identifier.trim() === '' || password.trim() === '') {
			return fail(401, { message: 'Invalid credentials' });
		}

		try {
			const response = await fetch(`${apiUrl}/auth/local`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ identifier, password })
			});
			const data = await response.json();

			if (response.status !== 200) {
				return fail(response.status, { message: JSON.stringify(data) });
			}

			cookies.set('sessionjwt', data.jwt);
			cookies.set('userid', data.user.id);
			return { success: true, id: data.user.id };
		} catch (err) {
			console.log(err);
			return fail(500, { message: 'Failed to login!' });
		}
	},
	register: async ({ cookies, request }) => {
		const data = await request.formData();
		const username = data.get('name') as string;
		const email = data.get('email') as string;
		const password = data.get('password') as string;

		if (username.trim() === '' || password.trim() === '' || email.trim() === '') {
			return fail(401, { message: 'Invalid credentials' });
		}

		try {
			const response = await fetch(`${apiUrl}/auth/local/register`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username: username, email, password })
			});
			const data = await response.json();

			if (response.status !== 200) {
				return fail(response.status, { message: JSON.stringify(data) });
			}

			cookies.set('sessionjwt', data.jwt);
			cookies.set('userid', data.user.id);
			return { success: true, id: data.user.id };
		} catch (err) {
			console.log(err);
			return fail(500, { message: 'Failed to register!' });
		}
	}
} satisfies Actions;
