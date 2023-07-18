import { getLocal } from '../get.js';
import {abrirCarrinho} from '../carrinho.js'

function alerta() {
	const toastLiveExample = document.getElementById("liveToast");
	const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
	toastBootstrap.show();
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
		let verificar = getLocal("carrinho");

		if (verificar == "") {
			let listaCarrinho = [
				{
					id: 0,
					cor: corSelecionada,
					tamanho: tamanhoSelecionado,
					nome: "Camiseta Básica",
					img: "/assets/produtos/camisetaBasica/camisa1.png",
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
				img: "/assets/produtos/camisetaBasica/camisa1.png",
				preco: 89,
			};
			itens.push(novosItens);
			localStorage.setItem("carrinho", JSON.stringify(itens));
		}
	}
}

export function deleteItem(id, item) {
	let idColetado = id;
	let itens = JSON.parse(localStorage.getItem(item));
	let verificar = getLocal("carrinho");
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


let addButton = document.getElementById("AdicionarCarrinhoBtn");

if (addButton) {
	addButton.addEventListener("click", function(event) {
	  addCarrinho();
	});
  }

