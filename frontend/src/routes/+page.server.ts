import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Actions } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies }) => {
	const jwt = cookies.get('sessionjwt');
	// TODO Check for expiry using current time (30 days currently)
	if (jwt) {
		throw redirect(307, '/home');
	}
};

export const actions = {
	default: async ({ cookies }) => {
		cookies.delete('sessionjwt');
	}
} satisfies Actions;
