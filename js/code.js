const toastTrigger = document.getElementById("AdicionarCarrinhoBtn");
const toastLiveExample = document.getElementById("liveToast");

if (toastTrigger) {
	const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
	toastTrigger.addEventListener("click", () => {
		toastBootstrap.show();
	});
}
