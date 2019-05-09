// Yellow color state
var Yellow = function(game) {};
Yellow.prototype = {

   // Variables used in Yellow
   init: function() {

   },

   preload: function() {
      console.log('Yellow: preload');
   },

   create: function() {
      console.log('Yellow: create');
      // Background
      game.stage.backgroundColor = "#0c4196";

      // Setting the world bounds
      game.world.setBounds(0, 0, 1800, 600);

      // Group contains the ground and platforms
      this.platforms = game.add.group();
      this.platforms.enableBody = true; // Enables physics for platform objects

      // Ground
      this.ground = this.platforms.create(0, game.height - 64, 'ground');
      this.ground.scale.setTo(30, 2);
      this.ground.body.immovable = true; // Prevents it from moving

      // Red square
      bmd = game.add.bitmapData(100, 100);
      bmd.fill(255, 0, 0, 1);
      this.red = game.add.sprite(500, 450, bmd);
      game.physics.arcade.enable(this.red);

      // Red square
      bmd = game.add.bitmapData(100, 100);
      bmd.fill(255, 255, 0, 1);
      this.yellow = game.add.sprite(800, 450, bmd);
      game.physics.arcade.enable(this.yellow);

      // Red square
      bmd = game.add.bitmapData(100, 100);
      bmd.fill(0, 0, 255, 1);
      this.blue = game.add.sprite(1100, 450, bmd);
      game.physics.arcade.enable(this.blue);

      // Adds the player into the state
      this.player = new Player(game, this.platforms, true, true, true);
      game.add.existing(this.player);

      // Camera follows player
      game.camera.follow(this.player);
      game.camera.deadzone = new Phaser.Rectangle(325, 0, 50, game.height); // (x,y,width,height)
   },

   update: function() {
      //console.log('Yellow: update');
      if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
         game.state.start('GameOver');
      }
      if (game.input.keyboard.justPressed(Phaser.Keyboard.UP) && this.physics.arcade.overlap(this.player, this.red)) {
         game.state.start('Red');
      }
      if (game.input.keyboard.justPressed(Phaser.Keyboard.UP) && this.physics.arcade.overlap(this.player, this.yellow)) {
         game.state.start('Yellow');
      }
      if (game.input.keyboard.justPressed(Phaser.Keyboard.UP) && this.physics.arcade.overlap(this.player, this.blue)) {
         game.state.start('Blue');
      }

   }
};
