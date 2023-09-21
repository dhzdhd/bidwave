<script>
	let email = '';

	import { fly } from 'svelte/transition';
</script>

<!-- TODO Create popup to ask to check email -->
<div in:fly={{ y: 200 }} class="container" id="container">
	<div class="top">
		<h1>Enter your email</h1>
	</div>
	<form method="POST" class="bottom">
		<input bind:value={email} name="email" type="email" placeholder="Email" />
		<a href="/auth" class="back">Back to login</a>
		<button>Submit</button>
	</form>
</div>

<style lang="sass">
	@import '../../../vars'

	.container
		background-color: $primary
		border-radius: 0.5rem
		box-shadow: 0 0 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)
		position: relative
		width: 24rem
		min-height: 30rem

		.top
			display: flex
			align-items: center
			text-align: center
			justify-content: center
			height: 50%
			border-radius: 0.5rem 0.5rem 0 0
			background: linear-gradient(to bottom right, $darker-accent, $accent)
			color: $text

		.bottom
			display: flex
			flex-direction: column
			align-items: center
			justify-content: center
			height: 50%
			padding: 0 2rem
			gap: 1rem

			input
				background-color: $secondary
				padding: 12px 15px
				width: 100%
				border-radius: 15px
				border: none
				color: white

			.back
				color: $text
				font-size: 0.9rem
				text-decoration: none
				margin: 0.5rem 0 0 0
				background-color: transparent

			button
				border-radius: 20px
				background-color: $accent
				color: $inverted
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
