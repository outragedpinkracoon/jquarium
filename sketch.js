/*
  P5 makes use of a bunch of global variables, so we declare
  the ones we use in the comment below to keep the JS linter happy.
*/
/* global
  background,
  createCanvas,
  ellipse,
  line,
  resizeCanvas,
  windowWidth,
  windowHeight,
 */

class Fish {
  constructor() {
    this.location = { x: Math.random(), y: Math.random() }
  }
  
  draw() {
    ellipse(
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}

function draw() {
  // Stub - draw a circle in the middle of the screen
  drawBackground()
  ellipse(windowWidth / 2, windowHeight / 2, 100, 100)
  line(0, windowHeight / 2, windowWidth, windowHeight / 2)
}

function drawBackground() {
  background('#7BBBDD')
}
