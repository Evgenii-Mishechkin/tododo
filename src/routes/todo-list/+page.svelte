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
		<h1 class="mb-4 flex items-center justify-between text-3xl font-bold">
			ToDoDo List
			<button
				on:click={toggleNewTask}
				class="flex h-[45px] w-[45px] justify-center rounded-md bg-blue-500 p-2 leading-[0.8] text-white transition hover:bg-blue-600"
			>
				{showNewTask ? '-' : '+'}
			</button>
		</h1>

		{#if showNewTask}
			<!-- New Task Form -->
			<div class="mb-6 rounded-md bg-white p-4 shadow-md">
				<input
					type="text"
					bind:value={newTodo}
					placeholder="Enter your task"
					class="mb-4 w-full rounded-md border p-2"
				/>
				<textarea
					bind:value={newDescription}
					placeholder="Description (optional)"
					class="mb-4 w-full rounded-md border p-2"
				></textarea>
				<button
					on:click={addTodo}
					class="rounded-md bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
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
