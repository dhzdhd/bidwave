import type { Actions } from './$types';

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;

		const resp = await fetch('http://localhost:1337/api/auth/forgot-password', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email })
		});
		console.log(resp);

		return { success: true };
	}
} satisfies Actions;
