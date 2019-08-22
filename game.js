var canvas;
var context;
var shape = new Object();
var heart = new Image();
var clock = new Image();
var cherry = new Image();
var pineapple = new Image();
var banana = new Image();
var frog = new Image();
var brokenheart = new Image();
var gameover = new Image();
var winner = new Image();

var key;
var board;
var score;
var pac_color;

var start_time;
var time_elapsed;
var timer1;
var timer2;

var interval;
var ghostInterval;

var lives;
var direction;
var username;
var GameTime;
var GhostNum;

var p_x;
var p_y;
var b_x;
var b_y;
var o_x;
var o_y;
var frog_x;
var frog_y;
var pac_mouth_x;
var pac_mouth_y;
var pac_eye_x;
var pac_eye_y;

var cnt;
var getCnt;
var count_5;
var count_15;
var count_25;

var dead;
var food_remain;
var frog_done;
var totalPoints;
var open_mouth;
var current_angle;

var isPause = false;
var bestScore = 50;


function zerointerval() {
    clearInterval(interval);
    clearInterval(ghostInterval);
    clearInterval(mouthInterval);
    startnewgame();
}


function startnewgame() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    backgroundMusic.play();
    lives = 3;
    key = 4;
    direction = "r";
    score = 0;
    food_remain = cnt;
    frog_done = false;
    lblLives1.src = 'img/heart.svg';
    lblLives2.src = 'img/heart.svg';
    lblLives3.src = 'img/heart.svg';
    lblLives4.src = 'img/clear.png';
    pac_color = "yellow";
    Start();
}





function pause() {
    isPause = true;
    if (!dead) {
        timer1 = new Date();
        clearInterval(interval);
        clearInterval(ghostInterval);
        clearInterval(mouthInterval);
    }
}






function resume() {
    if (isPause && !dead) {
        timer2 = new Date();
        start_time = +start_time + +(+timer2 - +timer1);
        interval = setInterval(UpdatePosition, 200);
        ghostInterval = setInterval(ghostMooving, 350);
        mouthInterval = setInterval(Mouthopen, 300);
        isPause = false;
    }
}





function Start() {
    board = new Array();
    open_mouth = true;
    current_angle = 0;
    pac_eye_x = 5;
    pac_eye_y = -10;
    heart.src = 'img/heart.svg';
    clock.src = 'img/clock.svg';
    cherry.src = 'img/cherry.svg';
    pineapple.src = 'img/pineapple.svg';
    banana.src = 'img/banana.svg';
    frog.src = 'img/frog.svg';
    gameover.src = 'img/gameover.gif';
    winner.src = 'img/winner.png';
    var pacman_remain = 1;
    start_time = new Date();
    dead = false;
    o_x = 1;
    o_y = 1;
    b_x = 1;
    b_y = 10;
    p_x = 14;
    p_y = 1;
    frog_x = 14;
    frog_y = 10;
    getCnt = cnt;
    count_5 = Math.round(0.6 * getCnt);
    count_15 = Math.round(0.3 * getCnt);
    count_25 = Math.round(0.1 * getCnt);
    totalPoints = +5 * count_5 + +15 * count_15 + +25 * count_25 + +230;
    for (var i = 0; i < 16; i++) {
        board[i] = new Array();
        //put obstacles in (i=3,j=3) and (i=3,j=4) //and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
        for (var j = 0; j < 12; j++) {
            if ((i == 0 && j != 4) || (j == 0 && i != 8) || (i == 15 && j != 4) || (j == 11 && i != 8)) {
                board[i][j] = 4;
            }
            else if ((i == 3 && j == 3) || (i == 3 && j == 4) || (i == 3 && j == 2) || (i == 3 && j == 5) || (i == 6 && j == 2) || (i == 6 && j == 1) || (i == 9 && j == 8) || (i == 8 && j == 8) || (i == 7 && j == 8) || (i == 9 && j == 5) || (i == 8 && j == 5) || (i == 7 && j == 5) || (i == 3 && j == 10) || (i == 3 && j == 9) || (i == 12 && j == 9) || (i == 12 && j == 10) || (i == 12 && j == 1) || (i == 12 && j == 2)) {
                board[i][j] = 4;
            }
            else {
                if (i == 14 && j == 1) {
                    board[i][j] = 5;
                }
                else if ((GhostNum > 1) && (i == 1 && j == 10)) {
                    board[i][j] = 6;
                }
                else if ((GhostNum > 2) && (i == 1 && j == 1)) {
                    board[i][j] = 7;
                }
                else if (i == 14 && j == 10) {
                    board[i][j] = 13;
                }
                else {
                    board[i][j] = 0;
                }
            }
        }
    }
    //draw pacman
    var emptyCell = findRandomEmptyCell(board);
    board[emptyCell[0]][emptyCell[1]] = 2;
    shape.i = emptyCell[0];
    shape.j = emptyCell[1];
    pacman_remain--;

    //draw fruits
    var emptyCell = findRandomEmptyCell(board);
    board[emptyCell[0]][emptyCell[1]] = 8;
    var emptyCell = findRandomEmptyCell(board);
    board[emptyCell[0]][emptyCell[1]] = 9;
    var emptyCell = findRandomEmptyCell(board);
    board[emptyCell[0]][emptyCell[1]] = 10;
    var emptyCell = findRandomEmptyCell(board);
    board[emptyCell[0]][emptyCell[1]] = 11;
    var emptyCell = findRandomEmptyCell(board);
    board[emptyCell[0]][emptyCell[1]] = 12;

    //draw balls
    while (count_5 > 0) {
        var emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = 1;
        count_5--;
    }
    while (count_15 > 0) {
        var emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = 111;
        count_15--;
    }
    while (count_25 > 0) {
        var emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = 1111;
        count_25--;
    }

    keysDown = {};
    addEventListener("keydown", function (e) {
        keysDown[e.keyCode] = true;
    }, false);
    addEventListener("keyup", function (e) {
        keysDown[e.keyCode] = false;
    }, false);

    interval = setInterval(UpdatePosition, 200);
    ghostInterval = setInterval(ghostMooving, 350);
    mouthInterval = setInterval(Mouthopen, 300);
}





