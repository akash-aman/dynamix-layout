export function emitEvent (type:string, detail = {}, elem = document as Document) {

	if (!type) return;

	let event = new CustomEvent(type, {
		bubbles: true,
		cancelable: true,
		detail: detail
	});

	return elem.dispatchEvent(event);
}