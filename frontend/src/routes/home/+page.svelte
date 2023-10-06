<script lang="ts">
    export let data;
    let products = ["hi", "hi", "hi", "hi", "hi", "hi", "hi", "hi", "hi", "hi", "hi", "hi", "hi", "hi", "hi", "hi", "hi", "hi", "hi", "hi", "hi", "hi", "hi", "hi", "hi", "hi", "hi"]
</script>

<section>
    <h1>Featured Products</h1>
    <div class="container">
        {#each products as product}
            <div class="product">
                <img src="https://cdn-images.farfetch-contents.com/13/77/09/62/13770962_17126919_1000.jpg" alt="">
                <div class="description">
                    <span class="category">Clothes</span>
                    <h5 class="title">Astronaut T-shirts</h5>
                    <h4 class="price">$100</h4>
                </div>
            </div>
        {/each}
    </div>
</section>

<style lang="sass">
@use '../../vars'

section
    display: flex
    flex-direction: column
    gap: 1rem
    align-items: center
    padding: 5rem 2rem
    color: vars.$inverted
    text-align: center      

    h1
        font-size: 2rem
        color: vars.$text

    .container
        display: grid 
        gap: 1rem
        grid-template-columns: repeat(3, 1fr)

        .product
            width: 23%
            min-width: 250px
            padding: 10px 12px
            border-radius: 25px
            cursor: pointer
            transition: 0.2s

            &:hover
                box-shadow: 2px 2px 10px vars.$accent

            img
                width: 100%
                border-radius: 20px

            .description
                text-align: start
                padding: 10px 0

                .category
                    color: vars.$text
                    font-size: 12px

                .title
                    padding-top: 7px
                    color: vars.$inverted
                    font-size: 14px

                .price
                    padding-top: 7px
                    font-size: 15px
                    font-weight: 700
                    color: vars.$accent
</style>
