// Eric Hu
// Eric Andreae
// Dylan Deardorff
// Group 9
// Color Quest

"use strict";

// define globals
var game;

// wait for browser to load before creating Phaser game
window.onload = function() {
   // uncomment the following line if you need to purge local storage data
   // localStorage.clear();

   // define game
   game = new Phaser.Game(900, 600, Phaser.AUTO, 'phaser');

   // define states
   //game.state.add('Boot', Boot);
   game.state.add('Load', Load); // Used to load the assets and stuff
   game.state.add('MainMenu', MainMenu);
   game.state.add('Tutorial', Tutorial);
   game.state.add('Red', Red);
   game.state.add('Yellow', Yellow);
   game.state.add('Blue', Blue);
   game.state.add('GameOver', GameOver);
   game.state.start('Load');
}
