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
  frameRate,
  loadImage,
  image,
  text,
  textSize,
  rotate
 */

const FRAMERATE = 30
const FISH_IMG_LEFT = 'https://cdn.glitch.com/ea138267-ba1b-4761-b329-d6c4b9e742ee%2Ffish_left.png?1537361637478'
const FISH_IMG_RIGHT = 'https://cdn.glitch.com/ea138267-ba1b-4761-b329-d6c4b9e742ee%2Ffish_right.png?1537361637621'
let imgLeft
let imgRight
let fishies

class Fish {
  constructor({label}) {
    this.location = { x: Math.random(), y: Math.random() }
    this.speed = 15 + (Math.random() * 15)
    this.currentShoop = null
    this.label = label
    this.direction = null
    this.img = imgLeft
    
    this.labelOffsets = {
      x: 68,
      y: 55
    }
  }
  
  draw() {
    const { x, y } = this.location
    const windowX = x * windowWidth
    const windowY = y * windowHeight
    image(this.img, windowX, windowY)
    text(this.label, windowX + this.labelOffsets.x, windowY + this.labelOffsets.y);
  }
  
  update() {
    this.updateShoop()
  }
  
  shoop() {
    this.currentShoop = { x: Math.random(), y: Math.random() }
  }
  
  updateShoop() {
    if (!this.currentShoop) {
      return this.shoop()
    }
    const windowXMe = this.location.x * windowWidth
    const windowYMe = this.location.y * windowHeight
    
    const windowXShoop = this.currentShoop.x * windowWidth
    const windowYShoop = this.currentShoop.y * windowHeight
    
    const delta = { x: windowXShoop - windowXMe, y: windowYShoop - windowYMe }
    const dist = Math.sqrt(Math.pow(delta.x, 2) + Math.pow(delta.y, 2))
    const deltaNorm = { x: delta.x / dist, y: delta.y / dist }
    
    const frameSpeed = this.speed / FRAMERATE
    
    const distToMove = Math.min(dist, frameSpeed)
    
    const reachesTarget = frameSpeed >= dist
    
    this.location = {
      x: this.location.x + ((deltaNorm.x * distToMove) / windowWidth),
      y: this.location.y + ((deltaNorm.y * distToMove) / windowHeight),
    }
    
    if (this.currentShoop.x > this.location.x) {
      if(this.direction != 'right') {
        this.direction = 'right'
        this.img = imgRight
      }
    }
    else {
      if(this.direction != 'right') {
        this.direction = 'left'
        this.img = imgLeft
      }
    }
    
    if (reachesTarget) { 
      this.currentShoop = null 
    }
    console.log(this.direction)
  }
}

function setup() {
  frameRate(FRAMERATE)
  createCanvas(windowWidth, windowHeight)
  textSize(18)
  
  fishies = [
    new Fish({label: '.append()', imageFacing: 'right'}),
    new Fish({label: '.children()'}),
    new Fish({label: '.siblings()'}),
    new Fish({label: '.first()'}),
    new Fish({label: '.parent()'}),
    new Fish({label: '.remove()'}),
    new Fish({label: '.ready()'}),
  ]
}

function preload() {
  imgLeft = loadImage(FISH_IMG_LEFT)
  imgRight = loadImage(FISH_IMG_RIGHT)
}

function draw() {
  drawBackground()
  fishies.forEach(f => f.update())
  fishies.forEach(f => f.draw())
}

function drawBackground() {
  background('#7BBBDD')
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}