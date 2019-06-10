// Music Credits - bensound.com
// "sad1" = bensound-november.mp3
// "happy" = bensound-littleidea.mp3
// "motivational" = bensound-birthofahero.mp3
// "title music" = bensound-funkysuspense.mp3
// "action music" = bensound-dance.mp3
// "action music2" = bensound-funkyelement.mp3
// "slap" = https://www.youtube.com/watch?v=xRihZvKxNYU

// Image Credits - Daniel Phipps (everything except pickup)
//'pickup' - https://pixabay.com/illustrations/colour-wheel-spectrum-rainbow-1740381/


// Load state
var Load = function(game) {};
Load.prototype = {

   // Loads all the assets needed
   preload: function() {
		// Atlas for the player and enemies
      game.load.atlas('boss', 'assets/img/kingColor.png', 'assets/img/kingColor.json');
      game.load.atlas('boss_fixed', 'assets/img/kingColor_fixed.png', 'assets/img/kingColor_fixed.json');
      game.load.atlas('boss_door', 'assets/img/boss_door.png', 'assets/img/boss_door.json');       // No color, b, by, r, rb, rby, ry, y
      game.load.atlas('bucky', 'assets/img/all_bucky.png', 'assets/img/all_bucky.json');             // No color, b, by, r, rb, rby, ry, y, dash
      game.load.atlas('enemies_r', 'assets/img/enemy_red.png', 'assets/img/enemy_red.json');     // [0] is facing left, [1] is facing right
      game.load.atlas('enemies_y', 'assets/img/enemy_yellow.png', 'assets/img/enemy_yellow.json');
      game.load.atlas('enemies_b', 'assets/img/enemy_blue.png', 'assets/img/enemy_blue.json');
      game.load.atlas('hp_palette', 'assets/img/health.png', 'assets/img/health.json');

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
      game.load.image('Game Over', 'assets/img/Game_Over.png');

      // Rest of the sprites
      game.load.image('bullet_l', 'assets/img/bullet_left.png');
      game.load.image('bullet_r', 'assets/img/bullet_right.png');
      game.load.image('door_b', 'assets/img/door_blue.png');
      game.load.image('door_r', 'assets/img/door_red.png');
      game.load.image('door_y', 'assets/img/door_yellow.png');
      game.load.image('npc_cute', 'assets/img/npc_cute.png');
      game.load.image('npc_generic_l', 'assets/img/npc_generic_left.png');
      game.load.image('npc_generic_r', 'assets/img/npc_generic_right.png');
      game.load.image('npc_smiley', 'assets/img/npc_smiley.png');
      game.load.image('npc_solaire', 'assets/img/npc_solaire.png');
      game.load.image('npc_whatever', 'assets/img/npc_whatever.png');
      game.load.image('npc_sleep', 'assets/img/npc_sleep.png');
      game.load.image('particle_r', 'assets/img/particle_red.png');
      game.load.image('particle_y', 'assets/img/particle_yellow.png');
      game.load.image('particle_b', 'assets/img/particle_blue.png');
      game.load.image('upgrade_b', 'assets/img/upgrade_blue.png');
      game.load.image('upgrade_r', 'assets/img/upgrade_red.png');
      game.load.image('upgrade_y', 'assets/img/upgrade_yellow.png');
      game.load.image('pickup', 'assets/img/color_wheel.png');
      game.load.image('EricHu', 'assets/img/EricHu.png');
      game.load.image('EricAndreae', 'assets/img/EricAndreae.png');
      game.load.image('Dylan', 'assets/img/Dylan.png');
      game.load.image('Daniel', 'assets/img/Daniel.png');

		// Loading audio
      // Music
      game.load.audio('sad1', 'assets/audio/bensound-november.mp3');
      game.load.audio('happy', 'assets/audio/bensound-littleidea.mp3');
      game.load.audio('motivational', 'assets/audio/bensound-birthofahero.mp3');
      game.load.audio('title music', 'assets/audio/bensound-funkysuspense.mp3');
      game.load.audio('action', 'assets/audio/bensound-dance.mp3');
      game.load.audio('action2', 'assets/audio/bensound-funkyelement.mp3');

      // Sound effects.

      // Player sounds
      game.load.audio('jump', 'assets/audio/Jump.mp3');
      game.load.audio('shoot', 'assets/audio/shoot.mp3');
      game.load.audio('hurt', 'assets/audio/ow4.mp3');
      game.load.audio('dash', 'assets/audio/dash.mp3');

      // King Color sounds
      game.load.audio('KC_laugh', 'assets/audio/KingColor laugh.mp3');
      game.load.audio('KC_shoot', 'assets/audio/KingColor shoot.mp3');
      game.load.audio('KC_hurt', 'assets/audio/KingColor hurt.mp3');
      game.load.audio('KC_dies', 'assets/audio/KingColor dies.mp3');

      // NPC sounds
      game.load.audio('hi_1', 'assets/audio/NPChi1.mp3');
      game.load.audio('hi_2', 'assets/audio/NPChi2.mp3');
      game.load.audio('hi_3', 'assets/audio/NPChi3.mp3');
      game.load.audio('hi_4', 'assets/audio/NPChi4.mp3');
      game.load.audio('hi_5', 'assets/audio/NPChi5.mp3');
      game.load.audio('hi_6', 'assets/audio/NPChi6.mp3');
      game.load.audio('hi_7', 'assets/audio/NPChi7.mp3');
      game.load.audio('solaire', 'assets/audio/solaire.mp3');
      game.load.audio('snore', 'assets/audio/snore.mp3');
      // enemy sounds
      game.load.audio('enemyShoot', 'assets/audio/enemyShoot.mp3');
      game.load.audio('enemyDies', 'assets/audio/enemyDies.mp3');
      game.load.audio('enemyDash', 'assets/audio/enemyDash.mp3');
      game.load.audio('enemyJump', 'assets/audio/enemyJump.mp3');

      // color sounds.
      game.load.audio('enter', 'assets/audio/enter color.mp3');

      // other sounds
      game.load.audio('slap', 'assets/audio/slap.mp3');


   },
   create: function() {
      game.state.start('MainMenu');
   },
};
