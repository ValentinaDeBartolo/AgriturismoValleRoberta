require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const path = require('path'); // Necessario per servire file statici

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Aggiunto per servire i file statici dalla cartella 'public'
app.use(express.static(path.join(__dirname, 'public')));

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
});

pool.connect((err, client, release) => {
    if (err) {
        return console.error('Errore nella connessione al database', err.stack);
    }
    console.log('Connesso al database PostgreSQL!');
    release();
});


// Registrazione 
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'Tutti i campi sono obbligatori' });
    }

    try {
        const checkEmail = await pool.query('SELECT email FROM utenti_registrati WHERE email = $1', [email]);
        if (checkEmail.rows.length > 0) {
            return res.status(409).json({ success: false, message: 'Email già registrata' });
        }

        const result = await pool.query(
            'INSERT INTO utenti_registrati (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
            [name, email, password]
        );
        res.status(201).json({ success: true, message: 'Registrazione riuscita', user: result.rows[0] });
    } catch (err) {
        console.error("Errore durante la registrazione:", err);
        res.status(500).json({ success: false, message: 'Errore del server durante la registrazione' });
    }
});

// Login (nessuna modifica qui)
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email e password sono obbligatorie' });
    }

    try {
        const result = await pool.query('SELECT * FROM utenti_registrati WHERE email = $1', [email]);

        if (result.rows.length === 0 || result.rows[0].password !== password) {
            return res.status(401).json({ success: false, message: 'Credenziali non valide (email o password errati)' });
        }

        res.json({ success: true, message: 'Login riuscito', user: { id: result.rows[0].id, name: result.rows[0].name, email: result.rows[0].email } });
    } catch (err) {
        console.error("Errore nel login:", err);
        res.status(500).json({ success: false, message: 'Errore del server durante il login' });
    }
});

// Prenotazione
app.post('/reservations', async (req, res) => {
    const { name, email, phone, people, arrival, departure, notes } = req.body;

    const user_id = 1; // User ID statico per ora.

    // La validazione usa i nomi dei campi come arrivano dal frontend.
    if (!name || !email || !phone || !people || !arrival || !departure || !notes) {
        return res.status(400).json({
            success: false, message:
                'Tutti i campi obbligatori (nome, email, telefono, persone, arrivo, partenza, note) devono essere compilati.'
        });
    }

    try {
        const result = await pool.query(
            // *** QUI ABBIAMO I NOMI DELLE COLONNE ESATTI DEL DATABASE ***

            `INSERT INTO prenotazioni (
                nome,       
                email,
                telefono,   
                persone,
                arrivo,
                partenza,
                note
            ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
            // *** E QUI PASSiamo I VALORI NELL'ORDINE CORRETTO AI PLACEHOLDER ($1, $2, ...) ***
            [name, email, phone, people, arrival, departure, notes]
        );
        res.status(201).json({ success: true, message: 'Prenotazione inviata con successo!', id: result.rows[0].id });
    } catch (err) {
        console.error("Errore durante la prenotazione:", err);
        console.error("Dettagli errore DB:", err);
        if (err.code === '42703') {
            return res.status(500).json({ success: false, message: `Errore del server: colonna "${err.column || 'sconosciuta'}" non trovata nel database. (Verifica i nomi delle colonne nella query INSERT e nel tuo DB.)` });
        }
        res.status(500).json({ success: false, message: 'Errore del server durante la prenotazione.' });
    }
});
// Recupera tutte le prenotazioni per DataTables
app.get('/api/reservations', async (req, res) => {
    let client;
    try {
        client = await pool.connect();

        const result = await client.query(
            'SELECT id, nome, email, telefono, persone AS people, arrivo AS arrival, partenza AS departure, note AS notes, created_at FROM prenotazioni ORDER BY created_at DESC'
        );

        res.json({ success: true, reservations: result.rows });
    } catch (err) {
        console.error("Errore durante il recupero delle prenotazioni:", err);
        res.status(500).json({ success: false, message: 'Errore del server durante il recupero delle prenotazioni.' });
    } finally {
        if (client) {
            client.release();
        }
    }
});
// Avvia il server
app.listen(PORT, () => {
    console.log(`Server in ascolto su http://localhost:${PORT}`);
});