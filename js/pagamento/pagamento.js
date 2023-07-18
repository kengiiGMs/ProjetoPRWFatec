(() => {
	"use strict";
	const forms = document.querySelectorAll(".needs-validation");

	// Loop over them and prevent submission
	Array.from(forms).forEach((form) => {
		form.addEventListener(
			"submit",
			(event) => {
				if (!form.checkValidity()) {
					event.preventDefault();
					event.stopPropagation();
				}

				form.classList.add("was-validated");
			},
			false
		);
	});
})();

function getLocal(item) {
	let itens = JSON.parse(localStorage.getItem(item));
	if (itens != null) {
		return itens;
	} else {
		return "";
	}
}

let carrinho = getLocal("carrinho");
let tamanhoDocarrinho = 0;
for (let i = 0; carrinho.length > i; i++) {
	if (carrinho[i] != null) {
		tamanhoDocarrinho++;
	}
}

let quantidadeDeProdutosElement = document.getElementById(
	"quantidadeDeProdutos"
);
quantidadeDeProdutosElement.textContent = tamanhoDocarrinho;

let valorTotal = 0;

for (let i = 0; carrinho.length > i; i++) {
	if (carrinho[i] != null) {
		const liElement = document.createElement("li");
		const divElement = document.createElement("div");

		const h6Element = document.createElement("h6");
		const spanElement = document.createElement("span");
		const smallElement = document.createElement("small");

		liElement.className = "list-group-item d-flex justify-content-between lh-sm";
		h6Element.className = "my-0";
		spanElement.className = "text-body-secondary";
		smallElement.className = "text-body-secondary";
		h6Element.textContent = carrinho[i].nome;
		smallElement.textContent =
			"Tamanho: " + carrinho[i].tamanho + " - Cor: " + carrinho[i].cor;
		spanElement.textContent = "R$ " + carrinho[i].preco;
		valorTotal = valorTotal + carrinho[i].preco;
		divElement.appendChild(h6Element);
		divElement.appendChild(smallElement);

		liElement.appendChild(divElement);
		liElement.appendChild(spanElement);

		const ulElement = document.getElementById("listaProdutos");
		ulElement.appendChild(liElement);
	}
}

const totalElement = document.createElement("li");
const tituloElement = document.createElement("span");
const valorElement = document.createElement("strong");
const ulElement = document.getElementById("listaProdutos");
totalElement.className = "list-group-item d-flex justify-content-between";

tituloElement.textContent = "Total";
valorElement.textContent = "R$: " + valorTotal;
totalElement.appendChild(tituloElement);
totalElement.appendChild(valorElement);
ulElement.appendChild(totalElement);
