var platforms;
var jumps = 0;
var offPlatform = false;
var dash = 0;
var dashing;
var oldPos;
var jumpSFX;
var hp = health;
var injured = false;

// objects: The things the player can collide with
// red: True if the player has collected red
// yellow: True if the player has collected red
// blue: True if the player has collected red

function Player(game, x, y, objects) {
   platforms = objects;
   jumpSFX = game.add.audio('jump');
   hp = health;

   // call to Phaser.Sprite
   // new Sprite(game, x, y, key, frame)
   Phaser.Sprite.call(this, game, x, y, 'bucky');
   this.scale.x = 0.031;
   this.scale.y = 0.031;
   //this.anchor.set(0.5);

   // // Add the animations to the player.
   // this.animations.add('idle', ['player_walk05'], 10, true);
   // this.animations.add('right', ['player_walk01', 'player_walk02', 'player_walk03', 'player_walk04'], 10, true);
   // this.animations.add('left', ['player_walk06', 'player_walk07', 'player_walk08', 'player_walk09'], 10, true);

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
// z to jump
// x to shoot
// c to dash
var hitPlatform;
Player.prototype.update = function() {

   // If player is colliding with a platform
   var hitPlatform;

   hitPlatform = game.physics.arcade.collide(this, platforms);

   if (this.body.blocked.left || this.body.blocked.right) {
      dashing = false;
   }

   // Jumps depending on how many jumps it has. Refreshed when touching the ground
   if (this.body.blocked.down || this.body.touching.down && hitPlatform) {
      offPlatform = false;
      jumps = 1;
      if (hasBlue) jumps = 2;
   }
   else if (!offPlatform) {
      offPlatform = true;
      jumps--;
   }

   // Player dash count. Refreshed when touching the ground
   if (this.body.blocked.down || this.body.touching.down && hitPlatform) {
      dash = 0;
      if (hasYellow) dash = 1;
   }

   // Reset player velocity
   this.body.acceleration.x = 0;
   this.body.gravity.y = 850;

   // Moving Left
   if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && !dashing && !injured) {
      this.body.acceleration.x = -1500;
      this.animations.play('left');
      direction = -1;
  }

   // Moving Right
   else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && !dashing && !injured) {
      this.body.acceleration.x = 1500;
      this.animations.play('right');
      direction = 1;
   }

   else {
       this.animations.play('idle');
   }

   // Player can jump only if they're touching the Ground
   if (game.input.keyboard.justPressed(Phaser.Keyboard.UP) && jumps >= 1) {
      jumpSFX.play('', 0, .5, false);
      offPlatform = true;
      this.body.velocity.y = -450;
      jumps--;
   }

   // Player can only dash once in the air
   if (game.input.keyboard.justPressed(Phaser.Keyboard.C) && dash != 0) {
      dashing = true;
      oldPos = this.x;
      dash--;
   }

   if (dashing && Math.abs(oldPos - this.x) < 150) {
      this.body.velocity.x = 700 * direction;
      this.body.velocity.y = 0;
      this.body.gravity.y = 0;
   }
   else dashing = false;

   if (health < hp) {
      injured = true;
      hp = health;
      oldPos = this.x;
   }

   if (injured && Math.abs(oldPos - this.x) < 75) {
      this.body.velocity.x = 300 * -direction;
      this.body.velocity.y = -175;
      dashing = false;
   }
   else injured = false;

}
