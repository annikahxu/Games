class Player{
  
  PVector pos; //player position
  PVector vel; //player velocity
  PVector acceleration; //player acceleration (gravity)
  int pWidth = 64; //player width
  int pHeight = 57; //player height
  boolean jumping; //checking to see if the player is jumping
  PVector ground; //ground position
  
  //images for animating the player
  PImage standing = loadImage("pixil-frame-0 (standing-right).png");
  PImage running1 = loadImage("pixil-frame-0 (9).png");
  PImage running2 = loadImage("pixil-frame-0 (11).png");
  PImage running3 = loadImage("pixil-frame-0 (10).png");
  PImage running4 = loadImage("pixil-frame-0 (12).png");
  PImage running5 = loadImage("pixil-frame-0 (13).png");
  PImage running6 = loadImage("pixil-frame-0 (14).png");
  
  //run cycle variables
  int imageCycleR = 0;
  int imageCycleL = 0;
  
  Player(){ //initialize player
    pos = new PVector(width/2,height-500);
    vel = new PVector(0,0);
    acceleration = new PVector(0,0);
    ground = new PVector(width/2,height-180);
  }
  
  
  void display(){ //draw player
    fill(255);
    if(imageCycleR==0&&imageCycleL==0){ //if standing, show standing image
      image(standing,pos.x,pos.y);
    }else if(imageCycleR%4==1){ //for running cycle to the right
      image(running1,pos.x,pos.y);
    }else if(imageCycleR%4==3){
      image(running3,pos.x,pos.y);
    }else if(imageCycleR%4==0 && imageCycleR!=0||imageCycleR%4==2){
      image(running2,pos.x,pos.y);
    }else if(imageCycleL==0){ //for running cycle to the left
      image(standing,pos.x,pos.y);
    }else if(imageCycleL%4==1){
      image(running4,pos.x,pos.y);
    }else if(imageCycleL%4==3){
      image(running6,pos.x,pos.y);
    }else{
      image(running5,pos.x,pos.y);
    }
    pos.x = constrain(pos.x,0+pWidth/2,width-pWidth/2); //makes sure the player can't run off the canvas
  }
  
  void update(){ //moves the player
    if(pos.y>=ground.y){ //pulls player down to the ground (gravity) if not on ground
      acceleration.y = 0;
      pos.y=ground.y;
      jumping = false;
    }
    else{
      acceleration.y=0.3; 
    }
    //moving player
    vel.add(acceleration);
    pos.add(vel);
  }
  
  void controls(){ //key controls for moving the player left/right
    if(keyPressed==true){
      if(keyCode==39){ //right arrow
        vel.x = 3;
        if(frameCount%8==0){ //changes image every 8 frames, creating animation
          imageCycleR++;
        }
      }else if(keyCode==37){ //left arrow
        vel.x = -3;
        if(frameCount%8==0){ //changes image every 8 frames, creating animation
          imageCycleL++;
        }
      }
    }else{
      vel.x=0;
      imageCycleR=0;
      imageCycleL=0;
    }
  }
  
  void keyPressed(){ //key controls for player jump
    if(keyCode==38){
      if(jumping==false){
        vel.y = -9;
        jumping = true;
      }
    }
  }

  
}
