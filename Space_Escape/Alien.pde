class Alien{
  
  PVector pos; //alien position
  PVector vel; //alien velocity
  int aWidth = 30; //alien width
  int aHeight = 30; //alien height
  PImage regAlien = loadImage("pixil-frame-0 (15).png"); //normal alien sprite
  PImage specAlien = loadImage("pixil-frame-0 (16).png"); //special alien sprite
  
  
  Alien(){ //creating normal alien
    pos = new PVector(random(width),random(-10000,0)); //gives the alien a random x position on the canvas and a random y position off the canvas at start
    vel = new PVector(0,random(3)); //gives alien a random y speed to start
    
  }
  
  Alien(String type){ //creating special alien
    if(type=="special"){
      pos = new PVector(player.pos.x,random(-20000,-5000)); //alien starts at the player's x position and starts further back than normal aliens (so it's introduced later into gameplay)
      vel = new PVector(1,random(3)); //gives alien random y speed and also an x speed, so it moves across the canvas like a bouncing ball while on screen
    }
  }
  
  void display(String type){ //displays alien; type is the type of alien (normal/special)
    if(type=="special"){
      image(specAlien,pos.x,pos.y-aWidth/2);
    }else{
      image(regAlien,pos.x,pos.y-aWidth/2);
    }
  }
  
  void update(int frame,String type){ //moves alien; frame is the # of frames after hitting start and type is the type of alien (normal/special)
    pos.add(vel);
    
    //increases alien's speed randomly every 2000 frames after the player has hit start
    if(frame%2000==0){
      vel.y+=random(2);
    }
    
    
    if(type=="special"){
      if(pos.x+aWidth/2==width || pos.x-aWidth/2==0){//lets special alien bounce back and forth horizontally on the canvas
        vel.x*=-1;
      }
      if(pos.y-aHeight/2>=height+5000){ //checks to see if the alien has hit the bottom of the canvas; if yes, go back 5000 pixels behind the start of the canvas (that way, the special alien isn't always on screen once it has appeared for the first time, but can still continue to be in the game)
      pos.y = 0;
      }
    }else{ //if not special alien
      if(pos.y-aHeight/2>=height){ //checks to see if the alien has hit the bottom of the canvas; if yes, go back to the top of the canvas
      pos.y = 0;
      }
    }
    
    
  }
  
  public boolean collision(){ //checks for collision between player and alien; returns true if colliding and false if not
    if(pos.x+aWidth/2<player.pos.x-player.pWidth/2 || pos.x-aWidth/2>player.pos.x+player.pWidth/2 || pos.y+aHeight/2<player.pos.y-player.pHeight/2 || pos.y-aHeight/2>player.pos.y+player.pHeight/2){
      return false;
    }else{
      return true;
    }
  }
  
  
  
}
