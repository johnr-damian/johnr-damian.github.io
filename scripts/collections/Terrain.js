/**
 * Represents as the environment's land.
 */
class Terrain
{
    /**
     * Creates a random land using Perlin Noise.
     * Reference {@link https://p5js.org/examples/math-noise-wave.html}
     * @param {The color of land} fill 
     * @param {The color of surface} stroke 
     */
    constructor(fill, stroke)
    {
        this.Fill = fill;
        this.Stroke = stroke;

        this.Partition = 20;
        this.Vertices = [];
        for(let max_height = (height / 2), time = 0, x = 0; x < width; time += 0.07, x += this.Partition)
            this.Vertices.push(createVector(x, map(noise(time), 0, 1, max_height, height)));
    }

    /**
     * Places generated land in the environment.
     */
    PlaceTerrain()
    {
        push();
        fill(this.Fill);
        stroke(this.Stroke);

        beginShape();
        for(let point = 0; point < this.Vertices.length; point++)
            vertex(this.Vertices[point].x, this.Vertices[point].y);        
        //Closing Vertices
        vertex(width, height);
        vertex(0, height);
        endShape(CLOSE);

        pop();
    }
}