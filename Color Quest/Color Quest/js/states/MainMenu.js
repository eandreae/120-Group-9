"use strict";

// Main Menu state
var MainMenu = function(game) {};
MainMenu.prototype = {

   create: function() {
      // Title image
      game.add.sprite(0, 0, 'title');

      // Song that plays in the title screen
      song = game.add.audio('title music');
      song.play('', 0, 0.5, true);

      // Resetting global variables if the player resets the game
      // Reset player globals
      buckyValue = 0;              // Determines which Bucky sprite we're using
      direction = 1;               // Player direction. 1 (facing right), -1 (facing left)
      hasRed = true;               // If the player has collected Red
      hasYellow = true;            // If the player has collected Yellow
      hasBlue = true;              // If the player has collected Blue
      health = 5;                  // Player health
      injured = false;             // If the player is injured
      playerBulletSpeed = 1000;    // Bullet speed of player bullet
      playerDead = false;          // If the player has died

      // Reset King Color globals
      bossDefeated = false;        // If King Color has been defeated
      bossHealth = 10;             // King Color's health
      hitByKingColor = false;      // If you were hit by King Color in the cutscene
      metKingColor = true;         // If we've seen the beginning cutscene

      // Reset Color level globals
      redLevel = 0;                // Keeps track of the progress in the Red level.
      yellowLevel = 0;             // Keeps track of the progress in the Yellow level.
      blueLevel = 0;               // Keeps track of the progress in the Blue level.

      // Reset Misc globals
      talking = false;             // If the player is talking with an NPC
   },

   update: function() {
      if (game.input.keyboard.isDown(Phaser.Keyboard.Z)) {
         game.state.start('Tutorial');
      }
   }
};
