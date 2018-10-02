var StateMain={    
    
    preload:function(){
        game.load.image("background","images/main/background.png");
        game.load.image("platform", "images/main/platform.png")
        game.load.spritesheet("soundButtons", "images/ui/soundButtons.png", 44, 44, 4);
        game.load.spritesheet("traveler", "images/main/traveler.png",64,64,33);
        game.load.audio("backgroundMusic", "sounds/background.mp3");
        game.load.audio("jump", "sounds/jump.wav");

       
     },
     
     create:function(){

        this.musicPlaying = false;
         //start the physics engine
         game.physics.startSystem(Phaser.Physics.ARCADE);
        this.traveler = game.add.sprite(100,590,"traveler");
        this.traveler.animations.add("idle",[6,9,10,11,12,13],12,true);
        this.traveler.animations.add("run",[0,1,2,3,4,5],12,true);
        this.traveler.animations.add("jump",[14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32],12,false);

        //sounds
        this.jump = game.add.audio("jump");
        this.backgroundMusic = game.add.audio("backgroundMusic");
        this.backgroundMusic.volume = .5;
        this.backgroundMusic.loop = true;

        //sound buttons
        this.btnMusic = game.add.sprite(20, 20, "soundButtons");
        this.btnSound = game.add.sprite(70, 20, "soundButtons");
        this.btnMusic.frame = 2;


        cursors = game.input.keyboard.createCursorKeys();
    
    

         //the background
         this.background = game.add.tileSprite(0,0,480,640,"background");
         this.background.autoScroll(0,10);
        //bring the traveler above background
         this.traveler.bringToTop();
         //platforms 
         this.platforms = game.add.group();
         this.platforms.createMultiple(40, "platform");
         this.platforms.setAll('checkWorldBounds', true);
         this.platforms.setAll('outOfBoundsKill', true);




         //the ground
         this.ground = game.add.sprite(0, 600, "platform")
         this.ground.scale.x = 10;
         this.ground.scale.y= 10;
         this.ground.enableBody = true;





        

    
      
       

         game.physics.enable([this.traveler,this.platforms,this.ground], Phaser.Physics.ARCADE);
         this.traveler.body.gravity.y = 500
         this.traveler.anchor.set(0.5,1);
         this.traveler.body.bounce.set(0.25);
         this.traveler.body.collideWorldBounds=true;

         

         this.ground.body.immovable = true;
         this.platforms.setAll('body.immovable', true);
         this.platforms.setAll("anchor.x", 0.5);
         this.platforms.setAll("anchor.y", 0.5);
         this.platforms.scale.setTo(1.8);






         this.setListeners();
         this.updateButtons();
         this.updateMusic();
         

     },
     setListeners:function() {
        game.time.events.loop(Phaser.Timer.SECOND*3.5, this.launchPlatforms, this);
        this.ground.body.velocity.y = 2;
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
    },
     launchPlatforms: function(){
         let platform = this.platforms.getFirstDead();

        // let yy = game.rnd.integerInRange(0,game.height-60);
        let xx = game.rnd.integerInRange(0,225);
         platform.reset(xx,0);
         platform.body.velocity.y = 30;
         console.log(xx,"platform fired")

     },
     updateMusic: function () {
        if (musicOn == true) {
            if (this.musicPlaying == false) {

                this.musicPlaying = true;
                this.backgroundMusic.play();
            }
        } else {
            this.musicPlaying = false;
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
    }
, 
     update:function(){ 
        game.physics.arcade.collide(this.traveler, this.ground);
        game.physics.arcade.collide(this.traveler, this.platforms);

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

        }else if(cursors.up.isDown && this.traveler.body.touching.down){
                this.traveler.body.velocity.y = -560;
                this.traveler.animations.play("jump");
                console.log("jump")
            //stop
         } else{
                this.traveler.body.velocity.x = 0;
            }
     }     
 }