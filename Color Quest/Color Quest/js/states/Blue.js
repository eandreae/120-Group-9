// Blue color state
var Blue = function(game) {};
Blue.prototype = {

   // Variables used in Tutorial
   init: function() {
      this.talking = false;
   },

   // Preload the tilemap
   preload: function() {
      game.load.tilemap('layout', 'assets/TileMaps/Blue.json', null, Phaser.Tilemap.TILED_JSON);
      game.load.spritesheet('tilesheet', 'assets/TileMaps/color_tiles.png', 32, 32);
   },

   create: function() {
      // Music
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
      this.map.addTilesetImage('color_tiles', 'tilesheet');

      // Handle the group management before loading the levels.
      // The group of shooting enemies.
      this.jumpingEnemies = game.add.group();
      this.jumpingEnemies.enableBody = true;

      // Bullet groups
      this.playerBullets = game.add.group();

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

      if (blueLevel == 0) {
         // Loading the correct TileMap.
         backgroundColor = "#72C4FF";
         game.stage.backgroundColor = backgroundColor;
         this.mapLayer = this.map.createLayer('Ground_0');
         this.map.setCollisionBetween(0, 999, true, 'Ground_0');

         // LOADING MAP -------------------------------------------------------
         // Now that the correct level has been loaded, do the rest of the level.
         this.mapLayer.resizeWorld();

         // Load the enemies/NPCs/collectibles for level 0

         // NPCs --------------------------------------------------------------
         this.n1 = new NPC(game, 400, 900);
         game.add.existing(this.n1);
         this.npcs.add(this.n1);

         this.n1Text = new Array();

         this.n1Text[0] = "Howdy! You havin' a good day\nhere in Palette Town?";
         this.n1Text[1] = "Y'know how to move left 'n' right\nwith the arrow keys already. You can\njump with Up, too!";
         this.n1Text[2] = "Why don'tcha talk to the other townsfolk?\nPress Z to interact with 'em,\nor anythin' else!";
         this.n1Text[3] = "";
         // ENEMIES -----------------------------------------------------------
         // Adding the enemies for Level 0.
         // There are 4 jumping enemies in level 0.
         // Represented with e1, e2, e3, e4.

         var e1 = new Enemy(game, 1504, 832, 0, false, true);
         game.add.existing(e1);
         this.jumpingEnemies.add(e1);

         var e2 = new Enemy(game, 2464, 704, 0, false, true);
         game.add.existing(e2);
         this.jumpingEnemies.add(e2);

         var e3 = new Enemy(game, 2944, 576, 0, false, true);
         game.add.existing(e3);
         this.jumpingEnemies.add(e3);

         var e4 = new Enemy(game, 3680, 832, 0, false, true);
         game.add.existing(e4);
         this.jumpingEnemies.add(e4);

         // COLLECTIBLES ------------------------------------------------------

         // Blue collectable
         bmd = game.add.bitmapData(75, 75);
         bmd.fill(0, 0, 255, 1);
         this.blue = game.add.sprite(3968, 832, 'atlas', 'blue_color');
         game.physics.arcade.enable(this.blue);
      } else if (blueLevel == 1) {
         // Loading the correct TileMap.
         backgroundColor = "#72C4FF";
         game.stage.backgroundColor = backgroundColor;
         this.mapLayer = this.map.createLayer('Ground_1');
         this.map.setCollisionBetween(0, 999, true, 'Ground_1');

         // LOADING MAP -------------------------------------------------------
         // Now that the correct level has been loaded, do the rest of the level.
         this.mapLayer.resizeWorld();

         // Load the enemies/NPCs/collectibles for level 0

         // NPCs --------------------------------------------------------------
         this.n2 = new NPC(game, 400, 900);
         game.add.existing(this.n2);
         this.npcs.add(this.n2);

         this.n2Text = new Array();

         this.n2Text[0] = "Howdy! You havin' a good day\nhere in Palette Town?";
         this.n2Text[1] = "Y'know how to move left 'n' right\nwith the arrow keys already. You can\njump with Up, too!";
         this.n2Text[2] = "Why don'tcha talk to the other townsfolk?\nPress Z to interact with 'em,\nor anythin' else!";
         this.n2Text[3] = "";
         // ENEMIES -----------------------------------------------------------
         // Adding the enemies for Level 1.
         // There are 7 jumping enemies in level 1.
         // Represented with e1, e2, e3, e4, e5, e6, e7.

         var e1 = new Enemy(game, 1216, 832, 0, false, true);
         game.add.existing(e1);
         this.jumpingEnemies.add(e1);

         var e2 = new Enemy(game, 1472, 832, 0, false, true);
         game.add.existing(e2);
         this.jumpingEnemies.add(e2);

         var e3 = new Enemy(game, 1728, 832, 0, false, true);
         game.add.existing(e3);
         this.jumpingEnemies.add(e3);

         var e4 = new Enemy(game, 2144, 672, 0, false, true);
         game.add.existing(e4);
         this.jumpingEnemies.add(e4);

         var e5 = new Enemy(game, 2400, 672, 0, false, true);
         game.add.existing(e5);
         this.jumpingEnemies.add(e5);

         var e6 = new Enemy(game, 2656, 672, 0, false, true);
         game.add.existing(e6);
         this.jumpingEnemies.add(e6);

         var e7 = new Enemy(game, 3584, 832, 0, false, true);
         game.add.existing(e7);
         this.jumpingEnemies.add(e7);

         // COLLECTIBLES ------------------------------------------------------

         // Blue collectable
         bmd = game.add.bitmapData(75, 75);
         bmd.fill(0, 0, 255, 1);
         this.blue = game.add.sprite(3968, 832, 'atlas', 'blue_color');
         game.physics.arcade.enable(this.blue);
      } else if (blueLevel == 2) {
         // Loading the correct TileMap.
         backgroundColor = "#72C4FF";
         game.stage.backgroundColor = backgroundColor;
         this.mapLayer = this.map.createLayer('Ground_2');
         this.map.setCollisionBetween(0, 999, true, 'Ground_2');

         // LOADING MAP -------------------------------------------------------
         // Now that the correct level has been loaded, do the rest of the level.
         this.mapLayer.resizeWorld();

         // Load the enemies/NPCs/collectibles for level 0

         // NPCs --------------------------------------------------------------

         // ENEMIES -----------------------------------------------------------
         // Adding the enemies for Level 2.
         // There are 8 jumping enemies in level 2.
         // Represented with e1, e2, e3, e4, e5, e6, e7, e8.

         var e1 = new Enemy(game, 1088, 832, 0, false, true);
         game.add.existing(e1);
         this.jumpingEnemies.add(e1);

         var e2 = new Enemy(game, 1728, 832, 0, false, true);
         game.add.existing(e2);
         this.jumpingEnemies.add(e2);

         var e3 = new Enemy(game, 1760, 320, 0, false, true);
         game.add.existing(e3);
         this.jumpingEnemies.add(e3);

         var e4 = new Enemy(game, 2304, 832, 0, false, true);
         game.add.existing(e4);
         this.jumpingEnemies.add(e4);

         var e5 = new Enemy(game, 2592, 832, 0, false, true);
         game.add.existing(e5);
         this.jumpingEnemies.add(e5);

         var e6 = new Enemy(game, 3040, 320, 0, false, true);
         game.add.existing(e6);
         this.jumpingEnemies.add(e6);

         var e7 = new Enemy(game, 3424, 320, 0, false, true);
         game.add.existing(e7);
         this.jumpingEnemies.add(e7);

         var e8 = new Enemy(game, 3968, 832, 0, false, true);
         game.add.existing(e8);
         this.jumpingEnemies.add(e8);

         // COLLECTIBLES ------------------------------------------------------

         // Blue collectable
         bmd = game.add.bitmapData(75, 75);
         bmd.fill(0, 0, 255, 1);
         this.blue = game.add.sprite(3776, 320, 'atlas', 'blue_color');
         game.physics.arcade.enable(this.blue);
      }

      // Adds the player into the state
      this.player = new Player(game, 64, 832, this.mapLayer);
      game.add.existing(this.player);

      // Camera follows player
      game.camera.follow(this.player);
      game.camera.deadzone = new Phaser.Rectangle(325, 200, 50, 150); // (x,y,width,height)

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

      // NPC2 text trigger
      if (game.physics.arcade.overlap(this.player, this.n2) && !this.talking) {
         // Display interact text
         this.setTextPosition(this.interactText, this.n2);
         this.interactText.visible = true;

         if (game.input.keyboard.justPressed(Phaser.Keyboard.Z)) {
            // Timer for npc text
            this.talking = true;
            this.interactText.visible = false;
            this.setTextPosition(this.textArea, this.n2);
            this.textArea.text = this.n2Text[0];
            npcText.loop(3000, this.goThroughText, this, this.n2Text);
            npcText.start();
         }
      }

      // Collisions.
      game.physics.arcade.collide(this.jumpingEnemies, this.mapLayer); // Enemies with platforms
      game.physics.arcade.collide(this.npcs, this.mapLayer); // NPCs with the platforms

      // Player bullet with enemies
      game.physics.arcade.collide(this.playerBullets, this.enemies, this.bulletHitsEnemy, null, this);
      game.physics.arcade.collide(this.playerBullets, this.shootingEnemies, this.bulletHitsEnemy, null, this);

      // Bullets hitting a wall
      game.physics.arcade.collide(this.enemyBullets, this.mapLayer, this.bulletHitsWall, null, this);
      game.physics.arcade.collide(this.playerBullets, this.mapLayer, this.bulletHitsWall, null, this);

      // Collision between the player and the enemies.
      if (!injured) {
         if (game.physics.arcade.collide(this.jumpingEnemies, this.player)) {
            health--;

            // If player health reaches 0, they die
            if (health == 0) {
               song.stop();
               playerDies(game, this.player, 'Blue');
            }
         }
      }

      // For when the player collects the blue upgrade.
      this.physics.arcade.overlap(this.player, this.blue, this.collectBlue, null, this);

      this.healthText.text = health;
   },

   // When the player collects the color
   collectBlue: function(player, color) {
      hasBlue = true;
      blueLevel++;

      // Blue bdm
      bmd = game.add.bitmapData(18, 18);
      bmd.fill(0, 0, 255, 1);

      // Particles when color is collected
      colorEmitter = game.add.emitter(color.x, color.y, 200);
      colorEmitter.makeParticles(bmd); // red squares used as particles
      colorEmitter.gravity = 0;
      colorEmitter.setScale(.25, .8, .25, .8, 0);
      colorEmitter.setAlpha(.8, 0, 1800); // .8 to .3 alpha
      colorEmitter.setXSpeed(-100, 100); // horizontal speed range
      colorEmitter.setYSpeed(-100, 100); // vertical speed range
      colorEmitter.start(true, 2000, null, 50); // (explode, lifespan, freq, quantity)

      color.destroy();
      game.time.events.add(Phaser.Timer.SECOND * 2, function() {
         if (blueLevel == 3) {
            game.state.start('Tutorial')
         } else {
            game.state.start('Blue')
         }
      });
   },

   // Called with a player bullet hits an enemy
   bulletHitsEnemy: function(bullet, enemy) {
      bulletDestroyed(game, bullet);
      enemy.destroy();
   },

   // Called when any bullet hits the platforms
   bulletHitsWall: function(bullet, walls) {
      bulletDestroyed(game, bullet);
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
