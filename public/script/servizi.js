$(document).ready(function () {
    // Importa l'array servizi dall'altro file 
    // (agr_valle_roberta.js deve essere caricato prima di questo file)
    var servizi = window.servizi || [
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

    // Funzione per caricare dinamicamente i servizi
    function caricaServizi() {
        var serviziGrid = $("#serviziGrid");
        serviziGrid.empty(); // Pulisci eventuali contenuti esistenti

        $.each(servizi, function (index, servizio) {
            var box = `
                <div class="servizio-box">
                    <i class="fa-solid ${servizio.icona}"></i>
                    <h3>${servizio.nome}</h3>
                    <p>${servizio.descrizione}</p>
                </div>
            `;
            serviziGrid.append(box);
        });
    }

    caricaServizi(); // Carica i servizi al caricamento della pagina
});