<svelte:head>
	<title>Auth | BidWave</title>
</svelte:head>

<div class="body">
	<slot />
</div>

<style lang="sass">
	@import '../../vars.sass'

	.body
		background: $primary
		display: flex
		justify-content: center
		align-items: center
		flex-direction: column
		font-family: 'Montserrat', sans-serif
		height: 100vh
</style>
