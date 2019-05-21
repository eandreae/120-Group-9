// Eric Hu
// Eric Andreae
// Dylan Deardorff
// Group 9
// Color Quest
// https://github.com/eandreae/120-Group-9

"use strict";

// define globals
var game;
var hasRed = false;
var hasYellow = false;
var hasBlue = false;
var metKingColor = false;
var direction = 1; // 1 (facing right), -1 (facing left)
var backgroundColor = "#D3D3D3" // light gray.
var health = 5;
var song;

// wait for browser to load before creating Phaser game
window.onload = function() {
   // define game
   game = new Phaser.Game(1000, 700, Phaser.AUTO, 'phaser');

   // define states
   game.state.add('Load', Load);          // Used to load the assets and stuff
   game.state.add('MainMenu', MainMenu);  // Main menu
   game.state.add('Tutorial', Tutorial);  // Tutorial state
   game.state.add('Red', Red);            // Red state
   game.state.add('Yellow', Yellow);      // Yellow state
   game.state.add('Blue', Blue);          // Blue state
   game.state.add('BossMap', BossMap);    // Final boss area
   game.state.add('GameOver', GameOver);  // Game over state
   game.state.add('ColorWall', ColorWall);// Color wall state
   game.state.start('Load');
}
