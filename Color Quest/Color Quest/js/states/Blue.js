// Blue color state
var Blue = function(game) {};
Blue.prototype = {

   // Variables used in Blue
   init: function() {

   },

   preload: function() {
      console.log('Blue: preload');
   },

   create: function() {
      console.log('Blue: create');

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

   }
};
