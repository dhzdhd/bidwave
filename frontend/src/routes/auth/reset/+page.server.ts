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

		const resp = await fetch('http://localhost:1337/api/auth/reset-password', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ code, password, passwordConfirmation })
		});
		console.log(resp);

		return { success: true };
	}
} satisfies Actions;
