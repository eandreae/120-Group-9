// Yellow color state
var Yellow = function(game) {};
Yellow.prototype = {

   // Variables used in Yellow
   init: function() {

   },

   preload: function() {
      console.log('Yellow: preload');

      game.load.tilemap('layout', 'assets/TileMaps/YellowMap.json', null, Phaser.Tilemap.TILED_JSON);
      game.load.spritesheet('tilesheet', 'assets/TileSheets/tilesheet_1.png', 32, 32);
   },

   create: function() {
      console.log('Yellow: create');

      // Background
      game.stage.backgroundColor = backgroundColor;

      // Setting the world bounds
      game.world.setBounds(0, 0, 1024, 1024);

      // Create new tilemap
      this.map = game.add.tilemap('layout');
      this.map.addTilesetImage('ColorQuestTileSheet_1', 'tilesheet');
      this.map.myLayers = [];

      this.mapLayer = this.map.createLayer('Ground');
      game.physics.arcade.enable(this.mapLayer);
      this.map.myLayers[0] = this.mapLayer;

      this.mapLayer = this.map.createLayer('Yellow_1');
      game.physics.arcade.enable(this.mapLayer);
      this.map.myLayers[1] = this.mapLayer;

      this.mapLayer = this.map.createLayer('Yellow_2');
      game.physics.arcade.enable(this.mapLayer);
      this.map.myLayers[2] = this.mapLayer;

      this.mapLayer = this.map.createLayer('Yellow_3');
      game.physics.arcade.enable(this.mapLayer);
      this.map.myLayers[3] = this.mapLayer;

      this.map.setCollisionByExclusion([]);

      this.mapLayer.resizeWorld();

      // set 32-pixel buffer around tiles to avoid collision tunneling
      game.physics.arcade.TILE_BIAS = 32;

      // Yellow collectable
      bmd = game.add.bitmapData(75, 75);
      bmd.fill(255, 255, 0, 1);
      this.yellow = game.add.sprite(600, 10, 'atlas', 'yellow_color');
      game.physics.arcade.enable(this.yellow);

      // Adds the player into the state
      this.player = new Player(game, 64, 825, this.map.myLayers);
      game.add.existing(this.player);

      // Bullet groups
      this.playerBullets = game.add.group();

      // Camera follows player
      game.camera.follow(this.player);
      game.camera.deadzone = new Phaser.Rectangle(325, 200, 50, 150); // (x,y,width,height)
   },

   update: function() {
      //console.log('Yellow: update');
      if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
         game.state.start('GameOver');
      }

      // Player shoots a bullet for each key press
      if (game.input.keyboard.justPressed(Phaser.Keyboard.X) && hasRed) {
         var bullet = new Bullet(game, this.player.x, this.player.y, direction, .4, 1500);
         game.add.existing(bullet);
         this.playerBullets.add(bullet);
      }

      this.physics.arcade.overlap(this.player, this.yellow, collectYellow, null, this);

      function collectYellow(player, color) {
         hasYellow = true;

         bmd = game.add.bitmapData(18, 18);
         bmd.fill(255, 255, 0, 1);

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
