<!-- Login page -->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/store/auth';

	// Automatically subscribe to authStore.
	// $authStore holds the current authentication state: { user, loading }.
	// If loading is finished and the user is authenticated, redirect to '/todo-list'.
	$: if (!$authStore.loading && $authStore.user) {
		goto('/todo-list');
	}

	// Local state for email and password fields.
	let email = '';
	let password = '';
</script>

<svelte:head>
	<title>Login Page | ToDoDo</title>
</svelte:head>

<div class="mt-6 flex items-center justify-center">
	<!-- Login card -->
	<div class="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
		<h1 class="mb-6 text-center text-3xl font-bold text-blue-600">Login</h1>

		<div class="mb-4">
			<!-- Email input field -->
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
			<!-- Password input field -->
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
			<!-- Login button: triggers the login method with provided email and password -->
			<button
				on:click={() => authStore.login(email, password)}
				class="w-full rounded-md bg-blue-500 py-2 text-white transition hover:bg-blue-600"
			>
				Login
			</button>

			<!-- Navigate to the registration page -->
			<button
				on:click={() => goto('/sign-up')}
				class="w-full rounded-md bg-green-500 py-2 text-white transition hover:bg-green-600"
			>
				Register
			</button>

			<!-- Login with Google button -->
			<button
				on:click={authStore.loginWithGoogle}
				class="w-full rounded-md bg-red-500 py-2 text-white transition hover:bg-red-600"
			>
				Login with Google
			</button>
		</div>
	</div>
</div>
