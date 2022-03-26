function setup() {
  createCanvas(800, 600);
  
//setup/menu
  //background and images
  opening = loadImage('opening.png');
  trophy = loadImage('trophy.png')
  
  //menu button variables
  level = 0
  col = color(0);
  bg = 220
  
  //menu buttons
  menuButton = createButton('MENU');
  menuButton.position(375,500);
  menuButton.hide();
  instructionButton = createButton('INSTRUCTIONS');
  startButton = createButton('START');
  
  //score
  p1win = false;
  p2win = false;
  player1score = 0;
  player2score = 0;
  gameEnd = false;
  
  /*
  //flow buttons (delete later)
  player1Button = createButton('PLAYER 1 WIN');
  player2Button = createButton('PLAYER 2 WIN');
  //player1Button.hide();
  //player2Button.hide();
  player1Button.mouseClicked(player1Win);
  player2Button.mouseClicked(player2Win);
  */
  
  //stylizing
  instructionButton.style('background-color',col);
  instructionButton.style('color:white');
  menuButton.style('background-color',col);
  menuButton.style('color:white');
  startButton.style('background-color',col);
  startButton.style('color:white');
  
  //positioning
  instructionButton.position(600,20);
  startButton.position(380,500);
  
  //functions
  instructionButton.mouseClicked(instructions);
  menuButton.mouseClicked(menu);
  startButton.mouseClicked(start);
  
  textAlign(CENTER);
  rectMode(CENTER);
  noStroke();
  textFont('Calibri');
  textSize(20);
  
//flappy bird
  //background and sprite images
  flappybg = loadImage('flappybg.jpg');
  redbird = loadImage('redbird.gif');
  bluebird = loadImage('bluebird.gif');
  
  //sprite variables
  redbirdX = 100;
  redbirdY = 120;
  redbirdSpeedX = 0;
  redbirdSpeedY = 1;
  bluebirdX = 100;
  bluebirdY = 80;
  bluebirdSpeedX = 0;
  bluebirdSpeedY = 1;
  jump = -10;
  gravity = 0.7;
  characterHeight = redbird.height/4.5;
  characterWidth = redbird.width/4.5;
  
  groundX = width/2;
  groundY = 562;
  groundWidth = width+20;
  groundHeight = 75;
  
  //scroll
  scrollX = 0;
  scrollX1 = scrollX+width;
  scrollvar = width;
  scrollSpeed = 2;
  
  //pipe
  topPipe1 = random(50,height/4);
  bottomPipe1 = topPipe1 + 400;
  let topPipe2;
  let topPipe3;
  let topPipe4;
  let topPipe5;
  let bottomPipe2;
  let bottomPipe3;
  let bottomPipe4;
  let bottomPipe5;
  pipeX1 = width/2;
  let pipeX2;
  let pipeX3;
  let pipeX4;
  let pipeX5;
  pipeX6 = pipeX1 + 200;
  let pipeX7;
  let pipeX8;
  let pipeX9;
  let pipeX10;
  pipeWidth = 50
  
  //collision
  rrightPixel = 0;
  rtopPixel = 0;
  rbottomPixel = 0;
  brightPixel = 0;
  btopPixel = 0;
  bbottomPixel = 0;
  
//pong
  //backgrounds
  pongbg = loadImage('pongbg.jpg');
  
  //ball variables
  ballX = random (100, 500);
  ballY = random (100, 500);
  ballXSpeed = 5;
  ballYSpeed = 5;
  ballDiameter = 50;
  
  //paddle variables
  paddleWidth = 20;
  paddleHeight = 100;
  paddleX1 = width;
  paddleY1 = 300;
  paddleX2 = 0;
  paddleY2 = 300;
  paddlespeed = 7;
  
  //score variables
  PongScore1 = 0;
  PongScore2 = 0;
  
  //sound
  sound = loadSound('pingpong.mp3');
  sound.amp(1.0);
  
//rock paper scissors
  //backgrounds
  rpsbg = loadImage('rpsbg.jpg');
  
  //images
  redrock = loadImage('redrock.png');
  redsci = loadImage('redsci.png');
  redpap = loadImage('redpap.png');
  bluerock = loadImage('bluerock.png');
  bluesci = loadImage('bluesci.png');
  bluepap = loadImage('bluepap.png');
  
  //variables
  player1choice = 0;
  player2choice = 0;
  timercount = 10;
  timercount2 = 3;
}

