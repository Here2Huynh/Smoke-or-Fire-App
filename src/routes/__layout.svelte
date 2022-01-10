<script>
	import { onMount } from 'svelte';

	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';

	let dark = true;

	const toggleMode = () => {
		window.document.body.classList.toggle('bg-zinc-700');
		window.document.body.classList.toggle('bg-stone-100');
	};

	onMount(() => {
		window.document.body.classList.toggle('bg-zinc-700', dark);
		// if (dark) toggleMode();
		// else
	});
</script>

<svelte:head>
	<title>Smoke or Fire App</title>
</svelte:head>

<div class:dark class="font-mono ">
	<Header />
	<slot />
	<Footer bind:dark on:toggle-mode={toggleMode} />
</div>

<style>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
