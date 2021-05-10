/* Class For The MusicVisualCircle Music Visualisation */
function MusicVisualCircle() {

    //Set the Name of Visulisation
    this.name = "MusicVisualCircle";

    /*************************************************
    Menu Item for Selection of Visulaisation
    *************************************************/
    this.musicVisualelement = createA("#", "MusicVisualCircle");
    this.musicVisualelement.parent('demos');
    this.musicVisualelement.addClass('demo');
    this.musicVisualelement.attribute("onclick", "switchVis('MusicVisualCircle')");

    /**** Visualisation Theme Color Pallete Array ********/
    this.colorPalette = ["#0f0639", "#ff006a", "#ff4f00", "#00f9d9"];

    /**** Variable for Setting the Background Theme *********/
    this.musicBody = select('#music-body');
    this.musicBodyColor = "#c83f2b";

    /*************************************************
    Variable for Calculating Circle Radius, pieces 
    *************************************************/
    let radius, pieces, mapMouseX, mapMouseY;

    /* Class Function for Drawing Visualisation */
    this.draw = function () {

        //Change the Background Color of canvas
        background(this.colorPalette[0]);

        /* get array of amplitude values (between 0 and 255) 
        across the frequency spectrum of current Audio */
        fft.analyze();

        //get the amount of energy (volume) at a bass frequency, 
        var bass = fft.getEnergy("bass");
        //get the amount of energy (volume) at a specific frequency, 
        var treble = fft.getEnergy(100, 150);
        //Returns the amount of energy (volume) at a mid frequency, 
        var mid = fft.getEnergy("mid");

        //Map the bass frequency,
        var mapbass = map(bass, 0, 255, -100, 800);
        var scalebass = map(bass, 0, 255, 0.5, 1.2);
    
        //Map the mid frequency, 
        var mapMid = map(mid, 0, 255, -radius / 4, radius * 4);

        //Map energy (volume) frequency, 
        var mapTreble = map(treble, 0, 255, -radius / 4, radius * 4);
        var scaleTreble = map(treble, 0, 255, 1, 1.5);
       
        //Map the mouseX and mouseY for the changing the position of lines 
        mapMouseX = map(mouseX, 0, width, 2, 0.1);
        mapMouseY = map(mouseY, 0, height, windowHeight / 8, windowHeight / 6);

        //Assign the mapping position to pieces and radius
        pieces = mapMouseX;
        radius = mapMouseY;

        translate(width / 2, height / 2);

        //Draw the lines with calculted frequency
        for (i = 0; i < pieces; i += 0.01) {

            rotate(TWO_PI / pieces);
            
            /*----------  BASS  ----------*/
            push();
            strokeWeight(1);
            stroke(this.colorPalette[1]);
            scale(scalebass);
            rotate(frameCount * -0.5);
            line(mapbass, radius / 2, radius, radius);
            line(-mapbass, -radius / 2, radius, radius);
            pop();


            /*----------  MID  ----------*/
            push();
            strokeWeight(1);
            stroke(this.colorPalette[2]);
            line(mapMid, radius, radius * 2, radius * 2);
            pop();


            /*----------  TREMBLE  ----------*/
            push();
            stroke(this.colorPalette[3]);
            scale(scaleTreble);
            line(mapTreble, radius / 2, radius, radius);
            pop();

        }

    }

}