function menu(){
  level = 'menu';
  menuButton.hide();
  instructionButton.show();
  startButton.show();
}

function instructions(){
  level = 'instructions';
  fill(255);
  textSize(15);
  text('FLAPPY BIRD CONTROLS:\n\n\n\n\n PLAYER ONE (LEFT SIDE): \n "W" TO JUMP \n\n PLAYER TWO (RIGHT SIDE):\n UP ARROW TO JUMP',150,200);
  text('PONG CONTROLS:\n\n\n\n\n PLAYER ONE (LEFT SIDE): \n "W" FOR UP, "S" FOR DOWN \n\n PLAYER TWO (RIGHT SIDE):\n UP ARROW FOR UP,\n DOWN ARROW FOR DOWN', width/2, 200)
  text('ROCK-PAPER-SCISSORS CONTROLS:\n\n\n\n PLAYER ONE (LEFT SIDE): \n "A" FOR ROCK,\n "W" FOR PAPER,\n "D" FOR SCISSORS \n\n PLAYER TWO (RIGHT SIDE):\n LEFT ARROW FOR ROCK,\n UP ARROW FOR PAPER,\n RIGHT ARROW FOR SCISSORS',width-150,200)
  
  menuButton.show();
  startButton.hide();
}

function start(){
  level = 1
  startButton.hide();
  instructionButton.hide();
}

function transition(){
  textSize(20);
  if(p1win===true){
    fill(216,71,39);
    rect(width/2,height/2,width,height);
    fill(255);
    text('ROUND GOES TO:',width/2,280);
    text('PLAYER ONE',width/2,310);//in phase 3, possibly create feature where each player can input their name at the start of the game?
    text('CLICK TO CONTINUE',width/2,500);
  }
  if(p2win===true){
    fill(42,118,131);
    rect(width/2,height/2,width,height);
    fill(255);
    text('ROUND GOES TO:',width/2,280);
    text('PLAYER TWO',width/2,310);
    text('CLICK TO CONTINUE',width/2,500);
  }
  if(mouseIsPressed){
    if(level===4){
      gameEnd = true;
    }
    smallreset();
  }
  
  if(gameEnd===true){
    endgame();
  }
}

function player1Win(){
  p1win = true;
  level+=1;
  player1score+=1;
}

function player2Win(){
  p2win = true;
  level+=1;
  player2score+=1;
}

function reset(){
  p1win = false;
  p2win = false;
  gameEnd = false;
  
  scrollX = 0;
  scrollX1 = scrollX+width;
  redbirdX = 100;
  redbirdY = 120;
  redbirdSpeedX = 0;
  redbirdSpeedY = 1;
  bluebirdX = 100;
  bluebirdY = 80;
  bluebirdSpeedX = 0;
  bluebirdSpeedY = 1;
  
  scrollX = 0;
  scrollX1 = scrollX+width;
  scrollvar = width;
  
  topPipe1 = random(50,height/4);
  bottomPipe1 = topPipe1 + 400;
  
  pipeX1 = width/2;
  pipeX6 = pipeX1 + 200;
  
  paddleY1 = 300;
  paddleY2 = 300;
  
  ballX = 400;
  ballY = 400;
  
  PongScore1 = 0;
  PongScore2 = 0;
  
  player1score = 0;
  player2score = 0;
  
}

function smallreset(){
  p1win = false;
  p2win = false;
  timercount = 10;
  timercount2 = 13;
  player1choice = 0;
  player2choice = 0;
}

function flappybird(){
  scroll();
  pipe();
  image(redbird,redbirdX,redbirdY,redbird.width/4.5,redbird.height/4.5);
  image(bluebird,bluebirdX,bluebirdY,redbird.width/4.5,redbird.height/4.5);
  ground();
  rbird();
  bbird();
  flappycollision();
}

function keyPressed(){
  //jump function
  if(keyCode === 87){
    redbirdSpeedY = jump;
  }
  if(keyCode === 38){
    bluebirdSpeedY = jump;
  }
}

