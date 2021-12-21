// @ts-nocheck

import __SLitComponent from '@coffeekraken/s-lit-component';
import { EffectComposer } from './lib/three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from './lib/three/examples/jsm/postprocessing/RenderPass.js';
// import { BokehPass } from './lib/three/examples/jsm/postprocessing/BokehPass.js';
import { ShaderPass } from './lib/three/examples/jsm/postprocessing/ShaderPass';
import { RGBShiftShader } from './lib/three/examples/jsm/shaders/RGBShiftShader';
import { CopyShader } from './lib/three/examples/jsm/shaders/CopyShader';
import { BlendShader } from './lib/three/examples/jsm/shaders/BlendShader';
// import { FXAAShader } from './lib/three/examples/jsm/shaders/FXAAShader';
// import { MTLLoader } from './lib/three/examples/jsm/loaders/MTLLoader.js';
import { UnrealBloomPass } from './lib/FixesUnrealBloomPass';
import { SavePass } from './lib/three/examples/jsm/postprocessing/SavePass';
// import { TextureLoader } from './lib/three/examples/jsm/loaders/TextureLoader.js';
// import {
//     BloomEffect,
//     EffectComposer,
//     EffectPass,
//     DotScreenEffect,
//     GodRaysEffect,
//     BlendFunction,
//     ShockWaveEffect,
//     NoiseEffect,
//     OutlineEffect,
//     GlitchEffect,
//     DepthOfFieldEffect,
//     PixelationEffect,
//     RenderPass,
// } from 'postprocessing';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';
import { html } from 'lit';
import * as THREE from 'three';
import __perlin from './lib/perlinNoise';
import { RGBELoader } from './lib/three/examples/jsm/loaders/RGBELoader';
// import { RGBELoader } from './lib/RGBELoader';
import { OBJLoader } from './lib/three/examples/jsm/loaders/OBJLoader.js';
import { Triangle } from 'three/build/three.module';

interface IFlyingCoffee {
    grain: any;
    trail: any[];
    group: any;
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

    _icons = [];
    _iconsGroups = [];

    _start = Date.now();

    _perlin = __perlin();

    _isDark = document.body.getAttribute('class')?.toString().includes('-dark');

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

        this.ENTIRE_SCENE = 0;
        this.BLOOM_SCENE = 1;

        this._materialsByObj = {};

        this._darkMaterial = new THREE.MeshBasicMaterial({ color: 'black' });

        var width = this.offsetWidth || 1;
        var height = this.offsetHeight || 1;
        var parameters = {
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter,
            format: THREE.RGBAFormat,
            alpha: true,
            antialias: true,
            // stencilBuffer: false,
        };

        this._renderTarget = new THREE.WebGLRenderTarget(
            width,
            height,
            parameters,
        );

        this._renderer = new THREE.WebGLRenderer({
            ...parameters,
        });
        this._renderer.setSize(this.offsetWidth, this.offsetHeight);
        this._renderer.setPixelRatio(window.devicePixelRatio);
        // this._renderer.setClearColor(0x000000, 0);
        this._renderer.setRenderTarget(this._renderTarget);
        // this._renderer.shadowMap.enabled = true;
        // this._renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        // this._renderer.toneMapping = THREE.ReinhardToneMapping;
        this.querySelector('.ck-blob').appendChild(this._renderer.domElement);

        // load env map
        this._envMap = await this.loadEnvMap();

        let backLight;
        if (this._isDark) {
            backLight = new THREE.PointLight(0xffffff, 0.5);
            backLight.position.set(8, 8, -10);
        } else {
            backLight = new THREE.PointLight(0xffffff, 2);
            backLight.position.set(8, 8, -10);
        }

        //Create a DirectionalLight and turn on shadows for the light
        const light = new THREE.DirectionalLight(0xffcc17, 0.1, 100);
        light.position.set(0, 40, 0); //default; light shining from top
        // light.castShadow = false; // default false

        // //Set up shadow properties for the light
        // light.shadow.mapSize.width = 1024; // default
        // light.shadow.mapSize.height = 1024; // default
        // light.shadow.camera.near = 0.5; // default
        // light.shadow.camera.far = 500; // default

