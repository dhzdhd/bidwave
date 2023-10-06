<script lang="ts">
	import type { Product } from './+page.server';

	export let data: { products: Product[] };
</script>

<section>
	<h1>Featured Products</h1>
	<div class="container">
		{#each data.products as product}
			<div class="product">
				<img src={product.image.url} alt={product.image.alt} />
				<div class="description">
					<span class="category">Clothes</span>
					<h5 class="title">{product.name}</h5>
					<h4 class="price">${product.bidPrice}</h4>
				</div>
			</div>
		{/each}
	</div>
</section>

<style lang="sass">
@use '../../vars'

section
    min-height: 100vh
    display: flex
    flex-direction: column
    flex-grow: 1
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
            min-width: 20rem
            padding: 10px 12px
            border-radius: 25px
            place-self: center
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
