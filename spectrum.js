function Spectrum() {
	this.name = "spectrum";

	this.draw = function() {
		push();
		var spectrum = fourier.analyze();
		noStroke();

		for (var i = 0; i < spectrum.length; i++){
            
            var y = map(i, 0, spectrum.length, 0, height);
            var amplitude = map(spectrum[i], 0, 255, 0, width); 
            
            fill(amplitude, 255 - amplitude, 0);
            rect(0, y, amplitude, height / spectrum.length);
  		}
	
		pop();
	};
}
