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
    this.size = 10 + (Math.random() * 60)
    this.speed = 10
    this.currentShoop = null
  }
  
  draw() {
    const { x, y } = this.location
    const windowX = x * windowWidth
    const windowY = y * windowHeight
    ellipse(windowX, windowY, this.size, this.size)
  }
  
  update() {
    this.updateShoop()
  }
  
  shoop() {
    this.currentShoop = { x: Math.random(), y: Math.random() }
  }
  
  updateShoop() {
    if (!this.currentShoop) { return }
    const windowXMe = this.location.x * windowWidth
    const windowYMe = this.location.y * windowHeight
    const windowXShoop = this.currentShoop.x * windowWidth
    const windowYShoop = this.currentShoop.y * windowHeight
    const delta = { x: windowXShoop - windowXMe, y: windowYShoop - windowYMe }
    const dist = Math.sqrt(Math.pow(delta.x, 2) + Math.pow(delta.y, 2))
    const distToMove = Math.Min(dist, this.speed)
    const reachesTarget = this.speed >= dist
    this.location = {
      x: this.location.x + delta.x,
      y: this.location.y + delta.y,
    }
    if (reachesTarget) { this.currentShoop = null }
  }
}

const fishies = [
  new Fish(),
  new Fish(),
  new Fish(),
]

function setup() {
  createCanvas(windowWidth, windowHeight)
}

function draw() {
  drawBackground()
  fishies.forEach(f => f.draw())
}

function update() {
  fishies.forEach(f => f.update())
}

function drawBackground() {
  background('#7BBBDD')
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}