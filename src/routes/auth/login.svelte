<script context="module" lang="ts">
	import type { LoadInput, LoadOutput } from '@sveltejs/kit';

	interface Props {
		error?: string;
		email?: string;
	}

	export async function load({ page }: LoadInput): Promise<LoadOutput<Props>> {
		return {
			props: {
				error: page.query.get('error'),
				email: page.query.get('email')
			}
		};
	}
</script>

<script lang="ts">
	import { enhance } from '$lib/form';

	export let email = '';
	export let error = null;

	let password = '';
</script>

{#if error}
	<div class="error">{error}</div>
{/if}

<form
	method="POST"
	action="/auth/login"
	use:enhance={{
		async result(res, form) {
			console.log('Result:', await res.json());
		},
		error(_, e) {
			password = '';
			error = e.message;
		}
	}}
>
	<input type="email" name="email" bind:value={email} />
	<input type="password" name="password" bind:value={password} />
	<button>Submit</button>
</form>

<style>
	.error {
		display: block;
		padding: 0.5em 1em;
		background-color: #ffdddd;
		border: 1px solid red;
		color: red;
		margin-bottom: 1em;
	}
</style>
