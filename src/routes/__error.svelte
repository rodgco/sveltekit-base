<script context="module" lang="ts">
	import type { ErrorLoadInput, LoadOutput } from '@sveltejs/kit';

	interface Props {
		title: string;
	}

	export function load({ error, status }: ErrorLoadInput): LoadOutput<Props> {
		return {
			props: {
				title: `${status}: ${error.message}`
			}
		};
	}
</script>

<script>
	export let title;
</script>

<h1>{title}</h1>
