// Main Menu state
var MainMenu = function(game) {};
MainMenu.prototype = {
   preload: function() {

   },

   create: function() {
      console.log('MainMenu: create');

      game.add.sprite(0, 0, 'title');

      song = game.add.audio('title music');
      song.play('', 0, 0.5, true);

      // game.add.text(300, 250, "Press [SPACE] to go to tutorial");
      // game.add.text(300, 350, "Arrow keys ⬅➡ to move");
      // game.add.text(300, 450, "UP ⬆ to jump");
   },

   update: function() {
      //console.log('MainMenu: update');
      if(game.input.keyboard.isDown(Phaser.Keyboard.Z)){
         game.state.start('Tutorial');
      }
   }
};
