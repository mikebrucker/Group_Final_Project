let game,
    cursor,
    score,
    soundOn = true,
    musicOn = true;
window.onload = function()
{
    game=new Phaser.Game(480,640,Phaser.AUTO,"ph_game");

    game.state.add("StateTitle",StateTitle);
    game.state.add("StateInstructions",StateInstructions);
    game.state.add("StateMain",StateMain);
    game.state.add("StateOver",StateOver);
    game.state.start("StateTitle");
}