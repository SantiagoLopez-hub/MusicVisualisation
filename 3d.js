function WebglGraphics (){

    this.name = "3d Webgl visual ";

    this.draw = function(){
        var elem = document.getElementById('popup-modal'); 
        elem.style.display = 'block';

        elem.mouseClicked(update);
    }

    function update(){
        var elem = document.getElementById('popup-modal'); 
        elem.style.display = 'none';
    }

}