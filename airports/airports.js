var airports;

function getAirports() {
    fetch('../assets/airports.json')
    .then(response => response.json())
    .then(dati => {
        // I dati sono arrivati! Adesso posso visualizzarli
        airports = dati.map(airport => {
            return {id: airport.id, 
                    code: airport.code, 
                    municipality: airport.municipality, 
                    name: airport.name, 
                    elevation: parseInt(airport.elevation) 
                }
        });
        let div = document.getElementById('principale');
        div.appendChild(createTable(airports));
        console.log(airports);

    })
}

function createHeader() {
    let header = document.createElement('tr');
    header.innerHTML = '<th>#</th><th>Code</th><th>Municipality</th><th>Name</th><th>Elevation</th>';
    return header;
}

function createRow(airport) {
    let row = document.createElement('tr');    
    let td = document.createElement('td');
    td.innerText = airport.id;
    row.appendChild(td);
    td = document.createElement('td');
    td.innerText = airport.code;
    row.appendChild(td);
    td = document.createElement('td');
    td.innerText = airport.municipality;
    row.appendChild(td);
    td = document.createElement('td');
    td.innerText = airport.name;
    row.appendChild(td);
    td = document.createElement('td');
    td.innerText = airport.elevation;
    row.appendChild(td);

    return row;
}

function createTable(airports) {
    let table = document.createElement('table');
    table.appendChild(createHeader());
    airports.forEach(airport => {
        table.appendChild(createRow(airport));
    });
    return table;
}

function elevationFilter() {
    let minElevation = document.getElementById('elevation').value;
    let filteredAirports = airports.filter(airport => airport.elevation > minElevation);
    let div = document.getElementById('principale');
    div.innerText = '';
    div.appendChild(createTable(filteredAirports));
}

getAirports();