<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { CMS_URL } from '$lib/constants.js';
	import moment from 'moment';
	import socketIOClient, { Socket } from 'socket.io-client';
	import { onMount } from 'svelte';
	import type { Image, Product } from '../+layout.server.js';
	export let data;

	let product = data.product;
	let socket: Socket;
	let currentBid: number = 0;

	const updateProduct = (data: any) => {
		const rawImage = data['attributes']['image']['data'][0]['attributes'];
		const newProduct = {
			id: data['id'],
			name: data['attributes']['name'],
			auctionEnd: data['attributes']['auction_end'],
			auctionStart: data['attributes']['auction_start'],
			price: data['attributes']['price'],
			bidPrice: data['attributes']['bid_price'],
			description: data['attributes']['description'],
			available: data['attributes']['available'],
			category: data['attributes']['category']['data']['attributes']['name'],
			image: {
				alt: rawImage['name'],
				width: rawImage['width'],
				height: rawImage['height'],
				mime: rawImage['mime'],
				url: `${CMS_URL}${rawImage['url']}`
			} satisfies Image
		} satisfies Product;

		product = newProduct;
	};

	const calcTime = () => {
		const now = moment();
		remaining = moment.duration(time.diff(now));

		const days = remaining.days();
		const hours = remaining.hours();
		const minutes = remaining.minutes();
		const seconds = remaining.seconds();
	};

	const makeBid = () => {
		socket.emit('makeBid', {
			bidValue: currentBid,
			product: product.id
			// user: user.id, TODO:
		});
	};

	onMount(() => {
		socket = socketIOClient(CMS_URL, { query: { token: data.token } });
		socket.emit('loadBids', { id: product.id });
		socket.on('loadBids', (data: any) => {
			console.log(data);
		});
	});

	const time = moment.parseZone(product.auctionEnd, moment.ISO_8601);
	const now = moment();
	let remaining = moment.duration(time.diff(now));

	setInterval(calcTime, 1000);
</script>

<svelte:head>
	<title>{product.name} | BidWave</title>
</svelte:head>

<section>
	<h1>{product.name}</h1>
	<img src={product.image.url} id="img" alt={product.image.alt} />
	<div class="details">
		<h2 class="price">${product.bidPrice}</h2>
		<div class="timer">
			<span>
				{remaining.days()} days
			</span>
			<span class="__timer" id="hours">{remaining.hours()}</span>
			<span class="__timer-label">hr</span>
			<span class="__timer" id="minutes">{remaining.minutes()}</span>
			<span class="__timer-label">min</span>
			<span class="__timer" id="seconds">{remaining.seconds()}</span>
			<span class="__timer-label">sec</span>
		</div>
		<h4>Product Details</h4>
		<span>{product.description}</span>
	</div>
	<input bind:value={currentBid} type="number" />
	<Button id="bid-btn" text="Make Bid" func={makeBid} />
</section>

<style lang="sass">
@use '../../../vars'
@use 'sass:color'

section
    min-height: 100vh
    display: flex
    flex-direction: column
    flex-grow: 1
    gap: 1rem
    align-items: center
    padding: 5rem 2rem
    color: vars.$inverted
    text-align: center

    h1
        font-size: 2rem
        color: vars.$text

    .details
        .price
            color: vars.$accent

        .timer
            font-size: 2rem
</style>
