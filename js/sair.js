function deslogar(){
    
    Swal.fire({
        icon: "success",
        title: "Deslogado com Sucesso",
        showConfirmButton: false,
        timer: 1500,
    });

    sessionStorage.removeItem("sessionConta");

    setTimeout(function () {
        window.location.href = "../index.html";
    }, 2000);
}