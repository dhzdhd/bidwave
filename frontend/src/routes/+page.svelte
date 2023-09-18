<script>
	import { goto } from '$app/navigation';
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

<main>
	<h2>Welcome to <span>BidWave</span></h2>
	<p>Find the best deals on the items you love.</p>
	<p>Join our community of bidders and start bidding today!</p>
</main>

<footer>
	{#each socialLinks as link}
		<a class="social-link" href={link.url} target="_blank">{link.name}</a>
	{/each}
</footer>

<style lang="sass">
    @import '../vars'

    header
        position: fixed
        top: 0
        width: 100vw
        display: flex
        justify-content: space-between
        align-items: center
        padding: 20px
        background-color: transparent
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

    main
        background-color: $primary
        color: $text
        display: flex
        flex-direction: column
        align-items: center
        justify-content: center
        height: 100vh
        padding: 50px

        h2
            font-size: 3rem
            padding-bottom: 1rem

            span
                background: -webkit-linear-gradient(bottom right, $darker-accent, $accent)
                -webkit-background-clip: text
                -webkit-text-fill-color: transparent

        p
            font-size: 1.2rem

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
