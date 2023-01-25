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

        const indexInput = document.getElementById("clientName").dataset.index

        if(indexInput == "new") {
            createClient(fieldCreatedClient);
            updateTable();
            closeModal();
        } else {
            updateClient(index, client)
            updateTable()
            closeModal()
        }
    }
};

saveButton.addEventListener("click", saveClient)

const createRow = (client, index) => {
    const newRow = document.createElement("tr");

    newRow.innerHTML = `
        <td>${client.name}</td>
        <td>${client.email}</td>
        <td>${client.phone}</td>
        <td>${client.city}</td>
        <td>
                        <button type="button" class="editBtn" id="edit-${index}">edit</button>
                        <button type="button" class="deleteBtn" id="delete-${index}">delete</button>
        </td>
    `
    document.querySelector("#tableClient > tbody").appendChild(newRow);
}

const clearTable = () => {
    const rows = document.querySelectorAll("#tableClient > tbody tr")
    rows.forEach(row => row.parentElement.removeChild(row))
} 

const updateTable = () => {
    const dbClientTableToUpdate = readClient();

    clearTable();

    dbClientTableToUpdate.forEach(createRow);
}

const fillFields = (client) => {
    document.getElementById("clientName").value = client.name;
    document.getElementById("clientEmail").value = client.email;
    document.getElementById("clientPhoneNumber").value = client.phone;
    document.getElementById("clientCity").value = client.city;
    document.getElementById("clientName").dataset.index = client.index;
}

const editClient = (index) => {
    const editedClient = readClient()[index];

    editedClient.index = index;

    fillFields(editedClient);

    openModal();
}

const editDelete = (event) => {
        if(event.target.type == "button"){
            const [action, index] = event.target.id.split("-")

            if (action == "edit"){
                editClient(index)
            } else {
                console.log("Deleting...")
            }
        }
}

document.querySelector("#tableClient > tbody")
    .addEventListener("click", editDelete);

updateTable();

// Ainda há um problema, quando nós salvamos um cliente no edit sem fazer nenhuma alteração, ele salva um novo cliente, o que não deveria acontecer, vamos fazer o seguinte: Criar um atributo especial no HTML.

/*

    delete client () {
        updatetable() com confirm
    }

*/