function rbird(){
  //gravity
  redbirdY += redbirdSpeedY;
  
  if(redbirdY>=groundY+20-characterHeight){
    redbirdSpeedY=0;
  }else{
    redbirdSpeedY+=gravity;
  }
}

function bbird(){
  //gravity
  bluebirdY += bluebirdSpeedY;
  
  if(bluebirdY>=groundY+20-characterHeight){
    bluebirdSpeedY=0;
  }else{
    bluebirdSpeedY+=gravity;
  }
  
}

function ground(){
  fill(0);
  rect(groundX,groundY,groundWidth,groundHeight);
}

function scroll(){
  image(flappybg,scrollX,0,flappybg.width/2,flappybg.height/2);
  image(flappybg,scrollX1,0,flappybg.width/2,flappybg.height/2);
  scrollvar -= scrollSpeed;
  scrollX -= scrollSpeed;
  scrollX1 = scrollX + width
  if(scrollX1<=0){
    scrollX=0
  }
  
}

function pipe(){
  pipeX1 -= scrollSpeed;
  pipeX6 -= scrollSpeed;
  pipeX2 = pipeX1 + 200;
  pipeX3 = pipeX2 + 200;
  pipeX4 = pipeX3 + 200;
  pipeX5 = pipeX4 + 200;
  pipeX7 = pipeX6 + 200;
  pipeX8 = pipeX7 + 200;
  pipeX9 = pipeX8 + 200;
  pipeX10 = pipeX9 + 200;
  topPipe2 = topPipe1 + 30
  topPipe3 = topPipe1 - 60
  topPipe4 = topPipe1 + 40
  topPipe5 = topPipe1 - 50
  topPipe6 = topPipe1 - 80
  bottomPipe2 = topPipe2 + 400
  bottomPipe3 = topPipe3 + 400
  bottomPipe4 = topPipe4 + 400
  bottomPipe5 = topPipe5 + 400
  bottomPipe6 = topPipe6 + 400
  
  rect(pipeX1,topPipe1,pipeWidth,topPipe1*2);
  rect(pipeX1,bottomPipe1,pipeWidth,height-bottomPipe1+50)
  rect(pipeX2,topPipe2,pipeWidth,topPipe2*2);
  rect(pipeX2,bottomPipe2,pipeWidth,height-bottomPipe2+50)
  rect(pipeX3,topPipe3,pipeWidth,topPipe3*2);
  rect(pipeX3,bottomPipe3,pipeWidth,height-bottomPipe3+50)
  rect(pipeX4,topPipe4,pipeWidth,topPipe4*2);
  rect(pipeX4,bottomPipe4,pipeWidth,height-bottomPipe1+50)
  rect(pipeX5,topPipe5,pipeWidth,topPipe5*2);
  rect(pipeX6,topPipe2,pipeWidth,topPipe2*2);
  rect(pipeX6,bottomPipe2,pipeWidth,height-bottomPipe2+50)
  rect(pipeX7,topPipe3,pipeWidth,topPipe3*2);
  rect(pipeX7,bottomPipe3,pipeWidth,height-bottomPipe3+50)
  rect(pipeX8,topPipe4,pipeWidth,topPipe4*2);
  rect(pipeX8,bottomPipe4,pipeWidth,height-bottomPipe1+50)
  rect(pipeX9,topPipe5,pipeWidth,topPipe5*2);
  rect(pipeX9,bottomPipe5,pipeWidth,height-bottomPipe5+50)
  rect(pipeX10,topPipe6,pipeWidth,topPipe6*2);
  rect(pipeX10,bottomPipe6,pipeWidth,height-bottomPipe6+50)
  if(pipeX1<=0-pipeWidth/2){
    pipeX1 = width + 300 + pipeWidth/2;
    pipeX1 -= scrollSpeed;
  }
  if(pipeX10<=0-pipeWidth/2){
    pipeX6 = pipeX1 + 200
    pipeX6 -= scrollSpeed;
  }
  
}

