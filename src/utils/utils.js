export function isValidURL(str) {
	try {
		const url = new URL(str);
        return url.protocol === "https:";
	} catch (_) {
		return false;
	}
}
