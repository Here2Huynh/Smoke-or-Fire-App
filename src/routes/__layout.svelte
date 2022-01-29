<script>
	import { onMount } from 'svelte';

	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';

	import ConfigStore from '../store/configStore';

	import '../styles/global.css';

	let dark = $ConfigStore.darkMode;

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
	<header>
		<Header />
	</header>

	<slot />

	<footer>
		<Footer bind:dark on:toggle-mode={toggleMode} />
	</footer>
</div>

<style>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
