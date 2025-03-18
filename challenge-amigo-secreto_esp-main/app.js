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



function generateLink() {
    if (participants.length < 2) {
        document.getElementById('error').textContent = "Se necesitan al menos dos participantes.";
        return;
    }

    document.getElementById('setup').style.display = 'none';
    document.getElementById('results').style.display = 'block';

    const encryptedData = getData()

    const resultLink = `${location.origin}${location.pathname}?data=${encodeURIComponent(encryptedData)}`;
    document.getElementById('resultLink').innerHTML = `<a href="${resultLink}" target="_blank">El enlace está listo. Da click aquí o selecciona la opción que desees.</a>`;
}

function getData() {
    const shuffled = [...participants];
    let assignments = {};
    
    do {
        shuffled.sort(() => Math.random() - 0.5);
    } while (!isValidAssignment(shuffled));

    assignments = participants.reduce((acc, curr, idx) => {
        acc[curr.name.toLowerCase()] = shuffled[idx].name.toLowerCase();
        return acc;
    }, {});

    return encryptData(assignments);
}

function encryptData(data) {
    const jsonData = JSON.stringify(data);
    return btoa(jsonData); 
}

function isValidAssignment(shuffled) {
    return shuffled.every((p, idx) => p.name !== participants[idx].name) && new Set(shuffled.map(p => p.name)).size === participants.length;
}

function copyLink() {
    const link = getTextLink();
    if (link) {
        navigator.clipboard.writeText(link).then(() => {
            alert('Enlace copiado al portapapeles.');
        }).catch(err => {
            alert('Error al copiar el enlace.');
        });
    }
}

function shareWhatsApp() {
    const link = getTextLink();
    if (link) {
        const message = `Aquí tienes tu enlace para ver tu amigo secreto: ${link}`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/?text=${encodedMessage}`;
        window.open(whatsappURL, '_blank');
    }
}

function getTextLink() {
    return document.getElementById('resultLink').firstElementChild.href;
}
/* Get secret */

function decryptData(encryptedData) {
    const decodedData = atob(encryptedData);
    return JSON.parse(decodedData);
}

function revealSecret() {
    const name = document.getElementById('participantName').value.trim().toLowerCase();
    const params = new URLSearchParams(window.location.search);
    const encryptedData = params.get('data');

    if (!name || !encryptedData) {
        document.getElementById('secretMessage').textContent = "Por favor, introduce tu nombre y asegúrate de que el enlace es correcto.";
        return;
    }

    const storedAssignments = decryptData(encryptedData);

    if (storedAssignments && storedAssignments[name]) {
        document.getElementById('secretMessage').textContent = `Tu amigo secreto es: ${storedAssignments[name]}`;
    } else {
        document.getElementById('secretMessage').textContent = "No se encontró tu amigo secreto. Verifica que el nombre sea correcto.";
    }
}

window.onload = function () {
    if (window.location.search.includes('data')) {
        document.getElementById('setup').style.display = 'none';
        document.getElementById('results').style.display = 'none';
        document.getElementById('secret').style.display = 'block';
    }
};
