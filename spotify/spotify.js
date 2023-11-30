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

setTimeout(() => {
    searchArtists('salmo')
}, 1000)
