this.direction;

// x: x position
// y: y position
// d: 1 (going right) or -1 (going left)
function Bullet(game, x, y, dir, scale, speed) {
   this.direction = dir;

   // Inherits Phaser.Sprite and puts the sprite in a position on the screen
   var key;
   if (dir == 1) key = 'bullet_r';
   else if (dir == -1) key = 'bullet_l';
   Phaser.Sprite.call(this, game, x, y, key);
   this.scale.x = 1;
   this.scale.y = 1;
   this.anchor.set(0.5);

   game.physics.enable(this);

   // Sets the velocities of the bullet, depending on which side they spawned from
   this.body.velocity.x = speed * dir;
   //this.body.velocity.y = 0;
   this.body.immovable = true;
}

// Define Bullet's prototype and constructor
Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.update = function() {
   // Destroys the bullet if it goes off screen
   if (this.x < -50) {
      this.destroy();
      //this.x = 0;
      //console.log("bullet destroyed on left");
   } else if (this.x > game.world.width + 100) {
      this.destroy();
      //this.x = 0;
      //console.log("bullet destroyed on right");
   }
}
