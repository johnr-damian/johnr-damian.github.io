/**
 * A recursive tree that can follow the environment's tree
 */
class Tree
{
    /**
     * Initializes the tree in a certain location.
     * @param {The current location of the tree} location 
     */
    constructor(location)
    {
        this.Location = location;
        this.BendAngle = PI / 4;
    }

    /**
     * Draws the tree branches recursively.
     * @param {The current height of tree} height 
     * @param {The flow of wind in east or west direction} wind_xdirection 
     * @param {The flow of wind in north or south direction} wind_ydirection 
     */
    Draw(height, wind_xdirection, wind_ydirection)
    {
        let branch_thickness = map(height, 3, 50, 1, 5);
        strokeWeight(branch_thickness);

        //Draw the branch
        line(0, 0, 0, -height);
        translate(0, -height);

        //Reduce the height and update the wind_xdirection
        height *= 0.7;
        wind_xdirection += 0.1;

        if(height > 3)
        {
            let child_branches = floor(random(1, 3));
            for(let branch = 0; branch < child_branches; branch++)
            {
                let wind_bend = map(noise(wind_xdirection + branch, wind_ydirection), 0, 1, -this.BendAngle, this.BendAngle);

                push();
                rotate(wind_bend);
                this.Draw(height, wind_xdirection, wind_ydirection);
                pop();
            }
        }
    }
}