// Tutorial state
// the first level of the game.
var Tutorial = function(game) {};
Tutorial.prototype = {

   // Variables used in Tutorial
   init: function() {

   },

   preload: function() {
      console.log('Tutorial: preload');

      game.load.tilemap('layout', 'assets/TileMaps/TutorialMap.json', null, Phaser.Tilemap.TILED_JSON);
      game.load.spritesheet('tilesheet', 'assets/TileSheets/tilesheet_1.png', 32, 32);
   },

   create: function() {
      console.log('Tutorial: create');

      song.play('', 0, 1, true);

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

      // Red portal
      if (!hasRed) {
         bmd = game.add.bitmapData(100, 100);
         bmd.fill(255, 0, 0, 1);
         this.redPortal = game.add.sprite(300, 825, 'atlas', 'red_color');
         game.physics.arcade.enable(this.redPortal);
      }

      // Yellow portal
      if (!hasYellow) {
         bmd = game.add.bitmapData(100, 100);
         bmd.fill(255, 255, 0, 1);
         this.yellowPortal = game.add.sprite(500, 825, 'atlas', 'yellow_color');
         game.physics.arcade.enable(this.yellowPortal);
      }

      // Blue portal
      if (!hasBlue) {
         bmd = game.add.bitmapData(100, 100);
         bmd.fill(0, 0, 255, 1);
         this.bluePortal = game.add.sprite(700, 825, 'atlas', 'blue_color');
         game.physics.arcade.enable(this.bluePortal);
      }

      // Adds the player into the state
      this.player = new Player(game, 64, 825, this.mapLayer);
      game.add.existing(this.player);

      this.enemies = game.add.group();
      this.enemies.enableBody = true;
      this.shootingEnemies = game.add.group();
      this.shootingEnemies.enableBody = true;

      var e1 = new Enemy(game, 500, 300, -20);
      game.add.existing(e1);
      this.enemies.add(e1);

      var e2 = new Enemy(game, 900, 300, 0);
      game.add.existing(e2);
      this.shootingEnemies.add(e2);

      // Bullet groups
      this.playerBullets = game.add.group();
      this.enemyBullets = game.add.group();

      // Camera follows player
      game.camera.follow(this.player);
      game.camera.deadzone = new Phaser.Rectangle(325, 200, 50, 150); // (x,y,width,height)

      timer = game.time.create(false);
      timer.loop(2000, this.enemyGroup, this);
      timer.start();
   },

   update: function() {
      //console.log('Tutorial: update');
      if (!hasRed) {
         if (game.input.keyboard.justPressed(Phaser.Keyboard.UP) && this.physics.arcade.overlap(this.player, this.redPortal)) {
            game.state.start('Red');
         }
      }

      if (!hasYellow) {
         if (game.input.keyboard.justPressed(Phaser.Keyboard.UP) && this.physics.arcade.overlap(this.player, this.yellowPortal)) {
            game.state.start('Yellow');
         }
      }

      if (!hasBlue) {
         if (game.input.keyboard.justPressed(Phaser.Keyboard.UP) && this.physics.arcade.overlap(this.player, this.bluePortal)) {
            game.state.start('Blue');
         }
      }

      if (game.input.keyboard.justPressed(Phaser.Keyboard.P)) {
         game.state.start('Purple');
      }

      // Player shoots a bullet for each key press
      if (game.input.keyboard.justPressed(Phaser.Keyboard.X) && hasRed) {
         var bullet = new Bullet(game, this.player.x, this.player.y, direction, .4, 1500);
         game.add.existing(bullet);
         this.playerBullets.add(bullet);
      }

      game.physics.arcade.collide(this.enemies, this.mapLayer);
      game.physics.arcade.collide(this.shootingEnemies, this.mapLayer);
      if (game.physics.arcade.collide(this.enemies, this.player) || game.physics.arcade.collide(this.shootingEnemies, this.player)) {
         song.stop();
         playerDies(game, this.player);
      }
      game.physics.arcade.collide(this.playerBullets, this.enemies, bulletHitsEnemy, null, this)
      game.physics.arcade.collide(this.playerBullets, this.shootingEnemies, bulletHitsEnemy, null, this)
      game.physics.arcade.collide(this.enemyBullets, this.player, bulletHitsPlayer, null, this)



      function bulletHitsEnemy(bullet, enemy) {
         bullet.destroy();
         enemy.destroy();
      }

      function bulletHitsPlayer(bullet, player) {
         bullet.destroy();
         song.stop();
         playerDies(game, player);
      }
   },

   enemyGroup: function() {
      this.shootingEnemies.forEach(this.enemyShoot, this, true);
   },

   enemyShoot: function(enemy) {
      var bullet = new Bullet(game, enemy.x, enemy.y, -1, .4, 1500);
      game.add.existing(bullet);
      this.enemyBullets.add(bullet);
   },
};
