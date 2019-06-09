// Tutorial state
// the first level of the game.
var Tutorial = function(game) {};
Tutorial.prototype = {

   // Variables used in Tutorial
   init: function() {
      talking = false;
      this.whichNPC;
      injured = false;
      hitByKingColor = false;
      metKingColorTrigger = false;
      health = 5;
   },

   // Preload the tilemap
   preload: function() {
      game.load.tilemap('layout', 'assets/TileMaps/Tutorial.json', null, Phaser.Tilemap.TILED_JSON);
      game.load.spritesheet('tilesheet', 'assets/TileMaps/color_tiles_2.png', 32, 32);
   },

   create: function() {
      // Choose the song depending how far you've progressed in the game
      song.stop();
      if (metKingColor == false || bossDefeated) {
         song = game.add.audio('happy');
      } else if (hasRed && hasYellow && hasBlue) {
         song = game.add.audio('motivational');
      } else {
         song = game.add.audio('sad1');
      }
      song.play('', 0, 0.5, true);

      // Setting the world bounds
      game.world.setBounds(0, 0, 1024, 1024);

      // Create new tilemap
      this.map = game.add.tilemap('layout');
      this.map.addTilesetImage('color_tiles_2', 'tilesheet');

      if (metKingColor == false || bossDefeated) {
         background = game.add.image(0, 0, 'bg_town');
      }
      else {
         background = game.add.image(0, 0, 'bg_town_gray');
         if (hasYellow) background = game.add.image(0, 0, 'bg_town_y');
         if (hasBlue) background = game.add.image(0, 0, 'bg_town_b');
         if (hasYellow && hasBlue) background = game.add.image(0, 0, 'bg_town_by');
      }
      background.fixedToCamera = true;

      // If they haven't met king color yet, everything is all happy
      if (metKingColor == false || bossDefeated) {

         // Map Layer
         this.mapLayer = this.map.createLayer('Ground_0');
         this.map.setCollisionBetween(0, 999, true, 'Ground_0');
         this.backGroundLayer = this.map.createLayer('Background_0');
      }


      // They have met King Color. The World is sad now and color has been taken
      // from the world. Check if they have collected any of the colors.
      else {
         this.mapLayer = this.map.createLayer('Ground_1');
         this.map.setCollisionBetween(0, 999, true, 'Ground_1');
         this.noColorBackground = this.map.createLayer('Background_1');

         // Check if they have colors.
         if (hasRed) {
            this.redLayer = this.map.createLayer('Red');
         }
         if (hasYellow) {
            this.yellowLayer = this.map.createLayer('Yellow');
         }
         if (hasBlue) {
            this.blueLayer = this.map.createLayer('Blue');
         }

      }
      this.mapLayer.resizeWorld();

      // set 32-pixel buffer around tiles to avoid collision tunneling
      game.physics.arcade.TILE_BIAS = 32;

      // Portal group
      this.portals = game.add.group();
      this.portals.enableBody = true;

      // Red portal
      if (!hasRed && metKingColor == true) {
         this.redPortal = game.add.sprite(3456, 832, 'door_r');
         this.redPortal.anchor.set(0.5);
         game.physics.arcade.enable(this.redPortal);
         this.portals.add(this.redPortal);
      }

      // Yellow portal
      if (!hasYellow && metKingColor == true) {
         this.yellowPortal = game.add.sprite(3744, 832, 'door_y');
         this.yellowPortal.anchor.set(0.5);
         game.physics.arcade.enable(this.yellowPortal);
         this.portals.add(this.yellowPortal);
      }

      // Blue portal
      if (!hasBlue && metKingColor == true) {
         this.bluePortal = game.add.sprite(4000, 832, 'door_b');
         this.bluePortal.anchor.set(0.5);
         game.physics.arcade.enable(this.bluePortal);
         this.portals.add(this.bluePortal);
      }

      // Meeting King Color
      if (metKingColor == false) {
         bmd = game.add.bitmapData(700, 300);
         bmd.fill(140, 140, 140, 1)
         this.kingColorTrigger = game.add.sprite(3580, 600, bmd);
         game.physics.enable(this.kingColorTrigger);

         this.kingColorDude = game.add.sprite(4200, 670, 'boss_fixed', 'KingColor');
         // this.kingColorDude.scale.x = 2;
         // this.kingColorDude.scale.y = 2;

         game.physics.enable(this.kingColorDude);
      }
		if (metKingColor && !bossDefeated) {
	      this.bossPortal = game.add.sprite(3136, 841, 'boss_door', 'bossdoor_b');
	      this.bossPortal.anchor.set(0.5);
			this.bossPortal.animations.add('sprite', [buckyValue / 16], 10, true)
	      game.physics.arcade.enable(this.bossPortal);
	      this.portals.add(this.bossPortal);

	      this.bossPortalText = new Array();

	      this.bossPortalText[0] = "The door is sealed tight.";
	      this.bossPortalText[1] = "Without the power of Red, Yellow, and\nBlue, you cannot hope to open the door.";
	      this.bossPortalText[2] = "";
		}

      // Position of the NPC text.
      this.textPos = 0;

      // Style of the NPC text
      var styleDescription = {
         font: '18px Arial',
         fill: '#000000',
         align: 'center',
         fontWeight: 'bold',
         stroke: '#000000',
         strokeThickness: 0
      };

      // The health the player has
      this.healthText = this.add.text(10, 10, "", styleDescription);
      this.healthText.fixedToCamera = true;

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

		bmd = game.add.bitmapData(400, 100);
		bmd.fill(255, 255, 255, 1);
		this.behindText = game.add.sprite(0, 0, bmd);
		this.behindText.anchor.set(0.5);
		this.behindText.visible = false;
		this.behindText.alpha = 0.5;

      // NPC Group
      // All NPCs have different text depending on where you are at the game
      this.npcs = game.add.group();
      this.npcs.enableBody = true;

      // All NPCs spawn in different spaces depending on the stage of the game.
      if( bossDefeated == false ) {
          // If the boss hasn't been defeated, then we spawn them in their normal spaces.

          // NPC 1
          this.n1 = new NPC(game, 416, 800, 'npc_cute');
          game.add.existing(this.n1);
          this.npcs.add(this.n1);

          // NPC2
          this.n2 = new NPC(game, 3808, 128, 'npc_solaire');
          game.add.existing(this.n2);
          this.npcs.add(this.n2);

          // NPC3
          this.n3 = new NPC(game, 800, 800, 'npc_generic_r');
          game.add.existing(this.n3);
          this.npcs.add(this.n3);

          // NPC4
          this.n4 = new NPC(game, 1792, 800, 'npc_sleep');
          game.add.existing(this.n4);
          this.npcs.add(this.n4);

          // NPC5
          this.n5 = new NPC(game, 1696, 800, 'npc_whatever');
          game.add.existing(this.n5);
          this.npcs.add(this.n5);

          // NPC6
          this.n6 = new NPC(game, 2464, 800, 'npc_smiley');
          game.add.existing(this.n6);
          this.npcs.add(this.n6);

          // NPC7
          if (metKingColor == false) {
             this.n7 = new NPC(game, 3712, 800, 'npc_cute');
             game.add.existing(this.n7);
             this.npcs.add(this.n7);
             //The array for the text
             this.n7Text = new Array();

             this.n7Text[0] = "Hey... Where'd the color go?";
             this.n7Text[1] = "Something doesn't feel right...";
             this.n7Text[2] = "WOAH! Bucky! Watch out!";
             this.n7Text[3] = "";
          }
      }
      else {
          // If the boss has been defeated, then they all amass at the end of the game,
          // to congratulate the player for prevailing.

          // NPC 1
          this.n1 = new NPC(game, 3264, 800, 'npc_cute');
          game.add.existing(this.n1);
          this.npcs.add(this.n1);

          // NPC2 - Stay in the clouds, but says different things.
          this.n2 = new NPC(game, 3808, 128, 'npc_solaire');
          game.add.existing(this.n2);
          this.npcs.add(this.n2);

          // NPC3
          this.n3 = new NPC(game, 3552, 800, 'npc_generic_r');
          game.add.existing(this.n3);
          this.npcs.add(this.n3);

          // NPC4
          this.n4 = new NPC(game, 2976, 800, 'npc_sleep');
          game.add.existing(this.n4);
          this.npcs.add(this.n4);

          // NPC5
          this.n5 = new NPC(game, 2848, 800, 'npc_whatever');
          game.add.existing(this.n5);
          this.npcs.add(this.n5);

          // NPC6
          this.n6 = new NPC(game, 3840, 800, 'npc_smiley');
          game.add.existing(this.n6);
          this.npcs.add(this.n6);

      }

      // NPC TEXT
      //The array for the text
      this.n1Text = new Array();

      // NPC1's text
      if (metKingColor == false) {
         this.n1Text[0] = "Howdy! You havin' a good day\nhere in Palette Town?\n(Press Z to advance text)";
         this.n1Text[1] = "Y'know how to move left 'n' right\nwith the arrow keys already.\nYou can jump with Up, too!";
         this.n1Text[2] = "Why don'tcha talk to the other\ntownsfolk? Press Z to interact\nwith 'em, or anythin' else!";
         this.n1Text[3] = "";
      } else if (metKingColor == true && !hasRed && !hasYellow && !hasBlue) {
         this.n1Text[0] = "Oh no...the colors,\nthey're all gone!";
         this.n1Text[1] = "That King Color...\nhe stole them all!";
         this.n1Text[2] = "";
      } else if (metKingColor == true && (hasRed || hasYellow || hasBlue) && (!hasRed || !hasYellow || !hasBlue)) {
         this.n1Text[0] = "Yeah, that's it! Keep collectin' the colors!";
         this.n1Text[1] = "";
      } else if (!bossDefeated){
         this.n1Text[0] = "You've got all the colors...y'know what to do.";
         this.n1Text[1] = "Go beat that tyrant, King\nColor, an' restore color to our land!";
         this.n1Text[2] = "You can do it! You're the\nonly one who can!";
         this.n1Text[3] = "";
      } else {
         this.n1Text[0] = "Y'did it! Ya really did it!";
         this.n1Text[1] = "Thanks so much! I knew you'd\nmake a good hero!";
         this.n1Text[2] = "How? Ah...ya just look the\npart, I guess.";
         this.n1Text[3] = "";
      }

      //The array for the text
      this.n2Text = new Array();

      // NPC2's text
      if (metKingColor == false) {
         this.n2Text[0] = "I'm on a CLOUD!";
         this.n2Text[1] = "The SUN! It's RIGHT THERE!";
         this.n2Text[2] = "PRAISE IT! PRAISE IT FOR\nALL YOU'RE WORTH!";
         this.n2Text[3] = "BY THE POWER OF\nTHE YELLOW LIGHT!";
         this.n2Text[4] = "";
      } else if (metKingColor == true && !hasYellow) {
         this.n2Text[0] = "The SUN! NOOOOOOO!";
         this.n2Text[1] = "OUR YELLOW GLORY\nMUST BE RESTORED!";
         this.n2Text[2] = "";
      } else if (!bossDefeated){
         this.n2Text[0] = "The SUN! IT HAS RETURNED!";
         this.n2Text[1] = "HAHAHAHA! With this, we\nare...UNBEATABLE! That false\nking will FALL before the SUN!";
         this.n2Text[2] = "";
      } else {
         this.n2Text[0] = "Beautiful! BEAUTIFUL!";
         this.n2Text[1] = "It is thanks to you that\nwe no longer suffer under that\nMALEVOLENT MONARCH!";
         this.n2Text[2] = "HAHAHAHA! PRAISE THE SUN!";
         this.n2Text[3] = "";
      }

      //The array for the text
      this.n3Text = new Array();

      // NPC3's text
      if (metKingColor == false) {
         this.n3Text[0] = "These berries sure are coming\nalong nicely! We'll eat\ngood this season.";
         this.n3Text[1] = "Their color's really coming\nthrough today!";
         this.n3Text[2] = "";
      } else if (metKingColor == true && !hasRed) {
         this.n3Text[0] = "The berries...they're\nwithering! Oh, no...";
         this.n3Text[1] = "Without the power of red\nto sustain them...";
         this.n3Text[2] = "";
      } else if (!bossDefeated) {
         this.n3Text[0] = "You've returned the\npower of Red!";
         this.n3Text[1] = "Oh, thank you, thank you!\nYou're a true hero!";
         this.n3Text[2] = "";
      } else {
         this.n3Text[0] = "Ah...the berries are red,\nthe bushes are green,\nand the sun shines again!";
         this.n3Text[1] = "Thank you so much, Mister. We'd love\nto have you here again anytime!";
         this.n3Text[2] = "";
      }

      //The array for the text
      this.n4Text = new Array();

      // NPC4's text
      if (metKingColor == false) {
         this.n4Text[0] = "Zzzz...";
         this.n4Text[1] = "(He's sleeping standing up.)";
         this.n4Text[2] = "";
      } else if (metKingColor == true && (!hasRed || !hasYellow || !hasBlue)) {
         this.n4Text[0] = "Zzzz...";
         this.n4Text[1] = "(He's STILL sleeping, somehow.)";
         this.n4Text[2] = "";
      } else if (!bossDefeated) {
         this.n4Text[0] = "Zzzz...";
         this.n4Text[1] = "(Never before have you seen\nsomeone so determined to sleep\nthrough the end of the world."
         this.n4Text[2] = "";
      } else {
         this.n4Text[0] = "Zzz...snrk...h-huh...?";
         this.n4Text[1] = "H-how long was I asleep...?\nAw, man, what'd I miss...?";
         this.n4Text[2] = "";
      }

      //The array for the text
      this.n5Text = new Array();

      // NPC5's text
      if (metKingColor == false) {
         this.n5Text[0] = "Uh...hey. This is Blue corner.\nY'know, color of the sky,\nthe ocean, all that?";
         this.n5Text[1] = "Yeah...it's pretty cool.\n'S why I dyed my hair blue.\nIt used to be red, but...eh.";
         this.n5Text[2] = "If you're wondering about\nthat guy, he's been sleeping\nlike that for a few hours.";
         this.n5Text[3] = "It was funny at first.\nNow I'm just kinda worried...";
         this.n5Text[4] = "";
      } else if (metKingColor == true && !hasRed && !hasYellow && !hasBlue) {
         this.n5Text[0] = "Oh, man...what happened\nto all the colors?!";
         this.n5Text[1] = "A-at least I've still\ngot my hair...";
         this.n5Text[2] = ""
      } else if (metKingColor == true && (!hasRed || !hasYellow || !hasBlue)) {
         this.n5Text[0] = "Hey, you're doing it! Great\nwork, man. Keep at it!";
         this.n5Text[1] = "";
      } else if (!bossDefeated){
         this.n5Text[0] = "Almost there. Show that\nKing Color guy what\nyou can do, eh?";
         this.n5Text[1] = "";
      } else {
         this.n5Text[0] = "Wow...you really showed\nthat guy what for, huh?";
         this.n5Text[1] = "I guess this'll just go\nback to being regular ol'\nblue corner...";
         this.n5Text[2] = "That's cool.";
         this.n5Text[3] = "";
      }

      //The array for the text
      this.n6Text = new Array();

      // NPC6's text
      if (metKingColor == false) {
         this.n6Text[0] = "Red, yellow, and blue...\nThe cornerstones of our world.";
         this.n6Text[1] = "They protect us, nourish\nus, make us what we are.";
         this.n6Text[2] = "But I've heard stories of an\nevil tyrant, who wants to\nsteal our colors away...";
         this.n6Text[3] = "I hope those stories are\nindeed just stories.";
         this.n6Text[4] = "";
      } else if (metKingColor == true && !hasRed && !hasYellow && !hasBlue) {
         this.n6Text[0] = "No...the colors,\nt-they're all gone!";
         this.n6Text[1] = "Y-you have to get them\nback! Those portals, they\nmust lead to the colors!";
         this.n6Text[2] = "Please, go through those\nportals, get our colors back...";
         this.n6Text[3] = "The world is\ncounting on you!";
         this.n6Text[4] = ""
      } else if (metKingColor == true && (!hasRed || !hasYellow || !hasBlue)) {
         this.n6Text[0] = "Look! The colors, they're\nstarting to come back!";
         this.n6Text[1] = "Keep it up! You can do this!";
         this.n6Text[2] = "";
      } else if (!bossDefeated) {
         this.n6Text[0] = "You've done it...all that's\nleft is the tyrant himself.";
         this.n6Text[1] = "The door to King Color awaits.\nDefeat him, and you'll surely\nrestore color to the world!";
         this.n6Text[2] = "";
      } else {
         this.n6Text[0] = "You've done it! King Color is\nno more, and with that, our\ncolors have returned!";
         this.n6Text[1] = "I really can't thank you enough.\nOver to the right, I've put a little\nsomething together for you."
         this.n6Text[2] = "It doesn't even begin to repay\nall the good you've done, but\nhopefully, it's at least a start.";
         this.n6Text[3] = "";
   }

   // The text at the end of the game for the credits.
   // Check if they have beaten the game.
   if( bossDefeated == true ){
       game.add.text(3424, 608, "You Won!!");
   }



      // Adds the player into the state
      if (metKingColor && !hasRed && !hasYellow && !hasBlue) {
         this.player = new Player(game, 64, 150, this.mapLayer);
      }
      else this.player = new Player(game, 64, 840, this.mapLayer);
      game.add.existing(this.player);

      // The enemy groups
      this.enemies = game.add.group();
      this.enemies.enableBody = true;
      this.shootingEnemies = game.add.group();
      this.shootingEnemies.enableBody = true;

      // // // Place a moving enemy
      // var e1 = new Enemy(game, 500, 300, -100, true, false, this.player);
      // game.add.existing(e1);
      // this.enemies.add(e1);
      // //
      // // // Place a shooting enemy
      // var e2 = new Enemy(game, 500, 300, -100, false, true, this.player);
      // game.add.existing(e2);
      // this.enemies.add(e2);

      // Bullet groups
      this.playerBullets = game.add.group();
      this.enemyBullets = game.add.group();

      // Camera follows player
      game.camera.follow(this.player);
      game.camera.deadzone = new Phaser.Rectangle(335, 200, 50, 100); // (x,y,width,height)

      // Timer for how often the enemies shoot
      timer = game.time.create(false);
      timer.loop(2000, this.enemyGroup, this);
      timer.start();

      // Timer for when the NPC text automatically goes to the next text
      npcText = game.time.create(false);
   },

   update: function() {
		// Sets boss door sprite depending on what colors you have
		if (metKingColor && !bossDefeated)
			this.bossPortal.animations.play('sprite')

		// If the player isn't overlapping with anything interactable, the interactText is invisible
	   if (!game.physics.arcade.overlap(this.player, this.npcs) && !game.physics.arcade.overlap(this.player, this.portals) || talking) {
	      this.interactText.visible = false;
			if (!talking)
				this.behindText.visible = false;
	   }

      // Go into the red state
      if (!hasRed) {
         if (this.physics.arcade.overlap(this.player, this.redPortal)) {

				if (!talking) {
	            // Display interact text
	            this.setTextPosition(this.interactText, this.redPortal);
	            this.interactText.visible = true;
				}

            if (game.input.keyboard.justPressed(Phaser.Keyboard.Z)) {
               game.state.start('Red');
            }
         }
      }

      // Go into the yellow state
      if (!hasYellow) {
         if (this.physics.arcade.overlap(this.player, this.yellowPortal)) {

				if (!talking) {
	            // Display interact text
	            this.setTextPosition(this.interactText, this.yellowPortal);
	            this.interactText.visible = true;
				}

            if (game.input.keyboard.justPressed(Phaser.Keyboard.Z)) {
               game.state.start('Yellow');
            }
         }
      }

      // Go into the blue state
      if (!hasBlue) {
         if (this.physics.arcade.overlap(this.player, this.bluePortal)) {

				if (!talking) {
	            // Display interact text
	            this.setTextPosition(this.interactText, this.bluePortal);
	            this.interactText.visible = true;
				}

            if (game.input.keyboard.justPressed(Phaser.Keyboard.Z)) {
               game.state.start('Blue');
            }
         }
      }

      // Meet King Color.
      if (metKingColor == false && !metKingColorTrigger) {
         if (this.physics.arcade.overlap(this.player, this.kingColorTrigger) && !talking) {
            talking = true;
            this.behindText.visible = true;
            this.interactText.visible = false;
            this.setTextPosition(this.textArea, this.n7);
            this.textArea.text = this.n7Text[0];
            this.whichNPC = this.n7Text;
            this.textPos++;
         }
      }

      if (metKingColorTrigger) {
         this.kingColorDude.body.velocity.x = -650;
      }

      if (this.physics.arcade.collide(this.npcs, this.kingColorDude)) {
         this.n7.body.velocity.x = -2000;
         this.n7.body.velocity.y = -500;
      }

      if (this.physics.arcade.collide(this.player, this.kingColorDude)) {
         hitByKingColor = true;
      }

      // Go into the boss room
      if (this.physics.arcade.overlap(this.player, this.bossPortal) && !talking) {
         // Display interact text
         this.setTextPosition(this.interactText, this.bossPortal);
         this.interactText.visible = true;

         if (game.input.keyboard.justPressed(Phaser.Keyboard.Z)) {
            if (hasRed && hasYellow && hasBlue)
               game.state.start('BossMap');
            else {
               // Timer for boss door text
               talking = true;
					this.behindText.visible = true;
               this.interactText.visible = false;
               this.setTextPosition(this.textArea, this.bossPortal);
               this.textArea.text = this.bossPortalText[0];
               this.whichNPC = this.bossPortalText;
            }
         }
      }

      // Player shoots a bullet for each key press
      if (game.input.keyboard.justPressed(Phaser.Keyboard.X) && hasRed && !playerDead) {
         var bullet = new Bullet(game, this.player.x, this.player.y, direction, playerBulletSpeed);
         game.add.existing(bullet);
         this.playerBullets.add(bullet);
      }

      // NPC1 text trigger
      if (game.physics.arcade.overlap(this.player, this.n1) && !talking) {
         // Display interact text
         this.setTextPosition(this.interactText, this.n1);
         this.interactText.visible = true;

         if (game.input.keyboard.justPressed(Phaser.Keyboard.Z)) {
            // Timer for npc text
            talking = true;
				this.behindText.visible = true;
            this.interactText.visible = false;
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
				this.behindText.visible = true;
            this.interactText.visible = false;
            this.setTextPosition(this.textArea, this.n2);
            this.textArea.text = this.n2Text[0];
            this.whichNPC = this.n2Text;
         }
      }

      // NPC3 text trigger
      if (game.physics.arcade.overlap(this.player, this.n3) && !talking) {
         // Display interact text
         this.setTextPosition(this.interactText, this.n3);
         this.interactText.visible = true;

         if (game.input.keyboard.justPressed(Phaser.Keyboard.Z)) {
            // Timer for npc text
            talking = true;
				this.behindText.visible = true;
            this.interactText.visible = false;
            this.setTextPosition(this.textArea, this.n3);
            this.textArea.text = this.n3Text[0];
            this.whichNPC = this.n3Text;
         }
      }

      // NPC4 text trigger
      if (game.physics.arcade.overlap(this.player, this.n4) && !talking) {
         // Display interact text
         this.setTextPosition(this.interactText, this.n4);
         this.interactText.visible = true;

         if (game.input.keyboard.justPressed(Phaser.Keyboard.Z)) {
            // Timer for npc text
            talking = true;
				this.behindText.visible = true;
            this.interactText.visible = false;
            this.setTextPosition(this.textArea, this.n4);
            this.textArea.text = this.n4Text[0];
            this.whichNPC = this.n4Text;
         }
      }

      // NPC5 text trigger
      if (game.physics.arcade.overlap(this.player, this.n5) && !talking) {
         // Display interact text
         this.setTextPosition(this.interactText, this.n5);
         this.interactText.visible = true;

         if (game.input.keyboard.justPressed(Phaser.Keyboard.Z)) {
            // Timer for npc text
            talking = true;
				this.behindText.visible = true;
            this.interactText.visible = false;
            this.setTextPosition(this.textArea, this.n5);
            this.textArea.text = this.n5Text[0];
            this.whichNPC = this.n5Text;
         }
      }

      // NPC6 text trigger
      if (game.physics.arcade.overlap(this.player, this.n6) && !talking) {
         // Display interact text
         this.setTextPosition(this.interactText, this.n6);
         this.interactText.visible = true;

         if (game.input.keyboard.justPressed(Phaser.Keyboard.Z)) {
            // Timer for npc text
            talking = true;
				this.behindText.visible = true;
            this.interactText.visible = false;
            this.setTextPosition(this.textArea, this.n6);
            this.textArea.text = this.n6Text[0];
            this.whichNPC = this.n6Text;
         }
      }

      if (talking) {
         if (game.input.keyboard.justPressed(Phaser.Keyboard.Z)) {
            this.goThroughText(this.whichNPC);
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

   // Called with a player bullet hits an enemy
   bulletHitsEnemy: function(bullet, enemy) {
      bulletDestroyed(game, bullet);
      enemyDies(game, enemy);
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

   // Creates the bullet for each enemy
   enemyShoot: function(enemy) {
      var bullet = new Bullet(game, enemy.x, enemy.y, enemy.direction, 350);
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

         if (text == this.n7Text) {
            metKingColorTrigger = true;
            game.camera.unfollow();
            game.time.events.add(Phaser.Timer.SECOND * 3.2, function() {
               metKingColor = true;
               game.state.start('Tutorial')
            });
         }
      }
   },

   // // Debug stuff
   // render: function() {
   //    game.debug.bodyInfo(this.player, 100, 100, 'black');
   //    game.debug.body(this.player);
   //    game.debug.body(this.kingColorTrigger);
   // }
};
