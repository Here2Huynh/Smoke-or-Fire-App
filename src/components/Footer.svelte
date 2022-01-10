<script>
	// TODO: add rules page
	// TODO: add set up page, form with all options and such
	// TODO: research card api => https://deckofcardsapi.com/

	// NOTE: SVGs powered by heroicons.dev

	import { goto } from '$app/navigation';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let dark;

	const handleModeToggle = () => {
		dark = !dark;

		dispatch('toggle-mode', dark);
	};
</script>

<nav class="flex justify-center absolute inset-x-0 bottom-0 m-4">
	<div class="inline-flex rounded-md shadow-sm" role="group">
		<button
			on:click={() => goto('/rules')}
			type="button"
			class="inline-flex items-center py-2 px-4 text-sm font-medium 
                text-gray-900 bg-transparent rounded-l-lg border border-gray-900 
                hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 
                focus:ring-gray-500 focus:bg-gray-900 focus:text-white 
                dark:border-white dark:text-white dark:hover:text-white 
                dark:hover:bg-gray-700 dark:focus:bg-gray-700"
		>
			<svg
				class="w-6 h-6 mr-2"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width={2}
					d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/></svg
			>
			Rules
		</button>

		<button
			type="button"
			class="inline-flex items-center py-2 px-4 text-sm font-medium 
                text-gray-900 bg-transparent rounded-r-md border border-gray-900 
                hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 
                focus:ring-gray-500 focus:bg-gray-900 focus:text-white 
                dark:border-white dark:text-white dark:hover:text-white 
                dark:hover:bg-gray-700 dark:focus:bg-gray-700"
		>
			<svg
				class="w-6 h-6 mr-2"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width={2}
					d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 
                        2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
				/></svg
			>
			Setup
		</button>

		<div class="absolute top-0 right-0 mt-1">
			<button type="button" on:click={handleModeToggle} class="p-2">
				{#if dark}
					<svg
						class="w-6 h-6 dark:stroke-white"
						fill="none"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width={2}
							d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 
                        0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
						/></svg
					>
				{:else}
					<svg
						class="w-6 h-6 stroke-gray-900"
						fill="none"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width={2}
							d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
						/></svg
					>
				{/if}
			</button>
		</div>
	</div>
</nav>
