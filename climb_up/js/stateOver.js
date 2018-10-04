const StateOver={    
    
    preload:function(){
        game.load.image("background","images/main/background.png");
        game.load.image("plane","images/main/opp_aviator.png");
        game.load.spritesheet("buttons","images/ui/buttons.png",265,75);
        game.load.audio("backgroundMusic", "sounds/gameOver.mp3");




     },
     
    create:function(){
        this.backgroundMusic = game.add.audio("backgroundMusic");
        this.backgroundMusic.volume = .5;
        this.backgroundMusic.loop = true;
        this.backgroundMusic.play();

        //background
        this.background = game.add.tileSprite(0,0,480,640,"background");

        //the text
        //text
        this.scoreText = game.add.text(game.world.centerX,340,score);
        this.scoreText.fill = "#000000";
        this.scoreText.fontSize=64;
        this.scoreText.anchor.set(0.5,0.5);

        this.scoreLabel = game.add.text(game.world.centerX,300,"Your Score");
        this.scoreLabel.fill = "#000000";
        this.scoreLabel.fontSize=32;
        this.scoreLabel.anchor.set(0.5,0.5);


         // parameter is x, then y, the key, the function, the scope,the over normal and pressed states
         this.plane = game.add.sprite(game.world.centerX-200,game.world.centerY-200,"plane");
         this.buttonPlayAgain = game.add.button(game.world.centerX,game.world.centerY+100,"buttons",this.replay,this,0,1,0);
         //center the button
         this.buttonPlayAgain.anchor.set(0.5,0.5);


         
     },
     replay:function() {
        this.backgroundMusic.stop();
        game.state.start("StateMain");
     },
     update:function()
     {       
         
     }    
     
 }