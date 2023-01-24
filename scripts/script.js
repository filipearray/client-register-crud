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

// Step 1 - Vamos começar criando a feature em que nós clicamos em salvar e as informações são salvas na database. Precisamos primeiro nos certificar de que todos os campos serão salvos (Isso será verificado na func isValidFields).

// o reportValidity retorna true ou false. Verifica se as regras são seguidas, se todos os requisitos foram atendidos.
const saveButton = document.getElementById("saveBtn")

saveButton.addEventListener("click", saveClient)

const isValidFields = () => {
    const form = document.getElementById("idForm");

    return form.reportValidity();
}

const saveClient = () => {
    if(isValidFields()){
        console.log("x");
    }
};