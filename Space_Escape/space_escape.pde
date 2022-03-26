Player player; //declare player
Alien [] aliens = new Alien[25]; //declare list of aliens that will continuously fall from the top of the screen
Alien specAlien; //declare special alien that will fall occasionally from the top of the screen
int starNumber=50; //number of stars for each layer of parallax star background in opening screen
Star[]back = new Star[starNumber]; //back layer of parallax
Star[]middle = new Star[starNumber]; //middle layer of parallax
Star[]front = new Star[starNumber]; //front layer of parallax
int frame = 0; //frameCount after hitting "start" on the main menu screen
int lives = 3; //# of player's lives
int score = 0; //inital score
int hiScore = 0; //high score variable
PFont font; //declaring font for text in the game
boolean hit = false; //flag checking for collision between alien and player
boolean gameOver = false; //boolean checking if the player has lost
boolean started = false; //boolean checking if "start" has been pressed
boolean instructionsClicked = false; //boolean checking if "instructions" has been pressed
int buttonW = 150; //button width
int buttonH = 40; //button height

void setup(){
  size(900,900);
  
  //setting up alignments and initializing fonts
  noStroke();
  rectMode(CENTER);
  imageMode(CENTER);
  textAlign(CENTER);
  font = loadFont("HPSimplified-Light-25.vlw");
  textFont(font,25);
  
  //initializing the sprites
  player = new Player(); //initalize player
  for(int index = 0; index < aliens.length; index++){ //initialize the normal aliens
    aliens[index] = new Alien();
  }
  specAlien = new Alien("special"); //initialize the special alien
  
  for(int index = 0; index < starNumber; index++){ //initialize the stars in the opening screen background
    back[index] = new Star("back"); 
    middle[index] = new Star("middle"); 
    front[index] = new Star("front"); 
  }
  
}

void draw(){
  background(0);
  mainMenu(); //start with only the main menu screen
  //debug: println(gameOver);
  
}

void keyPressed(){
  player.keyPressed(); //calls the player keypressed function
  
}

void mainMenu(){ //shows main menu on screen upon run and/or when the player clicks the "main menu" button
  starrybackground(); //sets parallax star background
  
  //title and high score text
  fill(255);
  textSize(35);
  text("SPACE ESCAPE",width/2,height/2-80);
  textSize(20);
  text("HIGH SCORE: "+hiScore,width/2,100);
  
  //creating start and instruction buttons
  rect(width/2,height/2-15,buttonW,buttonH);
  rect(width/2,height-100,buttonW,buttonH);
  fill(0);
  text("START",width/2,height/2-9);
  text("l NSTRUCTIONS",width/2,height-94);
  
  //checking to see if the buttons have been pressed
  if(started){ //if start button clicked
    begin();
  }
  if(instructionsClicked){ //if instructions clicked
    instructions();
  }
  if(mousePressed==true){
    if(mouseX>width/2-buttonW/2 && mouseX<width/2+buttonW/2){ //checking if the player is clicking within the range of x-values that the buttons have
      if(mouseY>height/2-15-buttonH/2 && mouseY<height/2-15+buttonH/2){ //checking if the player is clicking within the range of y-values for the start button
        started = true;
        //debug: print(started);
      }else if(mouseY>height-100-buttonH/2 && mouseY<height-100+buttonH/2){ //checking if the player is clicking within the range of y-values for the instructions button
        instructionsClicked = true;
      }
    }
  }

}

void reset(){ //resets the game if the player loses and hits "reset" - resets aliens and values like lives, score, etc.
  frame = 0;
  lives = 3;
  score = 0;
  hit = false;
  gameOver = false;
  instructionsClicked = false;
  for(int index = 0; index < aliens.length; index++){
    aliens[index] = new Alien();
  }
  specAlien = new Alien("special");
  
}

