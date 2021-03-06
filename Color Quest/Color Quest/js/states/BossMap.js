// BossMap state
var shootSFX;
var enemyShootSFX;
var hurtSFX;
var enemyDiesSFX;
var enterSFX;
var kingColorLaugh;
var kingColorHurt;
var kingColorDies;
var kingColorShoot;
var BossMap = function(game) {};
BossMap.prototype = {

   // Variables used in Boss
   init: function() {
      health = 5;
      injured = false;
      bossHealth = 15;
   },

   preload: function() {

      game.load.tilemap('layout', 'assets/TileMaps/KingColor.json', null, Phaser.Tilemap.TILED_JSON);
      game.load.spritesheet('tilesheet', 'assets/TileMaps/color_tiles_2.png', 32, 32);

      shootSFX = game.add.audio('shoot');
      enemyShootSFX = game.add.audio('enemyShoot');
      hurtSFX = game.add.audio('hurt');
      enemyDiesSFX = game.add.audio('enemyDies');
      enterSFX = game.add.audio('enter');
      kingColorLaugh = game.add.audio('KC_laugh');
      kingColorHurt = game.add.audio('KC_hurt');
      kingColorDies = game.add.audio('KC_dies');
      kingColorShoot = game.add.audio('KC_shoot');

   },

   create: function() {
      // Background
      background = game.add.image(0, 0, 'bg_boss');
      background.fixedToCamera = true;

      song.stop();
      song = game.add.audio('motivational');
      song.play('', 0, 0.2, true);

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

      pickup = game.add.sprite(7920, 835, 'pickup');
      pickup.anchor.set(0.5);
      pickup.scale.set(0.1);
      game.physics.arcade.enable(pickup);

      // Handle the group management before loading the levels.
      // The group of shooting enemies.
      this.shootingEnemies = game.add.group();
      this.shootingEnemies.enableBody = true;

      // The group of jumping enemies.
      this.jumpingEnemies = game.add.group();
      this.jumpingEnemies.enableBody = true;

      // The group of dashing enemies.
      this.dashingEnemies = game.add.group();
      this.dashingEnemies.enableBody = true;

      // Adds the player into the state
      this.player = new Player(game, 64, 1340, this.mapLayer);
      game.add.existing(this.player);

      this.hpSprite = game.add.sprite(20, 20, 'hp_palette');
      this.hpSprite.fixedToCamera = true;

      this.hpSprite.animations.add('0', [0], 10, true);
      this.hpSprite.animations.add('1', [1], 10, true);
      this.hpSprite.animations.add('2', [2], 10, true);
      this.hpSprite.animations.add('3', [3], 10, true);
      this.hpSprite.animations.add('4', [4], 10, true);
      this.hpSprite.animations.add('5', [5], 10, true);

      this.hpSprite.scale.x = 1.2;
      this.hpSprite.scale.y = 1.2;

      // Bullet groups
      this.playerBullets = game.add.group();
      this.enemyBullets = game.add.group();

      // Camera follows player
      game.camera.follow(this.player);
      game.camera.deadzone = new Phaser.Rectangle(325, 200, 50, 150); // (x,y,width,height)

      // NPCs --------------------------------------------------------------

      // ENEMIES -----------------------------------------------------------
      // Shooting enemies for the final level.

      // Enemy 1 (Shooting)
      var e1 = new Enemy(game, 2928, 1120, 0);
      game.add.existing(e1);
      this.shootingEnemies.add(e1);

      // Enemy 2 (Shooting)
      var e2 = new Enemy(game, 3040, 1214, 0);
      game.add.existing(e2);
      this.shootingEnemies.add(e2);

      // Enemy 3 (Shooting)
      var e3 = new Enemy(game, 3168, 992, 0);
      game.add.existing(e3);
      this.shootingEnemies.add(e3);

      // Enemy 4 (Dashing)
      var e4 = new Enemy(game, 1120, 1344, 100, true, false);
      game.add.existing(e4);
      this.dashingEnemies.add(e4);

      // Enemy 5 (Dashing)
      var e5 = new Enemy(game, 1344, 1344, 100, true, false);
      game.add.existing(e5);
      this.dashingEnemies.add(e5);

      // Enemy 6 (Jumping)
      var e6 = new Enemy(game, 3859, 1024, 0, false, true);
      game.add.existing(e6);
      this.jumpingEnemies.add(e6);

      // Enemy 7 (Jumping)
      var e7 = new Enemy(game, 4145, 929, 0, false, true);
      game.add.existing(e7);
      this.jumpingEnemies.add(e7);

      // Enemy 8 (Jumping)
      var e8 = new Enemy(game, 4368, 1216, 0, false, true);
      game.add.existing(e8);
      this.jumpingEnemies.add(e8);

      // Add KC
      this.boss = new Boss(game, 7774, 675, 0);
      game.add.existing(this.boss);
      this.boss.enableBody = true;

      // Timer for how often the enemies shoot
      enemyShootTimer = game.time.create(false);
      enemyShootTimer.loop(3500, this.enemyGroup, this);
      enemyShootTimer.start();
   },

   update: function() {

      this.boss.tint = 0xFFFFFF;

      // Player shoots a bullet for each key press
      if (game.input.keyboard.justPressed(Phaser.Keyboard.X) && hasRed && !playerDead) {
         var bullet = new Bullet(game, this.player.x, this.player.y, direction, playerBulletSpeed);
         shootSFX.play('', 0, 0.2, false);
         game.add.existing(bullet);
         this.playerBullets.add(bullet);
      }

      // All the collisions needed
      game.physics.arcade.collide(this.enemies, this.mapLayer); // Enemies with platforms
      game.physics.arcade.collide(this.shootingEnemies, this.mapLayer); // Shooting enemies with platforms
      game.physics.arcade.collide(this.dashingEnemies, this.mapLayer); // Dashing enemies with platforms
      game.physics.arcade.collide(this.jumpingEnemies, this.mapLayer); // Jumping enemies with platforms
      game.physics.arcade.collide(this.npcs, this.mapLayer); // NPCs with the platforms
      game.physics.arcade.overlap(pickup, this.player, this.playerGetsPickup, null, this); // Player with post-boss pickup

      // Player with enemies
      if (!injured) {
         if (game.physics.arcade.collide(this.enemies, this.player) || game.physics.arcade.collide(this.shootingEnemies, this.player) || game.physics.arcade.collide(this.dashingEnemies, this.player) || game.physics.arcade.collide(this.jumpingEnemies, this.player)) {
            health--;

            // If player health reaches 0, they die
            if (health == 0) {
               song.stop();
               hurtSFX.play('', 0, 0.5, false);
               playerDies(game, this.player, 'BossMap');
            }
         }
      }

      // Player with boss
      if (!injured) {
         if (game.physics.arcade.collide(this.boss, this.player)) {
            health--;

            // If player health reaches 0, they die
            if (health == 0) {
               song.stop();
               hurtSFX.play('', 0, 0.5, false);
               playerDies(game, this.player, 'BossMap');
            }
         }
      }

      // Player bullet with enemies
      game.physics.arcade.collide(this.playerBullets, this.enemies, this.bulletHitsEnemy, null, this);
      game.physics.arcade.collide(this.playerBullets, this.shootingEnemies, this.bulletHitsEnemy, null, this);
      game.physics.arcade.collide(this.playerBullets, this.jumpingEnemies, this.bulletHitsEnemy, null, this);
      game.physics.arcade.collide(this.playerBullets, this.dashingEnemies, this.bulletHitsEnemy, null, this);

      // Enemy bullets with player
      if (!injured) game.physics.arcade.collide(this.player, this.enemyBullets, this.bulletHitsPlayer, null, this);

      // Bullets hitting a wall
      game.physics.arcade.collide(this.enemyBullets, this.mapLayer, this.bulletHitsWall, null, this);
      game.physics.arcade.collide(this.playerBullets, this.mapLayer, this.bulletHitsWall, null, this);

      // Bullet collision for CK
      game.physics.arcade.collide(this.playerBullets, this.boss, this.bulletHitsBoss, null, this);

      // Player dying when falling into pit
      if(this.player.y >= 1475){
          if(health > 0){
             playerDies(game, this.player, 'BossMap');
             hurtSFX.play('', 0, 0.5, false);
             health = 0;
             song.stop();
          }
      }

      if (health == 0) this.hpSprite.animations.play('0');
      else if (health == 1) this.hpSprite.animations.play('1');
      else if (health == 2) this.hpSprite.animations.play('2');
      else if (health == 3) this.hpSprite.animations.play('3');
      else if (health == 4) this.hpSprite.animations.play('4');
      else this.hpSprite.animations.play('5');
   },

   // Health loss and death for CK upon bullet collision
   bulletHitsBoss: function(boss, bullet) {
      bulletDestroyed(game, bullet);
      bossHealth--;
      kingColorHurt.play('', 0, 0.8, false);
      boss.tint = 0xFF0000;

      if (bossHealth <= 0) {
          kingColorDies.play('', 0, 1, false);
         bossDefeated = true;
         boss.destroy();
      }
   },

   // Called with a player bullet hits an enemy
   bulletHitsEnemy: function(bullet, enemy) {
      bulletDestroyed(game, bullet);
      enemyDiesSFX.play('', 0, 0.5, false);
      enemyDies(game, enemy);
   },

   // Called with an enemy bullet hits the player
   bulletHitsPlayer: function(player, bullet) {
      bulletDestroyed(game, bullet);
      health--;

      // If player health reaches 0, they die
      if (health == 0) {
         playerDies(game, player, 'BossMap');
         hurtSFX.play('', 0, 0.5, false);
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
      enemyShootSFX.play('', 0, 0.2, false);
      game.add.existing(bullet);
      this.enemyBullets.add(bullet);
   },

   // Boss shooting bullets
   bossShoot: function(boss) {
      this.boss.animations.play('shoot');
      kingColorShoot.play('', 0, 0.8, false);
      kingColorLaugh.play('', 0, 0.5, false);
      var bullet = new Bullet(game, boss.x + 24, boss.y + 85, -1, 300);
      game.add.existing(bullet);
      this.enemyBullets.add(bullet);
      var bullet = new Bullet(game, boss.x + 24, boss.y + 130, -1, 300);
      game.add.existing(bullet);
      this.enemyBullets.add(bullet);
      var bullet = new Bullet(game, boss.x + 24, boss.y + 175, -1, 300);
      game.add.existing(bullet);
      this.enemyBullets.add(bullet);
   },

   // Player picking up the item dropped by king color
   playerGetsPickup: function(pickup, player){
      if(bossHealth <= 0){
        enterSFX.play('', 0, 1, false);
        song.stop();
        pickup.destroy();
        game.time.events.add(Phaser.Timer.SECOND * 2, function() {
            game.state.start('Tutorial');
        });
        }
    },

   // render: function() {
   //    game.debug.bodyInfo(this.player, 100, 100, 'black');
   //    game.debug.body(this.player);
   // }

};
