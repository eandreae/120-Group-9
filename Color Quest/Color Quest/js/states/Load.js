// Load state
var Load = function(game) {};
Load.prototype = {
	preload: function() {

	},
	create: function() {
		// check for local storage browser support

	},

	update: function() {
      console.log('Load: update');
      // GameOver logic
      if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
          game.state.start('MainMenu');
      }
   }
};
