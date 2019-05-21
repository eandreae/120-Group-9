// Blue color state
var Blue = function(game) {};
Blue.prototype = {

   // Variables used in Blue
   init: function() {

   },

   preload: function() {
      console.log('Blue: preload');

      game.load.tilemap('layout', 'assets/TileMaps/Blue.json', null, Phaser.Tilemap.TILED_JSON);
      game.load.spritesheet('tilesheet', 'assets/TileSheets/color_tiles.png', 32, 32);
   },

   create: function() {
      console.log('Blue: create');

      // Background
      game.stage.backgroundColor = backgroundColor;

      // Setting the world bounds
      game.world.setBounds(0, 0, 1024, 1024);

      // Create new tilemap
      this.map = game.add.tilemap('layout');
      this.map.addTilesetImage('color_tiles_tileset', 'tilesheet');
      this.map.setCollisionByExclusion([]);
      this.mapLayer = this.map.createLayer('Ground');
      this.mapLayer.resizeWorld();

      // set 32-pixel buffer around tiles to avoid collision tunneling
      game.physics.arcade.TILE_BIAS = 32;

      // Blue collectable
      bmd = game.add.bitmapData(75, 75);
      bmd.fill(0, 0, 255, 1);
      this.blue = game.add.sprite(929, 2752, 'atlas', 'blue_color');
      game.physics.arcade.enable(this.blue);

      // Home collectable - allows the player to go back to the Hub.
      bmd2 = game.add.bitmapData(75, 75);
      bmd.fill(255, 0, 0, 1);
      this.home = game.add.sprite(32, 32, 'atlas', 'blue_color');
      game.physics.arcade.enable(this.home);

      // Adds the player into the state
      this.player = new Player(game, 64, 3870, this.mapLayer);
      game.add.existing(this.player);

      // Bullet groups
      this.playerBullets = game.add.group();

      // Camera follows player
      game.camera.follow(this.player);
      game.camera.deadzone = new Phaser.Rectangle(325, 200, 50, 150); // (x,y,width,height)
   },

   update: function() {

      // Player shoots a bullet for each key press
      if (game.input.keyboard.justPressed(Phaser.Keyboard.X) && hasRed) {
         var bullet = new Bullet(game, this.player.x, this.player.y, direction, .4, 1500);
         game.add.existing(bullet);
         this.playerBullets.add(bullet);
      }

      // For when the player collects the blue upgrade.
      this.physics.arcade.overlap(this.player, this.blue, collectBlue, null, this);
      // For when the player collects the second blue upgrade, the home teleport.
      this.physics.arcade.overlap(this.player, this.home, goHome, null, this);

      // When the player collects the color
      function collectBlue(player, color) {
         hasBlue = true;

         // Blue bdm
         bmd = game.add.bitmapData(18, 18);
         bmd.fill(0, 0, 255, 1);

         // Particles when color is collected
         colorEmitter = game.add.emitter(color.x, color.y, 200);
         colorEmitter.makeParticles(bmd);		        // red squares used as particles
         colorEmitter.gravity = 0;
         colorEmitter.setScale(.25, .8, .25, .8, 0);
         colorEmitter.setAlpha(.8, 0, 1800); 	      // .8 to .3 alpha
         colorEmitter.setXSpeed(-100,100);			   // horizontal speed range
         colorEmitter.setYSpeed(-100,100);			   // vertical speed range
         colorEmitter.start(true, 2000, null, 50);	   // (explode, lifespan, freq, quantity)

         color.destroy();
      }

      function goHome(player, color) {
         // Blue bdm
         bmd = game.add.bitmapData(18, 18);
         bmd.fill(0, 0, 255, 1);

         // Particles when color is collected
         colorEmitter = game.add.emitter(color.x, color.y, 200);
         colorEmitter.makeParticles(bmd);		        // red squares used as particles
         colorEmitter.gravity = 0;
         colorEmitter.setScale(.25, .8, .25, .8, 0);
         colorEmitter.setAlpha(.8, 0, 1800); 	      // .8 to .3 alpha
         colorEmitter.setXSpeed(-100,100);			   // horizontal speed range
         colorEmitter.setYSpeed(-100,100);			   // vertical speed range
         colorEmitter.start(true, 2000, null, 50);	   // (explode, lifespan, freq, quantity)

         color.destroy();
         song.stop();
         game.time.events.add(Phaser.Timer.SECOND * 2, function() { game.state.start('Tutorial')});
      }
  },
  render: function() {
     game.debug.bodyInfo(this.player, 100, 100, 'black');
     game.debug.body(this.player);
  }
};
