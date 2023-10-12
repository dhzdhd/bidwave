<script lang="ts">
	let selectedOption: 'upi' | 'netbanking' | 'cod' | 'card' | 'wallet' | null = null;
	let upiId = '';
	let cardName = '';
	let cardNumber = '';
	let validThru = '';
	let securityCode = '';
	let bankName = '';
	let accountNumber = '';
	let ifscCode = '';
	let walletId = '';
	let counterNumber: number | null = null;
	let paymentStatus: 'Success' | 'Failure' | null = null;
	let selectedItem: number | null = null;
	let itemPrice = 0;

	function showUPIBox() {
		selectedOption = 'upi';
	}

	function showCardBox() {
		selectedOption = 'card';
	}

	function showNetbankingBox() {
		selectedOption = 'netbanking';
	}

	function showWalletBox() {
		selectedOption = 'wallet';
	}

	function showCODMessage() {
		selectedOption = 'cod';
		counterNumber = Math.floor(Math.random() * 1000);
	}

	function setItemAndPrice(item: number, price: number) {
		selectedItem = item;
		itemPrice = price;
	}

	async function makePayment() {
		if (selectedItem && paymentStatus === null) {
			if (selectedOption === 'upi' && upiId) {
				// Process UPI payment using a real payment gateway API
				try {
					// Simulate payment processing with a successful response
					const response = await makeRealPayment(selectedOption, itemPrice, upiId);
					if (response.success) {
						paymentStatus = 'Success';
					} else {
						paymentStatus = 'Failure';
					}
				} catch (error) {
					paymentStatus = 'Failure';
				}
			} else if (selectedOption === 'card' && cardName && cardNumber && validThru && securityCode) {
				// Process Card payment using a real payment gateway API
				try {
					// Simulate payment processing with a successful response
					const response = await makeRealPayment(selectedOption, itemPrice, cardNumber);
					if (response.success) {
						paymentStatus = 'Success';
					} else {
						paymentStatus = 'Failure';
					}
				} catch (error) {
					paymentStatus = 'Failure';
				}
			} else if (selectedOption === 'netbanking' && bankName && accountNumber && ifscCode) {
				// Process Netbanking payment using a real payment gateway API
				try {
					// Simulate payment processing with a successful response
					const response = await makeRealPayment(selectedOption, itemPrice, accountNumber);
					if (response.success) {
						paymentStatus = 'Success';
					} else {
						paymentStatus = 'Failure';
					}
				} catch (error) {
					paymentStatus = 'Failure';
				}
			} else if (selectedOption === 'wallet' && walletId) {
				// Process Wallet payment using a real payment gateway API
				try {
					// Simulate payment processing with a successful response
					const response = await makeRealPayment(selectedOption, itemPrice, walletId);
					if (response.success) {
						paymentStatus = 'Success';
					} else {
						paymentStatus = 'Failure';
					}
				} catch (error) {
					paymentStatus = 'Failure';
				}
			} else {
				// Invalid or incomplete payment information
				paymentStatus = 'Failure';
			}
		}
	}

	async function makeRealPayment(paymentMethod: any, amount: number, accountInfo: any) {
		// Here you would call a real payment gateway API
		// and pass the paymentMethod, amount, and accountInfo.
		// The payment gateway will handle the payment processing.
		// You will need to integrate with a specific payment gateway's API for this.
		// Return a response object with a 'success' field indicating the result.
		// For demonstration, this is a simulated response.
		await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate an API call delay
		return { success: true };
	}
</script>

<div class="payment-container">
	<h1>Payment Options</h1>

	{#if paymentStatus === 'Success'}
		<p>Payment Successful! Thank you for your payment of {itemPrice} for item: {selectedItem}.</p>
	{:else if paymentStatus === 'Failure'}
		<p>Payment Failed. Please check your payment information and try again.</p>
	{:else}
		<p>Item: {selectedItem}</p>
		<p>Price: {itemPrice}</p>
		{#if selectedOption === 'upi'}
			<div class="input-field">
				<input type="text" bind:value={upiId} placeholder="Enter UPI ID (xyz@bankname)" />
			</div>
		{:else if selectedOption === 'card'}
			<div class="input-field">
				<input type="text" bind:value={cardName} placeholder="Card Name" />
			</div>
			<div class="input-field">
				<input type="text" bind:value={cardNumber} placeholder="Card Number" />
			</div>
			<div class="input-field">
				<input type="text" bind:value={validThru} placeholder="Valid Thru" />
			</div>
			<div class="input-field">
				<input type="text" bind:value={securityCode} placeholder="Security Code" />
			</div>
		{:else if selectedOption === 'netbanking'}
			<div class="input-field">
				<input type="text" bind:value={bankName} placeholder="Bank Name" />
			</div>
			<div class="input-field">
				<input type="text" bind:value={accountNumber} placeholder="Account Number" />
			</div>
			<div class="input-field">
				<input type="text" bind:value={ifscCode} placeholder="IFSC Code" />
			</div>
		{:else if selectedOption === 'wallet'}
			<div class="input-field">
				<input type="text" bind:value={walletId} placeholder="Wallet ID" />
			</div>
		{:else if selectedOption === 'cod'}
			<p>Go to the nearest counter with the following number: {counterNumber}</p>
		{/if}

		<button on:click={showUPIBox}>UPI</button>
		<button on:click={showCardBox}>Card</button>
		<button on:click={showNetbankingBox}>Netbanking</button>
		<button on:click={showWalletBox}>Wallet</button>
		<button on:click={showCODMessage}>COD</button>
		<button on:click={makePayment}>Make Payment</button>
	{/if}
</div>

<style lang="sass">
	.payment-container
		background-color: #725bdb
		padding: 6rem
		border-radius: 0
		color: white
		width: 100%
		height: 100vh
		text-align: center

	.input-field
		margin: 10px 0
</style>
