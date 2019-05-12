// Blue color state
var Blue = function(game) {};
Blue.prototype = {

   // Variables used in Blue
   init: function() {

   },

   preload: function() {
      console.log('Blue: preload');

      game.load.tilemap('layout', 'assets/TileMaps/BlueMap.json', null, Phaser.Tilemap.TILED_JSON);
      game.load.spritesheet('tilesheet', 'assets/TileSheets/tilesheet_1.png', 32, 32);
   },

   create: function() {
      console.log('Blue: create');


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
      this.player = new Player(game, 64, 400, this.platforms, hasRed, hasYellow, hasBlue);
      game.add.existing(this.player);

      // Bullet groups
      this.playerBullets = game.add.group();

      // Camera follows player
      game.camera.follow(this.player);
      game.camera.deadzone = new Phaser.Rectangle(325, 0, 50, game.height); // (x,y,width,height)
   },

   update: function() {
      //console.log('Yellow: update');
      if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
         game.state.start('GameOver');
      }
      if (game.input.keyboard.justPressed(Phaser.Keyboard.UP) && this.physics.arcade.overlap(this.player, this.redPortal)) {
         game.state.start('Red');
      }
      if (game.input.keyboard.justPressed(Phaser.Keyboard.UP) && this.physics.arcade.overlap(this.player, this.yellowPortal)) {
         game.state.start('Yellow');
      }
      if (game.input.keyboard.justPressed(Phaser.Keyboard.UP) && this.physics.arcade.overlap(this.player, this.bluePortal)) {
         game.state.start('Blue');
      }

      // Player shoots a bullet for each key press
      if (game.input.keyboard.justPressed(Phaser.Keyboard.X) && hasRed) {
         var bullet = new Bullet(game, this.player.x, this.player.y, direction, .4, 1500);
         game.add.existing(bullet);
         this.playerBullets.add(bullet);
      }
   }
};
