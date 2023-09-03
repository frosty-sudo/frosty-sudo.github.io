var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
var playerLength

var intervalID

var foodLocation = Math.floor(Math.random() * 200)

var playerLoc = []
var lastKeyPressed
var game = false






function drawBackground() {
    ctx.beginPath()

    ctx.fillStyle = "black"

    ctx.rect(0, 0, canvas.height, canvas.width)

    ctx.fill()
}




function drawFood(location) {
    var xPosistion = canvas.width / 20
    var xOffset = canvas.width / 100
    var yPosistion = canvas.height / 10
    var yOffset = canvas.height / 50

    var xSize = xPosistion - xOffset*2
    var ySize = yPosistion - yOffset*2


    ctx.beginPath()
    var x = location % 20
    var y = Math.floor(location / 20)

    console.log("Food loc: " + location)
    ctx.fillStyle = "red"
    ctx.rect(x * xPosistion + xOffset, y * yPosistion + yOffset, xSize, ySize)
    ctx.fill()
}



function drawSquares() {
    var counter = 0
    // ctx.strokeStyle = "black"
    // for (let y = 0; y < 10; y++) {
    //     for (let x = 0; x < 20; x++) {
    //         ctx.beginPath()
    //         ctx.rect(x * canvas.width / 20, y * canvas.height / 10, canvas.width / 20, canvas.height / 10)
    //         ctx.font = "14px serif"
    //         ctx.fillText(counter, (x) * canvas.width / 20 + 2, (y + 1) * canvas.height / 10 - 2)
    //         ctx.stroke()
    //         // ctx.fill()
    //         counter++
    //     }
    // }


    ctx.beginPath()
    ctx.fillStyle = "black"
    ctx.rect(0, 0, canvas.width, canvas.height)

    ctx.fill()
}





function drawPlayer(map) {
    for (let i = 0; i < map.length; i++) {
        if (map[i] != 0) {
            var location = i
            ctx.beginPath()
            if (playerLength == map[i]) {
                ctx.fillStyle = "#4CFA7B"
                ctx.strokeStyle = "#4CFA7B"
            } else {
                ctx.fillStyle = "white"
            }
            var x = location % 20
            var y = Math.floor(location / 20)

            var xPosistion = canvas.width / 20
            var xOffset = canvas.width / 100
            var yPosistion = canvas.height / 10
            var yOffset = canvas.height / 50

            var xSize = xPosistion - xOffset*2
            var ySize = yPosistion - yOffset*2


            ctx.beginPath()
            ctx.rect(x * xPosistion + xOffset, y * yPosistion + yOffset, xSize, ySize)
            ctx.fill()
            // ctx.stroke()


            

            ctx.strokeStyle = "white"
            if (calculateContinuation(map[i - 20], map[i])) {
                ctx.fillStyle = "white"
                ctx.beginPath()
                ctx.rect(x * xPosistion + xOffset, y * yPosistion - yOffset, xSize, yPosistion-ySize)
                ctx.fill()
                // ctx.stroke()
            }

            if (calculateContinuation(map[i + 20], map[i])) {
                ctx.fillStyle = "white"
                ctx.beginPath()
                ctx.rect(x * xPosistion + xOffset, y * yPosistion + yOffset+ySize, xSize, yPosistion-ySize)
                // ctx.rect(x * canvas.width / 10 + canvas.width / 40, (y) * canvas.height / 10 + canvas.height / 40 * 3, canvas.width / 20, canvas.height / 20)
                // ctx.stroke()
                ctx.fill()
            }

            if (calculateContinuation(map[i - 1], map[i])) {
                ctx.fillStyle = "white"
                ctx.beginPath()
                ctx.rect(x * xPosistion - xOffset, y * yPosistion + yOffset, xPosistion-xSize, ySize)
                // ctx.rect(x * canvas.width / 10 - canvas.width / 40, (y) * canvas.height / 10 + canvas.height / 40, canvas.width / 20, canvas.height / 20)
                // ctx.stroke()
                ctx.fill()
            }

            if (calculateContinuation(map[i + 1], map[i])) {
                ctx.fillStyle = "white"
                ctx.beginPath()
                ctx.rect(x * xPosistion + xOffset + xSize, y * yPosistion + yOffset, xPosistion-xSize, ySize)
                // ctx.rect(x * canvas.width / 10 + canvas.width / 40 * 3, (y) * canvas.height / 10 + canvas.height / 40, canvas.width / 20, canvas.height / 20)
                // ctx.stroke()
                ctx.fill()
            }



        }
    }
}




