const registerNewClient = document.getElementById("registerNewClient");
const modalClose = document.getElementById("modalClose");

const openModal = () => document.getElementById("modal").classList.add("active");
const closeModal = () => {
    clearFields(); // Esse clearFields foi colocado aqui também para sempre quando fecharmos o modal, os campos serem limpos, INDEPENDENTEMENTE se os dados foram salvos ou não, agora sempre que você fechar, os campos serão limpos.
    document.getElementById("modal").classList.remove("active");
}

registerNewClient.addEventListener("click", openModal);
modalClose.addEventListener("click", closeModal);