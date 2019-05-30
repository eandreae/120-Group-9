// Music Credits - bensound.com
// "sad1" = bensound-november.mp3
// "happy" = bensound-littleidea.mp3
// "motivational" = bensound-birthofahero.mp3
// "title music" = bensound-funkysuspense.mp3
// "action music" = bensound-dance.mp3
// "action music2" = bensound-funkyelement.mp3


// Load state
var Load = function(game) {};
Load.prototype = {

   // Loads all the assets needed
   preload: function() {
		// Atlas for the player and enemies
      game.load.atlas('atlas', 'assets/img/atlas.png', 'assets/img/atlas.json');
      game.load.atlas('bucky', 'assets/img/allBucky.png', 'assets/img/allBucky.json');
      game.load.atlas('enemies_red', 'assets/img/enemy_red.png', 'assets/img/enemy_red.json');
      game.load.atlas('enemies_yellow', 'assets/img/enemy_yellow.png', 'assets/img/enemy_yellow.json');
      game.load.atlas('enemies_blue', 'assets/img/enemy_blue.png', 'assets/img/enemy_blue.json');

		// Loading images
      game.load.image('boss', 'assets/img/kingcolor.png');
      game.load.image('bPortal', 'assets/img/KingColorButton.png');
      game.load.image('title', 'assets/img/TitleScreen.png');
      game.load.image('bullet_l', 'assets/img/bullet_left.png');
      game.load.image('bullet_r', 'assets/img/bullet_right.png');
      game.load.image('particle_r', 'assets/img/particle_red.png');
      game.load.image('particle_y', 'assets/img/particle_yellow.png');
      game.load.image('particle_b', 'assets/img/particle_blue.png');

		// Loading audio
      game.load.audio('jump', 'assets/audio/Jump.mp3');
      game.load.audio('sad1', 'assets/audio/bensound-november.mp3');
      game.load.audio('happy', 'assets/audio/bensound-littleidea.mp3');
      game.load.audio('motivational', 'assets/audio/bensound-birthofahero.mp3');
      game.load.audio('title music', 'assets/audio/bensound-funkysuspense.mp3');
      game.load.audio('action', 'assets/audio/bensound-dance.mp3');
      game.load.audio('action2', 'assets/audio/bensound-funkyelement.mp3');

   },
   create: function() {
      game.state.start('MainMenu');
   },
};
