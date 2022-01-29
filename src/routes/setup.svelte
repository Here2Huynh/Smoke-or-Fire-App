<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	import PlayerStore from '../store/playerStore';
	import GameStore from '../store/gameStore';
	import Button from '$lib/Button.svelte';

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
		addPlayers(playerCount);
		PlayerStore.update((currentPlayers) => {
			let copyPlayers = [...currentPlayers];

			copyPlayers = [...players];

			return copyPlayers;
		});

		GameStore.update((currentGame) => {
			let copyGame = { ...currentGame };
			copyGame.started = true;
			copyGame.currentPlayer = $PlayerStore[0];
			copyGame.round = 1;

			return copyGame;
		});

		goto('/');
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
			<Button label="Start New Game" on:click={newGameSetup} />
		</div>

		<!-- TODO: add history tracking so it shows on the next time user goes back -->
		{#if $GameStore.started}
			<div class="mt-4">
				<Button option="game" label="Continue Game" on:click={() => goto('/')} />
			</div>
		{/if}
	</form>
</div>
