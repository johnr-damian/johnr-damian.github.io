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
        this.Renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });
        this.Renderer.setSize(window.innerWidth, window.innerHeight);
        //this.Renderer.alpha = true;
        //this.Renderer.antialias = true;
        //Create a Scene
        this.Scene = new THREE.Scene();
        //this.Scene.background = new THREE.Color(0xffffff);
        //Create a Land
        //let geometry = new THREE.PlaneGeometry(20, 20, 1, 1);
        let geometry = new THREE.BoxGeometry(window.innerWidth * 0.03, window.innerHeight * 0.03, 1);
        let material = new THREE.MeshBasicMaterial({
            color: 0xa1a1a1,
            wireframe: true
        });
        // let material = new THREE.MeshPhongMaterial();
        material.color.set(0x2194ce);
        this.Land = new THREE.Mesh(geometry, material);
        //this.Land.position.y -= 6;
        this.Scene.add(this.Land);
        this.Land.geometry.computeBoundingBox();
        box = new THREE.Box3();
        box.copy(this.Land.geometry.boundingBox).applyMatrix4(this.Land.matrixWorld);
        
        //Create a Light
        //this.Light = new THREE.HemisphereLight();
        // this.Light = new THREE.DirectionalLight({
        //     color: 0x00ffff,
        //     intensity: 1,
        //     position: new THREE.Vector3(2, -1, 0)
        // });
        this.Light = new THREE.PointLight(0x00ffff, 1, 0, 2);
        this.Light.position.set(5, 5, 0);
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
        gravity.multiplyScalar(0.4);
        let movement = new THREE.Vector3(0.01, 0.01, 0);
        movement.multiplyScalar(0.2);
        let friction  = new THREE.Vector3(-0.001, 0, 0);
        friction.multiplyScalar(0.4);

        for(let slime = 0; slime < this.Slimes.length; slime++)
        {
            // if(this.Slimes[slime].Velocity.x > 0)
            // {
            //     if(this.Slimes[slime].Mesh.position.x < 20 || this.Slimes[slime].Mesh.position.x > -20)
            //         this.Slimes[slime].ApplyForce(friction);
            // }
            // if(this.Slimes[slime].Mesh.position.y > -9)
            //     this.Slimes[slime].ApplyForce(gravity);
            // if(this.Slimes[slime].Mesh.position.y  <= -9 && this.Slimes[slime].Mesh.position.x < 20)
            //     this.Slimes[slime].ApplyForce(movement);
            this.Slimes[slime].ApplyForce(gravity);
            this.Slimes[slime].Jump();
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
        });
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
        this.Fatigue = 0;
        this.Cooldown = 1000;
        this.UpdateGeo = false;
    }

    ApplyForce(force)
    {
        this.Acceleration.add(force.divideScalar(this.Mass));
    }

    Move()
    {
        this.ApplyForce(new THREE.Vector3(0.01, 0.1, 0));
    }

    Jump()
    {
        if(this.Mesh.position.y == -9 && this.Fatigue < 10)
        {
            this.ApplyForce(new THREE.Vector3(0, 0.1, 0));
            this.Fatigue += 2;
        }
    }

    NormalizePosition(viewable_height)
    {
        // if(this.Mesh.position.y < -5)
        //     this.Mesh.position.y = -5;
        // if(this.Mesh.position.x > 15)
        //     this.Mesh.position.x = 15;

        // if((this.Mesh.position.x < -20) || (this.Mesh.position > 20))
        //     this.Velocity.x *= -0.7;
        // if((this.Mesh.position.y < -9) || (this.Mesh.position.y > 9))
        //     this.Velocity.y *= -0.7;

        if(this.Mesh.position.x < -20)
            this.Mesh.position.x = 20;
        if(this.Mesh.position.x > 20)
            this.Mesh.position.x = -20;
        
        if(this.Mesh.position.y > 9)
            this.Mesh.position.y = 9;
        if(this.Mesh.position.y < -9)
            this.Mesh.position.y = -9;
        
        if(this.Fatigue >= 10)
            this.Cooldown--;

        if(this.Cooldown <= 0)
        {
            this.Fatigue = 0;
            this.Cooldown = 1000;
        }

        if(this.Mesh.position.y <= -9)
        {
            let matrix = new THREE.Matrix4();
            matrix.set(
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            );

            this.Mesh.geometry.applyMatrix4(matrix);
        }
        // if(this.Velocity.lengthSq() < 0.00005)
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