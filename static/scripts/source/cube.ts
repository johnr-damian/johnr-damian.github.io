import * as Three from 'three';
import { Environment } from './main';

class Cube extends Environment
{
    private camera : Three.Camera;
    private renderer : Three.WebGLRenderer;
    private scene : Three.Scene;

    private cube : Three.Mesh | null;

    constructor()
    {
        super();

        this.camera = new Three.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
        this.renderer = new Three.WebGLRenderer();
        this.scene = new Three.Scene();

        this.camera.position.z = 5;
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.scene.background = new Three.Color(0x00fff0);
        document.body.appendChild(this.renderer.domElement);

        let geometry = new Three.BoxGeometry();
        let material = new Three.MeshBasicMaterial({
            color: 0x0000ff
        });
        this.cube = new Three.Mesh(geometry, material);
        this.scene.add(this.cube);
    }

    Update(): void 
    {
        if(this.cube != null)
        {
            this.cube.rotation.x += 0.01;
            this.cube.rotation.y += 0.01;
        }
    }    
    
    Render(): void 
    {
        requestAnimationFrame(this.Update);
        this.renderer.render(this.scene, this.camera);
    }    
}