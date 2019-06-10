this.color;            // For death particle color
this.direction = -1;   // Direction the enemy is facing
this.dashing;          // If the enemy can dash
this.dash = false;     // If the enemy is currently dashing
this.jumping;          // If the enemy can jump
this.jump = false;     // If the enemy is currently jumping
this.oldPos;           // Old position of the enemy. Used for dashing
this.sprite;           // Sets the sprite of the enemy depending on their abilities
this.timerJump;        // Timer for how often the enemy jumps
this.timerDash;        // Timer for how often the enemy dashes
this.v = 0;            // Velocity of the enemy
var enemyDashSFX;
var enemyJumpSFX;

// x: x position
// y: y position
// speed: Speed of the enemy
// d: If the enemy can dash (default to false)
// j: If the enemy can jump (default to false)
function Enemy(game, x, y, speed, d = false, j = false) {
   this.v = speed;
   this.dashing = d;
   this.jumping = j;
   enemyDashSFX = game.add.audio('enemyDash');
   enemyJumpSFX = game.add.audio('enemyJump');

   // If enemy can't jump or dash, they're a shooting red enemy
   if (!d && !j) {
      this.sprite = "enemies_r";
      this.color = 'particle_r';
   }

   // If enemy can dash and not jump, they're a yellow dashing enemy
   else if (d && !j) {
      this.sprite = "enemies_y";
      this.color = 'particle_y';
   }

   // If enemy can jump, they're a blue jumping enemy
   if (j) {
      this.sprite = "enemies_b";
      this.color = 'particle_b';
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

   // Timer for how often the blue enemies jump
   if (j) {
      timerJump = game.time.create(false);
      timerJump.loop(1500, enemyJumping, this, this);
      timerJump.start();
   }

   // Timer for how often the yellow enemies dash
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
   // Sets the direction of the enemy based on which way they're moving
   if (this.v > 0) {
      this.direction = 1;
      this.anchor.set(0.85, 0.45);
   }
   else if (this.v < 0) {
      this.direction = -1;
      this.anchor.set(0.15, 0.45);
   }
   else this.direction = -1;

   // If they bump into an object, change their direction
   if (this.body.blocked.left || this.body.blocked.right) {
      this.v = -this.v;
      this.dash = false;
   }

   // Sets gravity and velocity each update
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
   enemyJumpSFX.play('', 0, 0.5, false);
   this.jump = true;
}

// Called by the dashing timer
function enemyDashing(enemy) {
   enemyDashSFX.play('', 0, 0.5, false);
   enemy.dash = true;
   enemy.oldPos = enemy.x;
}
