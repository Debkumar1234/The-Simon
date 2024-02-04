var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
// $(document).keypress(function () {
//     if (!started) {
//         $("#level-title").text("Level " + level);
//         nextSequence();
//         started = true;
//     }
// });
function startByButton() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
    setTimeout(() => {
        $('.start-btn').css("visibility", "hidden");
    }, 100);
}
$(".btn").on('click', function (event) {
    var userChosenColour = $(event.target).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});
function nextSequence() {
    userClickedPattern = [];
    $("#level-title").text("Level " + ++level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function animatePress(currentColour) {
    var pressedButton = $("." + currentColour);
    pressedButton.addClass("pressed");
    setTimeout(() => {
        pressedButton.removeClass("pressed");
    }, 100);
}
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        $("#level-title").text("Game Over, Press Start Button to Restart");
        $('body').addClass("game-over");
        setTimeout(() => {
            $('body').removeClass("game-over");
        }, 200);
        showResult();
        playSound("wrong");
        startOver();
        $('#termsModal-1').css('visibility', 'visible');
        $('#termsModal-1').css('display', 'flex');
    }
}
function showResult() {
    var l = gamePattern.length - 1;
    $('#Result').text("Your Score :" + l);
}
$(".close-btn").on("click", function () {
    $('#termsModal-1').css('visibility', 'hidden');
});
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
function openTermsModal() {
    $('#termsModal').css('display', 'flex');
}

// Close the modal
function closeTermsModal() {
    $('#termsModal').css('display', 'none');
    $('.start-btn').css("visibility", "visible");
}
