<script>
	import { onMount } from 'svelte';

	import Footer from '../components/Footer.svelte';

	let dark = true;

	const toggleMode = () => {
		window.document.body.classList.toggle('bg-zinc-700');
	};

	onMount(() => {
		if (dark) toggleMode();
	});
</script>

<svelte:head>
	<title>Smoke or Fire App</title>
</svelte:head>

<div class:dark>
	<slot />
	<Footer bind:dark on:toggle-mode={toggleMode} />
</div>

<style>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
