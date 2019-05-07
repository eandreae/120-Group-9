var game = new Phaser.Game(800, 900, Phaser.AUTO, 'phaser');

// Main Menu state
var MainMenu = function(game) {};
MainMenu.prototype = {
   preload: function() {

   },

   create: function() {
      console.log('MainMenu: create');

   },

   update: function() {

      }
   }
}

// Play state
var Play = function(game) {};
Play.prototype = {

   // Variables used in Play
   init: function() {

   },

   preload: function() {
      console.log('Play: preload');
   },

   create: function() {
      console.log('Play: create');

   },

   update: function() {

   }
}

// Red color state
var Red = function(game) {};
Red.prototype = {

   // Variables used in Red
   init: function() {

   },

   preload: function() {
      console.log('Play: preload');
   },

   create: function() {
      console.log('Play: create');

   },

   update: function() {

   }
}

// Yellow color state
var Yellow = function(game) {};
Yellow.prototype = {

   // Variables used in Yellow
   init: function() {

   },

   preload: function() {
      console.log('Play: preload');
   },

   create: function() {
      console.log('Play: create');

   },

   update: function() {

   }
}

// Blue color state
var Blue = function(game) {};
Blue.prototype = {

   // Variables used in Blue
   init: function() {

   },

   preload: function() {
      console.log('Play: preload');
   },

   create: function() {
      console.log('Play: create');

   },

   update: function() {

   }
}

// GameOver state
var GameOver = function(game) {};
GameOver.prototype = {

   // Gets the score from the previous state
   init: function(s) {
   },

   preload: function() {
      console.log('GameOver: preload');
   },

   create: function() {
      console.log('GameOver: create');


   },

   update: function() {
      // GameOver logic

   }
}



game.state.add('MainMenu', MainMenu);
game.state.add('Play', Play);
game.state.add('GameOver', GameOver);
game.state.start('MainMenu');
