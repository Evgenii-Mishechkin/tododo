<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/store/auth';
	import type { AuthState } from '$lib/store/auth';
	import type { Unsubscriber } from 'svelte/store';
	import type { User } from 'firebase/auth';

	let user: User | null = null;
	let loading: boolean = true;
	let unsubscribeAuth: Unsubscriber | null = null;

	onMount(() => {
		unsubscribeAuth = authStore.subscribe(({ user: authUser, loading: authLoading }: AuthState) => {
			user = authUser;
			loading = authLoading;
			// If loading is complete and the user is already authenticated, redirect to the todo list
			if (!loading && user) {
				goto('/todo-list');
			}
		});
	});

	onDestroy(() => {
		if (unsubscribeAuth) unsubscribeAuth();
	});

	let email = '';
	let password = '';
</script>

<svelte:head>
	<title>Register | ToDoDo</title>
</svelte:head>

<div class="mt-6 flex items-center justify-center">
	<!-- Registration Card -->
	<div class="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
		<h1 class="mb-6 text-center text-3xl font-bold text-blue-600">Register</h1>

		<div class="mb-4">
			<label for="email" class="mb-2 block text-gray-700">Email</label>
			<input
				id="email"
				type="email"
				bind:value={email}
				placeholder="Enter your email"
				class="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
		</div>

		<div class="mb-6">
			<label for="password" class="mb-2 block text-gray-700">Password</label>
			<input
				id="password"
				type="password"
				bind:value={password}
				placeholder="Enter your password"
				class="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
		</div>

		<div class="flex flex-col space-y-4">
			<button
				on:click={() => authStore.signUp(email, password)}
				class="w-full rounded-md bg-green-500 py-2 text-white transition hover:bg-green-600"
			>
				Register
			</button>
			<!-- Button to go to the login page -->
			<button
				on:click={() => goto('/login')}
				class="w-full rounded-md bg-blue-500 py-2 text-white transition hover:bg-blue-600"
			>
				Already have an account? Login
			</button>
			<!-- Button to register with Google -->
			<button
				on:click={authStore.loginWithGoogle}
				class="w-full rounded-md bg-red-500 py-2 text-white transition hover:bg-red-600"
			>
				Register with Google
			</button>
		</div>
	</div>
</div>
