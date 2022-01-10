<script>
	import { goto } from '$app/navigation';
</script>

<div class="flex justify-center m-4">
	<h1 class="text-gray-900 dark:text-white text-5xl" on:click={() => goto('/')}>
		<span class="text-slate-400">Smoke</span> or <span class="text-amber-400">Fire</span>?
	</h1>
</div>
