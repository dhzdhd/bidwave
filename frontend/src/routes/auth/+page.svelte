<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { fade, fly } from 'svelte/transition';

	let isSignIn = false;
	let email = '';
	let password = '';
	let name = '';
	let showPopup = false;

	$: if ($page.status !== 200) {
		showPopup = true;

		setTimeout(() => {
			showPopup = false;
		}, 2000);
	}

	const toggle = () => {
		isSignIn = !isSignIn;
	};
</script>

<div in:fly={{ y: 200 }} class="container" id="container">
	<div class="form-container {isSignIn ? 'sign-in-container' : 'sign-up-container'}">
		<form method="POST" action={isSignIn ? '?/login' : '?/register'} use:enhance>
			<h1>{isSignIn ? 'Sign In' : 'Create Account'}</h1>
			{#if !isSignIn}
				<input bind:value={name} name="name" type="text" placeholder="Name" />
			{/if}
			<input bind:value={email} name="email" type="email" placeholder="Email" />
			<input bind:value={password} name="password" type="password" placeholder="Password" />
			<a href="/auth/forgot" class="forgpass">Forgot your password?</a>
			<button>{isSignIn ? 'Sign In' : 'Sign Up'}</button>
		</form>
	</div>
	{#key isSignIn}
		<div
			transition:fly={{ x: isSignIn ? '24rem' : '-24rem', duration: 500 }}
			class="overlay-container {isSignIn ? 'overlay-left' : 'overlay-right'}"
		>
			{#if isSignIn}
				<h1>Welcome Back!</h1>
				<p>To keep connected with us please login with your personal info</p>
				<button on:click={toggle} class="ghost" id="signUp">Sign Up</button>
			{:else}
				<h1>Hello, Bidder!</h1>
				<p>Enter your personal details and start your journey with us</p>
				<button on:click={toggle} class="ghost" id="signIn">Sign In</button>
			{/if}
		</div>
	{/key}
</div>
{#if showPopup}
	<div in:fly={{ y: 200 }} out:fade class="popup">
		{$page.form.message}
	</div>
{/if}

<style lang="sass">
	@import '../../vars'

	.popup
		position: fixed
		bottom: 2rem
		color: white
		font-size: 1rem
		font-weight: bold
		background-color: red
		padding: 0.5rem 2rem
		border-radius: 1rem
		z-index: 10

	h1
		color: $text
		font-weight: bold
		margin: 1rem 0rem

	p
		font-size: 14px
		font-weight: 100
		line-height: 20px
		letter-spacing: 0.5px
		margin: 20px 0 30px

	.forgpass
		color: $text
		font-size: 0.9rem
		text-decoration: none
		margin: 1rem 0
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

	button.ghost
		background-color: transparent
		border: solid 1px

	form
		background-color: $primary
		display: flex
		align-items: center
		justify-content: center
		flex-direction: column
		padding: 0 50px
		height: 100%
		text-align: center

	input
		background-color: $secondary
		padding: 12px 15px
		margin: 8px 0
		width: 100%
		border-radius: 15px
		border: none
		color: white

	.container
		background-color: $primary
		border-radius: 0.5rem
		box-shadow: 0 0 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)
		position: relative
		width: 48rem
		min-height: 30rem

	.form-container
		position: absolute
		height: 100%
		width: 50%
		border-radius: 2rem

	form
		background-color: transparent

	.sign-in-container
		right: 0

	.sign-up-container
		left: 0
		border-radius: 0.5rem 0 0 0.5rem

	.overlay-container
		position: absolute
		width: 50%
		height: 100%
		background: linear-gradient(to bottom right, $darker-accent, $accent)
		color: $inverted
		display: flex
		align-items: center
		justify-content: center
		flex-direction: column
		padding: 0 3rem
		text-align: center

	.overlay-right
		right: 0
		border-radius: 0 0.5rem 0.5rem 0

	.overlay-left
		left: 0
		border-radius: 0.5rem 0 0 0.5rem

	// .social-container
	// 	margin: 20px 0

	// 	a
	// 		border: 1px solid #121212
	// 		border-radius: 50%
	// 		display: inline-flex
	// 		justify-content: center
	// 		align-items: center
	// 		margin: 0 5px
	// 		height: 40px
	// 		width: 40px
</style>
