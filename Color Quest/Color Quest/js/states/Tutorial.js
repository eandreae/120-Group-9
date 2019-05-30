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
      game.load.spritesheet('tilesheet', 'assets/TileMaps/color_tiles_2.png', 32, 32);
   },

   create: function() {
      console.log('Tutorial: create');

      song.stop();
      if( metKingColor == false ){
          song = game.add.audio('happy');
      } else if( hasRed && hasYellow && hasBlue ){
          song = game.add.audio('motivational');
      } else {
          song = game.add.audio('sad1');
      }
      song.play('', 0, 0.5, true);

      // Background
      backgroundColor = "#D3D3D3"
      game.stage.backgroundColor = backgroundColor;

      // Setting the world bounds
      game.world.setBounds(0, 0, 1024, 1024);

      // Create new tilemap
      this.map = game.add.tilemap('layout');
      this.map.addTilesetImage('color_tiles_2', 'tilesheet');
      if( metKingColor == false ){
          this.mapLayer = this.map.createLayer('Ground_0');
          this.map.setCollisionBetween(0, 999, true, 'Ground_0');
          this.backGroundLayer = this.map.createLayer('Background_0');
      }
      else { // they have met King Color. Check if they have any of the colors.
          // Set up the world without colors.
          this.mapLayer = this.map.createLayer('Ground_1');
          this.map.setCollisionBetween(0, 999, true, 'Ground_1');
          this.noColorBackground = this.map.createLayer('Background_1');
          // Check if they have colors.
          if( hasRed ){
              this.redLayer = this.map.createLayer('Red');
          }
          if( hasYellow ){
              this.yellowLayer = this.map.createLayer('Yellow');
          }
          if( hasBlue ){
              this.blueLayer = this.map.createLayer('Blue');
          }
      }
      this.mapLayer.resizeWorld();

      // set 32-pixel buffer around tiles to avoid collision tunneling
      game.physics.arcade.TILE_BIAS = 32;

      this.portals = game.add.group();
      this.portals.enableBody = true;

      // Red portal
      if (!hasRed && metKingColor == true ) {
         bmd = game.add.bitmapData(64, 64);
         bmd.fill(255, 0, 0, 1);
         this.redPortal = game.add.sprite(3456, 832, 'atlas', 'red_color');
         this.redPortal.anchor.set(0.5);
         game.physics.arcade.enable(this.redPortal);
         this.portals.add(this.redPortal);
      }

      // Yellow portal
      if (!hasYellow && metKingColor == true ) {
         bmd = game.add.bitmapData(64, 64);
         bmd.fill(255, 255, 0, 1);
         this.yellowPortal = game.add.sprite(3744, 832, 'atlas', 'yellow_color');
         this.yellowPortal.anchor.set(0.5);
         game.physics.arcade.enable(this.yellowPortal);
         this.portals.add(this.yellowPortal);
      }

      // Blue portal
      if (!hasBlue && metKingColor == true ) {
         bmd = game.add.bitmapData(64, 64);
         bmd.fill(0, 0, 255, 1);
         this.bluePortal = game.add.sprite(4000, 832, 'atlas', 'blue_color');
         this.bluePortal.anchor.set(0.5);
         game.physics.arcade.enable(this.bluePortal);
         this.portals.add(this.bluePortal);
      }
      // Meeting King Color
      if( metKingColor == false ){
          bmd = game.add.bitmapData(64, 64);
          bmd.fill(0, 0, 255, 1);
          this.kingColorPortal = game.add.sprite(2880, 832, 'bPortal');
          this.kingColorPortal.anchor.set(0.5);
          game.physics.enable(this.kingColorPortal);
          this.portals.add(this.kingColorPortal);
      }
      // Fighting King Color
      if (hasRed && hasYellow && hasBlue) {
         this.bossPortal = game.add.sprite(3136, 832, 'bPortal');
         this.bossPortal.anchor.set(0.5);
         game.physics.arcade.enable(this.bossPortal);
         this.portals.add(this.bossPortal);
      }

      this.textPos = 1;

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

      // NPC1's text
      if( metKingColor == false ){
        this.n1Text[0] = "Howdy! You havin' a good day\nhere in Palette Town?";
        this.n1Text[1] = "Y'know how to move left 'n' right\nwith the arrow keys already. You can\njump with Up, too!";
        this.n1Text[2] = "Why don'tcha talk to the other townsfolk?\nPress Z to interact with 'em,\nor anythin' else!";
        this.n1Text[3] = "";
      }else if( metKingColor == true && !hasRed && !hasYellow && !hasBlue){
        this.n1Text[0] = "Oh no...what are we gonna do?!";
        this.n1Text[1] = "The portals...maybe those are the key...";
        this.n1Text[2] = "";
      }else if( metKingColor == true && (hasRed || hasYellow || hasBlue) && (!hasRed || !hasYellow || !hasBlue)){
        this.n1Text[0] = "Yeah, that's it! Keep collectin' the colors!";
        this.n1Text[1] = "";
      }else{
        this.n1Text[0] = "You've got all the colors...y'know what to do.";
        this.n1Text[1] = "Go beat that tyrant, King Color, an'\nrestore color to our land!";
        this.n1Text[2] = "You can do it! You're the only one who can!";
        this.n1Text[3] = "";
      }

      // NPC2
      this.n2 = new NPC(game, 800, 500);
      game.add.existing(this.n2);
      this.npcs.add(this.n2);

      //The array for the text
      this.n2Text = new Array();

      // NPC2's text
      if( metKingColor == false ){
        this.n2Text[0] = "I'm on the ROOF!";
        this.n2Text[1] = "The SUN! It's RIGHT THERE!";
        this.n2Text[2] = "PRAISE IT! PRAISE IT FOR ALL YOU'RE WORTH!";
        this.n2Text[3] = "BY THE POWER OF THE YELLOW LIGHT!";
        this.n2Text[4] = "";
      }else if( metKingColor == true && !hasYellow){
        this.n2Text[0] = "The SUN! NOOOOOOO!";
        this.n2Text[1] = "OUR YELLOW GLORY MUST BE RESTORED!";
        this.n2Text[2] = "";
      }else{
        this.n2Text[0] = "The SUN! IT HAS RETURNED!";
        this.n2Text[1] = "HAHAHAHA! With this, we are...UNBEATABLE!\nThat false king will FALL before the SUN!";
        this.n2Text[2] = "";
      }

      // NPC3
      this.n3 = new NPC(game, 1100, 800);
      game.add.existing(this.n3);
      this.npcs.add(this.n3);

      //The array for the text
      this.n3Text = new Array();

      // NPC3's text
      if( metKingColor == false ){
        this.n3Text[0] = "These berries sure are coming along nicely!\nBig, red, and juicy.";
        this.n3Text[1] = "Their color's really coming through today!";
        this.n3Text[2] = "";
      }else if( metKingColor == true && !hasRed){
        this.n3Text[0] = "The berries...they're withering! Oh, no...";
        this.n3Text[1] = "Without the power of red to sustain them...";
        this.n3Text[2] = "";
      }else{
        this.n3Text[0] = "You've returned the power of Red!";
        this.n3Text[1] = "Oh, thank you, thank you!\nYou're a true hero!";
        this.n3Text[2] = "";
      }

      // NPC4
      this.n4 = new NPC(game, 1800, 700);
      game.add.existing(this.n4);
      this.npcs.add(this.n4);

      //The array for the text
      this.n4Text = new Array();

      // NPC4's text
      if( metKingColor == false ){
        this.n4Text[0] = "Zzzz...";
        this.n4Text[1] = "(He's sleeping pretty soundly.)";
        this.n4Text[2] = "";
      }else if( metKingColor == true && (!hasRed || !hasYellow || !hasBlue)){
        this.n4Text[0] = "Zzzz...";
        this.n4Text[1] = "(He's STILL sleeping, somehow.)";
      }else{
        this.n4Text[0] = "Zzz...snrk...h-huh...?";
        this.n4Text[1] = "H-how long was I asleep...?\nAw, man, what'd I miss...?";
        this.n4Text[2] = "";
      }

      // NPC5
      this.n5 = new NPC(game, 1700, 800);
      game.add.existing(this.n5);
      this.npcs.add(this.n5);

      //The array for the text
      this.n5Text = new Array();

      // NPC5's text
      if( metKingColor == false ){
        this.n5Text[0] = "Ugh...why's he sleeping there of all places?\nDoesn't he know how sacred those\ncolors are?";
        this.n5Text[1] = "Red, yellow, and blue! The\ncornerstones of our world!";
        this.n5Text[2] = "";
      }else if( metKingColor == true && !hasRed && !hasYellow && !hasBlue){
        this.n5Text[0] = "No...the colors, t-they're all gone!";
        this.n5Text[1] = "Y-you have to get them back!\nThose portals, they must lead to the colors!";
        this.n5Text[2] = "Please, go through those portals,\nget our colors back...";
        this.n5Text[3] = "The world is counting on you!";
        this.n5Text[4] = ""
      }else if( metKingColor == true && (!hasRed || !hasYellow || !hasBlue)){
        this.n5Text[0] = "Look! The colors, they're\nstarting to come back!";
        this.n5Text[1] = "Keep it up! You can do this!";
        this.n5Text[2] = "";
      }else{
        this.n5Text[0] = "You've done it...all that's left is the man himself.";
        this.n5Text[1] = "The door to King Color awaits. Defeat him,\nand you'll surely restore color to\nthe world!";
        this.n5Text[2] = "";
      }

      // Adds the player into the state
      this.player = new Player(game, 64, 736, this.mapLayer);
      game.add.existing(this.player);

      // The enemy groups
      this.enemies = game.add.group();
      this.enemies.enableBody = true;
      this.shootingEnemies = game.add.group();
      this.shootingEnemies.enableBody = true;

      // // Place a moving enemy
      var e1 = new Enemy(game, 500, 300, -100, true, false, this.player);
      game.add.existing(e1);
      this.enemies.add(e1);
      //
      // // Place a shooting enemy
      var e2 = new Enemy(game, 500, 300, -100, false, true, this.player);
      game.add.existing(e2);
      this.enemies.add(e2);

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

       // Set the collisions of the game.
      // this.game.physics.arcade.collide(this.player, 'Ground');

      // Go into the red state
      if (!hasRed) {
         if (this.physics.arcade.overlap(this.player, this.redPortal)) {
            // Display interact text
            this.setTextPosition(this.interactText, this.redPortal);
            this.interactText.visible = true;

            if (game.input.keyboard.justPressed(Phaser.Keyboard.Z)) {
               game.state.start('Red');
            }
         }
      }

      // Go into the yellow state
      if (!hasYellow) {
         if (this.physics.arcade.overlap(this.player, this.yellowPortal)) {
            // Display interact text
            this.setTextPosition(this.interactText, this.yellowPortal);
            this.interactText.visible = true;

            if (game.input.keyboard.justPressed(Phaser.Keyboard.Z)) {
               game.state.start('Yellow');
            }
         }
      }

      // Go into the blue state
      if (!hasBlue) {
         if (this.physics.arcade.overlap(this.player, this.bluePortal)) {
            // Display interact text
            this.setTextPosition(this.interactText, this.bluePortal);
            this.interactText.visible = true;

            if (game.input.keyboard.justPressed(Phaser.Keyboard.Z)) {
               game.state.start('Blue');
            }
         }
      }

      // Meet King Color.
      if (metKingColor == false ){
          if (this.physics.arcade.overlap(this.player, this.kingColorPortal) ){
              // Display interact text.
              this.setTextPosition(this.interactText, this.kingColorPortal);
              this.interactText.visible = true;

              if( game.input.keyboard.justPressed(Phaser.Keyboard.Z) ){
                  metKingColor = true;
                  game.state.start('Tutorial');
              }
          }
      }

      // Go into the boss room
      if (this.physics.arcade.overlap(this.player, this.bossPortal)) {
         // Display interact text
         this.setTextPosition(this.interactText, this.bossPortal);
         this.interactText.visible = true;

         if (game.input.keyboard.justPressed(Phaser.Keyboard.Z)) {
            game.state.start('BossMap');
         }
      }

      // Player shoots a bullet for each key press
      if (game.input.keyboard.justPressed(Phaser.Keyboard.X) && hasRed) {
         var bullet = new Bullet(game, this.player.x, this.player.y, direction, .4, 1500);
         game.add.existing(bullet);
         this.playerBullets.add(bullet);
      }

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

      // NPC3 text trigger
      if (game.physics.arcade.overlap(this.player, this.n3) && !this.talking) {
         // Display interact text
         this.setTextPosition(this.interactText, this.n3);
         this.interactText.visible = true;

         if (game.input.keyboard.justPressed(Phaser.Keyboard.Z)) {
            // Timer for npc text
            this.talking = true;
            this.interactText.visible = false;
            this.setTextPosition(this.textArea, this.n3);
            this.textArea.text = this.n3Text[0];
            npcText.loop(3000, this.goThroughText, this, this.n3Text);
            npcText.start();
         }
      }

      // NPC4 text trigger
      if (game.physics.arcade.overlap(this.player, this.n4) && !this.talking) {
         // Display interact text
         this.setTextPosition(this.interactText, this.n4);
         this.interactText.visible = true;

         if (game.input.keyboard.justPressed(Phaser.Keyboard.Z)) {
            // Timer for npc text
            this.talking = true;
            this.interactText.visible = false;
            this.setTextPosition(this.textArea, this.n4);
            this.textArea.text = this.n4Text[0];
            npcText.loop(3000, this.goThroughText, this, this.n4Text);
            npcText.start();
         }
      }

      // NPC5 text trigger
      if (game.physics.arcade.overlap(this.player, this.n5) && !this.talking) {
         // Display interact text
         this.setTextPosition(this.interactText, this.n5);
         this.interactText.visible = true;

         if (game.input.keyboard.justPressed(Phaser.Keyboard.Z)) {
            // Timer for npc text
            this.talking = true;
            this.interactText.visible = false;
            this.setTextPosition(this.textArea, this.n5);
            this.textArea.text = this.n5Text[0];
            npcText.loop(3000, this.goThroughText, this, this.n5Text);
            npcText.start();
         }
      }

      // All the collisions needed
      game.physics.arcade.collide(this.enemies, this.mapLayer); // Enemies with platforms
      game.physics.arcade.collide(this.shootingEnemies, this.mapLayer); // Shooting enemies with platforms
      game.physics.arcade.collide(this.npcs, this.mapLayer);

      // Player with enemies
      if (!injured) {
         if (game.physics.arcade.collide(this.enemies, this.player) || game.physics.arcade.collide(this.shootingEnemies, this.player)) {
            health--;
            if (health == 0) {
               song.stop();
               playerDies(game, this.player, 'Tutorial');
            }
         }
      }

      // Player bullet with enemies
      game.physics.arcade.collide(this.playerBullets, this.enemies, bulletHitsEnemy, null, this);
      game.physics.arcade.collide(this.playerBullets, this.shootingEnemies, bulletHitsEnemy, null, this);

      // Enemy bullets with player
      if (!injured) game.physics.arcade.collide(this.player, this.enemyBullets, bulletHitsPlayer, null, this);

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
            playerDies(game, player, 'Tutorial');
            song.stop();
         }
      }

      function bulletHitsWall(bullet, walls) {
         bulletDestroyed(game, bullet);
      }
   },

   shutdown: function() {
      this.enemies.destroy(true);
      this.shootingEnemies.destroy(true);
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
         this.textPos = 1;
      }
   },

   render: function() {
      game.debug.bodyInfo(this.player, 100, 100, 'black');
      game.debug.body(this.player);
   }
};
