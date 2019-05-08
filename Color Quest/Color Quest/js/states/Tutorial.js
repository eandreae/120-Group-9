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
      game.stage.backgroundColor = "#0c4196";

      // Setting the world bounds
		game.world.setBounds(0, 0, 1800, 600);

      // Group contains the ground and platforms
      this.platforms = game.add.group();
      this.platforms.enableBody = true;  // Enables physics for platform objects

      // Ground
      this.ground = this.platforms.create(0, game.height - 64, 'ground');
      this.ground.scale.setTo(30, 2);
      // this.ground.scale.x = 0.05;
      // this.ground.scale.y = 0.05;
      this.ground.body.immovable = true;  // Prevents it from moving

      // Adds the player into the state
      this.player = new Player(game, this.platforms);
      game.add.existing(this.player);

      // Camera follows player
		game.camera.follow(this.player);
      game.camera.deadzone = new Phaser.Rectangle(325, 0, 50, game.height);   // (x,y,width,height)
   },

   update: function() {
      //console.log('Tutorial: update');
       if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
           game.state.start('GameOver');
       }
       if(game.input.keyboard.isDown(Phaser.Keyboard.R)){
           game.state.start('Red');
       }
       if(game.input.keyboard.isDown(Phaser.Keyboard.Y)){
           game.state.start('Yellow');
       }
       if(game.input.keyboard.isDown(Phaser.Keyboard.B)){
           game.state.start('Blue');
       }

       if(game.input.keyboard.isDown(Phaser.Keyboard.X)){
           this.shootBullet(this.player.x, this.player.y);
       }
   },

   // construct new Bullet object, add it to the game world, and add it to the group
   shootBullet: function(x, y) {
		var bullet = new Bullet(game, x, y, true);
		game.add.existing(bullet);
	},
};
