<script>
	import GameStore from '../store/gameStore';
	import RoundStore from '../store/roundStore';

	let revealed = false;
</script>

<div
	class="h-full bg-white rounded-lg border 
    border-gray-200 shadow-md dark:bg-gray-800
     dark:border-gray-700 z-10
     flex flex-col"
>
	<div class="p-4 text-center text-2xl text-gray-900 dark:text-white">
		<h1>
			It's <span class="font-bold text-amber-400">{$GameStore.currentPlayer.name}</span> turn.
		</h1>
	</div>

	<div class="ml-auto mr-auto w-24 h-24">
		{#if revealed}
			<img src="https://deckofcardsapi.com/static/img/AS.png" alt="" />
		{:else}
			<img src="../src/shared/assets/card.png" alt="" />
		{/if}
	</div>

	<div>
		<h1>{$RoundStore[1].question}</h1>
	</div>
</div>
