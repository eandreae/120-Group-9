// Yellow color state
var Yellow = function(game) {};
Yellow.prototype = {

   // Variables used in Tutorial
   init: function() {
      this.whichNPC;
      talking = false;
		this.stoppedWall = false;
      injured = false;
      health = 5;
   },

   // Preload the tilemap
   preload: function() {
      game.load.tilemap('layout', 'assets/TileMaps/Yellow.json', null, Phaser.Tilemap.TILED_JSON);
      game.load.spritesheet('tilesheet', 'assets/TileMaps/color_tiles.png', 32, 32);
   },

   create: function() {
      // Music
      song.stop();
      song = game.add.audio('action2');
      song.play('', 0, 0.5, true);

      // Background
      background = game.add.image(0, 0, 'bg_yellow');
      background.fixedToCamera = true;

      // Setting the world bounds
      game.world.setBounds(0, 0, 1024, 1024);

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

      // Position of the NPC text.
      this.textPos = 0;

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

      // Background for text
      bmd = game.add.bitmapData(400, 100);
      bmd.fill(255, 255, 255, 1);
      this.behindText = game.add.sprite(0, 0, bmd);
      this.behindText.anchor.set(0.5);
      this.behindText.visible = false;
      this.behindText.alpha = 0.5;

      // NPC Group
      this.npcs = game.add.group();
      this.npcs.enableBody = true;

      // Enemy group
      this.dashingEnemies = game.add.group();
      this.dashingEnemies.enableBody = true;

      // Create new tilemap
      this.map = game.add.tilemap('layout');
      this.map.addTilesetImage('color_tiles_tileset', 'tilesheet');

      // The layers for each yellow level
      if (yellowLevel == 0) {
          // The player has just entered the Yellow level, load Yello level 0.
          // Load the correct tilemaps for level 0.
         this.mapLayer = this.map.createLayer('Ground_0');
         this.map.setCollisionBetween(0, 999, true, 'Ground_0');

         // LOADING MAP -------------------------------------------------------
         // Now that the correct level has been loaded, do the rest of the level.
         this.mapLayer.resizeWorld();

         // Load the enemies/NPCs/collectibles for level 0

         // NPCs --------------------------------------------------------------

         this.n1 = new NPC(game, 416, 800, 'npc_generic_l');
         game.add.existing(this.n1);
         this.npcs.add(this.n1);

         this.n1Text = new Array();

			this.n1Text[0] = "Hey Bucky! It seems the Yellow power is\nbeing kept here, but I sense a trap...";
         this.n1Text[1] = "You may want to get through this area\nas quickly as possible...";
         this.n1Text[2] = "";

         // ENEMIES -----------------------------------------------------------
         // no enemies in Yellow level 0.

         // COLLECTIBLES ------------------------------------------------------

         // Yellow collectable
         bmd = game.add.bitmapData(75, 75);
         bmd.fill(255, 255, 0, 1);
         this.yellow = game.add.sprite(4000, 800, 'upgrade_y');
         game.physics.arcade.enable(this.yellow);

      } else if (yellowLevel == 1) {
          // Level 1 of Yellow.
         this.mapLayer = this.map.createLayer('Ground_1');
         this.map.setCollisionBetween(0, 999, true, 'Ground_1');

         // LOADING MAP -------------------------------------------------------
         // Now that the correct level has been loaded, do the rest of the level.
         this.mapLayer.resizeWorld();

         // Load the enemies/NPCs/collectibles for level 1

         // NPCs --------------------------------------------------------------

         this.n2 = new NPC(game, 416, 608, 'npc_generic_r');
         game.add.existing(this.n2);
         this.npcs.add(this.n2);

         this.n2Text = new Array();

         this.n2Text[0] = "You've recovered some of the Yellow power!";
         this.n2Text[1] = "Press C to dash a short distance foward.";
         this.n2Text[2] = "You can dash as many times as you want\n, but you can only dash once in the air\nbefore touching the ground again.";
			this.n2Text[3] = "";

        // ENEMIES -----------------------------------------------------------
        // no enemies in Yellow level 1.

        // COLLECTIBLES ------------------------------------------------------

        // Yellow collectable
        bmd = game.add.bitmapData(75, 75);
        bmd.fill(255, 255, 0, 1);
        this.yellow = game.add.sprite(4000, 800, 'upgrade_y');
        game.physics.arcade.enable(this.yellow);

      } else if (yellowLevel == 2) {
          // Level 2 of Yellow.
         this.mapLayer = this.map.createLayer('Ground_2');
         this.map.setCollisionBetween(0, 999, true, 'Ground_2');

         // LOADING MAP -------------------------------------------------------
         // Now that the correct level has been loaded, do the rest of the level.
         this.mapLayer.resizeWorld();

         // Load the enemies/NPCs/collectibles for level 1

         // NPCs --------------------------------------------------------------
         // No NPCs in level 2.

         // ENEMIES -----------------------------------------------------------
         // There are 2 enemies in Level 2
         // They are represented by e1 and e2.

         // enemy 1
         var e1 = new Enemy(game, 1920, 800, 100, true, false);
         game.add.existing(e1);
         this.dashingEnemies.add(e1);

         // enemy 2
         var e2 = new Enemy(game, 2336, 800, 100, true, false);
         game.add.existing(e2);
         this.dashingEnemies.add(e2);

         // COLLECTIBLES ------------------------------------------------------

         // Yellow collectable
         bmd = game.add.bitmapData(75, 75);
         bmd.fill(255, 255, 0, 1);
         this.yellow = game.add.sprite(4000, 800, 'upgrade_y');
         game.physics.arcade.enable(this.yellow);

      }

      // set 32-pixel buffer around tiles to avoid collision tunneling
      game.physics.arcade.TILE_BIAS = 32;


      // Adds the player into the state
      if( yellowLevel == 1 ){
          this.player = new Player(game, 64, 608, this.mapLayer);
      }
      else {
          this.player = new Player(game, 64, 800, this.mapLayer);
      }
      game.add.existing(this.player);

      // Bullet groups
      this.playerBullets = game.add.group();

      // Invisible collision to trigger the wall
      bmd = game.add.bitmapData(10, 10000);
      this.x = game.add.sprite(1350, 0, bmd);
      game.physics.arcade.enable(this.x);

      // Wall of death that chases the player when activated
      bmd = game.add.bitmapData(10000, 10000);
      bmd.fill(127, 106, 0, 1);
      this.wall = game.add.sprite(-10100, 0, bmd);
      game.physics.arcade.enable(this.wall);
      this.wall.body.immovable = true;

      // Camera follows player
      game.camera.follow(this.player);
      game.camera.deadzone = new Phaser.Rectangle(325, 200, 50, 150); // (x,y,width,height)

      // Timer for when the NPC text automatically goes to the next text
      npcText = game.time.create(false);
   },

   update: function() {

      // Player shoots a bullet for each key press
      if (game.input.keyboard.justPressed(Phaser.Keyboard.X) && hasRed && !playerDead) {
         var bullet = new Bullet(game, this.player.x, this.player.y, direction, playerBulletSpeed);
         game.add.existing(bullet);
         this.playerBullets.add(bullet);
      }

      // If the player isn't overlapping with anything interactable, the interactText is invisible
      if (!game.physics.arcade.overlap(this.player, this.npcs) && !game.physics.arcade.overlap(this.player, this.portals) || talking) {
         this.interactText.visible = false;
         if (!talking)
            this.behindText.visible = false;
      }

      // NPC1 text trigger
      if (game.physics.arcade.overlap(this.player, this.n1) && !talking) {
         // Display interact text
         this.setTextPosition(this.interactText, this.n1);
         this.interactText.visible = true;

         if (game.input.keyboard.justPressed(Phaser.Keyboard.Z)) {
            // Timer for npc text
            talking = true;
            this.interactText.visible = false;
            this.behindText.visible = true;
            this.setTextPosition(this.textArea, this.n1);
            this.textArea.text = this.n1Text[0];
            this.whichNPC = this.n1Text;
         }
      }

      // NPC2 text trigger
      if (game.physics.arcade.overlap(this.player, this.n2) && !talking) {
         // Display interact text
         this.setTextPosition(this.interactText, this.n2);
         this.interactText.visible = true;

         if (game.input.keyboard.justPressed(Phaser.Keyboard.Z)) {
            // Timer for npc text
            talking = true;
            this.interactText.visible = false;
            this.behindText.visible = true;
            this.setTextPosition(this.textArea, this.n2);
            this.textArea.text = this.n2Text[0];
            this.whichNPC = this.n2Text;
         }
      }

      // Advance the text
      if (talking) {
         if (game.input.keyboard.justPressed(Phaser.Keyboard.Z)) {
            this.goThroughText(this.whichNPC);
         }
      }

      // All the collisions needed
      game.physics.arcade.collide(this.dashingEnemies, this.mapLayer); // Shooting enemies with platforms
      game.physics.arcade.collide(this.npcs, this.mapLayer); // NPCs with the platforms

      // Player with enemies
      if (!injured) {
         if (game.physics.arcade.collide(this.dashingEnemies, this.player)) {
            health--;

            // If player health reaches 0, they die
            if (health == 0) {
               song.stop();
               playerDies(game, this.player, 'Yellow');
            }
         }
      }

      // Player bullet with enemies
      game.physics.arcade.collide(this.playerBullets, this.dashingEnemies, this.bulletHitsEnemy, null, this);

      // Bullets hitting a wall
      game.physics.arcade.collide(this.enemyBullets, this.mapLayer, this.bulletHitsWall, null, this);
      game.physics.arcade.collide(this.playerBullets, this.mapLayer, this.bulletHitsWall, null, this);

      // Collecting yellow
      this.physics.arcade.overlap(this.player, this.yellow, this.collectYellow, null, this);

      // Overlap with trigger that starts the wall
      this.physics.arcade.overlap(this.player, this.x, this.startWall, null, this);

      // If the player touches the death wall, they instantly die
      if (this.physics.arcade.collide(this.player, this.wall)) {
			if (!this.stoppedWall) {
	         health = 0;
	         playerDies(this, this.player, 'Yellow');
			}
      }

      this.healthText.text = health;
   },

   // When the player collects the color
   collectYellow: function(player, color) {
      // increment the yellowLevel progress.
      yellowLevel++;
      if (yellowLevel == 1) {
         hasYellow = true;
      }

		this.stoppedWall = true;
      // Yellow bdm
      bmd = game.add.bitmapData(18, 18);
      bmd.fill(255, 255, 0, 1);

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
      song.stop();
      this.wall.body.velocity.x = 0;
      game.time.events.add(Phaser.Timer.SECOND * 2, function() {
         if (yellowLevel == 3) {
            game.state.start('Tutorial')
         } else {
            game.state.start('Yellow')
         }

      });
   },

   // Called with a player bullet hits an enemy
   bulletHitsEnemy: function(bullet, enemy) {
      bulletDestroyed(game, bullet);
      enemyDies(game, enemy);
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

      this.behindText.x = text.x;
		this.behindText.y = text.y;
		this.behindText.visible = true;
   },

   // Displays the next text
   goThroughText: function(text) {
      //The text change with the step
      this.textArea.text = text[this.textPos];

      //The step increase
      this.textPos = this.textPos + 1;
      this.world.bringToTop(this.textArea);

      // When finished through the dialog
      if (this.textPos == text.length) {
         npcText.stop();
         this.behindText.visible = false;
         talking = false;
         this.textPos = 0;
      }
   },

   // Starts the death wall
   startWall: function(player, x) {
      song.stop();
      song = game.add.audio('action');
      song.play('', 0, 0.5, true);
      x.destroy();
      if (yellowLevel == 0)
         this.wall.body.velocity.x = 300;
      else this.wall.body.velocity.x = 400;
   },

   // // Debug stuff
   // render: function() {
   //    game.debug.bodyInfo(this.player, 100, 100, 'black');
   //    game.debug.body(this.player);
   //    game.debug.body(this.x);
   // }
};
