<script type="text/javascript">
	import menubar from './_menubar_action';

	import MenuItem from './MenuItem.svelte';

	const menu = [
		{
			title: 'About',
			href: '/about',
			popup: [
				{
					title: 'Overview',
					href: '/overview'
				},
				{
					title: 'Administration',
					href: '/Adminitration'
				},
				{
					title: 'Facts',
					href: '/facts',
					popup: [
						{
							title: 'History',
							href: '/history'
						},
						{
							title: 'Current Statistics',
							href: '/current_statistics'
						},
						{
							title: 'Awards',
							href: '/awards'
						}
					]
				},
				{
					title: 'Campus Tours',
					href: '/tours',
					popup: [
						{
							title: 'For prospective students',
							href: '/tours#students'
						},
						{
							title: 'For alumni',
							href: '/tours#alumni'
						},
						{
							title: 'For visitors',
							href: '/tours#visitors'
						}
					]
				}
			]
		},
		{
			title: 'Admissions',
			href: '/admissions',
			popup: [
				{
					title: 'Apply',
					href: '/apply'
				},
				{
					title: 'Tuition',
					href: 'Tuition',
					popup: [
						{
							title: 'Undergraduate',
							href: '/tuition#undergraduate'
						},
						{
							title: 'Graduate',
							href: '/tuition@graduate'
						},
						{
							title: 'Professional Schools',
							href: '/tuition#professional'
						}
					]
				},
				{
					title: 'Sign Up',
					href: '/signup'
				},
				{
					title: 'Visit',
					href: '/visit'
				},
				{
					title: 'Photo Tour',
					href: '/photo_tour'
				},
				{
					title: 'Connect',
					href: '/connect'
				}
			]
		},
		{
			title: 'Academics',
			href: '/academics',
			popup: [
				{
					title: 'Colleges & Schools',
					href: '/colleges'
				},
				{
					title: 'Programs of Study',
					href: '/programs'
				},
				{
					title: 'Online Courses',
					href: '/online'
				},
				{
					title: 'Separator',
					href: '---'
				},
				{
					title: 'Course Explorer',
					href: '/explorer'
				},
				{
					title: 'Register for Class',
					href: '/register'
				},
				{
					title: 'Transcripts',
					href: '/transcripts'
				}
			]
		},
		{ title: 'Test', href: '/teste' }
	];
</script>

<nav aria-label="Main Menu">
	<ul id="menubar1" role="menubar" use:menubar>
		<MenuItem {menu} />
	</ul>
</nav>

<style>
	ul[role='menubar'] {
		margin: 10px;
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
	}

	ul[role='menubar'] :global(a[role='menuitem']) {
		text-decoration: none;
		color: black;
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
