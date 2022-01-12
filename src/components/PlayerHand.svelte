<script>
	export let player;
</script>

<!-- <div
	class="inline p-6 max-w-sm bg-white rounded-lg border 
	border-gray-200 shadow-md hover:bg-gray-100 
	dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
>
	<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
		{player.name}
	</h5>

	<div class="w-4">
		<img src="https://deckofcardsapi.com/static/img/AS.svg" />
		<img src="https://deckofcardsapi.com/static/img/KS.svg" />
		<img src="https://deckofcardsapi.com/static/img/QS.svg" />
		<img src="https://deckofcardsapi.com/static/img/JS.svg" />
	</div>
</div> -->
<!-- TODO: fix the styling -->
<div
	class="bg-white rounded-lg border  
	shadow-md hover:bg-gray-100 dark:border-gray-700 
	dark:bg-gray-800 dark:hover:bg-gray-700 p-4"
>
	<div class="grid grid-cols-5 gap-0">
		<h5 class="mt-auto mb-auto text-2xl font-boldtext-gray-900 dark:text-white">
			{player.name}
		</h5>
		<!-- <div class="col-start-3 col-end-4"> -->
		<div class="w-full h-full">
			<img src="https://deckofcardsapi.com/static/img/AS.png" alt="" />
		</div>
		<div class="w-full h-full">
			<img src="https://deckofcardsapi.com/static/img/AS.png" alt="" />
		</div>
		<div class="w-full h-full">
			<img src="https://deckofcardsapi.com/static/img/AS.png" alt="" />
		</div>
		<div class="w-full h-full">
			<img src="https://deckofcardsapi.com/static/img/AS.png" alt="" />
		</div>

		<!-- <img src="https://deckofcardsapi.com/static/img/KS.svg" />
		<img src="https://deckofcardsapi.com/static/img/QS.svg" />
		<img src="https://deckofcardsapi.com/static/img/JS.svg" /> -->
		<!-- </div> -->
	</div>
</div>

<style>
	/* img {
		width: 100px;
		height: 200px;
	} */
</style>
