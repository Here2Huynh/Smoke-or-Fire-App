<script context="module">
	// TODO: add deck api and sync with store

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

	import PlayerStore from '../store/playerStore.js';

	import type { IAddToPile } from '../types/deck_api/addedToPile';
	import type { ICardDrew } from '../types/deck_api/cardDrew';
	import type { INewDeck } from '../types/deck_api/newDeck';
	import type { IPlayer } from '../types/player.js';

	export let deck: INewDeck;
	const { deck_id } = deck;

	onMount(async () => {
		if ($PlayerStore.length && deck_id) {
			$PlayerStore.forEach(async (player: IPlayer) => {
				const card = await drawCard(deck_id);
				console.log('card', card);

				const playerHand = await addToPile(
					deck_id,
					player.name,
					card.cards.map((card) => card.code).join()
				);
				console.log('playerHand', playerHand.piles);

				const pileCards = await listCardsInPile(deck_id, player.name);
				console.log('pileCards', pileCards);
			});
		}
	});

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

	const listCardsInPile = async (deck_id: string, pile_name: string) => {
		const url = `https://deckofcardsapi.com/api/deck/${deck_id}/pile/${pile_name}/list/`;

		const res = await fetch(url);

		if (res.ok) {
			return await res.json();
		}
	};

	console.log('deck', deck);
</script>

{#if $PlayerStore.length && deck}
	<div>game body</div>
{:else}
	<div class="flex justify-center mt-60">
		<button
			on:click={() => goto('/setup')}
			type="button"
			class="text-white bg-amber-600 hover:bg-amber-500
        focus:ring-4 focus:ring-amber-300 font-medium rounded-lg 
        text-sm px-5 py-2.5 text-center mb-2 dark:bg-amber-400 
        dark:hover:bg-amber-700 dark:focus:ring-amber-900">Setup Game</button
		>
	</div>
{/if}
