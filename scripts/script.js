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
        updateTable();
        closeModal();
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
    ` // Veja que acima colocamos data-action
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
}

const editClient = (index) => {
    const editedClient = readClient()[index];

    fillFields(editedClient);

    openModal();
}

const editDelete = (event) => {
        if(event.target.type == "button"){
            const [action, index] = event.target.id.split("-") // Pesquise sobre o split e ficará fácil de entendê-lo. O - é o por causa do edit-index e do delete-index.

            if (action == "edit"){
                editClient(index)
            } else {
                // deleteClient(index)
            }
        }
    // O target.type pega o tipo do que está sendo clicado, então quando clicarmos nos botões, ele vai retornar type="button"; (button)
    // Agora precisamos diferenciar o botão de editar e de deletar, para fazer isso vamos criar um atributo personalizado, esse atributos são passíveis de captura no JS. Colocando no elemento "data-(o nome do atributo)"
    // dataset é a prop pra pegar essas classes
    // Outra forma mais fácil de fazer isso é usando apenas um id, e vamos fazer isso.
    // Agora de quem é esse edit, ou esse delete? Colocando um param index.
}

document.querySelector("#tableClient > tbody")
    .addEventListener("click", editDelete);

updateTable();