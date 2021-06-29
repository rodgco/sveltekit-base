<script>
	import './_styles.svelte';
	import { Menu } from '$lib/widgets';

	const menu = [
		{
			title: 'About',
			href: '#',
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
			href: '#',
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

<header>
	<h1>rodg&centerdot;co</h1>
	<Menu {menu} />
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
