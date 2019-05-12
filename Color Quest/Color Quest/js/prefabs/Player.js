var platforms;
var direction = 1; // 1 (facing right), -1 (facing left)
var jumps = 0;
var dash = 0;

// objects: The things the player can collide with
// red: True if the player has collected red
// yellow: True if the player has collected red
// blue: True if the player has collected red

function Player(game, x, y, objects) {
   platforms = objects;

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
Player.prototype.update = function() {

   // If player is colliding with a platform
   var hitPlatform = game.physics.arcade.collide(this, platforms);

   if (this.body.touching.down && hitPlatform) {
      jumps = 1;
      if (hasBlue) jumps = 2;
      if (hasPurple) jumps = 3;
   }

   if (this.body.touching.down && hitPlatform) {
      dash = 0;
      if (hasYellow) dash = 1;
   }

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
   if (game.input.keyboard.justPressed(Phaser.Keyboard.Z) && jumps != 0) {
      this.body.velocity.y = -250;
      jumps--;
   }

   // Player shoots a bullet for each key press
   if (game.input.keyboard.justPressed(Phaser.Keyboard.X) && hasRed) {
      var bullet = new Bullet(game, this.x, this.y, direction, .4, 1500);
      game.add.existing(bullet);
   }

   if (game.input.keyboard.justPressed(Phaser.Keyboard.C) && dash != 0) {
      this.x += 150 * direction;
      dash--;
   }
}
