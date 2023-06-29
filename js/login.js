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

function logar() {
  return Swal.fire("Logando no Sistema...");
}

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
  }
}

function sucess() {
  Swal.fire({
    icon: "success",
    title: "Conta Cadastrada com Sucesso",
    showConfirmButton: false,
    timer: 1500,
  });
}

function getLocal(item) {
  let elementos = JSON.parse(localStorage.getItem(item));
  if (elementos != null) {
    return elementos;
  } else {
    return "";
  }
}

function criarConta() {
  nome = document.querySelector("#nomeCriar").value;
  email = document.querySelector("#emailCriar").value;
  senha = document.querySelector("#senhaCriar").value;
  confirmaSenha = document.querySelector("#confirmaSenhaCriar").value;
  usuarioExiste = false;
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
        sucess();
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
          sucess();
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
