<script>
	import { onMount } from 'svelte';

	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';

	let dark = true;

	const toggleMode = (e) => {
		const darkMode = e.detail;
		window.document.body.classList.toggle('bg-zinc-700', darkMode);
	};

	onMount(() => {
		window.document.body.classList.toggle('bg-zinc-700', dark);
	});

	// TODO: optimize layout to be mobile friendly
</script>

<svelte:head>
	<title>Smoke or Fire App</title>
</svelte:head>

<div class:dark class="font-sans">
	<Header />
	<slot />
	<Footer bind:dark on:toggle-mode={toggleMode} />
</div>

<style>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	:global(body) {
		background-color: #f2eee2;
	}
</style>
