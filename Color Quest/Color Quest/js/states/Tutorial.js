// Tutorial state
// the first level of the game.
var Tutorial = function(game) {};
Tutorial.prototype = {

   // Variables used in Tutorial
   init: function() {

   },

   preload: function() {
      console.log('Play: preload');
   },

   create: function() {
      console.log('Play: create');

   },

   update: function() {

       if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
           game.state.start('GameOver');
       }
       if(game.input.keyboard.isDown(Phaser.Keyboard.R)){
           game.state.start('Red');
       }
       if(game.input.keyboard.isDown(Phaser.Keyboard.Y)){
           game.state.start('Yellow');
       }
       if(game.input.keyboard.isDown(Phaser.Keyboard.B)){
           game.state.start('Blue');
       }
   }
};
