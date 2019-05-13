// Red color state
var Red = function(game) {};
Red.prototype = {

   // Variables used in Red
   init: function() {

   },

   preload: function() {
      console.log('Red: preload');

      game.load.tilemap('layout', 'assets/TileMaps/RedMap.json', null, Phaser.Tilemap.TILED_JSON);
      game.load.spritesheet('tilesheet', 'assets/TileSheets/tilesheet_1.png', 32, 32);
   },

   create: function() {
      console.log('Red: create');

      // Background
      game.stage.backgroundColor = backgroundColor;

      // Setting the world bounds
      game.world.setBounds(0, 0, 1024, 1024);

      // Create new tilemap
      this.map = game.add.tilemap('layout');
      this.map.addTilesetImage('ColorQuestTileSheet_1', 'tilesheet');
      this.map.setCollisionByExclusion([]);
      this.mapLayer = this.map.createLayer('Tile Layer 1');
      this.mapLayer.resizeWorld();

      // set 32-pixel buffer around tiles to avoid collision tunneling
      game.physics.arcade.TILE_BIAS = 32;

      // Red collectable
      bmd = game.add.bitmapData(75, 75);
      bmd.fill(255, 0, 0, 1);
      this.red = game.add.sprite(500, 10, 'atlas', 'red_color');
      game.physics.arcade.enable(this.red);

      // Adds the player into the state
      this.player = new Player(game, 64, 825, this.mapLayer);
      game.add.existing(this.player);

      // Bullet groups
      this.playerBullets = game.add.group();

      // Camera follows player
      game.camera.follow(this.player);
      game.camera.deadzone = new Phaser.Rectangle(325, 200, 50, 150); // (x,y,width,height)
   },

   update: function() {
      //console.log('Red: update');
      if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
         game.state.start('GameOver');
      }

      // Player shoots a bullet for each key press
      if (game.input.keyboard.justPressed(Phaser.Keyboard.X) && hasRed) {
         var bullet = new Bullet(game, this.player.x, this.player.y, direction, .4, 1500);
         game.add.existing(bullet);
         this.playerBullets.add(bullet);
      }

      this.physics.arcade.overlap(this.player, this.red, collectRed, null, this);

      function collectRed(player, color) {
         hasRed = true;

         bmd = game.add.bitmapData(18, 18);
         bmd.fill(255, 0, 0, 1);

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
   }
};
