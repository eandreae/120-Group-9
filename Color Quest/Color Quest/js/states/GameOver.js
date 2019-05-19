// GameOver state
var GameOver = function(game) {};
GameOver.prototype = {

   init: function(s) {
      this.state = s;
   },

   preload: function() {
      console.log('GameOver: preload');
   },

   create: function() {
      console.log('GameOver: create');
      // Background
      game.stage.backgroundColor = "#0c4196";
      game.add.text(450, 450, "You Died!")

      health = 5;

   },

   update: function() {
      //console.log('GameOver: update');
      // GameOver logic
      if(game.input.keyboard.isDown(Phaser.Keyboard.Z)){
          game.state.start(this.state);
      }
   }
};
