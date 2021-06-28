<script>
	export let menu = [];
	export let first = true;

	function popupAria(flag) {
		return flag
			? {
					'aria-haspopup': true,
					'aria-expanded': false
			  }
			: {};
	}
</script>

{#each menu as item}
	{#if item.title === 'Separator'}
		<li role="separator" />
	{:else}
		<li role="none">
			<a role="menuitem" {...popupAria(item.popup)} href={item.href} tabindex={first ? 0 : -1}
				>{item.title}</a
			>
			{#if item.popup}
				<ul role="menu" aria-label="About">
					<svelte:self menu={item.popup} first="false" />
				</ul>
			{/if}
		</li>
	{/if}
{/each}
