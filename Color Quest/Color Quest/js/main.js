// Eric Hu
// Eric Andreae
// Dylan Deardorff
// Group 9
// Color Quest
// https://github.com/eandreae/120-Group-9

"use strict";

// define globals
var game;
var hasRed = true; // If the player has collected Red
var hasYellow = true; // If the player has collected Yellow
var hasBlue = true; // If the player has collected Blue
var metKingColor = true; // If we've seen the beginning cutscene
var direction = 1; // Player direction. 1 (facing right), -1 (facing left)
var backgroundColor = "#72C4FF" // light blue.
var health = 5; // Player health
var playerBulletSpeed = 1000;
var injured = false; // If the player is injured
var playerDead = false;
var buckyValue = 0; // Determines which Bucky sprite we're using
var redLevel = 0; // keeps track of the progress in the Red level.
var yellowLevel = 0; // keeps track of the progress in the Yellow level.
var blueLevel = 0; // keeps track of the progress in the Blue level.
var song; // The song that's playing
var bossHealth = 10; // King Color's health
var bossDefeated = true; // Check to see if King Color is dead
var hitByKingColor = false;
var talking = false; // If the player is talking with an NPC

// Wait for browser to load before creating Phaser game
window.onload = function() {
   // Define game
   game = new Phaser.Game(1000, 700, Phaser.AUTO, 'phaser');

   // Define states
   game.state.add('Load', Load); // Used to load the assets and stuff
   game.state.add('MainMenu', MainMenu); // Main menu
   game.state.add('Tutorial', Tutorial); // Tutorial state
   game.state.add('Red', Red); // Red state
   game.state.add('Yellow', Yellow); // Yellow state
   game.state.add('Blue', Blue); // Blue state
   game.state.add('BossMap', BossMap); // Final boss area
   game.state.add('GameOver', GameOver); // Game over state
   game.state.start('Load');
}
