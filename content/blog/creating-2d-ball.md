---
#Academic Journal

categories: [academic, journal]
#Date Created
date: 2020-04-12T17:10:00+08:00
#Page Description
description: Creating a 2D Ball Journal in Blog Algomorphogenesis
draft: false
topics: [javascript, three.js, 2D, physics]
scripts: [scripts/blog/simpleball.js]
#Page Title
title: A simple 2D Ball using Three.js
spotlight: images/noimage.jpg
spotlight_type: image
---
<section>

In today's journal, I created a simple 2D ball using Three.js as an introduction for myself in using this Javascript library.  
Coming from p5.js, it is undeniable that there are a lot of good tutorials on how to use it.  
However, this time I would like to use Three.js for creative coding as an exploration and out of my curiosity.  
  
Three.js is known for its reputation as a 3D graphics library using WebGL.  
With that, it is within the expectations that there would be a lot of differences compared to p5.js.  
To give you an example, you would only need two functions to start in p5.js — `setup()` and `draw()`.  
Simple right? The canvas' configuration is in the `setup()`, while the main animation loop is in the `draw()`.  
On the other hand, you'll need to program additional lines of code as a setup in Three.js.  
Now that you know a little better on what to expect, I'll be showing you how I started in Three.js.  
</section>

<!-- <section>

Let's start with a simple piece of code. We have a variable, and a class called *environment*.  
The variable serves as a reference when we want to start the animation later on.  
You could think of it as manually calling the `setup()` of p5.js. Call it once, and the configuration is complete.  
If you're wondering why it is not the drawing function, it is because we have to state the drawing function either through `window.requestAnimationFrame()` or `setAnimationLoop()`.  
</section> -->

<section>

### Getting Started  
Let's start with a simple piece of code. We have a variable, and a class called *environment*.  
The variable serves as a reference when we want to start the animation later on.  
You could think of it as manually calling the `setup()` of p5.js. Call it once, and the configuration is complete.  
If you're wondering why it is not the drawing function, it is because we have to state the drawing function either through `window.requestAnimationFrame()` or `setAnimationLoop()`.  
  
```js
let environment = null;

/** 
 * Holds the configuration and the objects  
 * required for animation.
 */
class Environment
{
    /**     
     * Contains the setup for animation.
     */
    constructor()
    {
        //Configurations

    }
}

//Create the Environment

environment = new Environment();
```
  
Let's move on to the configuration! In Three.js, we will need a camera, a scene, and a renderer.  
Additionally, we will need a bounding box so that we could set the edges of the canvas.  
Unlike in p5.js, we cannot use the window's height and width because of the camera's perspective.  
Lastly, let's also add essential functions such as `Play()`, `Render()`, `Update()`, and `OnResized()`.  
  
```js
let environment = null;

/** 
 * Holds the configuration and the objects  
 * required for animation.
 */
class Environment
{
    /**     
     * Contains the setup for animation.
     */
    constructor()
    {
        //Create the Camera
        //...

        //Create the Scene
        //...

        //Create the Renderer
        //...

        //Create the Bounding Box
        //...

    }

    /**     
     * Starts the environment's animation.
     */
    Play() { }

    /**     
     * Renders the objects
     */
    Render() { }

    /**     
     * Updates the objects.
     */
    Update() { }

    /**     
     * Updates the configuration of Camera and Renderer.
     */
    OnResized() { }
}

//Create the Environment

environment = new Environment();
```
</section>
  
<section>

### Getting the Details  
At this point, you'll maybe need to take a glance at the documentation of Three.js  
I'll be summarizing what I have done and on the requirements of each object.  
  
