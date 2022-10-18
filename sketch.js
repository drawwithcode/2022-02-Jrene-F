
//Class definition for stars objects, it contains 3 attributes: x and y position and the initial size
class Stars {
    constructor() {
      this.x = random(0,windowWidth);    //x position
      this.y = random(0,windowHeight);   //y position
      this.size = 1;    //initial size of the stars
    }
    
    display() {                //function to display the class object
      fill(162, 151, 255);     //stars' color
      circle( this.x, this.y, this.size );   
    }
  
    update() {                    //function to update the stars' dimention
      this.size = random(1,6);    //stars' dimention update to simulate shining stars
    }
   
    reposition(){                        //function to reposition stars when the window is resized
      this.x = random(0,windowWidth);    //stars' x resposition for responsiveness
      this.y = random(0,windowHeight);   //stars' y resposition for responsiveness
    }
  }
  
    const star = [];     // array of stars
    const num_stars = 100;     //number of stars
    let cnt = 0;
    let initial_cnt = 0;
    let flowers = [];     //array of flowers
    let text_message = "Click!";    //click message variable
  
function setup() {
    createCanvas (windowWidth,windowHeight);
    angleMode (DEGREES);
  
  //stars' instances creation
    for (c = 0; c < num_stars; c++){
      star[c] = new Stars();
    }
}
  

function draw() {
    
  //sky color definition
    c1 = color(0, 18, 127);
    c2 = color(183, 133, 255);
    skyGradient(c1, c2);
    
    noCursor();
  
    push();
      noStroke();
      //visualization and update of the instances
      for (c = 0; c < num_stars; c++){
      star[c].display();
      cnt += 1;
        if (cnt == initial_cnt + 29){    //the instance is modified so that the stars do not shine at the same time
         initial_cnt = cnt;
         star[c].update();
        }
      }
    pop();
  
  //moon draw that moves by following the coordinates of the mouse
  //objects are drawn according to the responsive requirement
    push();
      noStroke();
      fill(224, 217, 255, 40);
      circle(mouseX, mouseY, windowHeight / 4.95);   //first moon's halo
    pop();
    
    push();
      noStroke();
      fill(224, 217, 255, 50);
      circle(mouseX, mouseY, windowHeight / 5.3);    //second moon's halo
    pop();
    
    push();
      noStroke();
      fill(224, 217, 255);
      circle(mouseX, mouseY, windowHeight / 5.7);    //moon
    pop();
   
  //draw of text that moves by following the coordinates of the mouse
  //the object is drawn according to the responsive requirement
    push();
      textFont("Alice")    
      textSize(windowHeight / 23.44);
      textAlign(CENTER, CENTER);
      fill(34, 35, 83);
      text(text_message, mouseX, mouseY);
    pop();    


  //ground draw using perlin noise to simulate a natural slope
  //the object is drawn according to the responsive requirement
    push();
      noStroke();
      beginShape();
        for (let x = 0; x <= windowWidth; x += 3) {
        const noisedY = noise(x * 0.002, 500);
        vertex(x, windowHeight / 1.2 - noisedY * 50);
        }
      fill(147, 104, 149);
      vertex(windowWidth, windowHeight);
      vertex(0, windowHeight);
      endShape(CLOSE);
    pop();
    
  //random draw of petals that will appeare and fall on mouse click  
  //the petals are drawn only if there are values into the flowers' array, so on mouseClicked
  //objects are drawn according to the responsive requirement
    for(let petal of flowers) {
      push();
        noStroke();
        fill(220, 114, 255, 210);
        petal.y += (random(1, 4));    //increment of the y coordinate that makes the petals fall, the higher the value, the faster the petals fall off
        translate(width / 2, height / 2 - windowHeight / 3.5);
        circle(petal.x, petal.y, 7);
      pop();
      
        if (petal.y > windowHeight / 2 + windowHeight / 6.1) {
        let last = flowers.pop();    //petals disappear upon reaching the ground
        } 
    }
    
    push();

    //shadow draw
    //the object is drawn according to the responsive requirement
      push();
        fill(0, 0, 0, 20)
        noStroke();
        ellipse(windowWidth / 2, windowHeight / 2 + windowHeight / 2.47, windowHeight / 1.9, windowHeight / 18.8);
      pop();
    
    //tree draw
    //the object is drawn according to the responsive requirement
      translate(windowWidth / 2, windowHeight / 2 + windowHeight / 2.6);
      branch(windowHeight / 5.327);    //tree is drawn this recursive function (branch function)
    pop();
}
  

//event function that is called once every time the browser window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  
  for (c = 0; c < num_stars; c++){    
  star[c].reposition();}     //stars' reposition
}
  
  
//recursive function for tree creation
//the tree will be created by drawing lines with the fractal method 
//the function calls itself twice with a parameter (len) that decrements each time it is called. 
function branch(len) {
  push();
    
    if (len > 10) {
      strokeWeight(map(len, 15, 70, 1, 20));
      stroke(34, 35, 83);
      line(0, 0, 0, -len);   //creation of branches
      
      if(len < 30){
      push();
        noStroke();
        fill(189, 114, 255, 210);
        circle(0, len, 7);    //creations of petals
      pop();}
      
      if(len < 15){
      push();
        noStroke();
        fill(220, 114, 255, 210);
        circle(len, 0, 7);    //creations of petals
      pop();
      }
      
        translate(0, -len);    //creation of branches
        rotate(18);            //rotate left
        branch(len * 0.78);    //left branch creation
        rotate(-37);           //rotate right
        branch(len * 0.78);    //right branch creation
      }  
  pop();
}
  
//creation of the sky using lerpColor to generate a color gradient
function skyGradient(){
  noFill();
    for (var y = 0; y < windowHeight; y++) {
      var inter = map(y, 0, windowHeight, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(0, y, windowWidth, y);
    }
}
 
//event function that is called once after a mouse button is pressed and released
//the function is used to make make petals fall 
function mouseClicked() {
    for(i = 0; i < random(40, 60); i++){
      addAShape();    //execution of addAShape function
      hideText();     //execution of hideText function
    }
}

//this function is called by the mouseClicked function
//the function will populate the flowers' array starting the drawing and falling of petals
function addAShape() {
    petal1 = {
      x: random(-windowHeight / 3.1, windowHeight / 3.1),
      y: random(-windowHeight / 29, windowHeight / 29),
    } 
    flowers.push(petal1);
}

//this function is called by the mouseClicked function
//this function will hide the text
function hideText(){
  text_message = "";
}
  