function findRandomEmptyCell(board) {
    var i = Math.floor((Math.random() * 15) + 1);
    var j = Math.floor((Math.random() * 11) + 1);
    while (board[i][j] != 0) {
        i = Math.floor((Math.random() * 15) + 1);
        j = Math.floor((Math.random() * 11) + 1);
    }
    return [i, j];
}





function GetKeyPressed() {
    if (keysDown[38]) {
        key = 1;
    }
    if (keysDown[40]) {
        key = 2;
    }
    if (keysDown[37]) {
        key = 3;
    }
    if (keysDown[39]) {
        key = 4;
    }
    return key;
}








function Draw() {
    canvas.width = canvas.width; //clean board
    lblScore.value = score;
    lblTime.value = time_elapsed;
    //context.drawImage(fireworks, 100, 100,300,300);
    for (var i = 0; i < 16; i++) {
        for (var j = 0; j < 12; j++) {
            var center = new Object();
            center.x = i * 30 + 15;
            center.y = j * 30 + 15;
            if (board[i][j] == 1) {
                context.beginPath();
                context.arc(center.x, center.y, 4, 0, 2 * Math.PI); // circle
                context.fillStyle = color5; //color 
                context.fill();

                context.beginPath();
                text = '5';
                context.fillStyle = "white";
                context.fill();
                font = "bold " + 7 + "px serif";
                context.font = font;
                context.textBaseline = "center";
                context.fillText(text, center.x - 2, center.y + 2);
            }
            else if (board[i][j] == 111) {
                context.beginPath();
                context.arc(center.x, center.y, 5, 0, 2 * Math.PI); // circle
                context.fillStyle = color15; //color 
                context.fill();

                context.beginPath();
                text = '15';
                context.fillStyle = "white";
                context.fill();
                font = "bold " + 7 + "px serif";
                context.font = font;
                context.textBaseline = "center";
                context.fillText(text, center.x - 4, center.y + 2);
            }
            else if (board[i][j] == 1111) {
                context.beginPath();
                context.arc(center.x, center.y, 6, 0, 2 * Math.PI); // circle
                context.fillStyle = color25; //color 
                context.fill();

                context.beginPath();
                text = '25';
                context.fillStyle = "white";
                context.fill();
                font = "bold " + 7 + "px serif";
                context.font = font;
                context.textBaseline = "center";
                context.fillText(text, center.x - 4, center.y + 2);
            }
            else if (board[i][j] == 4) {
                context.beginPath();
                context.rect(center.x - 15, center.y - 15, 30, 30);
                context.fillStyle = "grey"; //color 
                context.fill();
            }
            else if (board[i][j] == 8) {
                context.drawImage(banana, center.x - 15, center.y - 15, 25, 25);
            }
            else if (board[i][j] == 9) {
                context.drawImage(pineapple, center.x - 15, center.y - 15, 25, 25);
            }
            else if (board[i][j] == 10) {
                context.drawImage(cherry, center.x - 15, center.y - 15, 25, 25);
            }
            else if (board[i][j] == 11) {
                context.drawImage(clock, center.x - 15, center.y - 15, 25, 25);
            }
            else if (board[i][j] == 12) {
                context.drawImage(heart, center.x - 15, center.y - 15, 25, 25);
            }

        }
    }
    //draw pacman
    var pacman_x;
    var pacman_y;
    var center = new Object();
    center.x = shape.i * 30 + 15;
    center.y = shape.j * 30 + 15;
    pacman_x = center.x;
    pacman_y = center.y;
    //pac direction
    context.beginPath();
    context.arc(pacman_x, pacman_y, 15, pac_mouth_x * Math.PI + current_angle, pac_mouth_y * Math.PI + current_angle); // half circle
    context.lineTo(pacman_x, pacman_y);
    context.fillStyle = pac_color; //color 
    context.fill();

    context.beginPath();
    context.arc(pacman_x + pac_eye_x, pacman_y + pac_eye_y, 2, 0, 2 * Math.PI); // circle
    context.fillStyle = "black"; //color 
    //pac direction
    context.fill();

    //draw frog
    var center = new Object();
    center.x = frog_x * 30;
    center.y = frog_y * 30;
    context.drawImage(frog, center.x, center.y, 25, 25);

    //draw ghosts
    var center = new Object();
    center.x = p_x * 30 + 15;
    center.y = p_y * 30 + 15;
    //body
    context.beginPath();
    context.arc(center.x, center.y, 13, Math.PI, 0, false);
    context.moveTo(center.x + 11, center.y);
    context.fillStyle = "pink";
    context.fill();
    //legs
    context.beginPath();
    context.lineTo(center.x - 13, center.y);
    context.lineTo(center.x - 13, center.y + 12);
    context.lineTo(center.x - 13 + 13 / 3, center.y + 11 - 11 / 4);
    context.lineTo(center.x - 13 + 13 / 3 * 2, center.y + 12);
    context.lineTo(center.x, center.y + 13 - 13 / 4);
    context.lineTo(center.x + 13 / 3, center.y + 12);
    context.lineTo(center.x + 13 / 3 * 2, center.y + 13 - 13 / 4);

    context.lineTo(center.x + 13, center.y + 12);
    context.lineTo(center.x + 13, center.y);
    context.fillStyle = "pink";
    context.fill();

    context.beginPath();//left eye
    context.arc(center.x - 5, center.y - 3.5, 3.5, 0, Math.PI * 2, true);
    context.fillStyle = "white";
    context.fill();
    context.beginPath();//left eye
    context.arc(center.x - 6, center.y - 2.5, 1.5, 0, Math.PI * 2, true);
    context.fillStyle = "black";
    context.fill();

    context.beginPath(); // right eye
    context.arc(center.x + 5, center.y - 3.5, 3.5, 0, Math.PI * 2, true);
    context.fillStyle = "white";
    context.fill();
    context.beginPath(); // right eye
    context.arc(center.x + 4, center.y - 2.5, 1.5, 0, Math.PI * 2, true);
    context.fillStyle = "black";
    context.fill();

    //mouth
    context.beginPath();
    context.lineWidth = 1;
    context.moveTo(center.x - 9 + 9 / 5, center.y + 9 / 2);
    context.lineTo(center.x - 9 + 9 / 3, center.y + 9 / 4);
    context.lineTo(center.x - 9 + 9 / 3 * 2, center.y + 9 / 2);
    context.lineTo(center.x, center.y + 9 / 4);
    context.lineTo(center.x + 9 / 3, center.y + 9 / 2);
    context.lineTo(center.x + 9 / 3 * 2, center.y + 9 / 4);
    context.lineTo(center.x + 9 - 9 / 5, center.y + 9 / 2);
    context.stroke();
    //more than two ghosts
    if (GhostNum > 1) {
        var center = new Object();
        center.x = b_x * 30 + 15;
        center.y = b_y * 30 + 15;
        //body
        context.beginPath();
        context.arc(center.x, center.y, 13, Math.PI, 0, false);
        context.moveTo(center.x + 11, center.y);
        context.fillStyle = "lightblue";
        context.fill();
        //legs
        context.beginPath();
        context.lineTo(center.x - 13, center.y);
        context.lineTo(center.x - 13, center.y + 12);
        context.lineTo(center.x - 13 + 13 / 3, center.y + 11 - 11 / 4);
        context.lineTo(center.x - 13 + 13 / 3 * 2, center.y + 12);
        context.lineTo(center.x, center.y + 13 - 13 / 4);
        context.lineTo(center.x + 13 / 3, center.y + 12);
        context.lineTo(center.x + 13 / 3 * 2, center.y + 13 - 13 / 4);

        context.lineTo(center.x + 13, center.y + 12);
        context.lineTo(center.x + 13, center.y);
        context.fillStyle = "lightblue";
        context.fill();

        context.beginPath();//left eye
        context.arc(center.x - 5, center.y - 3.5, 3.5, 0, Math.PI * 2, true);
        context.fillStyle = "white";
        context.fill();
        context.beginPath();//left eye
        context.arc(center.x - 4, center.y - 2.5, 1.5, 0, Math.PI * 2, true);
        context.fillStyle = "black";
        context.fill();

        context.beginPath(); // right eye
        context.arc(center.x + 5, center.y - 3.5, 3.5, 0, Math.PI * 2, true);
        context.fillStyle = "white";
        context.fill();
        context.beginPath(); // right eye
        context.arc(center.x + 6, center.y - 2.5, 1.5, 0, Math.PI * 2, true);
        context.fillStyle = "black";
        context.fill();

        //mouth
        context.beginPath();
        context.lineWidth = 1;
        context.moveTo(center.x - 9 + 9 / 5, center.y + 9 / 2);
        context.lineTo(center.x - 9 + 9 / 3, center.y + 9 / 4);
        context.lineTo(center.x - 9 + 9 / 3 * 2, center.y + 9 / 2);
        context.lineTo(center.x, center.y + 9 / 4);
        context.lineTo(center.x + 9 / 3, center.y + 9 / 2);
        context.lineTo(center.x + 9 / 3 * 2, center.y + 9 / 4);
        context.lineTo(center.x + 9 - 9 / 5, center.y + 9 / 2);
        context.stroke();
    }
    if (GhostNum > 2) { //case there are 3 ghosts
        var center = new Object();
        center.x = o_x * 30 + 15;
        center.y = o_y * 30 + 15;
        //body
        context.beginPath();
        context.arc(center.x, center.y, 13, Math.PI, 0, false);
        context.moveTo(center.x + 11, center.y);
        context.fillStyle = "orange";
        context.fill();
        //legs
        context.beginPath();
        context.lineTo(center.x - 13, center.y);
        context.lineTo(center.x - 13, center.y + 12);
        context.lineTo(center.x - 13 + 13 / 3, center.y + 11 - 11 / 4);
        context.lineTo(center.x - 13 + 13 / 3 * 2, center.y + 12);
        context.lineTo(center.x, center.y + 13 - 13 / 4);
        context.lineTo(center.x + 13 / 3, center.y + 12);
        context.lineTo(center.x + 13 / 3 * 2, center.y + 13 - 13 / 4);

        context.lineTo(center.x + 13, center.y + 12);
        context.lineTo(center.x + 13, center.y);
        context.fillStyle = "orange";
        context.fill();

        context.beginPath();//left eye
        context.arc(center.x - 5, center.y - 3.5, 3.5, 0, Math.PI * 2, true);
        context.fillStyle = "white";
        context.fill();
        context.beginPath();//left eye
        context.arc(center.x - 4, center.y - 2.5, 1.5, 0, Math.PI * 2, true);
        context.fillStyle = "black";
        context.fill();

        context.beginPath(); // right eye
        context.arc(center.x + 5, center.y - 3.5, 3.5, 0, Math.PI * 2, true);
        context.fillStyle = "white";
        context.fill();
        context.beginPath(); // right eye
        context.arc(center.x + 6, center.y - 2.5, 1.5, 0, Math.PI * 2, true);
        context.fillStyle = "black";
        context.fill();

        //mouth
        context.beginPath();
        context.lineWidth = 1;
        context.moveTo(center.x - 9 + 9 / 5, center.y + 9 / 2);
        context.lineTo(center.x - 9 + 9 / 3, center.y + 9 / 4);
        context.lineTo(center.x - 9 + 9 / 3 * 2, center.y + 9 / 2);
        context.lineTo(center.x, center.y + 9 / 4);
        context.lineTo(center.x + 9 / 3, center.y + 9 / 2);
        context.lineTo(center.x + 9 / 3 * 2, center.y + 9 / 4);
        context.lineTo(center.x + 9 - 9 / 5, center.y + 9 / 2);
        context.stroke();
    }

}






