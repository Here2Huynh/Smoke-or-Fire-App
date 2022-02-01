<script lang="ts">
	import GameStore from '../store/gameStore';
	import RoundStore from '../store/roundStore';
	import PlayerStore from '../store/playerStore';
	import DeckStore from '../store/deckStore';
	import CardValueStore from '../store/cardValueStore';
	import ConfigStore from '../store/configStore';

	import confetti from 'canvas-confetti';

	import type { IAddToPile } from '../types/deck_api/addedToPile';
	import type { IApiError, ICardDrew } from '../types/deck_api/cardDrew';
	import type { INewDeck } from '../types/deck_api/newDeck';

	import Button from '$lib/Button.svelte';
	import CardColumns from './CardColumns.svelte';

	let revealed = false;
	let drawnCard: ICardDrew;
	let checkMsg = '';
	let winnerMsg;
	let correctness = null;
	let showColumns = false;
	let proceedToRound5 = false;
	let playersWithCard = [];
	// let playerToShow = [];

	const myCanvas = document.createElement('canvas');
	document.body.appendChild(myCanvas);

	const fireConfettiBoyzzzz = () => {
		if ($ConfigStore.funMode) {
			confetti({
				particleCount: 100,
				spread: 70,
				origin: { y: 0.6 }
			});
		}
	};

	const drawCard = async (
		deck_id: string,
		cardCount: number = 1
	): Promise<ICardDrew | IApiError> => {
		const url = `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=${cardCount}`;
		const res = await fetch(url);

		if (res.ok) {
			return await res.json();
		}

		return {
			status: res.status,
			error: `Could not load ${url}`
		};
	};

	// TODO: add sound effect for right and wrong selection?

	// TODO: sync store and api, needed for when the cards get reshuffled for pyramid round

	const addToPile = async (
		deck_id: string,
		pile_name: string,
		cardsToAdd: string
	): Promise<IAddToPile> => {
		const url = `https://deckofcardsapi.com/api/deck/${deck_id}/pile/${pile_name}/add/?cards=${cardsToAdd}`;
		const res = await fetch(url);

		if (res.ok) {
			return await res.json();
		}
	};

	const checkRound1 = (option: string) => {
		const smokeCards = ['CLUBS', 'SPADES'];
		const fireCards = ['HEARTS', 'DIAMONDS'];

		if (
			(option == 'Smoke' && smokeCards.includes(drawnCard.cards[0].suit)) ||
			(option == 'Fire' && fireCards.includes(drawnCard.cards[0].suit))
		) {
			correctness = true;
			const verb = $RoundStore[$GameStore.round].punishment.right;
			const amount = $RoundStore[$GameStore.round].punishment.amount;
			checkMsg = ` ${verb} ${amount}`;

			fireConfettiBoyzzzz();
		} else {
			correctness = false;
			const verb = $RoundStore[$GameStore.round].punishment.wrong;
			const amount = $RoundStore[$GameStore.round].punishment.amount;
			checkMsg = ` ${verb} ${amount}`;
		}
	};

	const checkRound2 = (option: string) => {
		const firstCard = $GameStore.currentPlayer.cards[0];
		const secondCard = $GameStore.currentPlayer.cards[1];

		let firstValue, secondValue;

		if (isNaN(parseInt(firstCard.value))) {
			firstValue = $CardValueStore[firstCard.value];
		} else {
			firstValue = parseInt(firstCard.value);
		}

		if (isNaN(parseInt(secondCard.value))) {
			secondValue = $CardValueStore[secondCard.value];
		} else {
			secondValue = parseInt(secondCard.value);
		}

		console.log(firstCard, secondCard, firstValue, secondValue);

		if (
			(option === 'Low' && firstValue >= secondValue) ||
			(option === 'High' && firstValue < secondValue)
		) {
			correctness = true;
			const verb = $RoundStore[$GameStore.round].punishment.right;
			const amount = $RoundStore[$GameStore.round].punishment.amount;
			checkMsg = ` ${verb} ${amount}`;

			fireConfettiBoyzzzz();
		} else {
			correctness = false;
			const verb = $RoundStore[$GameStore.round].punishment.wrong;
			const amount = $RoundStore[$GameStore.round].punishment.amount;
			checkMsg = ` ${verb} ${amount}`;
		}
	};

	const checkRound3 = (option: string) => {
		const firstCard = $GameStore.currentPlayer.cards[0];
		const secondCard = $GameStore.currentPlayer.cards[1];

		let firstValue, secondValue, thirdValue;

		if (isNaN(parseInt(firstCard.value))) {
			firstValue = $CardValueStore[firstCard.value];
		} else {
			firstValue = parseInt(firstCard.value);
		}

		if (isNaN(parseInt(secondCard.value))) {
			secondValue = $CardValueStore[secondCard.value];
		} else {
			secondValue = parseInt(secondCard.value);
		}

		if (isNaN(parseInt(drawnCard.cards[0].value))) {
			thirdValue = $CardValueStore[drawnCard.cards[0].value];
		} else {
			thirdValue = parseInt(drawnCard.cards[0].value);
		}

		const isWithin = (rangeStart, rangeEnd, value) => {
			return (
				(rangeStart <= value && value <= rangeEnd) || (rangeStart >= value && value >= rangeEnd)
			);
		};

		if (
			(option === 'In' && isWithin(firstValue, secondValue, thirdValue)) ||
			(option === 'Out' && !isWithin(firstValue, secondValue, thirdValue))
		) {
			correctness = true;
			const verb = $RoundStore[$GameStore.round].punishment.right;
			const amount = $RoundStore[$GameStore.round].punishment.amount;
			checkMsg = ` ${verb} ${amount}`;

			fireConfettiBoyzzzz();
		} else {
			correctness = false;
			const verb = $RoundStore[$GameStore.round].punishment.wrong;
			const amount = $RoundStore[$GameStore.round].punishment.amount;
			checkMsg = ` ${verb} ${amount}`;
		}
	};

	const checkRound4 = (option: string) => {
		console.log('option', option);

		if (
			(option == '♠️' && drawnCard.cards[0].suit == 'SPADES') ||
			(option == '♣️' && drawnCard.cards[0].suit == 'CLUBS') ||
			(option == '♥️' && drawnCard.cards[0].suit == 'HEARTS') ||
			(option == '♦️' && drawnCard.cards[0].suit == 'DIAMONDS')
		) {
			correctness = true;
			const verb = $RoundStore[$GameStore.round].punishment.right;
			const amount = $RoundStore[$GameStore.round].punishment.amount;
			checkMsg = ` ${verb} ${amount}`;

			fireConfettiBoyzzzz();

			// TODO: add option to toggle confetti
		} else {
			correctness = false;
			const verb = $RoundStore[$GameStore.round].punishment.wrong;
			const amount = $RoundStore[$GameStore.round].punishment.amount;
			checkMsg = ` ${verb} ${amount}`;
		}
	};

	const setupCardColumns = async () => {
		GameStore.update((currentGame) => {
			let copyGame = { ...currentGame };
			copyGame.round++;

			return copyGame;
		});

		showColumns = true;

		let drawFour = await drawCard(($DeckStore as INewDeck).deck_id, 4);
		let drawNextFour = await drawCard(($DeckStore as INewDeck).deck_id, 4);
		drawFour.cards = drawFour.cards.map((card) => {
			card.show = false;
			return card;
		});
		drawNextFour.cards = drawNextFour.cards.map((card) => {
			card.show = false;
			return card;
		});

		const { left, right } = $RoundStore[$GameStore.round];

		if (left && right) {
			RoundStore.update((currentRound) => {
				let copyRound = { ...currentRound };

				copyRound[$GameStore.round].left = [...drawFour.cards];
				copyRound[$GameStore.round].right = [...drawNextFour.cards];

				return copyRound;
			});

			console.log('$RoundStore', $RoundStore);
		}

		// drawCards and assign them to the columns
	};

	const nextPlayer = () => {
		if ($ConfigStore.funMode && confetti) {
			confetti.reset();
		}

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

		// flip card down
		revealed = false;
	};

	const handleOptionSelection = async (option): Promise<any> => {
		console.log('$GameStore', $GameStore);
		// console.log('option', option);
		// console.log('$GameStore.currentPlayer', $GameStore.currentPlayer);
		// console.log('$GameStore.round', $GameStore.round);
		console.log('$PlayerStore', $PlayerStore);

		// reveal card
		drawnCard = await drawCard(($DeckStore as INewDeck).deck_id);
		drawnCard.cards[0].show = true;
		revealed = true;

		// add card to player hand
		PlayerStore.update((currentPlayers) => {
			let copyPlayers = [...currentPlayers];

			const foundPlayer = copyPlayers.find(
				(player) => $GameStore.currentPlayer.name === player.name
			);
			foundPlayer.cards = [...foundPlayer.cards, ...drawnCard.cards];

			GameStore.update((currentGame) => {
				let copyGame = { ...currentGame };

				if (copyGame.currentPlayer.name === foundPlayer.name) {
					copyGame.currentPlayer.cards = foundPlayer.cards;
				}

				return copyGame;
			});

			return copyPlayers;
		});

		// show correctness, message
		switch ($GameStore.round) {
			case 1:
				checkRound1(option);
				break;
			case 2:
				checkRound2(option);
				break;
			case 3:
				checkRound3(option);
				break;
			case 4:
				checkRound4(option);
				break;

			// TODO: set up UI for round 5-12, its logic for each round
		}

		/**
		 * check when round 5 begins
		 * - all players have 4 cards in hand
		 * - last player of round 4
		 */
		let round5start = $PlayerStore.every((player) => player.cards.length === 4);
		let lastPlayer = $PlayerStore[$PlayerStore.length - 1];
		let lastPlayerCheck =
			$GameStore.round === 4 && lastPlayer.name === $GameStore.currentPlayer.name;
		if (round5start && lastPlayerCheck) proceedToRound5 = true;
	};

	const handleCardReveal = (e) => {
		console.log('e.detail', e.detail);
		winnerMsg = { round5Mode: e.detail.round5Mode, rightColumnIdx: e.detail.rightColumnIdx };
		playersWithCard = e.detail.playersWithCard;

		console.log('playersWithCard - prompt', playersWithCard);
		// console.log('playerToShow', playerToShow);

		if (playersWithCard.length) {
			fireConfettiBoyzzzz();
		}

		GameStore.update((currentGame) => {
			let copyGame = { ...currentGame };

			copyGame.playersWithCard = playersWithCard;

			return copyGame;
		});

		// TODO: write in logic to account for same card that has been already revealed previously in the column
	};
