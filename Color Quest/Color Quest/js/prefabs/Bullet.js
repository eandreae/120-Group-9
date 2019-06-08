this.direction;   // Direction the bullet is going

// x: x position
// y: y position
// dir: 1 (going right) or -1 (going left)
// speed: Speed of the bullet
function Bullet(game, x, y, dir, speed) {
   this.direction = dir;

   // Sprite of the bullet depending on the direction
   var key;
   if (dir == 1) key = 'bullet_r';
   else if (dir == -1) key = 'bullet_l';

   // Inherits Phaser.Sprite and puts the sprite in a position on the screen
   Phaser.Sprite.call(this, game, x, y, key);
   this.anchor.set(0.5);

   // Physics for the bullets
   game.physics.enable(this);
   this.body.velocity.x = speed * dir; // Sets the velocities of the bullet, depending on which side they spawned from
   this.body.immovable = true;
}

// Define Bullet's prototype and constructor
Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.update = function() {
   // Destroys the bullet if it goes off screen
   if (this.x < -50) {
      this.destroy();
   } else if (this.x > game.world.width + 100) {
      this.destroy();
   }
}
