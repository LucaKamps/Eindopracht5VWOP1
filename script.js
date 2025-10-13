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
    stroke('blue');
    for (var rij = 0;rij < this.aantalRijen;rij++) {
      for (var kolom = 0;kolom < this.aantalKolommen;kolom++) {
        rect(kolom*this.celGrootte,rij*this.celGrootte,this.celGrootte,this.celGrootte);
      }
    }
    pop();
  }
}

// hier wordt de klasse Jos gedefinieerd
class Jos {
  constructor() {
    this.x = 400;
    this.y = 300;
    this.animatie = [];
    this.frameNummer =  3;
    this.stapGrootte = null;
    this.gehaald = false;
    this.levens = 3;
   }
  
  // teken het aantal levens
  tekenLevens() {
  fill('Black');
  textAlign(LEFT,TOP);
  textSize(20);
  textFont('Verdana');
  text("Levens: " + this.levens, 10, 20)
  }
  
  // beweeg Jos met de pijltjestoetsen

  beweeg() {
    if (keyIsDown(65) === true) {
      this.x -= this.stapGrootte;
      this.frameNummer = 2;
    }
    if (keyIsDown(68) === true) {
      this.x += this.stapGrootte;
      this.frameNummer = 1;
    }
    if (keyIsDown(87) === true) {
      this.y -= this.stapGrootte;
      this.frameNummer = 4;
    }
    if (keyIsDown(83) === true) {
      this.y += this.stapGrootte;
      this.frameNummer = 5;
    }

    this.x = constrain(this.x,0,canvas.width);
    this.y = constrain(this.y,0,canvas.height - raster.celGrootte);

    if (this.x == canvas.width) {
      this.gehaald = true;
    }
  }
  // controleer of Jos geraakt wordt door een vijand

  wordtGeraakt(vijand) {
    if (this.x == vijand.x && this.y == vijand.y) {
    this.levens = this.levens - 1;
    }
    if (this.levens == 0) {
        this.nietGehaald = true;
    }
  }

  toon() {
image(this.animatie[this.frameNummer],this.x,this.y,raster.celGrootte,raster.celGrootte);
  }
}
// hier wordt de klasse piramide gedefinieerd
class piramide {
  constructor(x,y){
  this.aantalLagen = 5;
  this.breedte = 90;
  this.hoogte = null;
}
}
  function setup() {
    hoogte = breedte/2;
    canvas = createCanvas(this.aantalLagen*this.breedte + 1,tis.aantalLagen*this.hoogte + 1);
    background('silver');
    fill('lightslategray');
    stroke('darkslategray');  
    canvas.parent('');
    noLoop();
  }

  function draw() {
    translate(0,height - this.hoogte);
    tekenPiramide(this.aantalLagen);
  }

  function tekenPiramide(n) {
    if (n>0) {
      for (var nr = 0;nr < n;nr++) {
        rect(nr*this.breedte,0,this.breedte,this.hoogte);
      }
      translate(this.breedte / 2,-this.hoogte);
      n--;
      tekenPiramide(n);
    }
  }
// hier wordt de klasse Vijand gedefinieerd
class Vijand {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.sprite = null;
    this.stapGrootte = null;
  }

  // beweeg de vijand willekeurig

  beweeg() {
    this.x += floor(random(-1,2))*this.stapGrootte;
    this.y += floor(random(-1,2))*this.stapGrootte;

    this.x = constrain(this.x,0,canvas.width - raster.celGrootte);
    this.y = constrain(this.y,0,canvas.height - raster.celGrootte);
  }

  toon() {
    image(this.sprite,this.x,this.y,raster.celGrootte,raster.celGrootte);
  }
}

function preload() {
  brug = loadImage("images/backgrounds/dame_op_brug_1800.jpg");
}

// hier worden de objecten gedefinieerd
function setup() {
  canvas = createCanvas(900,600);
  canvas.parent();
  frameRate(10);
  textFont("Verdana");
  textSize(90);

  raster = new Raster(6,9);

  raster.berekenCelGrootte();

  eve = new Jos();
  eve.stapGrootte = 1*raster.celGrootte;
  for (var b = 0;b < 6;b++) {
    frameEve = loadImage("images/sprites/Eve100px/Eve_" + b + ".png");
    eve.animatie.push(frameEve);
  }
  // Extra vijanden Alice en Bob

  alice = new Vijand(700,200);
  alice.stapGrootte = 1*eve.stapGrootte;
  alice.sprite = loadImage("images/sprites/Alice100px/Alice.png");

  bob = new Vijand(600,400);
  bob.stapGrootte = 1*eve.stapGrootte;
  bob.sprite = loadImage("images/sprites/Bob100px/Bob.png");  

  // Extra vijand Cindy
  cindy = new Vijand(500,100);
  cindy.stapGrootte = 1*eve.stapGrootte;
  cindy.sprite = loadImage("images/sprites/Alice100px/Alice.png");
}
function draw() {
  background(brug);
  raster.teken();
  eve.tekenLevens();
  eve.beweeg();
  alice.beweeg();
  bob.beweeg();
  cindy.beweeg();
  eve.toon();
  alice.toon();
  bob.toon();
  cindy.toon();
  

  if (eve.wordtGeraakt(alice) || eve.wordtGeraakt(bob) || eve.wordtGeraakt(cindy)){
    noLoop();
  }
  // geeft text als je gewonnen hebt

  if (eve.gehaald) {
    background('green');
    fill('white');
    text("Je hebt gewonnen!",30,300);
    noLoop();
  }
  if (eve.nietGehaald) {
    background('red');
    fill('white');
    text("Je hebt verloren!",30,300);
  }
}