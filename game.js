var buttoncolor = ["red", "blue", "green", "yellow"];
var gamepattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).on("keypress", function (event) {
  prompt();
  if (!started) {
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  userClickedPattern=[];
  level++;
  $("#level-title").text("level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChoosenColor = buttoncolor[randomNumber];
  gamepattern.push(randomChoosenColor);
  $("#" + randomChoosenColor)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  var audio = new Audio("sounds/" + randomChoosenColor + ".mp3");
  audio.play();
}

var userChosenColor;
$(".btn").click(function () {
  userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playsound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

function playsound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function animatePress(currentcolor) {
  $("." + currentcolor).addClass("pressed");
  setTimeout(function () {
    $("." + currentcolor).removeClass("pressed");
  }, 100);
}
function checkAnswer(currentlevel){
  if(gamepattern[currentlevel]==userClickedPattern[currentlevel]){
    console.log("success");
    if(gamepattern.length==userClickedPattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
    console.log(gamepattern);
    console.log(userClickedPattern);
  }else{
    var wrongaudio=new Audio("sounds/wrong.mp3");
    wrongaudio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
       $("body").removeClass("game-over");
      },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}
function startOver(){
  level=0;
  gamepattern=[];
  started=false;
}
