class Environment
{
    constructor(theme)
    {
        //Store the Theme
        this.Background = theme[0];
        this.Fill = theme[1];
        this.Stroke = theme[2];

        //Prepare the Random and Perlin Noise
        noiseSeed(1000);

        //Create the Terrain
        this.Terrain = new Terrain(this.Fill, this.Stroke);
        this.Forest = new Forest(this.Terrain.GetRandomLocations(5), this.Fill, this.Stroke);
    }

    /**
     * Draws the current environment in canvas.
     */
    Draw()
    {
        background(this.Background);
        fill(this.Fill);
        stroke(this.Stroke);

        //Place the Terrain
        this.Terrain.PlaceTerrain();

        //Place the Forest
        this.Forest.PlaceForest();
    }
}