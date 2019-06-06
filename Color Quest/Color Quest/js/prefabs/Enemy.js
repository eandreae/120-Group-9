this.v = 0;    // Velocity of the enemy
this.direction;   // Direction the enemy is facing
this.dashing;     // If the enemy can dash
this.jumping;     // If the enemy can jump
this.sprite;      // Sets the sprite of the enemy depending on their abilities
this.dash = false;   // If the enemy is currently dashing
this.jump = false;   // If the enemy is currently jumping
this.oldPos;      // Old position of the enemy. Used for dashing
this.timerJump;   // Timer for how often the enemy jumps
this.timerDash;   // Timer for how often the enemy dashes

function Enemy(game, x, y, speed, d = false, j = false) {
   this.v = speed;
   this.dashing = d;
   this.jumping = j;

   // If enemy is stationary, they're a shooting red enemy
   if (!d && !j) {
      this.sprite = "enemies_r";
   }

   // Yellow moving/dashing enemies
   else if (d && !j) {
      this.sprite = "enemies_y";
   }

   // Blue jumping enemies
   if (j) {
      this.sprite = "enemies_b";
   }

   // Inherits Phaser.Sprite and puts the sprite in a position on the screen
   Phaser.Sprite.call(this, game, x, y, this.sprite);

   // Physics of the enemy
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

Enemy.prototype.update = function() {
   // Sets the direction of the enemy
   if (this.v > 0) this.direction = 1;
   else if (this.v < 0) this.direction = -1;

   // If they bump into an object, change their direction
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

   // Makes the enemy jump once
   if (this.jump) {
      this.body.velocity.y = -500;
      //jumpParticle(game, this);
      this.jump = false;
   }

   // Enemy dashes a certain amount
   if (this.dash && Math.abs(this.oldPos - this.x) < 150) {
      this.body.velocity.x = 700 * this.direction;
      this.body.velocity.y = 0;
      this.body.gravity.y = 0;
   }
   else this.dash = false;
}

// Called by the jumping timer
function enemyJumping(enemy) {
   this.jump = true;
}

// Called by the dashing timer
function enemyDashing(enemy) {
   enemy.dash = true;
   enemy.oldPos = enemy.x;
}
