import type { ServerRequest, ServerResponse } from "@sveltejs/kit/types/hooks";

type HandleInput = {
  request: ServerRequest<Locals>,
  resolve: (request: ServerRequest<Locals>) => ServerResponse | Promise<ServerResponse>
}

export default async function ({request, resolve}: HandleInput): Promise<ServerResponse> {
  const response = resolve(request);

  return response
}