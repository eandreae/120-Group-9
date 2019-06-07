// GameOver state
var GameOver = function(game) {};
GameOver.prototype = {

   // Gets which state the player died in
   init: function(s) {
      this.state = s;
   },

   create: function() {
      // Background
      game.stage.backgroundColor = "#0c4196";
      game.add.text(450, 450, "You Died!")

      health = 5;
      injured = false;
      playerDead = false;
   },

   update: function() {
      // Restarts in the state the player died in
      if (game.input.keyboard.isDown(Phaser.Keyboard.Z)) {
         game.state.start(this.state);
      }
   }
};