function flappycollision(){
  rrightPixel = get(redbirdX+redbird.width/4.5,redbirdY+redbird.height/9);
  rtopPixel = get(redbirdX,redbirdY-redbird.height/9)
  rbottomPixel = get(redbirdX,redbirdY+redbird.height/4.5);
  brightPixel = get(bluebirdX+bluebird.width/4.5,bluebirdY+bluebird.height/9);
  btopPixel = get(bluebirdX,bluebirdY-bluebird.height/9)
  bbottomPixel = get(bluebirdX,bluebirdY+bluebird.height/4.5);
  
  if(rbottomPixel[3]===0){
    player2Win();
  }
  if(rtopPixel[0]===0){
    player2Win();
  }
  if(rrightPixel[0]===0){
    player2Win();
  }
  if(bbottomPixel[3]===0){
    player1Win();
  }
  if(btopPixel[0]===0){
    player1Win();
  }
  if(brightPixel[0]===0){
    player1Win();
  }
  
}

function pong(){
  drawball();
  paddle();
  pongCollision('right');
  pongCollision('left');
  pongScore();
}

function drawball(){
  
  ellipse(ballX, ballY, ballDiameter, ballDiameter)
  
  //Gets the Ball to move
  ballX = ballX + ballXSpeed;
  ballY += ballYSpeed;
  
  //Checks if ball hits right wall (reset)
  if(ballX-ballDiameter > paddleX1){
    ballX = 400;
    ballY = 400;
    PongScore2+=1;
    
  }
  //Checks if ball hits left wall (reset)
  if(ballX+ballDiameter < paddleX2){
    ballX = 400;
    ballY = 400;
    PongScore1+=1;
  }
  //Checks if ball hits bottom wall
  if(ballY+ballDiameter/2 > height){
    ballYSpeed = ballYSpeed*-1;
  }
  //Checks if ball hits left wall
  if(ballY-ballDiameter/2 < 0){
    ballYSpeed = ballYSpeed*-1;
  }
  
}

function paddle(){
  fill(42,118,131);
  rect(paddleX1,paddleY1,paddleWidth,paddleHeight);
  fill(216,71,39);
  rect(paddleX2,paddleY2,paddleWidth,paddleHeight);


  //controls
  if(keyIsDown(38)){
    if(paddleY1>50){
     paddleY1 -= paddlespeed;
    }
  }
  if(keyIsDown(40)){
    if(paddleY1<550){
     paddleY1 += paddlespeed;
    }
  }
  if(keyIsDown(87)){
    if(paddleY2>50){
      paddleY2 -= paddlespeed;
    }
  }
  if(keyIsDown(83)){
    if(paddleY2<550){
      paddleY2 += paddlespeed;
    }
  }

}

function pongCollision(xposition){
  //Checks for collision
  if(xposition==='right'){
    if((paddleY1-20-paddleHeight/2<ballY &&
       ballY<paddleY1+20+paddleHeight/2)&&
      (ballX+ballDiameter/2===paddleX1)){
      sound.play();
      ballXSpeed = ballXSpeed*-1;
      //fill(255)
    }else{
      fill(0)
    }
  }else if(xposition==='left'){
    if((paddleY2-20-paddleHeight/2<ballY &&
       ballY<paddleY2+20+paddleHeight/2)&&
      (ballX-ballDiameter/2===paddleX2)){
      sound.play();
      ballXSpeed = ballXSpeed*-1;
      //fill(255)
    }else{
      fill(0)
    }
  }
}

function pongScore(){
  fill(0);
  text(PongScore1, width-40, 40);
  text(PongScore2, 40, 40);
  text('SCORE', width/2 ,40);
  
  //Checks if game is over
  if(PongScore2>=10){
    player1Win();
    
  }else if(PongScore1>=10){
    player2Win();
  }
  
}

