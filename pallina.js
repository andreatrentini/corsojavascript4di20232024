//@ts-check
class Spostamento {
    constructor() {
        this.x = -10 + Math.floor(Math.random() * 21);
        this.y = -10 + Math.floor(Math.random() * 21);
        if (this.x == 0 && this.y == 0) {
            this.x = 10;
        }
    }
}

class Posizione {
    constructor(dim) {
        this.x = Math.floor(Math.random() * (window.innerWidth - dim))
        this.y = Math.floor(Math.random() * (window.innerHeight - dim));
    }

    get left() {
        return this.x + 'px';
    }

    get top() {
        return this.y + 'px';
    }
}

class Pallina {  
    
    
    constructor(image, dimensione) {
        this.dim = dimensione;        

        this.posizione = new Posizione(dimensione);
        this.spostamento = new Spostamento();        
        
        this.image = new Image(this.dim);
        this.image.src = image;
        this.image.style.position = 'absolute';
        this.image.style.left = this.posizione.left;
        this.image.style.top = this.posizione.top;
        
        document.getElementsByTagName('body')[0].appendChild(this.image);
    }

    sposta() {
        // 1. vedo se sono arrivato al limite
        if (this.posizione.x <= 0 || this.posizione.x >= window.innerWidth - this.dim) {
            this.spostamento.x *= -1;
        }

        if (this.posizione.y <= 0 || this.posizione.y >= window.innerHeight - this.dim) {
            this.spostamento.y *= -1;
        }

        this.posizione.x += this.spostamento.x;
        this.posizione.y += this.spostamento.y;

        this.image.style.left = this.posizione.left;
        this.image.style.top = this.posizione.top;
    }
}

class Palline {
    constructor(image, dim, numero) {
        this.palline = [];
        for (let i = 0; i < numero; i++) {
            this.palline.push(new Pallina(image, dim))            
        }
    }

    sposta() {
        this.palline.forEach(pallina => {
            pallina.sposta()
        });
    }
}

//var pallina = new Pallina('./images/pallina.png', 48);
var palline = new Palline('./images/pallina.png', 48, 50);

setInterval(() => {
    palline.sposta();
}, 40);



/* var body = document.getElementsByTagName('body')[0];

var pallina = document.createElement('img');

var posX = 0;
var posY = 0;

pallina.src = './images/pallina.png';
pallina.style.position = 'absolute';
pallina.style.left = posX+'px';
pallina.style.top = posY+'px';

body.appendChild(pallina);

setInterval(() => {
    posX++;
    posY++;
    pallina.style.left = posX+'px';
    pallina.style.top = posY+'px';
}, 40)
 */