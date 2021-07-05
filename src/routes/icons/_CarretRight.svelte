<script>
	import { scaleLength } from '$lib/helpers';

	export let width = '32px';
	export let height = '32px';
	export let color = 'currentColor';

	let aspectRatio = 1;

	if ($$props.width && !$$props.height) height = scaleLength(width, 1 / aspectRatio);
	if ($$props.height && !$$props.width) width = scaleLength(height, aspectRatio);
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	{width}
	{height}
	fill={color}
	{...$$restProps}
	role="img"
	viewBox="0 0 32 32"
	aria-labelledby="title"
	><title id="title">icon caret-right</title><path
		d="M12.25 2.594l-.719.687l-3.594 3.625l-.687.688l.688.718L15.625 16l-7.688 7.688l-.687.718l.688.688l3.593 3.625l.719.687l.719-.687l12-12l.687-.719l-.687-.719l-12-12zm0 2.844L22.813 16L12.25 26.563l-2.188-2.188l7.688-7.656l.719-.719l-.719-.719l-7.688-7.656z"
	/></svg
>
