var config = {
    type: Phaser.AUTO,
    parent: 'content',
    width: 640,
    height: 640,
    parent: "game-container",
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
    [, , , , , , , , , , , , , , , , , ],
    [, , , , , , , , , , , , , , , , , ],
    [, , , , , , , , , , , , , , , , , ],
    [, , , , , , , , , , , , , , , , , ],
    [, , , , , , , , , , , , , , , , , ],
    [, , , , , , , , , , , , , , , , , ],
    [, , , , , , , , , , , , , , , , , ],
    [, , , , , , , , , , , , , , , , , ],
    [, , , , , , , , , , , , , , , , , ],
    [, , , , , , , , , , , , , , , , , ],
    [, , , , , , , , , , , , , , , , , ],
    [, , , , , , , , , , , , , , , , , ],
    [, , , , , , , , , , , , , , , , , ],
    [, , , , , , , , , , , , , , , , , ],
    [, , , , , , , , , , , , , , , , , ],
    [, , , , , , , , , , , , , , , , , ],
    [, , , , , , , , , , , , , , , , , ],
    [, , , , , , , , , , , , , , , , , ]
];
let player,
walls,
cursors;

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
    player = this.physics.add.sprite(54, 54, 'blob').setSize(32,32);
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
    
}

function update() {
    if (cursors.left.isDown) {
        player.setVelocityX(-100);
        player.setVelocityY(0);
        player.anims.play('left', true);
    } else if (cursors.right.isDown) {
        player.setVelocityX(100);
        player.setVelocityY(0);
        player.anims.play('right', true);
    } else if (cursors.up.isDown) {
        player.setVelocityY(-100);
        player.setVelocityX(0);
        player.anims.play('up', true);
    } else if (cursors.down.isDown) {
        player.setVelocityY(100);
        player.setVelocityX(0);
        player.anims.play('up', true);
    } else {
        player.setVelocity(0);
        player.anims.play('turn');
    }
}