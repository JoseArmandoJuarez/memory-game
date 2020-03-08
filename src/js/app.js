//function that returns variables used for this game
function initScore() {
    return {
        point: 0,
        gemsCol: 0,
        death: 0,
        fnlScore: 0,
        startTime: null,
        time: 60,
    }
}

let score = initScore();

function game() {
    score = initScore();

    drawleaderBoard();
}

//This function starts the game and time once the user hits the start button
function startGame() {
    document.querySelector(".score-panel").style.display = "block";
    document.getElementById('title').style.display = "none";
    document.querySelector('.repre').style.display = "none";
    document.querySelector('.how-to').style.display = "none";
    document.querySelector('.start').style.display = "none";
    document.querySelector('.intro').style.backgroundColor = "unset";
    score.point = 0;
    score.gemsCol = 0;
    score.death = 0;
    score.time = 60;
    document.querySelector(".points").innerHTML = "Points: 0";
    document.querySelector(".gems").innerHTML = "Gems: 0";
    document.querySelector(".deaths").innerHTML = "Hits: 0";
    score.startTime = window.setInterval(time, 1000);
}

//array of enemies
let randEnem = ['enemy-bug.png', 'bee.png', 'fly.png', 'lady-bug.png']

// Enemies that the player must avoid
const Enemy = function (x, y, speed) {
    // Variables applied to each of instances go here
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for the enemies
    this.sprite = 'img/' + randEnem[Math.floor(Math.random() * 4)];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    //banish enemy from canvas at 510
    if (this.x > 510) {
        this.x = -50;
        this.speed = 100 + Math.floor(Math.random() * 50); //give the enemy random speed
    }

    //if player touches a enemy reset player
    //https://stackoverflow.com/questions/13916966/adding-collision-detection-to-images-drawn-on-canvas
    if (player.x < this.x + 50 && player.x + 70 > this.x && player.y < this.y + 60 && player.y + 60 > this.y) {
        player.x = 202;
        player.y = 405;
        misses();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.player = 'img/char-boy.png';
}

//Updating the player movement
Player.prototype.update = function (dt) { }

//rendering the player on screen
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
}

