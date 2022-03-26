class Star{ //for the background of the opening screen
  
  //recycled (but slightly modified) from assignment 5: classes
  
  PVector position; //x,y position of the star
  PVector velocity; //velocity of the star
  int diameter = 3; //diameter of the star
  
  Star(String plane){
    position = new PVector(random(width),random(height)); //gives the star a random position on the canvas
    velocity = new PVector(0,0); //temporarily gives the star 0 velocity until its y velocity is specified
    if(plane =="back"){ //if the star is in the back
      velocity.y = 1;
    }else if(plane =="middle"){ //if the star is in the middle
      velocity.y = 2;
    }else if(plane =="front"){ //if the star is in the front
      velocity.y = 3;
    }
  }
  
  void display(){ //draws star
    ellipse(position.x,position.y,diameter,diameter); 
  }
  
  void move(){ //moves star
    position.add(velocity); 
    if(position.y >= height){ //checks to see if the star has hit the bottom of the canvas; if yes, go back to the top of the canvas
      position.y = 0;
    }
  }
  
  
  
}
