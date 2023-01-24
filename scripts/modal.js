const registerNewClient = document.getElementById("registerNewClient");
const modalClose = document.getElementById("modalClose");

const openModal = () => document.getElementById("modal").classList.add("active");
const closeModal = () => {
    clearFields();
    document.getElementById("modal").classList.remove("active");
}

registerNewClient.addEventListener("click", openModal);
modalClose.addEventListener("click", closeModal);