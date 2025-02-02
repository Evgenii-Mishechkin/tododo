<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	let { children } = $props();
</script>

<div class="flex min-h-screen flex-grow flex-col">
	<Header />
	<main class="mx-auto min-h-screen w-[100%]">
		{@render children()}
	</main>
	<Footer />
</div>