//allowing to move the player with the WASD keys or arrow keys
//each tiel is 100 in the x-axis and 80 in the y-axis
Player.prototype.handleInput = function (keyPressed) {
    if ((keyPressed === 'a' || keyPressed === 'left') && this.x > 0) {
        this.x -= 102;
    }
    if ((keyPressed === 'd' || keyPressed === 'right') && this.x < 405) {
        this.x += 102;
    }
    if ((keyPressed === 'w' || keyPressed === 'up') && this.y > 0) {
        this.y -= 83;
    }
    if ((keyPressed === 's' || keyPressed === 'down') && this.y < 405) {
        this.y += 83;
    }
    // reset player when reaches water
    if (this.y < 0) {
        setTimeout(function () {
            player.x = 202;
            player.y = 405;
        }, 400);
        points();
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
//position enemies
let enemyLocation = [63, 147, 230, 310];

enemyLocation.forEach(function (locationY) {
    enemy = new Enemy(0, locationY, 150);
    allEnemies.push(enemy);
});

//position the player
let player = new Player(202, 405);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    let allowedKeys = {
        65: 'a',
        68: 'd',
        83: 's',
        87: 'w',
        38: 'up',
        40: 'down',
        37: 'left',
        39: 'right'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//array of x-axis values for the gems
let gemPosX = [100, 202, 304, 406];
//array of y-axis values for the gems
let gemPosY = [73, 156, 239, 322];
//array of gems
let gemImg = ['img/gem-blue.png', 'img/gem-green.png', 'img/gem-orange.png'];

//Gem class
const Gem = function () {
    this.gemImg = gemImg[Math.floor(Math.random() * 3)];
    this.x = gemPosX[Math.floor(Math.random() * 4)];
    this.y = gemPosY[Math.floor(Math.random() * 4)];
}

//update Gem when player collides with Gem
Gem.prototype.update = function () {
    if (player.x === this.x && player.y === this.y && this.gemImg == gemImg[1]) {
        this.gemImg = gemImg[Math.floor(Math.random() * 3)];
        this.x = gemPosX[Math.floor(Math.random() * 4)];
        this.y = gemPosY[Math.floor(Math.random() * 4)];

        score.time += 10
        document.getElementById('time').innerHTML = "<p>Time: " + score.time + " sec</p>";

        gemsCollected();
    }
    if (player.x === this.x && player.y === this.y && this.gemImg == gemImg[0]) {
        this.gemImg = gemImg[Math.floor(Math.random() * 3)];
        this.x = gemPosX[Math.floor(Math.random() * 4)];
        this.y = gemPosY[Math.floor(Math.random() * 4)];

        score.point += 2
        document.querySelector(".points").innerHTML = "Points: " + score.point;
        gemsCollected();
    }
    if (player.x === this.x && player.y === this.y && this.gemImg == gemImg[2]) {
        this.gemImg = gemImg[Math.floor(Math.random() * 3)];
        this.x = gemPosX[Math.floor(Math.random() * 4)];
        this.y = gemPosY[Math.floor(Math.random() * 4)];

        score.point += 5
        document.querySelector(".points").innerHTML = "Points: " + score.point;
        gemsCollected();
    }

}

//render Gem in canvas
Gem.prototype.render = function () {
    ctx.drawImage(Resources.get(this.gemImg), this.x, this.y);
}

let gem = new Gem();

//increase points by one every time player touches the water
function points() {
    score.point += 10;
    document.querySelector(".points").innerHTML = "Points: " + score.point;
}

//displays how many times the player has hit a bug
function misses() {
    score.death += 1;
    document.querySelector(".deaths").innerHTML = "Hits: " + score.death;
}

//displays how many Gems the player collected
function gemsCollected() {
    score.gemsCol += 1;
    document.querySelector(".gems").innerHTML = "Gems: " + score.gemsCol;
}

//give 30 seconds for the player to play
function time() {

    //this variable will start when clicked on first time
    score.time--;

    //logic to determine when to increment next value
    if (score.time === 0) {
        //display time
        displayFinalScore();
    }
    document.getElementById('time').innerHTML = "<p>Time: " + score.time + " sec</p>";

}

//show final score when time is over
function displayFinalScore() {

    if (score.point !== 0 && score.point >= score.death) {
        score.fnlScore = score.point - score.death;
    }
    if (score.point <= score.death) {
        score.fnlScore = 0;
    }
    clearInterval(score.startTime);
    document.querySelector(".score-panel").style.display = "";
    document.getElementById("canvas").style.display = "none";
    document.querySelector('.won-game').style.display = "block";
    document.getElementById('score-board').style.display = "block";
    document.querySelector('.right').style.display = "block";
    document.querySelector('.left').style.display = "block";

    document.getElementById('final-points').innerHTML = "Points: " + score.point;
    document.getElementById('final-gems').innerHTML = "Gems: " + score.gemsCol;
    document.getElementById('final-deaths').innerHTML = "Hits: " + score.death;
    document.getElementById('final-score').innerHTML = "Final Score: " + score.fnlScore;

    localStorage.setItem('mostRecentScore', score.fnlScore);
}

//function to play again
function playAgain() {
    score.point = 0;
    score.gemsCol = 0;
    score.death = 0;
    score.fnlScore = 0;
    score.time = 60;
    score.startTime = window.setInterval(time, 1000);
    document.querySelector(".points").innerHTML = "Points: 0";
    document.querySelector(".gems").innerHTML = "Gems: 0";
    document.querySelector(".deaths").innerHTML = "Hits: 0";
    player.x = 202;
    player.y = 405;
    document.querySelector(".score-panel").style.display = "block";
    document.getElementById("canvas").style.display = "block";
    document.querySelector('.won-game').style.display = "none";
    document.getElementById('score-board').style.display = "none";
    document.querySelector('.right').style.display = "none";
    document.querySelector('.left').style.display = "none";
}

//funciton to go to main page
function mainPage() {
    score.point = 0;
    score.gemsCol = 0;
    score.death = 0;
    score.fnlScore = 0;
    score.time = 60;
    document.querySelector(".points").innerHTML = "Points: 0";
    document.querySelector(".gems").innerHTML = "Gems: 0";
    document.querySelector(".deaths").innerHTML = "Hits: 0";
    player.x = 202;
    player.y = 405;
    document.querySelector(".score-panel").style.display = "none";
    document.getElementById("canvas").style.display = "";
    document.querySelector('.won-game').style.display = "none";
    document.getElementById('score-board').style.display = "none";
    document.querySelector(".intro").style.display = "block";
    document.getElementById('title').style.display = "block";
    document.querySelector('.repre').style.display = "block";
    document.querySelector('.how-to').style.display = "block";
    document.querySelector('.start').style.display = "block";
    document.querySelector('.intro').style.backgroundColor = ""; 
    document.querySelector('.right').style.display = "none";
    document.querySelector('.left').style.display = "none";  
}

const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const scoreList = document.getElementById('highScoreList');

//local storage for highScores
//this enables the save button once user writes a name
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

//function for local storage values
function saveHighScore() {
    getScores();
    saveScore();
    game();

    //clear input box when save score
    username.value = '';
};

function getScores() {
    let scores = JSON.parse(localStorage.getItem("scores")) || [];
    return scores;
}

function saveScore() {
    //holds user name and score name
    let score = {
        name: username.value,
        score: localStorage.getItem('mostRecentScore')
    };

    let scores = getScores();

    //pushes new score to scores
    scores.push(score);

    //organizes scores from highest to lowest
    scores.sort((a, b) => {
        return b.score - a.score;
    });

    return localStorage.setItem('scores', JSON.stringify(scores));
}

//function to display the table 
function drawleaderBoard() {

    //variables that hold scores
    let scores = getScores();

    let newScores = scores.slice(0, 10);

    //loops scores and displays username and scores in the browser
    let table = "";
    for (let i = 0; i < newScores.length; i++) {
        table += "<tr><td>" + [i + 1] + "</td><td>" + newScores[i].name + " </td><td>" + newScores[i].score + "</td></tr>";
    }

    return scoreList.innerHTML = table;
}

game();