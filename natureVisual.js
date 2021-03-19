function Nature(bg1, bg2,sound) {
    this.name = "Nature";
    this.back1 = bg1;
    this.back2 = bg2;
    this.song = sound;
    this.tint_timer;
    this.band_width;
    this.fft_bins = 64;
    this.band_width = windowWidth / this.fft_bins * 1.5;
    this.drops = [];
    this.back1.resize(windowWidth, 0);
    
    for (var i = 0; i < 300; i++) {
		this.drops[i] = new Drop();
	}

    this.draw = function () {

        //background(0, 100, 200);
        noStroke();
	    fill(0, 100, 200);
	    stroke(0, 100, 200);
        this.drawLandscape();
        var spectrum = fourier.analyze();
        beginShape();
            curveVertex(0, windowHeight);
            curveVertex(0, windowHeight);
            this.drawWaveform(spectrum);
            curveVertex(windowWidth, windowHeight);
            curveVertex(windowWidth, windowHeight);
        endShape();

        if (this.song.isPlaying()) {
            this.tint_timer = 10;
        }else{
            this.tint_timer = 100;
        }
    }

    this.drawWaveform = function(array) {
        for (var i = 0; i <= array.length; i++) {
            var amp = array[i];
            var y = map(amp, 0, 256, windowHeight, windowHeight / 4 * 2.5);
            curveVertex(i * this.band_width, y);
        }
    }

    this.drawLandscape = function() {
        image(this.back1, 0, 0);
        if (!this.song.isPlaying()) {
            // Change image transparency slowly to create cross-fade effect
            tint(255, frameCount - this.tint_timer);
            // Scales background images so they fit the width of the canvas but maintain aspect ratio
            this.back1.resize(windowWidth, 0);
            image(this.back1, 0, 0);
        } else {
            tint(255, frameCount - this.tint_timer);
            this.back2.resize(windowWidth, 0);
            image(this.back2, 0, 0);
            // Calls the fall and draw functions for raindrop objects
            for (var i = 0; i < this.drops.length; i++) {
                this.drops[i].fall();
                this.drops[i].show();
            }
        }
    }
}



function Drop() {
	// X, y and z coordinates
	// X is mapped across the length of the screen
	// Y is randomised just above the canvas to the allow the rain to "fall"
	// Z is randomised in the range of 20 pixels
	this.x = random(windowWidth);
	this.y = random(-500, -50);
	this.z = random(0, 20);
	// Length is mapped so that the larger the z coordinate, the shorter the line
	this.len = map(this.z, 0, 20, 10, 20);
	// Speed is mapped so that the larger the z coordinate, the slower the speed
	this.yspeed = map(this.z, 0, 20, 1, 20);

	// The fall function codes for downward movement
	this.fall = function() {
		// Add the speed increment to the Y coordinate to scale movement to the z axis
		this.y = this.y + this.yspeed;
		// "Gravity" variable allows faster acceleration, more realilstic fall speeds 
		var gravity = map(this.z, 0, 20, 0, 0.2);
		this.yspeed = this.yspeed + gravity;
    
		// If the particle is offscreen, (it's height is greater than screen height)
		if (this.y > height) {
			// Randomise it's position above the canvas
			this.y = random(-200, -100);
			// Set its speed range according to the z value
			this.yspeed = map(this.z, 0, 20, 4, 10);
		}
	}
  
	// This function draws the rain paticle
	this.show = function() {
		// Determine thickness of stroke according to the z value
		var thick = map(this.z, 0, 20, 1, 2);
		// Set thisckness of stroke to above variable
		strokeWeight(thick);
		// Draw line according to properties defined above
		line(this.x, this.y, this.x, this.y + this.len);
	}
}
