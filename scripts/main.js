window.onload = function() {
  init();
};

var numCards = 3;
var gameOver = false;
var colors = [];
var pickedColor;
var body = document.querySelector("body");
var cards = document.querySelectorAll(".card");
var colorDisplay = document.getElementById("color-picked");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var resetDisplay = document.querySelector("#reset span");
var modeButtons = document.querySelectorAll(".mode");
var mode;
var time = 5;
var id;
var msg;
var blinkid;
var blinkid1;
var blinkid2;
function init() {
  modeButtons[1].classList.remove('selected');
  modeButtons[2].classList.remove('selected');
  initModeButtons();
  initCards();
  reset();
}

function initModeButtons() {
  for (var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function() {
      // numCards is 3 in easy mode
      // numCards = 3;
      // reset();
      for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].classList.remove('selected');
      }
      this.classList.add('selected');
    });
    if (i === 0) {
      modeButtons[i].addEventListener("click", function() {
        numCards = 3;
        mode = 0;
        reset();
      });
    } else if (i === 1) {
      modeButtons[i].addEventListener("click", function() {
        numCards = 6;
        mode = 1;
        reset();
      });
    } else {
      modeButtons[i].addEventListener("click", function() {
        numCards = 6;
        mode = 2;
        reset();
      });
    }
  }

}

function initCards() {

  for (var i = 0; i < cards.length; i++) {
    // add click listeners to cards
    cards[i].addEventListener("click", function() {
      if (gameOver) return;
      // grab color of clicked card
      var clickedColor = this.style.backgroundColor;
      // compare color to pickedColor
      if (clickedColor === pickedColor) {
        clearInterval(id);
        time = 5;
        messageDisplay.textContent = "Correct!";
        resetDisplay.textContent = "Play Again";
        changeColors("#FFF");
        body.style.backgroundColor = clickedColor;
        gameOver = true;
      } else {
        this.style.backgroundColor = "#232323";
        // messageDisplay.textContent = "Try Again";
        if (mode === 2){
          msg = "Try Again " ;
        }
      }
    });
  }
}

function reset() {
  time = 5;
  gameOver = false;
  colors = generateRandomColors(numCards);
  // pick a new random color from array
  pickedColor = pickColor();
  // change colorDisplay to match picked color
  colorDisplay.textContent = pickedColor;
  resetDisplay.textContent = "New Color";
  if (mode === 2)
    messageDisplay.textContent = "What's the Color? " +　time;
  else
    messageDisplay.textContent = "What's the Color? ";
  // change colors of cards
  for (var i = 0; i < cards.length; i++) {
    if (colors[i]) {
      cards[i].style.display = "block";
      cards[i].style.backgroundColor = colors[i];
    } else {
      cards[i].style.display = "none";
    }
  }
  body.style.backgroundColor = "#232323";

  if (mode === 2){
    time = 5;
    clearInterval(id);
    id = setInterval(showTime,1000);
    msg = "What's the color? ";
  }
}

resetButton.addEventListener("click", function() {
  reset();
});

function changeColors(color) {
  // loop through all cards
  for (var i = 0; i < cards.length; i++) {
    // change each color to match given color
    cards[i].style.backgroundColor = color;
  }
}

function pickColor() {
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors(num) {
  // make an array
  var arr = [];
  // repeat `num` times
  for (var i = 0; i < num; i++) {
    // get random color and push into arr
    arr.push(randomColor());
  }
  // return that array
  return arr;
}

function randomColor() {
  // pick a 'red' from 0-255
  var r = Math.floor(Math.random() * 256);
  // pick a 'green' from 0-255
  var g = Math.floor(Math.random() * 256);
  // pick a 'blue' from 0-255
  var b = Math.floor(Math.random() * 256);
  return "rgb(" + r + ", " + g + ", " + b + ")";
}

function showTime(){
  if (mode === 2){

    if(time > 0){

      time --;
      messageDisplay.textContent = msg + time;
    }
    else{
      messageDisplay.textContent = "Timeout!";
      changeColors("#FFF");
      body.style.backgroundColor = pickedColor;
      gameOver = true;
      clearInterval(id);
    }

  }
}

// function blink1(){
//     body.style.backgroundColor = "#232323";
//
//     blinkid1 = setInterval(blink2,500);
// }
// function blink2(){
//     body.style.backgroundColor = "#FFF";
//
//     blinkid2 = setInterval(blink1,500);
// }
