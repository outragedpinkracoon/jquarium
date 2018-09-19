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
const SPIKEY_FISH_IMG_LEFT = 'https://cdn.glitch.com/ea138267-ba1b-4761-b329-d6c4b9e742ee%2Fspikey_fish_left.png?1537366510608'
const SPIKEY_FISH_IMG_RIGHT = 'https://cdn.glitch.com/ea138267-ba1b-4761-b329-d6c4b9e742ee%2Fspikey_fish_right.png?1537366509017'
const BLOOP_FISH_IMG_LEFT = 'https://cdn.glitch.com/ea138267-ba1b-4761-b329-d6c4b9e742ee%2Fbloop_fish_left.png?1537367764866'
const BLOOP_FISH_IMG_RIGHT = 'https://cdn.glitch.com/ea138267-ba1b-4761-b329-d6c4b9e742ee%2Fbloop_fish_right.png?1537367762540'

let spikeyFishImgLeft
let spikeyFishImgRight
let bloopFishImgLeft
let bloopFishImgRight

let fishies

class Fish {
  constructor({label, fishType}) {
    this.location = { x: Math.random(), y: Math.random() }
    this.speed = 15 + (Math.random() * 15)
    this.currentShoop = null
    this.label = label
    this.fishType = fishType || 'spikey'

    if(this.fishType === 'bloop') {
      this.img = bloopFishImgLeft
    }
    else {
      this.img = spikeyFishImgLeft
    }
    
    //lol...
    if(this.fishType === 'bloop') {
      this.labelOffsets = {
        x: 62,
        y: 88
      }
    }
    else if (this.fishType === 'spikey') {
      this.labelOffsets = {
        x: 68,
        y: 55
      }
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
        //Lol need to tidy the code soon naughty
        if(this.fishType === 'spikey') {
          this.img = spikeyFishImgRight
        }
        else if(this.fishType === 'bloop') {
          this.img = bloopFishImgRight
        }
      }
    }
    else {
      if(this.direction != 'left') {
        this.direction = 'left'
          if(this.fishType === 'spikey') {
          this.img = spikeyFishImgLeft
        }
        else if(this.fishType === 'bloop') {
          this.img = bloopFishImgLeft
        }
      }
    }
    
    if (reachesTarget) { 
      this.currentShoop = null 
    }
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
    new Fish({label: '.ready()', fishType: 'bloop'}),
  ]
}

function preload() {
  spikeyFishImgLeft = loadImage(SPIKEY_FISH_IMG_LEFT)
  spikeyFishImgRight = loadImage(SPIKEY_FISH_IMG_RIGHT)
  bloopFishImgLeft = loadImage(BLOOP_FISH_IMG_LEFT)
  bloopFishImgRight = loadImage(BLOOP_FISH_IMG_RIGHT)
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