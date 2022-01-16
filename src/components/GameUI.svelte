<script>
	import { fly } from 'svelte/transition';

	import PlayerStore from '../store/playerStore';
	import GameStore from '../store/gameStore';

	import Prompt from '../components/Prompt.svelte';
</script>

<div class="grid grid-rows-5 grid-cols-6 gap-16 auto-cols-max game-grid m-2">
	{#each $PlayerStore as player, idx (idx)}
		<div
			class="bg-white rounded-lg border  
			shadow-md hover:bg-gray-100 dark:border-gray-700 
			dark:bg-gray-800 dark:hover:bg-gray-700 
			p-4 grid grid-cols-5 gap-2 h-32"
			class:col-start-1={idx % 2 == 0}
			class:col-end-3={idx % 2 == 0}
			class:col-start-5={idx % 2 != 0}
			class:col-end-7={idx % 2 != 0}
		>
			<h5
				class="mt-auto mb-auto text-2xl font-bold text-gray-900 dark:text-white"
				class:text-amber-400={$GameStore.currentPlayer.name === player.name}
				class:dark:text-amber-400={$GameStore.currentPlayer.name === player.name}
			>
				{player.name}
			</h5>

			<div class="col-start-3 col-span-2 grid grid-cols-4 w-24">
				{#each player.cards as card, idx (idx)}
					<div in:fly={{ x: 200, duration: 1000 }} class="w-16 h-16">
						<img src={card.image} alt={card.value} />
					</div>
				{/each}
			</div>
		</div>
	{/each}

	<div class="col-start-3 col-span-2 row-span-full">
		<Prompt />
	</div>
</div>

<style>
	.game-grid {
		max-height: 600px;
	}
</style>
