const StateTitle={    
    
    preload:function(){
        game.load.image("background","images/main/background.png");
        game.load.spritesheet("buttons","images/ui/buttons.png",265,75);
        game.load.image("traveler","images/main/opp_promo_traveler.png");
        game.load.audio("backgroundMusic", "sounds/intro.mp3");




        
     },
     
     create:function(){
        this.backgroundMusic = game.add.audio("backgroundMusic");
        this.backgroundMusic.volume = .5;
        this.backgroundMusic.loop = true;
        this.backgroundMusic.play();

        //the background
        this.background = game.add.tileSprite(0,0,480,640,"background");
        this.background.autoScroll(0,50);
         

         // parameter is x, then y, the key, the function, the scope,the over normal and pressed states
         this.traveler = game.add.sprite(game.world.centerX-150,game.world.centerY-250,"traveler");

         this.titleText = game.add.text(game.world.centerX, 400, "Sky High", {
            font: "50px Press Start 2P"  
            , fill: "#ffffff"
            , stroke: "#222222"
            , strokeThickness: 4
            , align: "center"
        });
        this.titleText.anchor.set(0.5, 0.5);

         //center the button
         this.buttonStart = game.add.button(game.world.centerX,game.world.centerY+220,"buttons",this.play,this,6,7,6);
         this.buttonStart.anchor.set(0.5,0.5);

         this.copyText = game.add.text(game.world.centerX, 600, "Copyright 2018 Notintendo", {
            font: "10px Press Start 2P"  
            , fill: "#ffffff"
            , stroke: "#222222"
            , strokeThickness: 4
            , align: "center"
        });
        this.copyText.anchor.set(0.5, 0.5);


     },
     play:function() {
        this.backgroundMusic.stop();
        game.state.start("StateInstructions");
     },
     update:function()
     {       
         
     }    
     
 }