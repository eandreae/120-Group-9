var platforms;
var direction = 1; // 1 (facing right), -1 (facing left)
var r = false;
var jumps = 1;
var dash = 0;

// objects: The things the player can collide with
// red: True if the player has collected red
// yellow: True if the player has collected red
// blue: True if the player has collected red

function Player(game, x, y, objects, red, yellow, blue, green, purple, orange) {
   platforms = objects;
   if (blue) jumps = 2;
   if (purple) jumps = 3;
   if (yellow) dash = 1;
   r = red;

   // call to Phaser.Sprite
   // new Sprite(game, x, y, key, frame)
   Phaser.Sprite.call(this, game, x, y, 'player');

   // Gives the player physics
   game.physics.arcade.enable(this);
   this.body.collideWorldBounds = true;
   this.body.gravity.y = 300;
}

// explicitly define prefab's prototype (Phaser.Sprite) and constructor (Player)
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

// Arrow keys to move
// z to jump
// x to shoot
// c to dash
var tempJumps = 0;
var tempDash = 0;
Player.prototype.update = function() {

   // If player is colliding with a platform
   var hitPlatform = game.physics.arcade.collide(this, platforms);

   if (this.body.touching.down && hitPlatform) tempJumps = jumps;

   if (this.body.touching.down && hitPlatform) tempDash = dash;

   // Reset player velocity
   this.body.velocity.x = 0;

   // Moving Left
   if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      this.body.velocity.x = -200;
      direction = -1;
   }

   // Moving Right
   if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      this.body.velocity.x = 200;
      direction = 1;
   }

   // Player can jump only if they're touching the Ground
   if (game.input.keyboard.justPressed(Phaser.Keyboard.Z) && tempJumps != 0) {
      this.body.velocity.y = -250;
      tempJumps--
   }

   // Player shoots a bullet for each key press
   if (game.input.keyboard.justPressed(Phaser.Keyboard.X) && r) {
      var bullet = new Bullet(game, this.x, this.y, direction, .4, 1500);
      game.add.existing(bullet);
   }

   if (game.input.keyboard.justPressed(Phaser.Keyboard.C) && tempDash != 0) {
      this.x += 150 * direction;
      tempDash--;
   }
}
