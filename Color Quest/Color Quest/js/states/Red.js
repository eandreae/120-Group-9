// Red color state
var shootSFX;
var enemyShootSFX;
var hurtSFX;
var enemyDiesSFX;
var enterSFX;
var Red = function(game) {};
Red.prototype = {

   // Variables used in Tutorial
   init: function() {
      this.whichNPC;
      talking = false;
      injured = false;
      health = 5;

   },

   // Preload the tilemap
   preload: function() {
      game.load.tilemap('layout', 'assets/TileMaps/Red.json', null, Phaser.Tilemap.TILED_JSON);
      game.load.spritesheet('tilesheet', 'assets/TileMaps/color_tiles.png', 32, 32);
      shootSFX = game.add.audio('shoot');
      enemyShootSFX = game.add.audio('enemyShoot');
      hurtSFX = game.add.audio('hurt');
      enemyDiesSFX = game.add.audio('enemyDies');
      enterSFX = game.add.audio('enter');
   },

   create: function() {
      // Music for Red.
      song.stop();
      song = game.add.audio('action2');
      song.play('', 0, 0.2, true);

      // Background
      background = game.add.image(0, 0, 'bg_red');
      background.fixedToCamera = true;

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
         this.mapLayer = this.map.createLayer('Ground_0');
         this.map.setCollisionBetween(0, 999, true, 'Ground_0');

         // LOADING MAP -------------------------------------------------------
         // Now that the correct level has been loaded, do the rest of the level.
         this.mapLayer.resizeWorld();

         // Load the enemies/NPCs/collectibles for level 0

         // NPCs --------------------------------------------------------------
         this.n1 = new NPC(game, 500, 800, 'npc_generic_l');
         game.add.existing(this.n1);
         this.npcs.add(this.n1);

         this.n1Text = new Array();

         this.n1Text[0] = "I can sense the power of the color red here";
         this.n1Text[1] = "But it seems King Color's cronies have gotten\na hold of it...";
         this.n1Text[2] = "Watch out for flying bullets! You wouldn't\nwant to get hit by them";
         this.n1Text[3] = "";
         // ENEMIES -----------------------------------------------------------
         // enemies 1, 2, and 3 for Red level 0.

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
         this.red = game.add.sprite(3680, 864, 'upgrade_r');
         game.physics.arcade.enable(this.red);

      } else if (redLevel == 1) {
         // The player has just entered the Red level 1, load level 1.
         this.mapLayer = this.map.createLayer('Ground_1');
         this.map.setCollisionBetween(0, 999, true, 'Ground_1');

         // LOADING MAP -------------------------------------------------------
         // Now that the correct level has been loaded, do the rest of the level.
         this.mapLayer.resizeWorld();

         // Load the enemies/NPCs/collectibles for level 1

         // NPCs --------------------------------------------------------------
         this.n2 = new NPC(game, 500, 544, 'npc_cute');
         game.add.existing(this.n2);
         this.npcs.add(this.n2);

         this.n2Text = new Array();

         this.n2Text[0] = "Wow! It looks like you've recovered some\nof the red power!";
         this.n2Text[1] = "Press the X key to shoot a projectile.";
         this.n2Text[2] = "Show King Color's cronies what they deserve";
         this.n2Text[3] = "";
         // ENEMIES -----------------------------------------------------------
         // enemies 1, 2, 3, and 4 for Red level 1.

         // enemy 1
         var e1 = new Enemy(game, 1824, 864, 0);
         game.add.existing(e1);
         this.shootingEnemies.add(e1);

         // enemy 2
         var e2 = new Enemy(game, 2368, 864, 0);
         game.add.existing(e2);
         this.shootingEnemies.add(e2);

         // enemy 3
         var e3 = new Enemy(game, 2816, 672, 0);
         game.add.existing(e3);
         this.shootingEnemies.add(e3);

         // enemy 4
         var e4 = new Enemy(game, 3232, 672, 0);
         game.add.existing(e4);
         this.shootingEnemies.add(e4);

         // COLLECTIBLES ------------------------------------------------------

         // Red collectable
         bmd = game.add.bitmapData(75, 75);
         bmd.fill(255, 0, 0, 1);
         this.red = game.add.sprite(3680, 864, 'upgrade_r');
         game.physics.arcade.enable(this.red);

      } else if (redLevel == 2) {
         // The player has just entered the Red level 2, load level 2.
         this.mapLayer = this.map.createLayer('Ground_2');
         this.map.setCollisionBetween(0, 999, true, 'Ground_2');

         // LOADING MAP -------------------------------------------------------
         // Now that the correct level has been loaded, do the rest of the level.
         this.mapLayer.resizeWorld();

         // Load the enemies/NPCs/collectibles for level 1

         // NPCs --------------------------------------------------------------

         // ENEMIES -----------------------------------------------------------
         // enemies 1, 2, 3, 4, 5, 6, 7, 8, and 9 for Red leve 2.

         // enemy 1
         var e1 = new Enemy(game, 704, 480, 0);
         game.add.existing(e1);
         this.shootingEnemies.add(e1);

         // enemy 2
         var e2 = new Enemy(game, 864, 608, 0);
         game.add.existing(e2);
         this.shootingEnemies.add(e2);

         // enemy 3
         var e3 = new Enemy(game, 992, 864, 0);
         game.add.existing(e3);
         this.shootingEnemies.add(e3);

         // enemy 4
         var e4 = new Enemy(game, 1344, 480, 0);
         game.add.existing(e4);
         this.shootingEnemies.add(e4);

         // enemy 5
         var e5 = new Enemy(game, 1344, 736, 0);
         game.add.existing(e5);
         this.shootingEnemies.add(e5);

         // enemy 6
         var e6 = new Enemy(game, 1632, 864, 0);
         game.add.existing(e6);
         this.shootingEnemies.add(e6);

         // enemy 7
         var e7 = new Enemy(game, 1824, 608, 0);
         game.add.existing(e7);
         this.shootingEnemies.add(e7);

         // These next two enemies move.
         // enemy 8
         var e8 = new Enemy(game, 2720, 864, 150, false, false);
         game.add.existing(e8);
         this.shootingEnemies.add(e8);

         // enemy 9
         var e9 = new Enemy(game, 3040, 864, 150, false, false);
         game.add.existing(e9);
         this.shootingEnemies.add(e9);

         // COLLECTIBLES ------------------------------------------------------

         // Red collectable
         bmd = game.add.bitmapData(75, 75);
         bmd.fill(255, 0, 0, 1);
         this.red = game.add.sprite(3680, 864, 'upgrade_r');
         game.physics.arcade.enable(this.red);
      }

      // Adds the player into the level.
      // Dependant on level. On level 1, the player spawns at a different y value.
      if( redLevel == 1 ){
          this.player = new Player(game, 64, 544, this.mapLayer);
      }
      else if( redLevel == 2 ){
          this.player = new Player(game, 64, 608, this.mapLayer);
      }
      else {
          this.player = new Player(game, 64, 800, this.mapLayer);
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

      // Timer for how often the enemies shoot
      timer = game.time.create(false);
      timer.loop(3500, this.enemyGroup, this);
      timer.start();

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

      // All the collisions needed
      game.physics.arcade.collide(this.shootingEnemies, this.mapLayer); // Shooting enemies with platforms
      game.physics.arcade.collide(this.npcs, this.mapLayer); // NPCs with the platforms

      // Player with enemies
      if (!injured) {
         if (game.physics.arcade.collide(this.shootingEnemies, this.player)) {
            health--;

            // If player health reaches 0, they die
            if (health == 0) {
                hurtSFX.play('', 0, 1.5, false);
               song.stop();
               playerDies(game, this.player, 'Red');
            }
         }
      }

      // Player with the Red Upgrade.
      this.physics.arcade.overlap(this.player, this.red, this.collectRed, null, this);

      // Player bullet with enemies
      game.physics.arcade.collide(this.playerBullets, this.shootingEnemies, this.bulletHitsEnemy, null, this);

      // Enemy bullets with player
      if (!injured) game.physics.arcade.collide(this.player, this.enemyBullets, this.bulletHitsPlayer, null, this);

      // Bullets hitting a wall
      game.physics.arcade.collide(this.enemyBullets, this.mapLayer, this.bulletHitsWall, null, this);
      game.physics.arcade.collide(this.playerBullets, this.mapLayer, this.bulletHitsWall, null, this);

      if (health == 0) this.hpSprite.animations.play('0');
      else if (health == 1) this.hpSprite.animations.play('1');
      else if (health == 2) this.hpSprite.animations.play('2');
      else if (health == 3) this.hpSprite.animations.play('3');
      else if (health == 4) this.hpSprite.animations.play('4');
      else this.hpSprite.animations.play('5');
   },

   // When the player collects the color at the end of the level.
   collectRed: function(player, color) {
      // increment the level variable upwards.
      redLevel++;

      // Play the sound effect.
      enterSFX.play('', 0, 2.5, false);

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
      enemyDiesSFX.play('', 0, 1, false);
      enemyDies(game, enemy);
   },

   // Called with an enemy bullet hits the player
   bulletHitsPlayer: function(player, bullet) {
      bulletDestroyed(game, bullet);
      health--;

      // If player health reaches 0, they die
      if (health == 0) {
          hurtSFX.play('', 0, 1.5, false);
         playerDies(game, player, 'Red');
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
      var bullet = new Bullet(game, enemy.x, enemy.y, enemy.direction, 300);
      enemyShootSFX.play('', 0, 0.2, false);
      game.add.existing(bullet);
      this.enemyBullets.add(bullet);
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
