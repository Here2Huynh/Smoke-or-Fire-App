<script>
	// @ts-nocheck
	import { goto } from '$app/navigation';

	import PlayerStore from '../store/playerStore';
	import GameStore from '../store/gameStore';
	import Button from '$lib/Button.svelte';

	let playerCount;
	const playerNumberOptions = [...Array(11).keys()].slice(3, 11);

	const addPlayers = (playerCount) => {
		PlayerStore.update((currentPlayers) => {
			let copyPlayers = [...currentPlayers];

			if (playerCount > $PlayerStore.length) {
				for (let i = 0; i < playerCount - $PlayerStore.length; i++) {
					copyPlayers.push({
						name: `player${i + $PlayerStore.length + 1}`,
						cards: [],
						idx: i
					});
				}
			}

			if (playerCount < $PlayerStore.length) {
				copyPlayers.splice(playerCount, $PlayerStore.length - playerCount);
			}

			return copyPlayers;
		});
	};

	const updatePlayers = () => {
		if (playerCount != $PlayerStore.length) addPlayers(playerCount);
	};

	const newGameSetup = () => {
		GameStore.update((currentGame) => {
			let copyGame = { ...currentGame };
			copyGame.currentPlayer = $PlayerStore[0];
			copyGame.round = 1;

			return copyGame;
		});

		goto('/');
	};
</script>

<div class="flex justify-center mt-12">
	<form class="flex flex-col">
		<label for="game-options" class="text-gray-900 dark:text-white overline text-2xl"
			>New Game Setup</label
		>

		<label for="player-count" class="text-gray-900 dark:text-white mt-4">Number of players: </label>
		<select
			class="text-gray-900 border-2 border-gray-300"
			bind:value={playerCount}
			on:change={updatePlayers}
		>
			{#each playerNumberOptions as option, idx (idx)}
				<option value={option}>{option}</option>
			{/each}
		</select>

		<label for="player-names" class="text-gray-900 dark:text-white mt-4">Player Names: </label>
		{#each $PlayerStore as player, idx (idx)}
			<input
				placeholder={player.name}
				bind:value={player.name}
				class="m-1 border-2 border-gray-300"
			/>
			{#if /\s/.test(player.name)}
				<p class="text-rose-400">Name can't contain spaces</p>
			{/if}
		{/each}

		<div class="mt-4">
			<Button label="Start New Game" on:click={newGameSetup} />
		</div>

		{#if $GameStore.started}
			<div class="mt-4">
				<Button option="game" label="Continue Game" on:click={() => goto('/')} />
			</div>
		{/if}
	</form>
</div>
