function NPC(game, x, y) {

   // Inherits Phaser.Sprite and puts the sprite in a position on the screen
   Phaser.Sprite.call(this, game, x, y, 'npc');

   this.anchor.set(0.5);

   // Enable physics for the NPCs
   game.physics.arcade.enable(this);
   this.body.collideWorldBounds = true;
   this.body.gravity.y = 300;
}

// Define NPC's prototype and constructor
NPC.prototype = Object.create(Phaser.Sprite.prototype);
NPC.prototype.constructor = NPC;

NPC.prototype.update = function() {

}
