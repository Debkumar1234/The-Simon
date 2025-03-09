let gameSeq = [];
let userSeq = [];

let level = 0;
let started = false;

let maxScore = level;

let btns = ["yellow", "red", "purple", "green"];

let h4 = document.querySelector("h4");
document.addEventListener("keypress", function () {
    if (!started) {
        console.log("game is started");
        started = true;
        levelUp();
    }
});
function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 150);
}
function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 150);
}
function levelUp() {
    userSeq = [];
    level++;
    h4.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    btnFlash(randBtn);
}
function checkAns(idx) {
    if (gameSeq[idx] == userSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(function () {
                levelUp();
            }, 500);
        }
    } else {
        if (level > maxScore) {
            maxScore = level;
        }
        h4.innerHTML = `Game over your score was <b>${level}</b> Your highest score is ${maxScore}!!! <br>Press any key to start...`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        },200);
        reset();
    }
}
function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (const btn of allBtns) {
    btn.addEventListener("click", btnPress);
}
function reset() {
    userSeq = [];
    gameSeq = [];
    level = 0;
    started = false;
}