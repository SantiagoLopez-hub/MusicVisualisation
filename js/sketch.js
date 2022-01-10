//Variable for loading animation control
let uploadLoading = false;

let loadedSound = false;

//Variable for canvas 
let cnv;

//Variable for P5.FFT
let fft;

//Play and Pause Music Button Variable
let toggleBtn;

//Variable for Button upload music File 
let uploadBtn;

//Music Variable
let audio;

//variable for Uploaded music from system 
let uploadedAudio;

//Variable for storing temporary audio from deezer
let tempSong;

//Variable for controlling P5.Elements for animation
let uploadAnim;

//Variable for the volume slider
let volSlider;

//Visualization variable
let vis = null;

//Input/output control variable
let controls = null;

//Variable for getting search sounds data from deezer
let songsData;

//Variable for creating search tag Icon in menu
let searchTag;


/*
p5js Preaload method is used to handle asynchronous 
loading of external files in a blocking way.
*/
function preload() {
	//Load the sound file assets into to audio set Function for 
	audio = loadSound('audio/stomper_reggae_bit.mp3', function () {
		loadedSound = true;
	});
}


/* 
p5js inbuild setup method
It's used to define initial environment properties 
such as screen size and background color and to 
load media such as images and fonts as the program starts.
*/
function setup() {


	/******* Search Song Form Setup START *******/

	// Select html element by ID Search form from index.html file 
	let searchParent = select("#searchform");
	// Create the text Input for search song
	userSearch = createInput().attribute('placeholder', 'Search Song');
	//Set parent as #searchform
	userSearch.parent(searchParent);


	//Create button for call search song events
	buttonSearch = createButton("<i class='fa fa-search'></i>");
	//Set parent as #searchform
	buttonSearch.parent(searchParent);
	//Link the search event to button
	buttonSearch.mousePressed(search);

	//Create menuItem for the search using vector search Icon 
	searchTag = createElement("div", "<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 0 24 24' width='24px' fill='#FFFFFF'><path d='M0 0h24v24H0V0z' fill='none'/><path d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'/></svg>");
	//Set parent for search Icon as header
	searchTag.parent('header');
	//Add class for icon as 'searchButton'
	searchTag.addClass("searchButton");
	//Link the mousePressed event for the search Icon
	searchTag.mousePressed(function () {
		audio.pause();
		select("#myOverlay").style("display", "block");
	});

	/******* Search Song Form Setup END *******/



	// Set the P5.Element to uploadAnim
	uploadAnim = select('#uploading-animation');


	/******* Store Visualisation to visual object *******/
	vis = new Visualisations();
	vis.add(new MusicVisualCircle());
	vis.add(new MusicVisualLine());
	vis.add(new ParticleWave());
	vis.add(new RectParticle());
	vis.add(new BubblePattern());
	vis.add(new TriangleWave());
	/******* Store Visualisation to visual object END *******/

	//Create controls object of ControlsAndInput() class
	controls = new ControlsAndInput();


	//Create Canvas
	cnv = createCanvas(windowWidth, windowHeight);
	//Set Doubleclick event on canvas
	cnv.doubleClicked(changeFullscreen);

	//Create Button for conrtrol Music
	toggleBtn = createButton("Play / Pause");
	volSlider = createSlider(0, 1, 0.5, 0.1);
	volSlider.addClass('musicVol');
	uploadBtn = createFileInput(uploaded);
	uploadBtn.addClass("upload-btn");
	toggleBtn.addClass("toggle-btn");
	toggleBtn.mousePressed(toggleAudio);

	//Create FFT (Fast Fourier Transform)  object
	fft = new p5.FFT();

}


/*
p5js inbuild draw method
draw() function continuously executes the lines of code 
contained inside its block until the program is stopped.
*/
function draw() {

	// Add a loading animation for the uploaded track
	if (uploadLoading) {
		uploadAnim.addClass('is-visible');
	} else {
		uploadAnim.removeClass('is-visible');
	}

	//Draw Music Visualisations
	vis.currentVisual.draw();
	//Draw Controls
	controls.draw();

}



/*
Function for Toggle button Events for play and Pause Music 
*/
function toggleAudio() {
	//If audio is Playing the Stop music else start play music
	if(loadedSound){
		if (audio.isPlaying()) {
			audio.pause();
		} else {
			audio.play();
		}
	}else{
		alert("Sound is not Loaded");
	}
}

/* 
Function for Canvas Double click Event to change full screen 
*/
function changeFullscreen() {
	let fs = fullscreen();
	fullscreen(!fs);
}


/*
Input File events for upload Button 
*/
function uploaded(file) {

	//Check the File type is audio or not
	if (file.type === 'audio') {
		//Start the Loading Animation
		uploadLoading = true;
		//Load the Audio from input file to uploadedAudio variable
		uploadedAudio = loadSound(file.data, uploadedAudioPlay);

	} else {
		//Display the invalid file alert
		alert("Please Select Valid Audio File");
	}

}


/* 
LoadSound Success Callback
*/
function uploadedAudioPlay(audioFile) {
	//Stop the loading Animation
	uploadLoading = false;
	//Stop Audio if music is playing
	if (audio.isPlaying()) {
		audio.pause();
	}
	//Load uploaded audio for visualisation
	audio = audioFile;
	//Play music in loop
	audio.loop();
}

/*
P5js keyPressed function
function is called once every time a key is pressed.
The keyCode for the key that was pressed is stored in the keyCode variable.
*/
function keyPressed() {
	controls.keyPressed(keyCode);
}


