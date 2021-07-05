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
	><title id="title">icon caret-down</title><path
		d="M6.906 6.594l-.718.687l-3.907 3.907l-.687.718L16 26.312l14.406-14.406l-.687-.719l-3.907-3.906l-.718-.687L16 15.687zm-.031 2.843l8.406 8.376l.719.687l.719-.688l8.406-8.375l2.438 2.438L16 23.469L4.437 11.875z"
	/></svg
>
