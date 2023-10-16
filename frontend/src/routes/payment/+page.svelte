<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { onMount } from 'svelte';
	import { PUBLIC_KEY_ID } from '$env/static/public';

	export let data;
	let rzp;

	// TODO Implement payment cancel functions
	onMount(() => {
		const options = {
			key: PUBLIC_KEY_ID,
			amount: '50000',
			currency: 'INR',
			name: 'BidWave',
			order_id: data.id,
			theme: {
				color: '#725bdb'
			}
		};
		rzp = new Razorpay(options);
	});

	function openCheckout() {
		rzp!.open();
	}
</script>

<svelte:head>
	<title>Payment | BidWave</title>
	<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
</svelte:head>

<div class="payment-container">
	<h1>Payment Checkout</h1>

	<img src="" alt="item" />
	<div class="desc-container">
		<p>Item: Cloth</p>
		<p>Price: $5</p>
	</div>

	<Button id="rzp" func={openCheckout} text="Make Payment" />
</div>

<style lang="sass">
	@use '../../vars'

	.payment-container
		display: flex
		flex-direction: column
		align-items: center
		justify-content: center
		background-color: vars.$primary
		padding: 6rem
		color: vars.$text
		width: 100%
		height: 100vh
		text-align: center

		.desc-container
			padding: 2rem 1rem
</style>
