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
        let figure = document.getElementsByTagName("figure")[0];
        this.Camera = new THREE.PerspectiveCamera(45, (figure.clientWidth / figure.clientHeight), 1, 20);
        this.Camera.position.set(0, 0, 20); //Move Camera to the back
        
        //Create the Scene
        this.Scene = new THREE.Scene();

        //Create the Renderer        
        let hcanvas = document.getElementById("result");
        this.Renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            canvas: hcanvas
        });
        this.Renderer.setSize(figure.clientWidth, figure.clientHeight);

        //Create the Bounding Box
        let geometry = new THREE.BoxGeometry(28, 8, 1);
        let material = new THREE.MeshBasicMaterial({
            color: 0xf0f5af
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
        // document.body.appendChild(this.Renderer.domElement);
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
        let figure = document.getElementsByTagName("figure")[0];
        this.Camera.aspect = (figure.clientWidth / figure.clientHeight)
        this.Camera.updateProjectionMatrix();
        this.Renderer.setSize(figure.clientWidth / figure.clientHeight)
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