ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	"game.entities.asteroid",
	"game.entities.player"
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	background: new ig.Image("media/background.png"),
	gameOver: false,
	player: null,
	
	init: function() {
		// Initialize your game here; bind keys etc.
		ig.input.bind(ig.KEY.LEFT_ARROW, "left");
		ig.input.bind(ig.KEY.RIGHT_ARROW, "right");
		ig.input.bind(ig.KEY.UP_ARROW, "up");
		ig.input.bind(ig.KEY.ENTER, "play");
		

		var asteroidSettings;
		for (var i = 0; i < 8; i++) {
		    asteroidSettings = {vel: {x: 100-Math.random()*200, y: 100-Math.random()*200}};
		    this.spawnEntity(EntityAsteroid, ig.system.width/2, ig.system.height/2, asteroidSettings);
		};

		// Load player entitiy
		var playerSettings = {thrust: 250, maxVel: {x: 300, y: 300}};
		this.player = this.spawnEntity(EntityPlayer, 150, 150, playerSettings);


	},
	
	update: function() {
		// Update all entities and backgroundMaps
		// Run if the game is over
		if (this.gameOver) {
		    if(ig.input.pressed("play") ) {
		        ig.system.setGame(MyGame);
		    };
		 
		    // Return to stop anything else updating
		    return;
		};


		this.parent();
		

		// Check for game over condition
		if (this.player.health == 0) {
		    this.gameOver = true;
		};
		// Add your own, additional update code here
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		// Draw the background
		this.background.draw(0, 0);
		// Game over screen
		if (this.gameOver) {
		    this.font.draw("Game Over!", ig.system.width/2, 132, ig.Font.ALIGN.CENTER);
		    this.font.draw("Press Enter", ig.system.width/2, 232, ig.Font.ALIGN.CENTER);
		    this.font.draw("to Restart", ig.system.width/2, 272, ig.Font.ALIGN.CENTER);
		 
		    // Return to stop anything else drawing
		    return;
		};


		// Draw all entities
		for(var i = 0; i < this.entities.length; i++) {
		    this.entities[i].draw();
		};
		
		
		// Add your own drawing code here
		var x = ig.system.width/2,
			y = ig.system.height/2;
		
		//this.font.draw( 'It Works!', x, y, ig.Font.ALIGN.CENTER );
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( "#gameCanvas", MyGame, 60, 768, 512, 1 );

});
