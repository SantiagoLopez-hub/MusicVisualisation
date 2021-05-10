/* Class For The MusicVisualLine Music Visualisation */
function MusicVisualLine(){

    //Set the Name of Visulisation
    this.name = "MusicVisualLine";

    /*************************************************
    Menu Item for Selection of Visulaisation
    *************************************************/
    this.musicVisualelement = createA("#", "MusicVisualLine");
    this.musicVisualelement.parent('demos');
    this.musicVisualelement.addClass('demo');
    this.musicVisualelement.attribute("onclick", "switchVis('MusicVisualLine')");

    /**** Visualisation Theme Color Pallete Array ********/
    this.colorPalette = ["#000", "rgba(22, 59, 72, 0.5)", "#00a6e0", "#002a38"];

    /**** Variable for Setting the Background Theme *********/
    this.musicBody = select('#music-body');
    this.musicBodyColor = "#2376a5";

    /* Local Variable for Drawing Shapes of Lines */
    let pieces;
    let radius;
   

    /* Class Function for Drawing Visualisation */
    this.draw = function(){
        
        background(this.colorPalette[0]);

        noFill();

        fft.analyze();

        let bass = fft.getEnergy("bass");
        let treble = fft.getEnergy("treble");
        let mid = fft.getEnergy("mid");

        let mapMid = map(mid, 0, 255, -radius, radius);
        let scaleMid = map(mid, 0, 255, 1, 1.5);

        let mapTreble = map(treble, 0, 255, -radius, radius);
        let scaleTreble = map(treble, 0, 255, 1, 1.5);

        let mapbass = map(bass, 0, 255, -100, 800);
        let scalebass = map(bass, 0, 255, 0, 0.8);

        let mapMouseX = map(mouseX, 0, width, 4, 10);
        let mapMouseY = map(mouseY, 0, height, windowHeight / 4, windowHeight);

        pieces = mapMouseX;
        radius = mapMouseY;

        translate(windowWidth / 2, windowHeight / 2);

        strokeWeight(1);

        for (i = 0; i < pieces; i += 0.5) {

            rotate(TWO_PI / pieces);


            /*----------  BASS  ----------*/
            push();
            strokeWeight(5);
            stroke(this.colorPalette[1]);
            scale(scalebass);
            rotate(frameCount * -0.5);
            line(mapbass, radius / 2, radius, radius);
            line(-mapbass, -radius / 2, radius, radius);
            pop();



            /*----------  MID  ----------*/
            push();
            strokeWeight(0.5);
            stroke(this.colorPalette[2]);
            scale(scaleMid);
            line(mapMid, radius / 2, radius, radius);
            line(-mapMid, -radius / 2, radius, radius);
            pop();


            /*----------  TREMBLE  ----------*/
            push();
            stroke(this.colorPalette[3]);
            scale(scaleTreble);
            line(mapTreble, radius / 2, radius, radius);
            line(-mapTreble, -radius / 2, radius, radius);
            pop();

        }


    }


    


}