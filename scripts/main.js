let environment = null;

/**
 * The entry point of main.js. Checks the time 
 * and applies an appropriate theme using CSS.
 */
function initialize()
{
    let current_time = new Date().getHours();
    let current_stylesheet = document.createElement("link");
    let current_theme = [];

    current_stylesheet.type = "text/css";
    current_stylesheet.rel = "stylesheet";
    //Morning Theme
    if(current_time < 8)
    {
        current_stylesheet.href = "styles/themes/morning.css";
        current_theme.push("");
        current_theme.push("");
        current_theme.push("");
    }
    //Noon Theme
    else if(current_time < 16)
    {
        current_stylesheet.href = "styles/themes/noon.css";
        current_theme.push("");
        current_theme.push("");
        current_theme.push("");
    }
    //Night Theme
    else
    {
        current_stylesheet.href = "styles/themes/night.css";
        current_theme.push("");
        current_theme.push("");
        current_theme.push("");
    }

    document.head.appendChild(current_stylesheet);
    return current_theme;
}

/**
 * Setup of the P5.js Canvas
 */
function setup()
{
    //Prepare the Canvas
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style("z-index", "-1");

    //Prepare the Environment
    environment = new Environment(initialize());
}

/**
 * The main loop of P5.js Canvas
 */
function draw()
{
    environment.Draw();
}

/**
 * Resizes the P5.js Canvas
 */
function windowResized()
{
    resizeCanvas(windowWidth, windowHeight);
}