<script>
	import { createEventDispatcher } from 'svelte';
	import GameStore from '../store/gameStore';
	import RoundStore from '../store/roundStore';
	import PlayerStore from '../store/playerStore';

	import Button from '$lib/Button.svelte';

	let rightColumnIdx = 0;
	let leftColumnIdx = 0;
	let round5Mode = 'right';

	const dispatch = createEventDispatcher();

	const showCard = () => {
		const allRightColumnShown = $RoundStore[$GameStore.round].right.every((card) => card.show);
		const allLeftColumnShown = $RoundStore[$GameStore.round].left.every((card) => card.show);
		let playersWithCard;

		console.log(rightColumnIdx, allRightColumnShown);

		if (rightColumnIdx === 4 && allRightColumnShown) {
			round5Mode = 'left';
		}

		if (!allRightColumnShown && round5Mode === 'right') {
			console.log(
				rightColumnIdx,
				$RoundStore[$GameStore.round].right,
				$RoundStore[$GameStore.round].right[rightColumnIdx].value
			);
			$RoundStore[$GameStore.round].right[rightColumnIdx].show = true;

			playersWithCard = $PlayerStore.filter((player) =>
				player.cards.some(
					(card) => card.value === $RoundStore[$GameStore.round].right[rightColumnIdx].value
				)
			);
			console.log('playersWithCard', playersWithCard);
			PlayerStore.update((currentPlayers) => {
				const copyPlayers = [...currentPlayers];

				playersWithCard.forEach((player) => {
					const matchingPlayer = copyPlayers.find((p) => p.name === player.name);
					console.log('matchingPlayer', matchingPlayer);
					const matchingCard = matchingPlayer.cards.find(
						(card) => card.value === $RoundStore[$GameStore.round].right[rightColumnIdx].value
					);
					matchingCard.show = false;
				});

				return copyPlayers;
			});

			// TODO: change the prompt label to tell players who as the cards

			rightColumnIdx++;
		}

		if (!allLeftColumnShown && round5Mode === 'left') {
			console.log(
				leftColumnIdx,
				$RoundStore[$GameStore.round].left,
				$RoundStore[$GameStore.round].left[leftColumnIdx].value
			);
			$RoundStore[$GameStore.round].left[leftColumnIdx].show = true;

			playersWithCard = $PlayerStore.filter((player) =>
				player.cards.some(
					(card) => card.value === $RoundStore[$GameStore.round].left[leftColumnIdx].value
				)
			);
			console.log('playersWithCard2', playersWithCard);
			PlayerStore.update((currentPlayers) => {
				const copyPlayers = [...currentPlayers];

				playersWithCard.forEach((player) => {
					const matchingPlayer = copyPlayers.find((p) => p.name === player.name);
					console.log('matchingPlayer', matchingPlayer);
					const matchingCard = matchingPlayer.cards.find(
						(card) => card.value === $RoundStore[$GameStore.round].left[leftColumnIdx].value
					);
					matchingCard.show = false;
				});

				return copyPlayers;
			});

			leftColumnIdx++;
		}

		GameStore.update((currentGame) => {
			let copyGame = { ...currentGame };
			currentGame.playersWithCard = playersWithCard;
			return currentGame;
		});

		if (round5Mode === 'right') {
			dispatch('reveal-card', { rightColumnIdx, round5Mode, playersWithCard });
		}

		if (round5Mode === 'left') {
			dispatch('reveal-card', { leftColumnIdx, round5Mode, playersWithCard });
		}

		// TODO: add logic checking with players hand
	};
</script>

<div class="grid grid-cols-2">
	<div class="flex flex-col ml-8">
		{#each $RoundStore[$GameStore.round].left as leftCard, idx (idx)}
			{#if leftCard.show}
				<div class="ml-auto mr-auto w-24 h-24">
					<img src={leftCard.image} alt={leftCard.value} />
				</div>
			{:else}
				<div class="ml-auto mr-auto w-24 h-24">
					<img src="/card.png" alt="card-back" />
				</div>
			{/if}
		{/each}
	</div>
	<div class="flex flex-col mr-8">
		{#each $RoundStore[$GameStore.round].right as rightCard, idx (idx)}
			{#if rightCard.show}
				<div class="ml-auto mr-auto w-24 h-24">
					<img src={rightCard.image} alt={rightCard.value} />
				</div>
			{:else}
				<div class="ml-auto mr-auto w-24 h-24">
					<img src="/card.png" alt="card-back" />
				</div>
			{/if}
		{/each}
	</div>
</div>

<div class="ml-auto mr-auto mt-16">
	<Button option="game" label="Show Card" on:click={showCard} />
</div>
