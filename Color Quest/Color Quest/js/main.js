// Eric Hu
// Eric Andreae
// Dylan Deardorff
// Group 9
// Color Quest
// https://github.com/eandreae/120-Group-9

"use strict";

// Define globals
var game;

// Player globals
var buckyValue = 0;              // Determines which Bucky sprite we're using
var direction = 1;               // Player direction. 1 (facing right), -1 (facing left)
var hasRed = false;              // If the player has collected Red
var hasYellow = false;           // If the player has collected Yellow
var hasBlue = false;             // If the player has collected Blue
var health = 5;                  // Player health
var injured = false;             // If the player is injured
var playerBulletSpeed = 1000;    // Bullet speed of player bullet
var playerDead = false;          // If the player has died

// King Color globals
var bossDefeated = false;        // If King Color has been defeated
var bossHealth = 10;             // King Color's health
var hitByKingColor = false;      // If you were hit by King Color in the cutscene
var metKingColor = false;        // If we've seen the beginning cutscene

// Color level globals
var redLevel = 0;                // Keeps track of the progress in the Red level.
var yellowLevel = 0;             // Keeps track of the progress in the Yellow level.
var blueLevel = 0;               // Keeps track of the progress in the Blue level.

// Misc globals
var song;                        // The song that's playing
var talking = false;             // If the player is talking with an NPC

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
