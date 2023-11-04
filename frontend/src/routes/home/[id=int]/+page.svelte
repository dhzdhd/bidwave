<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { CMS_URL } from '$lib/constants.js';
	import moment from 'moment';
	import socketIOClient, { Socket } from 'socket.io-client';
	import { onMount } from 'svelte';
	import type { Product } from '../+layout.server';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	export let data;

	let product = data.product;
	let socket: Socket;
	let currentBid: number = 0;
	let isWinner: boolean = false;

	const time = moment.parseZone(product.auctionEnd, moment.ISO_8601);
	const now = moment();
	let remaining = moment.duration(time.diff(now));

	const updateProduct = (data: any) => {
		const newProduct = {
			...product,
			bidPrice: data['bid_price']
		} satisfies Product;

		product = newProduct;
	};

	const calcTime = () => {
		const now = moment();
		remaining = moment.duration(time.diff(now));

		if (now.isSameOrAfter(time)) {
			product.available = false;
		}
	};

	const makeBid = () => {
		console.log(data.userid);

		socket.emit('makeBid', {
			bidValue: currentBid,
			product: product.id,
			user: data.userid
		});
	};

	onMount(() => {
		socket = socketIOClient(CMS_URL, { query: { token: data.token } });
		socket.emit('loadProducts', { id: product.id });
		socket.on('loadProducts', (data: any) => {
			console.log(data);

			updateProduct(data);
		});

		socket.on('loadBids', (data: any) => {
			if (browser) {
				const user = window.localStorage.getItem('user');
				isWinner = Number(data.user) === Number(user);
			}
		});
	});

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
		{#if product.available}
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
		{/if}
		<h4>Product Details</h4>
		<span>{product.description}</span>
	</div>
	<input bind:value={currentBid} type="number" />
	<Button id="bid-btn" text="Make Bid" func={makeBid} />

	{#if !product.available}
		<h1>Auction ended!</h1>
	{/if}

	{#if isWinner && !product.available}
		<h1>You won the auction!</h1>
		<Button
			id="payment-btn"
			text="Proceed to payment"
			func={() => goto(`/home/payment?id=${product.id}`)}
		/>
	{/if}
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
