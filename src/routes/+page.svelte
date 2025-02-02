<!-- Home page -->
<script lang="ts">
  import { goto } from '$app/navigation';
  import { authStore } from '$lib/store/auth';
  import type { AuthState } from '$lib/store/auth';
  import type {User} from 'firebase/auth';

  
  let user: User | null = null;
  let loading = true;

  const unsubscribe = authStore.subscribe(({ user: authUser, loading: authLoading }: AuthState) => {
    user = authUser;
    loading = authLoading;
  });
</script>

<svelte:head>
  <title>Home Page | ToDoDo</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-red-300 p-4">
  <div class="bg-white bg-opacity-20 backdrop-blur-md rounded-lg shadow-lg p-8 max-w-lg text-center">
    <h1 class="text-4xl font-bold mb-4 text-white drop-shadow-lg">
      Welcome to ToDoDo
    </h1>

    {#if loading}
      <p class="text-lg mb-6 text-white drop-shadow-md">Загрузка...</p>
    {:else}
      {#if user}
        <p class="text-lg mb-6 text-white drop-shadow-md">
          Hello, {user.displayName || user.email}! Welcome to ToDoDo.
        </p>
        <button
          on:click={() => goto('/todo-list')}
          class="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded hover:bg-blue-100 transition"
        >
          Go to ToDoDo List
        </button>
      {:else}
        <p class="text-lg mb-6 text-white drop-shadow-md">
          Please log in or register to start using the application.        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            on:click={() => goto('/login')}
            class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Log in
          </button>
          <button
            on:click={() => goto('/login')}
            class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
          >
            Register
          </button>
        </div>
      {/if}
    {/if}
  </div>
</div>

