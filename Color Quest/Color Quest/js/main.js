// Eric Hu
// Eric Andreae
// Dylan Deardorff
// Group 9
// Color Quest

"use strict";

// define globals
var game;
var hasRed = false;
var hasYellow = false;
var hasBlue = false;
var hasGreen = false;
var hasPurple = false;
var hasOrange = false;
var direction = 1; // 1 (facing right), -1 (facing left)
var backgroundColor = "#D3D3D3" // light gray.
var song;

// wait for browser to load before creating Phaser game
window.onload = function() {
   // uncomment the following line if you need to purge local storage data
   // localStorage.clear();

   // define game
   game = new Phaser.Game(1000, 700, Phaser.AUTO, 'phaser');

   // define states
   //game.state.add('Boot', Boot);
   game.state.add('Load', Load); // Used to load the assets and stuff
   game.state.add('MainMenu', MainMenu);
   game.state.add('Tutorial', Tutorial);
   game.state.add('Red', Red);
   game.state.add('Yellow', Yellow);
   game.state.add('Blue', Blue);
   game.state.add('Purple', Purple);
   game.state.add('Orange', Orange);
   game.state.add('Green', Green);
   game.state.add('Boss', Boss);
   game.state.add('GameOver', GameOver);
   game.state.start('Load');
}
