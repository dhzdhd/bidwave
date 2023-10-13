<script lang="ts">
	import Button from '$lib/components/Button.svelte';

	async function makePayment() {
		console.log('hi');
	}
</script>

<div class="payment-container">
	<h1>Payment</h1>

	<img src="" />
	<div class="desc-container">
		<p>Item: Cloth</p>
		<p>Price: $5</p>
	</div>

	<Button func={makePayment} text="Make Payment" />
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
