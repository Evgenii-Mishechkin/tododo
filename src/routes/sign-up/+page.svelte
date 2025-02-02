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

<div class="flex items-center justify-center mt-6">
  <!-- Registration Card -->
  <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
    <h1 class="text-3xl font-bold text-center text-blue-600 mb-6">Register</h1>
    
    <div class="mb-4">
      <label for="email" class="block text-gray-700 mb-2">Email</label>
      <input
        id="email"
        type="email"
        bind:value={email}
        placeholder="Enter your email"
        class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div class="mb-6">
      <label for="password" class="block text-gray-700 mb-2">Password</label>
      <input
        id="password"
        type="password"
        bind:value={password}
        placeholder="Enter your password"
        class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div class="flex flex-col space-y-4">
      <button
        on:click={() => authStore.signUp(email, password)}
        class="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md transition"
      >
        Register
      </button>
      <!-- Button to go to the login page -->
      <button
        on:click={() => goto('/login')}
        class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition"
      >
        Already have an account? Login
      </button>
      <!-- Button to register with Google -->
      <button
        on:click={authStore.loginWithGoogle}
        class="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md transition"
      >
        Register with Google
      </button>
    </div>
  </div>
</div>
