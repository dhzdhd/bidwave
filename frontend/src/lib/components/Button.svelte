<script lang="ts">
    export let func: () => void;
    export let text: string;
</script>

<button on:click={func}>{text}</button>

<style lang="sass">
    @use '../../vars'

    button
        border-radius: 20px
        background-color: vars.$accent
        color: vars.$inverted
        font-size: 12px
        font-weight: bold
        padding: 12px 45px
        letter-spacing: 1px
        text-transform: uppercase
        transition: transform 80ms ease-in
        border: none
        cursor: pointer

        &:active
            transform: scale(0.95)

        &:focus
            outline: none
</style>