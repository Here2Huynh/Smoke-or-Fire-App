<script>
	import GameStore from '../store/gameStore';
	import RoundStore from '../store/roundStore';
	import PlayerStore from '../store/playerStore';

	let revealed = false;
	let round = $GameStore.round;
	let option1;
	let option2;
	let option1Style;
	let option2Style;

	$: option1;
	$: option2;

	if (round != 4) {
		const options = $RoundStore[round].question.split('/');
		console.log('options', options);
		option1 = options[0];
		option2 = options[1];
	}

	switch (option1) {
		case 'Smoke':
			option1Style = 'slate';
			break;
	}

	switch (option2) {
		case 'Fire':
			option2Style = 'amber';
			break;
	}

	const handleOptionSelection = () => {
		console.log('$GameStore', $GameStore);
		console.log('$GameStore.currentPlayer', $GameStore.currentPlayer);
		console.log('$PlayerStore', $PlayerStore);

		// move to next player
		GameStore.update((currentGame) => {
			let copyGame = { ...currentGame };

			const playerIdx = copyGame.currentPlayer.idx + 1;
			if (playerIdx < $PlayerStore.length) {
				copyGame.currentPlayer = { ...$PlayerStore[playerIdx] };
			} else {
				// if player all players done, increment round
				copyGame.round++;
				copyGame.currentPlayer = { ...$PlayerStore[0] };
			}

			return copyGame;
		});
	};
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

	<div class="ml-auto mr-auto w-32 h-32">
		{#if revealed}
			<img src="https://deckofcardsapi.com/static/img/AS.png" alt="" />
		{:else}
			<img src="../src/shared/assets/card.png" alt="" />
		{/if}
	</div>

	<div class="ml-auto mr-auto mt-20 text-center text-2xl text-gray-900 dark:text-white">
		<button
			type="button"
			on:click={handleOptionSelection}
			class={`text-white bg-${option1Style}-400 hover:bg-${option1Style}-500 focus:ring-4 
            focus:ring-${option1Style}-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
            mr-2 mb-2`}
		>
			{option1}
		</button>
		<span class="m-2">or</span>
		<button
			type="button"
			on:click={handleOptionSelection}
			class={`text-white bg-${option2Style}-400 hover:bg-${option2Style}-500 focus:ring-4 
            focus:ring-${option2Style}-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
            mr-2 mb-2`}
		>
			{option2}
		</button>
	</div>
</div>

<!-- 
    dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-800 
    dark:border-gray-700
-->
