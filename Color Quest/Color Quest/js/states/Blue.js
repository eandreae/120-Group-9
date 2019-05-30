// Blue color state
var Blue = function(game) {};
Blue.prototype = {

   // Preload the tilemap
   preload: function() {
      game.load.tilemap('layout', 'assets/TileMaps/Blue.json', null, Phaser.Tilemap.TILED_JSON);
      game.load.spritesheet('tilesheet', 'assets/TileMaps/color_tiles.png', 32, 32);
   },

   create: function() {
      // Music
      song.stop();
      song = game.add.audio('action2');
      song.play('', 0, 0.5, true);

      // Background
      game.stage.backgroundColor = backgroundColor;

      // Setting the world bounds
      game.world.setBounds(0, 0, 1024, 1024);

      // set 32-pixel buffer around tiles to avoid collision tunneling
      game.physics.arcade.TILE_BIAS = 32;

      // Handle the text customization and health GUI
      var styleDescription = {
         font: '18px Arial',
         fill: '#000000',
         align: 'center',
         fontWeight: 'bold',
         stroke: '#000000',
         strokeThickness: 0
      };

      // Health GUI
      this.healthText = this.add.text(10, 10, "", styleDescription);
      this.healthText.fixedToCamera = true;

      // Create new tilemap
      this.map = game.add.tilemap('layout');
      this.map.addTilesetImage('color_tiles', 'tilesheet');

      // Handle the group management before loading the levels.
      // The group of shooting enemies.
      this.shootingEnemies = game.add.group();
      this.shootingEnemies.enableBody = true;

      // Bullet groups
      this.playerBullets = game.add.group();
      this.enemyBullets = game.add.group();;

      if (blueLevel == 0) {
         // Loading the correct TileMap.
         backgroundColor = "#72C4FF";
         game.stage.backgroundColor = backgroundColor;
         this.mapLayer = this.map.createLayer('Ground_0');
         this.map.setCollisionBetween(0, 999, true, 'Ground_0');

         // LOADING MAP -------------------------------------------------------
         // Now that the correct level has been loaded, do the rest of the level.
         this.mapLayer.resizeWorld();

         // Load the enemies/NPCs/collectibles for level 0

         // NPCs --------------------------------------------------------------

         // ENEMIES -----------------------------------------------------------

         // COLLECTIBLES ------------------------------------------------------

           // Blue collectable
           bmd = game.add.bitmapData(75, 75);
           bmd.fill(0, 0, 255, 1);
           this.blue = game.add.sprite(3968, 832, 'atlas', 'blue_color');
           game.physics.arcade.enable(this.blue);
      }
      else if( blueLevel == 1 ){
          // Loading the correct TileMap.
          backgroundColor = "#72C4FF";
          game.stage.backgroundColor = backgroundColor;
          this.mapLayer = this.map.createLayer('Ground_1');
          this.map.setCollisionBetween(0, 999, true, 'Ground_1');

         // LOADING MAP -------------------------------------------------------
         // Now that the correct level has been loaded, do the rest of the level.
         this.mapLayer.resizeWorld();

         // Load the enemies/NPCs/collectibles for level 0

         // NPCs --------------------------------------------------------------

         // ENEMIES -----------------------------------------------------------

         // COLLECTIBLES ------------------------------------------------------

           // Blue collectable
           bmd = game.add.bitmapData(75, 75);
           bmd.fill(0, 0, 255, 1);
           this.blue = game.add.sprite(3968, 832, 'atlas', 'blue_color');
           game.physics.arcade.enable(this.blue);
      }
      else if( blueLevel == 2 ){
          // Loading the correct TileMap.
          backgroundColor = "#72C4FF";
          game.stage.backgroundColor = backgroundColor;
          this.mapLayer = this.map.createLayer('Ground_2');
          this.map.setCollisionBetween(0, 999, true, 'Ground_2');

         // LOADING MAP -------------------------------------------------------
         // Now that the correct level has been loaded, do the rest of the level.
         this.mapLayer.resizeWorld();

         // Load the enemies/NPCs/collectibles for level 0

         // NPCs --------------------------------------------------------------

         // ENEMIES -----------------------------------------------------------

         // COLLECTIBLES ------------------------------------------------------

           // Blue collectable
           bmd = game.add.bitmapData(75, 75);
           bmd.fill(0, 0, 255, 1);
           this.blue = game.add.sprite(3776, 320, 'atlas', 'blue_color');
           game.physics.arcade.enable(this.blue);
      }

      // Adds the player into the state
      this.player = new Player(game, 64, 832, this.mapLayer);
      game.add.existing(this.player);

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
      this.physics.arcade.overlap(this.player, this.blue, this.collectBlue, null, this);
   },

   // When the player collects the color
   collectBlue: function(player, color) {
      hasBlue = true;
      blueLevel++;

      // Blue bdm
      bmd = game.add.bitmapData(18, 18);
      bmd.fill(0, 0, 255, 1);

      // Particles when color is collected
      colorEmitter = game.add.emitter(color.x, color.y, 200);
      colorEmitter.makeParticles(bmd); // red squares used as particles
      colorEmitter.gravity = 0;
      colorEmitter.setScale(.25, .8, .25, .8, 0);
      colorEmitter.setAlpha(.8, 0, 1800); // .8 to .3 alpha
      colorEmitter.setXSpeed(-100, 100); // horizontal speed range
      colorEmitter.setYSpeed(-100, 100); // vertical speed range
      colorEmitter.start(true, 2000, null, 50); // (explode, lifespan, freq, quantity)

      color.destroy();
      game.time.events.add(Phaser.Timer.SECOND * 2, function() {
         if (blueLevel == 3) {
            game.state.start('Tutorial')
         } else {
            game.state.start('Blue')
         }
      });
   },

   render: function() {
      game.debug.bodyInfo(this.player, 100, 100, 'black');
      game.debug.body(this.player);
   }
};
