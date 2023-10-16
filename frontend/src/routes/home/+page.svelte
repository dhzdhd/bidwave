<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Product } from './+layout.server';

	export let data: { products: Product[] };

	const navigate = async (product: Product) => {
		await goto(`/home/${product.id}`);
	};
</script>

<section>
	<h1>Featured Products</h1>
	<div class="search-container">
		<select class="search-select">
			<option>All</option>
		</select>
		<input placeholder="Search Product" class="search-input" />
		<button class="search-btn">Go</button>
	</div>
	<div class="container">
		{#each data.products as product}
			<button on:click={async () => await navigate(product)} class="product">
				<img src={product.image.url} alt={product.image.alt} />
				<div class="description">
					<span class="category">Clothes</span>
					<h5 class="title">{product.name}</h5>
					<h4 class="price">${product.bidPrice}</h4>
				</div>
			</button>
		{/each}
	</div>
</section>

<style lang="sass">
@use '../../vars'
@use 'sass:color'

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

    .search-container
        display: flex
        justify-content: center
        height: 2rem

        .search-select
            background-color: vars.$accent
            color: vars.$inverted
            border-color: vars.$accent
            border-radius: 0.3rem 0rem 0rem 0.3rem

        .search-input
            padding: 0rem 0.3rem
            background-color: transparent
            color: vars.$text
            border: 1px solid
            border-color: vars.$accent

        .search-btn
            background-color: vars.$accent
            color: vars.$inverted
            width: 2rem
            border: none
            border-radius: 0rem 0.3rem 0.3rem 0rem
            cursor: pointer

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
            border: none
            background: linear-gradient(180deg, transparentize(white, 0.96) 0%, transparentize(vars.$accent, 0.9)  100%)

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
