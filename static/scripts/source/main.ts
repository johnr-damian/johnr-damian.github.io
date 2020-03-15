/**
 * The environment for the HTML canvas.
 */
export abstract class Environment
{
    /**
     * Updates the existing objects in the environment.
     */
    abstract Update() : void;

    /**
     * Renders the existing objects in the environment.
     */
    abstract Render() : void;
}

/**
 * The main program.
 */
class Program
{
    private static core : Program | null = null;
    public environment : Environment | null = null;

    constructor(environment : Environment)
    {
        this.environment = environment;
    }

    /**
     * The main loop for the environment.
     */
    public Main() : void
    {
        if(this.environment != null)
        {
            this.environment.Update();
            this.environment.Render();
        }
    }
    
    /**
     * Returns a created instance of this program.
     */
    public static GetInstance(environment : Environment) : Program
    {
        if(this.core === null)
            this.core = new Program(environment);

        return this.core;
    }
}