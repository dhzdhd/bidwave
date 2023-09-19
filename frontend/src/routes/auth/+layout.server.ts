import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const jwt = cookies.get('sessionjwt');
	// Check for expiry using current time (30 days currently)
	if (jwt) {
		throw redirect(307, '/home');
	}
};
