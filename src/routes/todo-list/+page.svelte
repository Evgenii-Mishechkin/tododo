<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { todoStore } from '$lib/store/todos';
  import TodoItem from '$lib/components/TodoItem.svelte';
  import { authStore } from '$lib/store/auth';
  import { goto } from '$app/navigation';
  import type { Unsubscriber } from 'svelte/store';

  let newTodo = '';
  let newDescription = '';
  let showNewTask = false;
  let authUnsub: Unsubscriber | null = null;

  onMount(() => {
    authUnsub = authStore.subscribe(({ user, loading }) => {
      if (!loading) {
        if (user) {
          todoStore.fetchTodos();
        } else {
          goto('/login');
        }
      }
    });
  });

  onDestroy(() => {
    if (authUnsub) authUnsub();
  });

  const addTodo = async () => {
    if (newTodo.trim()) {
      await todoStore.addTodo(newTodo, newDescription);
      newTodo = '';
      newDescription = '';
      showNewTask = false;
    }
  };

  const toggleNewTask = () => {
    showNewTask = !showNewTask;
  };
</script>
<div class="min-h-screen bg-gradient-to-r from-white to-blue-300">
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4 flex items-center justify-between">
      ToDoDo List
      <button
        on:click={toggleNewTask}
        class="bg-blue-500 text-white p-2 rounded-md w-[45px] h-[45px] flex justify-center leading-[0.8] hover:bg-blue-600 transition"
      >
        {showNewTask ? '-' : '+'}
      </button>
    </h1>
  
    {#if showNewTask}
      <!-- New Task Form -->
      <div class="mb-6 p-4 bg-white rounded-md shadow-md">
        <input 
          type="text"
          bind:value={newTodo}
          placeholder="Enter your task"
          class="w-full p-2 border rounded-md mb-4"
        />
        <textarea
          bind:value={newDescription}
          placeholder="Description (optional)"
          class="w-full p-2 border rounded-md mb-4"
        ></textarea>
        <button
          on:click={addTodo}
          class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Add Task
        </button>
      </div>
    {/if}
  
    <!-- Task List -->
    <div class="grid gap-4">
      {#each $todoStore as todo (todo.id)}
        <TodoItem {todo} />
      {/each}
    </div>
  </div>
</div>
