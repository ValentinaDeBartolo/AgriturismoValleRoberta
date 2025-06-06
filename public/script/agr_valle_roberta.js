window.onload = function () {
    // Inizializzo l'audio di sottofondo con un volume basso.
    const audio = document.getElementById("audioDiSfondo");
    if (audio) {
        audio.volume = 0.05;
    }

    // Qui definisco i servizi che offro. Così è facile aggiungere o togliere.
    window.servizi = [
        {
            nome: "Camera matrimoniale con vista panoramica",
            descrizione: "Una camera elegante con una vista mozzafiato sulla valle.",
            icona: "fa-bed"
        },
        {
            nome: "Escursioni in bicicletta",
            descrizione: "Scopri i sentieri naturali della campagna circostante con una bicicletta fornita dal nostro agriturismo.",
            icona: "fa-bicycle"
        },
        {
            nome: "Piscina all'aperto",
            descrizione: "Rilassati nella nostra piscina all'aperto con vista sulla campagna.",
            icona: "fa-swimming-pool"
        },
        {
            nome: "Eventi e matrimoni",
            descrizione: "Organizziamo eventi, matrimoni e cerimonie in un ambiente unico e suggestivo.",
            icona: "fa-glass-cheers"
        },
        {
            nome: "Ristorante con cucina tipica",
            descrizione: "Gusta piatti tipici della cucina laziale preparati con ingredienti freschi e locali.",
            icona: "fa-utensils"
        },
        {
            nome: "Degustazione vini locali",
            descrizione: "Esplora i sapori del territorio con le nostre degustazioni guidate di vini regionali.",
            icona: "fa-wine-glass-alt"
        },
        {
            nome: "Corsi di cucina tradizionale",
            descrizione: "Impara i segreti della cucina laziale con i nostri chef esperti.",
            icona: "fa-hat-chef"
        },
        {
            nome: "Area giochi per bambini",
            descrizione: "Uno spazio sicuro e divertente per i più piccoli, con giochi e attività all'aria aperta.",
            icona: "fa-child-reaching"
        },
        {
            nome: "Wi-Fi gratuito",
            descrizione: "Resta connesso con il nostro servizio Wi-Fi ad alta velocità disponibile in tutta la struttura.",
            icona: "fa-wifi"
        },
        {
            nome: "Parcheggio privato",
            descrizione: "Ampio parcheggio interno e sicuro per tutti i nostri ospiti.",
            icona: "fa-parking"
        },
        {
            nome: "Noleggio E-bike",
            descrizione: "Esplora la campagna laziale con le nostre e-bike, perfette per ogni livello di esperienza.",
            icona: "fa-solid fa-person-biking"
        },
        {
            nome: "Servizio navetta",
            descrizione: "Disponibile per raggiungere le principali attrazioni locali o la stazione ferroviaria.",
            icona: "fa-solid fa-bus"
        },
        {
            nome: "Pet-friendly",
            descrizione: "I tuoi amici a quattro zampe sono i benvenuti nel nostro agriturismo.",
            icona: "fa-solid fa-paw"
        }
    ];

    // Gestione del dropdown dei servizi
    const elencoServizi = document.getElementById("elencoServizi");
    const descrizioneServizio = document.getElementById("descrizioneServizio");
    const dettagliServizio = document.getElementById("dettagliServizio");

    if (elencoServizi) {
        // Popolo il menu a tendina con i servizi che ho definito sopra.
        window.servizi.forEach((servizio, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.text = servizio.nome;
            elencoServizi.appendChild(option);
        });

        // Quando scelgo un servizio, mostro la sua descrizione.
        elencoServizi.onchange = function () {
            const indice = elencoServizi.value;
            if (indice !== "") {
                dettagliServizio.textContent = window.servizi[indice].descrizione;
                descrizioneServizio.style.display = "block";
            } else {
                descrizioneServizio.style.display = "none";
            }
        };

        // All'inizio, il dropdown è vuoto e la descrizione è nascosta.
        elencoServizi.value = "";
        if (descrizioneServizio) {
            descrizioneServizio.style.display = "none";
        }
    }

    // Funzione per la Dark Mode: voglio che l'utente scelga come navigare.
    setupDarkMode();
    function setupDarkMode() {
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = document.getElementById('themeIcon');

        // Controllo se la dark mode è già attiva.
        const isDarkMode = localStorage.getItem('darkMode') === 'true';

        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            if (themeIcon) { // Controllo per assicurare che themeIcon esista
                themeIcon.textContent = '☼';
            }
        }

        // Al click, alterno la dark mode e salvo la preferenza.
        if (themeToggle) {
            themeToggle.addEventListener('click', function () {
                document.body.classList.toggle('dark-mode');
                const isDark = document.body.classList.contains('dark-mode');
                if (themeIcon) {
                    themeIcon.textContent = isDark ? '☼' : '☾';
                }
                localStorage.setItem('darkMode', isDark);
            });
        }

        // Se non ho preferenze salvate, uso quelle del sistema operativo.
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        if (localStorage.getItem('darkMode') === null) {
            if (prefersDarkScheme.matches) {
                document.body.classList.add('dark-mode');
                if (themeIcon) {
                    themeIcon.textContent = '☼';
                }
                localStorage.setItem('darkMode', 'true');
            }
        }
    }

    // Gestione del menu hamburger per i dispositivi più piccoli.
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const menu = document.querySelector('.menu');

    if (hamburgerIcon && menu) {
        hamburgerIcon.addEventListener('click', () => {
            menu.classList.toggle('open');
            hamburgerIcon.classList.toggle('open');
        });

        // Se clicco su un link nel menu, lo chiudo (comodo sul telefono).
        const menuLinksMobile = document.querySelectorAll('.menu li a');
        menuLinksMobile.forEach(function (link) {
            link.addEventListener('click', function () {
                if (window.innerWidth <= 760) {
                    hamburgerIcon.classList.remove('open');
                    menu.classList.remove('open');
                }
            });
        });
    }

    // Logica per il form di prenotazione: valida i dati e mostra un riepilogo.
    const formPrenotazione = document.getElementById("formPrenotazione");
    if (formPrenotazione) {
        formPrenotazione.addEventListener("submit", function (event) {
            event.preventDefault(); // Non ricarico la pagina.

            const nome = document.getElementById("nome").value.trim();
            const email = document.getElementById("email").value.trim();
            const telefono = document.getElementById("telefono").value.trim();
            const persone = document.getElementById("persone").value.trim();
            const arrivo = document.getElementById("arrivo").value.trim();
            const partenza = document.getElementById("partenza").value.trim();
            const note = document.getElementById("note") ? document.getElementById("note").value.trim() : ''; // Gestisce il caso notes non esista

            // Controllo che il nome contenga solo lettere e spazi.
            if (!/^[A-Za-zÀ-ÿ\s]+$/.test(nome)) {
                alert("Il nome può contenere solo lettere e spazi.");
                return;
            }

            // Controllo il formato del telefono.
            if (!/^[0-9\s+]+$/.test(telefono)) {
                alert("Il numero di telefono deve contenere solo numeri, spazi e il simbolo +.");
                return;
            }

            // Controllo il formato dell'email.
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert("Per favore, inserisci un'email valida.");
                return;
            }

            // Controllo che la data di partenza sia dopo quella di arrivo.
            if (new Date(partenza) <= new Date(arrivo)) {
                alert("La data di partenza deve essere successiva alla data di arrivo.");
                return;
            }

            // Se tutto è a posto, invio i dati al backend
            if (nome && email && telefono && persone && arrivo && partenza) {
                const datiPrenotazione = {
                    name: nome,
                    email: email,
                    phone: telefono,
                    people: parseInt(persone), // Converti in numero
                    arrival: arrivo,
                    departure: partenza,
                    notes: note
                };

                fetch("http://localhost:3000/reservations", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(datiPrenotazione)
                })
                    .then(res => {
                        if (!res.ok) {
                            return res.json().then(errorData => {
                                throw new Error(errorData.message || `Errore HTTP: ${res.status}`);
                            });
                        }
                        return res.json();
                    })
                    .then(result => {
                        if (result.success) {
                            alert("Prenotazione inviata con successo!");
                            formPrenotazione.reset(); // Pulisci il form dopo l'invio
                        } else {
                            alert(result.message);
                        }
                    })
                    .catch(error => {
                        console.error("Errore nell'invio della prenotazione:", error);
                        alert("Si è verificato un errore durante l'invio della prenotazione: " + error.message);
                    });
            } else {
                alert("Per favore, compila tutti i campi obbligatori del modulo.");
            }
        });
    }

    //"Mostra Prenotazioni" e DataTables 
    const showReservationsBtn = document.getElementById('showReservationsBtn');
    const reservationsTableContainer = document.getElementById('reservationsTableContainer');
    let dataTableInstance = null; // riferimento all'istanza di DataTables

    if (showReservationsBtn && reservationsTableContainer) {
        showReservationsBtn.addEventListener('click', async () => {
            reservationsTableContainer.style.display = 'block';

            // Se DataTables non è ancora stato inizializzato
            if (dataTableInstance === null) {
                try {
                    const response = await fetch('http://localhost:3000/api/reservations');
                    const data = await response.json();

                    if (data.success && data.reservations) {
                        // Inizializza DataTables con i dati ricevuti
                        dataTableInstance = new DataTable('#reservationsTable', {
                            data: data.reservations,
                            columns: [
                                { data: 'id' },
                                { data: 'nome' },
                                { data: 'email' },
                                { data: 'telefono' },
                                { data: 'people' },
                                { data: 'arrival' },
                                { data: 'departure' },
                                { data: 'notes' },
                                {
                                    data: 'created_at',
                                    render: function (data) {
                                        if (!data) return ''; // Gestisce il caso in cui created_at sia nullo
                                        return new Date(data).toLocaleDateString('it-IT', {
                                            year: 'numeric', month: '2-digit', day: '2-digit',
                                            hour: '2-digit', minute: '2-digit'
                                        });
                                    }
                                }
                            ],
                            responsive: true,
                            language: {
                                url: '/i18n/it-IT.json'
                            }
                        });
                    } else {
                        alert('Errore nel caricamento delle prenotazioni: ' + (data.message || 'Dati non validi.'));
                    }
                } catch (error) {
                    console.error('Errore nel caricamento delle prenotazioni:', error);
                    alert('Si è verificato un errore nel caricamento delle prenotazioni.');
                }
            } else {
                // Se DataTables è già inizializzato, ricarica i dati
                dataTableInstance.ajax.reload(null, false);
            }
        });
    }
    // Imposto le date minime per arrivo e partenza a partire da oggi.
    const oggi = new Date();
    const anno = oggi.getFullYear();
    const mese = String(oggi.getMonth() + 1).padStart(2, '0');
    const giorno = String(oggi.getDate()).padStart(2, '0');
    const dataMinima = `${anno}-${mese}-${giorno}`;

    const arrivoInput = document.getElementById("arrivo");
    const partenzaInput = document.getElementById("partenza");

    if (arrivoInput) {
        arrivoInput.min = dataMinima;
    }
    if (partenzaInput) {
        partenzaInput.min = dataMinima;
    }

    // Aggiorno la data minima di partenza in base alla data di arrivo selezionata.
    if (arrivoInput && partenzaInput) {
        arrivoInput.addEventListener("change", function () {
            const dataArrivoSelezionata = new Date(this.value);
            dataArrivoSelezionata.setDate(dataArrivoSelezionata.getDate() + 1); // La partenza deve essere almeno il giorno dopo.

            const nuovaDataPartenzaMin = dataArrivoSelezionata.toISOString().split('T')[0];
            partenzaInput.min = nuovaDataPartenzaMin;

            // Se la data di partenza è sbagliata, la correggo automaticamente.
            if (new Date(partenzaInput.value) <= new Date(this.value)) {
                partenzaInput.value = nuovaDataPartenzaMin;
            }
        });
    }

    // Evidenzio la pagina in cui mi trovo nel menu di navigazione.
    const menuLinks = document.querySelectorAll(".menu a");
    menuLinks.forEach(function (link) {
        let linkPath = link.getAttribute("href").split("/").pop();
        let currentPath = window.location.pathname.split("/").pop();

        if (currentPath === linkPath) {
            link.closest("li").classList.add("active-link");
        }
    });

    // Effetto hover sul logo: voglio che si muova un un po'.
    const logo = document.getElementById("logo");
    if (logo) {
        logo.addEventListener("mouseenter", function () {
            this.style.transform = "scale(1.05)";
        });
        logo.addEventListener("mouseleave", function () {
            this.style.transform = "scale(1)";
        });
    }

    // Gestione del carosello delle immagini.
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

        // Creo i pallini sotto il carosello per navigare tra le immagini.
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('carosello-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.carosello-dot');

        // Funzione per cambiare slide del carosello.
        function goToSlide(index) {
            if (index < 0) index = totalSlides - 1;
            if (index >= totalSlides) index = 0;

            immagini.style.transform = `translateX(-${index * 100}%)`;

            // Aggiorno il pallino attivo.
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });

            currentIndex = index;
        }

        // Listener per i pulsanti Avanti/Indietro del carosello.
        if (prevBtn) { // Aggiunto controllo esistenza
            prevBtn.addEventListener('click', () => {
                goToSlide(currentIndex - 1);
            });
        }
        if (nextBtn) { // Aggiunto controllo esistenza
            nextBtn.addEventListener('click', () => {
                goToSlide(currentIndex + 1);
            });
        }

        // Carosello automatico: cambia slide ogni 5 secondi.
        let autoSlide = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000);

        // Quando il mouse è sul carosello, fermo l'autoscroll.
        carosello.addEventListener('mouseenter', () => {
            clearInterval(autoSlide);
        });
        // Quando il mouse esce, riparte l'autoscroll.
        carosello.addEventListener('mouseleave', () => {
            autoSlide = setInterval(() => {
                goToSlide(currentIndex + 1);
            }, 5000);
        });

        // Gestione dello swipe per i dispositivi touch.
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
            const swipeThreshold = 50;
            if (touchStartX - touchEndX > swipeThreshold) {
                goToSlide(currentIndex + 1);
            } else if (touchEndX - touchStartX > swipeThreshold) {
                goToSlide(currentIndex - 1);
            }
        }
    }

    // Gestione della sezione "Sei Cliente?" e dei form di registrazione/login.
    const btnSi = document.getElementById("btnSi");
    const btnNo = document.getElementById("btnNo");
    const verificaClienteSection = document.querySelector(".verifica-cliente");
    const sceltaRegistrazioneSection = document.getElementById("sceltaRegistrazione");
    const registrazioneSection = document.getElementById("registrazione");
    const loginSection = document.getElementById("login");
    const sezionePrenotazioneSection = document.getElementById("sezionePrenotazione");

    const formRegistrazione = document.getElementById("formRegistrazione");
    const formLogin = document.getElementById("formLogin");

    // All'inizio, nascondo le sezioni che compaiono dopo la scelta "Sì/No".
    if (verificaClienteSection) verificaClienteSection.style.display = "block"; // Presuppongo che questa sia visibile inizialmente
    if (sceltaRegistrazioneSection) sceltaRegistrazioneSection.style.display = "none";
    if (registrazioneSection) registrazioneSection.style.display = "none";
    if (loginSection) loginSection.style.display = "none";
    if (sezionePrenotazioneSection) sezionePrenotazioneSection.style.display = "none";

    // Aggiungo un controllo generale per assicurare che gli elementi esistano
    if (btnSi && btnNo && verificaClienteSection && sceltaRegistrazioneSection && registrazioneSection && loginSection && sezionePrenotazioneSection) {

        btnSi.addEventListener("click", function () {
            // Se dico "Sì", nascondo la domanda e mostro il form di login.
            verificaClienteSection.style.display = "none";
            loginSection.style.display = "block";
            sceltaRegistrazioneSection.style.display = "none";
            registrazioneSection.style.display = "none";
            sezionePrenotazioneSection.style.display = "none";
        });

        btnNo.addEventListener("click", function () {
            // Se dico "No", nascondo la domanda e mostro la scelta tra registrazione/ospite.
            verificaClienteSection.style.display = "none";
            sceltaRegistrazioneSection.style.display = "block";
            registrazioneSection.style.display = "none";
            loginSection.style.display = "none";
            sezionePrenotazioneSection.style.display = "none";
        });

        const btnRegistrati = document.getElementById("btnRegistrati");
        const btnOspite = document.getElementById("btnOspite");

        if (btnRegistrati) {
            btnRegistrati.addEventListener("click", function () {
                // Se voglio registrarmi, mostro il form di registrazione.
                sceltaRegistrazioneSection.style.display = "none";
                registrazioneSection.style.display = "block";
                loginSection.style.display = "none";
                sezionePrenotazioneSection.style.display = "none";
            });
        }

        if (btnOspite) {
            btnOspite.addEventListener("click", function () {
                // Se voglio continuare come ospite, mostro il form di prenotazione.
                sceltaRegistrazioneSection.style.display = "none";
                sezionePrenotazioneSection.style.display = "block";
                registrazioneSection.style.display = "none";
                loginSection.style.display = "none";
            });
        }

        // Gestisco l'invio del form di registrazione.
        if (formRegistrazione) {
            formRegistrazione.addEventListener("submit", function (event) {
                event.preventDefault();

                const regNome = document.getElementById("regNome").value.trim();
                const regEmail = document.getElementById("regEmail").value.trim();
                const regPassword = document.getElementById("regPassword").value.trim();

                // Validazione frontend (aggiungo i controlli per i campi vuoti qui per coerenza)
                if (!regNome || !regEmail || !regPassword) {
                    alert("Per favore, compila tutti i campi obbligatori per la registrazione.");
                    return;
                }
                if (!/^[A-Za-zÀ-ÿ\s]+$/.test(regNome)) {
                    alert("Il nome può contenere solo lettere e spazi.");
                    return;
                }
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regEmail)) {
                    alert("Per favore, inserisci un'email valida per la registrazione.");
                    return;
                }
                if (regPassword.length < 6 || !/[a-zA-Z]/.test(regPassword) || !/\d/.test(regPassword)) {
                    alert("La password deve contenere almeno 6 caratteri, inclusi lettere e numeri.");
                    return;
                }

                // Dati da inviare al backend per la registrazione
                const data = {
                    name: regNome,
                    email: regEmail,
                    password: regPassword
                };

                fetch("http://localhost:3000/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                })
                    .then(res => {
                        if (!res.ok) {
                            return res.json().then(errorData => {
                                throw new Error(errorData.message || `Errore HTTP: ${res.status}`);
                            });
                        }
                        return res.json();
                    })
                    .then(result => {
                        if (result.success) {
                            alert("Registrazione effettuata con successo per " + data.name + "!");
                            formRegistrazione.reset();
                            registrazioneSection.style.display = "none";
                            loginSection.style.display = "block";
                        } else {
                            alert(result.message);
                        }
                    })
                    .catch(error => {
                        console.error("Errore durante la registrazione:", error);
                        alert("Si è verificato un errore: " + error.message);
                    });
            });
        }

        // Gestisco l'invio del form di login.
        if (formLogin) {
            formLogin.addEventListener("submit", function (event) {
                event.preventDefault();

                const loginEmail = document.getElementById("loginEmail").value.trim();
                const loginPassword = document.getElementById("loginPassword").value.trim();

                // Validazione frontend
                if (!loginEmail || !loginPassword) {
                    alert("Per favore, inserisci email e password per il login.");
                    return;
                }
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginEmail)) {
                    alert("Per favore, inserisci un'email valida per il login.");
                    return;
                }

                const data = {
                    email: loginEmail,
                    password: loginPassword
                };

                fetch("http://localhost:3000/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                })
                    .then(res => {
                        if (!res.ok) {
                            return res.json().then(errorData => {
                                throw new Error(errorData.message || `Errore HTTP: ${res.status}`);
                            });
                        }
                        return res.json();
                    })
                    .then(result => {
                        if (result.success) {
                            alert("Login effettuato con successo!");
                            loginSection.style.display = "none";
                            sezionePrenotazioneSection.style.display = "block";
                            formLogin.reset();
                        } else {
                            alert(result.message);
                        }
                    })
                    .catch(error => {
                        console.error("Errore durante il login:", error);
                        alert("Si è verificato un errore: " + error.message);
                    });
            });
        }
    } // Chiusura del blocco 'if (btnSi && btnNo && ...)'
}; // Chiusura di window.onload