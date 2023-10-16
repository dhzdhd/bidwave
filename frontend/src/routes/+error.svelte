<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{$page.status} | BidWave</title>
</svelte:head>

<div>
	<h1>{$page.status}</h1>
	<h2>{$page.error?.message}</h2>
	<button on:click={async () => await goto('/')}>Go Home</button>
</div>

<style lang="sass">
    @use '../vars'

    div
        height: 100vh
        width: 100%
        display: flex
        flex-direction: column
        align-items: center
        justify-content: center

        h1
            font-size: 5rem
            color: vars.$accent
            text-align: center

        h2
            font-size: 3rem
            color: vars.$text

        button
            margin-top: 3rem
            padding: 10px 20px
            border: none
            border-radius: 20px
            background-color: vars.$accent
            color: vars.$inverted
            font-weight: bold
            cursor: pointer
</style>
