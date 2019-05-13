// BossMap state
var BossMap = function(game) {};
BossMap.prototype = {

   // Variables used in Boss
   init: function() {

   },

   preload: function() {
      console.log('BossMap: preload');

      game.load.tilemap('layout', 'assets/TileMaps/BossMap.json', null, Phaser.Tilemap.TILED_JSON);
      game.load.spritesheet('tilesheet', 'assets/TileSheets/tilesheet_1.png', 32, 32);
   },

   create: function() {
      console.log('BossMap: create');

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

      // Adds the player into the state
      this.player = new Player(game, 64, 825, this.mapLayer);
      game.add.existing(this.player);

      // Bullet groups
      this.playerBullets = game.add.group();

      // Camera follows player
      game.camera.follow(this.player);
      game.camera.deadzone = new Phaser.Rectangle(325, 200, 50, 150); // (x,y,width,height)

      // Add KC
      this.boss = new Boss(game, 800, 800);
      game.add.existing(this.boss);
      this.boss.enableBody = true;
   },

   update: function() {
      //console.log('BossMap: update');
      if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
         game.state.start('GameOver');
      }
      // Player shoots a bullet for each key press
      if (game.input.keyboard.justPressed(Phaser.Keyboard.X) && hasRed) {
         var bullet = new Bullet(game, this.player.x, this.player.y, direction, .4, 1500);
         game.add.existing(bullet);
         this.playerBullets.add(bullet);
      }

      // Bullet collision for CK
      game.physics.arcade.collide(this.playerBullets, this.boss, bulletHitsBoss, null, this);

      function bulletHitsBoss(bullet, boss) {
         bullet.destroy();
         boss.destroy();
      }
   }
};
