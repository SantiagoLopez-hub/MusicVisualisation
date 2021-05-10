//Constructor function to handle the onscreen menu, keyboard and mouse
//controls
function ControlsAndInput(){
    //Variable for Check controls are displayed or not
    this.menuDisplayed = false;

   //Draw the menu on screen
    this.draw = function(){

        //Get the P5 Elements from Html
        let menuNav = select("#demos");
        let playBackBtn = select(".toggle-btn");
        let uploadBtn = select(".upload-btn");
        let titleTag = select(".codrops-header__title");
        let volumeBtn = select('.musicVol');

        /* 
        Check menu display or not 
        if menu is display then hide the all html elements
        else Show all the elements
        */
        if (this.menuDisplayed) {
			menuNav.addClass('hidden');
            playBackBtn.style('display', 'none');
            uploadBtn.style('display', 'none');
            titleTag.style('display', 'none');
            volumeBtn.style('display', 'none');
            select(".searchButton").style('display', 'none');
		}else{
            menuNav.removeClass('hidden');
            playBackBtn.style('display', 'block');
            uploadBtn.style('display', 'block');
            titleTag.style('display', 'block');
            volumeBtn.style('display', 'block');
            select(".searchButton").style('display', 'block');
        }

        // Changes Volume of Audio from the Value of Voloume Slider
        audio.setVolume(volSlider.value());

    }

    //Check the key pressed for controlling menu and changing visuliastion
    this.keyPressed = function(keycode){

        if(keycode == 32){
            this.menuDisplayed = !this.menuDisplayed;
        }
        if(keycode > 48 && keycode < 58) {
			var visNumber = keycode - 49;
			vis.selectedVisual(vis.visuals[visNumber].name);
		}
    }
}