function UpdatePosition() {
    board[shape.i][shape.j] = 0;
    var x = GetKeyPressed();
    if (x == 1) //up
    {
        if (shape.i == 8 && shape.j == 0) {
            shape.j = 11;
        }
        else if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
            shape.j--;
            current_angle = 1.5 * Math.PI;
            pac_eye_x = -10;
            pac_eye_y = -5;
        }
        direction = "u";
    }
    if (x == 2) //down
    {
        if (shape.i == 8 && shape.j == 11) {
            shape.j = 0;
        }
        else if (shape.j < 11 && board[shape.i][shape.j + 1] != 4) {
            shape.j++;
            current_angle = 0.5 * Math.PI;
            pac_eye_x = 10;
            pac_eye_y = 5;
        }
        direction = "d";
    }
    if (x == 3) //left
    {
        if (shape.i == 0 && shape.j == 4) {
            shape.i = 15;
        }
        else if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
            shape.i--;
            current_angle = 1 * Math.PI;
            pac_eye_x = 0;
            pac_eye_y = -10;
        }
        direction = "l";
    }
    if (x == 4) //right
    {
        if (shape.i == 15 && shape.j == 4) {
            shape.i = 0;
        }
        else if (shape.i < 15 && board[shape.i + 1][shape.j] != 4) {
            shape.i++;
            current_angle = 2 * Math.PI;
            pac_eye_x = 5;
            pac_eye_y = -10;

        }
        direction = "r";
    }
    if (board[shape.i][shape.j] == 1) {
        score = score + 5;
    }
    if (board[shape.i][shape.j] == 111) {
        score = score + 15;
    }
    if (board[shape.i][shape.j] == 1111) {
        score = score + 25;
    }
    if (board[shape.i][shape.j] == 8) {
        eatFruitMusic.play();
        score = score + 50;
    }
    if (board[shape.i][shape.j] == 9) {
        eatFruitMusic.play();
        score = score + 60;
    }
    if (board[shape.i][shape.j] == 10) {
        eatFruitMusic.play();
        score = score + 70;
    }
    if (board[shape.i][shape.j] == 11) {
        timeMusic.play();
        GameTime = +GameTime + +10;
    }
    if (board[shape.i][shape.j] == 12) {
        lifeMusic.play();
        lives = lives + 1;
        if (lives == 2) {
            lblLives2.src = 'img/heart.svg';
        }
        if (lives == 3) {
            lblLives3.src = 'img/heart.svg';
        }
        if (lives == 4) {
            lblLives4.src = 'img/heart.svg';
        }
    }
    if (shape.i == frog_x && shape.j == frog_y && frog_done == false) {
        eatFruitMusic.play();
        score = score + 50;
        frog_done = true;
        frog.src = 'img/clear.png';
        frog_x = 14;
        frog_y = 10;
    }
    board[shape.i][shape.j] = 2;
    var currentTime = new Date();
    time_elapsed = GameTime - (currentTime - start_time) / 1000;
    if (time_elapsed <= 0) {
        dead = true;
    }
    var dis_x;
    var dis_y;

    //pink ghost
    dis_x = p_x - shape.i;
    dis_y = p_y - shape.j;
    if ((dis_x == dis_y) && (dis_x == 0)) {
        dead = true;
    }
    if (GhostNum > 1) {
        //blue ghost
        dis_x = b_x - shape.i;
        dis_y = b_y - shape.j;
        if ((dis_x == dis_y) && (dis_x == 0)) {
            dead = true;
        }
        if (GhostNum > 2) {
            //orange ghost
            dis_x = o_x - shape.i;
            dis_y = o_y - shape.j;
            if ((dis_x == dis_y) && (dis_x == 0)) {
                dead = true;
            }
        }
    }

    if (dead == true) {
        lives--;
        time_elapsed = GameTime;
        if (lives == 0) {
            backgroundMusic.pause();
            backgroundMusic.currentTime = 0;
            gameoverMusic.play();
            pac_color = "green";
            lblLives1.src = 'img/clear.png';
            Draw();

            if (score < 150) {
                if (score >= bestScore) {
                    bestScore = score;
                    bestplayer.value = lblName.value;
                    highestscore.value = score;
                    liferemind.value = lives;
                    swal({
                        title: "You can do better",
                        text: "Your score is: " + score + ".\n You are the new Best Player!",
                        imageUrl: "img/unlike.png"
                    });
                }
                else {
                    swal({
                        title: "You can do better",
                        text: "Your score is: " + score,
                        imageUrl: "img/unlike.png"
                    });
                }
            }
            else {
                if (score >= bestScore) {
                    bestScore = score;
                    bestplayer.value = lblName.value;
                    highestscore.value = score;
                    liferemind.value = lives;
                    swal({
                        title: "You Lost!",
                        text: "Your score is: " + score + ".\n You are the new Best Player!",
                        imageUrl: "img/smily.png"
                    });
                }
                else {
                    swal({
                        title: "You Lost!",
                        text: "Your score is: " + score,
                        imageUrl: "img/smily.png"
                    });
                }


            }
            context.drawImage(gameover, 130, 100, 250, 200);
            window.clearInterval(interval);
            window.clearInterval(ghostInterval);
            window.clearInterval(Mouthopen);
        }

        else {
            if (lives == 1) {
                lblLives2.src = 'img/clear.png';
            }
            if (lives == 2) {
                lblLives3.src = 'img/clear.png';
            }
            if (lives == 3) {
                lblLives4.src = 'img/clear.png';
            }
            o_x = 1;
            o_y = 1;
            b_x = 1;
            b_y = 10;
            p_x = 14;
            p_y = 1;
            dead = false;
            //draw pacman
            var emptyCell = findRandomEmptyCell(board);
            board[emptyCell[0]][emptyCell[1]] = 2;
            shape.i = emptyCell[0];
            shape.j = emptyCell[1];
            deadMusic.play();
            start_time = new Date();
            Draw();
        }

    }
    else {
        Draw();
    }
    if (score == totalPoints) {
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
        if (score >= bestScore) {
            bestScore = score;
            bestplayer.value = lblName.value;
            highestscore.value = score;
            liferemind.value = lives;
            swal({
                title: "We have a Winner!!!",
                text: "Your score is: " + score + ".\n You are the new Best Player!",
                imageUrl: "img/fireworks.gif"
            });
        }
        else {
            swal({
                title: "We have a Winner!!!",
                text: "Your score is: " + score,
                imageUrl: "img/fireworks.gif"
            });
        }
        context.drawImage(winner, 130, 100, 250, 200);
        window.clearInterval(interval);
        window.clearInterval(ghostInterval);
        window.clearInterval(Mouthopen);
    }
}





