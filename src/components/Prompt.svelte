<script lang="ts">
	import GameStore from '../store/gameStore';
	import RoundStore from '../store/roundStore';
	import PlayerStore from '../store/playerStore';
	import DeckStore from '../store/deckStore';

	import type { IAddToPile } from '../types/deck_api/addedToPile';
	import type { ICardDrew } from '../types/deck_api/cardDrew';
	import type { INewDeck } from '../types/deck_api/newDeck';

	let revealed = false;
	let drawnCard: ICardDrew;
	let correctness = null;
	let checkMsg = '';

	const cardMap = {
		A: 1,
		2: 2,
		3: 3,
		4: 4,
		5: 5,
		6: 6,
		7: 7,
		8: 8,
		9: 9,
		0: 10,
		J: 11,
		Q: 12,
		K: 13
	};

	// TODO: add reveal logic

	$: {
		console.log('revealed', revealed);
	}

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

	const checkRound1 = (option) => {
		const smokeCards = ['CLUBS', 'SPADES'];
		const fireCards = ['HEARTS', 'DIAMONDS'];

		if (
			(option == 'Smoke' && smokeCards.includes(drawnCard.cards[0].suit)) ||
			(option == 'Fire' && fireCards.includes(drawnCard.cards[0].suit))
		) {
			correctness = true;
			const verb = $RoundStore[$GameStore.round].punishment.right;
			const amount = $RoundStore[$GameStore.round].punishment.amount;
			checkMsg = `Correct! ${verb} ${amount}`;
		} else {
			correctness = false;
			const verb = $RoundStore[$GameStore.round].punishment.wrong;
			const amount = $RoundStore[$GameStore.round].punishment.amount;
			checkMsg = `Wrong! ${verb} ${amount}`;
		}
	};

	const checkRound2 = (option) => {
		const firstCard = $GameStore.currentPlayer.cards[0];
		const secondCard = $GameStore.currentPlayer.cards[1];

		const first = firstCard.code.split('');
		const second = secondCard.code.split('');

		if (
			(option === 'Low' && cardMap[first[0]] >= cardMap[second[0]]) ||
			(option === 'High' && cardMap[first[0]] < cardMap[second[0]])
		) {
			const verb = $RoundStore[$GameStore.round].punishment.right;
			const amount = $RoundStore[$GameStore.round].punishment.amount;
			checkMsg = `Correct! ${verb} ${amount}`;
		} else {
			const verb = $RoundStore[$GameStore.round].punishment.wrong;
			const amount = $RoundStore[$GameStore.round].punishment.amount;
			checkMsg = `Wrong! ${verb} ${amount}`;
		}
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

	{#if revealed}
		<div class="ml-auto mr-auto w-32 h-32">
			<!-- <img src="https://deckofcardsapi.com/static/img/AS.png" alt="" /> -->

			<img src={drawnCard.cards[0].image} alt={drawnCard.cards[0].value} />
		</div>
	{:else}
		<div class="ml-auto mr-auto w-32 h-32">
			<img src="../src/shared/assets/card.png" alt="" />
		</div>
	{/if}

	{#if !revealed}
		<div class="ml-auto mr-auto mt-20 text-center text-2xl text-gray-900 dark:text-white">
			{#each $RoundStore[$GameStore.round].options as option, idx (idx)}
				<button
					type="button"
					on:click={handleOptionSelection(option)}
					class={assignOptionStyle(option)}
				>
					{option}
				</button>
			{/each}
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
			<h1>{checkMsg}</h1>
		</div>
	{/if}
</div>
