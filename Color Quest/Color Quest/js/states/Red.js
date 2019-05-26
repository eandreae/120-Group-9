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
      this.map.addTilesetImage('color_tiles_tileset', 'tilesheet');

      // Handle the group management before loading the levels.
      // The group of shooting enemies.
      this.shootingEnemies = game.add.group();
      this.shootingEnemies.enableBody = true;
      // Bullet groups
      this.playerBullets = game.add.group();
      this.enemyBullets = game.add.group();

      if( redLevel == 0 ){
          // The player has just entered the Red level, load Level 0.
          // Load the correct tilemaps for level 0.
          backgroundColor = "#FF9999";
          game.stage.backgroundColor = backgroundColor;
          this.mapLayer = this.map.createLayer('Ground_0');
          this.map.setCollisionBetween(0, 999, true, 'Ground_0');

          // LOADING MAP -------------------------------------------------------
          // Now that the correct level has been loaded, do the rest of the level.
          this.mapLayer.resizeWorld();

          // Load the enemies/NPCs/collectibles for level 0

          // NPCs --------------------------------------------------------------

          // ENEMIES -----------------------------------------------------------
          // enemies 1, 2, and 3 for level 0 of Red.

          // enemy 1
          var e1 = new Enemy(game, 1376, 704, 0);
          game.add.existing(e1);
          this.shootingEnemies.add(e1);

          // enemy 2
          var e2 = new Enemy(game, 2880, 864, 0);
          game.add.existing(e2);
          this.shootingEnemies.add(e2);

          // enemy 3
          var e3 = new Enemy(game, 3296, 672, 0);
          game.add.existing(e3);
          this.shootingEnemies.add(e3);

          // COLLECTIBLES ------------------------------------------------------

          // Red collectable
          bmd = game.add.bitmapData(75, 75);
          bmd.fill(255, 0, 0, 1);
          this.red = game.add.sprite(3680, 832, 'atlas', 'red_color');
          game.physics.arcade.enable(this.red);
      }
      else if( redLevel == 1 ){
          // The player has just entered the Red level 1, load level 1.
          backgroundColor = "#FF9999";
          game.stage.backgroundColor = backgroundColor;
          this.mapLayer = this.map.createLayer('Ground_1');
          this.map.setCollisionBetween(0, 999, true, 'Ground_1');

          // LOADING MAP -------------------------------------------------------
          // Now that the correct level has been loaded, do the rest of the level.
          this.mapLayer.resizeWorld();

          // Load the enemies/NPCs/collectibles for level 1

          // NPCs --------------------------------------------------------------

          // ENEMIES -----------------------------------------------------------
          // enemies 1, 2, and 3 for level 0 of Red.

          // enemy 1
          var e1 = new Enemy(game, 1824, 864, 0);
          game.add.existing(e1);
          this.shootingEnemies.add(e1);

          // enemy 2
          var e2 = new Enemy(game, 2368, 864, 0);
          game.add.existing(e2);
          this.shootingEnemies.add(e2);

          // enemy 3
          var e3 = new Enemy(game, 2848, 704, 0);
          game.add.existing(e3);
          this.shootingEnemies.add(e3);

          // enemy 4
          var e4 = new Enemy(game, 3264, 704, 0);
          game.add.existing(e4);
          this.shootingEnemies.add(e4);

          // COLLECTIBLES ------------------------------------------------------

          // Red collectable
          bmd = game.add.bitmapData(75, 75);
          bmd.fill(255, 0, 0, 1);
          this.red = game.add.sprite(3680, 832, 'atlas', 'red_color');
          game.physics.arcade.enable(this.red);
      }
      else if( redLevel == 2 ){
          // The player has just entered the Red level 2, load level 2.
          backgroundColor = "#FF9999";
          game.stage.backgroundColor = backgroundColor;
          this.mapLayer = this.map.createLayer('Ground_2');
          this.map.setCollisionBetween(0, 999, true, 'Ground_2');

          // LOADING MAP -------------------------------------------------------
          // Now that the correct level has been loaded, do the rest of the level.
          this.mapLayer.resizeWorld();

          // Load the enemies/NPCs/collectibles for level 1

          // NPCs --------------------------------------------------------------

          // ENEMIES -----------------------------------------------------------
          // enemies 1, 2, and 3 for level 0 of Red.

          // enemy 1
          var e1 = new Enemy(game, 1984, 864, 0);
          game.add.existing(e1);
          this.shootingEnemies.add(e1);

          // enemy 2
          var e2 = new Enemy(game, 2240, 768, 0);
          game.add.existing(e2);
          this.shootingEnemies.add(e2);

          // enemy 3
          var e3 = new Enemy(game, 2528, 672, 0);
          game.add.existing(e3);
          this.shootingEnemies.add(e3);

          // enemy 4
          var e4 = new Enemy(game, 3168, 672, 0);
          game.add.existing(e4);
          this.shootingEnemies.add(e4);

          // enemy 5
          var e5 = new Enemy(game, 3360, 800, 0);
          game.add.existing(e5);
          this.shootingEnemies.add(e5);

          // COLLECTIBLES ------------------------------------------------------

          // Red collectable
          bmd = game.add.bitmapData(75, 75);
          bmd.fill(255, 0, 0, 1);
          this.red = game.add.sprite(3680, 832, 'atlas', 'red_color');
          game.physics.arcade.enable(this.red);
      }

      // Adds the player into the level.
      this.player = new Player(game, 64, 800, this.mapLayer);
      game.add.existing(this.player);

      // Camera follows player
      game.camera.follow(this.player);
      game.camera.deadzone = new Phaser.Rectangle(325, 200, 50, 150); // (x,y,width,height)

      // Timer for how often the enemies shoot
      timer = game.time.create(false);
      timer.loop(3500, this.enemyGroup, this);
      timer.start();
   },

   update: function() {
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
         health--;
         if (health == 0) {
            song.stop();
            playerDies(game, player, 'Red');
         }
      }

      // Player with the Red Upgrade.
      this.physics.arcade.overlap(this.player, this.red, collectRed, null, this);

      // Player bullet with enemies
      game.physics.arcade.collide(this.playerBullets, this.enemies, bulletHitsEnemy, null, this)
      game.physics.arcade.collide(this.playerBullets, this.shootingEnemies, bulletHitsEnemy, null, this)

      // Enemy bullets with player
      game.physics.arcade.collide(this.player, this.enemyBullets, bulletHitsPlayer, null, this);

      // Bullets hitting a wall
      game.physics.arcade.collide(this.enemyBullets, this.mapLayer, bulletHitsWall, null, this);
      game.physics.arcade.collide(this.playerBullets, this.mapLayer, bulletHitsWall, null, this);

      this.healthText.text = health;

      // Function for if the Player's bullets hit the enemy.
      function bulletHitsEnemy(bullet, enemy) {
         bulletDestroyed(game, bullet);
         enemy.kill();
      }

      function bulletHitsPlayer(player, bullet) {
         bulletDestroyed(game, bullet);
         health--;
         if (health == 0) {
            playerDies(game, player, 'Red');
            song.stop();
         }
      }

      function bulletHitsWall(bullet, walls) {
         bulletDestroyed(game, bullet);
      }

      // When the player collects the color at the end of the level.
      function collectRed(player, color) {
          // increment the level variable upwards.
          redLevel++;

         if( redLevel == 2 ){
             // If they have reacehd the last Red level, give them the ability
             // to shoot.
             hasRed = true;
         }

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
             if( redLevel == 3 ){
                 game.state.start('Tutorial')
             } else {
                 game.state.start('Red')
             }

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
