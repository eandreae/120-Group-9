// Load state
var Load = function(game) {};
Load.prototype = {
	preload: function() {
		game.load.path = 'assets/img/';
        game.load.atlas('atlas', 'atlas.png', 'atlas.json');
		game.load.image('ground', 'platform.png');
		game.load.image('bullet', 'bullet.png');

		game.load.path = 'assets/audio/';
		game.load.audio('jump', 'Jump.mp3');
	},
	create: function() {
		console.log('Load: create');
		// check for local storage browser support

	},

	update: function() {
      //console.log('Load: update');
      // GameOver logic
      if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
          game.state.start('MainMenu');
      }
   }
};
