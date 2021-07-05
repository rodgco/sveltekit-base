import type { ServerRequest, ServerResponse } from '@sveltejs/kit/types/hooks';

export async function get({ params, query }: ServerRequest<Locals>): Promise<ServerResponse> {
	console.log(params['icon']);
	try {
		const component = await import(`./_${params['icon']}.svelte`);

		const { html } = component.default.render({
			width: query.get('width'),
			height: query.get('height'),
			color: query.get('color')
		});

		return {
			status: 200,
			headers: {
				'Content-Type': 'image/svg+xml'
			},
			body: html
		};
	} catch (error) {
		return {
			status: 404,
			headers: {},
			body: JSON.stringify(error.code)
		};
	}
}
