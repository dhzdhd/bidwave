import type { PageServerLoad } from './$types';

const apiUrl = 'http://localhost:1337/api';

export interface Product {
	id: number;
	name: string;
	auctionEnd: string; // Change to date
	auctionStart: string;
	price: number;
	bidPrice: number;
	amount: number;
	description: string;
	available: boolean;
	image: Image;
}

export interface Image {
	alt: string;
	width: number;
	height: number;
	mime: string;
	url: string;
}

export const load: PageServerLoad = async ({ cookies }) => {
	return {};

	const response = await fetch(`${apiUrl}/products?populate=*`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${cookies.get('sessionJwt')}`
		}
	});

	const json = await response.json();

	return {
		products: json.data.map((e: any) => {
			const rawImage = e['attributes']['image']['data'][0]['attributes'];

			return {
				id: e['id'],
				name: e['attributes']['name'],
				auctionEnd: e['attributes']['auction_end'],
				auctionStart: e['attributes']['auction_start'],
				price: e['attributes']['price'],
				bidPrice: e['attributes']['bid_price'],
				amount: e['attributes']['number'],
				description: e['attributes']['description'],
				available: e['attributes']['available'],
				image: {
					alt: rawImage['name'],
					width: rawImage['width'],
					height: rawImage['height'],
					mime: rawImage['mime'],
					url: rawImage['url']
				} satisfies Image
			} satisfies Product;
		})
	} satisfies { products: Product[] };
};
