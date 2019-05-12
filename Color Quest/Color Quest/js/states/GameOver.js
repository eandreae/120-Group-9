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
      // Background
      game.stage.backgroundColor = "#0c4196";

      game.add.text(450, 450, "You Died!")

   },

   update: function() {
      //console.log('GameOver: update');
      // GameOver logic
      if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
          game.state.start('MainMenu');
      }
   }
};
