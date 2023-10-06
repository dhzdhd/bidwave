<script lang="ts">
	import '../global.sass';

	const socialLinks = [
		{ name: 'Facebook', url: 'https://www.facebook.com/' },
		{ name: 'Twitter', url: 'https://twitter.com/' },
		{ name: 'Instagram', url: 'https://www.instagram.com/' },
		{ name: 'LinkedIn', url: 'https://www.linkedin.com/' }
	];
</script>

<header>
	<h1>BidWave</h1>
	<nav>
		<button on:click={() => goto('/auth')} class="login-button">Login</button>
	</nav>
</header>
<slot />
<footer>
	{#each socialLinks as link}
		<a class="social-link" href={link.url} target="_blank">{link.name}</a>
	{/each}
</footer>

<style lang="sass">
	@import '../vars'

	:global(body)
		background-color: $primary

	header
		position: fixed
		top: 0
		width: 100vw
		background-color: $primary
		display: flex
		justify-content: space-between
		align-items: center
		padding: 20px
		color: var(--secondary-color)

		h1
			color: $text

		nav
			display: flex
			gap: 20px

			button
				padding: 10px 20px
				border: none
				border-radius: 20px
				background-color: $accent
				color: $inverted
				font-weight: bold
				cursor: pointer

	footer
		position: fixed
		width: 100vw
		bottom: 0
		display: flex
		justify-content: center
		align-items: center
		padding: 20px
		background-color: $accent

		.social-link
			margin: 0 10px
			color: $text
			text-decoration: none
			font-weight: bold
</style>
