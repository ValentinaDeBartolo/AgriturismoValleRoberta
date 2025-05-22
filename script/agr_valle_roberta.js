window.onload = function () {
    // Inizializzazione audio con volume basso
    var audio = document.getElementById("audioDiSfondo");
    if (audio) audio.volume = 0.05;

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
    // Gestione Dark Mode
    setupDarkMode();
    function setupDarkMode() {
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = document.getElementById('themeIcon');

        const isDarkMode = localStorage.getItem('darkMode') === 'true';

        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            themeIcon.textContent = '☼';
        }

        themeToggle.addEventListener('click', function () {
            document.body.classList.toggle('dark-mode');

            const isDark = document.body.classList.contains('dark-mode');
            themeIcon.textContent = isDark ? '☼' : '☾';

            localStorage.setItem('darkMode', isDark);

            // AGGIORNAMENTO AGGIUNTO PER IL POPUP DELLA PASSWORD
            const passwordPopupOverlay = $('#passwordPopupOverlay');
            if (passwordPopupOverlay.hasClass('show')) {
                if (isDark) {
                    passwordPopupOverlay.find('.password-popup-content').addClass('dark-mode');
                } else {
                    passwordPopupOverlay.find('.password-popup-content').removeClass('dark-mode');
                }
            }
        });

        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

        if (localStorage.getItem('darkMode') === null) {
            if (prefersDarkScheme.matches) {
                document.body.classList.add('dark-mode');
                themeIcon.textContent = '☼';
                localStorage.setItem('darkMode', 'true');
            }
        }
    }

    // Gestione Hamburger Menu
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const menu = document.querySelector('.menu');

    if (hamburgerIcon && menu) {
        hamburgerIcon.addEventListener('click', () => {
            menu.classList.toggle('open');
            hamburgerIcon.classList.toggle('open'); // Aggiunto per animare l'icona
        });

        // Chiudi il menu quando si clicca su un link
        const menuLinks = document.querySelectorAll('.menu li a');
        menuLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                if (window.innerWidth <= 760) {
                    hamburgerIcon.classList.remove('open');
                    menu.classList.remove('open');
                }
            });
        });
    }

    // Form di prenotazione 
    const formPrenotazione = document.getElementById("formPrenotazione");
    if (formPrenotazione) {
        formPrenotazione.addEventListener("submit", function (event) {
            event.preventDefault(); // Impedisce il ricaricamento della pagina

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
            } else {
                alert("Per favore, compila tutti i campi obbligatori del modulo.");
            }
        });
    }

    // Imposta la data minima per arrivo e partenza 
    var oggi = new Date();
    var anno = oggi.getFullYear();
    var mese = String(oggi.getMonth() + 1).padStart(2, '0');
    var giorno = String(oggi.getDate()).padStart(2, '0');
    var dataMinima = anno + '-' + mese + '-' + giorno;

    var arrivoInput = document.getElementById("arrivo");
    var partenzaInput = document.getElementById("partenza");

    if (arrivoInput) arrivoInput.min = dataMinima;
    if (partenzaInput) partenzaInput.min = dataMinima;

    if (arrivoInput && partenzaInput) {
        arrivoInput.addEventListener("change", function () {
            var dataArrivoSelezionata = new Date(this.value);
            dataArrivoSelezionata.setDate(dataArrivoSelezionata.getDate() + 1);

            var nuovaDataPartenzaMin = dataArrivoSelezionata.toISOString().split('T')[0];
            partenzaInput.min = nuovaDataPartenzaMin;

            if (new Date(partenzaInput.value) <= new Date(this.value)) {
                partenzaInput.value = nuovaDataPartenzaMin;
            }
        });
    }

    // Evidenzia pagina attiva menu 
    $(".menu a").each(function () {
        let linkPath = $(this).attr("href").split("/").pop();
        let currentPath = window.location.pathname.split("/").pop();

        if (currentPath === linkPath) {
            $(this).parent().addClass("active-link");
        }
    });

    // Logo hover 
    $("#logo").hover(
        function () {
            $(this).css("transform", "scale(1.05)");
        },
        function () {
            $(this).css("transform", "scale(1)");
        }
    );

    // Funzionalità per la dropdown dei servizi 
    setupDropdownServizi();
    function setupDropdownServizi() {
        var elencoServizi = document.getElementById("elencoServizi");
        var descrizioneServizio = document.getElementById("descrizioneServizio");
        var dettagliServizio = document.getElementById("dettagliServizio");

        if (elencoServizi) {
            // Popola il menu a tendina dei servizi
            for (var i = 0; i < window.servizi.length; i++) {
                var option = document.createElement("option");
                option.value = i;
                option.text = window.servizi[i].nome;
                elencoServizi.appendChild(option);
            }

            elencoServizi.onchange = function () {
                var indice = elencoServizi.value;
                if (indice !== "") {
                    dettagliServizio.textContent = window.servizi[indice].descrizione;
                    descrizioneServizio.style.display = "block";
                } else {
                    descrizioneServizio.style.display = "none";
                }
            };

            // Inizializza la visualizzazione
            elencoServizi.value = "";
            if (descrizioneServizio) descrizioneServizio.style.display = "none";
        }
    }

    // Funzionalità carosello 
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
            if (index < 0) index = totalSlides - 1;
            if (index >= totalSlides) index = 0;

            immagini.style.transform = `translateX(-${index * 100}%)`;

            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });

            currentIndex = index;
        }

        prevBtn.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
        });

        nextBtn.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
        });

        let autoSlide = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000);

        carosello.addEventListener('mouseenter', () => {
            clearInterval(autoSlide);
        });

        carosello.addEventListener('mouseleave', () => {
            autoSlide = setInterval(() => {
                goToSlide(currentIndex + 1);
            }, 5000);
        });

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
};