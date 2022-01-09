<script>
	import Navbar from '../components/Navbar.svelte';
</script>

<svelte:head>
	<title>Smoke or Fire App</title>
</svelte:head>

<div>
	<Navbar />
	<slot />
</div>

<style>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
