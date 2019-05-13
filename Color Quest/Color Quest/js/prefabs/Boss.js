function Boss(game, x, y) {
   // Inherits Phaser.Sprite and puts the sprite in a position on the screen
   Phaser.Sprite.call(this, game, x, y, 'boss');

   game.physics.arcade.enable(this);
   this.body.collideWorldBounds = true;
}

// Define Boss's prototype and constructor
Boss.prototype = Object.create(Phaser.Sprite.prototype);
Boss.prototype.constructor = Boss;

Boss.prototype.update = function() {

}
