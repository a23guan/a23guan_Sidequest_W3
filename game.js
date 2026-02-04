// NOTE: Do NOT add setup() or draw() in this file
// setup() and draw() live in main.js
// This file only defines:
// 1) drawGame() → what the game screen looks like
// 2) input handlers → what happens when the player clicks or presses keys
// 3) helper functions specific to this screen

// ------------------------------
// Button data
// ------------------------------
// This object stores all the information needed to draw
// and interact with the button on the game screen.
// Keeping this in one object makes it easier to move,
// resize, or restyle the button later.

let counter = 0;
let apples = [];
let gameInitialized = false;

// ------------------------------
// SETUP
// ------------------------------

function drawGame() {
  if (!gameInitialized) {
    apples = [];
    counter = 0;

    for (let i = 0; i < 3; i++) {
      apples.push(new Apple());
    }

    gameInitialized = true;
  }

  background("#8ed1e0");
  // UI text
  fill(0);
  textSize(18);
  textAlign(CENTER, CENTER);
  text("Click on the apples to harvest them", width / 2, 20);
  text("Score: " + counter, 70, 20);

  // Update + draw apples
  for (let a of apples) {
    a.update();
    a.display();
  }

  // Ground
  push();
  rectMode(CORNER);
  fill("#4c8d1e");
  rect(0, height - 60, width, 60);
  pop();
}

// ------------------------------
// APPLE CLASS
// ------------------------------
class Apple {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = random(40, width - 40);
    this.y = random(-200, -40);
    this.speed = 2.5;
    this.size = 2;
  }

  update() {
    this.y += this.speed;

    // Respawn if it hits the ground
    if (this.y > height - 60 - 20) {
      this.reset();
    }
  }

  display() {
    drawApple(this.x, this.y, this.size);
  }

  isClicked(mx, my) {
    let d = dist(mx, my, this.x, this.y);
    return d < 20 * this.size;
  }
}

// ------------------------------
// INPUT
// ------------------------------
function handleGameClick() {
  for (let a of apples) {
    if (a.isClicked(mouseX, mouseY)) {
      counter++;
      if (counter >= 10) {
        currentScreen = "win";
        gameInitialized = false;
      }
      a.reset();
      break;
    }
  }
}

// ------------------------------
// DRAW APPLE
// ------------------------------
function drawApple(x, y, size) {
  push();
  translate(x, y);
  scale(size);

  noStroke();
  fill(220, 0, 0);
  ellipse(0, 0, 40, 40);

  fill(255, 80);
  ellipse(-8, -8, 10, 10);

  stroke(90, 50, 20);
  strokeWeight(3);
  line(0, -20, 0, -30);

  noStroke();
  fill(40, 160, 60);
  ellipse(10, -28, 15, 8);

  pop();
}
