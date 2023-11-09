<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { CMS_URL } from '$lib/constants.js';
	import moment from 'moment';
	import socketIOClient, { Socket } from 'socket.io-client';
	import { onMount } from 'svelte';
	import type { Product } from '../+layout.server';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { fade, fly } from 'svelte/transition';
	export let data;

	let product = data.product;
	let socket: Socket;
	let currentBid: number = 50;
	let isWinner: boolean = false;
	let currentlyWinning: boolean = false;

	let showPopup = false;
	let popupMessage = 'Error';

	const time = moment.parseZone(product.auctionEnd, moment.ISO_8601);
	const now = moment();
	let remaining = moment.duration(time.diff(now));

	$: if (showPopup) {
		setTimeout(() => {
			showPopup = false;
		}, 2000);
	}

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

		if (currentBid < 50) {
			showPopup = true;
			popupMessage = 'Bid amount should be atleast 50';
			return;
		}

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
			console.log('products loaded');

			console.log(data);

			updateProduct(data);
		});

		socket.on('loadBids', (data: any) => {
			console.log('bids loaded');

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
	<img src={product.image.url} id="img" alt={product.image.alt} class="image" />
	<div class="details">
		<h4>Product Details</h4>
		<span>{product.description}</span>
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
		<h1 class="win-state">
			Currently {isWinner ? 'Winning!' : 'Losing!'}
		</h1>
	</div>
	{#if product.available}
		<input bind:value={currentBid} type="number" min="50" class="input" />
		<Button id="bid-btn" text="Make Bid" func={makeBid} />
	{/if}

	{#if !product.available}
		<div class="dialog">
			{#if isWinner}
				<h1>You won the auction!</h1>
				<Button
					id="payment-btn"
					text="Proceed to payment"
					func={() => goto(`/home/payment?id=${product.id}`)}
				/>
			{:else}
				<h1>You lost the auction!</h1>
				<h2>Better luck next time!</h2>
			{/if}
		</div>
	{/if}
	{#if showPopup}
		<div in:fly={{ y: 200 }} out:fade class="popup">
			{popupMessage}
		</div>
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

    img
        padding-top: 2rem
        width: auto
        height: 25rem

    .details
        .price
            padding-top: 2rem
            color: vars.$accent

        .timer
            font-size: 2rem

        .win-state
            padding: 2rem 0rem

    input
        background-color: vars.$secondary
        padding: 12px 15px
        margin: 8px 0
        width: 10rem
        border-radius: 15px
        border: none
        color: white

    .dialog
        position: fixed
        background-color: vars.$primary
        box-shadow: 0rem 0rem 100vh 100vh black
        display: flex
        flex-direction: column
        gap: 1rem
        padding: 5rem
        border-radius: 2rem
        top: 40vh
        z-index: 0

.popup
    position: fixed
    bottom: 2rem
    color: white
    font-size: 1rem
    font-weight: bold
    background-color: red
    padding: 0.5rem 2rem
    border-radius: 1rem
    z-index: 100
</style>
