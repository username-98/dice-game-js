//Game state vars
let player1Score = 0
let player2Score = 0
let player1Turn = true
let is1Winner = false
let is2Winner = false

//DOM references vars 
const msgEl = document.getElementById("message")
const player1Scoreboard = document.getElementById("player1Scoreboard")
const player2Scoreboard = document.getElementById("player2Scoreboard")
const player1Dice = document.getElementById("player1Dice")
const player2Dice = document.getElementById("player2Dice")
const player1 = document.getElementById("player1")
const player2 = document.getElementById("player2")
const rollBtn = document.getElementById("rollBtn")
const resetBtn = document.getElementById("resetBtn")



// Button clicked event listener

rollBtn.addEventListener("click", function () {
  const rndNum = Math.floor(Math.random() * 6) + 1
  if (player1Turn) {
    player2Dice.classList.add("active", "fade")
    player1Dice.classList.remove("active", "fade")
    player1Dice.innerText = rndNum
    player1Score += rndNum
    player1Scoreboard.innerText = player1Score
    if (player1Score >= 20) {
      is1Winner = true
      is2Winner = false
      msgEl.style.color = "#FFD700"
      msgEl.innerText = "🏆🏆Player 1️⃣ Wins!🏆🏆"
      player1Dice.classList.add("winner")
      player2Dice.classList.add("looser")
      player1.classList.add("playerWinner")
      player2.classList.add("playerLooser")
    } else {
      msgEl.innerText = "Player 2️⃣ Turn"
    }
  } else {
    player1Dice.classList.add("active", "fade")
    player2Dice.classList.remove("active", "fade")
    player2Dice.innerText = rndNum
    player2Score += rndNum
    player2Scoreboard.innerText = player2Score
    if (player2Score >= 20) {
      is1Winner = false
      is2Winner = true
      msgEl.style.color = "#FFD700"
      msgEl.innerText = "🏆🏆Player 2️⃣ Wins!🏆🏆"
      player2Dice.classList.add("winner")
      player1Dice.classList.add("looser")
      player2.classList.add("playerWinner")
      player1.classList.add("playerLooser")
    } else {
      msgEl.innerText = "Player 1️⃣ Turn"
    }
  }
  if (player1Score >= 20 || player2Score >= 20) {

    rollBtn.style.display = "none"
    resetBtn.style.display = "block"
    player1Dice.classList.remove("active", "fade")
    player2Dice.classList.remove("active", "fade")
  }


  player1Turn = !player1Turn
  if (is1Winner || is2Winner) {
    gimmick('.winner')
  }
})

resetBtn.addEventListener("click", function () {
  player1Score = 0
  player2Score = 0
  rollBtn.style.display = "block"
  resetBtn.style.display = "none"
  player1Dice.innerText = "-"
  player2Dice.innerText = "-"
  player1Scoreboard.innerText = player1Score
  player2Scoreboard.innerText = player2Score
  player1Dice.classList.remove("active", "fade", "winner", "looser")
  player2Dice.classList.remove("active", "fade", "winner", "looser")
  player2.classList.remove("playerWinner","playerLooser")
  player1.classList.remove("playerWinner","playerLooser")
  msgEl.style.color = "#fff"
  if (is1Winner) {
    msgEl.innerText = "Player 1️⃣ Turn"
    player1Dice.classList.add("active", "fade")
    player1Turn = true
  } else {
    msgEl.innerText = "Player 2️⃣ Turn"
    player2Dice.classList.add("active", "fade")
    player1Turn = false
  }
  is1Winner = false
  is2Winner = false
  gimmick('.winner')


})







// ---------------------- failing coins winner code (optional: i copied this code off google search) ---------------------------


function gimmick(el) {
  var exists = document.getElementById('gimmick')
  if (exists) {
      exists.parentNode.removeChild(exists);
      return false;
  }

  var element = document.querySelector(el);
  var canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d'),
      focused = false;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.id = 'gimmick'

  var coin = new Image();
  coin.src = 'coin.png'
  // 440 wide, 40 high, 10 states
  coin.onload = function () {
      element.appendChild(canvas)
      focused = true;
      drawloop();
  }
  var coins = []

  function drawloop() {
      if (focused) {
          requestAnimationFrame(drawloop);
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (Math.random() < .3) {
          coins.push({
              x: Math.random() * canvas.width | 0,
              y: -50,
              dy: 3,
              s: 0.5 + Math.random(),
              state: Math.random() * 10 | 0
          })
      }
      var i = coins.length
      while (i--) {
          var x = coins[i].x
          var y = coins[i].y
          var s = coins[i].s
          var state = coins[i].state
          coins[i].state = (state > 9) ? 0 : state + 0.1
          coins[i].dy += 0.3
          coins[i].y += coins[i].dy

          ctx.drawImage(coin, 44 * Math.floor(state), 0, 44, 40, x, y, 44 * s, 40 * s)

          if (y > canvas.height) {
              coins.splice(i, 1);
          }
      }
  }

}
