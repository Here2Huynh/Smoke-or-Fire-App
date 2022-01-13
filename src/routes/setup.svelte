<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	import PlayerStore from '../store/playerStore';
	import GameStore from '../store/gameStore';

	let playerCount;
	const playerNumberOptions = [...Array(11).keys()].slice(3, 11);
	let players = [];

	const addPlayers = (numberToAdd) => {
		players = [];
		for (let i = 0; i < numberToAdd; i++) {
			players.push({
				name: `player${i + 1}`,
				cards: [],
				idx: i
			});
		}
	};

	// TODO: add typescript types to this component

	// TODO: add input validation, to reduce api errors

	const updatePlayers = () => {
		if (playerCount != players.length) addPlayers(playerCount);
	};

	const newGameSetup = () => {
		goto('/');

		PlayerStore.update((currentPlayers) => {
			let copyPlayers = [...currentPlayers];

			copyPlayers = [...players];

			return copyPlayers;
		});

		GameStore.update((currentGame) => {
			let copyGame = { ...currentGame };
			copyGame.started = true;
			copyGame.currentPlayer = players[0];

			return copyGame;
		});
	};

	onMount(() => {
		if (playerCount) addPlayers(playerCount);
	});
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
		{#each players as player, idx (idx)}
			<input
				placeholder={player.name}
				bind:value={player.name}
				class="m-1 border-2 border-gray-300"
			/>
		{/each}

		<div class="mt-4">
			<button
				on:click={newGameSetup}
				type="button"
				class="text-white bg-amber-600 hover:bg-amber-500
                focus:ring-4 focus:ring-amber-300 font-medium rounded-lg 
                text-sm px-5 py-2.5 text-center mb-2 dark:bg-amber-400 
                dark:hover:bg-amber-700 dark:focus:ring-amber-900"
			>
				Start New Game</button
			>
		</div>

		{#if $GameStore.started}
			<div class="mt-4">
				<button
					on:click={() => goto('/')}
					type="button"
					class="text-white bg-amber-600 hover:bg-amber-500
                focus:ring-4 focus:ring-amber-300 font-medium rounded-lg 
                text-sm px-5 py-2.5 text-center mb-2 dark:bg-amber-400 
                dark:hover:bg-amber-700 dark:focus:ring-amber-900"
				>
					Continue Game</button
				>
			</div>
		{/if}
	</form>
</div>
