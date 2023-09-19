import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, cookies }) => {
	const code = url.searchParams.get('code');

	if (code !== null) {
		cookies.set('code', code);
	}
};

export const actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const password = formData.get('password') as string;
		const passwordConfirmation = formData.get('confirm') as string;
		const code = cookies.get('code');

		if (password.trim() === '' || passwordConfirmation.trim() === '') {
			return fail(401, { message: 'Invalid credentials!' });
		}

		if (password !== passwordConfirmation) {
			return fail(401, { message: 'Passwords not matching!' });
		}

		try {
			const resp = await fetch('http://localhost:1337/api/auth/reset-password', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ code, password, passwordConfirmation })
			});
			const data = await resp.json();

			if (resp.status !== 200) {
				return fail(resp.status, { message: JSON.stringify(data) });
			}

			return { success: true };
		} catch (err) {
			return fail(500, { message: 'Failed to reset password!' });
		}
	}
} satisfies Actions;
