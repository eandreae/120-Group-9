// Main Menu state
var MainMenu = function(game) {};
MainMenu.prototype = {

   create: function() {
      // Title image
      game.add.sprite(0, 0, 'title');

      // Song that plays in the title screen
      song = game.add.audio('title music');
      song.play('', 0, 0.5, true);
   },

   update: function() {
      if (game.input.keyboard.isDown(Phaser.Keyboard.Z)) {
         game.state.start('Tutorial');
      }
   }
};
