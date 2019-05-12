// Red color state
var Red = function(game) {};
Red.prototype = {

   // Variables used in Red
   init: function() {

   },

   preload: function() {
      console.log('Red: preload');
   },

   create: function() {
      console.log('Red: create');
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
      //console.log('Red: update');
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
