import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = async ({ cookies }) => {
	const jwt = cookies.get('sessionjwt');
	// TODO Check for expiry using current time (30 days currently)
	if (jwt) {
		throw redirect(307, '/home');
	}
};
