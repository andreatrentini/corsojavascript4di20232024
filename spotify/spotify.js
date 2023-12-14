const clientId = 'f412d48b9461494e9ec79dc2ed651967';
const clientSecret = 'e07fc0bc7fea4b79ac7290f7ef34c9e6';
const tokenURL = 'https://accounts.spotify.com/api/token';
const searchURL = 'https://api.spotify.com/v1/search?q=';
const tokenParams = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials&client_id=' + clientId + '&client_secret=' + clientSecret
};

var tokenBearer;

function getTokenBearer() {
    fetch(tokenURL, tokenParams)
        .then(response => response.json())
        .then(token => {
            tokenBearer = token;   
            console.log(tokenBearer)         
            setInterval(() => {
                fetch(tokenURL, tokenParams)
                    .then(response => response.json())
                    .then(token => {
                        tokenBearer = token;
                        console.log(tokenBearer)
                    })
            }, (tokenBearer.expires_in - 5) * 1000)
        })
}

function searchArtists(artistName) {
    fetch(searchURL + 'artist:' + artistName + '&type=artist', {
        headers: {
            Authorization: tokenBearer.token_type + ' ' + tokenBearer.access_token
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
}

getTokenBearer();

function searchArtistClick() {
    // recuperiamo dalla input il nome dell'artista da cercare
    let nomeArtista = document.getElementById('input-name').value;

    // eseguiamo la funzione che invia la chiamata alla API di spotify
    searchArtists(nomeArtista);
}

function createArtistCard(artist) {
    /*
<div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
    */
    let card = document.createElement('div');
    card.className = 'card';
    let image = document.createElement('img');
    image.className = 'card-img-top';
    image.src = artis.images[1].url;
    image.alt = artist.name;
    card.appendChild(image);
    let divBody = document.createElement('div');
    divBody.className = 'card-body';
    let title = document.createElement('h5');
    title.className = 'card-title';
    title.innerText = artist.name;
    divBody.appendChild(title);
    let text = document.createElement('p');
    text.className = 'card-text';
    /* text.innerText = artist.genres.reduce((generi, genre) => {
        return generi + ' - ' + genre;
    }) */
    let generi = '';
    artist.genres.forEach(genere => {
        generi = generi + ' - ' + genere;
    });
    text.innerText = generi;
    divBody.appendChild(text);
    card.appendChild(divBody);
    return card;
}