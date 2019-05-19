// File that contains useful functions that any state can use

// Called when the player dies
function playerDies(game, player, state) {

   // Red square bit map data
   bmd = game.add.bitmapData(18, 18);
   bmd.fill(255, 0, 0, 1);

   // Emitter used when player dies
   deathEmitter = game.add.emitter(player.x, player.y, 200);
   deathEmitter.makeParticles(bmd);		        // red squares used as particles
   deathEmitter.gravity = 0;
   deathEmitter.setScale(.25, .8, .25, .8, 0);
   deathEmitter.setAlpha(.8, 0, 1800); 	      // .8 to .3 alpha
   deathEmitter.setXSpeed(-100,100);			   // horizontal speed range
   deathEmitter.setYSpeed(-100,100);			   // vertical speed range
   deathEmitter.start(true, 2000, null, 50);	   // (explode, lifespan, freq, quantity)
   player.kill();
   game.time.events.add(Phaser.Timer.SECOND * 2, function() { game.state.start('GameOver', true, false, state)});
}

function bulletDestroyed(game, bullet) {
   // Red square bit map data
   bmd = game.add.bitmapData(15, 15);
   bmd.fill(255, 0, 0, 1);

   // Emitter used when player dies
   deathEmitter = game.add.emitter(bullet.x, bullet.y, 200);
   deathEmitter.makeParticles(bmd);		        // red squares used as particles
   deathEmitter.gravity = 0;
   deathEmitter.setScale(.25, .8, .25, .8, 0);
   deathEmitter.setAlpha(.8, 0, 1800); 	      // .8 to .3 alpha
   deathEmitter.setXSpeed(-100,100);			   // horizontal speed range
   deathEmitter.setYSpeed(-100,100);			   // vertical speed range
   deathEmitter.start(true, 2000, null, 50);	   // (explode, lifespan, freq, quantity)

   bullet.kill();
   //game.time.events.add(Phaser.Timer.SECOND * 2, function() { game.state.start('GameOver')});
}