        // light.shadow.camera.left = -50;
        // light.shadow.camera.right = 50;
        // light.shadow.camera.top = 50;
        // light.shadow.camera.bottom = -50;

        // sphere
        const sphere = await this.createSphere();

        // grains
        await this.addGrains();

        //Create a plane that receives shadows (but does not cast them)
        const planeGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
        const planeMaterial = new THREE.ShadowMaterial({
            opacity: 0.1,
        });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        // plane.receiveShadow = true;
        plane.position.set(0, -12, 0);
        plane.rotation.x = (Math.PI / 2) * -1;

        var ambientLight;
        if (this._isDark) {
            ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
        } else {
            ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
        }

        //Create a helper for the shadow camera (optional)
        const helper = new THREE.CameraHelper(light.shadow.camera);

        const pointsSphere1 = this.createPointsSphere(
            this._isDark ? 0xffffff : 0x000000,
            0,
            0.1,
        );
        pointsSphere1.scale.set(9, 9, 9);
        // const pointsSphere2 = this.createPointsSphere(0x7043ff, 0, 0.3);
        // pointsSphere2.scale.set(7.5, 7.5, 7.5);
        // const pointsSphere3 = this.createPointsSphere(0xffffff, 0, 0.1);
        // pointsSphere3.scale.set(9, 9, 9);

        // const html5 = await this.createIconSphere('/src/3d/logo-html5.jpg');
        // html5.rotation.set(
        //     Math.random() * 360,
        //     Math.random() * 360,
        //     Math.random() * 360,
        // );
        // const css3 = await this.createIconSphere('/src/3d/logo-css3.jpg');
        // css3.rotation.set(
        //     Math.random() * 360,
        //     Math.random() * 360,
        //     Math.random() * 360,
        // );
        // const js = await this.createIconSphere('/src/3d/logo-js.jpg');
        // js.rotation.set(
        //     Math.random() * 360,
        //     Math.random() * 360,
        //     Math.random() * 360,
        // );
        // const vitejs = await this.createIconSphere('/src/3d/logo-vitejs.jpg');
        // vitejs.rotation.set(
        //     Math.random() * 360,
        //     Math.random() * 360,
        //     Math.random() * 360,
        // );
        // const postcss = await this.createIconSphere('/src/3d/logo-postcss.jpg');
        // postcss.rotation.set(
        //     Math.random() * 360,
        //     Math.random() * 360,
        //     Math.random() * 360,
        // );
        // const npm = await this.createIconSphere('/src/3d/logo-npm.jpg');
        // npm.rotation.set(
        //     Math.random() * 360,
        //     Math.random() * 360,
        //     Math.random() * 360,
        // );
        // const yarn = await this.createIconSphere('/src/3d/logo-yarn.jpg');
        // yarn.rotation.set(
        //     Math.random() * 360,
        //     Math.random() * 360,
        //     Math.random() * 360,
        // );
        // const typescript = await this.createIconSphere(
        //     '/src/3d/logo-typescript.jpg',
        // );
        // typescript.rotation.set(
        //     Math.random() * 360,
        //     Math.random() * 360,
        //     Math.random() * 360,
        // );
        // const php = await this.createIconSphere('/src/3d/logo-php.jpg');
        // php.rotation.set(
        //     Math.random() * 360,
        //     Math.random() * 360,
        //     Math.random() * 360,
        // );
        // const node = await this.createIconSphere('/src/3d/logo-node.jpg');
        // node.rotation.set(
        //     Math.random() * 360,
        //     Math.random() * 360,
        //     Math.random() * 360,
        // );

        this._pointSpheres = [pointsSphere1];

        if (this._isDark) {
            this._scene.add(backLight);
        }
        this._scene.add(light);
        this._scene.add(ambientLight);
        this._scene.add(sphere);
        // this._scene.add(html5);
        // this._scene.add(css3);
        // this._scene.add(js);
        // this._scene.add(vitejs);
        // this._scene.add(postcss);
        // this._scene.add(npm);
        // this._scene.add(yarn);
        // this._scene.add(typescript);
        // this._scene.add(php);
        // this._scene.add(node);
        // this._scene.add(grains);
        // this._pointSpheres.forEach((s) => this._scene.add(s));

        // this._scene.add(plane);
        // this._scene.add(helper);

        this.initPostprocessing();

        this.addControls();

