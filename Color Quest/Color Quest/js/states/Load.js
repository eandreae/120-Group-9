// Load state
var Load = function(game) {};
Load.prototype = {
	preload: function() {
      game.load.atlas('atlas', 'assets/img/atlas.png', 'assets/img/atlas.json');
		game.load.image('ground', 'assets/img/platform.png');
		game.load.image('bullet', 'assets/img/bullet.png');
        game.load.image('boss', 'assets/img/kingcolor.png');

		game.load.audio('jump', 'assets/audio/Jump.mp3');
		game.load.audio('song', 'assets/audio/Delicate.mp3');
	},
	create: function() {
		console.log('Load: create');

		song = game.add.audio('song');
	},

	update: function() {
      //console.log('Load: update');
      // GameOver logic
      if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
          game.state.start('Tutorial');
      }
   }
};
