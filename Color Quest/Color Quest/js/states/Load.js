// Music Credits
// "sad1" = https://www.youtube.com/watch?v=f6bHMLFwJmw


// Load state
var Load = function(game) {};
Load.prototype = {

	// Loads all the assets needed
	preload: function() {

      game.load.atlas('atlas', 'assets/img/atlas.png', 'assets/img/atlas.json');
		game.load.image('bucky', 'assets/img/Bucky.png');
        game.load.image('bucky2', 'assets/img/Bucky2.png');
		game.load.image('ground', 'assets/img/platform.png');
		game.load.image('bullet', 'assets/img/bullet.png');
      game.load.image('boss', 'assets/img/kingcolor.png');
		game.load.image('bPortal', 'assets/img/KingColorButton.png');
		game.load.image('title', 'assets/img/TitleScreen.png');
        game.load.atlas('window', 'assets/img/windowSheet.png', 'assets/img/window.json');

		game.load.audio('jump', 'assets/audio/Jump.mp3');
		game.load.audio('sad1', 'assets/audio/sad1.mp3');
	},
	create: function() {
		console.log('Load: create');
		sad1 = game.add.audio('sad1');

		game.state.start('MainMenu');
	},

	update: function() {
      //console.log('Load: update');
   }
};
