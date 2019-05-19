// Red color state
var Red = function(game) {};
Red.prototype = {

   // Variables used in Red
   init: function() {

   },

   preload: function() {
      console.log('Red: preload');

      game.load.tilemap('layout', 'assets/TileMaps/Red.json', null, Phaser.Tilemap.TILED_JSON);
      game.load.spritesheet('tilesheet', 'assets/TileMaps/color_tiles.png', 32, 32);
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

      // Creates a temporary Red Upgrade
      var hasRedUpgrade = false;

      // Home collectable
      bmd2 = game.add.bitmapData(75, 75);
      bmd.fill(255, 0, 0, 1);
      this.home = game.add.sprite(4002, 800, 'atlas', 'red_color');
      game.physics.arcade.enable(this.home);

      var styleDescription = {
         font: '18px Arial',
         fill: '#000000',
         align: 'center',
         fontWeight: 'bold',
         stroke: '#000000',
         strokeThickness: 0
      };

      this.healthText = this.add.text(10, 10, "", styleDescription);
      this.healthText.fixedToCamera = true;

      // Adds the player into the state
      this.player = new Player(game, 64, 800, this.mapLayer);
      game.add.existing(this.player);

      // Place the shooting enemies.
      // The group of shooting enemies.
      this.shootingEnemies = game.add.group();
      this.shootingEnemies.enableBody = true;

      // enemies 1 and 2 for the first half of red.
      var e1 = new Enemy(game, 2465, 832, 0);
      game.add.existing(e1);
      this.shootingEnemies.add(e1);

      var e2 = new Enemy(game, 2465, 576, 0);
      game.add.existing(e2);
      this.shootingEnemies.add(e2);

      // enemies 3, 4, 5, and 6 for the second half of red.
      var e3 = new Enemy(game, 3809, 417, 0);
      game.add.existing(e3);
      this.shootingEnemies.add(e3);

      var e4 = new Enemy(game, 3809, 576, 0);
      game.add.existing(e4);
      this.shootingEnemies.add(e4);

      var e5 = new Enemy(game, 3809, 703, 0);
      game.add.existing(e5);
      this.shootingEnemies.add(e5);

      var e6 = new Enemy(game, 3809, 832, 0);
      game.add.existing(e6);
      this.shootingEnemies.add(e6);

      // Bullet groups
      this.playerBullets = game.add.group();
      this.enemyBullets = game.add.group();

      // Camera follows player
      game.camera.follow(this.player);
      game.camera.deadzone = new Phaser.Rectangle(325, 200, 50, 150); // (x,y,width,height)

      // Timer for how often the enemies shoot
      timer = game.time.create(false);
      timer.loop(3500, this.enemyGroup, this);
      timer.start();
   },

   update: function() {
      //console.log('Red: update');
      //console.log(this.enemyBullets.length)
      if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
         game.state.start('GameOver');
      }

      // Player shoots a bullet for each key press
      if (game.input.keyboard.justPressed(Phaser.Keyboard.X) && hasRedUpgrade) {
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
         health--;
         if (health == 0) {
            song.stop();
            playerDies(game, player);
         }
      }

      // Player bullet with enemies
      game.physics.arcade.collide(this.playerBullets, this.enemies, bulletHitsEnemy, null, this)
      game.physics.arcade.collide(this.playerBullets, this.shootingEnemies, bulletHitsEnemy, null, this)

      // Player with the Red Upgrade.
      this.physics.arcade.overlap(this.player, this.red, collectRed, null, this);

      // Player with the GoHome red button.
      this.physics.arcade.overlap(this.player, this.home, goHome, null, this);

      // Enemy bullets with player
      game.physics.arcade.collide(this.enemyBullets, this.player, bulletHitsPlayer, null, this)

      // Bullets hitting a wall
      game.physics.arcade.collide(this.enemyBullets, this.mapLayer, bulletHitsWall, null, this);
      game.physics.arcade.collide(this.playerBullets, this.mapLayer, bulletHitsWall, null, this);

      this.healthText.text = health;

      // Function for if the Player's bullets hit the enemy.
      function bulletHitsEnemy(bullet, enemy) {
         bulletDestroyed(game, bullet);
         enemy.kill();
      }

      function bulletHitsPlayer(bullet, player) {
         console.log("uhoh");
         bulletDestroyed(game, bullet);

         health--;
         if (health == 0) {
            song.stop();
            playerDies(game, player);
         }
      }

      function bulletHitsWall(bullet, walls) {
         bulletDestroyed(game, bullet);
      }

      // When the player collects the color
      function collectRed(player, color) {
         hasRedUpgrade = true;

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
      var bullet = new Bullet(game, enemy.x, enemy.y, -1, .4, 300);
      game.add.existing(bullet);
      this.enemyBullets.add(bullet);
   },

   render: function() {
      game.debug.bodyInfo(this.player, 100, 100, 'black');
      game.debug.body(this.player);
   }
};
