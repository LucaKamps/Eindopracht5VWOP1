// Klasse Raster
class Raster {
  constructor() {
    this.aantalRijen = 12;
    this.aantalKolommen = 18;
    this.celGrootte = null;
  }

  // bereken de grootte van een cel
  berekenCelGrootte() {
    this.celGrootte = width / this.aantalKolommen;
  }

  // teken het raster
  teken() {
    push();
    for (let rij = 0; rij < this.aantalRijen; rij++) {
      for (let kolom = 0; kolom < this.aantalKolommen; kolom++) {
        if (rij == 0 || rij == this.aantalRijen - 1 || kolom == 0 || kolom == this.aantalKolommen - 1) {
          fill('blue');
          stroke('black');
        } else {
          noFill();
          stroke('grey');
        }
        rect(kolom * this.celGrootte, rij * this.celGrootte, this.celGrootte, this.celGrootte);
      }
    }
    pop();
  }
}

// klasse Jos
class Jos {
  constructor() {
    this.x = 400;
    this.y = 300;
    this.animatie = [];
    this.frameNummer = 3;
    this.stapGrootte = null;
    this.gehaald = false;
    this.nietGehaald = false;
    this.levens = 3;
  }

  tekenLevens() {
    fill('black');
    textAlign(LEFT, TOP);
    textSize(20);
    textFont('Verdana');
    text('Levens: ' + this.levens, 10, 20);
  }

  beweeg() {
    if (keyIsDown(65)) this.x -= this.stapGrootte;
    if (keyIsDown(68)) this.x += this.stapGrootte;
    if (keyIsDown(87)) this.y -= this.stapGrootte;
    if (keyIsDown(83)) this.y += this.stapGrootte; 

    this.x = constrain(this.x, 0, width - raster.celGrootte);
    this.y = constrain(this.y, 0, height - raster.celGrootte);

    if (this.x >= width - raster.celGrootte) this.gehaald = true;
  }

  wordtGeraakt(vijand) {
    if (dist(this.x, this.y, vijand.x, vijand.y) < raster.celGrootte / 2) {
      this.levens -= 1;
      return true;
    }
    if (this.levens <= 0) this.nietGehaald = true;
    return false;
  }

  toon() {
    image(this.animatie[this.frameNummer], this.x, this.y, raster.celGrootte, raster.celGrootte);
  }
}

// Klasse Piramide
class Piramide {
  constructor(x, y, lagen, breedte) {
    this.x = x;
    this.y = y;
    this.lagen = lagen;
    this.breedte = breedte;
    this.hoogte = breedte / 2;
  }

  tekenOmgekeerd() {
    push();
    fill('lightslategray');
    stroke('darkslategray');
    translate(this.x, this.y);

    for (let rij = 0; rij < this.lagen; rij++) {
      let aantalBlokken = this.lagen - rij;
      let offset = (this.breedte / 2) * rij;
      for (let kol = 0; kol < aantalBlokken; kol++) {
        rect(offset + kol * this.breedte, rij * this.hoogte, this.breedte, this.hoogte);
      }
    }

    pop();
  }
}

// Klasse Vijand
class Vijand {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = null;
    this.stapGrootte = null;
  }

  beweeg() {
    this.x += floor(random(-1, 2)) * this.stapGrootte;
    this.y += floor(random(-1, 2)) * this.stapGrootte;
    this.x = constrain(this.x, 0, width - raster.celGrootte);
    this.y = constrain(this.y, 0, height - raster.celGrootte);
  }

  toon() {
    image(this.sprite, this.x, this.y, raster.celGrootte, raster.celGrootte);
  }
}

let brug;
function preload() {
  brug = loadImage('images/backgrounds/dame_op_brug_1800.jpg');
}
let raster, eve, alice, bob, cindy, piramide;

// functie setup
function setup() {
  createCanvas(900, 600);
  frameRate(10);
  textFont('Verdana');
  textSize(90);

  raster = new Raster();
  raster.berekenCelGrootte();

  // laad de animatie van Jos
  eve = new Jos();
  eve.stapGrootte = raster.celGrootte;
  for (let b = 0; b < 6; b++) {
    let frameEve = loadImage('images/sprites/Eve100px/Eve_' + b + '.png');
    eve.animatie.push(frameEve);
  }
  
// hier worden de vijanden aangemaakt
  alice = new Vijand(700, 200);
  alice.stapGrootte = eve.stapGrootte;
  alice.sprite = loadImage('images/sprites/Alice100px/Alice.png');

  bob = new Vijand(600, 400);
  bob.stapGrootte = eve.stapGrootte;
  bob.sprite = loadImage('images/sprites/Bob100px/Bob.png');

  cindy = new Vijand(500, 100);
  cindy.stapGrootte = eve.stapGrootte;
  cindy.sprite = loadImage('images/sprites/Alice100px/Alice.png');

  piramide = new Piramide(100, 100, 5, 90);
}

// hier wordt alles getekend en in beweging gebracht
function draw() {
  if (
    floor(mouseY / raster.celGrootte) == 0 ||
    floor(mouseY / raster.celGrootte) == raster.aantalRijen - 1 ||
    floor(mouseX / raster.celGrootte) == 0 ||
    floor(mouseX / raster.celGrootte) == raster.aantalKolommen - 1
  ) {
    background('yellow');  
  } else {
    background(brug);      
  }
  raster.teken();
  piramide.tekenOmgekeerd();

  eve.tekenLevens();
  eve.beweeg();
  alice.beweeg();
  bob.beweeg();
  cindy.beweeg();

  eve.toon();
  alice.toon();
  bob.toon();
  cindy.toon();

  if (eve.wordtGeraakt(alice) || eve.wordtGeraakt(bob) || eve.wordtGeraakt(cindy)) {
  
  }
// hier wordt een tekst getoond als je gewonnen of verloren hebt
  if (eve.gehaald) {
    background('green');
    fill('white');
    text('Je hebt gewonnen!', 30, 300);
    noLoop();
  }

  if (eve.nietGehaald) {
    background('red');
    fill('white');
    text('Je hebt verloren!', 30, 300);
    noLoop();
  }
}
