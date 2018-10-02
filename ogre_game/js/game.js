// create a new scene named "Game"
let gameScene = new Phaser.Scene('Game');
let gameOver = document.querySelector("#game-over");

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
  this.load.image('background', 'assets/background.png');
  this.load.image('player', 'assets/player.png');
  this.load.image('skeleton', 'assets/skeleton.png');
  this.load.image('treasure', 'assets/treasure.png');

};

// executed once, after assets were loaded
gameScene.create = function() {

  // this.physics.startSystem(Phaser.Physics.ARCADE);
  // this.physics.arcade.enable(this.player);

  // this.player.body.collideWorldBounds = true;
  // background
  let bg = this.add.sprite(0, 0, 'background');

  // change origin to the top-left of the sprite
  bg.setOrigin(0, 0);

  // player
  this.player = this.add.sprite(40, this.sys.game.config.height / 2, 'player');

  // this.player.body.collideWorldBounds = true;

  // scale down
  this.player.setScale(0.5);

  // goal
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

  this.playerMaxX = -400;
  this.playerMinX = 60;
};

// executed on every frame (60 times per second)
gameScene.update = function() {

  // only if the player is alive
  if (!this.isPlayerAlive) {
    return;
  }

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

  // check for active input
  // if (this.input.activePointer.isDown) {

  //   // player walks
  //   this.player.x += this.playerSpeed;
  // }

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

  gameOver.innerHTML = "You Win!";

  // flag to set player is dead
  this.isPlayerAlive = false;

  // fade camera
  this.time.delayedCall(500, function() {
    this.cameras.main.fade(500);
  }, [], this);

  // restart game
  this.time.delayedCall(1500, function() {
    this.scene.restart();
    window.location.reload();
  }, [], this);
};

gameScene.gameLose = function() {

  gameOver.innerHTML = "Loser!";

  // flag to set player is dead
  this.isPlayerAlive = false;

  // shake the camera
  this.cameras.main.shake(1000);

  // fade camera
  this.time.delayedCall(500, function() {
    this.cameras.main.fade(500);
  }, [], this);

  // restart game
  this.time.delayedCall(1500, function() {
    this.scene.restart();
    window.location.reload();
  }, [], this);
};

// our game's configuration
let config = {
  type: Phaser.AUTO,
  width: 960,
  height: 544,
  scene: gameScene
};

// create the game, and pass it the configuration
let game = new Phaser.Game(config);
