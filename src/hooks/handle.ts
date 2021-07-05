import type { BaseBody, ReadOnlyFormData } from '@sveltejs/kit/types/helper';
import type { ServerRequest, ServerResponse } from '@sveltejs/kit/types/hooks';

type Body = BaseBody | string | ReadOnlyFormData;
type HandleInput = {
	request: ServerRequest<Locals, Body>;
	resolve: (request: ServerRequest<Locals>) => ServerResponse | Promise<ServerResponse>;
};

export default async function ({ request, resolve }: HandleInput): Promise<ServerResponse> {
	let response = await resolve(request);

	if (response.status !== 200 && request.headers.referer.includes(request.path)) {
		request.method = 'GET';

		// Transfer POST body to QUERY
		for (const entry of request.body) {
			request.query.append(entry[0], entry[1]);
		}

		// Load error message. TODO: Specific to this case?
		request.query.append('error', response.body.toString());

		// ReResolve
		response = await resolve(request);
	}

	return response;
}
