function MusicVisualCircle(){

    this.name = "MusicVisualCircle";
    this.musicVisualelement = createA("#", "MusicVisualCircle");
    this.musicVisualelement.parent('demos');
    this.musicVisualelement.addClass('demo');
    //this.musicVisualelement.mousePressed(drawAnimation);
    this.colorPalette = ["#0f0639", "#ff006a", "#ff4f00", "#00f9d9"];
    this.musicBody = select('#music-body');
    this.selectedVis = false;
    this.musicBodyColor = "#c83f2b";

    let radius, pieces, mapMouseX, mapMouseY;
    

    this.draw = function(){

        // this.musicBody.style('color', "#c83f2b");
        // this.musicVisualelement.style('color', "#fff")
        background(this.colorPalette[0]);

       
    
        fft.analyze();
        var bass = fft.getEnergy("bass");
        var treble = fft.getEnergy(100, 150);
        var mid = fft.getEnergy("mid");

        var mapbass = map(bass, 0, 255, -100, 800);
        var scalebass = map(bass, 0, 255, 0.5, 1.2);

        var mapMid = map(mid, 0, 255, -radius / 4, radius * 4);
        var scaleMid = map(mid, 0, 255, 1, 1.5);

        var mapTreble = map(treble, 0, 255, -radius / 4, radius * 4);
        var scaleTreble = map(treble, 0, 255, 1, 1.5);

        mapMouseX = map(mouseX, 0, width, 2, 0.1);
        mapMouseY = map(mouseY, 0, height, windowHeight / 8, windowHeight / 6);

        pieces = mapMouseX;
        radius = mapMouseY;

        var mapScaleX = map(mouseX, 0, width, 1, 0);
        var mapScaleY = map(mouseY, 0, height, 0, 1);


        translate(width / 2, height / 2);

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
