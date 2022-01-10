<!-- <script context="module">
    TODO: add deck api and sync with store
    
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

<script>
	export let deck;

	console.log('deck', deck);
</script> -->

<div class="flex justify-center m-2">
	<h1>game body</h1>
</div>
