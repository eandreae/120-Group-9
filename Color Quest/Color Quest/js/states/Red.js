// Red color state
var Red = function(game) {};
Red.prototype = {

   // Variables used in Tutorial
   init: function() {
      this.talking = false;
   },

   // Preload the tilemap
   preload: function() {
      game.load.tilemap('layout', 'assets/TileMaps/Red.json', null, Phaser.Tilemap.TILED_JSON);
      game.load.spritesheet('tilesheet', 'assets/TileMaps/color_tiles.png', 32, 32);
   },

   create: function() {
      // Music for Red.
      song.stop();
      song = game.add.audio('action2');
      song.play('', 0, 0.5, true);

      // Background
      game.stage.backgroundColor = backgroundColor;

      // Setting the world bounds
      game.world.setBounds(0, 0, 1024, 1024);

      // set 32-pixel buffer around tiles to avoid collision tunneling
      game.physics.arcade.TILE_BIAS = 32;

      // Create new tilemap
      this.map = game.add.tilemap('layout');
      this.map.addTilesetImage('color_tiles_tileset', 'tilesheet');

      // Handle the text customization and health GUI
      var styleDescription = {
         font: '18px Arial',
         fill: '#000000',
         align: 'center',
         fontWeight: 'bold',
         stroke: '#000000',
         strokeThickness: 0
      };

      // Health GUI
      this.healthText = this.add.text(10, 10, "", styleDescription);
      this.healthText.fixedToCamera = true;

      // Position of the NPC text. Set to 1 because it displays textPos 0 elsewhere
      this.textPos = 1;

      // Interact text that appears above things the Player can interact with
      this.interactText = this.add.text(0, 0, "Press Z to interact", styleDescription);
      this.interactText.visible = false;
      this.interactText.anchor.set(0.5);
      this.interactText.fixedToCamera = false;
      this.world.bringToTop(this.interactText);

      // Where the text will be displayed
      this.textArea = this.add.text(0, 0, "", styleDescription);
      this.textArea.anchor.set(0.5);
      this.textArea.fixedToCamera = false;
      this.world.bringToTop(this.textArea);

      // NPC Group
      this.npcs = game.add.group();
      this.npcs.enableBody = true;

      // Handle the group management before loading the levels.
      // The group of shooting enemies.
      this.shootingEnemies = game.add.group();
      this.shootingEnemies.enableBody = true;

      // Bullet groups
      this.playerBullets = game.add.group();
      this.enemyBullets = game.add.group();

      if (redLevel == 0) {
         // The player has just entered the Red level, load Level 0.
         // Load the correct tilemaps for level 0.
         backgroundColor = "#FF9999";
         game.stage.backgroundColor = backgroundColor;
         this.mapLayer = this.map.createLayer('Ground_0');
         this.map.setCollisionBetween(0, 999, true, 'Ground_0');

         // LOADING MAP -------------------------------------------------------
         // Now that the correct level has been loaded, do the rest of the level.
         this.mapLayer.resizeWorld();

         // Load the enemies/NPCs/collectibles for level 0

         // NPCs --------------------------------------------------------------
         this.n1 = new NPC(game, 500, 900);
         game.add.existing(this.n1);
         this.npcs.add(this.n1);

         this.n1Text = new Array();

         this.n1Text[0] = "Howdy! You havin' a good day\nhere in Palette Town?";
         this.n1Text[1] = "Y'know how to move left 'n' right\nwith the arrow keys already. You can\njump with Up, too!";
         this.n1Text[2] = "Why don'tcha talk to the other townsfolk?\nPress Z to interact with 'em,\nor anythin' else!";
         this.n1Text[3] = "";
         // ENEMIES -----------------------------------------------------------
         // enemies 1, 2, and 3 for level 0 of Red.

         // enemy 1
         var e1 = new Enemy(game, 1376, 704, 0);
         game.add.existing(e1);
         this.shootingEnemies.add(e1);

         // enemy 2
         var e2 = new Enemy(game, 2880, 864, 0);
         game.add.existing(e2);
         this.shootingEnemies.add(e2);

         // enemy 3
         var e3 = new Enemy(game, 3296, 672, 0);
         game.add.existing(e3);
         this.shootingEnemies.add(e3);

         // COLLECTIBLES ------------------------------------------------------

         // Red collectable
         bmd = game.add.bitmapData(75, 75);
         bmd.fill(255, 0, 0, 1);
         this.red = game.add.sprite(3680, 832, 'atlas', 'red_color');
         game.physics.arcade.enable(this.red);
      } else if (redLevel == 1) {
         // The player has just entered the Red level 1, load level 1.
         backgroundColor = "#FF9999";
         game.stage.backgroundColor = backgroundColor;
         this.mapLayer = this.map.createLayer('Ground_1');
         this.map.setCollisionBetween(0, 999, true, 'Ground_1');

         // LOADING MAP -------------------------------------------------------
         // Now that the correct level has been loaded, do the rest of the level.
         this.mapLayer.resizeWorld();

         // Load the enemies/NPCs/collectibles for level 1

         // NPCs --------------------------------------------------------------
         this.n2 = new NPC(game, 500, 900);
         game.add.existing(this.n2);
         this.npcs.add(this.n2);

         this.n2Text = new Array();

         this.n2Text[0] = "Howdy! You havin' a good day\nhere in Palette Town?";
         this.n2Text[1] = "Y'know how to move left 'n' right\nwith the arrow keys already. You can\njump with Up, too!";
         this.n2Text[2] = "Why don'tcha talk to the other townsfolk?\nPress Z to interact with 'em,\nor anythin' else!";
         this.n2Text[3] = "";
         // ENEMIES -----------------------------------------------------------
         // enemies 1, 2, and 3 for level 0 of Red.

         // enemy 1
         var e1 = new Enemy(game, 1824, 864, 0);
         game.add.existing(e1);
         this.shootingEnemies.add(e1);

         // enemy 2
         var e2 = new Enemy(game, 2368, 864, 0);
         game.add.existing(e2);
         this.shootingEnemies.add(e2);

         // enemy 3
         var e3 = new Enemy(game, 2848, 704, 0);
         game.add.existing(e3);
         this.shootingEnemies.add(e3);

         // enemy 4
         var e4 = new Enemy(game, 3264, 704, 0);
         game.add.existing(e4);
         this.shootingEnemies.add(e4);

         // COLLECTIBLES ------------------------------------------------------

         // Red collectable
         bmd = game.add.bitmapData(75, 75);
         bmd.fill(255, 0, 0, 1);
         this.red = game.add.sprite(3680, 832, 'atlas', 'red_color');
         game.physics.arcade.enable(this.red);
      } else if (redLevel == 2) {
         // The player has just entered the Red level 2, load level 2.
         backgroundColor = "#FF9999";
         game.stage.backgroundColor = backgroundColor;
         this.mapLayer = this.map.createLayer('Ground_2');
         this.map.setCollisionBetween(0, 999, true, 'Ground_2');

         // LOADING MAP -------------------------------------------------------
         // Now that the correct level has been loaded, do the rest of the level.
         this.mapLayer.resizeWorld();

         // Load the enemies/NPCs/collectibles for level 1

         // NPCs --------------------------------------------------------------

         // ENEMIES -----------------------------------------------------------
         // enemies 1, 2, and 3 for level 0 of Red.

         // enemy 1
         var e1 = new Enemy(game, 1984, 864, 0);
         game.add.existing(e1);
         this.shootingEnemies.add(e1);

         // enemy 2
         var e2 = new Enemy(game, 2240, 768, 0);
         game.add.existing(e2);
         this.shootingEnemies.add(e2);

         // enemy 3
         var e3 = new Enemy(game, 2528, 672, 0);
         game.add.existing(e3);
         this.shootingEnemies.add(e3);

         // enemy 4
         var e4 = new Enemy(game, 3168, 672, 0);
         game.add.existing(e4);
         this.shootingEnemies.add(e4);

         // enemy 5
         var e5 = new Enemy(game, 3360, 800, 0);
         game.add.existing(e5);
         this.shootingEnemies.add(e5);

         // COLLECTIBLES ------------------------------------------------------

         // Red collectable
         bmd = game.add.bitmapData(75, 75);
         bmd.fill(255, 0, 0, 1);
         this.red = game.add.sprite(3680, 832, 'atlas', 'red_color');
         game.physics.arcade.enable(this.red);
      }

      // Adds the player into the level.
      this.player = new Player(game, 64, 800, this.mapLayer);
      game.add.existing(this.player);

      // Camera follows player
      game.camera.follow(this.player);
      game.camera.deadzone = new Phaser.Rectangle(325, 200, 50, 150); // (x,y,width,height)

      // Timer for how often the enemies shoot
      timer = game.time.create(false);
      timer.loop(3500, this.enemyGroup, this);
      timer.start();

      // Timer for when the NPC text automatically goes to the next text
      npcText = game.time.create(false);
   },

   update: function() {
      // Player shoots a bullet for each key press
      if (game.input.keyboard.justPressed(Phaser.Keyboard.X) && hasRed) {
         var bullet = new Bullet(game, this.player.x, this.player.y, direction, 1500);
         game.add.existing(bullet);
         this.playerBullets.add(bullet);
      }

      // If the player isn't overlapping with anything interactable, the interactText is invisible
      if (!game.physics.arcade.overlap(this.player, this.npcs) && !game.physics.arcade.overlap(this.player, this.portals) && !this.talking) {
         this.interactText.visible = false;
      }

      // NPC1 text trigger
      if (game.physics.arcade.overlap(this.player, this.n1) && !this.talking) {
         // Display interact text
         this.setTextPosition(this.interactText, this.n1);
         this.interactText.visible = true;

         if (game.input.keyboard.justPressed(Phaser.Keyboard.Z)) {
            // Timer for npc text
            this.talking = true;
            this.interactText.visible = false;
            this.setTextPosition(this.textArea, this.n1);
            this.textArea.text = this.n1Text[0];
            npcText.loop(3000, this.goThroughText, this, this.n1Text);
            npcText.start();
         }
      }

      // All the collisions needed
      game.physics.arcade.collide(this.enemies, this.mapLayer); // Enemies with platforms
      game.physics.arcade.collide(this.shootingEnemies, this.mapLayer); // Shooting enemies with platforms
      game.physics.arcade.collide(this.npcs, this.mapLayer); // NPCs with the platforms

      // Player with enemies
      if (!injured) {
         if (game.physics.arcade.collide(this.enemies, this.player) || game.physics.arcade.collide(this.shootingEnemies, this.player)) {
            health--;

            // If player health reaches 0, they die
            if (health == 0) {
               song.stop();
               playerDies(game, this.player, 'Tutorial');
            }
         }
      }

      // Player with the Red Upgrade.
      this.physics.arcade.overlap(this.player, this.red, this.collectRed, null, this);

      // Player bullet with enemies
      game.physics.arcade.collide(this.playerBullets, this.enemies, this.bulletHitsEnemy, null, this);
      game.physics.arcade.collide(this.playerBullets, this.shootingEnemies, this.bulletHitsEnemy, null, this);

      // Enemy bullets with player
      if (!injured) game.physics.arcade.collide(this.player, this.enemyBullets, this.bulletHitsPlayer, null, this);

      // Bullets hitting a wall
      game.physics.arcade.collide(this.enemyBullets, this.mapLayer, this.bulletHitsWall, null, this);
      game.physics.arcade.collide(this.playerBullets, this.mapLayer, this.bulletHitsWall, null, this);

      this.healthText.text = health;
   },

   // When the player collects the color at the end of the level.
   collectRed: function(player, color) {
      // increment the level variable upwards.
      redLevel++;

      if (redLevel == 1) {
         // If they have reacehd the last Red level, give them the ability
         // to shoot.
         hasRed = true;
      }

      // Red bdm
      bmd = game.add.bitmapData(18, 18);
      bmd.fill(255, 0, 0, 1);

      // Particles when color is collected
      colorEmitter = game.add.emitter(color.x, color.y, 200);
      colorEmitter.makeParticles(bmd); // red squares used as particles
      colorEmitter.gravity = 0;
      colorEmitter.setScale(.25, .8, .25, .8, 0);
      colorEmitter.setAlpha(.8, 0, 1800); // .8 to .3 alpha
      colorEmitter.setXSpeed(-100, 100); // horizontal speed range
      colorEmitter.setYSpeed(-100, 100); // vertical speed range
      colorEmitter.start(true, 2000, null, 50); // (explode, lifespan, freq, quantity)

      color.kill();
      song.stop();
      game.time.events.add(Phaser.Timer.SECOND * 2, function() {
         if (redLevel == 3) {
            game.state.start('Tutorial')
         } else {
            game.state.start('Red')
         }

      });
   },

   // Called with a player bullet hits an enemy
   bulletHitsEnemy: function(bullet, enemy) {
      bulletDestroyed(game, bullet);
      enemy.destroy();
   },

   // Called with an enemy bullet hits the player
   bulletHitsPlayer: function(player, bullet) {
      bulletDestroyed(game, bullet);
      health--;

      // If player health reaches 0, they die
      if (health == 0) {
         playerDies(game, player, 'Tutorial');
         song.stop();
      }
   },

   // Called when any bullet hits the platforms
   bulletHitsWall: function(bullet, walls) {
      bulletDestroyed(game, bullet);
   },

   // Called every 2 seconds by the timer to have the enemies shoot
   enemyGroup: function() {
      this.shootingEnemies.forEach(this.enemyShoot, this, true);
   },

   enemyShoot: function(enemy) {
      var bullet = new Bullet(game, enemy.x, enemy.y, -1, 300);
      game.add.existing(bullet);
      this.enemyBullets.add(bullet);
   },

   // Sets the position of the interact text and main text to appear above the object
   setTextPosition: function(text, object) {
      text.x = object.x;
      text.y = object.y - 75;
      this.world.bringToTop(text);
   },

   goThroughText: function(text) {
      //The text change with the step
      this.textArea.text = text[this.textPos];

      //The step increase
      this.textPos = this.textPos + 1;
      this.world.bringToTop(this.textArea);

      // When finished through the dialog
      if (this.textPos == text.length) {
         npcText.stop();
         this.talking = false;
         this.textPos = 1;
      }
   },

   render: function() {
      game.debug.bodyInfo(this.player, 100, 100, 'black');
      game.debug.body(this.player);
   }
};
