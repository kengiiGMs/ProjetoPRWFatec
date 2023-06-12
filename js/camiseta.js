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
				{
					id: 0,
					cor: corSelecionada,
					tamanho: tamanhoSelecionado,
					nome: "Camiseta Básica",
					img: "/assets/camisa1.png",
				},
			];
			let converter = JSON.stringify(listaCarrinho);
			localStorage.setItem("carrinho", converter);
		} else {
			let itens = JSON.parse(localStorage.getItem("carrinho"));
			let tamanhoLista = itens.length;
			let id = itens[tamanhoLista - 1].id;
			let novosItens = {
				id: id + 1,
				cor: corSelecionada,
				tamanho: tamanhoSelecionado,
				nome: "Camiseta Básica",
				img: "/assets/camisa1.png",
			};
			itens.push(novosItens);
			localStorage.setItem("carrinho", JSON.stringify(itens));
		}
	}
}

function deleteItem(id, item) {
	let idColetado = id;
	var itens = JSON.parse(localStorage.getItem(item));
	localStorage.removeItem(item);

	for (let i = 0; itens.length > i; i++) {
		if (verificar[i] != null) {
			if (idColetado == itens[i].id) {
				delete itens[i];
				break;
			}
		}
	}
	var estaVazio = itens.every(function (elemento) {
		return elemento === null;
	});
	if (estaVazio) {
		localStorage.removeItem("carrinho");
	} else {
		localStorage.setItem("carrinho", JSON.stringify(itens));
	}

	abrirCarrinho();
}

function abrirCarrinho() {
	var divDados = document.getElementById("conteudoCarrinho");
	verificar = getLocal("carrinho");
	if (verificar == "") {
		divDados.innerHTML = "<h4>Você não possui nenhum item em seu carrinho</h4>";
	} else {
		divDados.innerHTML = "";
		for (let i = 0; verificar.length > i; i++) {
			if (verificar[i] != null) {
				var itemElement = document.createElement("p");
				var imgElement = document.createElement("img");
				var buttonElement = document.createElement("button");
				var hrElement = document.createElement("hr");

				buttonElement.value = verificar[i].id;
				buttonElement.className = "btn btn-outline-danger";
				buttonElement.textContent = "Excluir Item";
				buttonElement.type = "button";
				buttonElement.addEventListener("click", function () {
					deleteItem(this.value, "carrinho");
				});
				buttonElement.style.display = "block";
				buttonElement.style.margin = "auto";

				imgElement.src = verificar[i].img;
				imgElement.style.width = "10rem";
				imgElement.style.display = "flex";
				imgElement.style.margin = "auto";

				itemElement.textContent =
					verificar[i].nome +
					" - Tamanho: " +
					verificar[i].tamanho +
					" - Cor: " +
					verificar[i].cor;
				itemElement.style.textAlign = "center";

				divDados.appendChild(imgElement);
				divDados.appendChild(itemElement);
				divDados.appendChild(buttonElement);
				divDados.appendChild(hrElement);
			}
		}
	}
}
