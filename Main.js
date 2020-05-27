$(document).ready(function(){
//Ora cu creiamo una stringa fissa con la cornice della tabella
    const tabella = $('#tabella');    
    const tasti = `<td><button id = "elimina" data-id = "{ID}">Elimina</button>
    <button id = "modifica" data-id = "{ID}">Modifica</button></td>`
//conviene creare array perchè JS lo gestisce come una mappa
    const dati = [
        {
            id:2,
            materia:'Inglese',
            punteggio:6.25,
            dataConseguimento:'2010-02-21'
        },
        {
            id:3,
            materia:'Inglese',
            punteggio:7.25,
            dataConseguimento:'2010-02-21'
        },
        {
            id:4,
            materia:'Latino',
            punteggio:4.25,
            dataConseguimento:'2010-03-21'}
    ];
    console.log(dati);
    function aggiungiVoto(voto){
        let colonna = `<tr>`;
        for (const k in voto){
            //creo un'iterazione su Array usando k e inserisco i valori
            //In questo modo fa ripartire una riga nuova ogni volta che 
            //la graffa si chiude
            colonna += `<td>${voto[k]}</td>`;
        }
        colonna +=tasti;
        tasti.replace('{ID}',`${voto.id}`);
        colonna += `</tr>`;
        console.log('Aggiunto');

        //Una volta creata la scrittura la devo ripassare a html
        //e lo faccio nel seguente modo
        $(colonna)
            .hide() //nasconde la colonna quando non c'è?
            .appendTo(tabella) //Attacca a seguito di quello che ho già scritto
            .fadeIn();//Come hide serve per animazione 
    }
    function inserisci(){
        //Roteo sul mioi array creato ma sulla variabile voto
        for (const voto of dati){
            //devo dirgli di aggiungere e basta, ma ho creato la funzione
            //ad hoc per questa cosa
            aggiungiVoto(voto);
        }
    }
    //ho creato il metodo devo solo farlo andare, quindi lo invoco
    inserisci();
    $('#aggiungi').click(function aggiungi(){
        //Devo prendere i valori dalla pagina
        const id = $('#id').val();
        console.log(id);
        const materia = $('#materia').val();
        console.log(materia);
        const punteggio = $('#punteggio').val();
        console.log(punteggio);
        const dataConseguimento = $('#data').val();
        console.log(dataConseguimento);
        const voto = {id,materia,punteggio,dataConseguimento};
        aggiungiVoto(voto);
        $('#id').val('');
        $('#materia').val('');
        $('#punteggio').val('');
        $('#data').val('');
        $('#id').focus();
    });
    /*
          output.on('click', '.btn-elimina', function () {
        const btn = $(this);
        const id = +btn.attr('data-id'); // parsato a numero col "+"
        // Cerco un videogioco per id e lo elimino dall'array
        eliminaVideogioco(id);
        btn.parent()
            .parent()
            .fadeOut(); // Ho recuperato il nonno del bottone e l'ho fatto scomparire
    });
     
    $('#elimina').click(function elimina(){
        const button = $(this);
        const id = +elimina.attr('data-id'); //Questo seleziona il l'id che ci serve
        //passato per tramite creazione, il + serve per parsarlo a numero
        //Dobbiamo trovare il voto che ci serve
        function trovaVoto(id){
            voto[id].
        }
        button.parent()
            .parent()
            .fadeOut()
    });*/
});