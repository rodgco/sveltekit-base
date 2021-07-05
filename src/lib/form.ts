// this action (https://svelte.dev/tutorial/actions) allows us to
// progressively enhance a <form> that already works without JS
interface EnhanceForm {
	before?: (data: FormData, form: HTMLFormElement) => void;
	error?: (data: FormData, error: Error, form: HTMLFormElement) => void;
	result: (res: Response, form: HTMLFormElement) => void;
}

export function enhance(
	form: HTMLFormElement,
	{ before, error, result }: EnhanceForm
): ActionReturn {
	async function handle_submit(e: Event) {
		e.preventDefault();

		const body = new FormData(form);

		// Called BEFORE fetching, usually for immediate feeback. Any ERROR must handle the reverse
		if (before) before(body, form);

		try {
			const res = await fetch(form.action, {
				method: form.method,
				headers: {
					accept: 'application/json'
				},
				body
			});

			if (res.ok) {
				result(res, form);
			} else if (error) {
				const e = new Error(`${res.status} - ${res.statusText}`);
				error(body, e, form);
			} else {
				console.error(await res.text());
			}
		} catch (e) {
			if (error) {
				error(body, e, form);
			} else {
				throw e;
			}
		}
	}

	form.addEventListener('submit', handle_submit);

	return {
		destroy() {
			form.removeEventListener('submit', handle_submit);
		}
	};
}