function rps(){
  rpsinstructions();
  timer();
  if(timercount===0||timercount===' '){
    timercount=' ';
    if(player1choice==='rock'){
      image(redrock,125,210,redrock.width/2,redrock.height/2)
    }else if(player1choice==='paper'){
      image(redpap,135,220,redpap.width/2.2,redpap.height/2.2)
    }else if(player1choice==='scissors'){
      image(redsci,130,220,redsci.width/2.2,redsci.height/2.2)
    }
    
    if(player2choice==='rock'){
      image(bluerock,525,210,redrock.width/2,redrock.height/2)
    }else if(player2choice==='paper'){
      image(bluepap,535,220,redpap.width/2.2,redpap.height/2.2)
    }else if(player2choice==='scissors'){
      image(bluesci,530,220,redsci.width/2.2,redsci.height/2.2)
    }
    
    if(timercount2<=0)
    if(player1choice==='rock'){
      if(player2choice==='rock'){
        rematch();
      }else if(player2choice==='paper'){
        player2Win();
      }else if(player2choice==='scissors'){
        player1Win();
      }else{
        player1Win();
      }
    }else if(player1choice==='paper'){
      if(player2choice==='rock'){
        player1Win();
      }else if(player2choice==='paper'){
        rematch();
      }else if(player2choice==='scissors'){
        player2Win();
      }else{
        player1Win();
      }
    }else if(player1choice==='scissors'){
      if(player2choice==='rock'){
        player2Win();
      }else if(player2choice==='paper'){
        player1Win();
      }else if(player2choice==='scissors'){
        rematch();
      }else{
        player1Win();
      }
    }else{
      if(player2choice===0){
        rematch();
      }else{
        player2Win();
      }
    }
  }
  if(timercount>0){
    if(keyIsDown(65)){
      player1choice = 'rock';
    }else if(key==='w'){
      player1choice = 'paper'
    }else if(key==='d'){
      player1choice = 'scissors'
    }
  
    if(keyIsDown(37)){
      player2choice = 'rock'
    }else if(keyIsDown(38)){
      player2choice = 'paper'
    }else if(keyIsDown(39)){
      player2choice = 'scissors'
    }
  }
  
}

function timer(){
  textFont('Calibri');
  textSize(50)
  fill(0);
  text(timercount, width/2, height/2);
  if(frameCount % 60 === 0 && timercount>0){
    timercount--;
  }
  if(frameCount % 60 === 0){
    timercount2--;
  }
  textSize(20);
  //timercount=0
}

function rematch(){
  fill(155);
  rect(width/2,height/2,width,height);
  fill(255);
  text('ROCK PAPER SCISSORS REMATCH',width/2,290);
  text('CLICK TO CONTINUE',width/2,500);
}

function rpsinstructions(){
  fill(255);
  textSize(13);
  text('PRESS "A" FOR ROCK,\n "W" FOR PAPER, \n or "D" FOR SCISSORS', 200,100);
  fill(0);
  text('PRESS LEFT ARROW FOR ROCK,\n UP ARROW FOR PAPER, \n OR RIGHT ARROW FOR SCISSORS',600,100);
}

/*function keyTyped(){
  if(key==='a'){
    player1choice = 'rock';
  }else if(key==='w'){
    player1choice = 'paper'
  }else if(key==='d'){
    player1choice = 'scissors'
  }
  
  if(keyCode===LEFT_ARROW){
    player2choice = 'rock'
  }
  
}
*/
function endgame(){
  if(player1score>player2score){
    fill(216,71,39);
    rect(width/2,height/2,width,height)
    image(trophy,300,70,trophy.width/8,trophy.height/8)
    fill(255);
    text('PLAYER ONE WINS!',width/2,height/2+50)
  }else{
    fill(42,118,131);
    rect(width/2,height/2,width,height)
    image(trophy,300,70,trophy.width/8,trophy.height/8)
    fill(255);
    text('PLAYER TWO WINS!',width/2,height/2+50)
  }
  menuButton.show();
}

function draw() {
  background(bg);
  if(level==='menu'||level===0){
    bg = 220
    image(opening,0,0)
    reset();
    textSize(20)
    fill(255);
    text('BEST-OF-THREE',width/2,260)
    textSize(15)
    text('THE ULTIMATE THREE-IN-ONE MULTIPLAYER MINIGAME MIX',width/2,290)
  }else if(level===1){
    bg = flappybg
    flappybird();
    transition();
  }else if(level===2){
    bg = pongbg
    pong();
    transition();
  }else if(level===3){
    bg = rpsbg
    rps();
    transition();
  }else if(level===4){
    bg = 220
    transition();
  }else if(level==='instructions'){
    image(opening,0,0)
    instructions();
  }
}
