//container function for the visualisations
function Visualisations(){
    //array to store visualisations
	this.visuals = [];
    this.colorPalette = ["#2376a5","#c83f2b","#1d3cbb","#ffeb3b","#5b0ff5"];

    //currently selected vis. set to null until vis loaded in
	this.currentVisual = null;

    //add a new visualisation to the array
	//@param vis: a visualisation object
    this.add = function(vis){
        this.visuals.push(vis);

        //if selectedVisual is null set the new visual
        //current visualiation
		if (this.currentVisual == null) {
			this.selectedVisual(vis.name);
		}

    }

    //select a visualisation using it name property
    // Changing the Theme of visusation according to current theme pallete 
	//@param visName: name property of the visualisation
    this.selectedVisual = function(visName){
        for(var i = 0; i < this.visuals.length; i++){
            if(visName == this.visuals[i].name){
                this.currentVisual = this.visuals[i];
                this.visuals[i].musicVisualelement.addClass('demo--current');
                this.visuals[i].musicBody.style('color', this.visuals[i].musicBodyColor);
            }else{
                if(this.visuals[i].musicVisualelement.hasClass('demo--current')){
                    this.visuals[i].musicVisualelement.removeClass('demo--current');
                }
            }            
        }
    }
}


