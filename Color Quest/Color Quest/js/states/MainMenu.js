// Main Menu state
var MainMenu = function(game) {};
MainMenu.prototype = {
   preload: function() {

   },

   create: function() {
      console.log('MainMenu: create');

      // Background
      game.stage.backgroundColor = "#0c4196";

      game.add.text(325, 250, "Press [SPACE] to go to tutorial");
      game.add.text(375, 350, "Arrow keys to move");
      game.add.text(300, 450, "Z to jump, X to shoot, C to dash");
   },

   update: function() {
      //console.log('MainMenu: update');
      if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
         game.state.start('Tutorial');
      }
   }
};
