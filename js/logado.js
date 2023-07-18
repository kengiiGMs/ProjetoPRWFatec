document.addEventListener("DOMContentLoaded", function () {
  function getLocal(item) {
    let itens = JSON.parse(localStorage.getItem(item));
    if (itens != null) {
      return itens;
    } else {
      return "";
    }
  }

  function verificarLogin() {
    let dados = getLocal("usuario");
    if (dados != "") {
      let confirmarLogado = sessionStorage.getItem("sessionConta");
      
      let divLogado = document.getElementById("areaContaLogada");
      let divNaoLogado = document.getElementById("areaContaNaoLogada");
      if (confirmarLogado == "true") {
        
        divLogado.style.display = "flex";
        divNaoLogado.style.display = "none";
      } else {
        
        divLogado.style.display = "none";
        divNaoLogado.style.display = "flex";
      }
    } else {
      
      divLogado.style.display = "none";
      divNaoLogado.style.display = "flex";
    }
  }

  verificarLogin();
});
