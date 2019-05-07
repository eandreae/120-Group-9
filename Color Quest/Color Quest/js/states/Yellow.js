// Yellow color state
var Yellow = function(game) {};
Yellow.prototype = {

   // Variables used in Yellow
   init: function() {

   },

   preload: function() {
      console.log('Yellow: preload');
   },

   create: function() {
      console.log('Yellow: create');

   },

   update: function() {

       if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
           game.state.start('GameOver');
       }
       if(game.input.keyboard.isDown(Phaser.Keyboard.B)){
           game.state.start('Blue');
       }
       if(game.input.keyboard.isDown(Phaser.Keyboard.R)){
           game.state.start('Red');
       }
   }
};
