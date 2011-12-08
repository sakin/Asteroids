ig.module(
    "game.entities.asteroid"
).requires(
    "impact.entity"
).defines(function() {
    // Subclassed from ig.Enitity
    EntityAsteroid = ig.Entity.extend({
        // Set some of the properties
        size: {x: 64, y: 64},
 
        // Entity type
        type: ig.Entity.TYPE.B,

        // Load an animation sheet
        animSheet: new ig.AnimationSheet("media/asteroid.png", 64, 64),
 
        init: function(x, y, settings) {
            // Call the parent constructor
            this.parent(x, y, settings);

            // Add animations for the animation sheet
            this.addAnim("idle", 1, [0]);
        },
 
        // This method is called for every frame on each entity.
        update: function() {
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
        }
    });
});
