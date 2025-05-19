window.onload = function () {
    // Inizializzazione audio con volume basso
    var audio = document.getElementById("audioDiSfondo");
    if (audio) audio.volume = 0.05;

    // Gestione Dark Mode
    setupDarkMode();
    function setupDarkMode() {
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = document.getElementById('themeIcon');

        // Controlla se c'è una preferenza salvata
        const isDarkMode = localStorage.getItem('darkMode') === 'true';

        // Applica il tema al caricamento
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            themeIcon.textContent = '☼';
        }

        // Gestione interruttore (toggle) dm
        themeToggle.addEventListener('click', function () {
            document.body.classList.toggle('dark-mode');

            // Aggiorna l'icona
            const isDark = document.body.classList.contains('dark-mode');
            themeIcon.textContent = isDark ? '☼' : '☾';

            // Salva la preferenza
            localStorage.setItem('darkMode', isDark);

            // Aggiorna i colori del menu per l'hover
            updateMenuHoverColors();
        });

        // Controlla le preferenze del sistema
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

        // Se non c'è una preferenza salvata, usa quella del sistema
        if (localStorage.getItem('darkMode') === null && prefersDarkScheme.matches) {
            document.body.classList.add('dark-mode');
            themeIcon.textContent = '☼';
            localStorage.setItem('darkMode', 'true');
        }

        // Ascolta i cambiamenti nelle preferenze del sistema
        prefersDarkScheme.addEventListener('change', function (e) {
            if (localStorage.getItem('darkMode') === null) {
                if (e.matches) {
                    document.body.classList.add('dark-mode');
                    themeIcon.textContent = '☼';
                    localStorage.setItem('darkMode', 'true');
                } else {
                    document.body.classList.remove('dark-mode');
                    themeIcon.textContent = '☾';
                    localStorage.setItem('darkMode', 'false');
                }
                // Aggiorna i colori del menu per l'hover
                updateMenuHoverColors();
            }
        });
    }

    // Gestione del menu hamburger
    var hamburgerIcon = document.querySelector('.hamburger-icon');
    var menu = document.querySelector('.menu');

    if (hamburgerIcon) {
        hamburgerIcon.addEventListener('click', function () {
            this.classList.toggle('open');
            menu.classList.toggle('open');
        });
    }

    // Chiudi il menu quando si clicca su un link
    var menuLinks = document.querySelectorAll('.menu li a');
    menuLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            if (window.innerWidth <= 760) {
                hamburgerIcon.classList.remove('open');
                menu.classList.remove('open');
            }
        });
    });

    // Funzione per aggiornare i colori dell'hover del menu
    function updateMenuHoverColors() {
        menuLinks.forEach(function (link) {
            // Reimposta lo stile per far sì che i getComputedStyle prendano i valori corretti del tema
            link.style.color = '';
            link.style.backgroundColor = '';

            // Se l'elemento è attualmente in hover, aggiorna i colori
            if (link.matches(':hover')) {
                var coloreTestoAttuale = window.getComputedStyle(link).color;
                var coloreSfondoAttuale = window.getComputedStyle(link).backgroundColor;

                link.style.color = coloreSfondoAttuale;
                link.style.backgroundColor = coloreTestoAttuale;
            }
        });
    }

    // Effetto hover sul menu
    menuLinks.forEach(function (link) {
        link.addEventListener('mouseenter', function () {
            // Prendi i colori attuali in base al tema corrente
            var coloreTestoAttuale = window.getComputedStyle(link).color;
            var coloreSfondoAttuale = window.getComputedStyle(link).backgroundColor;

            // Applica lo scambio di colori
            link.style.color = coloreSfondoAttuale;
            link.style.backgroundColor = coloreTestoAttuale;
        });

        link.addEventListener('mouseleave', function () {
            // Reset completo dello stile in-line
            link.style.color = '';
            link.style.backgroundColor = '';
        });
    });

    // Gestione servizi
    var servizi = [
        { nome: "Camera matrimoniale con vista panoramica", descrizione: "Una camera elegante con una vista mozzafiato sulla valle." },
        { nome: "Escursioni in bicicletta", descrizione: "Scopri i sentieri naturali della campagna circostante con una bicicletta fornita dal nostro agriturismo." },
        { nome: "Piscina all'aperto", descrizione: "Rilassati nella nostra piscina all'aperto con vista sulla campagna." },
        { nome: "Eventi e matrimoni", descrizione: "Organizziamo eventi, matrimoni e cerimonie in un ambiente unico e suggestivo." },
        { nome: "Ristorante con cucina tipica", descrizione: "Gusta piatti tipici della cucina laziale preparati con ingredienti freschi e locali." }
    ];

    var elencoServizi = document.getElementById("elencoServizi");
    var descrizioneServizio = document.getElementById("descrizioneServizio");
    var dettagliServizio = document.getElementById("dettagliServizio");

    if (elencoServizi) {
        // Popola il menu a tendina dei servizi
        for (var i = 0; i < servizi.length; i++) {
            var option = document.createElement("option");
            option.value = i;
            option.text = servizi[i].nome;
            elencoServizi.appendChild(option);
        }

        elencoServizi.onchange = function () {
            var indice = elencoServizi.value;
            if (indice !== "") {
                dettagliServizio.textContent = servizi[indice].descrizione;
                descrizioneServizio.style.display = "block";
            } else {
                descrizioneServizio.style.display = "none";
            }
        };

        // Inizializza la visualizzazione
        elencoServizi.value = "";
        if (descrizioneServizio) descrizioneServizio.style.display = "none";
    }
    setupCarosello();
    function setupCarosello() {
        const carosello = document.querySelector('.carosello');
        if (!carosello) return;

        const immagini = document.querySelector('.carosello-immagini');
        const slides = document.querySelectorAll('.carosello-immagini img');
        const prevBtn = document.querySelector('.carosello-btn.prev');
        const nextBtn = document.querySelector('.carosello-btn.next');
        const dotsContainer = document.querySelector('.carosello-dots');

        let currentIndex = 0;
        const totalSlides = slides.length;

        // Crea i pallini per ogni immagine
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('carosello-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.carosello-dot');

        // Funzione per andare a una slide specifica
        function goToSlide(index) {
            // Verifica che l'indice sia valido
            if (index < 0) index = totalSlides - 1;
            if (index >= totalSlides) index = 0;

            // Aggiorna la posizione delle immagini
            immagini.style.transform = `translateX(-${index * 100}%)`;

            // Aggiorna lo stato attivo dei dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });

            // Aggiorna l'indice corrente
            currentIndex = index;
        }

        // Event listener per i pulsanti prev/next
        prevBtn.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
        });

        nextBtn.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
        });

        // Scorrimento automatico ogni 5 secondi (carino)
        let autoSlide = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000);

        // Ferma lo scorrimento automatico quando l'utente interagisce con il carosello (figo)
        carosello.addEventListener('mouseenter', () => {
            clearInterval(autoSlide);
        });

        // Riprendi lo scorrimento automatico quando l'utente smette di interagire (fighissimo)
        carosello.addEventListener('mouseleave', () => {
            autoSlide = setInterval(() => {
                goToSlide(currentIndex + 1);
            }, 5000);
        });

        // Supporto per swipe su dispositivi touch
        let touchStartX = 0;
        let touchEndX = 0;

        carosello.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        carosello.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            // Threshold minimo per considerare un swipe valido
            const swipeThreshold = 50;

            if (touchStartX - touchEndX > swipeThreshold) {
                // Swipe a sinistra - vai alla prossima slide
                goToSlide(currentIndex + 1);
            } else if (touchEndX - touchStartX > swipeThreshold) {
                // Swipe a destra - vai alla slide precedente
                goToSlide(currentIndex - 1);
            }
        }

        // Aggiorna il carosello in base al tema
        function updateCaroselloTheme() {
            // mo capimo che ce va
        }

        // Aggiungi updateCaroselloTheme alla funzione updateTheme esistente
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            const originalClickHandler = themeToggle.onclick;
            themeToggle.onclick = function () {
                if (originalClickHandler) originalClickHandler.call(this);
                updateCaroselloTheme();
            };
        }
    }

    // Database simulato di email registrate (per test)
    var emailRegistrate = ["valedb@gmail.com"];

    // Gestione flusso di registrazione/login
    var btnSi = document.getElementById("btnSi");
    var btnNo = document.getElementById("btnNo");
    var btnRegistrati = document.getElementById("btnRegistrati");
    var btnOspite = document.getElementById("btnOspite");

    if (btnNo) {
        btnNo.addEventListener("click", function () {
            document.querySelector(".verifica-cliente").style.display = "none";
            document.getElementById("sceltaRegistrazione").style.display = "block";
        });
    }

    if (btnSi) {
        btnSi.addEventListener("click", function () {
            document.querySelector(".verifica-cliente").style.display = "none";
            document.getElementById("login").style.display = "block";
        });
    }

    if (btnRegistrati) {
        btnRegistrati.addEventListener("click", function () {
            document.getElementById("sceltaRegistrazione").style.display = "none";
            document.getElementById("registrazione").style.display = "block";
        });
    }

    if (btnOspite) {
        btnOspite.addEventListener("click", function () {
            document.getElementById("sceltaRegistrazione").style.display = "none";
            document.getElementById("sezionePrenotazione").style.display = "block";
        });
    }

    // Gestione form registrazione
    var formRegistrazione = document.getElementById("formRegistrazione");
    if (formRegistrazione) {
        formRegistrazione.addEventListener("submit", function (e) {
            e.preventDefault();

            var regNome = document.getElementById("regNome").value.trim();
            var regEmail = document.getElementById("regEmail").value.trim().toLowerCase();
            var regPassword = document.getElementById("regPassword").value;

            if (!/^[A-Za-zÀ-ÿ\s]+$/.test(regNome)) {
                alert("Il nome può contenere solo lettere e spazi.");
                return;
            }

            if (emailRegistrate.includes(regEmail)) {
                alert("Email già registrata. Effettua il login.");
                return;
            }

            emailRegistrate.push(regEmail);
            alert("Registrazione completata! Ora puoi effettuare il login.");

            formRegistrazione.reset();
            document.getElementById("registrazione").style.display = "none";
            document.getElementById("login").style.display = "block";
        });
    }

    // Gestione login simulato
    var formLogin = document.getElementById("formLogin");
    if (formLogin) {
        formLogin.addEventListener("submit", function (e) {
            e.preventDefault();

            var emailLogin = document.getElementById("loginEmail").value.trim().toLowerCase();
            var passwordLogin = document.getElementById("loginPassword").value;

            if (!emailRegistrate.includes(emailLogin)) {
                alert("Email non registrata. Registrati prima.");
                return;
            }

            alert("Login effettuato con successo.");
            formLogin.reset();
            document.getElementById("login").style.display = "none";
            document.getElementById("sezionePrenotazione").style.display = "block";

            // Prenota i campi del form con i dati dell'utente se disponibili
            if (emailLogin === "valedb@gmail.com") {
                if (document.getElementById("email")) document.getElementById("email").value = emailLogin;
                if (document.getElementById("nome")) document.getElementById("nome").value = "Valeria DB";
            }
        });
    }

    // Imposta la data minima per arrivo e partenza
    var oggi = new Date();
    var anno = oggi.getFullYear();
    var mese = String(oggi.getMonth() + 1).padStart(2, '0');
    var giorno = String(oggi.getDate()).padStart(2, '0');
    var dataMinima = anno + '-' + mese + '-' + giorno;

    var arrivo = document.getElementById("arrivo");
    var partenza = document.getElementById("partenza");

    if (arrivo) arrivo.min = dataMinima;
    if (partenza) partenza.min = dataMinima;

    // Aggiornamento automatico data minima di partenza in base alla data di arrivo
    if (arrivo && partenza) {
        arrivo.addEventListener("change", function () {
            var dataArrivoSelezionata = new Date(this.value);
            dataArrivoSelezionata.setDate(dataArrivoSelezionata.getDate() + 1);

            var nuovaDataPartenzaMin = dataArrivoSelezionata.toISOString().split('T')[0];
            partenza.min = nuovaDataPartenzaMin;

            // Se la data di partenza è precedente alla nuova data minima
            if (new Date(partenza.value) <= new Date(this.value)) {
                partenza.value = nuovaDataPartenzaMin;
            }
        });
    }

    // Validazione form prenotazione
    var formPrenotazione = document.getElementById("formPrenotazione");

    if (formPrenotazione) {
        formPrenotazione.addEventListener("submit", function (e) {
            e.preventDefault();

            var nome = document.getElementById("nome").value.trim();
            var email = document.getElementById("email").value.trim();
            var telefono = document.getElementById("telefono").value.trim();
            var persone = document.getElementById("persone").value.trim();
            var arrivo = document.getElementById("arrivo").value.trim();
            var partenza = document.getElementById("partenza").value.trim();

            if (!/^[A-Za-zÀ-ÿ\s]+$/.test(nome)) {
                alert("Il nome può contenere solo lettere e spazi.");
                return;
            }

            if (!/^[0-9\s+]+$/.test(telefono)) {
                alert("Il numero di telefono deve contenere solo numeri, spazi e il simbolo +.");
                return;
            }

            if (new Date(partenza) <= new Date(arrivo)) {
                alert("La data di partenza deve essere successiva alla data di arrivo.");
                return;
            }

            if (nome && email && telefono && persone && arrivo && partenza) {
                alert(
                    "Dati inseriti correttamente:\n" +
                    "Nome: " + nome + "\n" +
                    "Email: " + email + "\n" +
                    "Telefono: " + telefono + "\n" +
                    "Persone: " + persone + "\n" +
                    "Arrivo: " + arrivo + "\n" +
                    "Partenza: " + partenza + "\n" +
                    "Riceverai la conferma della prenotazione via email."
                );
                formPrenotazione.reset();
            }
        });
    }
};