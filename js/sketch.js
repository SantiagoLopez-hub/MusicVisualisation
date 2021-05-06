
let uploadLoading = false;
let cnv;

let fft;
let toggleBtn;
let uploadBtn;
let audio;
let uploadedAudio;
let uploadAnim;

let volSlider;


let vis = null;
let controls = null;



let searchTag;


function preload() {
	audio = loadSound("audio/marathisong.mp3", playAudioPlay);
}

function setup() {


	let searchParent = select("#searchform");
	userSearch = createInput().attribute('placeholder', 'Search Song');
	userSearch.parent(searchParent);

	buttonSearch = createButton("<i class='fa fa-search'></i>");
	buttonSearch.parent(searchParent);
	buttonSearch.mousePressed(search);

	searchTag = createElement("div", "<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 0 24 24' width='24px' fill='#FFFFFF'><path d='M0 0h24v24H0V0z' fill='none'/><path d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'/></svg>");
	searchTag.parent('header');
	searchTag.addClass("searchButton");
	searchTag.mousePressed(function () {
		select("#myOverlay").style("display", "block");
	});





	uploadAnim = select('#uploading-animation');

	vis = new Visualisations();
	vis.add(new MusicVisualCircle());
	vis.add(new MusicVisualLine());
	vis.add(new ParticleWave());
	vis.add(new RectParticleVis());
	vis.add(new CirclePattern());
	vis.add(new TriangleWave());
	vis.add(new NatureVisual());

	controls = new ControlsAndInput();


	cnv = createCanvas(windowWidth, windowHeight);
	cnv.doubleClicked(changeFullscreen);

	toggleBtn = createButton("Play / Pause");

	volSlider = createSlider(0, 1, 0.5, 0.1);

	volSlider.addClass('musicVol');





	uploadBtn = createFileInput(uploaded);

	uploadBtn.addClass("upload-btn");

	toggleBtn.addClass("toggle-btn");

	toggleBtn.mousePressed(toggleAudio);

	fft = new p5.FFT();

}



function draw() {

	// Add a loading animation for the uploaded track
	if (uploadLoading) {
		uploadAnim.addClass('is-visible');
	} else {
		uploadAnim.removeClass('is-visible');
	}

	vis.currentVisual.draw();
	controls.draw();

}


function toggleAudio() {
	if (audio.isPlaying()) {
		audio.pause();
	} else {
		audio.play();
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function changeFullscreen() {
	let fs = fullscreen();
	fullscreen(!fs);
}

function uploaded(file) {

	if (file.type === 'audio') {
		uploadLoading = true;
		uploadedAudio = loadSound(file.data, uploadedAudioPlay);

	} else {
		alert("Please Select Valid Audio File");
	}

}

function uploadedAudioPlay(audioFile) {
	uploadLoading = false;
	if (audio.isPlaying()) {
		audio.pause();
	}
	audio = audioFile;
	audio.loop();
}


function keyPressed() {
	controls.keyPressed(keyCode);
}

function playAudioPlay() {
	audio.loop();
}




function search() {

	if (userSearch.value() == "") {
		alert("Enter Song name");
	}
	else {

		uploadLoading = true;
		let url = "https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=" + userSearch.value();
		httpGet(url, gettingData, errorCallback);
 
		// $.get("https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=" + userSearch.value(), (res) => {

		// 	uploadLoading = false;
		// 	console.log(res.data);
		// 	for (var i = 0; i < res.data.length; i++) {
		// 		$("#searchResult").append('<button onclick="try{song.stop();}catch(error){} song = loadSound(this.value, uploadedAudioPlay)" value="' + res.data[i].preview + '">' + res.data[i].title + ", " + res.data[i].artist.name + "</button><br>");
		// 	}
		// });


	}

}

function gettingData(res){
	uploadLoading = false;
	userSearch.value('');
	select("#myOverlay").style("display", "none");

	console.log(res);
	// console.log(JSON.parse(res));
}


function errorCallback(error){

	uploadLoading = false;
	console.log(error);
}







