var platforms;
var direction = true; // true (facing right), false (facing left)

// objects: The things the player can collide with
// red: True if the player has collected red
// yellow: True if the player has collected red
// blue: True if the player has collected red

function Player(game, objects, red, yellow, blue) {
   platforms = objects;
   // call to Phaser.Sprite
   // new Sprite(game, x, y, key, frame)
   Phaser.Sprite.call(this, game, 64, 400, 'player');

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

   // Reset player velocity
   this.body.velocity.x = 0;

   // Moving Left
   if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      this.body.velocity.x = -200;
      direction = false;
   }

   // Moving Right
   if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      this.body.velocity.x = 200;
      direction = true;
   }

   // Player can jump only if they're touching the Ground
   if (game.input.keyboard.isDown(Phaser.Keyboard.Z) && this.body.touching.down && hitPlatform) {
      this.body.velocity.y = -225;
   }

   // Player shoots a bullet for each key press
   if (game.input.keyboard.justPressed(Phaser.Keyboard.X)) {
      var bullet = new Bullet(game, this.x, this.y, direction);
      game.add.existing(bullet);
   }
}
