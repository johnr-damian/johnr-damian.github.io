let environment = null;

class Environment
{
    constructor()
    {
        let figure = document.getElementsByTagName("figure")[0];
        this.Camera = new THREE.PerspectiveCamera(60, (figure.clientWidth / figure.clientHeight), 1, 10);
        this.Camera.position.set(0, 0, 5);
        //Create a Renderer        
        let hcanvas = document.getElementById("spotlight");
        this.Renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            canvas: hcanvas
        });
        this.Renderer.setSize(figure.clientWidth, figure.clientHeight);
        //Create a Scene
        this.Scene = new THREE.Scene();
        this.Scene.background = new THREE.Color(0xffffff);
        
        // document.body.appendChild(this.Renderer.domElement);
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
        let figure = document.getElementsByTagName("figure")[0];
        this.Camera.aspect = (figure.clientWidth / figure.clientHeight);
        this.Camera.updateProjectionMatrix();
        this.Renderer.setSize(figure.clientWidth / figure.clientHeight);
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