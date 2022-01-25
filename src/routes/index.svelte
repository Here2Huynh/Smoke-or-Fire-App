<script context="module">
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

	import Button from '../lib/Button.svelte';

	export let deck: INewDeck;
	const { deck_id } = deck;

	const cardImgUrl = 'https://deckofcardsapi.com/static/img/5C.svg';

	// TODO: add players' play history, player can view by clicking on their box

	onMount(async () => {
		DeckStore.update((currentDeck) => {
			let copyDeck = currentDeck;

			copyDeck = deck;

			return copyDeck;
		});
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
		<Button label="Setup Game" on:click={() => goto('/setup')} />
	</div>
{/if}