function Mouthopen() {
    if (open_mouth) {
        pac_mouth_x = 0.05;
        pac_mouth_y = 1.95;
        open_mouth = false;
    }
    else {
        pac_mouth_x = 0.15;
        pac_mouth_y = 1.85;
        open_mouth = true;
    }

    var dis_x;
    var dis_y;
    //pink ghost
    dis_x = p_x - shape.i;
    dis_y = p_y - shape.j;
    if ((dis_x == dis_y) && (dis_x == 0)) {
        dead = true;
    }
    if (GhostNum > 1) {
        //blue ghost
        dis_x = b_x - shape.i;
        dis_y = b_y - shape.j;
        if ((dis_x == dis_y) && (dis_x == 0)) {
            dead = true;
            return;
        }
        if (GhostNum > 2) {
            //orange ghost
            dis_x = o_x - shape.i;
            dis_y = o_y - shape.j;
            if ((dis_x == dis_y) && (dis_x == 0)) {
                dead = true;
            }
        }
    }
}





function ghostMooving() {
    var dis_x;
    var dis_y;

    //frog move
    if (frog_done == false) {
        if (shape.i == frog_x && shape.j == frog_y && frog_done == false) {
            eatFruitMusic.play();
            score = score + 50;
            frog_done = true;
            frog.src = 'img/clear.png';
            frog_x = 14;
            frog_y = 10;
        }
        else {
            var direct = Math.random() * 4;
            if (direct > 3) { //up
                if (board[frog_x][frog_y - 1] != 4) //up
                    frog_y--;
                else if (board[frog_x][frog_y + 1] != 4) //down
                    frog_y++;
                else if (board[frog_x - 1][frog_y] != 4) //left
                    frog_x--;
                else
                    frog_x++;
            }
            else if (direct > 2) { //down
                if (board[frog_x][frog_y + 1] != 4) //down
                    frog_y++;
                else if (board[frog_x][frog_y + 1] != 4) //right
                    frog_x++;
                else if (board[frog_x - 1][frog_y] != 4) //left
                    frog_x--;
                else
                    frog_y--; //up
            }
            else if (direct > 1) { //left
                if (board[frog_x - 1][frog_y] != 4) //left
                    frog_x--;
                else if (board[frog_x][frog_y + 1] != 4) //down
                    frog_y++;
                else if (board[frog_x][frog_y - 1] != 4) //up
                    frog_y--;
                else
                    frog_x++; //right
            }
            else { //right
                if (board[frog_x + 1][frog_y] != 4) //right
                    frog_x++;
                else if (board[frog_x][frog_y - 1] != 4) //up
                    frog_y--;
                else if (board[frog_x - 1][frog_y] != 4) //left
                    frog_x--;
                else
                    frog_y++; //down
            }
        }
    }
    dis_x = p_x - shape.i;
    dis_y = p_y - shape.j;

    //check where can move
    if ((dis_x == dis_y) && (dis_x == 0)) {
        dead = true;
        return;
    }
    if (Math.abs(dis_x) >= Math.abs(dis_y)) {//move left or right
        if (dis_x >= 0) { //move left
            if (board[p_x - 1][p_y] != 4) { //check if possible
                p_x--;
            }
            else { //left is block
                if (dis_y >= 0) { //move up
                    if (board[p_x][p_y - 1] != 4) { //check if possible
                        p_y--;
                    }
                    else { //move down
                        p_y++;
                    }
                }
                else { //move down
                    if (board[p_x][p_y + 1] != 4) { //check if possible
                        p_y++;
                    }
                    else { //move down
                        p_y++;
                    }
                }
            }
        }
        else { //move right
            if (board[p_x + 1][p_y] != 4) { //check if possible
                p_x++;
            }
            else { //right is block
                if (dis_y > 0) { //move up
                    if (board[p_x][p_y - 1] != 4) { //check if possible
                        p_y--;
                    }
                    else { //move left
                        p_x--;
                    }
                }
                else { //move down
                    if (board[p_x][p_y + 1] != 4) { //check if possible
                        p_y++;
                    }
                    else { //move left
                        p_x--;
                    }
                }
            }
        }
    }
    else {
        //move up or down
        if (dis_y > 0) { //move up
            if (board[p_x][p_y - 1] != 4) { //check if possible
                p_y--;
            }
            else { //up is block
                if (dis_x > 0) { //move left
                    if (board[p_x - 1][p_y] != 4) { //check if possible
                        p + x--;
                    }
                    else { //move down
                        p_y++;
                    }
                }
                else { //move right
                    if (board[p_x + 1][p_y] != 4) { //check if possible
                        p_x++;
                    }
                    else { //move down
                        p_y++;
                    }
                }
            }
        }
        else { //move down
            if (board[p_x][p_y + 1] != 4) { //check if possible
                p_y++;
            }
            else { //down is block
                if (dis_x > 0) { //move left
                    if (board[p_x - 1][p_y] != 4) { //check if possible
                        p_x--;
                    }
                    else { //move up
                        p_y--;
                    }
                }
            }
        }
    }

    //num of ghost bigger than 1
    if (GhostNum > 1) {
        dis_x = b_x - shape.i;
        dis_y = b_y - shape.j;
        if ((dis_x == dis_y) && (dis_x == 0)) {
            dead = true;
            return;
        }
        if (Math.abs(dis_x) > Math.abs(dis_y)) {//move left or right
            if (dis_x > 0) { //move left
                if (board[b_x - 1][b_y] != 4) { //check if possible
                    b_x--;
                }
                else { //left is block
                    if (dis_y > 0) { //move up
                        if (board[b_x][b_y - 1] != 4) { //check if possible
                            b_y--;
                        }
                        else { //move down
                            b_y++;
                        }
                    }
                    else { //move down
                        if (board[b_x][b_y + 1] != 4) { //check if possible
                            b_y++;
                        }
                        else { //move up
                            b_y--;
                        }
                    }
                }
            }
            else { //move right
                if (board[b_x + 1][b_y] != 4) { //check if possible
                    b_x++;
                }
                else { //right is block
                    if (dis_y > 0) { //move up
                        if (board[b_x][b_y - 1] != 4) { //check if possible
                            b_y--;
                        }
                        else { //move down
                            b_y++;
                        }
                    }
                    else { //move down
                        if (board[b_x][b_y + 1] != 4) { //check if possible
                            b_y++;
                        }
                        else { //move up
                            b_y--;
                        }
                    }
                }
            }
        }
        else {
            //move up or down
            if (dis_y > 0) { //move up
                if (board[b_x][b_y - 1] != 4) { //check if possible
                    b_y--;
                }
                else { //up is block
                    if (dis_x > 0) { //move left
                        if (board[b_x - 1][b_y] != 4) { //check if possible
                            b_x--;
                        }
                        else { //move right
                            b_x++;
                        }
                    }
                    else { //move right
                        if (board[b_x + 1][b_y] != 4) { //check if possible
                            b_x++;
                        }
                        else { //move left
                            b_x--;
                        }
                    }
                }
            }
            else { //move down
                if (board[b_x][b_y + 1] != 4) { //check if possible
                    b_y++;
                }
                else { //down is block
                    if (dis_x > 0) { //move left
                        if (board[b_x - 1][b_y] != 4) { //check if possible
                            b_x--;
                        }
                        else { //move right
                            b_x++;
                        }
                    }
                    else { //move right
                        if (board[b_x + 1][b_y] != 4) { //check if possible
                            b_x++;
                        }
                        else { //move left
                            b_x++;
                        }
                    }
                }
            }
        }
    }
    if (GhostNum > 2) { //there are 3 ghosts
        dis_x = o_x - shape.i;
        dis_y = o_y - shape.j;
        if ((dis_x == dis_y) && (dis_x == 0)) {
            dead = true;
            return;
        }
        //check where can move
        if (Math.abs(dis_x) > Math.abs(dis_y)) {//move left or right
            if (dis_x > 0) { //move left
                if (board[o_x - 1][o_y] != 4) { //check if possible
                    o_x--;
                }
                else { //left is block
                    if (dis_y > 0) { //move up
                        if (board[o_x][o_y - 1] != 4) { //check if possible
                            o_y--;
                        }
                        else { //move down
                            o_y++;
                        }
                    }
                    else { //move down
                        if (board[o_x][o_y + 1] != 4) { //check if possible
                            o_y++;
                        }
                        else { //move up
                            o_y--;
                        }
                    }
                }
            }
            else { //move right
                if (board[o_x + 1][o_y] != 4) { //check if possible
                    o_x++;
                }
                else { //right is block
                    if (dis_y > 0) { //move up
                        if (board[o_x][o_y - 1] != 4) { //check if possible
                            o_y--;
                        }
                        else { //move down
                            o_y++;
                        }
                    }
                    else { //move down
                        if (board[o_x][o_y + 1] != 4) { //check if possible
                            o_y++;
                        }
                        else { //move up
                            o_y--;
                        }
                    }
                }
            }
        }
        else {
            //move up or down
            if (dis_y > 0) { //move up
                if (board[o_x][o_y - 1] != 4) { //check if possible
                    o_y--;
                }
                else { //up is block
                    if (dis_x > 0) { //move left
                        if (board[o_x - 1][o_y] != 4) { //check if possible
                            o_x--;
                        }
                        else { //move right
                            o_x++;
                        }
                    }
                    else { //move right
                        if (board[o_x + 1][o_y] != 4) { //check if possible
                            o_x++;
                        }
                        else { //move left
                            o_x--;
                        }
                    }
                }
            }
            else { //move down
                if (board[o_x][o_y + 1] != 4) { //check if possible
                    o_y++;
                }
                else { //down is block
                    if (dis_x > 0) { //move left
                        if (board[o_x - 1][o_y] != 4) { //check if possible
                            o_x--;
                        }
                        else { //move right
                            o_x++;
                        }
                    }
                    else { //move right
                        if (board[o_x + 1][o_y] != 4) { //check if possible
                            o_x++;
                        }
                        else { //move left
                            o_x--;
                        }
                    }
                }
            }
        }
    }

}