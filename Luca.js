$(document).ready(function () {
    const output = $('#output');

    /**
     * La variabile che mi informa del fatto che l'utente stia modificando o aggiungendo
     */
    let editMode = false;
    /**
     * Id del videgioco che sto modificando
     */
    let editId = -1;

    const dati = [
        { id: 1, titolo: 'Crash', genere: 'Platform', piattaforma: 'ps1', quantita: 1, prezzo: 49.99, dataUscita: '1998-01-05' },
        { id: 2, titolo: 'Mario Kart', genere: 'Kart', piattaforma: 'Nintendo Switch', quantita: 5, prezzo: 59.99, dataUscita: '2017-01-05' }
    ];
    let lastId = 2;

    /**
     * Fuzione per aggiungere nell'HTML un videogioco
     * @param {*} videogioco 
     */
    function aggiungiVideogioco(videogioco) {
        let row = `<tr id="riga-${videogioco.id}">`;
        // IN JS esiste il for sulle chiavi
        for (const k in videogioco) {
            row += `<td class="${k}">${videogioco[k]}</td>`;
        }
        row += `<td>
                    <button class="btn-elimina" data-id="${videogioco.id}">Elimina</button>
                </td>
                <td>
                    <button class="btn-modifica" data-id="${videogioco.id}">Modifica</button>
                </td>`;

        row += '</tr>';
        // se passo codice HTML al selettore, lui MI genera un elemento
        $(row)
            .hide()
            .appendTo(output)
            .fadeIn();
    }

    // Metto tutto ciò che serve ad inizializzare la pagina
    function init() {
        for (const videogioco of dati) {
            aggiungiVideogioco(videogioco);
        }
    }
    // Inizializzo la pagina
    init();

    $('#crud').click(function () {
        let id = editMode ? editId : ++lastId;
        const titolo = $('#titolo').val();
        const genere = $('#genere').val();
        const quantita = $('#quantita').val();
        const piattaforma = $('input[name="piattaforma"]').val();
        const prezzo = $('#prezzo').val();
        const dataUscita = $('#data-uscita').val();
        const videogioco = { id, titolo, genere, piattaforma, quantita, prezzo, dataUscita };
        // i valori delle "variabili" vengono assegnati

        if (editMode) {
            for (let i = 0; i < dati.length; i++) {
                if (dati[i].id = videogioco.id) {
                    dati[i].titolo = videogioco.titolo;
                    dati[i].genere = videogioco.genere;
                    dati[i].quantita = videogioco.quantita;
                    dati[i].piattaforma = videogioco.piattaforma;
                    dati[i].prezzo = videogioco.prezzo;
                    dati[i].dataUscita = videogioco.dataUscita;
                    break;
                }
            }
            editVideogioco(videogioco);
            editMode = false;
            editId = -1;
            $(this).text('Aggiungi');
        } else { // se sto aggiungendo va bene la parte di prima
            // const videogioco = {id: id, titolo: titolo, ... tutte le altre proprietà}

            // direttamente ad una proprietà con lo stesso nome, è una shortcut di JS
            dati.push(videogioco);
            aggiungiVideogioco(videogioco);
        }
        $('#titolo').val('');
        $('#genere').val('');
        $('#quantita').val('');
        $('input[name="piattaforma"]').val('');
        $('#prezzo').val('');
        $('#data-uscita').val('');
    });

    output.on('click', '.btn-elimina', function () {
        const btn = $(this);
        const id = +btn.attr('data-id'); // parsato a numero col "+"
        // Cerco un videogioco per id e lo elimino dall'array
        eliminaVideogioco(id);
        btn.parent()
            .parent()
            .fadeOut(); // Ho recuperato il nonno del bottone e l'ho fatto scomparire
    });

    output.on('click', '.btn-modifica', function () {
        // cambio lo stato a true
        editMode = true;
        // cambio il testo del bottone a 'Modifica'
        $('#crud').text('Modifica');
        const id = +$(this).attr('data-id');
        editId = id;
        const videogioco = findVideogioco(id);
        $('#titolo').val(videogioco.titolo);
        $('#genere').val(videogioco.genere);
        $('#quantita').val(videogioco.quantita);
        $('input[name="piattaforma"]').val(videogioco.piattaforma);
        $('#prezzo').val(videogioco.prezzo);
        $('#data-uscita').val(videogioco.dataUscita);
    });

    function eliminaVideogioco(id) {
        for (let i = 0; i < dati.length; i++) {
            if (dati[i].id === id) {
                // allora elimino e termino!
                dati.splice(i, 1);
                break;
            }
        }
    }

    function findVideogioco(id) {
        for (let i = 0; i < dati.length; i++) {
            if (dati[i].id === id) {
                return dati[i];
            }
        }
        // in JS non è obbligatorio fare return, di default se una funzione non fare return 
        // farà return undefined
    }

    function editVideogioco(videogioco) {
        const riga = $(`#riga-${videogioco.id}`);
        riga.children('.titolo').text(videogioco.titolo);
        riga.children('.genere').text(videogioco.genere);
        riga.children('.quantita').text(videogioco.quantita);
        riga.children('.piattaforma').text(videogioco.piattaforma);
        riga.children('.prezzo').text(videogioco.prezzo);
        riga.children('.dataUscita').text(videogioco.dataUscita);
    }
});