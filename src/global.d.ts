/* eslint-disable @typescript-eslint/no-empty-interface */
/// <reference types="@sveltejs/kit" />

interface Locals {}

interface Session {}

interface ActionReturn {
	update?: (parameters: any) => void;
	destroy?: () => void;
}
