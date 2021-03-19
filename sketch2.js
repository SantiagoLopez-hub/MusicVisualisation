// main (parent) object of this scene
let root;

// Keeps track of the illusion of the world moving
//when you press left or right arrow, or "a" & "d" keys
let worldMovement = 0;

// Array to create dynamic sizes of the spikes generated
let sizes = [];

// Used as a texture for the cylinder
let rocketImg;


class Object {
  constructor(drawFunction) {
    // do some error checking if nothing passed in
    if (!drawFunction)
    {
      throw "new Object: No drawing function passed in!";
    }

    this._drawFunction = drawFunction; 
    
    this.children = [];
  }

  draw(){
    
    // Rotate the world when the user presses keys
    // 37 = left arrow, 65 = a
    if(keyIsDown(37) || keyIsDown(65)){
      worldMovement += 0.02;
    }
    // 39 = right arrow, 68 = d
    else if(keyIsDown(39) || keyIsDown(68)){
      worldMovement += -0.02;
    }

    push();
    
    // Collect the value previously modified and use it to
    //rotate everything, including children of the root
    //element, in the Y axis
    rotateY(worldMovement);

    this._drawFunction(); // draw ourself!

    for (let child of this.children){
      child._drawFunction();
    }

    pop();

  }
} 


function setup() {
  createCanvas(600, 240, WEBGL);
  perspective();
  
  //Rocket vector space launch by Dawnydawny
  //Taken from pixabay - link: https://pixabay.com/vectors/rocket-vector-space-launch-2442125/
  rocketImg = loadImage("assets/rocket.png");

  root = new Object(
    function() {
      texture(rocketImg);
      cylinder(150, height*4); // draw cylinder
    }
  );  
  
  for(var n = 0; n < 11; n++){
    // Add an amount of arrays to the 2d array "sizes"
    //with random values for the radius and height of the 
    //cones that will be created
    sizes.push([random(50, 100), random(300, 1000)]);
  }

  for(var i = 0; i < 10; i++){
    
    // Create random spikes using the SceneObject class
    let spike = new Object(
      function() {
        noStroke(); // don't show the triangles that the object is composed of
        colorMode(RGB); // choose RGB form of colour
        
        // make a light that moves relative to the mouse position
        pointLight(150, 50, 50, mouseX, mouseY, 250);
        // give the shapes colour to react with pointLight
        ambientMaterial(180, 100, 100);
        
        // change the positioning of the spike before drawing it
        translate(0, -sizes[i][1], 150/2);
        rotateX(90); // rotate the spikes further
        cone(sizes[i][0], sizes[i][1]); // draw cone
      }
    );
    
    // Store each spike in the array to later display them
    root.children.push(spike);
  }
}

function draw() {

  background(255);

  root.draw();
  
  // Change the angleMode to Radians, as it will be used for the camera
  angleMode(RADIANS);
  // Change the positioning of the camera to view it from another angle, which
  //gives the illusion that the cylinder is never-ending
  camera(0, 500, (height/2) / tan(PI/6), 0, 0, 0, 0, 1, 0);
}
