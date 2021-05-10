/* Class For The ParticleWave Music Visualisation */
function ParticleWave(){

    //Set the Name of Visulisation
    this.name = "Particle Wave";

    /*************************************************
    Menu Item for Selection of Visulaisation
    *************************************************/
    this.musicVisualelement = createA("#", "Particle Wave");
    this.musicVisualelement.parent('demos');
    this.musicVisualelement.addClass('demo');
    this.musicVisualelement.attribute("onclick", "switchVis('Particle Wave')");

    /**** Visualisation Theme Color Pallete Array ********/
    this.colorPalette = ["#0f0639", "#ff006a", "#ff4f00", "#00f9d9"];
    this.bgColor = "#0c0f27";
    this.bassColor = ["#313e9b", "#1200b3"];
    this.midColor = "#da1500";
    this.trembleColor = "#728d0d";

    /**** Variable for Setting the Background Theme *********/
    this.musicBody = select('#music-body');
    this.musicBodyColor = "#1d3cbb";

    //Local Variable for calculate Radius Space    
    let radius;

    /* Class Function for Drawing Visualisation */
    this.draw = function(){


        background(this.bgColor);
        strokeWeight(1);

        fft.analyze();

        var bass = fft.getEnergy("bass");
        var treble = fft.getEnergy(50, 110);
        var mid = fft.getEnergy("mid");

        var mapMid = map(mid, 0, 255, -radius, radius);
        var scaleMid = map(mid, 0, 255, 1, 1.5);

        var mapTreble = map(treble, 0, 255, -radius / 2, radius * 2);
        var scaleTreble = map(treble, 0, 255, 0.5, 2);

        var mapbass = map(bass, 0, 255, 0, 200);
        var scalebass = map(bass, 0, 255, 0, 0.8);

        mapMouseX = map(mouseX, 0, width, 100, 200);
        mapMouseScale = map(mouseX, 0, width, 0.35, 0.2);
        mapMouseY = map(mouseY, 0, height, windowHeight / 4, windowHeight);

        pieces = 9;
        radius = 200;

        translate(windowWidth / 2, windowHeight / 2);

        for (i = 0; i < pieces; i += 1) {

            rotate(TWO_PI / pieces);

            noFill();


            /*----------  BASS  ----------*/
            push();
            strokeWeight(8);
            stroke(this.bassColor[0]);
            scale(scalebass + mapMouseScale);
            rotate(-frameCount * 0.05);
            point(mapbass, radius / 2);
            stroke(this.bassColor[1]);
            strokeWeight(2.2);
            line(mapMouseX, mouseY, radius, radius);
            pop();



            /*----------  MID  ----------*/
            push();
            stroke(this.midColor);
            strokeWeight(4);
            rotate(-frameCount * 0.01);
            point(mapMid, radius);
            pop();


            /*----------  TREMBLE  ----------*/
            push();
            stroke(this.trembleColor);
            strokeWeight(4);
            scale(scaleTreble);
            rotate(frameCount * 0.01);
            point(-100, radius / 2);
            point(100, radius / 2);
            pop();

        }


    }



}