void instructions(){ //shows instructions when instruction button is clicked
  //white box for background of instructions
  fill(255,255,255,240);
  rect(width/2,height/2-50,680,400);
  
  //showing icons of player and aliens to facilitate explaining how to play the game
  PImage standing = loadImage("pixil-frame-0 (standing-right).png");
  PImage regAlien = loadImage("pixil-frame-0 (15).png");
  PImage specAlien = loadImage("pixil-frame-0 (16).png");
  image(standing,170,300);
  image(regAlien,170,400);
  image(specAlien,170,500);
  
  //creating instruction text
  fill(0);
  text("THE PLAYER. USE ARROW KEYS TO MOVE LEFT/RIGHT AND JUMP.",500,300);
  text("AN ALIEN - AVOID!",320,400);
  text("SPECIAL ALIEN. ALSO AVOID!!",363,500);
  fill(255);
  text("CLICK ANYWHERE TO CLOSE",width/2,height/2+200);
  
  if(mousePressed){
    instructionsClicked = false;
  }
  
}

void begin(){ //runs the game only when the start button has been clicked
  //plain black background for game
  fill(0);
  rect(width/2,height/2,width,height);
  
  //start counting frames
  frame += 1;
  
  //draw player
  player.display();
  player.update();
  player.controls();
  
  //draw aliens
  for(int index = 0; index < aliens.length; index++){
     aliens[index].display("normal");
     aliens[index].update(frame,"normal");
  }
  specAlien.display("special");
  specAlien.update(frame,"special");
  
  //reset collision detection every 100 frames
  if(hit == true){
    if(frame%100==0){
      hit = false;
    }
  }
  scoring(); //check score
  checkGame(); //check for collision detections and losing
}

void checkGame(){ //check for collision detections and losing
  textSize(25);
  text("LIVES: "+lives,width-100,100);
  if(lives<=0){ //if the player has no more lives, end the game
    endGame();
  }
  for(int index = 0; index < aliens.length; index++){ //check collision with every alien
    if((aliens[index].collision()||specAlien.collision()) && hit == false){ //if player hits alien:
      hit = true; //player has hit alien
      lives--; //minus one life
      //debug: println(hit);
    }
  }
}

void endGame(){ //show game over screen when player loses
  gameOver = true;
  
  if(score>hiScore){//replace high score with current score if current score is higher than previous high score
    hiScore = score;
  }
  //debug: println(hiScore);
  
  //creating background for game over screen
  fill(#E74D3C);
  rect(width/2,height/2,width,height);
  
  //game over and score text
  fill(0);
  textSize(35);
  text("GAME OVER",width/2,height/2-80);
  textSize(20);
  text("SCORE: "+score,width/2,100);
  
  //creating reset and main menu buttons
  rect(width/2,height/2-15,buttonW,buttonH);
  rect(width/2,height/2+40,buttonW,buttonH);
  fill(255);
  text("RESET",width/2,height/2-9);
  text("MAIN MENU",width/2,height/2+46);
  
  //checking to see if the buttons have been pressed
  if(mousePressed==true){
    if(mouseX>width/2-buttonW/2 && mouseX<width/2+buttonW/2){ //checking if the player is clicking within the range of x-values that the buttons have
      if(mouseY>height/2-15-buttonH/2 && mouseY<height/2-15+buttonH/2){ //checking if the player is clicking within the range of y-values for the reset button
        reset();
      }else if(mouseY>height/2+40-buttonH/2 && mouseY<height/2+40+buttonH/2){ //checking if the player is clicking within the range of y-values for the main menu button
        //telling the program that the game hasn't started and the instructions have not been clicked upon returning to the main menu
        started = false;
        instructionsClicked = false;
      }
    }
  }
  
}

void scoring(){ //tracks the player's score
  //score text
  textSize(25);
  text("SCORE: "+score,100,100);
  
  //adds 1 to the score per every 10 frames after the player clicks start/reset
  if(frame%10==0 && !gameOver){
    score++;
  }
}

void starrybackground(){ //creates parallax star background seen in main menu
//drawing black background
  fill(0);
  rect(width/2,height/2,width,height);
  
  //drawing stars
  fill(255);
  for(int index = 0; index < starNumber; index++){ //for loop drawing stars
    back[index].display();
    back[index].move();
    middle[index].display();
    middle[index].move();
    front[index].display();
    front[index].move();
  }
}
