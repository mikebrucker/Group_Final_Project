// create a new scene named "Game"
let gameScene = new Phaser.Scene('Game');
let welcomeTitle;

// game's configuration
let config = {
  type: Phaser.AUTO,
  width: 960,
  height: 544,
  scene: gameScene, 
  physics: {
    default: 'arcade'
  }
};

    // create the game, and pass it the configuration
let game = new Phaser.Game(config);

// some parameters for our scene
gameScene.init = function() {
  this.playerSpeed = 1.5;
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
  backgroundMusic.volume = 0.5;
  backgroundMusic.loop = true;

  // player
  this.player = this.add.sprite(40, this.sys.game.config.height / 2, 'player');

  // scale your player down
  this.player.setScale(0.5);

  // treasture chest GOAL!!!
  this.treasure = this.add.sprite(this.sys.game.config.width - 80, this.sys.game.config.height / 2, 'treasure');
  this.treasure.setScale(0.6);

  // group of enemies
  this.enemies = this.add.group({
    key: 'skeleton',
    repeat: 8,
    setXY: {
      x: 80,
      y: 100,
      stepX: 100,
      stepY: 10
    }
  });

  // scale enemies
  Phaser.Actions.ScaleXY(this.enemies.getChildren(), -0.5, -0.5);

  // set speeds
  Phaser.Actions.Call(this.enemies.getChildren(), function(enemy) {
    enemy.speed = Math.random() * 5 + 1;
  }, this);

  // player is alive
  this.isPlayerAlive = true;

  // reset camera
  this.cameras.main.resetFX();
  
  this.time.delayedCall(250, function() {
    welcomeTitle = this.add.text(145, 500, 'Get to the chest in 30 seconds or less!', { fontSize: '24px', fontFamily: 'Shojumaru', fill: '#FFFFFF' });
  }, [], this);

  let gameTimer = this.add.text(460, 20,'', { fontSize: '24px', fontFamily: 'Shojumaru', fill: '#FFFFFF' });

  let seconds = 30;

  setInterval(function() {
      if (seconds < 10) {
          gameTimer.setText(`00:0${seconds}`);
      } else {
          gameTimer.setText(`00:${seconds}`);
      }
      seconds--;
      if (seconds === 0) {
        gameScene.gameLose();
    }
  }, 1000); 
};

// executed on every frame (60 times per second)
gameScene.update = function() {

  // only if the player is alive
  if (!this.isPlayerAlive) {
    return;
  }

  // player controls

  if (cursors.right.isDown) {
    this.player.x += this.playerSpeed;
  }

  else if (cursors.left.isDown) {
    this.player.x -= this.playerSpeed;
  }

  else if (cursors.down.isDown) {
    this.player.y += this.playerSpeed;
    
  }

  else if (cursors.up.isDown) {
    this.player.y -= this.playerSpeed;
  } 

  // treasure collision
  if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.treasure.getBounds())) {
    this.gameWin();
  }

  // enemy movement and collision
  let enemies = this.enemies.getChildren();
  let numEnemies = enemies.length;

  for (let i = 0; i < numEnemies; i++) {

    // move enemies
    enemies[i].y += enemies[i].speed;

    // reverse movement if reached the edges
    if (enemies[i].y >= this.enemyMaxY && enemies[i].speed > 0) {
      enemies[i].speed *= -1;
    } else if (enemies[i].y <= this.enemyMinY && enemies[i].speed < 0) {
      enemies[i].speed *= -1;
    }

    // enemy collision
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


