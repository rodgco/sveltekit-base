<script type="text/javascript">
	import menubar from './_menubar_action';
	import MenuItem from './MenuItem.svelte';

	export let menu = [];
</script>

<nav aria-label="Main Menu">
	<ul id="menubar1" role="menubar" use:menubar>
		<MenuItem {menu} />
	</ul>
</nav>

<style>
	ul[role='menubar'] {
		margin: 0;
		padding: 10px;
		font-size: 110%;
		list-style: none;
		background-color: #eee;
	}

	ul[role='menubar'] :global([role='menuitem']),
	ul[role='menubar'] :global([role='separator']) {
		padding: 0.25em;
		background-color: #eee;
		border: 2px solid #eee;
	}

	ul[role='menubar'] :global([role='separator']) {
		padding-top: 0.15em;
		background-image: url('../images/separator.png');
		background-position: center;
		background-repeat: repeat-x;
	}

	ul[role='menubar'] :global([role='menuitem']:focus),
	ul[role='menubar'] :global([role='menuitem']:hover),
	ul[role='menubar'] :global([role='separator']:focus),
	ul[role='menubar'] :global([role='separator']:hover) {
		background-color: black;
		color: white;
		outline: none;
	}

	ul[role='menubar'] :global(a[role='menuitem']) {
		text-decoration: none;
		color: black;
	}

	ul[role='menubar'] > :global(li > [aria-expanded='true']) {
		border-bottom: 2px solid black;
	}

	ul[role='menubar'] :global([role='menu'] [aria-expanded='true']) {
		border-left: 2px solid black;
	}

	ul[role='menubar'] :global(li) {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	ul[role='menubar'] > :global(li) {
		display: inline;
		position: relative;
	}

	ul[role='menubar'] > :global(li > a[aria-haspopup='true']::after) {
		content: url('../images/down-arrow-brown.png');
		padding-left: 0.25em;
	}

	ul[role='menubar'] :global(ul[role='menu']) {
		display: none;
		position: absolute;
		top: -2px;
		left: 0;
		margin: 0;
		padding: 0;
	}

	ul[role='menubar'] :global(ul[role='menu'] li a) {
		display: block;
		width: 10em;
	}

	ul[role='menubar'] :global(ul[role='menu'] a[aria-haspopup='true']::after) {
		content: url('../images/right-arrow-brown.png');
		padding-right: 2em;
	}
</style>
