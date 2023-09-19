import type { Actions } from './$types';

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const password = formData.get('password') as string;
		const passwordConfirmation = formData.get('confirmPassword') as string;
		console.log(request.url);

		const resp = await fetch('http://localhost:1337/api/auth/reset-password', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ code: '', password, passwordConfirmation })
		});
		console.log(resp);

		return { success: true };
	}
} satisfies Actions;
