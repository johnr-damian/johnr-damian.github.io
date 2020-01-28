/**
 * A collection of @see {@link Tree.js} that is in the environment.
 */
class Forest
{
    /**
     * Initializes the wind and the trees of the environment.
     * @param {The placeable locations of tree} locations 
     */
    constructor(locations)
    {
        this.Wind_YDirection = 0;

        this.Trees = [];
        for(let tree = 0; tree < locations.length; tree++)
            this.Trees.push(new Tree(locations[tree]));
    }

    /**
     * Draws the individual trees and updates the wind y direction.
     */
    PlaceForest()
    {
        this.Wind_YDirection += 0.005;
        for(let tree = 0; tree < this.Trees.length; tree++)
        {
            push();
            randomSeed(2100 * tree);            
            translate(this.Trees[tree].Location.x, this.Trees[tree].Location.y);
            this.Trees[tree].Draw(50, 0, this.Wind_YDirection);
            pop();
        }
    }
}