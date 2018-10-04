const StateInstructions = {

    preload: function () {
        game.load.image("background","images/main/background.png");
        game.load.spritesheet("buttons","images/ui/buttons.png",265,75);
        game.load.spritesheet("traveler", "images/main/traveler.png",64,64,33);


    }, create: function () {

        this.background = game.add.tileSprite(0,0,480,640,"background");
        this.background.autoScroll(0,50);
        this.inText=game.add.text(game.world.centerX,230,"Collect the coins and don't fall off!");
        this.inText.fill ="#000000";
        this.inText.anchor.set(0.5,0.5);
        this.inTextTwo=game.add.text(game.world.centerX,255," See how long you can last.");
         this.inTextTwo.fill ="#000000";
         this.inTextTwo.anchor.set(0.5,0.5);

         this.traveler = game.add.sprite(game.world.centerX,game.world.centerY,"traveler");
         this.traveler.anchor.set(0.5,0.5);
         this.traveler.animations.add("jump", [14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,28,30,31,32,33,34], 12,true);
         this.traveler.animations.play("jump");
        // parameter is x, then y, the key, the function, the scope,the over normal and pressed states
        this.buttonStart = game.add.button(game.world.centerX,game.world.centerY+100,"buttons",this.startGame,this,6,7,6);
        //center the button
        this.buttonStart.anchor.set(0.5,0.5);  

        
    }, 
    startGame: function(){
        game.state.start("StateMain");

    },
    update: function () {

    }

}