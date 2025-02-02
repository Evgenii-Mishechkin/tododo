<script lang="ts">
	import { authStore } from '$lib/store/auth';
	import { page } from '$app/stores';
	import type { User } from 'firebase/auth';

	// Automatically subscribe to the page store and get the current path
	let currentRoute = '';
	$: currentRoute = $page.url.pathname;

	// Get authentication data from authStore
	let user: User | null = null;
	$: user = $authStore.user;

	// Function to determine the active route
	const isActive = (path: string, current: string) =>
		path === current
			? 'text-blue-600 font-semibold'
			: 'text-gray-700 hover:text-blue-600 transition';

	// Variable to track the state of the burger menu
	let isMenuOpen = false;
	const toggleMenu = () => {
		isMenuOpen = !isMenuOpen;
	};
</script>

<header class="bg-white shadow-md">
	<div class="container mx-auto flex flex-wrap items-center justify-between px-6 py-4">
		<!-- Logo -->
		<a href="/" class="text-2xl font-bold text-blue-600 transition hover:text-blue-700">ToDoDo</a>
		{#if user}
			<!-- If the user is authenticated -->
			<span class="text-gray-700">Hello, {user.displayName || 'User'}!</span>
		{/if}
		<nav class="hidden md:block">
			<ul class="flex items-center gap-3">
				<li>
					<a href="/" class={isActive('/', currentRoute)}>Home</a>
				</li>
				<li>
					<a href="/todo-list" class={isActive('/todo-list', currentRoute)}>To-do List</a>
				</li>

				{#if user}
					<li>
						<button
							on:click={() => authStore.logout()}
							class="rounded-md bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
						>
							Logout
						</button>
					</li>
				{:else}
					<li>
						<a
							href="/login"
							class="rounded-md bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
						>
							Login
						</a>
					</li>
					<li>
						<a
							href="/sign-up"
							class="rounded-md bg-green-500 px-4 py-2 text-white transition hover:bg-green-600"
						>
							Register
						</a>
					</li>
				{/if}
			</ul>
		</nav>

		<!-- Burger menu for screens with width less than 768px -->
		<div class="md:hidden">
			<button on:click={toggleMenu} class="text-gray-700 focus:outline-none">
				{#if isMenuOpen}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-8 w-8"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				{:else}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-8 w-8"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				{/if}
			</button>

			{#if isMenuOpen}
				<div
					class="fixed inset-0 z-50 transform bg-white transition-transform duration-300 ease-in-out"
				>
					<div class="flex justify-end p-4">
						<button
							on:click={toggleMenu}
							class="text-gray-700 focus:outline-none"
							aria-label="Close menu"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-8 w-8"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>
					<!-- Burger menu content -->
					{#if user}
						<ul class="mt-10 flex flex-col items-center justify-center space-y-8 text-2xl">
							<li>
								<a
									href="/"
									class="block px-4 py-2 text-gray-700 hover:text-blue-600"
									on:click={toggleMenu}
								>
									Home
								</a>
							</li>
							<li>
								<a
									href="/todo-list"
									class="block px-4 py-2 text-gray-700 hover:text-blue-600"
									on:click={toggleMenu}
								>
									To-do List
								</a>
							</li>
							<li>
								<button
									on:click={() => {
										authStore.logout();
										toggleMenu();
									}}
									class="block w-full rounded-md bg-red-500 px-4 py-2 text-center text-white transition hover:bg-red-600"
								>
									Logout
								</button>
							</li>
						</ul>
					{:else}
						<ul class="mt-10 flex flex-col items-center justify-center space-y-8 text-2xl">
							<li>
								<a
									href="/"
									class="block px-4 py-2 text-gray-700 hover:text-blue-600"
									on:click={toggleMenu}
								>
									Home
								</a>
							</li>
							<li>
								<a
									href="/todo-list"
									class="block px-4 py-2 text-gray-700 hover:text-blue-600"
									on:click={toggleMenu}
								>
									To-do List
								</a>
							</li>
							<li>
								<a
									href="/login"
									class="block w-full rounded-md bg-blue-500 px-4 py-2 text-center text-white transition hover:bg-blue-600"
									on:click={toggleMenu}
								>
									Login
								</a>
							</li>
							<li>
								<a
									href="/sign-up"
									class="block w-full rounded-md bg-green-500 px-4 py-2 text-center text-white transition hover:bg-green-600"
									on:click={toggleMenu}
								>
									Register
								</a>
							</li>
						</ul>
					{/if}
				</div>
			{/if}
		</div>
	</div>
</header>
