// Purple color state
var Purple = function(game) {};
Purple.prototype = {

   // Variables used in Purple
   init: function() {

   },

   preload: function() {
      console.log('Purple: preload');

      game.load.tilemap('layout', 'assets/TileMaps/RedMap.json', null, Phaser.Tilemap.TILED_JSON);
      game.load.spritesheet('tilesheet', 'assets/TileSheets/tilesheet_1.png', 32, 32);
   },

   create: function() {
      console.log('Purple: create');
      game.physics.startSystem(Phaser.Physics.ARCADE);
      //game.physics.arcade.gravity.y = this.GRAVITY;

      // set 32-pixel buffer around tiles to avoid collision tunneling
      game.physics.arcade.TILE_BIAS = 32;

      // Background
      game.stage.backgroundColor = "#D3D3D3";

      // Setting the world bounds
      game.world.setBounds(0, 0, 1024, 1024);

      // Create new tilemap
      this.map = game.add.tilemap('layout');
      this.map.addTilesetImage('ColorQuestTileSheet_1', 'tilesheet');
      this.map.setCollisionByExclusion([]);
      this.mapLayer = this.map.createLayer('Tile Layer 1');
      this.mapLayer.resizeWorld();

      // Adds the player into the state
      this.player = new Player(game, 64, 400, this.mapLayer, hasRed, hasYellow, hasBlue);
      game.add.existing(this.player);

      // Bullet groups
      this.playerBullets = game.add.group();

      // Camera follows player
      game.camera.follow(this.player);
      game.camera.deadzone = new Phaser.Rectangle(325, 200, 50, 300); // (x,y,width,height)
   },

   update: function() {
      //console.log('Red: update');
      if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
         game.state.start('GameOver');
      }
      // Player shoots a bullet for each key press
      if (game.input.keyboard.justPressed(Phaser.Keyboard.X) && hasRed) {
         var bullet = new Bullet(game, this.player.x, this.player.y, direction, .4, 1500);
         game.add.existing(bullet);
         this.playerBullets.add(bullet);
      }
   }
};