        setInterval(() => {
            this._scene.updateMatrixWorld();

            this._grains.forEach((grainObj) => {
                if (!grainObj.trail) grainObj.trail = [];

                if (grainObj.trail.length >= grainObj.trailLength) {
                    const last = grainObj.trail.shift();
                    last.geometry.dispose();
                    last.material.dispose();
                    this._scene.remove(last._light);
                    this._scene.remove(last);
                    // grainObj.trail = grainObj.trail.slice(1);
                }

                grainObj.trail.forEach((s, i) => {
                    const scale = (0.15 / grainObj.trailLength) * i;
                    s.scale.set(scale, scale, scale);
                });

                const ballMat = new THREE.MeshStandardMaterial({
                    color: 0x3d403e,
                    emissive: 0x252726,
                    emissiveIntensity: 1,
                });
                const geom = new THREE.SphereGeometry(1, 4, 4);
                const sphere = new THREE.Mesh(geom, ballMat);
                sphere.scale.set(0.2, 0.2, 0.2);
                grainObj.trail.push(sphere);
                sphere.layers.toggle(this.BLOOM_SCENE);
                this._scene.add(sphere);
                sphere.position.copy(
                    grainObj.localGroup.matrixWorld.getPosition(),
                );
            });
        }, 50);

        this.animate();
    }

    initPostprocessing() {
        // const renderPass = new RenderPass(this._scene, this._camera);

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

        // const composer = new EffectComposer(this._renderer);

        // composer.addPass(renderPass);
        // // composer.addPass(
        // //     new EffectPass(
        // //         this._camera,
        // //         new DepthOfFieldEffect(this._camera, {
        // //             focusDistance: 0.4,
        // //             focalLength: 0.1,
        // //             bokehScale: 1,
        // //         }),
        // //     ),
        // // );
        // composer.addPass(
        //     new EffectPass(
        //         this._camera,
        //         new OutlineEffect(this._scene, this._camera),
        //     ),
        // );
        // // composer.addPass(
        // //     new EffectPass(
        // //         this._camera,
        // //         new BloomEffect({
        // //             intensity: 2,
        // //         }),
        // //     ),
        // // );
        // composer.addPass(
        //     new EffectPass(
        //         this._camera,
        //         new GlitchEffect({
        //             delay: new THREE.Vector2(5, 15),
        //             duration: new THREE.Vector2(0.05, 0.2),
        //             ratio: 0.1,
        //             strengh: new THREE.Vector2(0.01, 0.02),
        //         }),
        //     ),
        // );
        // // composer.addPass(bokehPass);
        // // composer.addPass(fxaaPass);

        this._bloomLayer = new THREE.Layers();
        this._bloomLayer.set(this.BLOOM_SCENE);

        const params = {
            exposure: 1,
            bloomStrength: 1.5,
            bloomThreshold: 0,
            bloomRadius: 0,
        };

        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(this.offsetWidth, this.offsetHeight),
            1.5,
            0.4,
            0.85,
        );
        bloomPass.threshold = params.bloomThreshold;
        bloomPass.strength = params.bloomStrength;
        bloomPass.radius = params.bloomRadius;

        const renderPass = new RenderPass(this._scene, this._camera);

        // renderPass.clearColor = new THREE.Color(0, 0, 0);
        // renderPass.clearAlpha = true;

        const bloomComposer = new EffectComposer(
            this._renderer,
            // this._renderTarget,
        );
        bloomComposer.renderToScreen = false;
        bloomComposer.addPass(renderPass);
        bloomComposer.addPass(bloomPass);

        const finalPass = new ShaderPass(
            new THREE.ShaderMaterial({
                uniforms: {
                    baseTexture: { value: null },
                    bloomTexture: {
                        value: bloomComposer.renderTarget2.texture,
                    },
                },
                vertexShader: `
                    varying vec2 vUv;

			void main() {

				vUv = uv;

				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

			}
                `,
                fragmentShader: `
                uniform sampler2D baseTexture;
			uniform sampler2D bloomTexture;

			varying vec2 vUv;

			void main() {

				gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );

			}
            `,
                defines: {},
            }),
            'baseTexture',
        );
        finalPass.needsSwap = true;

        const finalComposer = new EffectComposer(
            this._renderer,
            // this._renderTarget,
        );
        finalComposer.addPass(renderPass);
        finalComposer.addPass(finalPass);

        this._bloomComposer = bloomComposer;
        this._finalComposer = finalComposer;
    }

    addControls() {
        this._controls = new OrbitControls(
            this._camera,
            this._renderer.domElement,
        );

        this._controls.autoRotate = true;
        this._controls.autoRotateSpeed = 4;
        this._controls.enableZoom = false;
        // this._controls.enableDamping = true;
        this._controls.update();
    }
    async addGrains() {
        const grain = await this.loadCoffeeGrain();
        this._grains = [];

        const yellowMaterial = await this.createGrainMaterial(
            '/src/3d/coffeeGrain/grain-yellow.jpg',
        );

        const purpleMaterial = await this.createGrainMaterial(
            '/src/3d/coffeeGrain/grain-purple.jpg',
        );

        const materials = [yellowMaterial, purpleMaterial];
        const colors = [0xfabb03, 0xfabb03, 0x5101ff];

        const count = 12;

        for (let i = 0; i < count; i++) {
            let material = materials[0];
            let color = colors[0];
            if (Math.random() > 0.5) {
                material = materials[1];
                color = colors[1];
            }

            const newGrain = grain.clone();
            newGrain.position.set(0, -0.6, -0.5);
            newGrain.rotation.x = Math.PI / 2;
            newGrain.rotation.y = Math.PI;
            newGrain.scale.set(0.02, 0.02, 0.02);

            let scale = 0.2 + Math.random() - 0.2;
            // scale = 1;

            newGrain.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material = material;
                }
            });

            const localGroup = new THREE.Group();
            localGroup.scale.set(scale, scale, scale);
            localGroup.add(newGrain);

            const group = new THREE.Group();
            group.add(localGroup);

            const speed = 0.003 + Math.random() / 100 / 2;
            const grainObj: IFlyingCoffee = {
                grain: newGrain,
                group,
                scale,
                speed,
                color,
                trailLength: 15 + Math.round(Math.random() * 20),
                localGroup,
                trail: [],
            };

            group.rotation.set(
                Math.random() * 360,
                Math.random() * 360,
                Math.random() * 360,
            );
            localGroup.position.x = 7 + Math.random() * 4;

            this._grains.push(grainObj);
            this._scene.add(group);
        }
    }
    async createSphere() {
        let texture;
        let matSettings;
        if (this._isDark) {
            texture = await this.loadTexture('/src/3d/ck-texture.jpg');
            matSettings = {
                clearcoat: 0,
                clearcoatRoughness: 0,
                metalness: 0,
                roughness: 0.6,
                color: 0xffffff,
            };
        } else {
            texture = await this.loadTexture('/src/3d/ck-texture-light.jpg');
            matSettings = {
                // refractionRatio: 0.2,
                // flatShading: true,
                // emissiveIntensity: 1,
                clearcoat: 0,
                clearcoatRoughness: 0,
                metalness: 0,
                roughness: 0.6,
                color: 0xffffff,
            };
        }
        const roughnessMap = await this.loadTexture('/src/3d/ck-roughness.jpg');

        const ballMaterial = {
            ...matSettings,
            map: texture,
            envMap: this._envMap.texture,
        };

        const ballMat = new THREE.MeshStandardMaterial(ballMaterial);
        const geom = new THREE.SphereGeometry(1, 64, 64);

        this._sphere = new THREE.Mesh(geom, ballMat);
        this._sphere.scale.set(4, 4, 4);
        // this._sphere.receiveShadow = true;
        // this._sphere.castShadow = true;

        return this._sphere;
    }

    async createIconSphere(texturePath) {
        const texture = await this.loadTexture(texturePath);

        const ballMaterial = {
            clearcoat: 0.1,
            clearcoatRoughness: 0,
            metalness: 0,
            roughness: 0.5,
            // color: 0xf2a22b,
            color: 0xffffff,
            // color: 0xffffff,
            // normalMap: texture,
            // bumpMap: texture,
            map: texture,
            // normalScale: new THREE.Vector2(0.15, 2),
            envMap: this._envMap.texture,
        };

        const ballMat = new THREE.MeshPhysicalMaterial(ballMaterial);
        const geom = new THREE.SphereGeometry(1, 32, 32);
        const sphere = new THREE.Mesh(geom, ballMat);

        const scale = 0.3 + Math.random() * 0.5;
        sphere.scale.set(scale, scale, scale);
        // sphere.position.x = 5 + 4;
        sphere.position.x = 6;

        // sphere.receiveShadow = true;
        // sphere.castShadow = true;

        const group = new THREE.Group();
        group.add(sphere);

        this._icons.push(sphere);
        this._iconsGroups.push(group);

        return group;
    }

    createPointsSphere(color, minAlpha = 0, maxAlpha = 1) {
        const numVertices = this._sphere.geometry.attributes.position.count;
        var alphas = new Float32Array(numVertices * 1); // 1 values per vertex

        for (var i = 0; i < numVertices; i++) {
            // set alpha randomly
            alphas[i] =
                minAlpha / (this._isDark ? 2 : 5) +
                (Math.random() * maxAlpha) / (this._isDark ? 2 : 5);
        }

        const vertexShader = `attribute float alpha;
    varying float vAlpha;

    void main() {
      vAlpha = alpha;
      vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
      gl_PointSize = 2.0;
      gl_Position = projectionMatrix * mvPosition;
    }`,
            fragmentShader = `uniform vec3 color;
    varying float vAlpha;

    void main() {
      gl_FragColor = vec4( color, vAlpha );
    }`;

        const ballMat = new THREE.MeshBasicMaterial({
            color: this._isDark ? 0xffffff : 0x000000,
        });
        const geom = new THREE.SphereGeometry(1, 32, 32);

        const sphere = new THREE.Mesh(geom, ballMat);

        sphere.geometry.setAttribute(
            'alpha',
            new THREE.BufferAttribute(alphas, 1),
        );
        // point cloud material
        var shaderMaterial = new THREE.ShaderMaterial({
            uniforms: {
                color: { value: new THREE.Color(color) },
            },
            vertexShader,
            fragmentShader,
            transparent: true,
        });

        const cloud = new THREE.Points(sphere.geometry, shaderMaterial);

        // this._scene.add(sphere);

        cloud._object = sphere;

        return cloud;
    }
    loadTexture(path) {
        return new Promise((resolve) => {
            new THREE.TextureLoader().load(path, (texture) => {
                resolve(texture);
            });
        });
    }

    renderBloom(mask) {
        if (mask === true) {
            this._scene.traverse(this.darkenNonBloomed.bind(this));
            this._bloomComposer.render();
            this._scene.traverse(this.restoreMaterial.bind(this));
        } else {
            this._camera.layers.set(this.BLOOM_SCENE);
            this._bloomComposer.render();
            this._camera.layers.set(this.ENTIRE_SCENE);
        }
    }

    darkenNonBloomed(obj) {
        if (obj.isMesh && this._bloomLayer.test(obj.layers) === false) {
            this._materialsByObj[obj.uuid] = obj.material;
            obj.material = this._darkMaterial;
        }
    }

    restoreMaterial(obj) {
        if (this._materialsByObj[obj.uuid]) {
            obj.material = this._materialsByObj[obj.uuid];
            delete this._materialsByObj[obj.uuid];
        }
    }

    createGrainMaterial(texturePath) {
        return new Promise(async (resolve) => {
            const texture = await this.loadTexture(texturePath);
            const bumpMap = await this.loadTexture(
                '/src/3d/coffeeGrain/coffeeGrainBumpMap.jpg',
            );

            let grainMat = new THREE.MeshStandardMaterial({
                clearcoat: 1,
                clearcoatRoughness: 1,
                metalness: 0,
                roughness: 1,
                color: 0xffffff,
                // displacementMap: bumpMap,
                // normalMap: bumpMap,
                // bumpMap: bumpMap,
                // bumpScale: 3,
                // normalScale: new THREE.Vector2(0.15, 2),
                map: texture,
                envMap: this._envMap.texture,
            });

            resolve(grainMat);
        });
    }
    loadCoffeeGrain() {
        return new Promise((resolve) => {
            new OBJLoader().load(
                '/src/3d/coffeeGrain/coffeeGrain.obj',
                (object) => {
                    // object.castShadow = true;
                    object.scale.set(0.01, 0.01, 0.01);
                    object.position.set(0, 0, 0);

                    resolve(object);
                },
            );
        });
    }
    updateGeometryOf(object, k = 0.6, amount = 0.0005) {
        if (object._object) object = object._object;

        var time = performance.now() * amount;
        var positions = object.geometry.attributes.position.array;
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

        object.geometry.computeVertexNormals();
        object.geometry.normalsNeedUpdate = true;
        object.geometry.verticesNeedUpdate = true;
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
        if (!this.componentUtils.isInViewport()) {
            setTimeout(() => {
                this.animate();
            }, 100);
            return;
        }

        this.updateGeometryOf(this._sphere, 1.4);
        // this._pointSpheres.forEach((p) => {
        //     this.updateGeometryOf(p, 8, 0.0001);
        //     p.geometry.attributes.alpha.needsUpdate = true;
        //     p.geometry.attributes.position.needsUpdate = true;
        //     if (!p._speed) p._speed = Math.random() / 1000 / 8;
        //     p.rotation.x -= p._speed;
        //     p.rotation.y -= p._speed;
        //     p.rotation.z -= p._speed;
        // });
        // this._sphere.rotation.x += 0.001;
        this._sphere.rotation.y += 0.003;
        // this._sphere.rotation.z += 0.005;

        this._grains.forEach((grainObj) => {
            grainObj.group.rotation.x += grainObj.speed;
            grainObj.group.rotation.y += grainObj.speed;
            grainObj.group.rotation.z += grainObj.speed;

            if (!grainObj.localGroup.lastPositions)
                grainObj.localGroup.lastPositions = [];

            const originalPosition = new THREE.Vector3();
            const newPosition = new THREE.Vector3();
            if (grainObj.localGroup.lastPositions.length > 10) {
                grainObj.localGroup.getWorldPosition(newPosition);
                const lastPosition = grainObj.localGroup.lastPositions.shift();
                grainObj.localGroup.lookAt(
                    lastPosition.x,
                    lastPosition.y,
                    lastPosition.z,
                );
            }
            grainObj.localGroup.getWorldPosition(originalPosition);
            grainObj.localGroup.lastPositions.push(originalPosition);

            // grainObj.grain.rotation.x = group.rotation.x;
            // grainObj.grain.rotation.y = group.rotation.y;
            // grainObj.grain.rotation.z = group.rotation.z;
        });

        // this._icons.forEach((icon) => {
        //     this.updateGeometryOf(icon, 1, 0.001);
        //     icon.geometry.attributes.position.needsUpdate = true;
        //     if (!icon._speed) icon._speed = 0.003 + Math.random() / 100;
        //     icon.rotation.x += icon._speed;
        //     icon.rotation.y += icon._speed;
        //     icon.rotation.z += icon._speed;
        // });

        // this._iconsGroups.forEach((group) => {
        //     if (!group._speed) group._speed = 0.001 + Math.random() / 100 / 2;
        //     group.rotation.x += group._speed;
        //     group.rotation.y += group._speed;
        //     group.rotation.z += group._speed;
        // });

        // this._grainsGroup.rotation.x += 0.005;
        // this._grainsGroup.rotation.y += 0.005;
        // this._grainsGroup.rotation.z += 0.005;

        // for (let i = 0; i < this._grains.length; i++) {
        //     const grain = this._grains[i];
        //     grain.rotation.x += 0.005;
        //     grain.rotation.y += 0.005;
        //     grain.rotation.z += 0.005;
        // }

        // var alphas = this._cloud.geometry.attributes.alpha;
        // alphas.needsUpdate = true; // important!

        // var alphas1 = this._cloud1.geometry.attributes.alpha;
        // alphas1.needsUpdate = true; // important!

        // var count = alphas.count;
        // for (var i = 0; i < count; i++) {
        //     // dynamically change alphas
        //     alphas.array[i] *= 0.95;
        //     if (alphas.array[i] < 0.01) {
        //         alphas.array[i] = 1.0;
        //     }
        // }

        // this._directionalLight.needsUpdate = true;

        requestAnimationFrame(this.animate.bind(this));
        this._controls?.update?.();
        // this._postprocessing.composer.render(0.1);
        // this._renderer.render(this._scene, this._camera);
        this.renderBloom(true);
        this._finalComposer.render();
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
