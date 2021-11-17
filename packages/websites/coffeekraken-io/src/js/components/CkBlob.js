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
// import { EffectComposer } from './lib/three/examples/jsm/postprocessing/EffectComposer.js';
// import { RenderPass } from './lib/three/examples/jsm/postprocessing/RenderPass.js';
// import { BokehPass } from './lib/three/examples/jsm/postprocessing/BokehPass.js';
// import { ShaderPass } from './lib/three/examples/jsm/postprocessing/ShaderPass';
// import { FXAAShader } from './lib/three/examples/jsm/shaders/FXAAShader';
// import { MTLLoader } from './lib/three/examples/jsm/loaders/MTLLoader.js';
// import { TextureLoader } from './lib/three/examples/jsm/loaders/TextureLoader.js';
import { EffectComposer, EffectPass, DepthOfFieldEffect, RenderPass, } from 'postprocessing';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';
import { html } from 'lit';
import * as THREE from 'three';
import __perlin from './lib/perlinNoise';
import { RGBELoader } from './lib/three/examples/jsm/loaders/RGBELoader';
// import { RGBELoader } from './lib/RGBELoader';
import { OBJLoader } from './lib/three/examples/jsm/loaders/OBJLoader.js';
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
        composer.addPass(new EffectPass(this._camera, new DepthOfFieldEffect(this._camera, {
            focusDistance: 1.3,
            focalLength: 0.75,
            bokehScale: 2,
        })));
        // composer.addPass(bokehPass);
        // composer.addPass(fxaaPass);
        this._composer = composer;
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
            new THREE.TextureLoader().load('/src/3d/coffeeGrain/coffeeGrain-bw-1.jpg', (texture) => {
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
        this._composer.render();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2tCbG9iLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQ2tCbG9iLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCw4RkFBOEY7QUFDOUYsc0ZBQXNGO0FBQ3RGLG9GQUFvRjtBQUNwRixtRkFBbUY7QUFDbkYsNEVBQTRFO0FBQzVFLDZFQUE2RTtBQUM3RSxxRkFBcUY7QUFDckYsT0FBTyxFQUVILGNBQWMsRUFDZCxVQUFVLEVBQ1Ysa0JBQWtCLEVBRWxCLFVBQVUsR0FDYixNQUFNLGdCQUFnQixDQUFDO0FBQ3hCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtRkFBbUYsQ0FBQztBQUNsSCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQzNCLE9BQU8sS0FBSyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBQy9CLE9BQU8sUUFBUSxNQUFNLG1CQUFtQixDQUFDO0FBQ3pDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUN6RSxpREFBaUQ7QUFDakQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBRTFFLE1BQU0sQ0FBQyxPQUFPLE9BQU8sTUFBTyxTQUFRLGVBQWU7SUFDL0M7UUFDSSxLQUFLLENBQUM7WUFDRixZQUFZLEVBQUU7Z0JBQ1YsU0FBUyxFQUFFLEtBQUs7YUFDbkI7U0FDSixDQUFDLENBQUM7UUFRUCxZQUFPLEdBQUcsRUFBRSxDQUFDO1FBRWIsV0FBTSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUVwQixZQUFPLEdBQUcsUUFBUSxFQUFFLENBQUM7UUFFckIsb0JBQWUsR0FBRyxFQUFFLENBQUM7SUFickIsQ0FBQztJQWVLLFlBQVk7O1lBQ2QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNoQyxJQUFJLENBQUMs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