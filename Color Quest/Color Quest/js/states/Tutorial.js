// Tutorial state
// the first level of the game.
var Tutorial = function(game) {};
Tutorial.prototype = {

   // Variables used in Tutorial
   init: function() {

   },

   preload: function() {
      console.log('Tutorial: preload');
   },

   create: function() {
      console.log('Tutorial: create');

      // Background
      game.stage.backgroundColor = "#000000";

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
      this.redPortal = game.add.sprite(500, 450, bmd);
      game.physics.arcade.enable(this.redPortal);

      // Yellow square
      bmd = game.add.bitmapData(100, 100);
      bmd.fill(255, 255, 0, 1);
      this.yellowPortal = game.add.sprite(800, 450, bmd);
      game.physics.arcade.enable(this.yellowPortal);

      // Blue square
      bmd = game.add.bitmapData(100, 100);
      bmd.fill(0, 0, 255, 1);
      this.bluePortal = game.add.sprite(1100, 450, bmd);
      game.physics.arcade.enable(this.bluePortal);

      // Red collectable
      bmd = game.add.bitmapData(75, 75);
      bmd.fill(255, 0, 0, 1);
      this.red = game.add.sprite(1200, 450, bmd);
      game.physics.arcade.enable(this.red);

      // Yellow collectable
      bmd = game.add.bitmapData(75, 75);
      bmd.fill(255, 255, 0, 1);
      this.yellow = game.add.sprite(1400, 450, bmd);
      game.physics.arcade.enable(this.yellow);

      // Blue collectable
      bmd = game.add.bitmapData(75, 75);
      bmd.fill(0, 0, 255, 1);
      this.blue = game.add.sprite(400, 450, bmd);
      game.physics.arcade.enable(this.blue);

      // Adds the player into the state
      this.player = new Player(game, 64, 400, this.platforms, hasRed, hasYellow, hasBlue);
      game.add.existing(this.player);

      // Camera follows player
      game.camera.follow(this.player);
      game.camera.deadzone = new Phaser.Rectangle(325, 0, 50, game.height); // (x,y,width,height)
   },

   update: function() {
      //console.log('Tutorial: update');
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

      this.physics.arcade.overlap(this.player, this.red, collectRed, null, this);
      this.physics.arcade.overlap(this.player, this.yellow, collectYellow, null, this);
      this.physics.arcade.overlap(this.player, this.blue, collectBlue, null, this);

      function collectRed(player, color) {
         hasRed = true;
         color.destroy();
      }

      function collectYellow(player, color) {
         hasYellow = true;
         color.destroy();
      }

      function collectBlue(player, color) {
         hasBlue = true;
         color.destroy();
      }
   },
};
