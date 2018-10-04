// create a new scene named "Game"
let gameScene = new Phaser.Scene('Game');
let welcomeTitle;
let player;

// game's configuration
let config = {
  type: Phaser.AUTO,
  width: 960,
  height: 544,
  scene: gameScene
};

// create a new game
let game = new Phaser.Game(config);

//set up scene parameters
gameScene.init = function() {
  this.playerSpeed = 1.5;
  this.playerMaxY = 460;
  this.playerMinY = 80;
  this.enemySpeed = 2;
  // set top and bottom boundaries for enemies. The higher the number, the lower the enemy drops on screen
  this.enemyMaxY = 460;
  this.enemyMinY = 80;
  cursors = this.input.keyboard.createCursorKeys();
}

// load asset files for our game
gameScene.preload = function() {
  // load images
  this.load.image('background', 'assets/images/background.png');
  this.load.image('player', 'assets/images/player.png');
  this.load.image('skeleton', 'assets/images/skeleton.png');
  this.load.image('treasure', 'assets/images/treasure.png');
  this.load.audio('backgroundMusic', 'assets/sounds/horror.mp3');
  this.load.audio('fail', 'assets/sounds/game_fail.mp3');
  this.load.audio('powerUp', 'assets/sounds/game_power_up.mp3');
  this.load.audio('powerUp2', 'assets/sounds/game_power_up_2.mp3');
};

// executed once, after assets were loaded
gameScene.create = function() {
  // background
  let worldLayer = this.add.sprite(0, 0, 'background');
  // change origin to the top-left of the sprite
  worldLayer.setOrigin(0, 0);

  //sounds
  let fail = this.sound.add('fail');
  let powerUp = this.sound.add('powerUp');
  let powerUp2 = this.sound.add('powerUp2');
  let backgroundMusic = this.sound.add('backgroundMusic');
  backgroundMusic.play();
  backgroundMusic.volume = 0.4;
  fail.volume = 0.5;
  powerUp.volume = 0.5;
  backgroundMusic.loop = true;

  // player
  this.player = this.add.sprite(40, this.sys.game.config.height / 2, 'player');

  // scale player size down
  this.player.setScale(0.5);

  // treasure chest GOAL!!!
  this.treasure = this.add.sprite(this.sys.game.config.width - 80, this.sys.game.config.height / 2, 'treasure');
  this.treasure.setScale(0.6);

  // group of enemies
  this.enemies = this.add.group({
    key: 'skeleton',
    repeat: 8,
    setXY: {
      //set X and Y axis 
      x: 80,
      y: 100,
      stepX: 100,
      stepY: 10
    }
  });

  // scale skeleton size
  Phaser.Actions.ScaleXY(this.enemies.getChildren(), -0.5, -0.5);

  // set random speed of skeletons
  Phaser.Actions.Call(this.enemies.getChildren(), function(enemy) {
    enemy.speed = Math.random() * 6 + 1;
  }, this);

  // player is alive
  this.isPlayerAlive = true;

  // reset the camera
  this.cameras.main.resetFX();
  
  this.time.delayedCall(250, function() {
    welcomeTitle = this.add.text(145, 250, 'Get to the chest in 30 seconds or less!', { fontSize: '24px', fontFamily: 'Shojumaru', fill: '#FFFFFF' });
    // array of arguments passed to callback
  }, [], this);

  // add a timer and set it
  let gameTimer = this.add.text(460, 20,'', { fontSize: '24px', fontFamily: 'Shojumaru', fill: '#FFFFFF' });

  let seconds = 30;

  setInterval(function() {
      // if seconds are less than two digits, add an extra zero to the right of seconds
      if (seconds < 10) {
          gameTimer.setText(`00:0${seconds}`);
      } else {
          gameTimer.setText(`00:${seconds}`);
      }
      seconds--;

      // game over if seconds reach 0
      if (seconds === 0) {
        gameScene.gameLose();
    }
    // seconds decrement by 1
  }, 1000); 

  setInterval(function() {
    if (seconds > 27) {
      welcomeTitle.setText('');
    }
  }, 2500);
};

// executed on every frame
gameScene.update = function() {

  // only if the player is alive
  if (!this.isPlayerAlive) {
    return;
  } 
  // player controls
  if (cursors.right.isDown) {
    this.player.x += this.playerSpeed;
  } else if (cursors.left.isDown) {
    this.player.x -= this.playerSpeed;
  } else if (cursors.down.isDown) {
    this.player.y += this.playerSpeed;
  } else if (cursors.up.isDown) {
    this.player.y -= this.playerSpeed;
  } 

  if (this.playerMaxY > 460) {
    this.playerSpeed = 0;
  } else if (this.playerMinY < 80) {
    this.playerSpeed = 0;
  }

  // treasure collision
  if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.treasure.getBounds())) {
    this.gameWin();
  }
  // skeleton movement and collision
  let enemies = this.enemies.getChildren();
  let numEnemies = enemies.length;

  for (let i = 0; i < numEnemies; i++) {

    // move skeletons
    enemies[i].y += enemies[i].speed;

    // reverse movement when skeletons reach the edges
    if (enemies[i].y >= this.enemyMaxY && enemies[i].speed > 0) {
      enemies[i].speed *= -1;
    } else if (enemies[i].y <= this.enemyMinY && enemies[i].speed < 0) {
      enemies[i].speed *= -1;
    }


    // skeleton collision with player
    if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), enemies[i].getBounds())) {
      this.gameLose();
      break;
    }
  }
};

gameScene.gameWin = function() {
  // set text with x and y coordinates
  this.add.text(380, 250, 'You win!', { fontSize: '32px', fontFamily: 'Shojumaru', fill: '#E52346'});

  // flag to set player is dead
  this.isPlayerAlive = false;

  // victory music
  this.sound.play('powerUp');

  // make the camera flash when you win
  this.cameras.main.flash(2000);

  // fade camera
  this.time.delayedCall(500, function() {
    this.cameras.main.fade(3000);
  }, [], this);

  // restart game
  this.time.delayedCall(4000, function() {
    this.scene.restart();
    window.location.reload();
  }, [], this);
};

gameScene.gameLose = function() {
  // set text with x and y coordinates
  this.add.text(380, 250, 'Official loser!', { fontSize: '32px', fontFamily: 'Shojumaru', fill: '#E52346'});

  seconds = 0;

  // flag to set player is dead
  this.isPlayerAlive = false;

  this.sound.play('fail');

  // shake the camera
  this.cameras.main.shake(2000);

  // fade camera
  this.time.delayedCall(500, function() {
    this.cameras.main.fade(3000);
  }, [], this);

  // restart game
  this.time.delayedCall(4000, function() {
    this.scene.restart();
    window.location.reload();
  }, [], this);
};


