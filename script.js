var xDiego = 225;
var yDiego = 375;
var snelheidDiego = 17;

function setup() {
  canvas = createCanvas(450,450);
  canvas.parent();
  textFont("Verdana");
  textSize(14);
  frameRate(20);
}

function draw() {
  background('lavender');
  fill('black');

  yDiego-=snelheidDiego;
  snelheidDiego -= 0.5;

  xDiego = constrain(xDiego,75,width - 75);
  yDiego = constrain(yDiego,75,height - 75);
  text("x = " + round(xDiego) + " y = " + yDiego + " snelheid = " + snelheidDiego,10,20);

  translate(xDiego,yDiego);

  // in de volgende regels wordt Diego getekend

  push();
  scale(1); 
  noStroke();
  fill('indianred');
  ellipse(0,0,150);
  fill('slategray');
  ellipse(-20,-30,50);
  ellipse(20,-30,50);
  fill('white');
  ellipse(-20,-25,20,40);
  ellipse(20,-25,20,40);
  fill('orange');
  ellipse(0,10,50);
  stroke('slategray');
  strokeWeight(10);
  fill('white');
  arc(0, 40, 80, 40, 0, PI, CHORD);
  pop();
  // einde tekenen Diego

}