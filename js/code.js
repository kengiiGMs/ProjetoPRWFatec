function alerta() {
	const toastLiveExample = document.getElementById("liveToast");
	const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
	toastBootstrap.show();
}

function addCarrinho() {
	event.preventDefault();
	let sucessoCor = false;
	let sucessoTamanho = false;
	let cores = document.getElementsByName("cores");
	for (var radio of cores) {
		if (radio.checked) {
			sucessoCor = true;
		}
	}
	let tamanho = document.getElementsByName("tamanhos");
	for (var radio of tamanho) {
		if (radio.checked) {
			sucessoTamanho = true;
		}
	}

	if (sucessoCor == true && sucessoTamanho == true) {
		alerta();
	}
}
