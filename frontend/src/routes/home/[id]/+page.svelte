<script lang="ts">
	import { goto } from '$app/navigation';
	import moment from 'moment';
	export let data;

	const time = moment.parseZone(data.auctionEnd, moment.ISO_8601);
	const now = moment();
	const remaining = moment.duration(time.diff(now));

	const days = remaining.days();
	const hours = remaining.hours();
	const minutes = remaining.minutes();
	const seconds = remaining.seconds();
</script>

<svelte:head>
	<title>{data.name} | BidWave</title>
</svelte:head>

<section>
	<h1>{data.name}</h1>
	<img src={data.image.url} id="img" alt={data.image.alt} />
	<div class="details">
		<h2 class="price">${data.bidPrice}</h2>
		<div class="timer">
			<span>
				{days} days
			</span>
			<span class="__timer" id="hours">{hours}</span>
			<span class="__timer-label">hr</span>
			<span class="__timer" id="minutes">{minutes}</span>
			<span class="__timer-label">min</span>
			<span class="__timer" id="seconds">{seconds}</span>
			<span class="__timer-label">sec</span>
		</div>
		<h4>Product Details</h4>
		<span>{data.description}</span>
	</div>
</section>

<style lang="sass">
@use '../../../vars'
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

    .details
        .price
            color: vars.$accent

        .timer
            font-size: 2rem
</style>
