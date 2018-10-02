let game;
let cursor;
let soundOn = true;
let musicOn = true;
window.onload = function()
{
    game=new Phaser.Game(480,640,Phaser.AUTO,"ph_game");
	
    game.state.add("StateMain",StateMain);
    game.state.start("StateMain");
}