function calculateContinuation(value, checkAgainst) {
    return (value == checkAgainst - 1 || value == checkAgainst - 2) && value != 0
}



function getPlayerLocation() {
    for (let i = 0; i < playerLoc.length; i++) {
        if (playerLength == playerLoc[i]) {
            return i
        }
    }
}


function clearCanvas() {
    ctx.fillStyle = "black"
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawSquares()
}

window.addEventListener("keydown", moveListener)

function moveListener(e) {
    var arrowPress = true
    if (e.keyCode == 38) {
        console.log("up")
    } else if (e.keyCode == 40) {
        console.log("down")
    } else if (e.keyCode == 39) {
        console.log("right")
    } else if (e.keyCode == 37) {
        console.log("left")
    } else {
        arrowPress = false
    }

    if (arrowPress) {
        lastKeyPressed = e.keyCode
    }
}








function dead() {
    console.log("You died")
    clearInterval(intervalID)
    ctx.font = "40px serif "
    ctx.fillStyle = "white"
    ctx.fillText("YOU DIED", canvas.width / 2 - 100, 100)
    ctx.font = "15px serif"
    ctx.fillText("With a Length Of: " + playerLength, canvas.width / 2 - 68, 140)
    game = false
}



function repeatEverySecond() {
    intervalID = setInterval(moveSnake, 400);
}

function moveSnake() {
    var upVal = 20
    clearCanvas()
    var location = getPlayerLocation()
    if (lastKeyPressed == 38) {
        if (playerLoc[location - upVal] != 0) {
            dead()
            return
        }
        playerLoc[location - upVal] = playerLength + 1

    } else if (lastKeyPressed == 40) {
        if (playerLoc[location + upVal] != 0) {
            dead()
            return
        }
        playerLoc[location + upVal] = playerLength + 1
    } else if (lastKeyPressed == 39) {
        if (playerLoc[location + 1] != 0 || location % 20 == 19) {
            dead()
            return
        }
        playerLoc[location + 1] = playerLength + 1
    } else if (lastKeyPressed == 37) {
        if (playerLoc[location - 1] != 0 || location % 20 == 0) {
            dead()
            return
        }
        playerLoc[location - 1] = playerLength + 1
    }



    for (let i = 0; i < playerLoc.length; i++) {

        if (playerLoc[i] != 0) {
            playerLoc[i]--
        }
    }
    // playerLoc[location] = playerLength-1


    drawPlayer(playerLoc)


    if (playerLoc[foodLocation] != 0) {
        playerLoc[getPlayerLocation()]++
        playerLength++

        foodLocation = Math.floor(Math.random() * 100)
        while (playerLoc[foodLocation] != 0) {
            foodLocation = Math.floor(Math.random() * 100)
        }
    }


    drawFood(foodLocation)




}


clearCanvas()




function canStart(e) {

    var keys = [40, 39, 38, 37]

    for (let i = 0; i < keys.length; i++) {
        if (e.keyCode == keys[i]) {
            lastKeyPressed = keys[i]
            return !game
        }

    }


    return false

}




function start(e) {

    if (canStart(e)) {
        clearCanvas()
        game = true


        for (let i = 0; i < 200; i++) {
            playerLoc[i] = 0
        }


        playerLength = 2
        playerLoc[188] = playerLength
        drawPlayer(playerLoc)
        drawFood(foodLocation)
        getPlayerLocation()
        repeatEverySecond()
    }
}


window.addEventListener("keydown", start)


