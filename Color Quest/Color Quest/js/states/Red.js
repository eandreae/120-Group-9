// Red color state
var Red = function(game) {};
Red.prototype = {

   // Variables used in Red
   init: function() {

   },

   preload: function() {
      console.log('Red: preload');
   },

   create: function() {
      console.log('Red: create');

   },

   update: function() {
      console.log('Red: update');
       if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
           game.state.start('GameOver');
       }
       if(game.input.keyboard.isDown(Phaser.Keyboard.B)){
           game.state.start('Blue');
       }
       if(game.input.keyboard.isDown(Phaser.Keyboard.Y)){
           game.state.start('Yellow');
       }

   }
};
