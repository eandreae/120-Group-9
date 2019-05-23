// Music Credits
// "sad1" = https://www.youtube.com/watch?v=f6bHMLFwJmw


// Load state
var Load = function(game) {};
Load.prototype = {

	// Loads all the assets needed
	preload: function() {

      game.load.atlas('atlas', 'assets/img/atlas.png', 'assets/img/atlas.json');
		game.load.atlas('bucky', 'assets/img/Bucky.png', 'assets/img/Bucky.json');

		//game.load.image('bucky', 'assets/img/Bucky2.png');
		game.load.image('ground', 'assets/img/platform.png');
		//game.load.image('bullet', 'assets/img/bullet.png');
      game.load.image('boss', 'assets/img/kingcolor.png');
		game.load.image('bPortal', 'assets/img/KingColorButton.png');
		game.load.image('title', 'assets/img/TitleScreen.png');
		game.load.image('bulletParticle', 'assets/img/BulletParticle.png');
		game.load.image('bullet_l', 'assets/img/bullet_left.png');
		game.load.image('bullet_r', 'assets/img/bullet_right.png');

		game.load.audio('jump', 'assets/audio/Jump.mp3');
		game.load.audio('sad1', 'assets/audio/sad1.mp3');
	},
	create: function() {
		console.log('Load: create');
        if( metKingColor == false ){
            song = game.add.audio('sad1');
        }
        else {
            song = game.add.audio('sad1');
        }

		game.state.start('MainMenu');
	},

	update: function() {
      //console.log('Load: update');
   }
};
