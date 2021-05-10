/* Class For The TriangleWave Music Visualisation */
function TriangleWave(){

    //Set the Name of Visulisation
    this.name = "Triangle Wave";

    /*************************************************
    Menu Item for Selection of Visulaisation
    *************************************************/
    this.musicVisualelement = createA("#", "Triangle Wave");
    this.musicVisualelement.parent('demos');
    this.musicVisualelement.addClass('demo');
    this.musicVisualelement.attribute("onclick", "switchVis('Triangle Wave')");

     /**** Visualisation Theme Color Pallete Array ********/
    this.colorPalette = ["#02073c", "#5b0ff5", "#f50fac", "#f50fac"];

    /**** Variable for Setting the Background Theme *********/
    this.musicBody = select('#music-body');
    this.musicBodyColor = this.colorPalette[1];

    /* Amplitude measures volume between 0.0 and 1.0. Listens to all p5sound by default */
    this.analyzer = new p5.Amplitude();

    /* Class Function for Drawing Visualisation */
    this.draw = function(){

        background(this.colorPalette[0]);
    
        translate(windowWidth / 2, windowHeight / 2);
    
        level = this.analyzer.getLevel();
        fft.analyze();
    
        var bass = fft.getEnergy(100, 150);
        var treble = fft.getEnergy(150, 250);
        var mid = fft.getEnergy("mid");
    
        var mapMid = map(mid, 0, 255, -100, 200);
        var scaleMid = map(mid, 0, 255, 1, 1.5);
    
        var mapTreble = map(treble, 0, 255, 200, 350);
        var scaleTreble = map(treble, 0, 255, 0, 1);
    
        var mapbass = map(bass, 0, 255, 50, 200);
        var scalebass = map(bass, 0, 255, 0.05, 1.2);
    
        mapMouseX = map(mouseX, 0, width, 1, 50);
        mapMouseXbass = map(mouseX, 0, width, 1, 5);
        mapMouseY = map(mouseY, 0, height, 2, 6);
    
        pieces = 20;
        radius = 100;
    
        for (i = 0; i < pieces; i += 0.1) {
    
            rotate(TWO_PI / (pieces / 2));
    
            noFill();
    
            /*----------  BASS  ----------*/
            push();
            stroke(this.colorPalette[1]);
            rotate(frameCount * 0.002);
            strokeWeight(0.5);
            polygon(mapbass + i, mapbass - i, mapMouseXbass * i, 3);
            pop();
    
    
            /*----------  MID  ----------*/
            push();
            stroke(this.colorPalette[2]);
            strokeWeight(0.2);
            polygon(mapMid + i / 2, mapMid - i * 2, mapMouseX * i, 7);
            pop();
    
    
            /*----------  TREMBLE  ----------*/
            push();
            stroke(this.colorPalette[3]);
            strokeWeight(0.6);
            scale(mouseX * 0.0005);
            rotate((mouseX * 0.002));
            polygon(mapTreble + i / 2, mapTreble - i / 2, mapMouseY * i / 2, 3);
            pop();
    
        }

    }

    //Function for drawing the polygon using vertex
    function polygon(x, y, radius, npoints) {
        var angle = TWO_PI / npoints;
        beginShape();
        for (var a = 0; a < TWO_PI; a += angle) {
            var sx = x + cos(a) * radius;
            var sy = y + sin(a) * radius;
            vertex(sx, sy);
        }
        endShape(CLOSE);
    }

}