import type { PageServerLoad } from './$types';
import RazorPay from 'razorpay';
import { KEY_ID, KEY_SECRET } from '$env/static/private';

const razorpay = new RazorPay({
	key_id: KEY_ID,
	key_secret: KEY_SECRET
});

export const load: PageServerLoad = async ({ url }) => {
	const response = await razorpay.orders.create({
		amount: Number(url.searchParams.get('amount')),
		currency: 'INR'
	});
	return { id: response.id };
};