</script>

<div
	class="h-full bg-white rounded-lg border 
    border-gray-200 shadow-md dark:bg-gray-800
    dark:border-gray-700 z-10 flex flex-col"
>
	<div class="p-4 text-center text-2xl text-gray-900 dark:text-white">
		{#if proceedToRound5}
			{#each playersWithCard as player}
				{#if player.cards.find((card) => !card.show)}
					<h1>
						<span class="font-bold text-amber-400">{player.name}</span>
						{winnerMsg.round5Mode === 'right' ? 'give' : 'take'}

						{#if player.cardsFlipped > 1}
							{winnerMsg.rightColumnIdx * player.cardsFlipped}
						{:else}
							{winnerMsg.rightColumnIdx}
						{/if}
					</h1>
				{:else if player.cards.find((card) => card.revealed)}
					<h1>
						<span class="font-bold text-amber-400">{player.name}'s</span>
						{`card flipped down already`}
						<!-- {winnerMsg.round5Mode === 'right' ? 'give' : 'take'}
						{winnerMsg.rightColumnIdx} -->
						<!-- TODO: check back on labelling of this -->
						<!-- TODO: adjustment font size when over 3 players -->
					</h1>
					<!-- <h1>
						<span class="font-bold text-amber-400">{player.name}</span>
						{winnerMsg.round5Mode === 'right' ? 'give' : 'take'}
						{winnerMsg.rightColumnIdx}
					</h1> -->
				{/if}
			{/each}
		{:else}
			<h1>
				It's <span class="font-bold text-amber-400">{$GameStore.currentPlayer.name}</span> turn.
			</h1>
		{/if}
	</div>

	{#if !showColumns}
		{#if revealed}
			<div class="ml-auto mr-auto w-32 h-32">
				<img src={drawnCard.cards[0].image} alt={drawnCard.cards[0].value} />
			</div>
		{:else}
			<div class="ml-auto mr-auto w-32 h-32">
				<img src="/card.png" alt="card-back" />
			</div>
		{/if}

		{#if !revealed}
			<div class="ml-auto mr-auto mt-20 text-center text-2xl text-gray-900 dark:text-white">
				{#each $RoundStore[$GameStore.round].options as option, idx (idx)}
					<Button
						{option}
						label={option}
						on:click={async () => await handleOptionSelection(option)}
					/>
				{/each}
			</div>
		{:else if !proceedToRound5}
			<div class="ml-auto mr-auto mt-20 text-center text-2xl text-gray-900 dark:text-white">
				<Button option="game" label="Next Player" on:click={nextPlayer} />
			</div>
		{/if}

		{#if revealed}
			<div
				class="p-4 text-center text-2xl text-gray-900 dark:text-white"
				class:mt-12={proceedToRound5}
			>
				{#if correctness}
					<h1><span class="text-green-500">Correct!</span>{checkMsg}</h1>
				{:else}
					<h1><span class="text-rose-500">Wrong!</span>{checkMsg}</h1>
				{/if}
			</div>
			{#if proceedToRound5}
				<div class="ml-auto mr-auto text-center text-2xl text-gray-900 dark:text-white">
					<Button option="game" label="Proceed to Next Round" on:click={setupCardColumns} />
				</div>
			{/if}
		{/if}
	{:else if $RoundStore[$GameStore.round].left.length && $RoundStore[$GameStore.round].right.length}
		<CardColumns on:reveal-card={handleCardReveal} />
	{/if}
</div>
