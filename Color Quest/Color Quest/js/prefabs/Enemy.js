this.v = 0;
this.direction;
this.dashing;
this.jumping;
this.player;
this.sprite;
this.dash = false;
this.oldPos;
this.timerJump;
this.timerDash;

function Enemy(game, x, y, speed, d = false, j = false, p) {
   this.v = speed;
   this.dashing = d;
   this.jumping = j;
   this.player = p;

   if (speed == 0 && !j) {
      this.sprite = "enemies_red";
   }

   // Yellow moving enemies
   else if (speed != 0 && !j) {
      this.sprite = "enemies_yellow";
   }

   // Blue jumping enemies
   if (j) {
      this.sprite = "enemies_blue";
   }

   // Inherits Phaser.Sprite and puts the sprite in a position on the screen
   Phaser.Sprite.call(this, game, x, y, this.sprite);

   game.physics.arcade.enable(this);
   this.body.collideWorldBounds = true;
   this.body.gravity.y = 850;
   this.anchor.set(0.15, 0.45);

   // Add the animations for the enemies.

   this.animations.add('left', [0], 10, true);
   this.animations.add('right', [1], 10, true);

   // Blue jumping enemies
   if (j) {
      timerJump = game.time.create(false);
      timerJump.loop(1500, enemyJumping, this, this);
      timerJump.start();
   }

   // Yellow dashing enemies
   if (d) {
      timerDash = game.time.create(false);
      timerDash.loop(2000, enemyDashing, this, this);
      timerDash.start();
   }
}

// Define Enemy's prototype and constructor
Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

var hitPlatform;
Enemy.prototype.update = function() {

   if (this.v > 0) this.direction = 1;
   else if (this.v < 0) this.direction = -1;

   if (this.body.blocked.left || this.body.blocked.right) {
      this.v = -this.v;
      this.dash = false;
   }

   this.body.gravity.y = 850;
   this.body.velocity.x = this.v;

   // If moving to the right.
   if (this.body.velocity.x > 0) {
      this.animations.play('right');
   }
   // If moving to the right.
   if (this.body.velocity.x < 0) {
      this.animations.play('left');
   }

   if (this.dash && Math.abs(this.oldPos - this.x) < 150) {
      this.body.velocity.x = 700 * this.direction;
      this.body.velocity.y = 0;
      this.body.gravity.y = 0;
   }
   else this.dash = false;
}

function enemyJumping(enemy) {
   enemy.body.velocity.y = -500;
   jumpParticle(game, enemy);
}

function enemyDashing(enemy) {
   enemy.dash = true;
   enemy.oldPos = enemy.x;
}
