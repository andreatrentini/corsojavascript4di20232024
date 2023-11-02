function aggiungiLampadine() {
    // 1. Quante?
    let nrLampadine = document.getElementById('inputNrLampadine').value;
    let contenitore = document.getElementById('contenitore');

    for (let i = 0; i < nrLampadine; i++) {
        // 2. Creo un nuovo tag img
        let lampadina = document.createElement('img');
        lampadina.src = './images/spenta.png';
        contenitore.appendChild(lampadina);
    }
}