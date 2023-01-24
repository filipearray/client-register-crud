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
}

const saveClient = () => {
    if(isValidFields()){
        const fieldCreatedClient = {
            name: document.getElementById("clientName").value,
            email: document.getElementById("clientEmail").value,
            phone: document.getElementById("clientPhoneNumber").value,
            city: document.getElementById("clientCity").value
        };
        createClient(fieldCreatedClient);
        closeModal();
    }
};

saveButton.addEventListener("click", saveClient)

const createRow = (client) => {
    const newRow = document.createElement("tr");

    newRow.innerHTML = `
        <td>${client.name}</td>
        <td>${client.email}</td>
        <td>${client.phone}</td>
        <td>${client.city}</td>
        <td>
                        <button type="button" class="editBtn">edit</button>
                        <button type="button" class="deleteBtn">delete</button>
        </td>
    `
    document.querySelector("#tableClient > tbody").appendChild(newRow);
// appendChild cria um filho no HTML.
}

const updateTable = () => { // Essa func tem que ler os dados do local storage e preencher no painel.
    const dbClientTableToUpdate = readClient();

    dbClientTableToUpdate.forEach(createRow)
}

updateTable();