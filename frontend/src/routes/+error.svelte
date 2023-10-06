<script lang="ts">
	import { page } from '$app/stores';
</script>

<div>
	<h1>{$page.status}</h1>
	<h2>{$page.error?.message}</h2>
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
</style>
