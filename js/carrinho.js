function getLocal(item) {
	let itens = JSON.parse(localStorage.getItem(item));
	if (itens != null) {
		return itens;
	} else {
		return "";
	}
}

function abrirCarrinho() {
	let divDados = document.getElementById("conteudoCarrinho");
	verificar = getLocal("carrinho");
	let valorTotal = 0;
	if (verificar == "") {
		divDados.innerHTML = "<h4>Você não possui nenhum item em seu carrinho</h4>";
	} else {
		divDados.innerHTML = "";
		for (let i = 0; verificar.length > i; i++) {
			if (verificar[i] != null) {
				let itemElement = document.createElement("p");
				let imgElement = document.createElement("img");
				let buttonDeleteElement = document.createElement("button");
				let hrElement = document.createElement("hr");

				buttonDeleteElement.value = verificar[i].id;
				buttonDeleteElement.className = "btn btn-outline-danger";
				buttonDeleteElement.textContent = "Excluir Item";
				buttonDeleteElement.type = "button";
				buttonDeleteElement.addEventListener("click", function () {
					deleteItem(this.value, "carrinho");
				});
				buttonDeleteElement.style.display = "block";
				buttonDeleteElement.style.margin = "auto";

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

				valorTotal = valorTotal + verificar[i].preco;

				divDados.appendChild(imgElement);
				divDados.appendChild(itemElement);
				divDados.appendChild(buttonDeleteElement);
				divDados.appendChild(hrElement);
			}
		}
		let priceElement = document.createElement("p");

		priceElement.textContent = "R$: " + valorTotal;
		priceElement.style.textAlign = "center";

		let buttonPay = document.createElement("button");
		buttonPay.className = "btn btn-outline-success";
		buttonPay.textContent = "Finalizar Compra";
		buttonPay.type = "button";
		buttonPay.addEventListener("click", function () {
			window.location.href = "../pagamento/pagamento.html";
		});
		buttonPay.style.display = "block";
		buttonPay.style.margin = "auto";
		divDados.appendChild(priceElement);
		divDados.appendChild(buttonPay);
	}
}