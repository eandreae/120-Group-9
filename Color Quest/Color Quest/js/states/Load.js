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
      game.load.atlas('boss_door', 'assets/img/boss_door.png', 'assets/img/boss_door.json');       // No color, b, by, r, rb, rby, ry, y
      game.load.atlas('bucky', 'assets/img/all_bucky.png', 'assets/img/all_bucky.json');             // No color, b, by, r, rb, rby, ry, y, dash
      game.load.atlas('enemies_r', 'assets/img/enemy_red.png', 'assets/img/enemy_red.json');     // [0] is facing left, [1] is facing right
      game.load.atlas('enemies_y', 'assets/img/enemy_yellow.png', 'assets/img/enemy_yellow.json');
      game.load.atlas('enemies_b', 'assets/img/enemy_blue.png', 'assets/img/enemy_blue.json');
      game.load.atlas('boss', 'assets/img/kingcolor.png', 'assets/img/kingcolor.json');

		// Background Images
      game.load.image('bg_blue', 'assets/img/bg_blue.png');
      game.load.image('bg_red', 'assets/img/bg_red.png');
      game.load.image('bg_yellow', 'assets/img/bg_yellow.png');
      game.load.image('bg_town', 'assets/img/bg_townsmile.png');
      game.load.image('bg_town_b', 'assets/img/bg_townsmile_b.png');
      game.load.image('bg_town_by', 'assets/img/bg_townsmile_by.png');
      game.load.image('bg_town_y', 'assets/img/bg_townsmile_y.png');
      game.load.image('bg_town_gray', 'assets/img/bg_townsmile_gray.png');
      game.load.image('bg_boss', 'assets/img/bg_kingcolor.png');
      game.load.image('title', 'assets/img/TitleScreen.png');

      // Rest of the sprites
      game.load.image('bPortal', 'assets/img/KingColorButton.png');
      game.load.image('bullet_l', 'assets/img/bullet_left.png');
      game.load.image('bullet_r', 'assets/img/bullet_right.png');
      game.load.image('door_b', 'assets/img/door_blue.png');
      game.load.image('door_r', 'assets/img/door_red.png');
      game.load.image('door_y', 'assets/img/door_yellow.png');
      game.load.image('npc_cute', 'assets/img/npc_cute.png');
      game.load.image('npc_generic_l', 'assets/img/npc_generic_left.png');
      game.load.image('npc_generic_r', 'assets/img/npc_generic_right.png');
      game.load.image('npc_smiely', 'assets/img/npc_smiley.png');
      game.load.image('npc_solaire', 'assets/img/npc_solaire.png');
      game.load.image('npc_whatever', 'assets/img/npc_whatever.png');
      game.load.image('particle_r', 'assets/img/particle_red.png');
      game.load.image('particle_y', 'assets/img/particle_yellow.png');
      game.load.image('particle_b', 'assets/img/particle_blue.png');
      game.load.image('upgrade_b', 'assets/img/upgrade_blue.png');
      game.load.image('upgrade_r', 'assets/img/upgrade_red.png');
      game.load.image('upgrade_y', 'assets/img/upgrade_yellow.png');

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
