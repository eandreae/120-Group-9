// Yellow color state
var Yellow = function(game) {};
Yellow.prototype = {

   // Preload the tilemap
   preload: function() {
      game.load.tilemap('layout', 'assets/TileMaps/Yellow.json', null, Phaser.Tilemap.TILED_JSON);
      game.load.spritesheet('tilesheet', 'assets/TileMaps/color_tiles.png', 32, 32);
   },

   create: function() {
      // Music
      song.stop();
      song = game.add.audio('action2');
      song.play('', 0, 0.5, true);

      // Background
      backgroundColor = "#FFEE99"
      game.stage.backgroundColor = backgroundColor;

      // Setting the world bounds
      game.world.setBounds(0, 0, 1024, 1024);

      // Create new tilemap
      this.map = game.add.tilemap('layout');
      this.map.addTilesetImage('color_tiles_tileset', 'tilesheet');

      // The layers for each yellow level
      if (yellowLevel == 0) {
         this.mapLayer = this.map.createLayer('Ground_0');
         this.map.setCollisionBetween(0, 999, true, 'Ground_0');
      } else if (yellowLevel == 1) {
         this.mapLayer = this.map.createLayer('Ground_1');
         this.map.setCollisionBetween(0, 999, true, 'Ground_1');
      } else if (yellowLevel == 2) {
         this.mapLayer = this.map.createLayer('Ground_2');
         this.map.setCollisionBetween(0, 999, true, 'Ground_2');
      }

      this.mapLayer.resizeWorld();

      // set 32-pixel buffer around tiles to avoid collision tunneling
      game.physics.arcade.TILE_BIAS = 32;

      // Yellow collectable
      bmd = game.add.bitmapData(75, 75);
      bmd.fill(255, 255, 0, 1);
      this.yellow = game.add.sprite(4000, 800, 'atlas', 'yellow_color');
      game.physics.arcade.enable(this.yellow);

      // Adds the player into the state
      this.player = new Player(game, 416, 800, this.mapLayer);
      game.add.existing(this.player);

      // Bullet groups
      this.playerBullets = game.add.group();

      // Add the enemy that chases you.
      // The group handling. No shooting.
      this.enemies = game.add.group();
      this.enemies.enableBody = true;
      // // The enemy that chases you.
      // var enemy = new Enemy(game, 64, 800, 190);
      // game.add.existing(enemy);
      // this.enemies.add(enemy);

      // Invisible collision to trigger the wall
      bmd = game.add.bitmapData(10, 10000);
      this.x = game.add.sprite(1350, 0, bmd);
      game.physics.arcade.enable(this.x);

      // Wall of death that chases the player when activated
      bmd = game.add.bitmapData(10000, 1000);
      bmd.fill(127, 106, 0, 1);
      this.wall = game.add.sprite(-10100, 200, bmd);
      game.physics.arcade.enable(this.wall);
      this.wall.body.immovable = true;

      // Camera follows player
      game.camera.follow(this.player);
      game.camera.deadzone = new Phaser.Rectangle(325, 200, 50, 150); // (x,y,width,height)
   },

   update: function() {
      // Making it so the enemy will follow the Player.
      // If player is on the enemy's left.
      // if( this.enemy.body.x < this.player.body.x ){
      //     // Make the Enemy chase after the Player.
      //     this.enemy.body.velocity.x = 190;
      // }
      // // If player is on the enemy's right.
      // if( this.enemy.body.x > this.player.body.x ){
      //     // Make the Enemy chase after the Player.
      //     this.enemy.body.velocity.x = -190;
      // }
      // // if player is directly above/below the enemy.
      // if( this.enemy.body.x == this.player.body.x ){
      //     // Make the Enemy stand still.
      //     this.enemy.body.velocity.x = 0;
      // }

      // Player shoots a bullet for each key press
      if (game.input.keyboard.justPressed(Phaser.Keyboard.X) && hasRed) {
         var bullet = new Bullet(game, this.player.x, this.player.y, direction, 1500);
         game.add.existing(bullet);
         this.playerBullets.add(bullet);
      }

      this.physics.arcade.overlap(this.player, this.yellow, this.collectYellow, null, this);
      this.physics.arcade.overlap(this.player, this.x, this.startWall, null, this);

      // If the player touches the death wall, they instantly die
      if (this.physics.arcade.collide(this.player, this.wall)) {
         health = 0;
         playerDies(this, this.player, 'Yellow');
      }
   },

   // When the player collects the color
   collectYellow: function(player, color) {
      // increment the yellowLevel progress.
      yellowLevel++;
      if (yellowLevel == 3) {
         hasYellow = true;
      }

      // Yellow bdm
      bmd = game.add.bitmapData(18, 18);
      bmd.fill(255, 255, 0, 1);

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
      song.stop();
      this.wall.body.velocity.x = 0;
      game.time.events.add(Phaser.Timer.SECOND * 2, function() {
         if (yellowLevel == 3) {
            game.state.start('Tutorial')
         } else {
            game.state.start('Yellow')
         }
      });
   },

   // Starts the death wall
   startWall: function(player, x) {
      song.stop();
      song = game.add.audio('action');
      song.play('', 0, 0.5, true);
      x.destroy();
      this.wall.body.velocity.x = 300;
   },

   // Debug stuff
   render: function() {
      game.debug.bodyInfo(this.player, 100, 100, 'black');
      game.debug.body(this.player);
      game.debug.body(this.x);
   }
};
