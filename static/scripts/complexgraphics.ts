import * as Three from 'three';

export class ComplexGraphics
{
    private GraphicsCamera: Three.Camera;
    private GraphicsRenderer: Three.WebGLRenderer;
    private GraphicsScene: Three.Scene;

    constructor()
    {
        this.GraphicsCamera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.GraphicsRenderer = new Three.WebGLRenderer();
        this.GraphicsScene = new Three.Scene();

        this.GraphicsRenderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.GraphicsRenderer.domElement);

        let geometry = new Three.BoxGeometry();
        let material = new Three.MeshBasicMaterial({
            color: 0x00f000
        });

        let cube = new Three.Mesh(geometry, material);
        this.GraphicsScene.add(cube);

        this.GraphicsCamera.position.z = 5;
    }

    /**
     * The animation loop that continuously called in the main.js
     */
    public AnimationLoop() 
    {
        requestAnimationFrame(this.AnimationLoop);
        this.GraphicsRenderer.render(this.GraphicsScene, this.GraphicsCamera);
    }
}