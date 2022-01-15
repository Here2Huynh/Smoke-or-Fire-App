<script context="module">
	// TODO: add game page, set up logic, deal players hand

	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ params, fetch, session, stuff }) {
		const url = `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`;
		const res = await fetch(url);

		if (res.ok) {
			return {
				props: {
					deck: await res.json()
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	}
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	import DeckStore from '../store/deckStore';
	import PlayerStore from '../store/playerStore';

	import GameUI from '../components/GameUI.svelte';

	import type { IAddToPile } from '../types/deck_api/addedToPile';
	import type { ICardDrew } from '../types/deck_api/cardDrew';
	import type { INewDeck } from '../types/deck_api/newDeck';

	export let deck: INewDeck;
	const { deck_id } = deck;

	const cardImgUrl = 'https://deckofcardsapi.com/static/img/5C.svg';

	onMount(async () => {
		DeckStore.update((currentDeck) => {
			let copyDeck = currentDeck;

			copyDeck = deck;

			return copyDeck;
		});

		// console.log('$DeckStore', $DeckStore);

		// if ($PlayerStore.length && deck_id) {
		// $PlayerStore.forEach(async (player: IPlayer) => {
		// 	const card = await drawCard(deck_id);
		// 	console.log('card', card);
		// 	const playerHand = await addToPile(
		// 		deck_id,
		// 		player.name,
		// 		card.cards.map((card) => card.code).join()
		// 	);
		// 	console.log('playerHand', playerHand.piles);
		// 	const pileCards = await listCardsInPile(deck_id, player.name);
		// 	console.log('pileCards', pileCards);
		// });
		// }
	});

	const listCardsInPile = async (deck_id: string, pile_name: string) => {
		const url = `https://deckofcardsapi.com/api/deck/${deck_id}/pile/${pile_name}/list/`;

		const res = await fetch(url);

		if (res.ok) {
			return await res.json();
		}
	};
</script>

{#if $PlayerStore.length && deck}
	<GameUI />
{:else}
	<div class="flex justify-center mt-60">
		<button
			on:click={() => goto('/setup')}
			type="button"
			class="text-white bg-amber-500 hover:bg-amber-400
        focus:ring-4 focus:ring-amber-300 font-medium rounded-lg 
        text-sm px-5 py-2.5 text-center mb-2 dark:bg-amber-500 
        dark:hover:bg-amber-400 dark:focus:ring-amber-600">Setup Game</button
		>
	</div>
{/if}
