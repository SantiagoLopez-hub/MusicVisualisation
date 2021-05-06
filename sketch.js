//https://api.deezer.com/track/3135556
//https://cors-anywhere.herokuapp.com/https://api.deezer.com/track/3135556

//console.log(encodeURIComponent('https://api.deezer.com/track/3135556'));

//$.get("https://cors-anywhere.herokuapp.com/https://api.deezer.com/track/3135556", (res) => {
  // console.log(res);
//  console.log(res.preview);
//  $("body").append(
//  `<audio controls="controls">
//    Your browser does not support the &lt;audio&gt; tag. 
//    <source src="`+ res.preview + `" />
//  </audio>`);

  // song = loadSound("../../test.mp3");
  // console.log(song);
  // song.play();
  

  // window.location.href = res.preview;
//});

var song,
    userSearch,
    buttonSearch;

//$(document).ajaxError(function(){
//  $("#title").text("Visit the page by clicking on the button below and accept, then come back to this page");
//  $("#title").append('<br><br><a href="https://cors-anywhere.herokuapp.com/corsdemo">Click here</a>');
//});

function setup(){
  userSearch = createInput();
  userSearch.position(20, 20);
  
  buttonSearch = createButton("Search");
  buttonSearch.position(userSearch.x + userSearch.width, userSearch.y);
  buttonSearch.mousePressed(search);
  
//  $.get("https://cors-anywhere.herokuapp.com/https://api.deezer.com/track/3135556", (res) => {
//    console.log(res.preview);
//    song = loadSound(res.preview);
//  });
}

function search(){
  $("#searchResult").html("");
  
  if(userSearch.value() == ""){
    return;
  }
  
  $.get("https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=" + userSearch.value(), (res) => {
    console.log(res.data);
    for(var i = 0; i < res.data.length; i++){
      $("#searchResult").append('<button onclick="try{song.stop();}catch(error){} song = loadSound(this.value, playSong)" value="' + res.data[i].preview + '">' + res.data[i].title + ", " + res.data[i].artist.name + "</button><br>");
    }
  });
}

function playSong(){
  song.play();
}


/*
//global for the controls and input 
var controls = null;
//store visualisations in a container
var vis = null;
//variable for the p5 sound object
var sound = null;
//variable for p5 fast fourier transform
var fourier;

var back1, back2;

function preload() {
	sound = loadSound('assets/stomper_reggae_bit.mp3');
	back1 = loadImage("assets/bg1.jpg");
	back2 = loadImage("assets/bg2.jpg");
}

function setup() {
	 createCanvas(windowWidth, windowHeight);
	 background(0);
	 controls = new ControlsAndInput();

	 //instantiate the fft object
	 fourier = new p5.FFT();

	 //create a new visualisation container and add visualisations
	 vis = new Visualisations();
	 vis.add(new Nature(back1,back2,sound)); 
	 vis.add(new CirclePattern()); 
	 //vis.add(new WebglGraphics());
	 vis.add(new Spectrum());
	 vis.add(new WavePattern());
	 vis.add(new Needles());
}

function draw() {
	background(0);
	//draw the selected visualisation
	vis.selectedVisual.draw();
	//draw the controls on top.
	controls.draw();
}

function mouseClicked() {
	controls.mousePressed();
}

function keyPressed() {
	controls.keyPressed(keyCode);
}

//when the window has been resized. Resize canvas to fit 
//if the visualisation needs to be resized call its onResize method
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	if (vis.selectedVisual.hasOwnProperty('onResize')) {
		vis.selectedVisual.onResize();
	}
}
*/