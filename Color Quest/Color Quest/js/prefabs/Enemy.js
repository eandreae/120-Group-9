this.v = 0;
var dashing;

function Enemy(game, x, y, speed, d = false, j = false) {
   this.v = speed;
   dashing = d;

   // Inherits Phaser.Sprite and puts the sprite in a position on the screen
   Phaser.Sprite.call(this, game, x, y, 'atlas', 'badguy01');

   game.physics.arcade.enable(this);
   this.body.collideWorldBounds = true;
   this.body.velocity.x = this.v;
   //this.body.immovable = true;
   this.body.gravity.y = 300;

   // add the animations for the enemies.
   this.animations.add('right', ['badguy01', 'badguy02'], 10, true);
   this.animations.add('left', ['badguy03', 'badguy04'], 10, true);
}

// Define Enemy's prototype and constructor
Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

var hitPlatform;
Enemy.prototype.update = function() {

    var hitPlatform;

     hitPlatform = game.physics.arcade.collide(this, platforms);

   this.body.velocity.x = this.v;
   // if moving to the right.
   if(this.body.velocity.x > 0 ){
       this.animations.play('right');
   }
   // if moving to the right.
   if(this.body.velocity.x < 0 ){
       this.animations.play('left');
   }


}
