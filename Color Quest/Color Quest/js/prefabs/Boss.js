// x: x position
// y: y position
function Boss(game, x, y) {
   // Inherits Phaser.Sprite and puts the sprite in a position on the screen
   Phaser.Sprite.call(this, game, x, y, 'boss_fixed', 'KingColor');

   // Adds idle and shooting animations for King Color
   this.animations.add('idle', [0], 10, true);
   this.animations.add('shoot', [1, 2, 3, 4, 5, 0], 10, false);

   game.physics.arcade.enable(this);
   this.body.collideWorldBounds = true;

   this.body.immovable = true;
}

// Define Boss's prototype and constructor
Boss.prototype = Object.create(Phaser.Sprite.prototype);
Boss.prototype.constructor = Boss;

Boss.prototype.update = function() {

}
