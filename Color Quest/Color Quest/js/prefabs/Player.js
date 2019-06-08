var dashing;               // If the player is currently dashing
var dash = 0;              // The # of dashes the player gets
var jumps = 0;             // The # of jumps the player gets
var jumpSFX;               // The jumping sound effect
var hp = health;           // Player health
var knockback;             // If player is currently in knockback state
var platforms;             // The platforms in the state
var hitPlatform = false    // If a player is colliding with a platform
var offPlatform = false;   // If the player has gone off the platform
var oldPos;                // Old position of the player. Used for dashing and knockback
var timerFlash;            // Timer for how often the player flashes when injured
var timerStopFlash;        // Timer to stop timerFlash


// x: x position
// y: y position
// map: The map the player will collide with
function Player(game, x, y, map) {
   platforms = map;
   jumpSFX = game.add.audio('jump');
   hp = health;
   direction = 1;

   // call to Phaser.Sprite
   Phaser.Sprite.call(this, game, x, y, 'bucky', 'bucky_stand_right');
   this.scale.x = 1;
   this.scale.y = 1;
   this.anchor.set(0.5, 0.2);

   // Add the animations to the player. Bucky sprites depends on the Bucky value
   this.animations.add('jump_left', [buckyValue + 0], 10, true);
   this.animations.add('jump_right', [buckyValue + 1], 10, true);
   this.animations.add('idle_left', [buckyValue + 2], 10, true);
   this.animations.add('idle_right', [buckyValue + 3], 10, true);
   this.animations.add('left', [buckyValue + 4, buckyValue + 5, buckyValue + 6, buckyValue + 7, buckyValue + 8, buckyValue + 9], 10, true);
   this.animations.add('right', [buckyValue + 10, buckyValue + 11, buckyValue + 12, buckyValue + 13, buckyValue + 14, buckyValue + 15], 10, true);
   this.animations.add('dash_left', [128], 10, true);
   this.animations.add('dash_right', [129], 10, true);

   // Gives the player physics
   game.physics.arcade.enable(this);
   this.body.collideWorldBounds = true;
   this.body.gravity.y = 850;
   this.body.maxVelocity.setTo(300, 99999);
   this.body.drag.setTo(900, 0);
}

// explicitly define prefab's prototype (Phaser.Sprite) and constructor (Player)
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

// Arrow keys to move
// UP to jump
// x to shoot
// c to dash
Player.prototype.update = function() {

   // Determines which Bucky sprite we will be using based on the colors we have
   if (hasBlue) {
      buckyValue = 16;
      if (hasYellow) {
         buckyValue = 32;
         if (hasRed) {
            buckyValue = 80;
         }
      } else if (hasRed) {
         buckyValue = 64;
      }
   } else if (hasRed) {
      buckyValue = 48;
      if (hasYellow) {
         buckyValue = 96;
      }
   } else if (hasYellow) {
      buckyValue = 112;
   }

   // If player is colliding with a platform
   hitPlatform = game.physics.arcade.collide(this, platforms);

   // If the player hits an obstacle while dashing, stop their dash
   if (this.body.blocked.left || this.body.blocked.right) {
      dashing = false;
   }

   // Jumps depending on how many jumps it has. Refreshed when touching the ground
   if (this.body.blocked.down || this.body.touching.down && hitPlatform) {
      offPlatform = false;
      doubleJump = false;
      jumps = 1;
      if (hasBlue) jumps = 2;
   }
   // If the player just walks off a platform, they cannot jump unless they have
   // the double jump
   else if (!offPlatform) {
      offPlatform = true;
      doubleJump = true;
      jumps--;
   }

   // Player dash count. Refreshed when touching the ground
   if (this.body.blocked.down || this.body.touching.down && hitPlatform) {
      dash = 0;
      if (hasYellow) dash = 1;
   }

   // Reset player velocity/acceleration
   this.body.acceleration.x = 0;
   this.body.gravity.y = 850;
   this.body.maxVelocity.setTo(300, 99999);

   // Moving Left
   if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && !dashing && !knockback && !talking) {
      this.body.acceleration.x = -1500;
      if (this.body.blocked.down) this.animations.play('left');
      else this.animations.play('jump_left');
      direction = -1;
   }

   // Moving Right
   else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && !dashing && !knockback && !talking) {
      this.body.acceleration.x = 1500;
      if (this.body.blocked.down) this.animations.play('right');
      else this.animations.play('jump_right');
      direction = 1;
   }

   // Idle animations
   else {
      if (direction == 1) {
         if (this.body.blocked.down) this.animations.play('idle_right');
         else this.animations.play('jump_right');
      } else if (direction == -1) {
         if (this.body.blocked.down) this.animations.play('idle_left');
         else this.animations.play('jump_left');
      }
   }

   // Dashing animations
   if (dashing) {
      if (direction == 1) this.animations.play('dash_right');
      else if (direction == -1) this.animations.play('dash_left');
   }

   // Player can jump only if they're touching the Ground
   if (game.input.keyboard.justPressed(Phaser.Keyboard.UP) && jumps >= 1 && !playerDead && !talking) {
      jumpSFX.play('', 0, .5, false);
      offPlatform = true;
      this.body.velocity.y = -500;
      jumps--;

      // Makes particles for double jumping
      if (doubleJump) jumpParticle(game, this);
      doubleJump = true;
   }

   // Player can only dash once in the air
   if (game.input.keyboard.justPressed(Phaser.Keyboard.C) && dash != 0 && !playerDead && !talking) {
      dashing = true;
      oldPos = this.x;
      dash--;

      // Makes particles for dashing
      dashParticle(game, this);
   }

   // Dashes the player forward a certain amount
   if (dashing && Math.abs(oldPos - this.x) < 150) {
      this.body.maxVelocity.setTo(700, 99999);
      this.body.velocity.x = 700 * direction;
      this.body.velocity.y = 0;
      this.body.gravity.y = 0;
   } else dashing = false;

   // If the player has taken damage
   if (health < hp && health != 0) {
      injured = true;
      knockback = true;
      hp = health;
      oldPos = this.x;

      // How often the player flashes when they take damage
      timerFlash = game.time.create(false);
      timerFlash.loop(18, playerFlash, this, this);
      timerFlash.start();

      // Stops the flashing after 3 seconds
      timerStopFlash = game.time.create(false);
      timerStopFlash.loop(3000, playerStopFlash, this, this);
      timerStopFlash.start();
   }

   // Player knockback when injured. They cannot be hit again during this
   if (knockback && Math.abs(oldPos - this.x) < 75) {
      this.body.velocity.x = 350 * -direction;
      this.body.velocity.y = -150;
      dashing = false;

      // Stops the knockback if they collide with something
      if (this.body.blocked.right || this.body.blocked.left) knockback = false;
   } else knockback = false;

   // When they get hit by King Color in the cut scene, they get sent flying
   if (hitByKingColor) {
      this.body.maxVelocity.setTo(10000, 99999);
      this.body.velocity.x = -1800;
      this.body.velocity.y = -500;
   }
}

// Flashes the player very quickly
function playerFlash(player) {
   player.visible = !player.visible;
}

// Stops the player from flashing
function playerStopFlash(player) {
   player.visible = true;
   injured = false;
   timerFlash.stop();
   timerStopFlash.stop();
}
