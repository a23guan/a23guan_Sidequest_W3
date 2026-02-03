// NOTE: Do NOT add setup() or draw() in this file
// setup() and draw() live in main.js
// This file only defines:
// 1) drawStart() → what the start/menu screen looks like
// 2) input handlers → what happens on click / key press on this screen
// 3) a helper function to draw menu buttons

// ------------------------------------------------------------
// Start screen visuals
// ------------------------------------------------------------
// drawStart() is called from main.js only when:
// currentScreen === "start"
function drawStart() {
  // Background colour for the start screen
  background("#8ed1e0"); // soft teal background

  // ---- Title text ----
  fill(30, 50, 60);
  textSize(46);
  textAlign(CENTER, CENTER);
  text("Welcome to the Orchard!", width / 2, 250);

  // ---- Buttons (data only) ----
  // These objects store the position/size/label for each button.
  // Using objects makes it easy to pass them into drawButton()
  // and also reuse the same information for hover checks.
  const startBtn = {
    x: width / 2,
    y: 730,
    w: 240,
    h: 80,
    label: "START",
  };

  const startApple = {
    x: width / 2,
    y: 530,
    size: 3,
  };

  // Draw both buttons
  drawButton(startBtn);
  drawApple(startApple.x, startApple.y, startApple.size);

  // ---- Cursor feedback ----
  // If the mouse is over either button, show a hand cursor
  // so the player knows it is clickable.
  const over = isHover(startBtn);
  cursor(over ? HAND : ARROW);
}

// ------------------------------------------------------------
// Mouse input for the start screen
// ------------------------------------------------------------
// Called from main.js only when currentScreen === "start"
function startMousePressed() {
  // For input checks, we only need x,y,w,h (label is optional)
  const startBtn = { x: width / 2, y: 730, w: 240, h: 80 };

  // If START is clicked, go to the game screen
  if (isHover(startBtn)) {
    currentScreen = "game";
  }
}

// ------------------------------------------------------------
// Keyboard input for the start screen
// ------------------------------------------------------------
// Provides keyboard shortcuts:
// - ENTER starts the game
// - I opens instructions
function startKeyPressed() {
  if (keyCode === ENTER) {
    currentScreen = "game";
  }
}

// ------------------------------------------------------------
// Helper: drawButton()
// ------------------------------------------------------------
// This function draws a button and changes its appearance on hover.
// It does NOT decide what happens when you click the button.
// That logic lives in startMousePressed() above.
//
// Keeping drawing separate from input/logic makes code easier to read.
function drawButton({ x, y, w, h, label }) {
  rectMode(CENTER);

  // Check if the mouse is over the button rectangle
  const hover = isHover({ x, y, w, h });

  noStroke();

  // ---- Visual feedback (hover vs not hover) ----
  // This is a common UI idea:
  // - normal state is calmer
  // - hover state is brighter + more “active”
  //
  // We also add a shadow using drawingContext (p5 lets you access the
  // underlying canvas context for effects like shadows).
  if (hover) {
    fill(255, 200, 150, 220); // warm coral on hover

    // Shadow settings (only when hovered)
    drawingContext.shadowBlur = 20;
    drawingContext.shadowColor = color(255, 180, 120);
  } else {
    fill(255, 240, 210, 210); // soft cream base

    // Softer shadow when not hovered
    drawingContext.shadowBlur = 8;
    drawingContext.shadowColor = color(220, 220, 220);
  }

  // Draw the rounded rectangle button
  rect(x, y, w, h, 14);

  // Important: reset shadow so it does not affect other drawings
  drawingContext.shadowBlur = 0;

  // Draw the label text on top of the button
  fill(40, 60, 70);
  textSize(28);
  textAlign(CENTER, CENTER);
  text(label, x, y);
}

function drawApple(x, y, size) {
  push();
  translate(x, y);
  scale(size);

  // Apple body
  noStroke();
  fill(220, 0, 0);
  ellipse(0, 0, 40, 40);

  // Apple highlight
  fill(255, 80);
  ellipse(-8, -8, 10, 10);

  // Stem
  stroke(90, 50, 20);
  strokeWeight(3);
  line(0, -20, 0, -30);

  // Leaf
  noStroke();
  fill(40, 160, 60);
  ellipse(10, -28, 15, 8);

  pop();
}
