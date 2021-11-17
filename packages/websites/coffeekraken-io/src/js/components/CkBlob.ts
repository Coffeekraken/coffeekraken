// @ts-nocheck

import __SLitComponent from '@coffeekraken/s-lit-component';
import { html } from 'lit';
import __filterObject from '@coffeekraken/sugar/shared/object/filter';
import __wait from '@coffeekraken/sugar/shared/time/wait';
import __noisify from './lib/noisify';
import { Simplex2 } from 'tumult';

import * as THREE from 'three';
import { OBJLoader } from './lib/three/examples/jsm/loaders/OBJLoader.js';
// import { EffectComposer } from './lib/three/examples/jsm/postprocessing/EffectComposer.js';
// import { RenderPass } from './lib/three/examples/jsm/postprocessing/RenderPass.js';
// import { BokehPass } from './lib/three/examples/jsm/postprocessing/BokehPass.js';
// import { ShaderPass } from './lib/three/examples/jsm/postprocessing/ShaderPass';
// import { FXAAShader } from './lib/three/examples/jsm/shaders/FXAAShader';
import { MTLLoader } from './lib/three/examples/jsm/loaders/MTLLoader.js';
import { TextureLoader } from './lib/three/examples/jsm/loaders/TextureLoader.js';

import {
    BloomEffect,
    EffectComposer,
    EffectPass,
    RenderPass,
} from 'postprocessing';

import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';

import { RGBELoader } from './lib/RGBELoader';
import __perlin from './lib/perlinNoise';

class NoiseSphereGeometry extends THREE.SphereGeometry {
    constructor(
        radius,
        widthSegments,
        heightSegments,
        { seed, noiseWidth, noiseHeight },
    ) {
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
    }

    _renderer;
    _scene;
    _camera;
    _sphere;

    _grains = [];

    _start = Date.now();

    _perlin = __perlin();

    _postprocessing = {};

    async firstUpdated() {
        this._scene = new THREE.Scene();
        this._camera = new THREE.PerspectiveCamera(
            30,
            this.offsetWidth / this.offsetHeight,
            1,
            10000,
        );
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
        this._envMap = await this.loadEnvMap();

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
        const grains = await this.addGrains();

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
        this._controls = new OrbitControls(
            this._camera,
            this._renderer.domElement,
        );

        // this._controls.autoRotate = true;
        // this._controls.autoRotateSpeed = 0.5;
        // this._controls.enableDamping = true;
        this._controls.update();
    }
    async addGrains() {
        const grain = await this.loadCoffeeGrain();
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

            group.rotation.set(
                Math.random() * 360,
                Math.random() * 360,
                Math.random() * 360,
            );
            group.position.set(
                -10 + Math.random() * 20,
                -10 + Math.random() * 20,
                -10 + Math.random() * 20,
            );
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
            new THREE.TextureLoader().load(
                '/src/3d/coffeeGrain/coffeeGrain-bw.jpg',
                (texture) => {
                    new THREE.TextureLoader().load(
                        '/src/3d/coffeeGrain/coffeeGrainBumpMap.jpg',
                        (bumpMap) => {
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

                            new OBJLoader().load(
                                '/src/3d/coffeeGrain/coffeeGrain.obj',
                                (object) => {
                                    object.traverse(function (child) {
                                        if (child instanceof THREE.Mesh) {
                                            child.material = grainMat;
                                        }
                                    });

                                    object.castShadow = true;
                                    object.scale.set(0.01, 0.01, 0.01);
                                    object.position.set(0, 0, 0);

                                    resolve(object);
                                },
                            );
                        },
                    );
                },
            );
        });
    }
    updateGeometry() {
        var time = performance.now() * 0.0005;
        var k = 0.6;
        var positions = this._sphere.geometry.attributes.position.array;
        for (var i = 0; i < positions.length; i += 3) {
            const v = new THREE.Vector3(
                positions[i],
                positions[i + 1],
                positions[i + 2],
            );
            v.normalize().multiplyScalar(
                1 +
                    0.3 *
                        this._perlin.perlin3(v.x * k + time, v.y * k, v.z * k),
            );

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
        return html`
            <div class="ck-blob">
                <canvas class="blob-perlin"></canvas>
            </div>
        `;
    }
}

export function define(props: any = {}, tagName = 'ck-blob') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, CKBlob);
}
