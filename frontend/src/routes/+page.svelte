<script>
	import '../global.sass';
</script>

<svelte:head>
	<title>BidWave</title>
</svelte:head>

<main>
	<h2>Welcome to <span>BidWave</span></h2>
	<p>Find the best deals on the items you love.</p>
	<p>Join our community of bidders and start bidding today!</p>
</main>

<style lang="sass">
    @use '../vars'

    main
        background-color: vars.$primary
        color: vars.$text
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
                background: -webkit-linear-gradient(bottom right, vars.$darker-accent, vars.$accent)
                -webkit-background-clip: text
                -webkit-text-fill-color: transparent

        p
            font-size: 1.2rem
</style>
