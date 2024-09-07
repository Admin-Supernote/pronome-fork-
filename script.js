// Simula i dati di login
const users = {
    "ACESARONI": "Qd8jHkORoI",
    "ABECAGLI": "spJ5wDlEYI",
    "AGAGLIARDI": "fhyUecUi4l",
    "PMICELI": "ulSlH2rmai",
    "LCAFARO": "sP9QigXTXh",
    "JBALZARETTI": "fe433faWMh",
    "LWDV": "UbmfDZQYLi",
    "DSYLLA": "L1thy2Fkkv",
    "LNEJI": "S8ad83Z8qg",
    "DSPAZZIANI": "FB8MVe4ket",
    "GGOLEBWESKI": "dOiTMQ4MWl",
    "TVOLPINI": "C9J9MjM6K7",
    "GPOMPEI": "BpAExnTu66",
    "SGIOVAGNOLI": "DO32iBZUeV",
    "VBOSIO": "ldlnT0mQh9"
};

// Funzione di login
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (users[username] === password) {
        // Se login corretto, salva l'utente loggato in localStorage
        localStorage.setItem('loggedInUser', username);
        // Vai alla dashboard
        window.location.href = 'dashboard.html';
    } else {
        alert('Username o password errati');
    }
}

// Funzione per mostrare i compiti
function renderTasks() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const tasks = JSON.parse(localStorage.getItem('tasks') || '{}');
    const userTasks = JSON.parse(localStorage.getItem(`${loggedInUser}_tasks`) || '{}'); // Compiti dell'utente loggato
    const taskContainer = document.getElementById('task-container');
    taskContainer.innerHTML = '';

    Object.keys(tasks).forEach(day => {
        const dayTasks = tasks[day];
        dayTasks.forEach((task, index) => {
            const taskDiv = document.createElement('div');
            taskDiv.style.backgroundColor = task.color;
            
            // Controlla se il compito è stato segnato come completato dall'utente corrente
            const isCompleted = userTasks[day]?.[index] || false;
            taskDiv.innerHTML = `${task.subject}: ${task.text} <input type="checkbox" ${isCompleted ? 'checked' : ''} onclick="toggleTask('${day}', ${index})">`;

            taskContainer.appendChild(taskDiv);
        });
    });
}

// Funzione per segnare o desegnare un compito come fatto
function toggleTask(day, index) {
    const loggedInUser = localStorage.getItem('loggedInUser');
    let userTasks = JSON.parse(localStorage.getItem(`${loggedInUser}_tasks`) || '{}');

    // Se l'utente non ha compiti per quel giorno, inizializza un array vuoto
    userTasks[day] = userTasks[day] || [];
    
    // Inverte lo stato del compito (fatto/non fatto)
    userTasks[day][index] = !userTasks[day][index];
    
    // Salva i compiti aggiornati solo per l'utente corrente
    localStorage.setItem(`${loggedInUser}_tasks`, JSON.stringify(userTasks));

    // Rende di nuovo i compiti
    renderTasks();
}

function addTask() {
    const subject = document.getElementById('subject').value;
    const text = document.getElementById('text').value;
    const color = document.getElementById('colorPicker').value;
    const day = document.getElementById('day').value;

    let tasks = JSON.parse(localStorage.getItem('tasks') || '{}');
    tasks[day] = tasks[day] || [];
    tasks[day].push({ subject, text, color });
    localStorage.setItem('tasks', JSON.stringify(tasks));

    renderTasks();
}

function deleteTask(day, index) {
    let tasks = JSON.parse(localStorage.getItem('tasks') || '{}');
    tasks[day].splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function changeClassName() {
    const className = document.getElementById('class-name-input').value;
    localStorage.setItem('className', className);
    document.getElementById('class-name').innerText = className;
}

function changeLanguage() {
    const language = document.getElementById('language').value;
    localStorage.setItem('language', language);
    alert('Lingua cambiata a: ' + language);
}

function changeBackgroundColor() {
    const color = document.getElementById('bg-color').value;
    document.body.style.backgroundColor = color;
}

function uploadImage() {
    alert('Funzione di upload immagine non implementata');
}

// Controlla se l'utente è loggato quando la pagina viene caricata
window.onload = function() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const currentPage = window.location.pathname.split('/').pop(); // Ottiene la pagina corrente

    // Controlla solo se l'utente NON è loggato e si trova su una pagina diversa dalla login
    if (!loggedInUser && currentPage !== 'index.html') {
        window.location.href = 'index.html';
        return;
    }

    // Imposta il nome della classe nella dashboard
    const className = localStorage.getItem('className') || 'Classe';
    if (document.getElementById('class-name')) {
        document.getElementById('class-name').innerText = className;
    }

    // Mostra il pulsante admin solo se l'utente è admin
    if (loggedInUser === 'ACESARONI' || loggedInUser === 'ABECAGLI') {
        if (document.getElementById('adminBtn')) {
            document.getElementById('adminBtn').style.display = 'block';
        }
    }

    // Mostra i compiti se siamo nella dashboard
    if (currentPage === 'dashboard.html') {
        renderTasks();
    }
}
