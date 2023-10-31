import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { CMS_URL } from '$lib/constants';

const apiUrl = `${CMS_URL}/api`;
const url = CMS_URL;

export interface Product {
	id: number;
	name: string;
	auctionEnd: string; // Change to date
	auctionStart: string;
	price: number;
	bidPrice: number;
	description: string;
	available: boolean;
	image: Image;
	category: string;
}

export interface Image {
	alt: string;
	width: number;
	height: number;
	mime: string;
	url: string;
}

export const load: LayoutServerLoad = async ({ cookies }) => {
	const productResp = await fetch(`${apiUrl}/products?populate=*`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${cookies.get('sessionjwt')}`
		}
	});
	const productJson = await productResp.json();

	const categoryResp = await fetch(`${apiUrl}/categories?populate=*`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${cookies.get('sessionjwt')}`
		}
	});
	const categoryJson = await categoryResp.json();

	if (productResp.status !== 200 || categoryResp.status !== 200) {
		throw error(productResp.status, { message: 'Unauthorized' });
	}

	return {
		products: productJson.data.map((e: any) => {
			const rawImage = e['attributes']['image']['data'][0]['attributes'];

			return {
				id: e['id'],
				name: e['attributes']['name'],
				auctionEnd: e['attributes']['auction_end'],
				auctionStart: e['attributes']['auction_start'],
				price: e['attributes']['price'],
				bidPrice: e['attributes']['bid_price'],
				description: e['attributes']['description'],
				available: e['attributes']['available'],
				category: e['attributes']['category']['data']['attributes']['name'],
				image: {
					alt: rawImage['name'],
					width: rawImage['width'],
					height: rawImage['height'],
					mime: rawImage['mime'],
					url: `${url}${rawImage['url']}`
				} satisfies Image
			} satisfies Product;
		}),
		categories: categoryJson.data.map((e: any) => {
			return e['attributes']['name'];
		})
	} satisfies { products: Product[]; categories: string[] };
};
