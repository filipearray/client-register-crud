const tempClient = {
    nome: "Filipe",
    email: "filipeguimaraes@gmail.com",
    celular: "990297113",
    cidade: "Santa City"
};

const getLocalStorage = () => JSON.parse(localStorage.getItem("db_client")) ?? [];
const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient));

// CREATE
const createClient = (client) => {
    const dbClient = getLocalStorage();
    dbClient.push(client);
    setLocalStorage(dbClient);
};

// READ
const readClient = () => getLocalStorage(); 

// UPDATE
const updateClient = (index, client) => {
    const dbClientUpdated = readClient();
    dbClientUpdated[index] = client;
    setLocalStorage(dbClientUpdated);
};

// DELETE
const deleteClient = (index) => {
    const dbClientDeleted = readClient();
    dbClientDeleted.splice(index, 1);
    setLocalStorage(dbClientDeleted);
};

// Layout interaction

const saveButton = document.getElementById("saveBtn");

const isValidFields = () => {

    const form = document.getElementById("idForm");

    return form.reportValidity();
}

const clearFields = () => {

    const fields = document.querySelectorAll(".modalField");

    fields.forEach(field => field.value = "")

} // Essa é a função que proporciona a feature. Ela também foi colocada no modal.js, veja o comentário de lá.

const saveClient = () => {

    if(isValidFields()){
        const fieldCreatedClient = {
            name: document.getElementById("clientName").value,
            email: document.getElementById("clientEmail").value,
            phone: document.getElementById("clientPhoneNumber").value,
            city: document.getElementById("clientCity").value
        };
        createClient(fieldCreatedClient);

        // Feature pra limpar campos após o cadastro:

        closeModal();
    }
};

saveButton.addEventListener("click", saveClient)