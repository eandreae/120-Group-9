this.v = 0;
this.dashing;
this.jumping;
this.player;

function Enemy(game, x, y, speed, d = false, j = false, p) {
   this.v = speed;
   this.dashing = d;
   this.jumping = j;
   this.player = p;

   // Inherits Phaser.Sprite and puts the sprite in a position on the screen
   Phaser.Sprite.call(this, game, x, y, 'enemies') //, 'badguy01');

   game.physics.arcade.enable(this);
   this.body.collideWorldBounds = true;
   this.body.gravity.y = 300;

   // Add the animations for the enemies.

   // Red shooting enemies
   if (speed == 0 && !j) {
      this.animations.add('left', [0], 10, true);
      this.animations.add('right', [1], 10, true);
   }

   // Yellow moving enemies
   else if (speed != 0 && !j) {
      this.animations.add('left', [2], 10, true);
      this.animations.add('right', [3], 10, true);
   }

   // Blue jumping enemies
   if (j) {
      this.animations.add('left', [4], 10, true);
      this.animations.add('right', [5], 10, true);
   }

}

// Define Enemy's prototype and constructor
Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

var hitPlatform;
Enemy.prototype.update = function() {

   var hitPlatform;
   hitPlatform = game.physics.arcade.collide(this, platforms);

   if (this.body.blocked.left || this.body.blocked.right) this.v = -this.v;

   this.body.velocity.x = this.v;
   // if moving to the right.
   if (this.body.velocity.x > 0) {
      this.animations.play('right');
   }
   // if moving to the right.
   if (this.body.velocity.x < 0) {
      this.animations.play('left');
   }
}
