<script>
	import { Menu } from '$lib/Widgets';
</script>

<header>
	<h1>Base Svelte</h1>
	<Menu />
</header>

<main>
	<slot />
</main>

<footer class="text--sm">&copy;Rodrigo Couto - 2021</footer>

<style>
	:global(:root) {
		/* main colors */
		--color-primary: #123456;
		--color-primary-light: color-mod(var(--color-primary) tint(15%));
		--color-primary-dark: color-mod(var(--color-primary) shade(15%));
		--color-primary-bg: #12345633;

		--color-accent: #f5414f;
		--color-accent-light: color-mod(var(--color-accent) tint(15%));
		--color-accent-dark: color-mod(var(--color-accent) shade(10%));
		--color-accent-bg: color-mod(var(--color-accent) alpha(20%));

		/* shades - generated using chroma.js - 12 steps */
		--black: #0d0d11;
		--gray-10: #2e2e31;
		--gray-6: #7b7a7d;
		--gray-4: #a5a5a6;
		--gray-3: #bbbbbc;
		--gray-2: #d1d0d2;
		--gray-1: #e8e7e8;
		--white: white;

		/* feedback */
		--color-success: #88c459;
		--color-error: #f5414f;
		--color-warning: #ffd137;

		/* typography */
		--color-text: var(--gray-10);
		--color-text-heading: var(--black);
		--color-text-subtitle: var(--gray-6);
		--color-link: var(--color-primary);
		--color-link-visited: var(--color-primary-dark);
		--color-mark: var(--color-accent-bg);
		--color-blockquote-border: var(--gray-2);

		/* border */
		--color-border: var(--gray-2);

		/* body */
		--color-body: var(--white);

		/* forms */
		--form-element-border: var(--color-border);
		--form-element-border-focus: var(--color-primary);
		--form-element-border-error: var(--color-error);
		--form-element-bg: var(--white);
		--form-text-placeholder: var(--gray-4);

		/* buttons */
		--btn-primary-bg: var(--color-primary);
		--btn-primary-hover: var(--color-primary-light);
		--btn-primary-active: var(--color-primary-dark);
		--btn-primary-label: var(--white);

		/* icons */
		--color-icon-primary: var(--gray-4);
		--color-icon-secondary: inherit;

		/* spacing values */
		--space-unit: 1em;
		--space-xxxs: calc(0.25 * var(--space-unit));
		--space-xxs: calc(0.375 * var(--space-unit));
		--space-xs: calc(0.5 * var(--space-unit));
		--space-sm: calc(0.75 * var(--space-unit));
		--space-md: calc(1.25 * var(--space-unit));
		--space-lg: calc(2 * var(--space-unit));
		--space-xl: calc(3.25 * var(--space-unit));
		--space-xxl: calc(5.25 * var(--space-unit));
		--space-xxxl: calc(8.5 * var(--space-unit));

		/* fixed values - not affected by --space-unit or --text-base-size */
		--space-unit-fixed: 1rem;
		--space-xxs-fixed: calc(0.25 * var(--space-unit-fixed));
		--space-xs-fixed: calc(0.5 * var(--space-unit-fixed));
		--space-sm-fixed: calc(0.75 * var(--space-unit-fixed));
		--space-md-fixed: calc(1.25 * var(--space-unit-fixed));
		--space-lg-fixed: calc(2 * var(--space-unit-fixed));
		--space-xl-fixed: calc(3.25 * var(--space-unit-fixed));
		--space-xxl-fixed: calc(5.25 * var(--space-unit-fixed));

		--font-primary: sans-serif;
		--font-secondary: serif;

		/* set base values */
		--text-base-size: 1em;
		--text-scale-ratio: 1.2;

		/* type scale */
		--text-xs: calc(1em / (var(--text-scale-ratio) * var(--text-scale-ratio)));
		--text-sm: calc(1em / var(--text-scale-ratio));
		--text-md: calc(1em * var(--text-scale-ratio));
		--text-lg: calc(1em * var(--text-scale-ratio) * var(--text-scale-ratio));
		--text-xl: calc(
			1em * var(--text-scale-ratio) * var(--text-scale-ratio) * var(--text-scale-ratio)
		);
		--text-xxl: calc(
			1em * var(--text-scale-ratio) * var(--text-scale-ratio) * var(--text-scale-ratio) *
				var(--text-scale-ratio)
		);
		--text-xxxl: calc(
			1em * var(--text-scale-ratio) * var(--text-scale-ratio) * var(--text-scale-ratio) *
				var(--text-scale-ratio) * var(--text-scale-ratio)
		);

		/* line-height */
		--heading-line-height: 1.2;
		--body-line-height: 1.4;
	}

	:global(html) {
		box-sizing: border-box;
	}

	:global(body) {
		font-size: var(--text-base-size);
		font-family: var(--font-primary);
		color: var(--color-text);
		min-height: 100vh;
	}

	:global(#app) {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	:global(#app > main) {
		flex-grow: 1;
	}

	:global(*),
	:global(*::before),
	:global(*::after) {
		box-sizing: inherit;
	}

	:global(*) {
		border: 0 none;
		outline: 0;
		padding: 0;
		margin: 0;
	}

	:global(h1),
	:global(h2),
	:global(h3),
	:global(h4),
	:global(form legend) {
		color: var(--color-text-heading);
		margin-bottom: var(--space-xxs);
		line-height: var(--heading-line-height);
	}

	:global(.text--xxxl) {
		font-size: var(--text-xxxl);
	}

	:global(h1),
	:global(.text--xxl) {
		font-size: var(--text-xxl);
	}

	:global(h2),
	:global(.text--xl) {
		font-size: var(--text-xl);
	}

	:global(h3),
	:global(.text--lg) {
		font-size: var(--text-lg);
	}

	:global(h4),
	:global(.text--md) {
		font-size: var(--text-md);
	}

	:global(.text--sm),
	:global(small) {
		font-size: var(--text-sm);
	}

	:global(.text--xs) {
		font-size: var(--text-xs);
	}

	:global(p) {
		line-height: var(--body-line-height);
		color: var(--color-text);
	}

	:global(a) {
		color: var(--color-link);
	}

	:global(a:visited) {
		color: var(--color-link-visited);
	}

	:global(b),
	:global(strong) {
		font-weight: bold;
	}

	:global(.truncate) {
		/* truncate text if it exceeds parent */
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	header {
		display: flex;
	}

	footer {
		text-align: center;
		background-color: var(--color-primary-bg);
		padding: 1rem;
	}
</style>
