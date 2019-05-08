var direction;

// x: x position
// y: y position
// d: true (going right) or false (going left)
function Bullet(game, x, y, d) {
   direction = d;

   // Inherits Phaser.Sprite and puts the sprite in a position on the screen
   Phaser.Sprite.call(this, game, x, y, 'bullet');
   this.scale.x = .4;
   this.scale.y = .4;
   //this.anchor.set(0.5);

   game.physics.enable(this);

   if (direction) xDir = 1;     // Moving right
   else xDir = -1;              // Moving left

   // Sets the velocities of the bullet, depending on which side they spawned from
   this.body.velocity.x = 100 * xDir;
   //this.body.velocity.y = 0;
   this.body.immovable = true;
}

// Define Bullet's prototype and constructor
Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.update = function() {
   // Destroys the bullet if it goes off screen
   if (this.x < -50)
   {
      this.kill();
      this.x = 0;
      //console.log("bullet destroyed on left");
   }
   else if (this.x > game.world.width + 100)
   {
      this.kill();
      this.x = 0;
      console.log("bullet destroyed on right");
   }
}
