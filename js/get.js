export function getLocal(item) {
	let itens = JSON.parse(localStorage.getItem(item));
	if (itens != null) {
		return itens;
	} else {
		return "";
	}
}