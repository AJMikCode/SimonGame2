//Testing to see if game.js is connected
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

//$(document).ready(function() {

//debugger;
//   $(".btn").click(function() {
//     var userChosenColor = this.id;
//     userClickedPattern.push(userChosenColor);
//     console.log(userClickedPattern);
//     playSound(userChosenColor);
//     animatePress(userChosenColor);
// })

// function playSound(name1) {
//     var newSound1 = new Audio("sounds/" + name1 + ".mp3");
//     newSound1.play();
// }

// function animatePress(currentColor){
//     $('.' + currentColor).addClass("pressed");
//     setTimeout(function() {
//         $('.' + currentColor).removeClass("pressed");

//     }, 100);
// }
//});

var started = "false";
var level = 0;

$(document).keydown(function () {
  if (started == "false") {
    // Next Sequence Function to change level status and generate random number for a Random Color
    function nextSequence() {
      ++level;
      $("h1").text("Level " + level);
      var randomNumber = Math.floor(Math.random() * 4);
      var randomChosenColor = buttonColors[randomNumber];
      gamePattern.push(randomChosenColor);
      console.log(randomChosenColor);
      $("#" + randomChosenColor)
        .fadeOut(250)
        .fadeIn(250);
      var newSound = new Audio("sounds/" + randomChosenColor + ".mp3");
      console.log(newSound);
      newSound.play();
    }
    nextSequence();
    //debugger;

    // Show the Sequence to the User with Animations and Sounds

    //User Pressing Button, User Pattern, not Game Pattern
    $(".btn").click(function () {
      var userChosenColor = this.id;
      userClickedPattern.push(userChosenColor);
      console.log(userClickedPattern);
      checkAnswer();
      playSound(userChosenColor);
      animatePress(userChosenColor);
    });

    function playSound(name1) {
      var newSound1 = new Audio("sounds/" + name1 + ".mp3");
      newSound1.play();
    }

    function animatePress(currentColor) {
      $("." + currentColor).addClass("pressed");
      setTimeout(function () {
        $("." + currentColor).removeClass("pressed");
      }, 100);
    }
    var i = 0;
    function checkAnswer() {
      //debugger;
      // if (userClickedPattern[level - 1] === gamePattern[level - 1]) {
      //   setTimeout(function() { nextSequence(); }, 1000);
      //   userClickedPattern = [];
      //debugger;

      // debugger;
      if (userClickedPattern[i] == gamePattern[i]) {
        console.log("correct!");
        ++i;
        if (userClickedPattern.length == gamePattern.length) {
          setTimeout(function () {
            nextSequence();
          }, 1000);
          userClickedPattern = [];
          i = 0;
        }
      } else {
        var wrongSound = new Audio("sounds/wrong.mp3");
        wrongSound.play();
        $("body").addClass("game-over");
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
        $("h1").text(
          "Game Over, Press Any Key to Restart,You Actually Bad Though, nO cAp!"
        );
        $(".btn").off("click");
        level = 0;
        gamePattern = [];
        userClickedPattern = [];
        started = "false";
      }
    } //else {
    //  console.log("That is incorrect!");
    // }
    //}

    started = "true";
  } else if (started == "true") {
    console.log("The game has started, stop pressing keys you idiot!");
  }
});
