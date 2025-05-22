$(document).ready(function () {
    // La password è offuscata per renderla meno immediatamente leggibile nel codice sorgente.

    const correctPasswordChars = [86, 97, 108, 101, 110, 116, 105, 110, 97];
    const correctPassword = String.fromCharCode(...correctPasswordChars);

    const portfolioPage = "portfolio_privato.html"; // Nome del file HTML del portfolio

    // Aggiungi il markup del popup al body una volta che il DOM è pronto
    // Assicura che il popup esista prima di provare a manipolarlo
    $('body').append(`
        <div class="password-popup-overlay" id="passwordPopupOverlay">
            <div class="password-popup-content">
                <h3>Accesso al Portfolio</h3>
                <p>Inserisci la password per accedere al portfolio privato:</p>
                <input type="password" id="passwordInput" placeholder="Password">
                <button id="submitPasswordBtn">Accedi</button>
                <button id="cancelPasswordBtn">Annulla</button>
            </div>
        </div>
    `);

    const passwordPopupOverlay = $('#passwordPopupOverlay');
    const passwordInput = $('#passwordInput');
    const submitPasswordBtn = $('#submitPasswordBtn');
    const cancelPasswordBtn = $('#cancelPasswordBtn');
    const showPortfolioBtn = $('#showPortfolioBtn'); // Il pulsante nella pagina contatti

    // Funzione per mostrare il popup
    function showPopup() {
        passwordInput.val(''); // Pulisci il campo input
        passwordPopupOverlay.addClass('show');
        // Applica/rimuovi la classe dark-mode al contenuto del popup in base al tema del body
        if ($('body').hasClass('dark-mode')) {
            passwordPopupOverlay.find('.password-popup-content').addClass('dark-mode');
        } else {
            passwordPopupOverlay.find('.password-popup-content').removeClass('dark-mode');
        }
        passwordInput.focus(); // Metti il focus sul campo password
    }

    // Funzione per nascondere il popup
    function hidePopup() {
        passwordPopupOverlay.removeClass('show');
    }

    // Gestore click per il pulsante "Accedi al Portfolio"
    if (showPortfolioBtn.length) {
        showPortfolioBtn.on('click', function () {
            showPopup();
        });
    }

    // Gestore click per il pulsante "Accedi" nel popup
    if (submitPasswordBtn.length) {
        submitPasswordBtn.on('click', function () {
            if (passwordInput.val() === correctPassword) {
                hidePopup();
                window.location.href = portfolioPage; // Reindirizza alla pagina del portfolio
            } else {
                // Sostituisci alert con un messaggio visibile all'utente
                const errorMessage = $("<p class='error-message' style='color: red; margin-top: 10px;'>Password errata. Riprova.</p>");
                passwordInput.after(errorMessage); // Aggiungi il messaggio dopo l'input
                passwordInput.val(''); // Pulisci il campo
                passwordInput.focus(); // Rimetti il focus
                setTimeout(() => errorMessage.remove(), 3000); // Rimuovi il messaggio dopo 3 secondi
            }
        });
    }

    // Gestore click per il pulsante "Annulla" nel popup
    if (cancelPasswordBtn.length) {
        cancelPasswordBtn.on('click', function () {
            hidePopup();
        });
    }

    // Gestore tasto "Invio" sul campo password
    if (passwordInput.length) {
        passwordInput.on('keypress', function (e) {
            if (e.which === 13) {
                submitPasswordBtn.click(); // Simula un click sul pulsante Accedi
            }
        });
    }

    // Gestione del tema dark mode per il popup
    // Questo listener è necessario perché il popup viene aggiunto dinamicamente
    // e deve reagire ai cambiamenti di tema del body.
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            if (passwordPopupOverlay.hasClass('show')) {
                if ($('body').hasClass('dark-mode')) {
                    passwordPopupOverlay.find('.password-popup-content').addClass('dark-mode');
                } else {
                    passwordPopupOverlay.find('.password-popup-content').removeClass('dark-mode');
                }
            }
        });
    }
});
