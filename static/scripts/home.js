let environment = null;

class Environment
{
    constructor()
    {
        this.Camera = new THREE.PerspectiveCamera(60, (window.innerWidth / window.innerHeight), 1, 10);
        this.Camera.position.set(0, 0, 5);
        //Create a Renderer
        this.Renderer = new THREE.WebGLRenderer();
        this.Renderer.setSize(window.innerWidth, window.innerHeight);
        //Create a Scene
        this.Scene = new THREE.Scene();
        this.Scene.background = new THREE.Color(0xffffff);
        
        document.body.appendChild(this.Renderer.domElement);
        window.addEventListener("resize", this.OnResized.bind(this));
        this.Cube = null;
    }

    /**
     * Creates a new slime in the environment.
     */
    CreateCube()
    {
        this.Cube = new Cube();
        this.Scene.add(this.Cube.Mesh);
    }

    /**
     * Updates every object in the environment.
     */
    Update()
    {
        this.Cube.Update();
    }

    /**
     * Renders every object in the environment.
     */
    Render()
    {
        this.Update();
        this.Renderer.render(this.Scene, this.Camera);
    }

    /**
     * Starts the environment.
     */
    Start()
    {
        this.Renderer.setAnimationLoop(() => {
            this.Update();
            this.Render();
        })
    }

    /**
     * Stops the environment.
     */
    Stop()
    {
        this.Renderer.setAnimationLoop(null);
    }

    OnResized()
    {
        this.Camera.aspect = (window.innerWidth / window.innerHeight);
        this.Camera.updateProjectionMatrix();
        this.Renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

class Cube
{
    constructor()
    {
        let geometry = new THREE.BoxGeometry();
        let material = new THREE.MeshBasicMaterial({
            color: 0xafafaf
        });

        this.Mesh = new THREE.Mesh(geometry, material);
    }

    Update()
    {
        this.Mesh.rotation.x += 0.01;
        this.Mesh.rotation.y += 0.01;
    }
}

environment = new Environment();
environment.CreateCube();
environment.Start();