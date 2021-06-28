<script>
	import { Menu } from '$lib/widgets';
</script>

<header>
	<h1>rodg&centerdot;co</h1>
	<Menu />
</header>

<main>
	<slot />
</main>

<footer class="text--sm">&copy;Rodrigo Couto - 2021</footer>

<style>
	header {
		display: flex;
	}

	footer {
		text-align: center;
		background-color: var(--color-primary-bg);
		padding: 1rem;
	}
</style>
