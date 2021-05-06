//Constructor function to handle the onscreen menu, keyboard and mouse
//controls
function ControlsAndInput(){
    this.menuDisplayed = false;
    this.buttonsA = [];
   
    this.draw = function(){

        let menuNav = select("#demos");
        let playBackBtn = select(".toggle-btn");
        let uploadBtn = select(".upload-btn");
        let titleTag = select(".codrops-header__title");
        let volumeBtn = select('.musicVol');

        if (this.menuDisplayed) {
			menuNav.addClass('hidden');
            playBackBtn.style('display', 'none');
            uploadBtn.style('display', 'none');
            titleTag.style('display', 'none');
            volumeBtn.style('display', 'none');
		}else{
            menuNav.removeClass('hidden');
            playBackBtn.style('display', 'block');
            uploadBtn.style('display', 'block');
            titleTag.style('display', 'block');
            volumeBtn.style('display', 'block');
        }

        // Changes Volume of Audio from the Value of Voloume Slider
        audio.setVolume(volSlider.value());

    }

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