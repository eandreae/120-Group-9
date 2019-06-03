// Yellow color state
var Yellow = function(game) {};
Yellow.prototype = {

   // Variables used in Tutorial
   init: function() {
      this.talking = false;
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
      backgroundColor = "#FFEE99"
      game.stage.backgroundColor = backgroundColor;

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

      // Create new tilemap
      this.map = game.add.tilemap('layout');
      this.map.addTilesetImage('color_tiles_tileset', 'tilesheet');

      // The layers for each yellow level
      if (yellowLevel == 0) {
         this.mapLayer = this.map.createLayer('Ground_0');
         this.map.setCollisionBetween(0, 999, true, 'Ground_0');

         this.n1 = new NPC(game, 500, 900);
         game.add.existing(this.n1);
         this.npcs.add(this.n1);

         this.n1Text = new Array();

         this.n1Text[0] = "Howdy! You havin' a good day\nhere in Palette Town?";
         this.n1Text[1] = "Y'know how to move left 'n' right\nwith the arrow keys already. You can\njump with Up, too!";
         this.n1Text[2] = "Why don'tcha talk to the other townsfolk?\nPress Z to interact with 'em,\nor anythin' else!";
         this.n1Text[3] = "";

      } else if (yellowLevel == 1) {
         this.mapLayer = this.map.createLayer('Ground_1');
         this.map.setCollisionBetween(0, 999, true, 'Ground_1');

         this.n2 = new NPC(game, 500, 900);
         game.add.existing(this.n2);
         this.npcs.add(this.n2);

         this.n2Text = new Array();

         this.n2Text[0] = "Howdy! You havin' a good day\nhere in Palette Town?";
         this.n2Text[1] = "Y'know how to move left 'n' right\nwith the arrow keys already. You can\njump with Up, too!";
         this.n2Text[2] = "Why don'tcha talk to the other townsfolk?\nPress Z to interact with 'em,\nor anythin' else!";
         this.n2Text[3] = "";
      } else if (yellowLevel == 2) {
         this.mapLayer = this.map.createLayer('Ground_2');
         this.map.setCollisionBetween(0, 999, true, 'Ground_2');
      }

      this.mapLayer.resizeWorld();

      // set 32-pixel buffer around tiles to avoid collision tunneling
      game.physics.arcade.TILE_BIAS = 32;

      // Yellow collectable
      bmd = game.add.bitmapData(75, 75);
      bmd.fill(255, 255, 0, 1);
      this.yellow = game.add.sprite(4000, 800, 'upgrade_y');
      game.physics.arcade.enable(this.yellow);

      // Adds the player into the state
      this.player = new Player(game, 416, 800, this.mapLayer);
      game.add.existing(this.player);

      // Bullet groups
      this.playerBullets = game.add.group();

      // Add the enemy that chases you.
      // The group handling. No shooting.
      this.enemies = game.add.group();
      this.enemies.enableBody = true;
      // // The enemy that chases you.
      // var enemy = new Enemy(game, 64, 800, 190);
      // game.add.existing(enemy);
      // this.enemies.add(enemy);

      // Invisible collision to trigger the wall
      bmd = game.add.bitmapData(10, 10000);
      this.x = game.add.sprite(1350, 0, bmd);
      game.physics.arcade.enable(this.x);

      // Wall of death that chases the player when activated
      bmd = game.add.bitmapData(10000, 1000);
      bmd.fill(127, 106, 0, 1);
      this.wall = game.add.sprite(-10100, 200, bmd);
      game.physics.arcade.enable(this.wall);
      this.wall.body.immovable = true;

      // Camera follows player
      game.camera.follow(this.player);
      game.camera.deadzone = new Phaser.Rectangle(325, 200, 50, 150); // (x,y,width,height)

      // Timer for when the NPC text automatically goes to the next text
      npcText = game.time.create(false);
   },

   update: function() {
      // Making it so the enemy will follow the Player.
      // If player is on the enemy's left.
      // if( this.enemy.body.x < this.player.body.x ){
      //     // Make the Enemy chase after the Player.
      //     this.enemy.body.velocity.x = 190;
      // }
      // // If player is on the enemy's right.
      // if( this.enemy.body.x > this.player.body.x ){
      //     // Make the Enemy chase after the Player.
      //     this.enemy.body.velocity.x = -190;
      // }
      // // if player is directly above/below the enemy.
      // if( this.enemy.body.x == this.player.body.x ){
      //     // Make the Enemy stand still.
      //     this.enemy.body.velocity.x = 0;
      // }

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
               playerDies(game, this.player, 'Yellow');
            }
         }
      }

      // Player bullet with enemies
      game.physics.arcade.collide(this.playerBullets, this.enemies, this.bulletHitsEnemy, null, this);
      game.physics.arcade.collide(this.playerBullets, this.shootingEnemies, this.bulletHitsEnemy, null, this);

      // Bullets hitting a wall
      game.physics.arcade.collide(this.enemyBullets, this.mapLayer, this.bulletHitsWall, null, this);
      game.physics.arcade.collide(this.playerBullets, this.mapLayer, this.bulletHitsWall, null, this);

      this.physics.arcade.overlap(this.player, this.yellow, this.collectYellow, null, this);
      this.physics.arcade.overlap(this.player, this.x, this.startWall, null, this);

      // If the player touches the death wall, they instantly die
      if (this.physics.arcade.collide(this.player, this.wall)) {
         health = 0;
         playerDies(this, this.player, 'Yellow');
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

   // Starts the death wall
   startWall: function(player, x) {
      song.stop();
      song = game.add.audio('action');
      song.play('', 0, 0.5, true);
      x.destroy();
      this.wall.body.velocity.x = 300;
   },

   // Debug stuff
   render: function() {
      game.debug.bodyInfo(this.player, 100, 100, 'black');
      game.debug.body(this.player);
      game.debug.body(this.x);
   }
};