Starting at the constructor, the core requirements of Three.js are a camera, a renderer, and a scene.  
For the camera, we need to set its [frustrum](https://en.wikipedia.org/wiki/Viewing_frustum) and set 
its position to the back so that we could see our scene later on.  
Lastly, the alpha option is true for the renderer to get a transparent background.  
With the core requirements complete, we will create the bounding box for the scene.  
  
```js
//Create the Camera

this.Camera = new THREE.PerspectiveCamera(45, (window.innerWidth / window.innerHeight), 1, 20);
this.Camera.position.set(0, 0, 20); //Move Camera to the back


//Create the Scene

this.Scene = new THREE.Scene();

//Create the Renderer

this.Renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
});
this.Renderer.setSize(window.innerWidth, window.innerHeight);
```
  
To create the bounding box, you'll need geometry and material for the mesh.  
You can set your own geometry's height and width, and this will be for the computation of the bounding box 
of Three.js's Box3.  
  
```js
//Create the Bounding Box

let geometry = new THREE.BoxGeometry(28, 8, 1);
let material = new THREE.MeshBasicMaterial({
    color: 0x20ff20
});
this.ReferenceBox = new THREE.Mesh(geometry, material);
this.ReferenceBox.geometry.computeBoundingBox(); //Compute the bounding box

this.BoundingBox = new THREE.Box3();
this.BoundingBox.setFromObject(this.ReferenceBox);
```
  
We finish the constructor by adding the canvas to our HTML, and 
we add an event listener for our OnResized function.  
Optionally, you could also add your reference of the bounding box to the scene 
so you could see it when you render.  
  
```js
//Add the look of Bounding Box

this.Scene.add(this.ReferenceBox);

//Add the Canvas to the HTML

document.body.appendChild(this.Renderer.domElement);
window.addEventListener("resize", this.OnResized.bind(this));
```
  
If you tried running this code already, you are perhaps shocked that you can't see anything.  
As you can see, we haven't added the code to render and start the environment after creating the instance of the class.  
To start animating our environment, we state our functions for animation in the Play function 
using the `setAnimationLoop()`.  
Lastly, we call Three.js's render in our Render function.  
At this point, you can now execute the code, and you'll see the bounding box if you added it to the scene.  
  
```js
/** 
 * Starts the environment's animation.
 */
Play()
{
    this.Renderer.setAnimationLoop(() => {
        this.Update();
        this.Render();
    });
}

/** 
 * Renders the objects.
 */
Render()
{
    this.Renderer.render(this.Scene, this.Camera);
}

//***

//Create the Environment

environment = new Environment();
environment.Play();
```
</section>
  
<section>

### Where's the ball?  
To wrap our Environment class, the camera's projection and renderer will update in `OnResized()` function.  
As for the ball, we add a reference to it by adding a new variable in the constructor.  
In the Ball class, we store important information like acceleration, velocity, and current position, including 
functions to handle the force and position.  
  
```js
class Environment
{
    constructor()
    {
        //...

        //Add the ball to the scene

        this.Ball = new Ball();
        this.Scene.add(this.Ball.Mesh);
    }

    /**
     * Updates the objects.
     */
    Update()
    {
        this.Ball.Update();
    }

    /**     
     * Updates the configuration of Camera and Renderer.
     */
    OnResized()
    {
        this.Camera.aspect = (window.innerWidth / window.innerHeight);
        this.Camera.updateProjectionMatrix();
        this.Renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

class Ball
{
    constructor()
    {
        //Create the geometry
        //...
        
        //Create the material
        //...

        //Create the mesh
        //...
    }

    /**
     * Applies external force to the ball's acceleration.
     * @param {*} force 
     */
    ApplyForce(force) { }

    /**
     * Sets the behavior when the ball hits the edges.
     */
    NormalizePosition() { }

    /**
     * Updates the acceleration, velocity, and position.
     */
    Update() { }
}
```
  
With that out of the way, we can now focus on the Ball class.  
For introduction purposes, let's make it as simple as possible by creating a ball that 
will bounce for eternity.  
Let's get started by adding the required variables for mesh and motion.  
  
```js
/**
 * Contains the setup for the ball
 */
constructor()
{
    //Create the geometry

    let geometry = new THREE.SphereGeometry(1, 20, 20, 0, 6.3, 0, 6.3);
    //Create the material

    let material = new THREE.MeshBasicMaterial({
        color: 0x2020ff
    });
    //Create the mesh

    this.Mesh = new THREE.Mesh(geometry, material);

    this.Acceleration = new THREE.Vector3();
    this.Mass = 1;
    this.Velocity = new THREE.Vector3();
}
```
  
After adding those, we will now implement the `Update()` function like how 
it is usually in the p5.js implementation.  
If you can still remember, we will need to trickle down from acceleration to 
the position by adding the acceleration to velocity then adding velocity to the position.  
  
```js
/**
 * Updates the acceleration, velocity, and position.
 */
Update()
{
    //Update Velocity

    this.Velocity.add(this.Acceleration);
    this.Velocity.clampLength(0, 1);

    //Update the Location

    this.Mesh.position.add(this.Velocity);

    //Reset the Acceleration

    this.Acceleration.multiplyScalar(0);
}
```
  
With that code, the next step is to set the behavior when the ball hits the bounding box's edges.  
Since we are only simulating gravity in the y-axis, we only need to bounce back the ball upwards.  
  
```js
/**
 * Sets the behavior when the ball hits the edges.
 */
NormalizePosition()
{
    if((this.Mesh.position.y - 1 <= environment.BoundingBox.min.y) || (this.Mesh.position.y + 1 >= environment.BoundingBox.max.y))
            this.Velocity.y *= -1;
}
```
  
To wrap up our Ball class, we implement the `ApplyForce()` function to accept a vector 
and adding it to the ball's acceleration. Lastly, we add a gravity force in the Environment class to push our ball downwards.  
At this point, you could now execute the algorithm and see a ball bouncing up and down.  
  
```js
class Environment
{
    //...


    /**
     * Updates the objects.
     */
    Update()
    {
        let gravity = new THREE.Vector3(0, -0.05, 0);
        if(this.Ball.Mesh.position.y - 1 > this.BoundingBox.min.y)
            this.Ball.ApplyForce(gravity);
        this.Ball.Update();
        this.Ball.NormalizePosition();
    }
}

class Ball
{
    //...



    /**
     * Applies external force to the ball's acceleration.
     * @param {*} force 
     */
    ApplyForce(force)
    {
        this.Acceleration.add(force.divideScalar(this.Mass));
    }
}
```
  
Concluding my first journal about a simple 2D ball, I plan 
to continue this by making it into a simple 3D ball using the same library.  
While writing my first journal, I learned that this simple concept is more complex 
that I initially thought.  
I was thinking about how to explain the concept from my perspective to someone 
without getting it too boring.  
Additionally, my writing greatly requires improvement, including how I program stuff 
in javascript.  
If perchance this journal was able to aid you, then I would be happy.  
What do you think about this journal?  
</section>
  
<section>

### Full Code
```js
let environment = null;

/**
 * Holds the configuration and the objects 
 * required for animation.
 */
class Environment
{
    /**
     * Contains the setup for animation.
     */
    constructor()
    {
        //Create the Camera

        this.Camera = new THREE.PerspectiveCamera(45, (window.innerWidth / window.innerHeight), 1, 20);
        this.Camera.position.set(0, 0, 20); //Move Camera to the back
        
        //Create the Scene

        this.Scene = new THREE.Scene();

        //Create the Renderer

        this.Renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });
        this.Renderer.setSize(window.innerWidth, window.innerHeight);

        //Create the Bounding Box

        let geometry = new THREE.BoxGeometry(28, 8, 1);
        let material = new THREE.MeshBasicMaterial({
            color: 0x20ff20
        });
        this.ReferenceBox = new THREE.Mesh(geometry, material);
        this.ReferenceBox.position.set(0, -2, 0);
        this.ReferenceBox.geometry.computeBoundingBox(); //Compute the bounding box
        
        this.BoundingBox = new THREE.Box3();
        this.BoundingBox.setFromObject(this.ReferenceBox);

        //Add the look of Bounding Box

        this.Scene.add(this.ReferenceBox);

        //Add the ball to the scene

        this.Ball = new Ball();
        this.Scene.add(this.Ball.Mesh);

        //Add the Canvas to the HTML

        document.body.appendChild(this.Renderer.domElement);
        window.addEventListener("resize", this.OnResized.bind(this));
    }

    /**
     * Starts the environment's animation.
     */
    Play()
    {
        this.Renderer.setAnimationLoop(() => {
            this.Update();
            this.Render();
        });
    }

    /**
     * Renders the objects.
     */
    Render()
    {
        this.Renderer.render(this.Scene, this.Camera);
    }

    /**
     * Updates the objects.
     */
    Update()
    {
        let gravity = new THREE.Vector3(0, -0.05, 0);
        if(this.Ball.Mesh.position.y - 1 > this.BoundingBox.min.y)
            this.Ball.ApplyForce(gravity);
        this.Ball.Update();
        this.Ball.NormalizePosition();
    }

    /**
     * Updates the configuration of Camera and Renderer.
     */
    OnResized()
    {
        this.Camera.aspect = (window.innerWidth / window.innerHeight);
        this.Camera.updateProjectionMatrix();
        this.Renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

/**
 * A simple 2D Ball
 */
class Ball
{
    /**
     * Contains the setup for the ball
     */
    constructor()
    {
        //Create the geometry

        let geometry = new THREE.SphereGeometry(1, 20, 20, 0, 6.3, 0, 6.3);
        //Create the material

        let material = new THREE.MeshBasicMaterial({
            color: 0x2020ff
        });
        //Create the mesh

        this.Mesh = new THREE.Mesh(geometry, material);

        this.Acceleration = new THREE.Vector3();
        this.Mass = 1;
        this.Velocity = new THREE.Vector3();
    }

    /**
     * Applies external force to the ball's acceleration.
     * @param {*} force 
     */
    ApplyForce(force)
    {
        this.Acceleration.add(force.divideScalar(this.Mass));
    }

    /**
     * Sets the behavior when the ball hits the edges.
     */
    NormalizePosition()
    {
        if((this.Mesh.position.y - 1 <= environment.BoundingBox.min.y) || (this.Mesh.position.y + 1 >= environment.BoundingBox.max.y))
            this.Velocity.y *= -1;
    }

    /**
     * Updates the acceleration, velocity, and position.
     */
    Update()
    {
        //Update Velocity

        this.Velocity.add(this.Acceleration);
        this.Velocity.clampLength(0, 1);

        //Update the Location

        this.Mesh.position.add(this.Velocity);

        //Reset the Acceleration

        this.Acceleration.multiplyScalar(0);
    }
}

//Create the Environment

environment = new Environment();
environment.Play();
```
</section>
<figure>
    <canvas id='result'></canvas>
</figure>
<button type='button' onclick='GoToTop()'>
    <span class='fas fa-chevron-up'></span>
</button>