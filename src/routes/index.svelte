<script context="module">
	// TODO: add deck api and sync with store

	// /** @type {import('@sveltejs/kit').Load} */
	// export async function load({ params, fetch, session, stuff }) {
	// 	const url = `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`;
	// 	const res = await fetch(url);

	// 	if (res.ok) {
	// 		return {
	// 			props: {
	// 				deck: await res.json()
	// 			}
	// 		};
	// 	}

	// 	return {
	// 		status: res.status,
	// 		error: new Error(`Could not load ${url}`)
	// 	};
	// }
</script>

<script>
	import { goto } from '$app/navigation';

	export let deck;

	console.log('deck', deck);
</script>

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
