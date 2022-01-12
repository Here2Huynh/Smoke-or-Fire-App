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
	dark:bg-gray-800 dark:hover:bg-gray-700"
>
	<div class="flex flex-row">
		<h5 class="ml-4 mt-16 text-2xl font-boldtext-gray-900 dark:text-white">
			{player.name}
		</h5>
		<div class="w-28 flex flex-row">
			<img src="https://deckofcardsapi.com/static/img/AS.svg" alt="" width="100%" height="150%" />
			<img src="https://deckofcardsapi.com/static/img/KS.svg" />
			<img src="https://deckofcardsapi.com/static/img/QS.svg" />
			<img src="https://deckofcardsapi.com/static/img/JS.svg" />
		</div>
	</div>
</div>
