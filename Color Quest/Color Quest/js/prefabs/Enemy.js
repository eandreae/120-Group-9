
function Enemy(game, x, y) {

   // Inherits Phaser.Sprite and puts the sprite in a position on the screen
   Phaser.Sprite.call(this, game, x, y, 'enemy');

   game.physics.arcade.enable(this);
   this.body.collideWorldBounds = true;
   this.body.velocity.x = -20;
   //this.body.immovable = true;
   this.body.gravity.y = 300;
}

// Define Enemy's prototype and constructor
Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function() {
   this.body.velocity.x = -20;
}
