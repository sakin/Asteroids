ig.module(
    "game.entities.player"
).requires(
    "impact.entity"
).defines(function() {
    // Subclassed from ig.Enitity
    EntityPlayer = ig.Entity.extend({
        // Set the dimensions and offset for collision
        size: {x: 54, y: 83},
        offset: {x: 0, y: 0},

        // size: {x: 28, y: 50},
        // offset: {x: 18, y: 7},

        // Angle, in degrees for more rotation granularity
        angle: 0,
         
        // Thrust, dictating how much to accelerate
        thrust: 0,
 
        // Entity type
        type: ig.Entity.TYPE.A,

        checkAgainst: ig.Entity.TYPE.B,
 
        // Load an animation sheet
        animSheet: new ig.AnimationSheet("media/superman.png", 54, 83),
        //animSheet: new ig.AnimationSheet("media/player.png", 64, 64),
 
        init: function(x, y, settings) {
            // Call the parent constructor
            this.parent(x, y, settings);
 
            // Add animations for the animation sheet
            this.addAnim("idle", 0.05, [0]);
            this.addAnim("thrust", 0.05, [0,1]);
        },
 
        // This method is called for every frame on each entity.
        update: function() {            
 
            // "input.pressed" is called once for every key press
            // "input.state" is called on every frame that the key is held down for
            if (ig.input.state("left")) {
                this.angle -= 3;
            };
             
            if (ig.input.state("right")) {
                this.angle += 3;    
            };
             
            if (ig.input.state("up")) {
                // Accelerate the player in the right direction
                this.accel.x = Math.sin(this.angle*Math.PI/180)*this.thrust;
                this.accel.y = -(Math.cos(this.angle*Math.PI/180)*this.thrust);
                this.currentAnim = this.anims.thrust;
            } else {
                this.accel.x = 0;
                this.accel.y = 0;
                this.currentAnim = this.anims.idle;
            };
             
            // Set the angle for the current animation
            this.currentAnim.angle = this.angle*(Math.PI/180);

            // Call the parent update() method to move the entity according to its physics
            this.parent();
 
            // Boundary checks
            if (this.pos.x > ig.system.width) {
                this.pos.x = -64;
            } else if(this.pos.x < -64) {
                this.pos.x = ig.system.width;
            };
 
            if (this.pos.y > ig.system.height) {
                this.pos.y = -64;
            } else if (this.pos.y < -64) {
                this.pos.y = ig.system.height;
            };
        }, 
        check: function(other) {
            // Game over
            this.health = 0;
        },
    });
});