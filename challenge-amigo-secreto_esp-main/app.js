// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
let amigos = [];

function addParticipants() {
    const nameInput = document.getElementById('name');
    const name = nameInput.value.trim();
    const error = document.getElementById('error');

    if (!isValidName(name, error)){return;}

    participants.push({ name });
    nameInput.value = "";
    error.textContent = "";
    updateParticipantList();
}

function isValidName(name, error) {
    if (!name) {
        error.textContent = "Por favor inserte un nombre";
        return false;
    }

    if (participants.some(p => p.name === name)) {
        error.textContent = "El nombre ya está en la lista.";
        return false;
    }

    return true;
}

function checkEnter(event) {
    if (event.key === "Enter") {
        addParticipant();
    }
}

function updateParticipantList() {
    const list = document.getElementById('participantList');
    list.innerHTML = participants.map(p => `<li>${p.name}</li>`).join('');
}
