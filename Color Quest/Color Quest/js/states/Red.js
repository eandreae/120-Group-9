// Red color state
var Red = function(game) {};
Red.prototype = {

   // Variables used in Red
   init: function() {

   },

   preload: function() {
      console.log('Red: preload');

      game.load.tilemap('layout', 'assets/TileMaps/Red.json', null, Phaser.Tilemap.TILED_JSON);
      game.load.spritesheet('tilesheet', 'assets/TileSheets/color_tiles.png', 32, 32);
   },

   create: function() {
      console.log('Red: create');

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

      // Red collectable
      bmd = game.add.bitmapData(75, 75);
      bmd.fill(255, 0, 0, 1);
      this.red = game.add.sprite(2464, 416, 'atlas', 'red_color');
      game.physics.arcade.enable(this.red);

      // Home collectable
      bmd2 = game.add.bitmapData(75, 75);
      bmd.fill(255, 0, 0, 1);
      this.home = game.add.sprite(4002, 800, 'atlas', 'red_color');
      game.physics.arcade.enable(this.home);

      // Adds the player into the state
      this.player = new Player(game, 64, 825, this.mapLayer);
      game.add.existing(this.player);

      // Place the shooting enemies.
      // The group of shooting enemies.
      this.shootingEnemies = game.add.group();
      this.shootingEnemies.enableBody = true;

      // enemies 1, 2, 3, first half of red.
      var e1 = new Enemy(game, 2465, 832, 0);
      game.add.existing(e1);
      this.shootingEnemies.add(e1);

      var e2 = new Enemy(game, 2465, 704, 0);
      game.add.existing(e2);
      this.shootingEnemies.add(e2);

      var e3 = new Enemy(game, 2465, 576, 0);
      game.add.existing(e3);
      this.shootingEnemies.add(e3);

      // Bullet groups
      this.playerBullets = game.add.group();
      this.enemyBullets = game.add.group();

      // Camera follows player
      game.camera.follow(this.player);
      game.camera.deadzone = new Phaser.Rectangle(325, 200, 50, 150); // (x,y,width,height)

      // Timer for how often the enemies shoot
      timer = game.time.create(false);
      timer.loop(2000, this.enemyGroup, this);
      timer.start();
   },

   update: function() {
      //console.log('Red: update');
      //console.log(this.enemyBullets.length)
      if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
         game.state.start('GameOver');
      }

      // Player shoots a bullet for each key press
      if (game.input.keyboard.justPressed(Phaser.Keyboard.X) && hasRed) {
         var bullet = new Bullet(game, this.player.x, this.player.y, direction, .4, 1500);
         game.add.existing(bullet);
         this.playerBullets.add(bullet);
      }

      // All the collisions needed
      game.physics.arcade.collide(this.enemies, this.mapLayer); // Enemies with platforms
      game.physics.arcade.collide(this.shootingEnemies, this.mapLayer); // Shooting enemies with platforms
      game.physics.arcade.collide(this.npcs, this.mapLayer);

      // Player with enemies
      if (game.physics.arcade.collide(this.enemies, this.player) || game.physics.arcade.collide(this.shootingEnemies, this.player)) {
         song.stop();
         playerDies(game, this.player);
      }

      // Player bullet with enemies
      game.physics.arcade.collide(this.playerBullets, this.enemies, bulletHitsEnemy, null, this)
      game.physics.arcade.collide(this.playerBullets, this.shootingEnemies, bulletHitsEnemy, null, this)

      // Enemy bullets with player
      game.physics.arcade.collide(this.enemyBullets, this.player, bulletHitsPlayer, null, this)

      // // Overlap check to check collision between Player and Red Upgrade.
      // this.physics.arcade.overlap(this.player, this.red, collectRed, null, this);
      // // Overlap check to check collision between Player and the Go Home button.
      // this.physics.arcade.overlap(this.player, this.home, goHome, null, this);
      //
      // // Collision detection for Player bullets on the Shooting enemies.
      // game.physics.arcade.collide(this.playerBullets, this.shootingEnemies, bulletHitsEnemy, null, this);
      //
      // // Collision detection for enemy bullets with the Player.
      // game.physics.arcade.collide(this.enemyBullets, this.player, bulletHitsPlayer, null, this);

      // Collision detection
      // if (game.physics.arcade.collide(this.shootingEnemies, this.player)) {
      //    song.stop();
      //    playerDies(game, this.player);
      // }

      // Function for if the Player's bullets hit the enemy.
      function bulletHitsEnemy(bullet, enemy) {
         bullet.kill();
         enemy.kill();
      }

      function bulletHitsPlayer(bullet, player) {
         bullet.kill();
         song.stop();
         playerDies(game, player);
      }

      // When the player collects the color
      function collectRed(player, color) {
         hasRed = true;

         // Red bdm
         bmd = game.add.bitmapData(18, 18);
         bmd.fill(255, 0, 0, 1);

         // Particles when color is collected
         colorEmitter = game.add.emitter(color.x, color.y, 200);
         colorEmitter.makeParticles(bmd); // red squares used as particles
         colorEmitter.gravity = 0;
         colorEmitter.setScale(.25, .8, .25, .8, 0);
         colorEmitter.setAlpha(.8, 0, 1800); // .8 to .3 alpha
         colorEmitter.setXSpeed(-100, 100); // horizontal speed range
         colorEmitter.setYSpeed(-100, 100); // vertical speed range
         colorEmitter.start(true, 2000, null, 50); // (explode, lifespan, freq, quantity)

         color.kill();
      }

      function goHome(player, color) {
         // Red bdm
         bmd = game.add.bitmapData(18, 18);
         bmd.fill(255, 0, 0, 1);

         // Particles when color is collected
         colorEmitter = game.add.emitter(color.x, color.y, 200);
         colorEmitter.makeParticles(bmd); // red squares used as particles
         colorEmitter.gravity = 0;
         colorEmitter.setScale(.25, .8, .25, .8, 0);
         colorEmitter.setAlpha(.8, 0, 1800); // .8 to .3 alpha
         colorEmitter.setXSpeed(-100, 100); // horizontal speed range
         colorEmitter.setYSpeed(-100, 100); // vertical speed range
         colorEmitter.start(true, 2000, null, 50); // (explode, lifespan, freq, quantity)

         color.kill();
         song.stop();
         game.time.events.add(Phaser.Timer.SECOND * 2, function() {
            game.state.start('Tutorial')
         });
      }
   },
   // Called every 2 seconds by the timer to have the enemies shoot
   enemyGroup: function() {
      this.shootingEnemies.forEach(this.enemyShoot, this, true);
   },

   enemyShoot: function(enemy) {
      var bullet = new Bullet(game, enemy.x, enemy.y, -1, .4, 350);
      game.add.existing(bullet);
      this.enemyBullets.add(bullet);
   },

   render: function() {
      game.debug.bodyInfo(this.player, 100, 100, 'black');
      game.debug.body(this.player);
   }
};
