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
      game.camera.deadzone = new Phaser.Rectangle(325, 0, 50, game.height); // (x,y,width,height)

      timer = game.time.create(false);
      timer.loop(2000, this.enemyGroup, this);
      timer.start();
   },

   update: function() {
      //console.log('Tutorial: update');

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

      game.physics.arcade.collide(this.enemies, this.platforms);
      game.physics.arcade.collide(this.shootingEnemies, this.platforms);
      if (game.physics.arcade.collide(this.enemies, this.player) || game.physics.arcade.collide(this.shootingEnemies, this.player)) {
         this.playerDies(this.player);
      }
      game.physics.arcade.collide(this.playerBullets, this.enemies, bulletHitsEnemy, null, this)
      game.physics.arcade.collide(this.playerBullets, this.shootingEnemies, bulletHitsEnemy, null, this)
      game.physics.arcade.collide(this.enemyBullets, this.player, bulletHitsPlayer, null, this)

      this.physics.arcade.overlap(this.player, this.red, collectRed, null, this);
      this.physics.arcade.overlap(this.player, this.yellow, collectYellow, null, this);
      this.physics.arcade.overlap(this.player, this.blue, collectBlue, null, this);

      function bulletHitsEnemy(bullet, enemy) {
         bullet.destroy();
         enemy.destroy();
      }

      function bulletHitsPlayer(bullet, player) {
         bullet.destroy();
         this.playerDies(player);
      }

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

      function playerDies(player) {

         bmd = game.add.bitmapData(18, 18);
         bmd.fill(255, 0, 0, 1);

         deathEmitter = game.add.emitter(player.x, player.y, 200);
         deathEmitter.makeParticles(bmd);		        // red squares used as particles
         deathEmitter.gravity = 0;
         deathEmitter.setScale(.25, .8, .25, .8, 0);
         deathEmitter.setAlpha(.8, 0, 1800); 	      // .8 to .3 alpha
   		deathEmitter.setXSpeed(-100,100);			   // horizontal speed range
   		deathEmitter.setYSpeed(-100,100);			   // vertical speed range
   		deathEmitter.start(true, 2000, null, 50);	   // (explode, lifespan, freq, quantity)

         player.destroy();
         game.time.events.add(Phaser.Timer.SECOND * 2, function() { game.state.start('GameOver')});
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

   playerDies: function(player) {

      bmd = game.add.bitmapData(18, 18);
      bmd.fill(255, 0, 0, 1);

      deathEmitter = game.add.emitter(player.x, player.y, 200);
      deathEmitter.makeParticles(bmd);		        // red squares used as particles
      deathEmitter.gravity = 0;
      deathEmitter.setScale(.25, .8, .25, .8, 0);
      deathEmitter.setAlpha(.8, 0, 1800); 	      // .8 to .3 alpha
      deathEmitter.setXSpeed(-100,100);			   // horizontal speed range
      deathEmitter.setYSpeed(-100,100);			   // vertical speed range
      deathEmitter.start(true, 2000, null, 50);	   // (explode, lifespan, freq, quantity)

      player.destroy();
      game.time.events.add(Phaser.Timer.SECOND * 2, function() { game.state.start('GameOver')});
   }
};