/*
Search form Event Function for Search Songs using Deezer api 
*/
function search() {

	//Check Input text is Empty of not if is empty display alert
	if (userSearch.value() == "") {
		alert("Enter Song name");
	}
	else {

		//Set the loadding Animation
		uploadLoading = true;

		//Remove the child elements of #search-title
		select("#search-title").html("");
		//Remove the child elements of #songs-row
		select("#songs-row").html("");

		//set Api url for getData 
		let allOrigin = "https://api.allorigins.win/get?url=https://api.deezer.com/search?q=" + userSearch.value();

		/* 
		Execute the GET request "httpGet" P5js Method for executing an HTTP GET request.
		"gettingData" is successFull callback and "errorCallback".
		httpGet(path, callback, [errorCallback])
		*/
		httpGet(allOrigin, gettingData, errorCallback);

	}

}

/* 
Successful Callback of httpGet method 
*/
function gettingData(res) {
	//Stop Loading Animation
	uploadLoading = false;
	//Deezer api returns the JSON Data. convert json into array object
	a = JSON.parse(res);


	//parse the search song data as Array object 
	//JSON.parse() is javascript method 
	songsData = JSON.parse(a.contents);

	//Create Html Element for Display Title of search results
	searchTitle = createElement("h5", "Search Result of : " + "' " + userSearch.value() + " '");
	searchTitle.parent("search-title");
	//Reset the text Input 
	userSearch.value('');


	//Select HTML Element using ID
	let songsRow = select("#songs-row");

	//Create the Html Elements for Displaying Search result of Songs
	for (let i = 0; i < songsData.data.length; i++) {
		//Songs Card Data
		let songCard = createElement("div", "<div class='card'><div class='music-card'><a onclick='searchMusicLoad(" + songsData.data[i].id + ");' class='song_link'><div class='image'  id='coverImage" + songsData.data[i].id + "'></div></a><div class='info'><h2 class='title'>" + songsData.data[i].title + "</h2><div class='artist'>" + songsData.data[i].artist.name + "</div></div> <button class='playButton' id='play" + songsData.data[i].id + "' onclick='songofsearch(this.value," + songsData.data[i].id + ");' value=" + "'" + songsData.data[i].preview + "'" + "><i class='fa fa-play'  aria-hidden='true'></i></button><button class='pauseButton' onclick='pausesearchMusic(" + songsData.data[i].id + ");' id='pause" + songsData.data[i].id + "'><i class='fa fa-pause' aria-hidden='true'></i></button></div></div>");
		//Set Class as column
		songCard.addClass("column");
		//Set songsRow as Parent 
		songCard.parent(songsRow);
		//Set the Music cover Image as styling property
		select("#coverImage" + songsData.data[i].id).style("background", "url(" + songsData.data[i].album.cover_medium + ")");
	}

}


/* 
Error Callback of httpGet method 
*/
function errorCallback(error) {
	//Stop Loading Animation
	uploadLoading = false;
	//Create Html Element for Showing Result 
	searchTitle = createElement("h5", "Search Result of : " + "' " + userSearch.value() + "api is temporarily not working");
	searchTitle.parent("search-title");
	//Reset the text Input 
	userSearch.value('');
}


/*
Html onClick event function for playing temporary song from Songs Card of Html
*/
function songofsearch(res, btnId) {
	//Catch the Music Playing Error
	try {
		tempSong.pause();
	} catch (error) {
		console.log(error);
	}

	//Load Sounds from deezer api resource link 
	tempSong = loadSound(res, playSong);

	//Reset the Stylinng Properties of Music Card
	let pauseElements = selectAll(".pauseButton");
	let playElements = selectAll(".playButton");
	for (let i = 0; i < pauseElements.length; i++) {
		pauseElements[i].style("display", "none");
		playElements[i].style("display", "block");
	}

	//Set the Current state of Music Card
	let pauseButtonId = "#pause" + btnId;
	let playButtonId = "#play" + btnId;
	select(pauseButtonId).style("display", "block");
	select(playButtonId).style("display", "none");
}

/*
LoadSound Succesful Callback of Temporary Sounds
*/
function playSong() {
	if (tempSong.isPlaying()) {
		tempSong.pause();
	} else {
		tempSong.loop();
	}
}

/*
Temporary Song Pause Button of Music Card Event
*/
function pausesearchMusic(butnId) {
	//Check the Current Music Card Elements And Change the Status of current Music Card
	let pauseButtonId = "#pause" + butnId;
	let playButtonId = "#play" + butnId;
	select(pauseButtonId).style("display", "none");
	select(playButtonId).style("display", "block");
	//Pause the Temporary Music Playing
	tempSong.pause();
}

/*
Load the search Music for Music Visualisatuion
*/
function searchMusicLoad(file) {

	//Start the Loading Animation
	uploadLoading = true;
	
	//Stop Temporary song
	if(tempSong != undefined){
		tempSong.stop();
	}
	
	//Hide the Search Song Window
	select("#myOverlay").style("display", "none");
	select("#search-title").html("");
	select("#songs-row").html("");

	//Search the song from the songsData and load into uploadedAudio
	for (let i = 0; i < songsData.data.length; i++) {
		if (songsData.data[i].id == file) {
			uploadedAudio = loadSound(songsData.data[i].preview, uploadedAudioPlay);
			break;
		}
	}

}

//P5js Inbuilt method to check size of window change
function windowResized() {
	//Update the width and height of canvas
	resizeCanvas(windowWidth, windowHeight);
}

/*
Menu Items onclick function for change Visualisation
*/
function switchVis(name){
	vis.selectedVisual(name);
}


function closeSearch() {

	select("#myOverlay").style("display", "none");
	select("#search-title").html("");
	select("#songs-row").html("");
	audio.play();
	if(tempSong != undefined){
		tempSong.stop();
	}
	console.log("works Fine");
}

