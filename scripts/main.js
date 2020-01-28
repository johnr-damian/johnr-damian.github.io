var environment = null;

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
    if(current_time < 1)
    {
        current_stylesheet.href = "styles/themes/night.css";
        current_theme.push("");
        current_theme.push("");
        current_theme.push("");
    }
    //Night Theme
    else
    {
        current_stylesheet.href = "styles/themes/night.css";
        //current_theme.push("#133572");
        current_theme.push("#0b111b");
        //current_theme.push("#0a396e");
        current_theme.push("#172638");
        current_theme.push("#172638");
        //current_theme.push("#133572");
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


if(environment === null)
{
    let current_stylesheet = document.createElement("link");
    current_stylesheet.type = "text/css";
    current_stylesheet.rel = "stylesheet";
    current_stylesheet.href = "../styles/themes/night.css";
    document.head.appendChild(current_stylesheet);
}