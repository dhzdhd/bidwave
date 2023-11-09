<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import '../global.sass';
	import logo from '$lib/assets/transparent.svg';

	const socialLinks = [
		{ name: 'Facebook', url: 'https://www.facebook.com/' },
		{ name: 'Twitter', url: 'https://twitter.com/' },
		{ name: 'Instagram', url: 'https://www.instagram.com/' },
		{ name: 'LinkedIn', url: 'https://www.linkedin.com/' }
	];

	const signOut = async () => {
		await goto('/');
	};
</script>

<header>
	<a class="title" href="/">
		<img src={logo} alt="logo" />
		<h1>BidWave</h1>
	</a>
	{#if $page.url.pathname === '/'}
		<nav>
			<button on:click={async () => await goto('/auth')} class="login-button">Login</button>
		</nav>
	{:else if !$page.url.pathname.includes('/auth')}
		<nav>
			<ul>
				<li><a href="/home">Home</a></li>
				<li>
					<form method="POST" action="/">
						<button on:click={signOut} type="submit">Sign out</button>
					</form>
				</li>
			</ul>
		</nav>
	{/if}
</header>
<main>
	<slot />
</main>
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
		padding: 1rem 2rem
		color: var(--secondary-color)
		z-index: 10

		.title
			display: flex
			flex-direction: row
			align-items: center
			gap: 1rem
			text-decoration: none

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

			ul
				display: flex
				flex-direction: row
				gap: 2rem
				align-items: center

				li
					list-style: none

					a
						font-size: 1.4rem
						color: vars.$text
						text-decoration: none

						&:hover
							color: vars.$accent

	main
		min-height: 100vh
		width: 100%

	footer
		position: relative
		max-width: 100vw
		bottom: 0
		display: flex
		justify-content: center
		align-items: center
		padding: 20px
		background-color: vars.$accent
		z-index: 10

		.social-link
			margin: 0 10px
			color: vars.$text
			text-decoration: none
			font-weight: bold
</style>
