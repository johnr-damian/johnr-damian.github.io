let environment = null;
let box = null;
class Environment
{
    constructor()
    {
        //Create a Camera
        this.Camera = new THREE.PerspectiveCamera(60, (window.innerWidth / window.innerHeight), 1, 20);
        this.Camera.position.set(0, 0, 20);
        //this.Camera.lookAt(0, 0, 0);
        //Create a Renderer
        this.Renderer = new THREE.WebGLRenderer();
        this.Renderer.setSize(window.innerWidth, window.innerHeight);
        //Create a Scene
        this.Scene = new THREE.Scene();
        this.Scene.background = new THREE.Color(0xffffff);
        //Create a Land
        //let geometry = new THREE.PlaneGeometry(20, 20, 1, 1);
        let geometry = new THREE.BoxGeometry(10, 5, 5);
        let material = new THREE.MeshPhysicalMaterial({
            color: 0xa5aaa5,
            side: THREE.DoubleSide
        });
        this.Land = new THREE.Mesh(geometry, material);
        this.Land.position.y -= 9;
        //this.Scene.add(this.Land);
        //Create a Light
        this.Light = new THREE.HemisphereLight();
        this.Scene.add(this.Light);
        
        document.body.appendChild(this.Renderer.domElement);
        window.addEventListener("resize", this.OnResized.bind(this));
        this.Slimes = [];
    }

    /**
     * Creates a new slime in the environment.
     */
    CreateSlime()
    {
        let slime = new Slime(1);
        slime.Mesh.position.y += 5;
        this.Slimes.push(slime);
        this.Scene.add(slime.Mesh);
    }

    /**
     * Destroys an existing slime in the environment.
     */
    DestroySlime()
    {
        let slime = this.Slimes.pop();
        this.Scene.remove(slime);
    }

    /**
     * Updates every object in the environment.
     */
    Update()
    {
        let gravity = new THREE.Vector3(0, -0.01, 0);
        //gravity.multiplyScalar(0.8);

        for(let slime = 0; slime < this.Slimes.length; slime++)
        {
            if(this.Slimes[slime].Mesh.position.y >= 0)
                this.Slimes[slime].ApplyForce(gravity);
            this.Slimes[slime].Update();
            this.Slimes[slime].NormalizePosition();
        }
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

class Slime
{
    constructor(mass)
    {
        let geometry = new THREE.SphereGeometry(mass, 20, 20, 0, 6.3, 0, 6.3);
        let material = new THREE.MeshToonMaterial({
            color: 0x80ceeb
        });

        this.Acceleration = new THREE.Vector3();
        this.Mass = mass;
        this.Mesh = new THREE.Mesh(geometry, material);
        this.Velocity = new THREE.Vector3();
    }

    ApplyForce(force)
    {
        this.Acceleration.add(force.divideScalar(this.Mass));
    }

    Move()
    {
        this.ApplyForce(new THREE.Vector3(0.01, 0.1, 0));
    }

    NormalizePosition(viewable_height)
    {
        // if(this.Mesh.position.y < -5)
        //     this.Mesh.position.y = -5;
        // if(this.Mesh.position.x > 15)
        //     this.Mesh.position.x = 15;

        if((this.Mesh.position.x < -15) || (this.Mesh.position > 15))
            this.Velocity.x *= -0.9;
        if((this.Mesh.position.y < -5) || (this.Mesh.position.y > 5))
            this.Velocity.y *= -0.9;

        // if(this.Velocity.lengthSq() < 0.00000005)
        //     this.Velocity.roundToZero();
    }

    Update()
    {
        //Update Velocity
        this.Velocity.add(this.Acceleration);
        this.Velocity.clampLength(0, 0.2);

        //Update the Location
        this.Mesh.position.add(this.Velocity);

        //Reset the Acceleration
        this.Acceleration.multiplyScalar(0);
    }
}

environment = new Environment();
environment.CreateSlime();
environment.Start();