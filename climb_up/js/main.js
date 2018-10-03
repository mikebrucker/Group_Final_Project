let game;
let cursor;
let score;
let soundOn = true;
let musicOn = true;
window.onload = function()
{
    game=new Phaser.Game(480,640,Phaser.AUTO,"ph_game");

    game.state.add("StateTitle",StateTitle);
    game.state.add("StateInstructions",StateInstructions);

    game.state.add("StateMain",StateMain);
    game.state.add("StateOver",StateOver);
    game.state.start("StateTitle");
}