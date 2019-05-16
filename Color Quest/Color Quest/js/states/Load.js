// Load state
var Load = function(game) {};
Load.prototype = {

	// Loads all the assets needed
	preload: function() {
      game.load.atlas('atlas', 'assets/img/atlas.png', 'assets/img/atlas.json');
		game.load.image('bucky', 'assets/img/Bucky.png');
		game.load.image('ground', 'assets/img/platform.png');
		game.load.image('bullet', 'assets/img/bullet.png');
      game.load.image('boss', 'assets/img/kingcolor.png');
		game.load.image('bPortal', 'assets/img/KingColorButton.png')

		game.load.audio('jump', 'assets/audio/Jump.mp3');
		game.load.audio('song', 'assets/audio/Delicate.mp3');
	},
	create: function() {
		console.log('Load: create');
		song = game.add.audio('song');

		 game.state.start('MainMenu');
	},

	update: function() {
      //console.log('Load: update');
   }
};
