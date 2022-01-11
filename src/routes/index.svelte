<script>
	import { goto } from '$app/navigation';
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
