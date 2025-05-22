# Agriturismo Valle Roberta - Progetto Didattico

![Logo Agriturismo Valle Roberta](Logo/logo.png) 
Sito web dimostrativo per un agriturismo immaginario, creato per mettere in pratica le competenze di sviluppo web front-end con HTML, CSS, JavaScript (Vanilla JS e jQuery) e Bootstrap.

---

## Panoramica del Progetto

Questo progetto rappresenta la realizzazione di un sito web completo per un **"Agriturismo Valle Roberta"**, un'entità **puramente fittizia** creata a scopo didattico. Il suo obiettivo principale è stato quello di consolidare e applicare le conoscenze acquisite durante un corso di **Sviluppo WEB e linguaggi di programmazione (HTML, CSS e JavaScript)**.

Il sito include diverse sezioni chiave che dimostrano la capacità di strutturare pagine web, stilizzarle con CSS e aggiungere interattività con JavaScript, con un'attenzione particolare alla user experience e alla responsività.

---

## Funzionalità Implementate

* **Homepage (`index.html` e `agriturismo_valle_roberta.html`):** `index.html` reindirizza automaticamente alla homepage principale (`agriturismo_valle_roberta.html`). Quest'ultima presenta un carosello di immagini, un form di prenotazione simulato e un lettore audio di sottofondo.
* **Chi Siamo (`chi_siamo.html`):** Sezione dedicata alla storia dell'agriturismo e alla presentazione di un team fittizio.
* **Servizi (`servizi.html`):** Elenco e descrizione dei servizi offerti, caricati dinamicamente tramite JavaScript, con un layout dinamico per le card dei servizi.
* **Contatti (`contatti.html`):** Form di contatto e informazioni utili, con un pulsante che indirizza ad un portfolio personale (`portfolio_privato.html`) protetto da password (simulato tramite jQuery).
* **Portfolio Privato (`portfolio_privato.html`):** Una pagina personale a scopo dimostrativo, accessibile dalla sezione contatti, per presentare le proprie competenze e un CV.
* **Navbar Responsiva:** Menu di navigazione adattivo per dispositivi mobili (hamburger menu).
* **Dark Mode:** Funzionalità di toggle per passare tra tema chiaro e scuro, migliorando l'accessibilità e l'estetica.
* **Integrazione Font Awesome:** Utilizzo di icone per arricchire l'interfaccia utente.
* **Carosello Immagini:** Implementazione di un carosello di immagini con navigazione e autoplay.
* **Lettore Audio:** Un semplice lettore audio integrato nella homepage.

---

## Tecnologie Utilizzate

* **HTML5:** Per la struttura semantica delle pagine web.
* **CSS3:** Per lo stile e il layout, inclusi:
    * **Variabili CSS:** Per una gestione efficiente dei temi (es. Dark Mode).
    * **Flexbox e Grid:** Per layout complessi e responsivi.
    * **Responsiveness:** Media queries per un'esperienza utente ottimale su diverse dimensioni di schermo.
* **JavaScript (Vanilla JS & jQuery):** Per l'interattività, la logica della Dark Mode, la gestione del menu hamburger, il caricamento dinamico dei servizi, la logica del carosello e la gestione del popup per il portfolio.
* **Bootstrap 5:** Framework CSS per accelerare lo sviluppo e garantire un design responsivo (utilizzo di classi e componenti come il sistema a griglia e il carosello).
* **Font Awesome:** Libreria di icone vettoriali.

---

## Struttura delle Cartelle

Il progetto è organizzato nelle seguenti cartelle principali:

\`\`\`
.
├── sections/                 # Contiene i file HTML delle varie sezioni del sito
│   ├── agriturismo_valle_roberta.html
│   ├── chi_siamo.html
│   ├── contatti.html
│   ├── portfolio_privato.html
│   └── servizi.html
├── style/                    # Contiene i file CSS per lo stile delle pagine
│   ├── agr_valle_roberta.css
│   ├── chi_siamo.css
│   ├── contatti.css
│   └── servizi.css
├── script/                   # Contiene i file JavaScript
│   ├── agr_valle_roberta.js
│   ├── contatti.js
│   └── servizi.js
├── Logo/                     # Contiene il logo del sito
│   └── logo.png
├── immCarosello/             # Immagini utilizzate nel carosello della homepage
│   ├── img1.jpg
│   ├── img2.jpg
│   └── img3.jpg
├── immChiSiamo/              # Immagini per la sezione "Chi Siamo"
│   ├── vero.png
│   └── vale.jpg
├── musicaDiSfondo/           # File audio per la homepage
│   └── musica.mp4
├── .gitignore                # File per ignorare file e cartelle in Git
└── index.html                # Pagina di reindirizzamento alla homepage principale
\`\`\`

---

## Come Visualizzare il Progetto

Per visualizzare il progetto, non è richiesta alcuna installazione di dipendenze lato server. 
sBasta accedere al seguente indirizzo:
https://valentinadebartolo.github.io/AgriturismoValleRoberta/

Per visualizzare il portfolio, è possibile accedere inserendo la seguente password: Valentina .

---

## Cosa Ho Imparato e Messo in Pratica

Questo progetto mi ha permesso di:

* Approfondire la struttura semantica di **HTML5** e l'organizzazione dei contenuti in un progetto multi-pagina.
* Padroneggiare tecniche avanzate di **CSS3**, inclusa la creazione di temi dinamici tramite variabili CSS, l'implementazione della Dark Mode e la gestione del layout con Flexbox e CSS Grid per una responsività efficace.
* Sviluppare funzionalità interattive complesse con **JavaScript (Vanilla JS e jQuery)**, come la gestione dinamica degli elementi (carosello, servizi), la logica di accesso (simulato) e l'interazione con l'utente.
* Integrare e personalizzare un framework come **Bootstrap 5** per un design moderno e responsivo, sfruttandone i componenti e il sistema a griglia.
* Organizzare un progetto web front-end con una chiara separazione tra HTML, CSS e JavaScript in cartelle dedicate.
* Applicare principi di **User Experience (UX)** come la Dark Mode e la responsività per un'esperienza utente migliorata su vari dispositivi.
---

## Stato del Progetto

Questo progetto è completo per i suoi scopi didattici. Non è prevista un'ulteriore evoluzione in un'applicazione reale, ma le competenze acquisite sono pronte per essere applicate a futuri sviluppi.

---

## Contatti

Per qualsiasi domanda o per discutere di opportunità professionali, puoi contattarmi su www.linkedin.com/in/valentina-de-bartolo-0a643b277.
