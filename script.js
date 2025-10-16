// hier wordt de klasse Raster gedefinieerd
class Raster {
  constructor() {
    this.aantalRijen = 12;
    this.aantalKolommen = 18;
    this.celGrootte = null;
  }

  // bereken de grootte van een cel
  berekenCelGrootte() {
    this.celGrootte = canvas.width / this.aantalKolommen;
  }

  // teken het raster
  teken() {
    push();
    noFill();
    stroke('grey');
    for (var rij = 0; rij < this.aantalRijen; rij++) {
      for (var kolom = 0; kolom < this.aantalKolommen; kolom++) {
         if (rij == 0 || rij == 17 || kolom == 0 || rij == 14) {
           fill ('blue')
          stroke('black');
        rect(kolom * this.celGrootte, rij * this.celGrootte, this.celGrootte, this.celGrootte);
      }
    }
    pop();
  }
}
}

// hier wordt de klasse Jos gedefinieerd
class Jos {
  constructor() {
    this.x = 400;
    this.y = 300;
    this.animatie = [];
    this.frameNummer = 3;
    this.stapGrootte = null;
    this.gehaald = false;
    this.levens = 3;
  }

  tekenLevens() {
    fill('Black');
    textAlign(LEFT, TOP);
    textSize(20);
    textFont('Verdana');
    text('Levens: ' + this.levens, 10, 20);
  }

  beweeg() {
    if (keyIsDown(65)) { this.x -= this.stapGrootte; this.frameNummer = 2; }
    if (keyIsDown(68)) { this.x += this.stapGrootte; this.frameNummer = 1; }
    if (keyIsDown(87)) { this.y -= this.stapGrootte; this.frameNummer = 4; }
    if (keyIsDown(83)) { this.y += this.stapGrootte; this.frameNummer = 5; }

    this.x = constrain(this.x, 0, canvas.width - raster.celGrootte);
    this.y = constrain(this.y, 0, canvas.height - raster.celGrootte);

    if (this.x >= canvas.width - raster.celGrootte) {
      this.gehaald = true;
    }
  }

  wordtGeraakt(vijand) {
    if (this.x == vijand.x && this.y == vijand.y) {
      this.levens -= 1;
    }
    if (this.levens <= 0) {
      this.nietGehaald = true;
    }
    return (this.x == vijand.x && this.y == vijand.y);
  }

  toon() {
    image(this.animatie[this.frameNummer], this.x, this.y, raster.celGrootte, raster.celGrootte);
  }
}

// simpele klasse Piramide (op z’n kop)
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

 
    for (var rij = 0; rij < this.lagen; rij++) {
      var aantalBlokken = this.lagen - rij;
      var offset = (this.breedte / 2) * rij;

      for (var kol = 0; kol < aantalBlokken; kol++) {
        rect(offset + kol * this.breedte, rij * this.hoogte, this.breedte, this.hoogte);
      }
    }

    pop();
  }
}

// klasse Vijand
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
    this.x = constrain(this.x, 0, canvas.width - raster.celGrootte);
    this.y = constrain(this.y, 0, canvas.height - raster.celGrootte);
  }

  toon() {
    image(this.sprite, this.x, this.y, raster.celGrootte, raster.celGrootte);
  }
}

function preload() {
  brug = loadImage('images/backgrounds/dame_op_brug_1800.jpg');
}

var raster, eve, alice, bob, cindy, piramide;

function setup() {
  canvas = createCanvas(900, 600);
  canvas.parent();
  frameRate(10);
  textFont('Verdana');
  textSize(90);

  raster = new Raster();
  raster.berekenCelGrootte();

  eve = new Jos();
  eve.stapGrootte = 1 * raster.celGrootte;
  for (var b = 0; b < 6; b++) {
    var frameEve = loadImage('images/sprites/Eve100px/Eve_' + b + '.png');
    eve.animatie.push(frameEve);
  }

  alice = new Vijand(700, 200);
  alice.stapGrootte = eve.stapGrootte;
  alice.sprite = loadImage('images/sprites/Alice100px/Alice.png');

  bob = new Vijand(600, 400);
  bob.stapGrootte = eve.stapGrootte;
  bob.sprite = loadImage('images/sprites/Bob100px/Bob.png');

  cindy = new Vijand(500, 100);
  cindy.stapGrootte = eve.stapGrootte;
  cindy.sprite = loadImage('images/sprites/Alice100px/Alice.png');

  // piramide aanmaken — punt naar beneden
  piramide = new Piramide(100, 100, 5, 90);
}

function draw() {
  background(brug);
  raster.teken();

  // teken piramide op zijn kop
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
    noLoop();
  }

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