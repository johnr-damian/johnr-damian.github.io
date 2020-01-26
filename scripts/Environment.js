class Environment
{
    constructor(theme)
    {
        //Store the Theme
        this.Background = theme[0];
        this.Fill = theme[1];
        this.Stroke = theme[2];

        //Prepare the Perlin Noise
        noiseSeed(random());

        //Create the Terrain
        this.Terrain = new Terrain(this.Fill, this.Stroke);
    }

    /**
     * Draws the current environment in canvas.
     */
    Draw()
    {
        background(175);

        //Place the Terrain
        this.Terrain.PlaceTerrain();
    }
}