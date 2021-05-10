/* Class For The Bubble Pattern Music Visualisation */
function BubblePattern(){

    //Set the Name of Visulisation
    this.name = "Bubbles Pattern";

    /*************************************************
    Menu Item for Selection of Visulaisation
    *************************************************/
    this.musicVisualelement = createA("#", this.name);
    this.musicVisualelement.parent('demos');
    this.musicVisualelement.addClass('demo');
    this.musicVisualelement.attribute("onclick", "switchVis('Bubbles Pattern')");


    /*************************************************
    Variable for Calculating Bubbles Velocity and Location
    *************************************************/
    this.vecLocation = [];
    this.vecVelocity = [];
    this.vecDiameter = [];
    this.vecColor = [];
    this.mass = 20.0; 


    /**** Visualisation Theme Color Pallete Array ********/
    this.colorPalette = ["#05668D", "rgba(22, 59, 72, 0.5)", "#00a6e0", "#002a38"];

    /**** Variable for Setting the Background Theme *********/
    this.musicBody = select('#music-body');
    this.musicBodyColor = "#02C39A";
    
    /* Class Function for Drawing Visualisation */
    this.draw = function(){

        //Set the background of canvas
        background(this.colorPalette[0]);

        push();
        noStroke();

        /* get array of amplitude values (between 0 and 255) 
        across the frequency spectrum of current Audio */
        var spectrum = fft.analyze();
        //Set Max Volume 
        let vol = Math.max.apply(null, spectrum);

        /* Traverse the array of spectrum */
        for (i = 0; i < spectrum.length; i++) {
            /* Map the logarithm value of i between 0 to 128 for fiiling circle with Green value */
            var h = map(log(i), 0, log(spectrum.length), 0, 128);
            /* Calculate the Diameter of circle using power of spectrum frequency value of sound */
            let diameter = map(pow(spectrum[i], 2), 0, pow(255, 2), 0, height);
            /* Fill the color of circle using calulated Values of sctectrum freqency */
            fill(map(pow(spectrum[i], 2),pow(255, 2), 0, 0, 255), h, i, 30);
            /* Draw circle center of the canvas */
            circle(width/2, height/2, diameter);		
        }
       
        /* if amplitute vol of sound goes higher than 210 */
        if (vol > 210) {
            /* Call create function  for creating the bubbles loactions*/
            this.create();
        }

        /* check the array of bubbles location if not empty then draw bubbles from there respection values  */
        if (this.vecLocation.length != 0){
            /* Traverse the velocity locationns of bubbles array */
            for(let i = 0; i < this.vecLocation.length; i++){

                /* Set the randome direction of bubbles */
                let direction = radians(random(0, 360));
                //Calculate x postion of bubbles 
                let addX = cos(direction) * random(0.1); 
                //Calculate y position of bubble
                let addY = sin(direction) * random(0.1);
                //Create the accelaration of bubble
                let accel = createVector(addX/this.mass, addY/this.mass);
                //add accelaration to the velocity vector 
                this.vecVelocity[i].add(accel);
                //Caluclate moving direction
                this.vecLocation[i].add(this.vecVelocity[i]);
                //get color from  array of vecColor
                fill(this.vecColor[i].x,this.vecColor[i].y, this.vecColor[i].z, 50);
                //Draw Bubbles
                ellipse(this.vecLocation[i].x, this.vecLocation[i].y, this.vecDiameter[i].x, this.vecDiameter[i].x);
                //Check the bubbles is it outside of canvas if is it then remove from arrays
                if(this.vecLocation[i].x < 0 || this.vecLocation[i].x > width){
                        this.vecLocation.splice(i, 1);
                        this.vecVelocity.splice(i, 1);
                        this.vecDiameter.splice(i, 1);
                        this.vecColor.splice(i, 1);
                }
          }
        }
        pop();
    }
    
    //Creates The Bubbles Properties to draw Bubbles
    this.create = function(){
        this.vecLocation.push(createVector(width / 2, height / 2));
        this.vecVelocity.push(createVector(cos(random(0,360)),sin(random(0, 360))));
        this.vecDiameter.push(createVector(random(10,30)));
        this.vecColor.push(createVector(random(255), random(255), random(255)));
    }
}