<!-- Todo item component -->

<script lang="ts">
  import type { Todo } from '$lib/types';
  import { todoStore } from '$lib/store/todos';

  export let todo: Todo;

  let isEditing = false;

  let updatedText = todo.text;
  let updatedDescription = todo.description;

  const toggleComplete = () => {
    todoStore.toggleComplete(todo.id);
  };

  const deleteTodo = () => {
    todoStore.deleteTodo(todo.id);
  };

  const updateTodo = async () => {
    await todoStore.updateTodo(todo.id, {
      text: updatedText,
      description: updatedDescription,
    });
    isEditing = false;
  };
</script>

<div class="p-4 bg-gray-100 bg-opacity-70 rounded-md shadow-sm flex flex-col space-y-2">
  <div class="flex items-center justify-between">
    {#if !isEditing}
      <h2 class="text-xl font-semibold {todo.completed ? 'line-through text-gray-500' : ''}">
        {todo.text}
      </h2>
    {:else}
      <input
        type="text"
        bind:value={updatedText}
        class="flex-grow p-1 border rounded"
      />
    {/if}
    <div class="flex items-center gap-4">
      <input 
        type="checkbox" 
        checked={todo.completed} 
        on:change={toggleComplete}
        class="w-5 h-5 ml-4"
      />
      {#if !isEditing}
        <button on:click={() => isEditing = true} class="text-blue-500 hover:text-blue-700">
          Update
        </button>
        <button on:click={deleteTodo} class="text-red-500 hover:text-red-700">
          Delete
        </button>
      {:else}
        <button on:click={updateTodo} class="text-green-500 hover:text-green-700">
          Save
        </button>
        <button on:click={() => isEditing = false} class="text-gray-500 hover:text-gray-700">
          Cancel
        </button>
      {/if}
    </div>
  </div>
  {#if !isEditing && todo.description}
    <p class="text-gray-700">{todo.description}</p>
  {:else if isEditing}
    <textarea
      bind:value={updatedDescription}
      class="p-1 border rounded"
      rows="3"
      placeholder="Description"
    ></textarea>
  {/if}
  <p class="text-sm text-gray-500">
    {new Date(todo.createdAt).toLocaleString()}
  </p>
</div>