import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { CMS_URL } from '$lib/constants';

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;

		if (email.trim() === '') {
			return fail(401, { message: 'Invalid credentials!' });
		}

		try {
			const resp = await fetch(`${CMS_URL}/api/auth/forgot-password`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email })
			});
			const data = await resp.json();

			if (resp.status !== 200) {
				return fail(resp.status, { message: JSON.stringify(data) });
			}

			return { success: true };
		} catch (err) {
			return fail(500, { message: 'Failed to initiate password reset!' });
		}
	}
} satisfies Actions;
