<script lang="ts">
	import Header from '$lib/components/Header.svelte';

	let { children } = $props();
</script>

<Header />
<div class="container mx-auto py-4 text-center dark:text-neutral-100">
	hello
	{@render children()}
</div>
