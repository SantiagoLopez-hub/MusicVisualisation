function CirclePattern(){

    this.name = "Bubbles Pattern";
    this.musicVisualelement = createA("#", this.name);
    this.musicVisualelement.parent('demos');
    this.musicVisualelement.addClass('demo');

    this.vecLocation = [];
    this.vecVelocity = [];
    this.vecDiameter = [];
    this.vecColor = [];
    this.mass = 20.0; 


    this.colorPalette = ["#05668D", "rgba(22, 59, 72, 0.5)", "#00a6e0", "#002a38"];
    this.musicBody = select('#music-body');


    this.musicBodyColor = "#02C39A";
    
    this.draw = function(){

        // this.musicBody.style('color', "#02C39A");
        // this.musicVisualelement.style('color', "#fff")
        background(this.colorPalette[0]);
        push();

        noStroke();
        let colorA =  color(255, 204, 0);
        let colorB = color(255, 0, 0);

        var spectrum = fft.analyze();
        let vol = Math.max.apply(null, spectrum);
        for (i = 0; i < spectrum.length; i++) {
            var h = map(log(i), 0, log(spectrum.length), 0, 128);
            let diameter = map(pow(spectrum[i], 2), 0, pow(255, 2), 0, height);
            fill(map(pow(spectrum[i], 2),pow(255, 2), 0, 0, 255), h, i, 30);
            circle(width/2, height/2, diameter);		
        }
        // for (var i=0; i<spectrum.length; i++) {
        //     colorMode(HSB, 360, 100, 100, 100);
        //     var amt = map(i, 0, spectrum.length, 0, 1);
        //     var colorS = lerpColor(colorA, colorB, amt);
        //     var diam = map(spectrum[i], 0, 255, 0, 500);
        //     //noFill();
        //     stroke(colorS);
        //     ellipseMode(CENTER);
        //     ellipse(width/2, height/2, diam, diam);
        // }
       
        if (vol > 210) {
            this.create();
        }

        if (this.vecLocation.length != 0){
            for(let i = 0; i < this.vecLocation.length; i++){
                let direction = radians(random(0, 360));
                let addX = cos(direction) * random(0.1); 
                let addY = sin(direction) * random(0.1);
                let accel = createVector(addX/this.mass, addY/this.mass); 
                this.vecVelocity[i].add(accel);
                this.vecLocation[i].add(this.vecVelocity[i]);
                fill(this.vecColor[i].x,this.vecColor[i].y, this.vecColor[i].z, 50);
                ellipse(this.vecLocation[i].x, this.vecLocation[i].y, this.vecDiameter[i].x, this.vecDiameter[i].x);
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
    this.create = function(){
        this.vecLocation.push(createVector(width / 2, height / 2));
        this.vecVelocity.push(createVector(cos(random(0,360)),sin(random(0, 360))));
        this.vecDiameter.push(createVector(random(10,30)));
        this.vecColor.push(createVector(random(255), random(255), random(255)));
    }
}