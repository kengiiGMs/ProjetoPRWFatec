function alerta() {
	const toastLiveExample = document.getElementById("liveToast");
	const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
	toastBootstrap.show();
}

function getLocal(item) {
	let itens = JSON.parse(localStorage.getItem(item));
	if (itens != null) {
		return itens;
	} else {
		return "";
	}
}

function addCarrinho() {
	event.preventDefault();
	let sucessoCor = false;
	let sucessoTamanho = false;
	let tamanhoSelecionado = "";
	let corSelecionada = "";
	let cores = document.getElementsByName("cores");
	for (var radio of cores) {
		if (radio.checked) {
			corSelecionada = radio.value;
			sucessoCor = true;
		}
	}
	let tamanho = document.getElementsByName("tamanhos");
	for (var radio of tamanho) {
		if (radio.checked) {
			tamanhoSelecionado = radio.value;
			sucessoTamanho = true;
		}
	}

	if (sucessoCor == true && sucessoTamanho == true) {
		alerta();
		verificar = getLocal("carrinho");

		if (verificar == "") {
			let listaCarrinho = [
				{ id: 0, cor: corSelecionada, tamanho: tamanhoSelecionado },
			];
			let converter = JSON.stringify(listaCarrinho);
			localStorage.setItem("carrinho", converter);
			alert("Carringo Cadastrado com sucesso");
		} else {
			let itens = JSON.parse(localStorage.getItem("carrinho"));
			let tamanhoLista = itens.length;
			let id = itens[tamanhoLista - 1].id;
			let novosItens = {
				id: id + 1,
				cor: corSelecionada,
				tamanho: tamanhoSelecionado,
			};
			itens.push(novosItens);
			localStorage.setItem("carrinho", JSON.stringify(itens));
		}
	}
}
