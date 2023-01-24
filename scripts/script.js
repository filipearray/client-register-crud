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
        updateTable(); // Um updateTable foi colocado aqui também. Pra evitar bugs, sempre vamos atualizar a tabela ao criarmos um cliente.
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

const clearTable = () => {
    const rows = document.querySelectorAll("#tableClient > tbody tr")
    rows.forEach(row => row.parentElement.removeChild(row))
} 

const updateTable = () => { // Essa func tem que ler os dados do local storage e preencher no painel. Mas temos um problema, toda vez que dermos updateTable(), ele vai criar as mesmas rows várias vezes, e isso não pode acontecer. O que já está na tabela vai acabar se repetindo e isso não pode acontecer, então o que vai acontecer é o seguinte, vamos criar uma função chamada: clearTable(), assim sempre quando nós atualizarmos a tabela, ele vai limpar antes de atualizar.
    const dbClientTableToUpdate = readClient();

    clearTable();

    dbClientTableToUpdate.forEach(createRow)
}

updateTable();