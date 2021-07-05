import type { EndpointOutput } from '@sveltejs/kit';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';

export async function post(request: ServerRequest<Locals, FormData>): Promise<EndpointOutput> {
	const { body } = request;
	console.log('POST Request', body.get('email'), body.get('password'));
	return {
		status: 500,
		headers: {},
		body: 'Teste'
	};
}
