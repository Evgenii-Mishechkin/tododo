<!-- Home.svelte -->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/store/auth';
</script>

<svelte:head>
	<title>Home Page | ToDoDo</title>
</svelte:head>

<div
	class="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-500 to-red-300 p-4"
>
	<div
		class="max-w-lg rounded-lg bg-white bg-opacity-20 p-8 text-center shadow-lg backdrop-blur-md"
	>
		<h1 class="mb-4 text-4xl font-bold text-white drop-shadow-lg">Welcome to ToDoDo</h1>

		{#if $authStore.loading}
			<p class="mb-6 text-lg text-white drop-shadow-md">Загрузка...</p>
		{:else if $authStore.user}
			<p class="mb-6 text-lg text-white drop-shadow-md">
				Hello, {$authStore.user.displayName || $authStore.user.email}! Welcome to ToDoDo.
			</p>
			<button
				on:click={() => goto('/todo-list')}
				class="inline-block rounded bg-white px-6 py-3 font-semibold text-blue-600 transition hover:bg-blue-100"
			>
				Go to ToDoDo List
			</button>
		{:else}
			<p class="mb-6 text-lg text-white drop-shadow-md">
				Please log in or register to start using the application.
			</p>
			<div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
				<button
					on:click={() => goto('/login')}
					class="rounded-md bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
				>
					Log in
				</button>
				<button
					on:click={() => goto('/login')}
					class="rounded-md bg-green-500 px-4 py-2 text-white transition hover:bg-green-600"
				>
					Register
				</button>
			</div>
		{/if}
	</div>
</div>
