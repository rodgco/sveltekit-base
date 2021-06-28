<script>
	import './_styles.svelte';

	import { Menu } from '$lib/widgets';
</script>

<header>
	<h1>rodg&centerdot;co</h1>
	<Menu />
</header>

<main>
	<slot />
</main>

<footer class="text--sm">&copy; Rodrigo Couto - 2021</footer>

<style>
	header {
		display: flex;
		background-color: var(--color-primary-bg);
		color: white;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 2rem 1rem 2rem;
	}

	main {
		padding: 1rem 2rem 1rem 2rem;
		background-color: var(--gray-1);
	}

	footer {
		text-align: center;
		background-color: #12345699;
		color: white;
		padding: 1rem;
	}
</style>
