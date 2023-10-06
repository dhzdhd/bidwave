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
	<div class="title">
		<img src="transparent.svg" />
		<h1>BidWave</h1>
	</div>
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
	@use '../vars'

	:global(body)
		background-color: vars.$primary

	header
		position: fixed
		top: 0
		width: 100vw
		background-color: vars.$primary
		display: flex
		justify-content: space-between
		align-items: center
		padding: 20px
		color: var(--secondary-color)

		.title
			display: flex
			flex-direction: row
			align-items: center
			gap: 1rem

			img
				width: 2rem
				height: 2rem

			h1
				color: vars.$text

		nav
			display: flex
			gap: 20px

			button
				padding: 10px 20px
				border: none
				border-radius: 20px
				background-color: vars.$accent
				color: vars.$inverted
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
		background-color: vars.$accent

		.social-link
			margin: 0 10px
			color: vars.$text
			text-decoration: none
			font-weight: bold
</style>
