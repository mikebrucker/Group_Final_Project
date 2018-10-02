var config = {
    type: Phaser.AUTO,
    parent: 'content',
    width: 640,
    height: 640,
    parent: "gamecontainer",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);
const level = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 0],
    [0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0],
    [4, 3, 3, 3, 3, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 3, 3, 3, 3, 4],
    [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 0, 1, 9, 9, 1, 0, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
let player,
blob,
blobs,
gems,
walls,
cursors,
worldMap,
timer;

function preload() {
    this.load.spritesheet('blob_death', 'assets/blob_death.png', { frameWidth: 80, frameHeight: 80 });
    this.load.spritesheet('blob_child', 'assets/blob_child.png', { frameWidth: 26, frameHeight: 32 });
    this.load.spritesheet('blob', 'assets/blob_up_down.png', { frameWidth: 34, frameHeight: 34 });
    this.load.spritesheet('blob_left', 'assets/blob_walk_left.png', { frameWidth: 34, frameHeight: 34 });
    this.load.spritesheet('blob_right', 'assets/blob_walk_right.png', { frameWidth: 34, frameHeight: 34 });
    this.load.spritesheet('gem', 'assets/gem.png', { frameWidth: 20, frameHeight: 30 });
    this.load.image('tiles', 'assets/tileset.png');
    this.load.tilemapTiledJSON("map", "assets/blobmap.json");
}

function create() {
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("tileset", "tiles");
    const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
    worldMap = worldLayer;
    
    worldLayer.setCollisionBetween(1, 213, true, 'World');
    worldLayer.setCollisionBetween(215, 270, true, 'World');
    worldLayer.setCollisionBetween(272, 407, true, 'World');
    worldLayer.setCollisionBetween(409, 512, true, 'World');
    
    player = this.physics.add.sprite(320, 496, 'blob').setSize(32, 32);
    this.physics.add.collider(player, worldLayer);
    player.setCollideWorldBounds(true);

    cursors = this.input.keyboard.createCursorKeys();
    
    blobs = this.physics.add.group();
    gems = this.physics.add.group();
    
    for (let i = 0; i < level.length; i++) {
        for (let j = 0; j < level.length; j++) {
            if (level[i][j] === 1) {
                blobs.create((j * 32) + 16, (i * 32) + 16, 'blob_child');
            }
            if (level[i][j] === 2) {
                gems.create((j * 32) + 16, (i * 32) + 16, 'gem').setScale(0.8);
            }
        }
    }
    this.children.bringToTop(player);
    this.physics.add.overlap(player, blobs, collectBlobs, null, this);
    this.physics.add.overlap(player, gems, collectGems, null, this);
    
    // const debugGraphics = this.add.graphics().setAlpha(0.75);
    // worldLayer.renderDebug(debugGraphics, {
    //     tileColor: 0xffff00, // Color of non-colliding tiles
    //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
    //     faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    // });

    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('blob_child', { start: 0, end: 7 }),
        frameRate: 8,
        repeat: -1
    });

    this.anims.create({
        key: 'spin',
        frames: this.anims.generateFrameNumbers('gem', { start: 0, end: 7 }),
        frameRate: 8,
        repeat: -1
    });

    this.anims.create({
        key: 'collect',
        frames: this.anims.generateFrameNumbers('blob_death', { start: 0, end: 5 }),
        frameRate: 8,
        repeat: 0
    })
    
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('blob_left', { start: 0, end: 7 }),
        frameRate: 6,
        repeat: -1
    });
    
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('blob_right', { start: 0, end: 7 }),
        frameRate: 8,
        repeat: -1
    });
    
    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('blob', { start: 1, end: 2 }),
        frameRate: 5,
        repeat: -1
    });
    
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'blob', frame: 0 } ],
        frameRate: 20
    });
    
    for (let [i, blob] of blobs.children.entries.entries()) {
        if (i % 2 == 1) {
            blob.anims.play('idle', true);
        } else {
            setTimeout( () => {
                blob.anims.play('idle', true);
            }, 640);
        }
    }

    gems.playAnimation('spin',true);

    
    timer = this.add.text(320, 16, '0:00', {fontSize: '24px', fill: '#00FF2D', fontFamily: 'Arial', stroke: '#000000', strokeThickness: 4}).setOrigin(0.5);
    let timer_sec = 1,
    timer_min = 0;
    setInterval(function() {
        if (timer_sec < 10) {
            timer.setText(`${timer_min}:0${timer_sec}`);
        } else {
            timer.setText(`${timer_min}:${timer_sec}`);
        }
        timer_sec++;
        if (timer_sec === 60) {
            timer_sec = 0;
            timer_min++;
        }
    },1000);
}

function collectBlobs(player, blob) {
    let explodes = this.add.sprite(blob.x, blob.y, 'blob_death');
    this.children.bringToTop(player);
    blob.disableBody(true, true);
    explodes.anims.play('collect', true);
}

function collectGems(player, gem) {
    gem.disableBody(true, true);
    player.setTint(0xFF00FF);
    setTimeout( () => {player.clearTint()}, 6000);
}

// If tile next to sprite can be walked on the sprite will be aligned with it
function turnLeft(sprite) {
    let i = Math.floor(sprite.x/32);
    let j = Math.floor(sprite.y/32);
    if (level[j][i - 1] != 0) {
        player.y = (j * 32) + 16;
    };
}
function turnRight(sprite) {
    let i = Math.floor(sprite.x/32);
    let j = Math.floor(sprite.y/32);
    if (level[j][i + 1] != 0) {
        player.y = (j * 32) + 16;
    };
}
function turnUp(sprite) {
    let i = Math.floor(sprite.x/32);
    let j = Math.floor(sprite.y/32);
    if (level[j - 1][i] != 0) {
        player.x = (i * 32) + 16;
    };
}
function turnDown(sprite) {
    let i = Math.floor(sprite.x/32);
    let j = Math.floor(sprite.y/32);
    if (level[j + 1][i] != 0) {
        player.x = (i * 32) + 16;
    };
}

function update() {
    if (cursors.left.isDown) {
        player.setVelocityX(-120);
        player.setVelocityY(0);
        player.anims.play('left', true);
        turnLeft(player);
    } else if (cursors.right.isDown) {
        player.setVelocityX(120);
        player.setVelocityY(0);
        turnRight(player);
        player.anims.play('right', true);
    } else if (cursors.up.isDown) {
        player.setVelocityY(-120);
        player.setVelocityX(0);
        turnUp(player);
        player.anims.play('up', true);
    } else if (cursors.down.isDown) {
        player.setVelocityY(120);
        player.setVelocityX(0);
        turnDown(player);
        player.anims.play('up', true);
    } else {
        player.setVelocity(0);
        player.anims.play('turn');
    }
}