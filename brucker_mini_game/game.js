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
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0]
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
let player,
walls,
cursors,
worldMap;

function preload() {
    this.load.spritesheet('blob', 'assets/blob_up_down.png', { frameWidth: 34, frameHeight: 34 });
    this.load.spritesheet('blob_left', 'assets/blob_walk_left.png', { frameWidth: 34, frameHeight: 34 });
    this.load.spritesheet('blob_right', 'assets/blob_walk_right.png', { frameWidth: 34, frameHeight: 34 });
    this.load.image('tiles', 'assets/tileset.png');
    this.load.tilemapTiledJSON("map", "assets/blobmap.json");
}

function create() {
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("tileset", "tiles");
    const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
    worldLayer.setCollisionBetween(1, 213, true, 'World');
    worldLayer.setCollisionBetween(215, 407, true, 'World');
    worldLayer.setCollisionBetween(409, 512, true, 'World');
    player = this.physics.add.sprite(48, 48, 'blob').setSize(32, 32);
    this.physics.add.collider(player, worldLayer);
    cursors = this.input.keyboard.createCursorKeys();
    
    // const debugGraphics = this.add.graphics().setAlpha(0.75);
    // worldLayer.renderDebug(debugGraphics, {
    //     tileColor: 0xffff00, // Color of non-colliding tiles
    //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
    //     faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    // });
    
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('blob_left', { start: 0, end: 7 }),
        frameRate: 8,
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
    
    worldMap = worldLayer;
}

// If tile next to sprite can be walked on the sprite will be aligned with it
function turnLeft(sprite) {
    let i = Math.floor(sprite.x/32);
    let j = Math.floor(sprite.y/32);
    if (level[j][i - 1] === 1) {
        player.y = (j * 32) + 16;
    };
}
function turnRight(sprite) {
    let i = Math.floor(sprite.x/32);
    let j = Math.floor(sprite.y/32);
    if (level[j][i + 1] === 1) {
        player.y = (j * 32) + 16;
    };
}
function turnUp(sprite) {
    let i = Math.floor(sprite.x/32);
    let j = Math.floor(sprite.y/32);
    if (level[j - 1][i] === 1) {
        player.x = (i * 32) + 16;
    };
}
function turnDown(sprite) {
    let i = Math.floor(sprite.x/32);
    let j = Math.floor(sprite.y/32);
    if (level[j + 1][i] === 1) {
        player.x = (i * 32) + 16;
    };
}

function update() {
    if (cursors.left.isDown) {
        player.setVelocityX(-100);
        player.setVelocityY(0);
        player.anims.play('left', true);
        turnLeft(player);
    } else if (cursors.right.isDown) {
        player.setVelocityX(100);
        player.setVelocityY(0);
        turnRight(player);
        player.anims.play('right', true);
    } else if (cursors.up.isDown) {
        player.setVelocityY(-100);
        player.setVelocityX(0);
        turnUp(player);
        player.anims.play('up', true);
    } else if (cursors.down.isDown) {
        player.setVelocityY(100);
        player.setVelocityX(0);
        turnDown(player);
        player.anims.play('up', true);
    } else {
        player.setVelocity(0);
        player.anims.play('turn');
    }
}