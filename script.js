// 1. recuperare dal DOM il tag div da modificare
var elementoDiv = document.getElementById('messaggio');

// 2. modifico il tag

elementoDiv.innerText = 'Hello world!';
elementoDiv.innerHTML = '<b>Hello world!</b>';


function componiSaluto() {
    // 1. Recuperare il nome inserito
    let nome = document.getElementById('inputNome').value;
    
    // 2. Inserire nel div saluto un messaggio di benvenuto

    let divSaluto = document.getElementById('saluto');
    divSaluto.innerText = 'Ciao ' + nome + ', benvenuto nel sito.';    
}

var lampadinaAccesa = false; 

function accendiSpegniLampadina() {
    let lampadina = document.getElementById('imgLampadina');
    if (lampadinaAccesa) {
        lampadina.src = './images/spenta.png';
    }
    else {
        lampadina.src = './images/accesa.png';
    }
    lampadinaAccesa = !lampadinaAccesa;
}

