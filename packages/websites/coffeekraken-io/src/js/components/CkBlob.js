// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SLitComponent from '@coffeekraken/s-lit-component';
import { html } from 'lit';
import * as THREE from 'three';
import { OBJLoader } from './lib/three/examples/jsm/loaders/OBJLoader.js';
import { BloomEffect, EffectComposer, EffectPass, RenderPass, } from 'postprocessing';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from './lib/RGBELoader';
import __perlin from './lib/perlinNoise';
class NoiseSphereGeometry extends THREE.SphereGeometry {
    constructor(radius, widthSegments, heightSegments, { seed, noiseWidth, noiseHeight }) {
        super(radius, widthSegments, heightSegments);
    }
}
export default class CKBlob extends __SLitComponent {
    constructor() {
        super({
            litComponent: {
                shadowDom: false,
            },
        });
        this._grains = [];
        this._start = Date.now();
        this._perlin = __perlin();
        this._postprocessing = {};
    }
    firstUpdated() {
        return __awaiter(this, void 0, void 0, function* () {
            this._scene = new THREE.Scene();
            this._camera = new THREE.PerspectiveCamera(30, this.offsetWidth / this.offsetHeight, 1, 10000);
            this._camera.position.z = 50;
            this._renderer = new THREE.WebGLRenderer({
                minFilter: THREE.LinearFilter,
                magFilter: THREE.LinearFilter,
                format: THREE.RGBAFormat,
                stencilBuffer: false,
                alpha: true,
                antialias: true,
            });
            this._renderer.autoClear = false;
            this._renderer.setSize(this.offsetWidth, this.offsetHeight);
            this._renderer.setPixelRatio(window.devicePixelRatio);
            this._renderer.shadowMap.enabled = true;
            this._renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            this.querySelector('.ck-blob').appendChild(this._renderer.domElement);
            // const color = 0xffffff; // white
            // const near = 10;
            // const far = 100;
            // this._scene.fog = new THREE.Fog(color, near, far);
            // load env map
            this._envMap = yield this.loadEnvMap();
            //Create a DirectionalLight and turn on shadows for the light
            const light = new THREE.DirectionalLight(0xffcc17, 0.1, 100);
            light.position.set(0, 40, 0); //default; light shining from top
            light.castShadow = true; // default false
            //Set up shadow properties for the light
            light.shadow.mapSize.width = 1024; // default
            light.shadow.mapSize.height = 1024; // default
            light.shadow.camera.near = 0.5; // default
            light.shadow.camera.far = 500; // default
            light.shadow.camera.left = -50;
            light.shadow.camera.right = 50;
            light.shadow.camera.top = 50;
            light.shadow.camera.bottom = -50;
            // sphere
            const sphere = this.createSphere();
            // grains
            const grains = yield this.addGrains();
            //Create a plane that receives shadows (but does not cast them)
            const planeGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
            const planeMaterial = new THREE.ShadowMaterial({
                opacity: 0.1,
            });
            const plane = new THREE.Mesh(planeGeometry, planeMaterial);
            plane.receiveShadow = true;
            plane.position.set(0, -12, 0);
            plane.rotation.x = (Math.PI / 2) * -1;
            var ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
            //Create a helper for the shadow camera (optional)
            const helper = new THREE.CameraHelper(light.shadow.camera);
            this._scene.add(light);
            this._scene.add(ambientLight);
            this._scene.add(sphere);
            this._scene.add(grains);
            this._scene.add(plane);
            // this._scene.add(helper);
            this.initPostprocessing();
            this.addControls();
            this.animate();
            return;
            // const light = new THREE.DirectionalLight(0xff0000, 1, 20);
            // light.position.set(0, 0, 0); //default; light shining from top
            // light.rotation.x = 90;
            // // light.target.position.set(0, 0, 0);
            // light.castShadow = true; // default false
            // // light.shadow.radius = 1;
            // // light.shadow.bias = -0.005;
            // var side = 100;
            // light.shadow.camera.top = side;
            // light.shadow.camera.bottom = -side;
            // light.shadow.camera.left = side;
            // light.shadow.camera.right = -side;
            // light.shadow.camera.near = 0.01; // same as the camera
            // light.shadow.camera.far = 1000; // same as the camera
            // light.shadow.camera.fov = 50; // same as the camera
            // light.shadow.mapSize.width = 2048;
            // light.shadow.mapSize.height = 2048;
            // // light.shadow.mapSize.width = 512; // default
            // // light.shadow.mapSize.height = 512; // default
            // // light.shadow.camera.near = 10; // default
            // light.shadow.camera.far = 100; // default
            // // light.shadowCameraVisible = true;
            // // this._scene.add(light.target);
            // this._directionalLight = light;
            // const helper = new THREE.CameraHelper(light.shadow.camera);
            // var ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
            // // ambientLight.castShadow = true;
            // //Create a plane that receives shadows (but does not cast them)
            // const planeGeometry = new THREE.PlaneGeometry(50, 50, 32, 32);
            // const planeMaterial = new THREE.MeshStandardMaterial({
            //     color: 0xffffff,
            // });
            // const plane = new THREE.Mesh(planeGeometry, planeMaterial);
            // // plane.receiveShadow = true;
            // plane.position.set(0, -10, 0);
            // plane.rotation.set(-90, 0, 0);
            // this._scene.add(plane);
            // // this._scene.add(this._sphere);
            // // this._scene.add(this._grainsGroup);
            // this._scene.add(light);
            // this._scene.add(ambientLight);
            // // this._scene.add(helper);
            // this.animate();
        });
    }
    initPostprocessing() {
        const renderPass = new RenderPass(this._scene, this._camera);
        // const bokehPass = new BokehPass(this._scene, this._camera, {
        //     // focus: 1.0,
        //     // aperture: 0.005 * 0.00001,
        //     // maxblur: 0.5,
        //     focus: 10.0,
        //     aperture: 1 * 0.00001,
        //     maxblur: 50,
        //     width: this.offsetWidth,
        //     height: this.offsetHeight,
        // });
        // renderPass.clearColor = new THREE.Color(0, 0, 0);
        // renderPass.clearAlpha = 0;
        const composer = new EffectComposer(this._renderer);
        composer.addPass(renderPass);
        composer.addPass(new EffectPass(this._camera, new BloomEffect()));
        // composer.addPass(bokehPass);
        // composer.addPass(fxaaPass);
        // zBlurPass.renderToScreen = true;
        // this._postprocessing.composer = composer;
        // this._postprocessing.bokeh = bokehPass;
    }
    addControls() {
        this._controls = new OrbitControls(this._camera, this._renderer.domElement);
        // this._controls.autoRotate = true;
        // this._controls.autoRotateSpeed = 0.5;
        // this._controls.enableDamping = true;
        this._controls.update();
    }
    addGrains() {
        return __awaiter(this, void 0, void 0, function* () {
            const grain = yield this.loadCoffeeGrain();
            grain.castShadow = true;
            grain.receiveShadow = true;
            this._grains = [];
            this._grainsGroup = new THREE.Group();
            for (let i = 0; i < 10; i++) {
                const newGrain = grain.clone();
                newGrain.position.set(0, 0, -0.3);
                const ballMat = new THREE.ShadowMaterial({
                    opacity: 0.5,
                });
                const geom = new THREE.SphereGeometry(1, 32, 32);
                const sphere = new THREE.Mesh(geom, ballMat);
                sphere.scale.set(0.5, 0.5, 0.25);
                // sphere.receiveShadow = true;
                sphere.castShadow = true;
                const group = new THREE.Group();
                group.add(sphere);
                group.add(newGrain);
                group.rotation.set(Math.random() * 360, Math.random() * 360, Math.random() * 360);
                group.position.set(-10 + Math.random() * 20, -10 + Math.random() * 20, -10 + Math.random() * 20);
                // group.position.set(0, 5, 0);
                let scaleAddition = -2.5 + Math.random() * 5;
                group.scale.x += scaleAddition;
                group.scale.y += scaleAddition;
                group.scale.z += scaleAddition;
                group.castShadow = true;
                // group.receiveShadow = true;
                this._grains.push(group);
                this._grainsGroup.add(group);
            }
            return this._grainsGroup;
        });
    }
    createSphere() {
        const ballMaterial = {
            clearcoat: 0.1,
            clearcoatRoughness: 0,
            metalness: 0.4,
            roughness: 0.1,
            color: 0xf2a22b,
            // normalMap: texture,
            // normalScale: new THREE.Vector2(0.15, 2),
            envMap: this._envMap.texture,
        };
        const ballMat = new THREE.MeshPhysicalMaterial(ballMaterial);
        const geom = new THREE.SphereGeometry(1, 128, 128);
        this._sphere = new THREE.Mesh(geom, ballMat);
        this._sphere.scale.set(4, 4, 4);
        this._sphere.receiveShadow = true;
        this._sphere.castShadow = true;
        return this._sphere;
    }
    loadCoffeeGrain() {
        return new Promise((resolve) => {
            new THREE.TextureLoader().load('/src/3d/coffeeGrain/coffeeGrain-bw.jpg', (texture) => {
                new THREE.TextureLoader().load('/src/3d/coffeeGrain/coffeeGrainBumpMap.jpg', (bumpMap) => {
                    let grainMat = new THREE.MeshPhysicalMaterial({
                        clearcoat: 1,
                        clearcoatRoughness: 1,
                        metalness: 0,
                        roughness: 0.5,
                        color: 0xffffff,
                        // displacementMap: bumpMap,
                        // normalMap: bumpMap,
                        bumpMap: bumpMap,
                        // bumpScale: 3,
                        // normalScale: new THREE.Vector2(0.15, 2),
                        map: texture,
                        envMap: this._envMap.texture,
                    });
                    new OBJLoader().load('/src/3d/coffeeGrain/coffeeGrain.obj', (object) => {
                        object.traverse(function (child) {
                            if (child instanceof THREE.Mesh) {
                                child.material = grainMat;
                            }
                        });
                        object.castShadow = true;
                        object.scale.set(0.01, 0.01, 0.01);
                        object.position.set(0, 0, 0);
                        resolve(object);
                    });
                });
            });
        });
    }
    updateGeometry() {
        var time = performance.now() * 0.0005;
        var k = 0.6;
        var positions = this._sphere.geometry.attributes.position.array;
        for (var i = 0; i < positions.length; i += 3) {
            const v = new THREE.Vector3(positions[i], positions[i + 1], positions[i + 2]);
            v.normalize().multiplyScalar(1 +
                0.3 *
                    this._perlin.perlin3(v.x * k + time, v.y * k, v.z * k));
            positions[i] = v.x;
            positions[i + 1] = v.y;
            positions[i + 2] = v.z;
        }
        this._sphere.geometry.computeVertexNormals();
        this._sphere.geometry.normalsNeedUpdate = true;
        this._sphere.geometry.verticesNeedUpdate = true;
    }
    loadEnvMap() {
        return new Promise((resolve) => {
            let envmaploader = new THREE.PMREMGenerator(this._renderer);
            new RGBELoader()
                .setPath('/src/3d/')
                .load('HDRI_STUDIO_vol2_030.hdr', function (hdrmap) {
                let envmap = envmaploader.fromCubemap(hdrmap);
                resolve(envmap);
            });
        });
    }
    animate() {
        this.updateGeometry();
        requestAnimationFrame(this.animate.bind(this));
        this._sphere.rotation.x += 0.001;
        this._sphere.rotation.y += 0.005;
        this._grainsGroup.rotation.y += 0.005;
        for (let i = 0; i < this._grains.length; i++) {
            const grain = this._grains[i];
            grain.rotation.x += 0.005;
            grain.rotation.y += 0.01;
        }
        // this._directionalLight.needsUpdate = true;
        this._controls.update();
        // this._postprocessing.composer.render(0.1);
        // this._renderer.render(this._scene, this._camera);
    }
    render() {
        return html `
            <div class="ck-blob">
                <canvas class="blob-perlin"></canvas>
            </div>
        `;
    }
}
export function define(props = {}, tagName = 'ck-blob') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, CKBlob);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2tCbG9iLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQ2tCbG9iLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBTTNCLE9BQU8sS0FBSyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBQy9CLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQVMxRSxPQUFPLEVBQ0gsV0FBVyxFQUNYLGNBQWMsRUFDZCxVQUFVLEVBQ1YsVUFBVSxHQUNiLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEIsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1GQUFtRixDQUFDO0FBRWxILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUM5QyxPQUFPLFFBQVEsTUFBTSxtQkFBbUIsQ0FBQztBQUV6QyxNQUFNLG1CQUFvQixTQUFRLEtBQUssQ0FBQyxjQUFjO0lBQ2xELFlBQ0ksTUFBTSxFQUNOLGFBQWEsRUFDYixjQUFjLEVBQ2QsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRTtRQUVqQyxLQUFLLENBQUMsTUFBTSxFQUFFLGFBQWEsRUFBRSxjQUFjLENBQUMsQ0FBQztJQUNqRCxDQUFDO0NBQ0o7QUFFRCxNQUFNLENBQUMsT0FBTyxPQUFPLE1BQU8sU0FBUSxlQUFlO0lBQy9DO1FBQ0ksS0FBSyxDQUFDO1lBQ0YsWUFBWSxFQUFFO2dCQUNWLFNBQVMsRUFBRSxLQUFLO2FBQ25CO1NBQ0osQ0FBQyxDQUFDO1FBUVAsWUFBTyxHQUFHLEVBQUUsQ0FBQztRQUViLFdBQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFFcEIsWUFBTyxHQUFHLFFBQVEsRUFBRSxDQUFDO1FBRXJCLG9CQUFlLEdBQUcsRUFBRSxDQUFDO0lBYnJCLENBQUM7SUFlSyxZQUFZ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