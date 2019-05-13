var platforms;
var jumps = 0;
var dash = 0;
var jumpSFX;

// objects: The things the player can collide with
// red: True if the player has collected red
// yellow: True if the player has collected red
// blue: True if the player has collected red

function Player(game, x, y, objects) {
   platforms = objects;
   jumpSFX = game.add.audio('jump');

   // call to Phaser.Sprite
   // new Sprite(game, x, y, key, frame)
   Phaser.Sprite.call(this, game, x, y, 'atlas', 'player_walk05');

   // Add the animations to the player.
   this.animations.add('idle', ['player_walk05'], 10, true);
   this.animations.add('right', ['player_walk01', 'player_walk02', 'player_walk03', 'player_walk04'], 10, true);
   this.animations.add('left', ['player_walk06', 'player_walk07', 'player_walk08', 'player_walk09'], 10, true);

   // Gives the player physics
   game.physics.arcade.enable(this);
   this.body.collideWorldBounds = true;
   this.body.gravity.y = 300;
}

// explicitly define prefab's prototype (Phaser.Sprite) and constructor (Player)
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

// Arrow keys to move
// z to jump
// x to shoot
// c to dash
Player.prototype.update = function() {

   // If player is colliding with a platform
   var hitPlatform = game.physics.arcade.collide(this, platforms);

   if (this.body.blocked.down || this.body.touching.down && hitPlatform) {
      jumps = 1;
      if (hasBlue) jumps = 2;
      if (hasPurple) jumps = 3;
   }

   if (this.body.blocked.down || this.body.touching.down && hitPlatform) {
      dash = 0;
      if (hasYellow) dash = 1;
   }

   // Reset player velocity
   this.body.velocity.x = 0;

   // Moving Left
   if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      this.body.velocity.x = -200;
      this.animations.play('left');
      direction = -1;
  }

   // Moving Right
   else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      this.body.velocity.x = 200;
      this.animations.play('right');
      direction = 1;
   }

   else {
       this.animations.play('idle');
   }

   // Player can jump only if they're touching the Ground
   if (game.input.keyboard.justPressed(Phaser.Keyboard.Z) && jumps != 0) {
      jumpSFX.play('', 0, .5, false);
      this.body.velocity.y = -250;
      jumps--;
   }

   if (game.input.keyboard.justPressed(Phaser.Keyboard.C) && dash != 0) {
      this.x += 150 * direction;
      dash--;
   }
}
