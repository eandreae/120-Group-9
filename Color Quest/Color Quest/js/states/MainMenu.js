// Main Menu state
var MainMenu = function(game) {};
MainMenu.prototype = {
   preload: function() {

   },

   create: function() {
      console.log('MainMenu: create');

      // Background
      game.stage.backgroundColor = "#0c4196";

      game.add.text(300, 250, "Press [SPACE] to go to tutorial");
      game.add.text(300, 350, "Arrow keys ⬅➡ to move");
      game.add.text(300, 450, "UP ⬆ to jump");
   },

   update: function() {
      //console.log('MainMenu: update');
      if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
         game.state.start('Tutorial');
      }
   }
};
