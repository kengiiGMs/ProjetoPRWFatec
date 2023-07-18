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
	for (let radio of cores) {
		if (radio.checked) {
			corSelecionada = radio.value;
			sucessoCor = true;
		}
	}
	let tamanho = document.getElementsByName("tamanhos");
	for (let radio of tamanho) {
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
				{
					id: 0,
					cor: corSelecionada,
					tamanho: tamanhoSelecionado,
					nome: "Camiseta Básica",
					img: "/assets/camisa1.png",
					preco: 89,
				},
			];
			let converter = JSON.stringify(listaCarrinho);
			localStorage.setItem("carrinho", converter);
		} else {
			let itens = JSON.parse(localStorage.getItem("carrinho"));
			let tamanhoLista = itens.length;
			let id = 0;
			if (itens[tamanhoLista - 1] == null) {
				id = itens[tamanhoLista - 2].id;
			} else {
				id = itens[tamanhoLista - 1].id;
			}

			let novosItens = {
				id: id + 1,
				cor: corSelecionada,
				tamanho: tamanhoSelecionado,
				nome: "Camiseta Básica",
				img: "/assets/camisa1.png",
				preco: 89,
			};
			itens.push(novosItens);
			localStorage.setItem("carrinho", JSON.stringify(itens));
		}
	}
}

function deleteItem(id, item) {
	let idColetado = id;
	let itens = JSON.parse(localStorage.getItem(item));
	localStorage.removeItem(item);

	for (let i = 0; itens.length > i; i++) {
		if (verificar[i] != null) {
			if (idColetado == itens[i].id) {
				delete itens[i];
				break;
			}
		}
	}
	let estaVazio = itens.every(function (elemento) {
		return elemento === null;
	});
	if (estaVazio) {
		localStorage.removeItem("carrinho");
	} else {
		localStorage.setItem("carrinho", JSON.stringify(itens));
	}

	abrirCarrinho();
}


