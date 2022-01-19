<script lang="ts">
	import GameStore from '../store/gameStore';
	import RoundStore from '../store/roundStore';
	import PlayerStore from '../store/playerStore';
	import DeckStore from '../store/deckStore';
	import CardValueStore from '../store/cardValueStore';

	import type { IAddToPile } from '../types/deck_api/addedToPile';
	import type { ICardDrew } from '../types/deck_api/cardDrew';
	import type { INewDeck } from '../types/deck_api/newDeck';

	let revealed = false;
	let drawnCard: ICardDrew;
	let checkMsg = '';
	let correctness = null;
	let showColumns = false;
	let rightColumnIdx = 0;
	let leftColumnIdx = 0;
	let round5Mode = 'right';

	const assignOptionStyle = (option: string) => {
		let color;
		switch (option) {
			case 'Smoke':
				color = 'slate';
				break;
			case 'Fire':
				color = 'amber';
				break;
			case 'High':
				color = 'orange';
				break;
			case 'Low':
				color = 'cyan';
				break;
			case 'In':
				color = 'lime';
				break;
			case 'Out':
				color = 'rose';
				break;
			case '♠️':
				color = 'stone';
				break;
			case '♣️':
				color = 'stone';
				break;
			case '♥️':
				color = 'red';
				break;
			case '♦️':
				color = 'red';
				break;
		}

		return `text-white bg-${color}-500 hover:bg-${color}-400 focus:ring-4 
                focus:ring-${color}-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                mr-2 mb-2`;
	};

	const drawCard = async (deck_id: string, cardCount: number = 1): Promise<ICardDrew> => {
		const url = `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=${cardCount}`;
		const res = await fetch(url);

		if (res.ok) {
			return await res.json();
		}

		// TODO: add error handling to these api calls
		// return {
		// 	status: res.status,
		// 	error: new Error(`Could not load ${url}`)
		// };
	};

	// TODO: sync store and api
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

		const first = firstCard.code.split('');
		const second = secondCard.code.split('');

		if (
			(option === 'Low' && $CardValueStore[first[0]] >= $CardValueStore[second[0]]) ||
			(option === 'High' && $CardValueStore[first[0]] < $CardValueStore[second[0]])
		) {
			correctness = true;
			const verb = $RoundStore[$GameStore.round].punishment.right;
			const amount = $RoundStore[$GameStore.round].punishment.amount;
			checkMsg = ` ${verb} ${amount}`;
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

		const first = firstCard.code.split('');
		const second = secondCard.code.split('');

		const isWithin = (rangeStart, rangeEnd, value) => {
			return (
				(rangeStart <= value && value <= rangeEnd) || (rangeStart >= value && value >= rangeEnd)
			);
		};

		if (
			(option === 'In' &&
				isWithin(
					$CardValueStore[first[0]],
					$CardValueStore[second[0]],
					$CardValueStore[drawnCard.cards[0].value]
				)) ||
			(option === 'Out' &&
				!isWithin(
					$CardValueStore[first[0]],
					$CardValueStore[second[0]],
					$CardValueStore[drawnCard.cards[0].value]
				))
		) {
			correctness = true;
			const verb = $RoundStore[$GameStore.round].punishment.right;
			const amount = $RoundStore[$GameStore.round].punishment.amount;
			checkMsg = ` ${verb} ${amount}`;
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

		// console.log($GameStore.round, drawFour, drawNextFour, left, right);
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

	const showCard = () => {
		const allRightColumnShown = $RoundStore[$GameStore.round].right.every((card) => card.show);
		const allLeftColumnShown = $RoundStore[$GameStore.round].left.every((card) => card.show);

		if (rightColumnIdx === 3 && allRightColumnShown) {
			round5Mode = 'left';
		}

		if (!allRightColumnShown && round5Mode === 'right') {
			console.log(
				rightColumnIdx,
				$RoundStore[$GameStore.round].right,
				$RoundStore[$GameStore.round].right[rightColumnIdx].value
			);
			$RoundStore[$GameStore.round].right[rightColumnIdx].show = true;
			rightColumnIdx++;

			const playersWithCard = [];
			$PlayerStore.forEach((player) => {
				const hasCards = player.cards.filter(
					(card) => card.value === $RoundStore[$GameStore.round].right[rightColumnIdx].value
				);

				if (hasCards.length) {
					playersWithCard.push(player);
				}
			});
			// 	(player) =>
			// 		player.cards.filter(
			// 			(card) => card.value === $RoundStore[$GameStore.round].right[rightColumnIdx].value
			// 		).length
			// );
			console.log('playersWithCard', playersWithCard);
			// TODO: if player has card, flip it down
		}

		if (!allLeftColumnShown && round5Mode === 'left') {
			console.log(
				leftColumnIdx,
				$RoundStore[$GameStore.round].left,
				$RoundStore[$GameStore.round].left[rightColumnIdx].code
			);
			$RoundStore[$GameStore.round].left[leftColumnIdx].show = true;
			leftColumnIdx++;

			const playersWithCard = $PlayerStore.filter((player) =>
				player.cards.find(
					(card) => card.code === $RoundStore[$GameStore.round].left[leftColumnIdx].code
				)
			);
			console.log('playersWithCard', playersWithCard);
		}

		// TODO: add logic checking with players hand
	};

	const nextPlayer = () => {
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
		console.log('option', option);
		console.log('$GameStore.currentPlayer', $GameStore.currentPlayer);
		console.log('$GameStore.round', $GameStore.round);
		console.log('$PlayerStore', $PlayerStore);

		// reveal card
		drawnCard = await drawCard(($DeckStore as INewDeck).deck_id);
		console.log('drawnCard', drawnCard);
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

		// check when round 5 begins
		// all players have 4 cards in hand
		// last player of round 4
		let round5start = $PlayerStore.every((player) => player.cards.length === 4);
		let lastPlayer = $PlayerStore[$PlayerStore.length - 1];
		let lastPlayerCheck =
			$GameStore.round === 4 && lastPlayer.name === $GameStore.currentPlayer.name;
		if (round5start && lastPlayerCheck) {
			// TODO: add button to proceed to next round
			await setupCardColumns();
		}
	};
</script>

<div
	class="h-full bg-white rounded-lg border 
    border-gray-200 shadow-md dark:bg-gray-800
    dark:border-gray-700 z-10 flex flex-col"
>
	<div class="p-4 text-center text-2xl text-gray-900 dark:text-white">
		<h1>
			It's <span class="font-bold text-amber-400">{$GameStore.currentPlayer.name}</span> turn.
		</h1>
	</div>

	{#if !showColumns}
		{#if revealed}
			<div class="ml-auto mr-auto w-32 h-32">
				<img src={drawnCard.cards[0].image} alt={drawnCard.cards[0].value} />
			</div>
		{:else}
			<div class="ml-auto mr-auto w-32 h-32">
				<img src="../static/card.png" alt="card-back" />
			</div>
		{/if}

		{#if !revealed}
			<div class="ml-auto mr-auto mt-20 text-center text-2xl text-gray-900 dark:text-white">
				<!-- {#if $RoundStore[$GameStore.round]} -->
				{#each $RoundStore[$GameStore.round].options as option, idx (idx)}
					<!-- TODO: modularize buttons -->
					<button
						type="button"
						on:click={handleOptionSelection(option)}
						class={assignOptionStyle(option)}
					>
						{option}
					</button>
				{/each}
				<!-- {/if} -->
			</div>
		{:else}
			<div class="ml-auto mr-auto mt-20 text-center text-2xl text-gray-900 dark:text-white">
				<button
					on:click={nextPlayer}
					type="button"
					class="text-white bg-amber-500 hover:bg-amber-400
			focus:ring-4 focus:ring-amber-300 font-medium rounded-lg 
			text-sm px-5 py-2.5 text-center mb-2 dark:bg-fuchsia-500 
			dark:hover:bg-fuchsia-400 dark:focus:ring-fuchsia-600"
				>
					Next Player</button
				>
			</div>
		{/if}

		{#if revealed}
			<div class="p-4 text-center text-2xl text-gray-900 dark:text-white">
				{#if correctness}
					<h1><span class="text-green-500">Correct!</span>{checkMsg}</h1>
				{:else}
					<h1><span class="text-rose-500">Wrong!</span>{checkMsg}</h1>
				{/if}
			</div>
		{/if}
	{:else if $RoundStore[$GameStore.round].left.length && $RoundStore[$GameStore.round].right.length}
		<div class="grid grid-cols-2">
			<div class="flex flex-col ml-8">
				{#each $RoundStore[$GameStore.round].left as leftCard, idx (idx)}
					{#if leftCard.show}
						<div class="ml-auto mr-auto w-24 h-24">
							<img src={leftCard.image} alt={leftCard.value} />
						</div>
					{:else}
						<div class="ml-auto mr-auto w-24 h-24">
							<img src="../static/card.png" alt="card-back" />
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
							<img src="../static/card.png" alt="card-back" />
						</div>
					{/if}
				{/each}
			</div>
		</div>

		<div class="ml-auto mr-auto mt-16">
			<button
				on:click={showCard}
				type="button"
				class="text-white bg-amber-500 hover:bg-amber-400
			focus:ring-4 focus:ring-amber-300 font-medium rounded-lg 
			text-sm px-5 py-2.5 text-center mb-2 dark:bg-fuchsia-500 
			dark:hover:bg-fuchsia-400 dark:focus:ring-fuchsia-600"
			>
				Show Card</button
			>
		</div>
	{/if}
</div>
