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
   if (bullet.direction > 0) {
      minVelocity = -400;
      maxVelocity = 100;
   }
   else {
      minVelocity = -100;
      maxVelocity = 400;
   }

   // Emitter used when player dies
   deathEmitter = game.add.emitter(bullet.x, bullet.y, 100);
   deathEmitter.makeParticles('particle_r');
   deathEmitter.gravity = 0;
   deathEmitter.setScale(.3, .5, .3, .5, 0);
   deathEmitter.setAlpha(.8, 0, 200); 	            // .8 to 0 alpha
   deathEmitter.setXSpeed(minVelocity, maxVelocity);	// horizontal speed range
   deathEmitter.setYSpeed(-300,300);			         // vertical speed range
   deathEmitter.start(true, 200, null, 20);	         // (explode, lifespan, freq, quantity)

   bullet.kill();
}

function jumpParticle(game, object) {
   // Emitter used when object double jumps
   jumpEmitter = game.add.emitter(object.x, object.y + 55, 100);
   jumpEmitter.makeParticles('particle_b');
   jumpEmitter.gravity = 0;
   jumpEmitter.setScale(.3, .5, .3, .5, 0);
   jumpEmitter.setAlpha(.6, 0, 250); 	            // .8 to 0 alpha
   jumpEmitter.setXSpeed(-250, 250);            	// horizontal speed range
   jumpEmitter.setYSpeed(-20, 150);			         // vertical speed range
   jumpEmitter.start(true, 250, null, 20);	      // (explode, lifespan, freq, quantity)
}

function dashParticle(game, object) {
   // Emitter used when object double jumps
   dashEmitter = game.add.emitter(object.x, object.y + 32, 100);
   dashEmitter.makeParticles('particle_y');
   dashEmitter.gravity = 0;
   dashEmitter.setScale(.3, .5, .3, .5, 0);
   dashEmitter.setAlpha(.8, 0, 280); 	            // .8 to 0 alpha
   dashEmitter.setXSpeed(-250, 250);            	// horizontal speed range
   dashEmitter.setYSpeed(-150, 150);			      // vertical speed range
   dashEmitter.start(true, 280, null, 25);	      // (explode, lifespan, freq, quantity)
}
