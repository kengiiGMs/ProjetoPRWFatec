// Animação da Tela

const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

function error(tipo) {
  if (tipo == "geral") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Erro ao tentar cadastrar a sua conta!",
    });
  } else if (tipo == "senha") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "As senhas não são iguais!",
    });
  } else if (tipo == "usuario") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Esse email já está cadastrado!",
    });
  } else if (tipo == "semUsuario") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Nenhum Perfil foi cadastrado!",
    });
  } else if (tipo == "semUsuarioSenha") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Insira a sua Senha e o seu Email nos campos corretos!",
    });
  } else if (tipo == "emailSenhaInvalidos") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Email ou Senha Inválidos!",
    });
  }
}

function sucess(tipo) {
  if (tipo == "contaCadastrada") {
    Swal.fire({
      icon: "success",
      title: "Conta Cadastrada com Sucesso",
      showConfirmButton: false,
      timer: 1500,
    });
  } else if (tipo == "contaLogada") {
    Swal.fire({
      icon: "success",
      title: "Logando...",
      showConfirmButton: false,
      timer: 1500,
    });
  }
}

function getLocal(item) {
  let elementos = JSON.parse(localStorage.getItem(item));
  if (elementos != null) {
    return elementos;
  } else {
    return "";
  }
}

function logar() {
  let emailLogar = document.querySelector("#emailLogar").value;
  let senhaLogar = document.querySelector("#senhaLogar").value;
  let usuarioExisteLogar = false;
  if (emailLogar != "" && senhaLogar != "") {
    let usuarioLogar = getLocal("usuario");
    if (usuarioLogar == "") {
      error("semUsuario");
    } else {
      for (let i = 0; usuarioLogar.length > i; i++) {
        if (emailLogar == usuarioLogar[i].email && senhaLogar == usuarioLogar[i].senha) {
          usuarioExisteLogar = true;
          break;
        }
      }
      if (usuarioExisteLogar == true) {
        sucess("contaLogada");
        sessionStorage.setItem("sessionConta", true);
        setTimeout(function () {
          window.location.href = "../index.html";
        }, 2000);
      } else {
        error("emailSenhaInvalidos");
      }
    }
  } else {
    error("semUsuarioSenha");
  }
}

function criarConta() {
  let nome = document.querySelector("#nomeCriar").value;
  let email = document.querySelector("#emailCriar").value;
  let senha = document.querySelector("#senhaCriar").value;
  let confirmaSenha = document.querySelector("#confirmaSenhaCriar").value;
  let usuarioExiste = false;
  if (nome != "" && senha != "") {
    if (senha == confirmaSenha) {
      let usuarios = getLocal("usuario");
      if (usuarios == "") {
        let criarUsuario = [
          {
            id: 0,
            nome: nome,
            email: email,
            senha: senha,
            logado: false,
          },
        ];
        let converter = JSON.stringify(criarUsuario);
        localStorage.setItem("usuario", converter);
        sucess("contaCadastrada");
      } else {
        for (let i = 0; usuarios.length > i; i++) {
          if (email == usuarios[i].email) {
            usuarioExiste = true;
            break;
          }
        }
        if (usuarioExiste == false) {
          let tamanhoLista = usuarios.length;
          let id = 0;
          if (usuarios[tamanhoLista - 1] == null) {
            id = usuarios[tamanhoLista - 2].id;
          } else {
            id = usuarios[tamanhoLista - 1].id;
          }

          let novoUsuario = {
            id: id + 1,
            nome: nome,
            email: email,
            senha: senha,
            logado: false,
          };
          usuarios.push(novoUsuario);
          localStorage.setItem("usuario", JSON.stringify(usuarios));
          sucess("contaCadastrada");
        } else {
          error("usuario");
        }
      }
    } else {
      error("senha");
    }
  } else {
    error("geral");
  }
}
