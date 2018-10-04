var StateMain={    
    
    preload:function(){
        game.load.image("background","images/main/background.png");
        game.load.image("platform", "images/main/platform.png")
        game.load.spritesheet("soundButtons", "images/ui/soundButtons.png", 44, 44, 4);
        game.load.spritesheet("traveler", "images/main/traveler.png",64,64,33);
        game.load.spritesheet("coins", "images/main/coin.png",15.875,16,8);

        game.load.spritesheet("bomb", "images/main/bomb.png",14,17,1);
        game.load.audio("backgroundMusic", "sounds/background.mp3");
        game.load.audio("jump", "sounds/jump.mp3");
        game.load.audio("pick", "sounds/pickup.mp3");


       
     },
     
     create:function(){

        score = 0;

        this.musicPlaying = false;

         //start the physics engine
         game.physics.startSystem(Phaser.Physics.ARCADE);
        this.traveler = game.add.sprite(100,590,"traveler");

        this.traveler.animations.add("idle",[6,9,10,11,12,13],12,true);
        this.traveler.animations.add("run",[0,1,2,3,4,5],12,true);
        this.traveler.animations.add("jump",[14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32],12,false);

        //sounds
        this.jump = game.add.audio("jump");
        this.pick = game.add.audio("pick");
        this.backgroundMusic = game.add.audio("backgroundMusic");
        this.backgroundMusic.volume = .5;
        this.backgroundMusic.loop = true;


        cursors = game.input.keyboard.createCursorKeys();
    
    

         //the background
         this.background = game.add.tileSprite(0,0,480,640,"background");
         this.background.autoScroll(0,10);
 
         //platforms 
         this.platforms = game.add.group();
         this.platforms.createMultiple(40, "platform");
         this.platforms.setAll('checkWorldBounds', true);
         this.platforms.setAll('outOfBoundsKill', true);

         //the coins
         this.coins = game.add.group();
         this.coins.createMultiple(40, "coins");
         this.coins.setAll('checkWorldBounds', true);
         this.coins.setAll('outOfBoundsKill', true);
         
          //text
          this.scoreText = game.add.text(game.world.centerX,60,"0");
          this.scoreText.fill = "#000000";
          this.scoreText.fontSize=64;
          this.scoreText.anchor.set(0.5,0.5);

          this.scoreLabel = game.add.text(game.world.centerX,20,"Score");
          this.scoreLabel.fill = "#000000";
          this.scoreLabel.fontSize=32;
          this.scoreLabel.anchor.set(0.5,0.5);


         //sound buttons
        this.btnMusic = game.add.sprite(20, 20, "soundButtons");
        this.btnSound = game.add.sprite(70, 20, "soundButtons");
        this.btnMusic.frame = 2;


         //the ground
         this.ground = game.add.sprite(0, 600, "platform")
         this.ground.scale.x = 10;
         this.ground.scale.y= 10;
         this.ground.enableBody = true;

         game.physics.enable([this.traveler,this.platforms,this.ground,this.coins], Phaser.Physics.ARCADE);
         this.traveler.body.gravity.y = 500
         this.traveler.anchor.set(0.5,1);
         this.traveler.body.bounce.set(0.25);
         this.traveler.body.collideWorldBounds=true;

         

         this.ground.body.immovable = true;

         this.platforms.setAll('body.immovable', true);
         this.platforms.setAll("body.checkCollision.down", false);

         this.platforms.setAll("anchor.x", 0.5);
         this.platforms.setAll("anchor.y", 0.5);
         this.platforms.scale.setTo(1.8);
                //bring the traveler above background
                this.traveler.bringToTop();

         this.setListeners();
         this.updateButtons();
         this.updateMusic();
         

     },
     setListeners:function() {
        game.time.events.loop(Phaser.Timer.SECOND*3.5, this.launchPlatforms, this);
        game.time.events.loop(Phaser.Timer.SECOND*4.5, this.launchCoins, this);

        this.ground.body.velocity.y = 2;
        //enables the sprite to take inputs and then add the listener
        this.btnSound.inputEnabled = true;
        this.btnSound.events.onInputDown.add(this.toggleSound, this);
        this.btnMusic.inputEnabled = true;
        this.btnMusic.events.onInputDown.add(this.toggleMusic, this);


     },
     toggleSound: function () {
        soundOn = !soundOn;
        this.updateButtons();
     },
     toggleMusic: function () {
        musicOn = !musicOn;
        this.updateButtons();
        this.updateMusic();
    },
     launchPlatforms: function(){
         let platform = this.platforms.getFirstDead();
        let xx = game.rnd.integerInRange(0,225);
         platform.reset(xx,0);
         platform.body.velocity.y = 30;
         console.log(xx,"platform fired")

     },

     launchCoins: function(){
        let coin = this.coins.getFirstDead();
       let xx = game.rnd.integerInRange(0,225);
        coin.reset(xx,0);
        coin.body.velocity.y = 100;
        console.log(xx,"coin fired")

    },
     updateMusic: function () {
        if (musicOn == true) {
            if (this.musicPlaying == false) {
                this.musicPlaying = true;
                console.log("music playing")
                this.backgroundMusic.play();
            }
        } else {
            this.musicPlaying = false;
            console.log("music not playing")

            this.backgroundMusic.stop();
        }
    },
     updateButtons: function () {
        if (soundOn == true) {
            this.btnSound.frame = 0;
        } else {
            this.btnSound.frame = 1;
        }
        if (musicOn == true) {
            this.btnMusic.frame = 2;
        } else {
            this.btnMusic.frame = 3;
        }
    },
    onCollect:function(traveler,coin){
        coin.kill();
        this.pick.play();
        score++;
        this.scoreText.text = score;
        console.log("coin collected");
    },

     update:function(){ 
        game.physics.arcade.collide(this.traveler, this.ground);
        game.physics.arcade.collide(this.traveler, this.platforms);
        game.physics.arcade.collide(this.traveler,this.coins,null,this.onCollect,this);
        if (this.traveler.body.y == 576) {
            this.backgroundMusic.stop();
            game.state.start("StateOver");
        }
            if (Math.abs(this.traveler.body.velocity.x) > 100){
                this.traveler.animations.play("run");
            } else {
                this.traveler.animations.play("idle");
            }
        
        if (this.traveler.body.velocity.x > 0) {
            this.traveler.scale.x = 1;
        } else {
            this.traveler.scale.x = -1;
        }
        
        if (cursors.left.isDown) {
            this.traveler.body.velocity.x = -250;
        }
        else if (cursors.right.isDown) {
            this.traveler.body.velocity.x = 250;
          //jump  
        }else if(cursors.up.isDown){
                this.traveler.animations.play("jump");
                if (this.traveler.body.touching.down){
                    this.traveler.body.velocity.y = -560;
                    this.jump.play();
                }
            //stop
         }else{
                this.traveler.body.velocity.x = 0;
        }
     }     
 }