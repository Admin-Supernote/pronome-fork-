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

// Oggetto per gestire le traduzioni e le bandiere per ogni lingua
const translations = {
    it: {
        flag: "🇮🇹",
        profileSettings: "Impostazioni Profilo",
        login: "Login",
        class: "Classe",
        monday: "Lunedì",
        tuesday: "Martedì",
        wednesday: "Mercoledì",
        thursday: "Giovedì",
        friday: "Venerdì",
        addTask: "Aggiungi Compito",
        subject: "Materia",
        taskText: "Testo Compito",
        color: "Colore",
        day: "Giorno",
        save: "Salva",
        adminDashboard: "Admin Dashboard",
        changeClassName: "Cambia Nome Classe",
        completed: "Fatto"
    },
    fr: {
        flag: "🇫🇷",
        profileSettings: "Paramètres du profil",
        login: "Connexion",
        class: "Classe",
        monday: "Lundi",
        tuesday: "Mardi",
        wednesday: "Mercredi",
        thursday: "Jeudi",
        friday: "Vendredi",
        addTask: "Ajouter Tâche",
        subject: "Sujet",
        taskText: "Texte Tâche",
        color: "Couleur",
        day: "Jour",
        save: "Enregistrer",
        adminDashboard: "Tableau de bord Admin",
        changeClassName: "Changer Nom Classe",
        completed: "Terminé"
    },
    en: {
        flag: "🇬🇧",
        profileSettings: "Profile Settings",
        login: "Login",
        class: "Class",
        monday: "Monday",
        tuesday: "Tuesday",
        wednesday: "Wednesday",
        thursday: "Thursday",
        friday: "Friday",
        addTask: "Add Task",
        subject: "Subject",
        taskText: "Task Text",
        color: "Color",
        day: "Day",
        save: "Save",
        adminDashboard: "Admin Dashboard",
        changeClassName: "Change Class Name",
        completed: "Completed"
    },
    de: {
        flag: "🇩🇪",
        profileSettings: "Profileinstellungen",
        login: "Anmeldung",
        class: "Klasse",
        monday: "Montag",
        tuesday: "Dienstag",
        wednesday: "Mittwoch",
        thursday: "Donnerstag",
        friday: "Freitag",
        addTask: "Aufgabe hinzufügen",
        subject: "Fach",
        taskText: "Aufgabentext",
        color: "Farbe",
        day: "Tag",
        save: "Speichern",
        adminDashboard: "Admin-Dashboard",
        changeClassName: "Klassenname ändern",
        completed: "Erledigt"
    },
    es: {
        flag: "🇪🇸",
        profileSettings: "Configuración de perfil",
        login: "Iniciar sesión",
        class: "Clase",
        monday: "Lunes",
        tuesday: "Martes",
        wednesday: "Miércoles",
        thursday: "Jueves",
        friday: "Viernes",
        addTask: "Añadir tarea",
        subject: "Asignatura",
        taskText: "Texto de tarea",
        color: "Color",
        day: "Día",
        save: "Guardar",
        adminDashboard: "Panel de administrador",
        changeClassName: "Cambiar nombre de clase",
        completed: "Completado"
    }
};

// Funzione per applicare la traduzione globale con la bandiera
function applyTranslations() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const language = localStorage.getItem(`${loggedInUser}_language`) || 'fr';
    const translation = translations[language];

    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        el.textContent = translation[key] + " " + translation.flag;
    });
}

// Funzione per cambiare la lingua e salvarla globalmente
function changeLanguage() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const selectedLanguage = document.getElementById('language').value;
    localStorage.setItem(`${loggedInUser}_language`, selectedLanguage);
    applyTranslations(); // Applica subito la nuova lingua
    window.location.href = 'dashboard.html'; // Ritorna alla dashboard dopo il cambio lingua
}

// Cambia lo sfondo e rendilo globale
function changeBackgroundColor() {
    const color = document.getElementById('bg-color').value;
    const loggedInUser = localStorage.getItem('loggedInUser');
    document.body.style.backgroundColor = color;
    localStorage.setItem(`${loggedInUser}_backgroundColor`, color); // Salva il colore globalmente
}

// Carica il colore dello sfondo globale
function loadGlobalSettings() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const savedColor = localStorage.getItem(`${loggedInUser}_backgroundColor`);
    const savedLanguage = localStorage.getItem(`${loggedInUser}_language`) || 'fr';

    if (savedColor) {
        document.body.style.backgroundColor = savedColor;
    }

    // Applica la lingua salvata
    applyTranslations();
}

// Ritorna alla dashboard dopo il cambio di impostazioni nella admin o profile settings
function redirectToDashboard() {
    window.location.href = 'dashboard.html';
}

// Modifica questa funzione per applicare il reindirizzamento alla dashboard dopo aver cambiato il nome della classe
function changeClassName() {
    const className = document.getElementById('class-name-input').value;
    localStorage.setItem('className', className);
    redirectToDashboard(); // Ritorna alla dashboard dopo la modifica
}

// Carica i settings globali all'apertura della pagina
window.onload = function() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const currentPage = window.location.pathname.split('/').pop();

    // Imposta il nome della classe nella dashboard
    const className = localStorage.getItem('className') || 'Classe';
    if (document.getElementById('class-name')) {
        document.getElementById('class-name').innerText = className;
    }

    // Applica le impostazioni globali come il colore e la lingua
    loadGlobalSettings();

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
