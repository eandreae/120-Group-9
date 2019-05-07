// Main Menu state
var MainMenu = function(game) {};
MainMenu.prototype = {
   preload: function() {

   },

   create: function() {
      console.log('MainMenu: create');

   },

   update: function() {
      console.log('MainMenu: update');
      if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
         game.state.start('Tutorial');
      }
   }
};
