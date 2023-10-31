import type { PageServerLoad } from './$types';
import RazorPay from 'razorpay';
import { KEY_ID, KEY_SECRET } from '$env/static/private';
import type { Product } from '../+layout.server';
import { error } from '@sveltejs/kit';

const razorpay = new RazorPay({
	key_id: KEY_ID,
	key_secret: KEY_SECRET
});

export const load: PageServerLoad = async ({ url, parent }) => {
	const id = Number(url.searchParams.get('id'));
	const products: { products: Product[] } = await parent();

	try {
		const product = products.products.filter((e) => e.id === id)[0];

		const response = await razorpay.orders.create({
			amount: product.bidPrice,
			currency: 'INR'
		});
		return { product, id: response.id };
	} catch (e) {
		throw error(404, { message: 'ID not found!' });
	}
};
