/* Todos.ts */
import { writable, get } from 'svelte/store';
import { db } from './firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { authStore } from './auth';

import type { Todo } from '$lib/types';

const createTodoStore = () => {
	const { subscribe, set, update } = writable<Todo[]>([]);

	return {
		subscribe,

		async fetchTodos() {
			const auth = authStore.getUser();
			if (!auth) return;

			const querySnapshot = await getDocs(collection(db, 'users', auth.uid, 'todos'));
			const todos = querySnapshot.docs.map((docSnap) => {
				const data = docSnap.data();
				return {
					id: docSnap.id,
					text: data.text,
					description: data.description,
					completed: data.completed,
					createdAt:
						data.createdAt && data.createdAt.toDate ? data.createdAt.toDate() : data.createdAt,
					order: data.order
				} as Todo;
			});

			// Sort tasks by order before setting the store
			todos.sort((a, b) => a.order - b.order);
			set(todos);
		},

		async addTodo(text: string, description: string) {
			const auth = authStore.getUser();
			if (!auth) return;

			// Retrieve current todos from the store to compute the new order.
			const currentTodos = get({ subscribe });
			const newOrder = currentTodos.length; // Append new task at the end

			const newTodo = {
				text,
				description: description ?? '',
				completed: false,
				createdAt: new Date(),
				order: newOrder
			};

			// Use the "todos" collection consistently
			const docRef = await addDoc(collection(db, 'users', auth.uid, 'todos'), newTodo);

			update((todos) => [...todos, { id: docRef.id, ...newTodo }]);
		},

		async toggleComplete(id: string) {
			const auth = authStore.getUser();
			if (!auth) return;

			update((todos) => {
				const updatedTodos = todos.map((todo) =>
					todo.id === id ? { ...todo, completed: !todo.completed } : todo
				);

				const todo = updatedTodos.find((todo) => todo.id === id);
				if (todo) {
					// Use the "todos" collection consistently
					updateDoc(doc(db, 'users', auth.uid, 'todos', id), { completed: todo.completed });
				}
				return updatedTodos;
			});
		},

		async deleteTodo(id: string) {
			const auth = authStore.getUser();
			if (!auth) return;

			await deleteDoc(doc(db, 'users', auth.uid, 'todos', id));
			update((todos) => todos.filter((todo) => todo.id !== id));
		},

		async updateTodo(id: string, data: { text: string; description: string }) {
			const auth = authStore.getUser();
			if (!auth) return;

			await updateDoc(doc(db, 'users', auth.uid, 'todos', id), data);
			update((todos) => todos.map((todo) => (todo.id === id ? { ...todo, ...data } : todo)));
		},

		// Method to update the order of tasks (e.g. after drag-and-drop)
		async updateOrder(newTodos: Todo[]) {
			const auth = authStore.getUser();
			if (!auth) return;

			// Persist the new order in Firestore for each task
			for (const todo of newTodos) {
				await updateDoc(doc(db, 'users', auth.uid, 'todos', todo.id), { order: todo.order });
			}
			set(newTodos);
		}
	};
};

export const todoStore = createTodoStore();
