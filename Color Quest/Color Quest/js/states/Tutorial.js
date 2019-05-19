// Tutorial state
// the first level of the game.
var Tutorial = function(game) {};
Tutorial.prototype = {

   // Variables used in Tutorial
   init: function() {
      this.talking = false;
   },

   preload: function() {
      console.log('Tutorial: preload');

      game.load.tilemap('layout', 'assets/TileMaps/Tutorial.json', null, Phaser.Tilemap.TILED_JSON);
      game.load.spritesheet('tilesheet', 'assets/TileSheets/color_tiles.png', 32, 32);
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
      this.map.addTilesetImage('color_tiles_tileset', 'tilesheet');
      this.map.setCollisionByExclusion([]);
      this.mapLayer = this.map.createLayer('Ground');
      this.mapLayer.resizeWorld();

      // set 32-pixel buffer around tiles to avoid collision tunneling
      game.physics.arcade.TILE_BIAS = 32;

      // Red portal
      if (!hasRed) {
         bmd = game.add.bitmapData(100, 100);
         bmd.fill(255, 0, 0, 1);
         this.redPortal = game.add.sprite(2656, 129, 'atlas', 'red_color');
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

      if (hasRed && hasYellow && hasBlue) {
         this.bossPortal = game.add.sprite(900, 825, 'bPortal');
         game.physics.arcade.enable(this.bossPortal);
      }

      this.textPos = 0;

      var styleDescription = {
         font: '18px Arial',
         fill: '#000000',
         align: 'center',
         fontWeight: 'bold',
         stroke: '#000000',
         strokeThickness: 0
      };

      this.healthText = this.add.text(10, 10, "", styleDescription);
      this.healthText.fixedToCamera = true;

      this.interactText = this.add.text(0, 0, "Press Z to interact", styleDescription);
      this.interactText.visible = false;
      this.interactText.anchor.set(0.5);
      this.interactText.fixedToCamera = false;
      this.world.bringToTop(this.interactText);

      this.textArea = this.add.text(0, 0, "", styleDescription);
      this.textArea.anchor.set(0.5);
      this.textArea.fixedToCamera = false;
      this.world.bringToTop(this.textArea);

      this.npcs = game.add.group();
      this.npcs.enableBody = true;

      this.n1 = new NPC(game, 500, 800);
      game.add.existing(this.n1);
      this.npcs.add(this.n1);

      //The array for the text
      this.n1Text = new Array();

      // The text is from Shakespeare's "As You Like It"
      this.n1Text[0] = "Eric was here";
      this.n1Text[1] = "Dlyan was heren't";
      this.n1Text[2] = "Other Eric was heren't";
      this.n1Text[3] = "asfoadnspoasbhgupoifuads\nasdifjpadfnspubpasfas\nhhhhhhhhhhhhhhhhhhhhhh";
      this.n1Text[4] = "";

      this.n2 = new NPC(game, 800, 500);
      game.add.existing(this.n2);
      this.npcs.add(this.n2);

      //The array for the text
      this.n2Text = new Array();

      // The text is from Shakespeare's "As You Like It"
      this.n2Text[0] = "Eric was here 2";
      this.n2Text[1] = "Dlyan was heren't 2";
      this.n2Text[2] = "Other Eric was heren't 2";
      this.n2Text[3] = "asfoadnspoasbhgupoifuads\nasdifjpadfnspubpasfas\nhhhhhhhhhhhhhhhhhhhhhh 2";
      this.n2Text[4] = "";

      // Adds the player into the state
      this.player = new Player(game, 64, 825, this.mapLayer);
      game.add.existing(this.player);

      // The enemy groups
      this.enemies = game.add.group();
      this.enemies.enableBody = true;
      this.shootingEnemies = game.add.group();
      this.shootingEnemies.enableBody = true;

      // // Place a moving enemy
      // var e1 = new Enemy(game, 500, 300, -50);
      // game.add.existing(e1);
      // this.enemies.add(e1);
      //
      // // Place a shooting enemy
      var e2 = new Enemy(game, 900, 300, 0);
      game.add.existing(e2);
      this.shootingEnemies.add(e2);

      // Bullet groups
      this.playerBullets = game.add.group();
      this.enemyBullets = game.add.group();

      // Camera follows player
      game.camera.follow(this.player);
      game.camera.deadzone = new Phaser.Rectangle(325, 200, 50, 150); // (x,y,width,height)

      // Timer for how often the enemies shoot
      timer = game.time.create(false);
      timer.loop(2000, this.enemyGroup, this);
      timer.start();

      npcText = game.time.create(false);
   },

   update: function() {
      // Go into the red state
      if (!hasRed) {
         if (game.input.keyboard.justPressed(Phaser.Keyboard.Z) && this.physics.arcade.overlap(this.player, this.redPortal)) {
            game.state.start('Red');
         }
      }

      // Go into the yellow state
      if (!hasYellow) {
         if (game.input.keyboard.justPressed(Phaser.Keyboard.Z) && this.physics.arcade.overlap(this.player, this.yellowPortal)) {
            game.state.start('Yellow');
         }
      }

      // Go into the blue state
      if (!hasBlue) {
         if (game.input.keyboard.justPressed(Phaser.Keyboard.Z) && this.physics.arcade.overlap(this.player, this.bluePortal)) {
            game.state.start('Blue');
         }
      }

      // Go into the boss room
      if (game.input.keyboard.justPressed(Phaser.Keyboard.Z) && this.physics.arcade.overlap(this.player, this.bossPortal)) {
         game.state.start('BossMap');
      }

      // Go to the color wall
      if (game.input.keyboard.justPressed(Phaser.Keyboard.W)) {
         game.state.start('ColorWall');
      }

      // Player shoots a bullet for each key press
      if (game.input.keyboard.justPressed(Phaser.Keyboard.X) && hasRed) {
         var bullet = new Bullet(game, this.player.x, this.player.y, direction, .4, 1500);
         game.add.existing(bullet);
         this.playerBullets.add(bullet);
      }

      if (!game.physics.arcade.overlap(this.player, this.npcs) && !this.talking) {
         this.interactText.visible = false;
      }

      if (game.physics.arcade.overlap(this.player, this.n1) && !this.talking) {
         // Display interact text
         this.setTextPosition(this.interactText, this.n1);
         this.interactText.visible = true;

         if (game.input.keyboard.justPressed(Phaser.Keyboard.Z)) {
            // Timer for npc text
            this.talking = true;
            this.interactText.visible = false;
            this.setTextPosition(this.textArea, this.n1);
            npcText.loop(3000, this.goThroughText, this, this.n1Text);
            npcText.start();
         }
      }

      if (game.physics.arcade.overlap(this.player, this.n2) && !this.talking) {
         // Display interact text
         this.setTextPosition(this.interactText, this.n2);
         this.interactText.visible = true;

         if (game.input.keyboard.justPressed(Phaser.Keyboard.Z)) {
            // Timer for npc text
            this.talking = true;
            this.interactText.visible = false;
            this.setTextPosition(this.textArea, this.n2);
            npcText.loop(3000, this.goThroughText, this, this.n2Text);
            npcText.start();
         }
      }

      // All the collisions needed
      game.physics.arcade.collide(this.enemies, this.mapLayer); // Enemies with platforms
      game.physics.arcade.collide(this.shootingEnemies, this.mapLayer); // Shooting enemies with platforms
      game.physics.arcade.collide(this.npcs, this.mapLayer);

      // Player with enemies
      if (game.physics.arcade.collide(this.enemies, this.player) || game.physics.arcade.collide(this.shootingEnemies, this.player)) {
         health--;
         if (health == 0) {
            song.stop();
            playerDies(game, this.player);
         }
      }

      // Player bullet with enemies
      game.physics.arcade.collide(this.playerBullets, this.enemies, bulletHitsEnemy, null, this);
      game.physics.arcade.collide(this.playerBullets, this.shootingEnemies, bulletHitsEnemy, null, this);

      // Enemy bullets with player
      game.physics.arcade.collide(this.player, this.enemyBullets, bulletHitsPlayer, null, this);

      // Bullets hitting a wall
      game.physics.arcade.collide(this.enemyBullets, this.mapLayer, bulletHitsWall, null, this);
      game.physics.arcade.collide(this.playerBullets, this.mapLayer, bulletHitsWall, null, this);

      this.healthText.text = health;

      function bulletHitsEnemy(bullet, enemy) {
         bulletDestroyed(game, bullet);
         enemy.destroy();
      }

      function bulletHitsPlayer(player, bullet) {
         bulletDestroyed(game, bullet);
         health--;
         if (health == 0) {
            playerDies(game, player);
            song.stop();
         }
      }

      function bulletHitsWall(bullet, walls) {
         bulletDestroyed(game, bullet);
      }
   },

   // Called every 2 seconds by the timer to have the enemies shoot
   enemyGroup: function() {
      this.shootingEnemies.forEach(this.enemyShoot, this, true);
   },

   enemyShoot: function(enemy) {
      var bullet = new Bullet(game, enemy.x, enemy.y, -1, .4, 350);
      game.add.existing(bullet);
      this.enemyBullets.add(bullet);
   },

   setTextPosition: function(text, object) {
      text.x = object.x;
      text.y = object.y - 75;
      this.world.bringToTop(text);
   },

   goThroughText: function(text) {
      //The text change with the step
      this.textArea.text = text[this.textPos];

      //The step increase
      this.textPos = Math.abs(this.textPos + 1);

      //The text is on top (on Z axis)
      this.world.bringToTop(this.textArea);

      if (this.textPos == text.length) {
         npcText.stop();
         this.talking = false;
         this.textPos = 0;
      }
   },

   render: function() {
      game.debug.bodyInfo(this.player, 100, 100, 'black');
      game.debug.body(this.player);
   }
};
