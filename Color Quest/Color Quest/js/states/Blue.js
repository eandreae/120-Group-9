// Blue color state
var shootSFX;
var hurtSFX;
var enemyDiesSFX;
var enterSFX;
var Blue = function(game) {};
Blue.prototype = {

   // Variables used in Tutorial
   init: function() {
      this.whichNPC;
      talking = false;
      injured = false;
      health = 5;
   },

   // Preload the tilemap
   preload: function() {
      game.load.tilemap('layout', 'assets/TileMaps/Blue.json', null, Phaser.Tilemap.TILED_JSON);
      game.load.spritesheet('tilesheet', 'assets/TileMaps/color_tiles.png', 32, 32);

      shootSFX = game.load.audio('shoot');
      hurtSFX = game.load.audio('hurt');
      enemyDiesSFX = game.load.audio('enemyDies');
      enterSFX = game.load.audio('enter');
   },

   create: function() {
      // Music
      song.stop();
      song = game.add.audio('action2');
      song.play('', 0, 0.2, true);

      // Background
      background = game.add.image(0, 0, 'bg_blue');
      background.fixedToCamera = true;

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

      // Position of the NPC text
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

      if (blueLevel == 0) {
         // Loading the correct TileMap.
         this.mapLayer = this.map.createLayer('Ground_0');
         this.map.setCollisionBetween(0, 999, true, 'Ground_0');

         // LOADING MAP -------------------------------------------------------
         // Now that the correct level has been loaded, do the rest of the level.
         this.mapLayer.resizeWorld();

         // Load the enemies/NPCs/collectibles for level 0

         // NPCs --------------------------------------------------------------
         this.n1 = new NPC(game, 350, 800, 'npc_whatever');
         game.add.existing(this.n1);
         this.npcs.add(this.n1);

         this.n1Text = new Array();

         this.n1Text[0] = "This place gives me the Blues :(";
         this.n1Text[1] = "You better be careful of the platforming\nin here. Also watch out for King Color's\ncronies jumping all around the place";
         this.n1Text[2] = "";
         // ENEMIES -----------------------------------------------------------
         // Adding the enemies for Level 0.
         // There are 5 jumping enemies in level 0.
         // Represented with e0, e1, e2, e3, e4.

         var e0 = new Enemy(game, 832, 832, 0, false, true);
         game.add.existing(e0);
         this.jumpingEnemies.add(e0);

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
         this.blue = game.add.sprite(3968, 864, 'upgrade_b');
         game.physics.arcade.enable(this.blue);
      } else if (blueLevel == 1) {
         // Loading the correct TileMap.
         this.mapLayer = this.map.createLayer('Ground_1');
         this.map.setCollisionBetween(0, 999, true, 'Ground_1');

         // LOADING MAP -------------------------------------------------------
         // Now that the correct level has been loaded, do the rest of the level.
         this.mapLayer.resizeWorld();

         // Load the enemies/NPCs/collectibles for level 0

         // NPCs --------------------------------------------------------------
         this.n2 = new NPC(game, 350, 576, 'npc_smiley');
         game.add.existing(this.n2);
         this.npcs.add(this.n2);

         this.n2Text = new Array();

         this.n2Text[0] = "You've recovered some of the Blue power!";
         this.n2Text[1] = "You can now double jump! Simply press the Z\n key again when you're in the air!";
         this.n2Text[2] = "";
         // ENEMIES -----------------------------------------------------------
         // Adding the enemies for Level 1.
         // There are 7 jumping enemies in level 1.
         // Represented with e1, e2, e3, e4, e5, e6, e7.

         var e1 = new Enemy(game, 1024, 832, 100, false, true);
         game.add.existing(e1);
         this.jumpingEnemies.add(e1);

         var e2 = new Enemy(game, 1344, 832, 100, false, true);
         game.add.existing(e2);
         this.jumpingEnemies.add(e2);

         var e3 = new Enemy(game, 1664, 832, 100, false, true);
         game.add.existing(e3);
         this.jumpingEnemies.add(e3);

         var e4 = new Enemy(game, 1984, 832, 100, false, true);
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
         this.blue = game.add.sprite(3968, 864, 'upgrade_b');
         game.physics.arcade.enable(this.blue);
      } else if (blueLevel == 2) {
         // Loading the correct TileMap.
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

         var e1 = new Enemy(game, 64, 832, 150, false, true);
         game.add.existing(e1);
         this.jumpingEnemies.add(e1);

         var e2 = new Enemy(game, 608, 832, 150, false, true);
         game.add.existing(e2);
         this.jumpingEnemies.add(e2);

         var e3 = new Enemy(game, 1152, 832, 150, false, true);
         game.add.existing(e3);
         this.jumpingEnemies.add(e3);

         var e4 = new Enemy(game, 1696, 832, 150, false, true);
         game.add.existing(e4);
         this.jumpingEnemies.add(e4);

         var e5 = new Enemy(game, 2240, 832, 150, false, true);
         game.add.existing(e5);
         this.jumpingEnemies.add(e5);

         var e6 = new Enemy(game, 2784, 832, 150, false, true);
         game.add.existing(e6);
         this.jumpingEnemies.add(e6);

         var e7 = new Enemy(game, 3328, 832, 150, false, true);
         game.add.existing(e7);
         this.jumpingEnemies.add(e7);

         var e8 = new Enemy(game, 3680, 512, 0, false, true);
         game.add.existing(e8);
         this.jumpingEnemies.add(e8);

         // COLLECTIBLES ------------------------------------------------------

         // Blue collectable
         bmd = game.add.bitmapData(75, 75);
         bmd.fill(0, 0, 255, 1);
         this.blue = game.add.sprite(3968, 544, 'upgrade_b');
         game.physics.arcade.enable(this.blue);
      }

      // Adds the player into the state
      if( blueLevel == 2 ){
          this.player = new Player(game, 64, 256, this.mapLayer);
      }
      else if( blueLevel == 1 ){
          this.player = new Player(game, 64, 576, this.mapLayer);
      }
      else {
          this.player = new Player(game, 64, 832, this.mapLayer);
      }
      game.add.existing(this.player);

      this.hpSprite = game.add.sprite(20, 20, 'hp_palette');
      this.hpSprite.fixedToCamera = true;

      this.hpSprite.animations.add('0', [0], 10, true);
      this.hpSprite.animations.add('1', [1], 10, true);
      this.hpSprite.animations.add('2', [2], 10, true);
      this.hpSprite.animations.add('3', [3], 10, true);
      this.hpSprite.animations.add('4', [4], 10, true);
      this.hpSprite.animations.add('5', [5], 10, true);

      this.hpSprite.scale.x = 1.2;
      this.hpSprite.scale.y = 1.2;

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
         shootSFX.play('', 0, 0.2, false);
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

      // Collisions.
      game.physics.arcade.collide(this.jumpingEnemies, this.mapLayer); // Enemies with platforms
      game.physics.arcade.collide(this.npcs, this.mapLayer); // NPCs with the platforms

      // Player bullet with enemies
      game.physics.arcade.collide(this.playerBullets, this.jumpingEnemies, this.bulletHitsEnemy, null, this);

      // Bullets hitting a wall
      game.physics.arcade.collide(this.playerBullets, this.mapLayer, this.bulletHitsWall, null, this);

      // Collision between the player and the enemies.
      if (!injured) {
         if (game.physics.arcade.collide(this.jumpingEnemies, this.player)) {
            health--;

            // If player health reaches 0, they die
            if (health == 0) {
                hurtSFX.play('', 0, 1, false);
               song.stop();
               playerDies(game, this.player, 'Blue');
            }
         }
      }

      // For when the player collects the blue upgrade.
      this.physics.arcade.overlap(this.player, this.blue, this.collectBlue, null, this);

      if (health == 0) this.hpSprite.animations.play('0');
      else if (health == 1) this.hpSprite.animations.play('1');
      else if (health == 2) this.hpSprite.animations.play('2');
      else if (health == 3) this.hpSprite.animations.play('3');
      else if (health == 4) this.hpSprite.animations.play('4');
      else this.hpSprite.animations.play('5');
   },

   // When the player collects the color
   collectBlue: function(player, color) {
      hasBlue = true;
      blueLevel++;

      // Play the sound effect.
      enterSFX.play('', 0, 1, false);

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
      enemyDiesSFX.play('', 0, 1, false);
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

   // render: function() {
   //    game.debug.bodyInfo(this.player, 100, 100, 'black');
   //    game.debug.body(this.player);
   // }
};
