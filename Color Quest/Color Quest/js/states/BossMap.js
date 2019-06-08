// BossMap state
var BossMap = function(game) {};
BossMap.prototype = {

   // Variables used in Boss
   init: function() {
      health = 5;
      injured = false;
   },

   preload: function() {

      game.load.tilemap('layout', 'assets/TileMaps/KingColor.json', null, Phaser.Tilemap.TILED_JSON);
      game.load.spritesheet('tilesheet', 'assets/TileMaps/color_tiles_2.png', 32, 32);
   },

   create: function() {
      // Background
      background = game.add.image(0, 0, 'bg_boss');
      background.fixedToCamera = true;

      song.stop();
      song = game.add.audio('motivational');
      song.play('', 0, 0.5, true);

      // Setting the world bounds
      game.world.setBounds(0, 0, 1024, 1024);

      // Create new tilemap
      this.map = game.add.tilemap('layout');
      this.map.addTilesetImage('color_tiles_2', 'tilesheet');

      this.mapLayer = this.map.createLayer('Ground_0');
      this.map.setCollisionBetween(0, 999, true, 'Ground_0');

      this.mapLayer.resizeWorld();

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

      // Handle the group management before loading the levels.
      // The group of shooting enemies.
      this.shootingEnemies = game.add.group();
      this.shootingEnemies.enableBody = true;

      // Adds the player into the state
      this.player = new Player(game, 64, 1340, this.mapLayer);
      game.add.existing(this.player);

      // Bullet groups
      this.playerBullets = game.add.group();
      this.enemyBullets = game.add.group();

      // Camera follows player
      game.camera.follow(this.player);
      game.camera.deadzone = new Phaser.Rectangle(325, 200, 50, 150); // (x,y,width,height)

      // NPCs --------------------------------------------------------------

      // ENEMIES -----------------------------------------------------------
      // Shooting enemies for the final level.

      // Enemy 1
      var e1 = new Enemy(game, 2496, 1120, 0);
      game.add.existing(e1);
      this.shootingEnemies.add(e1);

      // Enemy 2
      var e2 = new Enemy(game, 2675, 991, 0);
      game.add.existing(e2);
      this.shootingEnemies.add(e2);

      // Enemy 3
      var e3 = new Enemy(game, 2706, 1214, 0);
      game.add.existing(e3);
      this.shootingEnemies.add(e3);

      // Enemy 4
      var e4 = new Enemy(game, 3040, 1214, 0);
      game.add.existing(e4);
      this.shootingEnemies.add(e4);

      // Enemy 5
      var e5 = new Enemy(game, 3168, 992, 0);
      game.add.existing(e5);
      this.shootingEnemies.add(e5);

      // Add KC
      this.boss = new Boss(game, 7815, 800, 0);
      game.add.existing(this.boss);
      this.boss.enableBody = true;

      // Timer for how often the enemies shoot
      enemyShootTimer = game.time.create(false);
      enemyShootTimer.loop(3500, this.enemyGroup, this);
      enemyShootTimer.start();
   },

   update: function() {

      // Player shoots a bullet for each key press
      if (game.input.keyboard.justPressed(Phaser.Keyboard.X) && hasRed && !playerDead) {
         var bullet = new Bullet(game, this.player.x, this.player.y, direction, playerBulletSpeed);
         game.add.existing(bullet);
         this.playerBullets.add(bullet);
      }

      // All the collisions needed
      game.physics.arcade.collide(this.enemies, this.mapLayer); // Enemies with platforms
      game.physics.arcade.collide(this.shootingEnemies, this.mapLayer); // Shooting enemies with platforms
      game.physics.arcade.collide(this.npcs, this.mapLayer); // NPCs with the platforms

      // Player with enemies
      if (!injured) {
         if (game.physics.arcade.collide(this.enemies, this.player) || game.physics.arcade.collide(this.shootingEnemies, this.player)) {
            health--;

            // If player health reaches 0, they die
            if (health == 0) {
               song.stop();
               playerDies(game, this.player, 'BossMap');
            }
         }
      }

      // Player bullet with enemies
      game.physics.arcade.collide(this.playerBullets, this.enemies, this.bulletHitsEnemy, null, this);
      game.physics.arcade.collide(this.playerBullets, this.shootingEnemies, this.bulletHitsEnemy, null, this);

      // Enemy bullets with player
      if (!injured) game.physics.arcade.collide(this.player, this.enemyBullets, this.bulletHitsPlayer, null, this);

      // Bullets hitting a wall
      game.physics.arcade.collide(this.enemyBullets, this.mapLayer, this.bulletHitsWall, null, this);
      game.physics.arcade.collide(this.playerBullets, this.mapLayer, this.bulletHitsWall, null, this);

      this.healthText.text = health;

      // Bullet collision for CK
      game.physics.arcade.collide(this.playerBullets, this.boss, this.bulletHitsBoss, null, this);

      // Player dying when falling into pit
      if(this.player.y >= 1475){
          if(health > 0){
             playerDies(game, this.player, 'BossMap');
             health = 0;
             song.stop();
          }
      }
   },

   // Health loss and death for CK upon bullet collision
   bulletHitsBoss: function(boss, bullet) {
      //console.log(bossHealth);
      bulletDestroyed(game, bullet);
      //console.log(bossHealth);
      bossHealth--;
      console.log(bossHealth);

      if (bossHealth <= 0) {
         //console.log(bossHealth);
         boss.destroy();
      }
   },

   // Called with a player bullet hits an enemy
   bulletHitsEnemy: function(bullet, enemy) {
      bulletDestroyed(game, bullet);
      enemyDies(game, enemy);
   },

   // Called with an enemy bullet hits the player
   bulletHitsPlayer: function(player, bullet) {
      bulletDestroyed(game, bullet);
      health--;

      // If player health reaches 0, they die
      if (health == 0) {
         playerDies(game, player, 'BossMap');
         song.stop();
      }
   },

   // Called when any bullet hits the platforms
   bulletHitsWall: function(bullet, walls) {
      bulletDestroyed(game, bullet);
   },

   // Called every 2 seconds by the timer to have the enemies shoot
   enemyGroup: function() {
       if(this.player.x > 1440 && this.player.x < 3934){
          this.shootingEnemies.forEach(this.enemyShoot, this, true);
       }
       if(bossHealth > 0 && this.player.x > 6462){
             this.bossShoot(this.boss);
       }

   },

   enemyShoot: function(enemy) {
      var bullet = new Bullet(game, enemy.x, enemy.y, enemy.direction, 300);
      game.add.existing(bullet);
      this.enemyBullets.add(bullet);
   },

   bossShoot: function(boss) {
      this.boss.animations.play('shoot');
      var bullet = new Bullet(game, boss.x + 10, boss.y + 30, -1, 300);
      game.add.existing(bullet);
      this.enemyBullets.add(bullet);
      var bullet = new Bullet(game, boss.x + 10, boss.y + 65, -1, 300);
      game.add.existing(bullet);
      this.enemyBullets.add(bullet);
      var bullet = new Bullet(game, boss.x + 10, boss.y + 100, -1, 300);
      game.add.existing(bullet);
      this.enemyBullets.add(bullet);
   },

   // render: function() {
   //    game.debug.bodyInfo(this.player, 100, 100, 'black');
   //    game.debug.body(this.player);
   // }

};
