
// Makes all of the appropriate variables.

// Physics variables
let version = "1.0.0"


let bossSnakeLoop
let inMenu = true, isLevelSelect = false
let isEditMode = false;
let toolMode = "select"
let objectList = []
let selectedObject = null
let released = true;
let player;
let goal;
let mousePosX, mousePosY, isDragging = false
let playerIdle, playerRun, goalBubble, playerDeath
let currentLevel = 17, unlockedLevels = localStorage.getItem("levels") != "" ? Number(localStorage.getItem("levels")) : 0

let chapterSelected
let chapterOneLevels = ["1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "ba"]
let chapterTwoLevels = ["1b", "2b", "3b", "4b", "5b", "6b", "7b", "8b", "bb"]
let levelList = chapterOneLevels.concat(chapterTwoLevels)
let fade = {
  level: 0,
  in : false
}
let bossCycleArray, bossLength = 20
let time = 0, timeLoop
let button
let keyboardControls = [39, 68, 37, 65, 38, 87]
let isPlayingmusic
let animEnemyCobra
let shot, pong = []
let animCanon
// Menu variables

let vx
let posx
let showLevelSelect = false

let optmenu
let showOptMenu = false
let playerMusic = true
let playerSfx = true
let slider
let sliderActive
let volume
let xMin = 370-42.5
let xMax = 503-42.5
let sliderX = xMax

let chapter1

let fading = false
let fadeOpacity = 0
let fadeTarget = 0
let fadeSpeed = 0.01
let fadingDone = false

let logo
let logoX = 125
let logoY = -100
let scaleX = 78*1.2
let scaleY = 38*1.2

let buttons = []
let buttonImages = [

  //START
{ defaultImg: 'assets/start1.png', 
  clickedImg: 'assets/start2.png', 
  position: { x: 400-39*1.2, y:240 }, 
  scale: {x: scaleX, y: scaleY} },

  //QUIT
{ defaultImg: 'assets/quit1.png', 
  clickedImg: 'assets/quit2.png', 
  position:{ x: 400-39*1.2, y:300 },
  scale: {x: scaleX, y: scaleY}   },

  //OPTIONS
{ defaultImg: 'assets/options1.png', 
  clickedImg: 'assets/options2.png', 
  position:{ x: 4000, y:3000 }, 
  scale: {x: 36, y: 45.6}  },

  //MUSIC
{ defaultImg: 'assets/onButton.png', 
  clickedImg: 'assets/offButton.png', 
  position:{ x: 4000, y: 4000 }, 
  scale: {x: 48*1.5, y: 24*1.5}  },

  //SFX
{ defaultImg: 'assets/onButton.png', 
  clickedImg: 'assets/offButton.png', 
  position:{ x: 4000, y: 4000 }, 
  scale: {x: 48*1.5, y: 24*1.5}  },
  
  //RESUME
{ defaultImg: 'assets/resume1.png', 
  clickedImg: 'assets/resume2.png', 
  position:{ x: 4000, y: 4000 }, 
  scale: {x: 92*1.5, y: 38*1.5}  },

  //HOME
{ defaultImg: 'assets/home1.png', 
  clickedImg: 'assets/home2.png', 
  position:{ x: 4000, y: 4000 }, 
  scale: {x: 30*1.5, y: 38*1.5}  },

  //BACK
{ defaultImg: 'assets/back1.png', 
  clickedImg: 'assets/back2.png', 
  position:{ x: 4000, y: 4000 }, 
  scale: {x: 36, y: 45.6}  }
  
]

//to come
let tiles
let machines = []
let machineImages = [

  //Chapter1
  {lockedImg: 'assets/Chapter1open.png', 
   unlockedImg: 'assets/Chapter1open.png', 
   clickedImg: 'assets/chapter1blank.png',
   position: {x: 355.2-200, y: 150},
   scale: {x: 56*1.6, y: 113*1.6}},
  
  //Chapter2
  {lockedImg: 'assets/chapter2locked.png', 
   unlockedImg: 'assets/chapter2unlocked.png', 
   clickedImg: 'assets/chapter2blank.png',
   position: {x: 355.2, y: 150},
   scale: {x: 56*1.6, y: 113*1.6}},

   //Chapter3
  {lockedImg: 'assets/chapter3locked.png', 
   unlockedImg: 'assets/chapter3unlocked.png', 
   clickedImg: 'assets/chapter3blank.png',
   position: {x: 355.2+200, y: 150},
   scale: {x: 56*1.6, y: 113*1.6}},

  
]



// Entities are the main boxes that the player can touch. It is like a platform.
class Platform {
  #isreturning
  #x
  #y
  // Constructor used to create the height width and position of a given element.
  constructor(height, width, x, y, fx = null, fy = null, osilating = false, speed = 10, spawner = false, goal = false, trapArray = []) {
    this.height = height
    this.width = width
    this.#x = x
    this.#y = y
    this.startX = x
    this.startY = y
    this.fx = fx
    this.fy = fy
    this.speed = speed
    this.osilating = osilating
    this.#isreturning = false
    this.spawner = spawner
    this.goal = goal
    this.trapArray = trapArray

    for (let i = 0; i < trapArray.length; i++) {
      console.log(this.trapArray[i].type)
      switch(this.trapArray[i].type) {
        case "frog":
          this.trapArray[i] = new Enemy(this.trapArray[i].x, this.trapArray[i].y)
          break
        case "button":
          this.trapArray[i] = new Button(this.trapArray[i].x, this.trapArray[i].y, this.trapArray[i].facing, this.trapArray[i].lambda)
          break
        case "shooter":
          this.trapArray[i] = new Shooter(this.trapArray[i].x, this.trapArray[i].y, this.trapArray[i].facing, this.trapArray[i].shootingRate)
          break
        default:
          this.trapArray[i] = new Trap(this.trapArray[i].x, this.trapArray[i].y, this.trapArray[i].facing)
          break
      }
      // this.trapArray[i] = this.trapArray[i].type == "frog" ? new Enemy(this.trapArray[i].x, this.trapArray[i].y) : new Trap(this.trapArray[i].x, this.trapArray[i].y, this.trapArray[i].facing)
    }
  }



  setIsReturning(toggle){
    this.#isreturning = toggle
  }


  // Returns the location
  getLocation() {
    return [this.#x, this.#y]
  }

  // Sets the location for an object.
  setLocation(x, y) {
    this.#x = x
    this.#y = y
    this.startX = x
    this.startY = y
  }

  // Returns the velocity of an object. The velocity will be given in a list as an x and y value seperately.
  getVelocities() {
    
    let distanceToEvent = sqrt((this.#x +  - player.x)**2 + ((this.#y - this.height / 2 - 20) - player.y)**2)
    if (!this.osilating && !this.oneWayTrip) {
      if ((this.fx == null || this.fy == null) || (distanceToEvent > 30 && (this.#x == this.startX && this.#y == this.startY))) {
        return [0,0]
      }
    }
    
    let vel = this.speed / 200
    if (this.fx - this.startX == 0 && this.fy - this.startY == 0) {
      return [0,0]
    }
    let angle = atan2(this.fy-this.startY, this.fx-this.startX)

    let vx = cos(angle) * vel
    let vy = sin(angle) * vel

    if (this.#isreturning) {
      vx *= -1
      vy *= -1
    }


    let distanceToGoal = sqrt((this.fx-this.#x)**2 + (this.fy-this.#y)**2)
    let distanceToStart = sqrt((this.startX-this.#x)**2 + (this.startY-this.#y)**2)
    if (this.osilating) {
      /* if (this.#y > 0) {
        console.log("Test1: ", this.fx, this.#x, !this.#isreturning)
        console.log("Test2: ", this.startX, this.#x, this.#isreturning)
      } */
      if ((((this.fx > this.startX && this.fx < this.#x) || (this.fx < this.startX && this.fx > this.#x)) && !this.#isreturning) 
       || (((this.fx > this.startX && this.startX > this.#x) || (this.fx < this.startX && this.startX < this.#x)) && this.#isreturning)) {
        this.#isreturning = !this.#isreturning
      } else if ((((this.fy > this.startY && this.fy < this.#y) || (this.fy < this.startY && this.fy > this.#y)) && !this.#isreturning) 
        || (((this.fy > this.startY && this.startY > this.#y) || (this.fy < this.startY && this.startY < this.#y)) && this.#isreturning)) {
        this.#isreturning = !this.#isreturning
      }
    // } else if (this.oneWayTrip) {
    //   if ((((this.fx > this.startX && this.fx <= this.#x) || (this.fx < this.startX && this.fx >= this.#x)))) {
    //     vx = 0
    //     vy = 0
    //     this.#x = this.fx
    //     this.#y = this.fy
    //   } else if ((((this.fy > this.startY && this.fy <= this.#y) || (this.fy < this.startY && this.fy >= this.#y)))) {
    //     vx = 0
    //     vy = 0
    //     this.#x = this.fx
    //     this.#y = this.fy
    //   }

    } else {
/*       if (distanceToGoal < 5) {
        vx = 0
        vy = 0
      } */

      if ((((this.fx > this.startX && this.fx <= this.#x) || (this.fx < this.startX && this.fx >= this.#x)))) {
        vx = 0
        vy = 0
        this.#x = this.fx
        this.#y = this.fy
      } else if ((((this.fy > this.startY && this.fy <= this.#y) || (this.fy < this.startY && this.fy >= this.#y)))) {
        vx = 0
        vy = 0
        this.#x = this.fx
        this.#y = this.fy
      }
    }

    return [vx, vy]
  }

  // Returns the bounding box of a block.
  getBoundingBox() {
    let ix = this.#x - this.width/2
    let iy = this.#y - this.height/2
    let ax = this.#x + this.width/2
    let ay = this.#y + this.height/2
    return [ix, iy, ax, ay]
  }

  drawEnemies() {
    for (let i = 0; i < this.trapArray.length; i++) {
      
      let xoff = this.trapArray[i].x + this.#x
      let yoff = this.trapArray[i].y + this.#y
      // fill(255, 0, 0)
      // rect(xoff - this.trapArray[i].width/2, yoff - this.trapArray[i].height / 2, this.trapArray[i].width, this.trapArray[i].height)

      let width, height
      switch (this.trapArray[i].type) {

        case "shooter":
          let shots = this.trapArray[i].getShots()
          this.trapArray[i].spawnShot()

          for (let o = 0; o < shots.length; o++) {
            let shot = shots[o];
            let speed = 0.34
            switch (this.trapArray[i].facing) {
              case 37:
                shot.x -= speed*deltaTime
                break;
            
              case 38:
                shot.y -= speed*deltaTime

              case 39:
                shot.x += speed*deltaTime
              default:
                break;
            }
            fill(255)

            if (((abs(player.x - (this.#x + shot.x-5)) * 2 < (player.width + 10)) && (abs(player.y - (this.#y + shot.y-5)) * 2 < (player.height + 10))) && !fade.in /* (fade.level <= 0 ||fade.level >= 255) */) {
              console.log("shot")
              reload()
            }
            rect(this.#x + shot.x-5, this.#y + shot.y-5, 10, 10)
          }
          // console.log(shots[0].x)
        break


        case "frog":
          width = 10
          height = 20
          fill(0, 255, 0)
          // rect(xoff - width / 2, yoff - height / 2, width, height)
          if (Math.abs(this.trapArray[i].getVel()) == this.trapArray[i].getVel()) {
            scale(-1, 1)
            image(animEnemyCobra, -xoff - width / 2-15, yoff - height / 2-15)
            scale(-1,1)
          } else {
            image(animEnemyCobra, xoff - width / 2-15, yoff - height / 2-15)
          }
          // if (abs(this.trapArray[i].x) > this.width / 2 - width / 2) {
          //   this.trapArray[i].setVel(this.trapArray[i].getVel() * -1)
          // }
          // this.trapArray[i].x += 1 * this.trapArray[i].getVel()*deltaTime

          // Detects whether or not a collision between a trap and a player has been made. If a collision happens the level will be reloaded aka the player dies and has to restart.
          // if (((abs(player.x - xoff) * 2 < (player.width + width)) && (abs(player.y - yoff) * 2 < (player.height + height))) && (fade.level <= 0 ||fade.level >= 255)) {
          //   reload()
          // }

          break;
      }

      
    }
  }


  // This draw function is used to actually draw the cubes. This has been made so it can easily be replaced by an image asset. 
  draw() {
    let velocities = this.getVelocities()
    let vx = velocities[0]
    let vy = velocities[1]

    // if (abs(this.#x - (this.#x + vx*deltaTime)) > 6) {

      // console.log(abs(this.#x - (this.#x + vx*deltaTime)))
    // }
    this.#x = this.#x + vx*deltaTime
    this.#y = this.#y + vy*deltaTime
  
    
    noStroke()
    fill(0)
    rect(this.#x - this.width / 2, this.#y - this.height / 2, this.width, this.height)

    // Loops over all the traps attached to an entity.
    for (let i = 0; i < this.trapArray.length; i++) {
      
      let xoff = this.trapArray[i].x + this.#x
      let yoff = this.trapArray[i].y + this.#y
      // fill(255, 0, 0)
      // rect(xoff - this.trapArray[i].width/2, yoff - this.trapArray[i].height / 2, this.trapArray[i].width, this.trapArray[i].height)
      
      let width, height
      switch (this.trapArray[i].type) {
        case "spike":
          width = 30
          height = 10
          fill (0)
          let size = 5
          switch (this.trapArray[i].facing) {
            case UP_ARROW:
              triangle(xoff, yoff - size, xoff - size, yoff, xoff+size, yoff)
              // this.x -= 10
              xoff -= 10
              triangle(xoff, yoff - size, xoff - size, yoff, xoff+size, yoff)
              // this.x += 10 * 2
              xoff += 10*2
              triangle(xoff, yoff - size, xoff - size, yoff, xoff+size, yoff)
              xoff -= 10
              if (((abs(player.x - xoff) * 2 < (player.width + width)) && (abs(player.y - yoff) * 2 < (player.height + height))) && !fade.in /* (fade.level <= 0 ||fade.level >= 255) */) {
                console.log("Killed by spike (horizontal)")
                reload()
              }
              break
            case RIGHT_ARROW:
              // xoff = mouseX
              // yoff = mouseY
              triangle(xoff + size, yoff, xoff, yoff + size, xoff, yoff - size)
              yoff -= 10
              triangle(xoff + size, yoff, xoff, yoff + size, xoff, yoff - size)
              yoff += 10*2
              triangle(xoff + size, yoff, xoff, yoff + size, xoff, yoff - size)
              if (((abs(player.x - xoff) * 2 < (player.width + height)) && (abs(player.y - yoff) * 2 < (player.height + width))) && !fade.in /* (fade.level <= 0 ||fade.level >= 255) */) {
                console.log("Killed by spike (vertical)")
                reload()
              }
              break
            case LEFT_ARROW:
              triangle(xoff - size, yoff, xoff, yoff - size, xoff, yoff + size)
              yoff -= 10
              triangle(xoff - size, yoff, xoff, yoff - size, xoff, yoff + size)
              yoff += 10*2
              triangle(xoff - size, yoff, xoff, yoff - size, xoff, yoff + size)
              yoff -= 10
              if (((abs(player.x - xoff) * 2 < (player.width + height)) && (abs(player.y - yoff) * 2 < (player.height + width))) && !fade.in /* (fade.level <= 0 ||fade.level >= 255) */) {
                console.log("Killed by spike (vertical)")
                reload()
              }
              break
            case DOWN_ARROW:
              triangle(xoff, yoff + size, xoff + size, yoff, xoff-size, yoff)
              // this.x -= 10
              xoff -= 10
              triangle(xoff, yoff + size, xoff + size, yoff, xoff-size, yoff)
              // this.x += 10 * 2
              xoff += 10*2
              triangle(xoff, yoff + size, xoff + size, yoff, xoff-size, yoff)
              xoff -= 10
              if (((abs(player.x - xoff) * 2 < (player.width + width)) && (abs(player.y - yoff) * 2 < (player.height + height))) && !fade.in /* (fade.level <= 0 ||fade.level >= 255) */) {
                console.log("Killed by spike (horizontal)")
                reload()
              }
              break

          }
          // xoff -= 10
          
          // Detects whether or not a collision between a trap and a player has been made. If a collision happens the level will be reloaded aka the player dies and has to restart.
          // if (((abs(player.x - xoff) * 2 < (player.width + width)) && (abs(player.y - yoff) * 2 < (player.height + height))) && !fade.in /* (fade.level <= 0 ||fade.level >= 255) */) {
          //   console.log("Killed by spike")
          //   reload()
          // }
          break;

        case "frog":
          width = 10
          height = 20
          fill(0, 255, 0)
          // rect(xoff - width / 2, yoff - height / 2, width, height)
          // image(enemyCobra, xoff - width / 2-15, yoff - height / 2-15)
          if (abs(this.trapArray[i].x) > this.width / 2 - width / 2) {
            this.trapArray[i].x = abs(this.trapArray[i].getVel()) == this.trapArray[i].getVel() ? this.width / 2 - width / 2 - 1 : -(this.width / 2 - width / 2 - 1)
            this.trapArray[i].setVel(this.trapArray[i].getVel() * -1)
          }
          this.trapArray[i].x += 1 * this.trapArray[i].getVel()*deltaTime

          // Detects whether or not a collision between a trap and a player has been made. If a collision happens the level will be reloaded aka the player dies and has to restart.
          if (((abs(player.x - xoff) * 2 < (player.width + width)) && (abs(player.y - yoff) * 2 < (player.height + height))) && (fade.level <= 0 ||fade.level >= 255)) {
            console.log("Killed by snake")
            reload()
          }

          break;
        case "button":
          width = 18
          height = 15
          fill (0)
          if (((abs(player.x - xoff) * 2 < (player.width + width)) && (abs(player.y - yoff) * 2 < (player.height + height))) && !this.trapArray[i].getToggle()) {
            this.trapArray[i].setToggle()
            drawButton(this.trapArray)
            this.trapArray[i].callFunction()
          } else {
            drawButton(this.trapArray)
          }


          function drawButton(trapArray) {
            switch (trapArray[i].facing) {
              case UP_ARROW:
                image(trapArray[i].getToggle() ? button[1] : button[0], xoff-width/2, yoff-height/2, width, height)
                // rect(xoff - width/2, yoff-height/2, width, height)
                break
              case null:
                break
            }

          }
          break;
      }

      
    }

  }
}

// A trap is formed like 3 spikes on the ground and can be attached to an entity as the "trapsArray"
class Trap {
  constructor(x,y, facing) {
    this.type = "spike"
    this.x = x
    this.y = y
    this.facing = facing
  }
}

class Shooter {
  #shots
  #lastShotFired
  constructor(x,y, facing, shootingRate) {
    this.type = "shooter"
    this.x = x
    this.y = y
    this.facing = facing
    this.shootingRate = shootingRate
    this.#shots = []
    this.#lastShotFired = 0


  }

  getShots() {
    return this.#shots
  }

  spawnShot() {
    // console.log(this.#lastShotFired)
    if (this.#lastShotFired <= 0) {
      this.#shots.push({x: this.x, y: this.y})
      this.#lastShotFired = this.shootingRate
    } else {
      this.#lastShotFired -= 1*deltaTime
    }
  }
}

class Button {
  #toggled
  constructor(x,y, facing, lambda) {
    this.type = "button"
    this.x = x
    this.y = y
    this.facing = facing
    this.#toggled = false
    this.lambda = lambda
  }

  setToggle() {
    this.#toggled = !this.#toggled
  }
  getToggle() {
    return this.#toggled
  }

  callFunction() {
    let loc;
    let speed = 0.2
    for (let i = 0; i < this.lambda.length; i++) {
      switch (this.lambda[i]) {
        case "reverseControls":
          reverseControls()
          break
        case "6aMoveBlock":
          objectList[1].osilating = true
          objectList[2].osilating = true
          break
        case "resetButton":
          this.setToggle()
          break
        case "moveBlockDown":
          loc = objectList[2].getLocation()
          if (loc[1] > 242) {
            return
          }
          objectList[2].setLocation(loc[0], loc[1]+speed*deltaTime)
          break
        case "moveBlockUp":
          loc = objectList[2].getLocation()
          if (loc[1] < 50) {
            return
          }
          objectList[2].setLocation(loc[0], loc[1]-speed*deltaTime)
          break
        case "6bMoveWall":
          objectList[2].osilating = true
          break
        case "setGravityDouble":
          player.gravity = -(0.0015*2.4)
          break
        case "setGravityHigh":
          player.gravity = -(0.0015*8)
          break
        case "6bMoveCeil":
          objectList[5].osilating = true
          break
        case "setGravityNormal":
          player.gravity = -(0.0015*1.6)
          break
        case "shoot":
          shot = new Shot(600, 200, -(random()+0.3), random()-0.5)
          break
        case "7bSpikeWall":
          objectList[12].fx = -100000000000
          objectList[12].fy = 195
          objectList[12].osilating = true
          break
        case "7bOpenHatch":
          objectList[9].fx = 675
          objectList[9].fy = 160
          objectList[9].oneWayTrip = true
          objectList[15].trapArray[0].y = 0
          break
        case "7bDeathTrap":
          objectList[16].fx = 360
          objectList[16].fy = 125
          objectList[16].oneWayTrip = true
          objectList[17].fx = 440
          objectList[17].fy = 125
          objectList[17].oneWayTrip = true

          setTimeout(() => {
            objectList[19].fy = 20
            objectList[19].fx = 400
            objectList[19].oneWayTrip = true
            objectList[20].fy = 90
            objectList[20].fx = 400
            objectList[20].oneWayTrip = true
            player.y = player.y - 2
          }, 2000)
      }
    }
  }

}



class Pongball {
  constructor(x, y, plat1, plat2, bound1, bound2) {
    this.x = x
    this.y = y
    this.plat1 = plat1
    this.plat2 = plat2
    this.bound1 = bound1
    this.bound2 = bound2
    this.vy = 0.1 + random(0,0.05)
    this.vx = 0.05 + random(0, 0.001)
    this.height = 20
    this.width = 20
  }

  draw() {
    let size = 20

    this.y += this.vy*deltaTime * 2
    if (doObjectCollide(this, objectList[this.plat2])) {
      this.y = 345-size/2
      this.vy *= -1
    } else if (doObjectCollide(this, objectList[this.plat1])) {
      this.y = 55+size/2
      this.vy *= -1
    }

    this.x += this.vx*deltaTime * 2
    if (this.x + size/2 > this.bound2) {
      this.x = this.bound2-size/2
      this.vx *= -1
    } else if (this.x - size/2 < this.bound1) {
      this.x = this.bound1+size/2
      this.vx *= -1
    }

    this.positionPlat()

    if (doObjectCollide(player, this)) {
      reload()
    }

    fill(255)
    noStroke()
    rect(this.x-size/2, this.y-size/2, size, size)
  }

  positionPlat() {
    let y = this.y
    let x = this.x
    let vx = this.vx
    let vy = this.vy
    objectList[this.plat1].oneWayTrip = true
    objectList[this.plat2].oneWayTrip = true    

    noFill()
    stroke(255)
    for (let i = 0; i < 290 / abs(this.vy); i++) {

      y += vy
      x += vx
  
      // rect(x - 10, y - 10, 20, 20)
      // console.log("Showing trail")
      if (x + this.width/2 > this.bound2 || x - this.width / 2 < this.bound1) {
        vx *= -1
      }
      if (y - this.width / 2 < 55) {
        vy *= -1

        
        if (abs(objectList[this.plat1].fx - x) >= 70) {
          objectList[this.plat1].fx = x + random(-20, 20)
          objectList[this.plat1].startX = objectList[this.plat1].getLocation()[0]
          // objectList[this.plat1].fy = objectList[this.plat1].startY
        }
      } else if (y + this.width/2 > 345) {
        vy *= -1

        
        if (abs(objectList[this.plat2].fx - x) >= 70) {
          objectList[this.plat2].fx = x + random(-20, 20)
          objectList[this.plat2].startX = objectList[this.plat2].getLocation()[0]
          // objectList[this.plat2].fy = objectList[this.plat2].startY
        }

      }
    }
    // while (y < 345 && y > 55) {
    // }
  }

  getLocation() {
    return [this.x, this.y]
  }
}


class Shot {
  constructor(x, y, vx, vy, defended = 0) {
    this.x = x+cos(atan2(vy,vx))*37
    this.y = y+sin(atan2(vy,vx))*37
    this.startX = x
    this.startY = y
    this.vx = vx
    this.vy = vy
    this.startVx = vx
    this.startVy = vy
    this.size = 15
    this.speed = 0.3
    this.height = this.size
    this.width = this.size
    this.defended = defended
    animCanon.setFrame(8)
    animCanon.play()
  }

  draw() {
    let normalization = (sqrt(this.vx * this.vx + this.vy*this.vy))
    
    this.x += this.vx/normalization*this.speed * deltaTime
    this.y += this.vy/normalization*this.speed * deltaTime

    textAlign(CENTER)
    textSize(20)
    fill(255)
    text("Defend against 8 balls to win and proceeed", 400, 340)
    textSize(40)
    text(8-this.defended, 400, 100)
    push()
    imageMode(CENTER)
    translate(this.startX, this.startY+5)
    image(canonLatice, 0, 5)
    rotate(atan2(this.startVy,this.startVx)+180)
    image(animCanon, -28, 0)
    // rotate(-(atan2(this.vy,this.vx)))
    // translate(-(this.startX+37), 0)
    imageMode(CORNER)
    pop()

    if (objectList[2] != null && doObjectCollide(shot, objectList[2])) {
      // shot = new Shot(800, 200, -random(), random()/2)
      // animCanon.reset()
      // animCanon.setFrame(8)
      // animCanon.play()
      // this.vy = random()/2
      // this.vx = -random()*2
      // this.x = this.startX+cos(atan2(this.vy,this.vx))*37
      // this.y = this.startY+sin(atan2(this.vy,this.vx))*37
      this.defended++
      shot = new Shot(this.startX, this.startY, -(random()+0.3), random()-0.5, this.defended)
    }

    if (this.x < 0) {
      shot = new Shot(this.startX, this.startY, -(random()+0.3), random()-0.5)

    }

    if (this.y - this.size/2 < 0 && this.vy != abs(this.vy) || this.y + this.size/2 > 287 && this.vy == abs(this.vy)) {
      this.vy *= -1
    }

    if (this.defended >= 8) {
      shot = null
      currentLevel++
      if (currentLevel > unlockedLevels && currentLevel != levelList.length) {
        localStorage.setItem("levels", (currentLevel)+"")
      }
      switchLevels()
    }

    fill(255)
    rect(this.x-this.size/2, this.y-this.size/2,this.size)
  }

}


class Enemy {
  #vel
  constructor(x, y) {
    this.type = "frog"
    this.x = x
    this.y = y
    this.#vel = -0.07
  }

  getVel() {
    return this.#vel
  }

  setVel(input) {
    this.#vel = input
  }
}


// The goal entity is a level load trigger that the player can interact with to change level.
class Goal extends Platform{
  constructor(height, width, x, y) {
    super(height,width, x, y)
    this.x = x
    this.y = y
    this.initialLevel = currentLevel
  }

  // Draws the main door and also a speech bubble above the player if the player is near enough.
  draw() {
    strokeWeight(3)

    fill(200)
    stroke(0)
    rect(this.x - this.width/2, this.y - this.height / 2, this.width, this.height)
    if (doObjectCollide(player, this) && !fade.in) {
      noSmooth()
      scale(0.2)
      image(goalBubble, player.x * 5 - 180, player.y * 5 - 220)
      scale(5)
      if (keyIsDown(13) && currentLevel == this.initialLevel) {
        player.y = -100000000000
        currentLevel++
        console.log("skifter")
        if (currentLevel > unlockedLevels && currentLevel != levelList.length) {
          localStorage.setItem("levels", (currentLevel)+"")
        }
        // this.x = 1000000
        switchLevels()
      }
    }
  }
}

class Player extends Platform { 
  #facing
  // Player constructor used for making the player entity. The main thing seperating a player entity from a different entity is that the player can be controlled by a keyboard and it will be effected by gravity.
  constructor(height, width, x, y) {
    super(height, width)
    this.x = x
    this.y = y
    this.maxSpeed = 0.3
    this.vx = 0
    this.vy = 0
    this.gravity = -0.0015
    this.grounded = false;
    this.#facing = RIGHT
  }

  // The drawer for the player entity works somewhat like the normal entity. The difference between the two is the keyevents controlling the player and applying gravity.
  draw() {
    // fill(255, 0, 0)
    // rect(this.x - this.width/2, this.y - this.height/2, this.width, this.height)
    
    
    let velocities = ((this.grounded != false) ? this.grounded.getVelocities() : [0, 0])
    let vx = velocities[0]
    let vy = min(velocities[1], 0)



    if (keyIsDown(keyboardControls[0]) || keyIsDown(keyboardControls[1])) {
      if (!fade.in) {
        this.moveRight()
      }
    }
    if (keyIsDown(keyboardControls[2]) || keyIsDown(keyboardControls[3])) {
      if (!fade.in) {
        this.moveLeft()
      }
    }
    if (keyIsDown(keyboardControls[4]) || keyIsDown(keyboardControls[5])) {
      this.jump();
    }
    // This function "reloads" the level effectively making it restart.
    if (keyIsDown(82) && !fade.in) {
      console.log("Reload kill")
      reload()
    }
    noStroke()
    
    
    // Slows the velocity of the player down emulating drag coeficient and friction.
    if (abs(this.vx) < 0.001) {
      this.vx = 0
    } else {
      this.vx = (this.vx) / 2.5
    }
    // Flips the players animation based on if the vx speed is positive or negative. This tells us whether or not the player is moving left or right.
    if (this.vx != 0) {
      if (abs(this.vx) == this.vx) {
        image(playerRun, this.x - this.width / 2 - 6, this.y - this.height/2 - 1)
        this.#facing = RIGHT
      } else {
        scale(-1, 1)
        image(playerRun, -this.x - this.width / 2 - 6, this.y - this.height/2 - 1)
        scale(-1, 1)
        this.#facing = LEFT
      }
    } else {
      if (this.#facing == LEFT) {
        if (fade.in) {
          image(playerDeath, this.x - this.width / 2 - 6, this.y - this.height/2 - 1)
        } else {
          image(playerIdle, this.x - this.width / 2 + 0, this.y - this.height/2 - 1)
        }
      } else {
        scale(-1, 1)
        if (fade.in) {
          image(playerDeath, -this.x - this.width / 2 - 6, this.y - this.height/2 - 1)
        } else {
          image(playerIdle, -this.x - this.width / 2 + 0, this.y - this.height/2 - 1)
        }
        scale(-1, 1)
      }
    }

    if (fade.in) {
      this.vx = 0
      this.vy = 0
    } else {
      this.vy = this.vy - this.gravity*deltaTime*calculateGravity(currentLevel)
    }

    // End math that moves the player.
    this.vx = this.vx
    this.vy = this.vy
    this.x = this.x + (this.vx+vx)*deltaTime
    this.y = this.y + (this.vy+vy)*deltaTime
    if (abs(this.vx) > this.maxSpeed) {
      this.vx = this.vx * (2 / abs(this.vx))
    }

    
    if (this.y > 450 && !fade.in) {
      player.y = -1000000
      console.log("Killed by death barrier")
      reload()
    }

    this.grounded = false;
    collisionHandeler(objectList)

  }

  // The players jump command checks if player is on the ground and that they havent released the jump key effectively making them press it again so repeated jumps arent as regular. This raises the difficulty of the game quite a bit since consistency between jumps are much harder.
  jump() {
    if (this.grounded && released) {
      released = false

      let rand = random(jumpSounds.length)
      // jumpSounds[Math.floor(rand)].volume(volume)
      jumpSounds[Math.floor(rand)].play()

      this.grounded = false
      this.vy = -0.32
    }
  }

  // Moves the player left.
  moveLeft(){
    this.vx=this.vx-this.maxSpeed
  }

  // Pretty self explanatory.
  moveRight(){
    this.vx=this.vx+this.maxSpeed
  }
}

// Level class that can loads a json file from the "levels" folder.
class level{
  constructor(levelName) {
    this.levelName = levelName
  }

  load() {
    objectList = []
    keyboardControls = [39, 68, 37, 65, 38, 87]
    fetch('./levels/'+this.levelName+'.json')
    .then((response) => response.json())
    .then((json) => {
      shot = null
      for (let i = 0; i < json.length; i++) {mousePosX
        if (json[i].spawner) {
          player = new Player(26, 11, json[i].startX, json[i].startY - (json[i].height/2 + 26/2));
        }
        if (json[i].goal) {
          goal = new Goal(35, 25, json[i].startX, json[i].startY - (json[i].height/2 + 35/2) + 5)
        }
        
        objectList.push(new Platform(json[i].height, json[i].width, json[i].startX, json[i].startY, json[i].fx, json[i].fy, json[i].osilating, json[i].speed, json[i].spawner, json[i].goal, json[i].trapArray))
      }
      if (currentLevel == 17) {
        pong.push(new Pongball(200, 100, 3, 4, 0, 400))
        pong.push(new Pongball(750, 100, 5, 6, 400, 800))
      }
    });




    // Boss level for chapter 1. This will be an interesting experience.
    if (currentLevel == 8) {
      bossCycleArray = []
  
  
      for (let row = 0; row < 5; row++) {
        bossCycleArray.push([])
        for (let column = 0; column < 8; column++) {
          bossCycleArray[row].push(0)
        }
      }
  
      console.log(bossCycleArray)


      // snakeArray[4][6] = 100
     
      let cycle = [32, 33, 25, 26, 34, 35, 27, 28, 36, 37, 29, 30, 38, 39, 31, 23, 22, 14, 15, 7, 6, 5, 4, 12, 13, 21, 20, 19, 11, 3, 2, 10, 18, 17, 9, 1, 0, 8, 16, 24]
      let num = 0
      bossSnakeLoop = setInterval(() => {
       

        for (let row = 0; row < 5; row++) {
          for (let column = 0; column < 8; column++) {
            bossCycleArray[row][column]--
          }
        }

        bossCycleArray[Math.floor(cycle[num]/8)][cycle[num]%8] = bossLength
        num++


        if (num > 39) {
          // clearInterval(loop)
          num = 0
        }

        if (num == bossLength) {
          clearInterval(bossSnakeLoop)
          bossSnakeLoop = setInterval(() => {
            
          for (let row = 0; row < 5; row++) {
            for (let column = 0; column < 8; column++) {
              bossCycleArray[row][column]--
            }
          }

          bossCycleArray[Math.floor(cycle[num]/8)][cycle[num]%8] = bossLength
          num++

          if (num > 39) {
            num = 0
          }
          }, 100)
        }

      }, 50)
    }

    





  }

}

function preload() {
  playerIdle = loadImage('images/idle-animation.gif')
  playerRun = loadImage('images/run-animation-.gif')
  goalBubble = loadImage('images/pixel-speech-bubble.png')
  playerDeath = loadImage('images/death-animation.gif')
  logo = loadImage('assets/logo.png')
  optmenu = loadImage('assets/optionsmenu.png')
  chapter1 = loadImage('assets/Chapter1open.png')
  slider = loadImage('assets/slider.png')
  snakeCorner = loadImage('images/snake-corner.png')
  snakeCornerFlipepd = loadImage('images/snake-corner-flipped.png')
  snakeHead = loadImage('images/snake-head.png')
  snakeStraight = loadImage('images/snake-straight.png')
  snakeTail = loadImage('images/snake-tail.png')
  levelImages = [loadImage('assets/level-1a.png'), loadImage('assets/level-2a.png'), loadImage('assets/level-3a.png'), loadImage('assets/level-4a.png'), loadImage('assets/level-5a.png'), loadImage('assets/level-6a.png'), loadImage('assets/level-7a.png'), loadImage('assets/level-8a.png'), loadImage('assets/level-lockeda.png'), loadImage('assets/level-bossa.png'), loadImage('assets/level-1b.png'), loadImage('assets/level-2b.png'), loadImage('assets/level-3b.png'), loadImage('assets/level-4b.png'), loadImage('assets/level-5b.png'), loadImage('assets/level-6b.png'), loadImage('assets/level-7b.png'), loadImage('assets/level-8b.png'), loadImage('assets/level-lockedb.png'), loadImage('assets/level-bossb.png')]
  jumpSounds = [loadSound("assets/jump-sound-1.mp3"), loadSound("assets/jump-sound-2.mp3"), loadSound("assets/jump-sound-3.mp3"), loadSound("assets/jump-sound-4.mp3")]
  button = [loadImage('assets/button-untoggled.png'), loadImage('assets/button-toggled.png')]
  font = loadFont('assets/little-pixel.ttf')
  isPlayingmusic = loadSound('assets/music.mp3')
  animEnemyCobra = loadImage('images/enemy-cobra.gif')
  tiles = [loadImage('assets/tile-1.png'),loadImage('assets/tile-2.png'),loadImage('assets/tile-3.png'),loadImage('assets/tile-4.png'),loadImage('assets/tile-5.png'),loadImage('assets/tile-6.png'),]
  deathSound = loadSound('assets/death-sound.mp3')
  animCanon = loadImage("assets/canon.gif")
  canonLatice = loadImage("assets/canonLatice.png")
}


// The reload function does as it implies. It reloads the level loader making it switch or keep the level. Added functionality added for the boss level. TODO change this to a dynamic system instead of the clusterfuck that will become of it.
function reload() {
  deathSound.play()
  keyboardControls = [39, 68, 37, 65, 38, 87]
  pong = []
  if (currentLevel == 0) {
    time = 0
  }
  if (currentLevel != 8) {
    bossCycleArray = null
  }
  clearInterval(bossSnakeLoop)
  playerDeath.setFrame(0)
  playerDeath.play()
  // fade = 
  console.log(currentLevel, chapterOneLevels.length, "from reload")
  // if (currentLevel == levels.length) {
  //   if (localStorage.getItem("highScore") == null) {
  //     localStorage.setItem("highScore", time)
  //   }
  //   if (time != 0 && time < Number(localStorage.getItem("highScore"))) {
  //     localStorage.setItem("highScore", time)
  //   }
  //   return
  // }





  fadeOutFunction()
}



function switchLevels() {
  keyboardControls = [39, 68, 37, 65, 38, 87]
  if (currentLevel == 0) {
    time = 0
  }
  if (currentLevel != 8) {
    bossCycleArray = null
  }
  clearInterval(bossSnakeLoop)
  playerDeath.setFrame(0)
  playerDeath.play()
  // fade = 
  console.log(currentLevel, chapterOneLevels.length, "from switchLevels")
  if (currentLevel == chapterOneLevels.length + chapterTwoLevels.length) {
    if (localStorage.getItem("highScore") == null) {
      localStorage.setItem("highScore", time)
    }
    if (time != null && time < Number(localStorage.getItem("highScore"))) {
      localStorage.setItem("highScore", time)
    }
    return
  }





  fadeOutFunction()
}





function setup() {
  // frameRate(30)
  angleMode(DEGREES)
  createCanvas(800, 400);
  fadeInFunction()
  // currentLevel = 7

  if (!inMenu) new level(levelList[currentLevel]).load()


  vx = 1 * 0.1
  posx = 50

 
  //UI buttons
  for (let i = 0; i < buttonImages.length; i++) {
   
    let btn = createImg(buttonImages[i].defaultImg, `Button ${i + 1}`)
    btn.position(buttonImages[i].position.x, buttonImages[i].position.y)
    btn.size(buttonImages[i].scale.x, buttonImages[i].scale.y)
    
    if(i === 3 || i === 4){

      btn.mousePressed(() => onoffButtons(i))
  
    } else {

      btn.mousePressed(() => handleButtonClick(i))
      btn.mouseOver(() => handleMouseOver(btn))
      btn.mouseOut(() => handleMouseOut(btn))

    }
    
    buttons.push(btn)
    // playingmusic.loop()
  }
  
}

function draw() {
  // if (!playingmusic.isPlaying()) {
  //   playingmusic.play()
  // }

  deltaTime = deltaTime > 100 ? 0 : deltaTime

  if (showOptMenu) {
    deltaTime = 0
  }
  outputVolume(volume)
  levelSelectFunc();
  menuFunc();



  // player = new Player(1,1,1,1)
  // goal = new Goal(1,1,1,1)


  if (currentLevel == chapterOneLevels.length + chapterTwoLevels.length) {
    clear()
    background(48, 255, 0)

    posx += vx
  
    if (posx >= width / 2 - 50 || posx <= 0) {
      vx *= -1
    }
  
    for (let i = 0; i < 4; i++) {
      for (let color = 0; color < 3; color++) {
        fill(0, 200 - 80 * color, 80)
        noStroke();
  
        // The top
        rect(posx + i * 400 - 243 * color - 340 - 1, 50 + 100 * color, 200 - 15 * (3 - color), 200)
  
        // The bottom
        rect(posx + i * 400 - 243 * color - 340, 100 + 100 * color, 400, 200)
      }
    }
    // fill(0)
    // rect(0,0, 10000, 100000)
    // fill(255)
    // textSize(100)
    // text("YOU WIN", 200, 200)

    player = null
    goal = null
    // currentLevel = 0
    inMenu = false
    objectList = []

    stroke(0)
    textSize(40)
    textAlign(CENTER)
    fill(255,255,0)
    text("YOU WON", 400,150)
    fill(255)
    if (time != null) {
      text("Time: " + (time/1000).toFixed(2), 400, 250)
      text("High score time: " + (Number(localStorage.getItem("highScore"))/1000).toFixed(2), 400, 400-5)
    }
    regulateOptMenu()
    // toHome()
    return
  }

  if (player == null) {
    return
  }


  // This section creates a dynamic background that shifts x coord defined by the players movement.
  background(floor(currentLevel / 9) == 0 ? 0 : 255,floor(currentLevel / 9) == 0  ? 255 : 0, floor(currentLevel / 9) == 0  ? 0 : 255)
  noStroke()
  for (let i = 0; i < 4; i++) {
    for (let color = 0; color < 3; color++) {
      fill(floor(currentLevel / 9) == 0  ? 0 : 200-60*color, floor(currentLevel / 9) == 0  ? 200-60*color : 0, floor(currentLevel / 9) == 0  ? 0 : 200-60*color)
      
      // The top
      rect(player.x*0.01 * (3-color) + i * 400 - 243 * color - 240 - 1, 50 + 100*color, 200 - 15 * (3-color), 200)
      
      // The bottom
      rect(player.x*0.01 * (3-color) + i * 400 - 243 * color - 240, 100 + 100*color, 400, 200)
    }
  }

  
  // If edit mode is on enable the draw and selection tool.
  if (isEditMode) {

    // If mode is equal to draw it will make a square at the mouses center.
    if (isDragging && toolMode == "draw") {
      fill(0)
      rect(mousePosX, mousePosY, mouseX - mousePosX, mouseY - mousePosY)
    }



    // If the selected object is not null it will move according to the mouses new position subtracted by the last.
    else if (isDragging && selectedObject != null) {
      let position = selectedObject.getLocation()
      let x = position[0]
      let y = position[1]



      selectedObject.setLocation(x + mouseX - pmouseX, y + mouseY - pmouseY)
      
    }
    
    
    // If in edit mode it will draw the objects placed by the draw tool. TODO not really needed since the array cant be updated if not in edit mode anyway. Could be usefull for later ig.
  }
  
  // Draws the player as well as all of the objects in the objectList array.
  time = time == null ? null : time + deltaTime
  goal.draw()
  for (let i = 0; i < objectList.length; i++) {
    objectList[i].draw()
  }
  for (let i = 0; i < objectList.length; i++) {
    objectList[i].drawEnemies()
  }
  player.draw()
  for (let i = 0; i < pong.length; i++) {
    if (pong[i] != null) {
      pong[i].draw()
    }
  }
  if (shot != null) {
    shot.draw()
  }
  fill(255)
  stroke(0)
  textAlign(LEFT)
  textSize(32)
  textFont(font)
  if (time != null) {
    text((time / 1000).toFixed(2), 150,50)
  }

  text(levelList[currentLevel], 70, 50)
  
  


  let sizer = 55
  let sizerMod = sizer / 0
  noStroke()
  // console.log(mouseX)
  drawBoss();
  regulateOptMenu()
  if (fade.in) {
    let fadeAmount = -0.5
    fade.level += fadeAmount*deltaTime
    fill(0,0,0, 255 - fade.level)
    rect(0,0,1000, 1000)
    if (fade.level <= 0) {
      new level(levelList[currentLevel]).load()
      fadeInFunction()
    }
  } else {
    let fadeAmount = 0.5
    fade.level += fadeAmount*deltaTime
    fill(0,0,0, 255 - fade.level)
    rect(0,0,1000, 1000)  
  }

  function drawBoss() {
    if (bossCycleArray != null) {
      for (let row = 0; row < 5; row++) {
        for (let column = 0; column < 8; column++) {
          if (bossCycleArray[row][column] > 0) {
            fill(255);
            // if (row != 4 && Math.abs(snakeArray[row+1][column] - snakeArray[row][column]) == 1) {
            //   rect(column * (sizer + sizer/sizerMod) + (400-((7 * (sizer + sizer/sizerMod) + sizer) / 2)), row * (sizer+sizer/sizerMod)+80 + sizer / 2, sizer)
            // }
            // if (column != 7 && Math.abs(snakeArray[row][column+1] - snakeArray[row][column]) == 1) {
            //   rect(column * (sizer + sizer/sizerMod) + (400-((7 * (sizer + sizer/sizerMod) + sizer) / 2)) + sizer / 2, row * (sizer+sizer/sizerMod)+80, sizer)
            // }
            // if (snakeArray[row][column] == snakeLength) {
            //   fill(0, 255, 0)
            // } else {
            //   fill(255)
            // }
            let snakebit = new Platform(sizer - 10, sizer - 10, column * (sizer + sizer / sizerMod) + (400 - ((7 * (sizer + sizer / sizerMod) + sizer) / 2)) + sizer / 2, row * (sizer + sizer / sizerMod) + 80 + sizer / 2);
            // rect(column * (sizer + sizer/sizerMod) + (400-((7 * (sizer + sizer/sizerMod) + sizer) / 2)), row * (sizer+sizer/sizerMod)+80, sizer)
            // Straights
            // console.log((column != 0 || column != 7) && Math.abs(snakeArray[row][column+1] - snakeArray[row][column]) == 1 && Math.abs(snakeArray[row][column-1] - snakeArray[row][column]) == 1)
            if ((column != 0 && column != 7 && bossCycleArray[row][column - 1] != 0) && bossCycleArray[row][column - 1] - bossCycleArray[row][column] == -1 && bossCycleArray[row][column + 1] - bossCycleArray[row][column] == 1) {
              image(snakeStraight, column * (sizer + sizer / sizerMod) + (400 - ((7 * (sizer + sizer / sizerMod) + sizer) / 2)), row * (sizer + sizer / sizerMod) + 80, sizer, sizer);
            }


            if ((column != 0 && column != 7 && bossCycleArray[row][column + 1] != 0) && bossCycleArray[row][column - 1] - bossCycleArray[row][column] == 1 && bossCycleArray[row][column + 1] - bossCycleArray[row][column] == -1) {
              scale(-1, 1);
              image(snakeStraight, -(column * (sizer + sizer / sizerMod) + (400 - ((7 * (sizer + sizer / sizerMod) + sizer) / 2))) - sizer, row * (sizer + sizer / sizerMod) + 80, sizer, sizer);
              scale(-1, 1);
            }


            // Corner
            // console.log(snakeArray[row+1][column] - snakeArray[row][column],  snakeArray[row-1][column] - snakeArray[row][column])
            if ((row != 0 && row != 4 && bossCycleArray[row - 1][column] != 0) && bossCycleArray[row + 1][column] - bossCycleArray[row][column] == 1 && bossCycleArray[row - 1][column] - bossCycleArray[row][column] == -1) {
              translate(1 * (column * (sizer + sizer / sizerMod) + (400 - ((7 * (sizer + sizer / sizerMod) + sizer) / 2)) + sizer / 2), 1 * (row * (sizer + sizer / sizerMod) + 80 + sizer / 2));
              rotate(90);
              imageMode(CENTER);
              image(snakeStraight, 0, 0, sizer, sizer);
              imageMode(CORNER);
              rotate(-90);
              translate(-1 * (column * (sizer + sizer / sizerMod) + (400 - ((7 * (sizer + sizer / sizerMod) + sizer) / 2)) + sizer / 2), -1 * (row * (sizer + sizer / sizerMod) + 80 + sizer / 2));

            }

            if ((row != 0 && row != 4 && bossCycleArray[row + 1][column] != 0) && bossCycleArray[row + 1][column] - bossCycleArray[row][column] == -1 && bossCycleArray[row - 1][column] - bossCycleArray[row][column] == 1) {
              translate(1 * (column * (sizer + sizer / sizerMod) + (400 - ((7 * (sizer + sizer / sizerMod) + sizer) / 2)) + sizer / 2), 1 * (row * (sizer + sizer / sizerMod) + 80 + sizer / 2));
              rotate(-90);
              imageMode(CENTER);
              image(snakeStraight, 0, 0, sizer, sizer);
              imageMode(CORNER);
              rotate(90);
              translate(-1 * (column * (sizer + sizer / sizerMod) + (400 - ((7 * (sizer + sizer / sizerMod) + sizer) / 2)) + sizer / 2), -1 * (row * (sizer + sizer / sizerMod) + 80 + sizer / 2));

            }

            if ((column != 0 && row != 0 && bossCycleArray[row][column - 1]) && bossCycleArray[row][column - 1] - bossCycleArray[row][column] == -1 && bossCycleArray[row - 1][column] - bossCycleArray[row][column] == 1) {
              image(snakeCorner, column * (sizer + sizer / sizerMod) + (400 - ((7 * (sizer + sizer / sizerMod) + sizer) / 2)), row * (sizer + sizer / sizerMod) + 80, sizer, sizer);
            }


            if ((column != 0 && row != 4 && bossCycleArray[row + 1][column] != 0) && bossCycleArray[row][column - 1] - bossCycleArray[row][column] == 1 && bossCycleArray[row + 1][column] - bossCycleArray[row][column] == -1) {
              translate(1 * (column * (sizer + sizer / sizerMod) + (400 - ((7 * (sizer + sizer / sizerMod) + sizer) / 2)) + sizer / 2), 1 * (row * (sizer + sizer / sizerMod) + 80 + sizer / 2));
              rotate(-90);
              imageMode(CENTER);
              image(snakeCorner, 0, 0, sizer, sizer);
              imageMode(CORNER);
              rotate(90);
              translate(-1 * (column * (sizer + sizer / sizerMod) + (400 - ((7 * (sizer + sizer / sizerMod) + sizer) / 2)) + sizer / 2), -1 * (row * (sizer + sizer / sizerMod) + 80 + sizer / 2));
            }


            if ((column != 7 && row != 4 && bossCycleArray[row][column + 1] != 0) && bossCycleArray[row][column + 1] - bossCycleArray[row][column] == -1 && bossCycleArray[row + 1][column] - bossCycleArray[row][column] == 1) {
              translate(1 * (column * (sizer + sizer / sizerMod) + (400 - ((7 * (sizer + sizer / sizerMod) + sizer) / 2)) + sizer / 2), 1 * (row * (sizer + sizer / sizerMod) + 80 + sizer / 2));
              rotate(-180);
              imageMode(CENTER);
              image(snakeCorner, 0, 0, sizer, sizer);
              imageMode(CORNER);
              rotate(180);
              translate(-1 * (column * (sizer + sizer / sizerMod) + (400 - ((7 * (sizer + sizer / sizerMod) + sizer) / 2)) + sizer / 2), -1 * (row * (sizer + sizer / sizerMod) + 80 + sizer / 2));
            }


            if ((column != 7 && row != 0 && bossCycleArray[row - 1][column] != 0) && bossCycleArray[row][column + 1] - bossCycleArray[row][column] == 1 && bossCycleArray[row - 1][column] - bossCycleArray[row][column] == -1) {
              translate(1 * (column * (sizer + sizer / sizerMod) + (400 - ((7 * (sizer + sizer / sizerMod) + sizer) / 2)) + sizer / 2), 1 * (row * (sizer + sizer / sizerMod) + 80 + sizer / 2));
              rotate(90);
              imageMode(CENTER);
              image(snakeCorner, 0, 0, sizer, sizer);
              imageMode(CORNER);
              rotate(-90);
              translate(-1 * (column * (sizer + sizer / sizerMod) + (400 - ((7 * (sizer + sizer / sizerMod) + sizer) / 2)) + sizer / 2), -1 * (row * (sizer + sizer / sizerMod) + 80 + sizer / 2));
            }





            // Corner flipped
            if ((column != 0 && row != 4 && bossCycleArray[row][column - 1] != 0) && bossCycleArray[row][column - 1] - bossCycleArray[row][column] == -1 && bossCycleArray[row + 1][column] - bossCycleArray[row][column] == 1) {
              translate(1 * (column * (sizer + sizer / sizerMod) + (400 - ((7 * (sizer + sizer / sizerMod) + sizer) / 2)) + sizer / 2), 1 * (row * (sizer + sizer / sizerMod) + 80 + sizer / 2));
              rotate(-180);
              imageMode(CENTER);
              image(snakeCornerFlipepd, 0, 0, sizer, sizer);
              imageMode(CORNER);
              rotate(180);
              translate(-1 * (column * (sizer + sizer / sizerMod) + (400 - ((7 * (sizer + sizer / sizerMod) + sizer) / 2)) + sizer / 2), -1 * (row * (sizer + sizer / sizerMod) + 80 + sizer / 2));
            }


            if ((column != 7 && row != 4 && bossCycleArray[row + 1][column] != 0) && bossCycleArray[row][column + 1] - bossCycleArray[row][column] == 1 && bossCycleArray[row + 1][column] - bossCycleArray[row][column] == -1) {
              translate(1 * (column * (sizer + sizer / sizerMod) + (400 - ((7 * (sizer + sizer / sizerMod) + sizer) / 2)) + sizer / 2), 1 * (row * (sizer + sizer / sizerMod) + 80 + sizer / 2));
              rotate(-270);
              imageMode(CENTER);
              image(snakeCornerFlipepd, 0, 0, sizer, sizer);
              imageMode(CORNER);
              rotate(270);
              translate(-1 * (column * (sizer + sizer / sizerMod) + (400 - ((7 * (sizer + sizer / sizerMod) + sizer) / 2)) + sizer / 2), -1 * (row * (sizer + sizer / sizerMod) + 80 + sizer / 2));
            }


            if ((column != 7 && row != 0 && bossCycleArray[row][column + 1] != 0) && bossCycleArray[row][column + 1] - bossCycleArray[row][column] == -1 && bossCycleArray[row - 1][column] - bossCycleArray[row][column] == 1) {
              translate(1 * (column * (sizer + sizer / sizerMod) + (400 - ((7 * (sizer + sizer / sizerMod) + sizer) / 2)) + sizer / 2), 1 * (row * (sizer + sizer / sizerMod) + 80 + sizer / 2));
              rotate(0);
              imageMode(CENTER);
              image(snakeCornerFlipepd, 0, 0, sizer, sizer);
              imageMode(CORNER);
              rotate(-0);
              translate(-1 * (column * (sizer + sizer / sizerMod) + (400 - ((7 * (sizer + sizer / sizerMod) + sizer) / 2)) + sizer / 2), -1 * (row * (sizer + sizer / sizerMod) + 80 + sizer / 2));
            }


            if ((column != 0 && row != 0 && bossCycleArray[row - 1][column] != 0) && bossCycleArray[row][column - 1] - bossCycleArray[row][column] == 1 && bossCycleArray[row - 1][column] - bossCycleArray[row][column] == -1) {
              translate(1 * (column * (sizer + sizer / sizerMod) + (400 - ((7 * (sizer + sizer / sizerMod) + sizer) / 2)) + sizer / 2), 1 * (row * (sizer + sizer / sizerMod) + 80 + sizer / 2));
              rotate(-90);
              imageMode(CENTER);
              image(snakeCornerFlipepd, 0, 0, sizer, sizer);
              imageMode(CORNER);
              rotate(90);
              translate(-1 * (column * (sizer + sizer / sizerMod) + (400 - ((7 * (sizer + sizer / sizerMod) + sizer) / 2)) + sizer / 2), -1 * (row * (sizer + sizer / sizerMod) + 80 + sizer / 2));
            }



            // Head
            if ((column != 0) && bossCycleArray[row][column] == bossLength && bossCycleArray[row][column - 1] - bossCycleArray[row][column] == -1) {
              translate(1 * (column * (sizer + sizer / sizerMod) + (400 - ((7 * (sizer + sizer / sizerMod) + sizer) / 2)) + sizer / 2), 1 * (row * (sizer + sizer / sizerMod) + 80 + sizer / 2));
              rotate(0);
              imageMode(CENTER);
              image(snakeHead, 0, 0, sizer, sizer);
              imageMode(CORNER);
              rotate(0);
              translate(-1 * (column * (sizer + sizer / sizerMod) + (400 - ((7 * (sizer + sizer / sizerMod) + sizer) / 2)) + sizer / 2), -1 * (row * (sizer + sizer / sizerMod) + 80 + sizer / 2));
            }

            if ((column != 7) && bossCycleArray[row][column] == bossLength && bossCycleArray[row][column + 1] - bossCycleArray[row][column] == -1) {
              translate(1 * (column * (sizer + sizer / sizerMod) + (400 - ((7 * (sizer + sizer / sizerMod) + sizer) / 2)) + sizer / 2), 1 * (row * (sizer + sizer / sizerMod) + 80 + sizer / 2));
              rotate(180);
              imageMode(CENTER);
              image(snakeHead, 0, 0, sizer, sizer);
              imageMode(CORNER);
              rotate(180);
              translate(-1 * (column * (sizer + sizer / sizerMod) + (400 - ((7 * (sizer + sizer / sizerMod) + sizer) / 2)) + sizer / 2), -1 * (row * (sizer + sizer / sizerMod) + 80 + sizer / 2));
            }

            if ((row != 0) && bossCycleArray[row][column] == bossLength && bossCycleArray[row - 1][column] - bossCycleArray[row][column] == -1) {
              translate(1 * (column * (sizer + sizer / sizerMod) + (400 - ((7 * (sizer + sizer / sizerMod) + sizer) / 2)) + sizer / 2), 1 * (row * (sizer + sizer / sizerMod) + 80 + sizer / 2));
              rotate(90);
              imageMode(CENTER);
              image(snakeHead, 0, 0, sizer, sizer);
              imageMode(CORNER);
              rotate(-90);
              translate(-1 * (column * (sizer + sizer / sizerMod) + (400 - ((7 * (sizer + sizer / sizerMod) + sizer) / 2)) + sizer / 2), -1 * (row * (sizer + sizer / sizerMod) + 80 + sizer / 2));
            }

            if ((row != 4) && bossCycleArray[row][column] == bossLength && bossCycleArray[row + 1][column] - bossCycleArray[row][column] == -1) {
              translate(1 * (column * (sizer + sizer / sizerMod) + (400 - ((7 * (sizer + sizer / sizerMod) + sizer) / 2)) + sizer / 2), 1 * (row * (sizer + sizer / sizerMod) + 80 + sizer / 2));
              rotate(-90);
              imageMode(CENTER);
              image(snakeHead, 0, 0, sizer, sizer);
              imageMode(CORNER);
              rotate(90);
              translate(-1 * (column * (sizer + sizer / sizerMod) + (400 - ((7 * (sizer + sizer / sizerMod) + sizer) / 2)) + sizer / 2), -1 * (row * (sizer + sizer / sizerMod) + 80 + sizer / 2));
            }



            // Tail
            if ((column != 0) && bossCycleArray[row][column] == 1 && bossCycleArray[row][column - 1] - bossCycleArray[row][column] == 1) {
              translate(1 * (column * (sizer + sizer / sizerMod) + (400 - ((7 * (sizer + sizer / sizerMod) + sizer) / 2)) + sizer / 2), 1 * (row * (sizer + sizer / sizerMod) + 80 + sizer / 2));
              rotate(0);
              imageMode(CENTER);
              image(snakeTail, 0, 0, sizer, sizer);
              imageMode(CORNER);
              rotate(0);
              translate(-1 * (column * (sizer + sizer / sizerMod) + (400 - ((7 * (sizer + sizer / sizerMod) + sizer) / 2)) + sizer / 2), -1 * (row * (sizer + sizer / sizerMod) + 80 + sizer / 2));
            }

            if ((column != 7) && bossCycleArray[row][column] == 1 && bossCycleArray[row][column + 1] - bossCycleArray[row][column] == 1) {
              translate(1 * (column * (sizer + sizer / sizerMod) + (400 - ((7 * (sizer + sizer / sizerMod) + sizer) / 2)) + sizer / 2), 1 * (row * (sizer + sizer / sizerMod) + 80 + sizer / 2));
              rotate(180);
              imageMode(CENTER);
              image(snakeTail, 0, 0, sizer, sizer);
              imageMode(CORNER);
              rotate(180);
              translate(-1 * (column * (sizer + sizer / sizerMod) + (400 - ((7 * (sizer + sizer / sizerMod) + sizer) / 2)) + sizer / 2), -1 * (row * (sizer + sizer / sizerMod) + 80 + sizer / 2));
            }

            if ((row != 0) && bossCycleArray[row][column] == 1 && bossCycleArray[row - 1][column] - bossCycleArray[row][column] == 1) {
              translate(1 * (column * (sizer + sizer / sizerMod) + (400 - ((7 * (sizer + sizer / sizerMod) + sizer) / 2)) + sizer / 2), 1 * (row * (sizer + sizer / sizerMod) + 80 + sizer / 2));
              rotate(90);
              imageMode(CENTER);
              image(snakeTail, 0, 0, sizer, sizer);
              imageMode(CORNER);
              rotate(-90);
              translate(-1 * (column * (sizer + sizer / sizerMod) + (400 - ((7 * (sizer + sizer / sizerMod) + sizer) / 2)) + sizer / 2), -1 * (row * (sizer + sizer / sizerMod) + 80 + sizer / 2));
            }

            if ((row != 4) && bossCycleArray[row][column] == 1 && bossCycleArray[row + 1][column] - bossCycleArray[row][column] == 1) {
              translate(1 * (column * (sizer + sizer / sizerMod) + (400 - ((7 * (sizer + sizer / sizerMod) + sizer) / 2)) + sizer / 2), 1 * (row * (sizer + sizer / sizerMod) + 80 + sizer / 2));
              rotate(-90);
              imageMode(CENTER);
              image(snakeTail, 0, 0, sizer, sizer);
              imageMode(CORNER);
              rotate(90);
              translate(-1 * (column * (sizer + sizer / sizerMod) + (400 - ((7 * (sizer + sizer / sizerMod) + sizer) / 2)) + sizer / 2), -1 * (row * (sizer + sizer / sizerMod) + 80 + sizer / 2));
            }



            if (doObjectCollide(player, snakebit) && !fade.in) {
              // console.log("player collided with", row, column) 
              let position = snakebit.getLocation();
              let x = position[0];
              let y = position[1];

              if (bossCycleArray[row][column] == bossLength) {
                console.log("Killed by boss snake")
                reload();
              }

              let velocities = snakebit.getVelocities();
              let vx = velocities[0];
              let vy = velocities[1];
              if (player.y + player.height / 2 - (player.vy * deltaTime + 2) <= y - snakebit.height / 2 - vy * deltaTime) {
                // console.log("activated")
                player.grounded = snakebit;
                player.vy = 0;
                player.y = y - snakebit.height / 2 - player.height / 2;
              } else {
                // Right side of snakebit collision
                console.log(player.x - player.width / 2 - (player.vx * deltaTime), x + snakebit.width / 2 - vx * deltaTime);
                if (player.x - player.width / 2 - (player.vx * deltaTime) >= x + snakebit.width / 2 - vx * deltaTime) {
                  player.x = x + snakebit.width / 2 + player.width / 2 + 2;
                }
                // Left side of snakebit collision
                if (player.x + player.width / 2 - (player.vx * deltaTime) <= x - snakebit.width / 2 - vx * deltaTime) {
                  player.x = x - snakebit.width / 2 - player.width / 2 - 2;
                }
              }
            }
            // if (column == 7) {
            //   console.log(400-((7 * (sizer + sizer/10) + sizer) / 2))
            // }
          }
        }
      }
    }
  }

  function menuFunc() {
    if (inMenu) {
      background(48, 255, 0);

      posx += vx;

      if (posx >= width / 2 - 50 || posx <= 0) {
        vx *= -1;
      }

      for (let i = 0; i < 4; i++) {
        for (let color = 0; color < 3; color++) {
          fill(0, 200 - 80 * color, 80);
          noStroke();

          // The top
          rect(posx + i * 400 - 243 * color - 340 - 1, 50 + 100 * color, 200 - 15 * (3 - color), 200);

          // The bottom
          rect(posx + i * 400 - 243 * color - 340, 100 + 100 * color, 400, 200);
        }
      }

      image(logo, logoX, logoY, 550, 550);

      if (showLevelSelect) {
        fill(215);
        // rect(0+35,height/2+100,width-70,height/2)
        let height = 40;
        for (let i = 0; i < 100; i++) {

          image(tiles[(i % 6 * Math.floor(i / 6)) % 6], 70 * (i % 20) - 10, 290 + height * Math.floor(i / 20), 70, height);
        }
        noSmooth();

      } else {
        textFont(font)
        textSize(32)
        textAlign(LEFT)
        text("V:" + version, 10, 32+14)  
  
      }

      regulateOptMenu();

      buttons.forEach((btn, i) => {
        if (i !== 5) {
          btn.style('opacity', 1 - fadeOpacity / 255);
        }
      });

      machines.forEach(machine => {
        machine.style('opacity', 1 - fadeOpacity / 255);
      });




      if (fading) {

        fadeOpacity = lerp(fadeOpacity, fadeTarget, fadeSpeed * deltaTime);

        fill(0, fadeOpacity);
        rect(0, 0, width, height);

        if (abs(fadeOpacity - fadeTarget) < 1) {

          fadeOpacity = fadeTarget;
          fading = false;

          if (fadeTarget == 255) {
            fadingDone = true;
            moveButton();
            startFadeOut();
          } else {
            fadingDone = false;
          }

        }

      }
    }
    else {
      machines.forEach(machine => {
        machine.hide();
      });
    }
  }

  function levelSelectFunc() {
    if (isLevelSelect) {
      unlockedLevels = localStorage.getItem("levels") != "" ? Number(localStorage.getItem("levels")) : 0;
      background(48, 255, 0);

      posx += vx;

      if (posx >= width / 2 - 50 || posx <= 0) {
        vx *= -1;
      }

      for (let i = 0; i < 4; i++) {
        for (let color = 0; color < 3; color++) {
          fill(0, 200 - 80 * color, 80);
          noStroke();

          // The top
          rect(posx + i * 400 - 243 * color - 340 - 1, 50 + 100 * color, 200 - 15 * (3 - color), 200);

          // The bottom
          rect(posx + i * 400 - 243 * color - 340, 100 + 100 * color, 400, 200);
        }
      }
      let mouseGrab = false;
      noSmooth();
      for (let i = 0; i < 9; i++) {
        // rect(75*(i%4) + 262.5, 75*Math.floor(i/4) + 100, 50, 50)
        if (i > unlockedLevels - 9 * chapterSelected) {
          if (i == 8) {
            continue;
          }
          image(levelImages[8+10 * chapterSelected], 75 * (i % 4) + 262.5 + Math.floor(i / 8) * 112.5, 75 * Math.floor(i / 4) + 100, 50, 50);
          continue;
        }
        image(levelImages[i + chapterSelected * 9 == 8 + chapterSelected * 9 ? 9 + 10 * chapterSelected : i + chapterSelected * 10], 75 * (i % 4) + 262.5 + Math.floor(i / 8) * 112.5, 75 * Math.floor(i / 4) + 100, 50, 50);
        if (mouseX >= 75 * (i % 4) + 262.5 + Math.floor(i / 8) * 112.5 && mouseX <= 75 * (i % 4) + 50 + 262.5 + Math.floor(i / 8) * 112.5 && mouseY >= 75 * Math.floor(i / 4) + 100 && mouseY <= 75 * Math.floor(i / 4) + 50 + 100 && !showOptMenu) {
          mouseGrab = true;
          if (mouseIsPressed) {
            mouseGrab = false;
            currentLevel = i + chapterSelected * 9;
            isLevelSelect = false;
            // reload()
            if (currentLevel == 0) {
              time = 0;
            } else {
              time = null;
            }
            fadeInFunction();
            new level(levelList[i + chapterOneLevels.length*chapterSelected]).load();
          }
        }
      }

      if (mouseGrab) {
        cursor(HAND);
      } else {
        cursor(ARROW);
      }
      regulateOptMenu();
    }
  }
}

function collisionHandeler(list) {
  // This collision handler takes the players position and makes it collide with all objects in the "list" provided as an argument. It prioritizes floors over walls but can still collide with both.


  for (let i = 0; i < list.length; i++) {
    let object = list[i]
    let position = object.getLocation()
    let x = position[0]
    let y = position[1]


    if (doObjectCollide(player, object)) {
      let dx = (x - player.x) / (object.width/2 + player.width/2)
      let dy = (y - player.y) / (object.height/2 + player.height/2)
  
      let overlapX = (object.width / 2 + player.width / 2) - Math.abs(x - player.x);
      let overlapY = (object.height / 2 + player.height / 2) - Math.abs(y - player.y);


      let vel = object.getVelocities()
      let vx = vel[0]
      let vy = vel[1]

      
      var absDX = abs(dx)/*  + abs(player.vx) + abs(vx) */
      var absDY = abs(dy)/*  + abs(player.vy) + abs(vy) */

  
      if (abs(absDX - absDY) < 0.0001) {
        if (dx < 0) {
          player.x = x + object.width / 2 + player.width / 2
          player.vx = 0
        } else {
          player.x = x - object.width / 2 - player.width / 2
          player.vx = 0
        }

        if (dy < 0) {
          player.y = y + object.height / 2 + player.height / 2
          // player.vy = 0
        } else {
          player.y = y - object.height / 2 - player.height / 2
          // player.vy = 0
        }
      } else if (overlapX < overlapY) {
        // console.log("Moved to the side of a platform " + i)
        if (dx < 0) {
          console.log(x + object.width / 2 + player.width / 2)
          player.x = x + object.width / 2 + player.width / 2
          player.vx = 0
        } else {
          player.x = x - object.width / 2 - player.width / 2
          player.vx = 0
        }
      } else {
        if (dy < 0) {
          player.y = y + object.height / 2 + player.height / 2
          // player.vx = 0
          // player.grounded = list[i]
          player.vy = player.vy /2

        } else if (player.vy > 0) {
          player.y = y - object.height / 2 - player.height / 2
          player.vy = 0
          player.grounded = list[i]
        }
      }
    }
    }




  // for (let i = 0; i < list.length; i++) {
  //   let object = list[i]
  //   let position = object.getLocation()
  //   let x = position[0]
  //   let y = position[1]
  
  //   if (doObjectCollide(player, object)) {




  //     let velocities = object.getVelocities()
  //     let vx = velocities[0]
  //     let vy = velocities[1]
  //     // Floor collision
  //     if (player.y + player.height / 2 - (player.vy*deltaTime) <= y - object.height / 2 - vy*deltaTime+1) {
  //       player.grounded = list[i];
  //       player.vy = 0
  //       player.y = y - object.height/2 - player.height/2
  //     } else {
  //       // Right side of object collision
  //       if (player.x - player.width / 2 - (player.vx*deltaTime) >= x + object.width / 2 - vx*deltaTime) {
  //         player.x = x + object.width/2 + player.width/2 + 2
  //       }
  //       // Left side of object collision
  //       if (player.x + player.width / 2 - (player.vx*deltaTime) <= x - object.width / 2 - vx*deltaTime) {
  //         player.x = x - object.width/2 - player.width/2 - 2
  //       }
  //     }

      





  //     // // Colliding with floor
  //     // if ((y - object.height / 2)-(player.y + player.height / 2) /* + player.vy*deltaTime */ > -5) {
  //     //   player.grounded = list[i];
  //     //   player.vy = 0
  //     //   player.y = y - object.height/2 - player.height/2 
  //     // }
  //     // else {
  //     //   // Colliding with object left side
  //     //   if ((x - object.width / 2)-(player.x + player.width / 2) + player.vx > -10) {
  //     //     //player.vx = 0
  //     //     player.x = x - object.width/2 - player.width/2
  //     //   }
  //     //   // Colliding with object right side
  //     //   if ((x + object.width / 2)-(player.x - player.width / 2) + player.vx < 10) {
  //     //     //player.vx = 0
  //     //     player.x = x + object.width/2 + player.width/2
  //     //   }
  //     // }
  //   }
  // }
}

// Its a simple function that returns true if the player and object collide.
function doObjectCollide(player, object) {
  let position = object.getLocation()
  let x = position[0]
  let y = position[1]
  return (abs(player.x - x) * 2 < (player.width + object.width)) && (abs(player.y - y) * 2 < (player.height + object.height));
}

// Sets the released bool to be true.
function keyReleased(event) {
  if (event.keyCode == 38 ||event.keyCode == 87) {
    released = true;
  }
}

// Now this function is a bit more complicated... Instead of doing something easy like making a variable or something this instead handles most of the mouse opperations. First it sets the x and y to the correct mousex and y positions. It then loops over all of the placed objects array which holds the objects that are made with the edit-draw mode. It checcks if the mouse is within the borders of set objects and selects it if it does. A selected object will behave accorded to the edit mode. If the delete key is pressed while selecting it will remove set object from the list which deletes it.
function mousePressed(event) {
  if (optmenu) {
    let sliderWidth = slider.width*1.2
    let sliderHeight = slider.height*1.2
    let sliderY = 282
  
    if(mouseX >= sliderX && 
       mouseX <= sliderX + sliderWidth && 
       mouseY >= sliderY 
       && mouseY <= sliderY + sliderHeight){
  
      sliderActive = true
  
    }
  }
  isDragging = true
  selectedObject = null
  mousePosX = mouseX
  mousePosY = mouseY

  console.log(mousePosX,mousePosY)
  for (let i = 0; i < objectList.length; i++) {
    let bb = objectList[i].getBoundingBox()
    let ix = bb[0]
    let iy = bb[1]
    let ax = bb[2]
    let ay = bb[3]
    if(ix <= mousePosX && mousePosX <= ax && iy <= mousePosY && mousePosY <= ay ) {
      console.log("bb " + i)
      selectedObject = objectList[i]
      if (keyIsDown(8)) {
        if (i == 0) {
          objectList.shift()
        } else if (i == objectList.length-1) {
          objectList.pop()
        } else { 
          const list1 = objectList.slice(0, i)
          const list2 = objectList.slice(i+1);
  
          console.log(objectList, list2, list2)
          objectList = list1.concat(list2);
        }

      }
      if (isEditMode) {

        if (keyIsDown(84)) {
  
          objectList[i].trapArray.push(new Trap(0, -25, UP_ARROW))
          // console.log(placedObjects)
        } else if(keyIsDown(66)) {
          objectList[i].trapArray.push(new Button(0, selectedObject.height/2 * -1, UP_ARROW, ["resetButton", "moveBlock"]))
        } else if (keyIsDown(83)) {
          objectList[i].trapArray.push(new Shooter(0, 0, RIGHT, 10))
        }
      }
    }
  }
}

// Draws the appropriate shape and pushes it onto the placed objects list.
function mouseReleased(event){
  sliderActive = false

  if (toolMode == "draw" && mouseY-mousePosY > 10 && mouseX-mousePosX > 10) {
    objectList.push(new Platform(mouseY-mousePosY, mouseX-mousePosX, mousePosX + (mouseX - mousePosX)/2, mousePosY + (mouseY-mousePosY)/2))
  }
  isDragging = false
}

// I am now officialy going insane explaining my functions. This seems somewhat self explanatory right?
function selectTool() {
  toolMode = "select"
}

// I mean this is the first time i do this and i really think i should practice commenting. Its just SO INCREDIBLY BORING.
function drawTool() {
  toolMode = "draw"
}

// Takes all of the objects currently in the placedObjects list and sends it back to the player in a json format so that they can paste it into a level json file.
function exportObjects() {
  console.log(JSON.stringify(objectList))
}

function fadeInFunction() {
  fade = {
    level: -50,
    in: false
  }
  
}

function fadeOutFunction() {
  fade = {
    level: 255,
    in: true
  }
}

function handleMouseOver(btn) {
  btn.style('box-shadow', '0 0 20px rgba(255, 255, 255, 0.4)')
 
}

function handleMouseOut(btn) {
  btn.style('box-shadow', 'none')

}
function handleButtonClick(i) {


  if (i == 0) {
    console.log('Start Game')
    buttons[i].elt.src = buttonImages[i].clickedImg
    buttons[2].show() 
  
   



    startFadeIn()   
  
  } else if (i == 1) {
    console.log('Quit Game')
    buttons[i].elt.src = buttonImages[i].clickedImg
  
  } else if (i== 2 && !showOptMenu){
    console.log('Options')
    showOptMenu = !showOptMenu

    if(showOptMenu){
      
      buttons[3].show().position(width/2+62-42.5,height/2-75)
      buttons[4].show().position(width/2+62-42.5,height/2-8)
      buttons[5].show().position(width/2-50-42.5,height/2+116)
      buttons[6].show().position(width/2+90-42.5,height/2+116)

    }else{
    
      buttons[3].hide()
      buttons[4].hide()
      buttons[5].hide()
      buttons[6].hide()

    }
  } else if (i == 5) {

    setTimeout(() => {
      showOptMenu = !showOptMenu
      buttons[3].hide()
      buttons[4].hide()
      buttons[5].hide()
      buttons[6].hide()
    }, 300)

  } else if (i == 6){

    //tilbage til main menu
    inMenu = true
    isLevelSelect = false
    showOptMenu = false
    toHome()
    

  } else if (i == 7 && !showOptMenu){

    toHome()

  } else if (showOptMenu) {
    return
  }

  buttons[i].elt.src = buttonImages[i].clickedImg

  let clickSound = createAudio('assets/click-buttons-ui-menu-sounds-effects-button-2-203594.mp3')
  clickSound.volume(volume)
  clickSound.play()

  setTimeout(() => {
    buttons[i].elt.src = buttonImages[i].defaultImg
  }, 250)

}
function startFadeIn() {
  fadeTarget = 255
  fading = true
}

function startFadeOut() {
  fadeTarget = 0
  fading = true
}

function moveButton(btn){

  for (let i = 0; i < buttons.length; i++) {
    if(i !== 2 ){
    buttons[i].hide()
    }
  }
  

  logoX = -4000
  logoY = -4000

  showLevelSelect = !showLevelSelect
  buttons[2].position(width-buttons[2].width-10, 10)
  buttons[7].show().position(10,10)

  for (let i = 0; i < machineImages.length; i++) {
    let machineBtn = createImg(Math.floor(unlockedLevels / (9*i)) == 0 ? machineImages[i].lockedImg : machineImages[i].unlockedImg, `Button ${i+1}`)
    machineBtn.position(machineImages[i].position.x, machineImages[i].position.y)
    machineBtn.size(machineImages[i].scale.x, machineImages[i].scale.y)

    machineBtn.mouseOver(() => {
      if (Math.floor(unlockedLevels / (9*i)) == 0) {
        return
      }
      handleMouseOverMachine(machineBtn, machineImages[i].unlockedImg, machineImages[i].clickedImg)
    })

    machineBtn.mouseOut(() => {
      if (Math.floor(unlockedLevels / (9*i)) == 0) {
        return
      }
      handleMouseOutMachine(machineBtn, machineImages[i].unlockedImg)
    })

    machineBtn.mousePressed(() => {
      if (Math.floor(unlockedLevels / (9*i)) == 0) {
        return
      }



      chapterSelected = i
      isLevelSelect = true
      inMenu = false

      fadeInFunction()
      // new level(levels[currentLevel]).load()

    })

    machines.push(machineBtn)

  }
}
function handleMouseOverMachine(machineBtn, unlockedImg, clickedImg) {
  let blink = true
  machineBtn.elt.src = clickedImg

  let blinkInterval = setInterval(() => {
    machineBtn.elt.src = blink ? unlockedImg : clickedImg
    blink = !blink
  }, 400);
 
  machineBtn.blinkInterval = blinkInterval
}
function handleMouseOutMachine(machineBtn, unlockedImg) {
  
  clearInterval(machineBtn.blinkInterval)

  machineBtn.elt.src = unlockedImg
}

function toHome(btn, machineBtn){

  pong = []
  if (isLevelSelect) {
    isLevelSelect = false
    inMenu = true
    for (let i = 0; i < machines.length; i++) {
      machines[i].show()
    }

  } else if (!isLevelSelect && !inMenu) {
    isLevelSelect = true
    // inMenu = true
    clearInterval(bossSnakeLoop)
    time = 0
    bossCycleArray = null
    // showRect = !showRect
    currentLevel = 0
    player = null
    goal = null
    objectList = []


  } else {
    clearInterval(bossSnakeLoop)
    time = 0
    bossCycleArray = null
    showLevelSelect = !showLevelSelect
    currentLevel = 0
  
    logoX = 125
    logoY = -100
  
    buttons[0].position(buttonImages[0].position.x, buttonImages[0].position.y).show()
    buttons[1].position(buttonImages[1].position.x, buttonImages[1].position.y).show()
    
    for (let i = 2; i < buttons.length; i++) {
      buttons[i].hide()
    }
    
    for (let i = 0; i < machines.length; i++) {
      machines[i].hide()
    }
  
    isLevelSelect = false
    inMenu = true
    player = null
    goal = null
    objectList = []
  }

}

function onoffButtons(i){

  if(i == 3){
    playerMusic =!playerMusic

    if(playerMusic){
      buttons[i].elt.src = buttonImages[i].defaultImg
      console.log(playerMusic)
      // playingmusic.play()
    } else {
      buttons[i].elt.src = buttonImages[i].clickedImg
      console.log(playerMusic)
      // playingmusic.pause()
    }

  } else if (i == 4){
    playerSfx = !playerSfx

    if(playerSfx){
      buttons[i].elt.src = buttonImages[i].defaultImg
      console.log(playerSfx)
    } else {
      buttons[i].elt.src = buttonImages[i].clickedImg
      console.log(playerSfx)
    }
  }

}



function reverseControls() {
  if (keyboardControls[0] == 37) {
    keyboardControls = [39, 68, 37, 65, 38, 87]

  } else {
    keyboardControls = [37, 65, 39, 68, 38, 87]
  }
}


function calculateGravity(number) {
  let grav = 0

  if (number <= 9) {
    return 1
  } else if (number <= 16) {
    return 0.5/(number - 9)
  } else {
    return 1
  }
}



function regulateOptMenu() {
  
  if(showOptMenu){
      
    if (sliderActive){
      
      sliderX = constrain(mouseX-slider.width/2, xMin, xMax)
      //console.log(sliderX)

    }

    volume = (sliderX - xMin) / (xMax - xMin)
    // console.log(volume)
    
    fill(0, 255/2)
    rect(0,0,width,height)

    image(optmenu,width/2-(85*1.5),height/2-120*1.5,170*1.5,245*1.5)    

    image(slider, sliderX, 282, image.width*1.2, image.height*1.2)
    
    buttons.forEach((btn, i) => {
      btn.style('filter', 'brightness(50%)')

      if (i == 3 || i == 4 || i == 5 || i == 6) {
        btn.style('filter', 'none')
      }
    })
  
    machines.forEach(machine => {
      machine.style('filter', 'opacity(0%)')
      machine.style('pointer-events', 'none')
      // machine.hide()
    })
 
  } else {
    buttons.forEach(btn => {
      btn.style('filter', 'none')
    })
    
    machines.forEach(machine => {
      machine.style('filter', 'none')
      machine.style('pointer-events', 'auto')
    })

  }

}