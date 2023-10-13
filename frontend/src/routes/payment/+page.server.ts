import type { PageServerLoad } from './$types';
import RazorPay from 'razorpay';

const razorpay = new RazorPay({
	key_id: 'w',
	key_secret: ''
});

export const load: PageServerLoad = async () => {
	return { message: 'success' };
};

const makePayment = async (amount: number) => {
	await razorpay.orders.create({
		amount,
		currency: 'INR'
	});
};
