/**
 * scaleLength will take a valid CSS length and ratio to scale
 */
export function scaleLength(length: string, ratio = 1): string {
	const result = (length + '').trim().match(/^([\d.]+)([a-z]*)$/);

	if (!result)
		throw new TypeError('Invalid length, must be a number followed by a unit without spaces.');

	const [num, unit] = result.splice(1, 2);

	return `${+num * ratio}${unit || 'px'}`;
}
