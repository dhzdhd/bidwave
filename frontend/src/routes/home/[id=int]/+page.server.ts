import { error } from '@sveltejs/kit';
import type { Product } from '../+layout.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, parent }) => {
	const id = Number.parseInt(params.id);
	const parentData: { products: Product[] } = await parent();

	const filtered = parentData.products.filter((e) => e.id === id);

	if (filtered.length === 0) {
		throw error(500, { message: 'The product does not exist!' });
	} else {
		const data = filtered[0];

		return data;
	}
};
