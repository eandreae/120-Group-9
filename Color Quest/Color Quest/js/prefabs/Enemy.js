var v = 0;
function Enemy(game, x, y, speed) {
   v = speed;
   //console.log(velocity);
   // Inherits Phaser.Sprite and puts the sprite in a position on the screen
   Phaser.Sprite.call(this, game, x, y, 'enemy');

   game.physics.arcade.enable(this);
   this.body.collideWorldBounds = true;
   this.body.velocity.x = v;
   //this.body.immovable = true;
   this.body.gravity.y = 300;
}

// Define Enemy's prototype and constructor
Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function() {
   //console.log(v);
   //this.body.velocity.x = v;
}
