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
import { EffectComposer } from './lib/three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from './lib/three/examples/jsm/postprocessing/RenderPass.js';
// import { BokehPass } from './lib/three/examples/jsm/postprocessing/BokehPass.js';
import { ShaderPass } from './lib/three/examples/jsm/postprocessing/ShaderPass';
// import { FXAAShader } from './lib/three/examples/jsm/shaders/FXAAShader';
// import { MTLLoader } from './lib/three/examples/jsm/loaders/MTLLoader.js';
import { UnrealBloomPass } from './lib/FixesUnrealBloomPass';
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
export default class CKBlob extends __SLitComponent {
    constructor() {
        var _a;
        super({
            litComponent: {
                shadowDom: false,
            },
        });
        this._grains = [];
        this._icons = [];
        this._iconsGroups = [];
        this._start = Date.now();
        this._perlin = __perlin();
        this._isDark = (_a = document.body.getAttribute('class')) === null || _a === void 0 ? void 0 : _a.toString().includes('-dark');
        this._postprocessing = {};
    }
    firstUpdated() {
        return __awaiter(this, void 0, void 0, function* () {
            this._scene = new THREE.Scene();
            this._camera = new THREE.PerspectiveCamera(30, this.offsetWidth / this.offsetHeight, 1, 10000);
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
            this._renderTarget = new THREE.WebGLRenderTarget(width, height, parameters);
            this._renderer = new THREE.WebGLRenderer(Object.assign({}, parameters));
            this._renderer.setSize(this.offsetWidth, this.offsetHeight);
            this._renderer.setPixelRatio(window.devicePixelRatio);
            // this._renderer.setClearColor(0x000000, 0);
            this._renderer.setRenderTarget(this._renderTarget);
            // this._renderer.shadowMap.enabled = true;
            // this._renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            // this._renderer.toneMapping = THREE.ReinhardToneMapping;
            this.querySelector('.ck-blob').appendChild(this._renderer.domElement);
            // load env map
            this._envMap = yield this.loadEnvMap();
            let backLight;
            if (this._isDark) {
                backLight = new THREE.PointLight(0xffffff, 0.5);
                backLight.position.set(8, 8, -10);
            }
            else {
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
            const sphere = yield this.createSphere();
            // grains
            yield this.addGrains();
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
            }
            else {
                ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
            }
            //Create a helper for the shadow camera (optional)
            const helper = new THREE.CameraHelper(light.shadow.camera);
            const pointsSphere1 = this.createPointsSphere(this._isDark ? 0xffffff : 0x000000, 0, 0.1);
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
                    if (!grainObj.trail)
                        grainObj.trail = [];
                    if (grainObj.trail.length >= grainObj.trailLength) {
                        const last = grainObj.trail.shift();
                        last.geometry.dispose();
                        last.material.dispose();
                        this._scene.remove(last._light);
                        this._scene.remove(last);
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
                    sphere.position.copy(new THREE.Vector3().setFromMatrixPosition(grainObj.localGroup.matrixWorld));
                });
            }, 50);
            this.animate();
        });
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
        const bloomPass = new UnrealBloomPass(new THREE.Vector2(this.offsetWidth, this.offsetHeight), 1.5, 0.4, 0.85);
        bloomPass.threshold = params.bloomThreshold;
        bloomPass.strength = params.bloomStrength;
        bloomPass.radius = params.bloomRadius;
        const renderPass = new RenderPass(this._scene, this._camera);
        // renderPass.clearColor = new THREE.Color(0, 0, 0);
        // renderPass.clearAlpha = true;
        const bloomComposer = new EffectComposer(this._renderer);
        bloomComposer.renderToScreen = false;
        bloomComposer.addPass(renderPass);
        bloomComposer.addPass(bloomPass);
        const finalPass = new ShaderPass(new THREE.ShaderMaterial({
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
        }), 'baseTexture');
        finalPass.needsSwap = true;
        const finalComposer = new EffectComposer(this._renderer);
        finalComposer.addPass(renderPass);
        finalComposer.addPass(finalPass);
        this._bloomComposer = bloomComposer;
        this._finalComposer = finalComposer;
    }
    addControls() {
        this._controls = new OrbitControls(this._camera, this._renderer.domElement);
        this._controls.autoRotate = true;
        this._controls.autoRotateSpeed = 4;
        this._controls.enableZoom = false;
        // this._controls.enableDamping = true;
        this._controls.update();
    }
    addGrains() {
        return __awaiter(this, void 0, void 0, function* () {
            const grain = yield this.loadCoffeeGrain();
            this._grains = [];
            const yellowMaterial = yield this.createGrainMaterial('/src/3d/coffeeGrain/grain-yellow.jpg');
            const purpleMaterial = yield this.createGrainMaterial('/src/3d/coffeeGrain/grain-purple.jpg');
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
                const grainObj = {
                    grain: newGrain,
                    group,
                    scale,
                    speed,
                    color,
                    trailLength: 15 + Math.round(Math.random() * 20),
                    localGroup,
                    trail: [],
                };
                group.rotation.set(Math.random() * 360, Math.random() * 360, Math.random() * 360);
                localGroup.position.x = 7 + Math.random() * 4;
                this._grains.push(grainObj);
                this._scene.add(group);
            }
        });
    }
    createSphere() {
        return __awaiter(this, void 0, void 0, function* () {
            let texture;
            let matSettings;
            if (this._isDark) {
                texture = yield this.loadTexture('/src/3d/ck-texture.jpg');
                matSettings = {
                    metalness: 0,
                    roughness: 0.6,
                    color: 0xffffff,
                };
            }
            else {
                texture = yield this.loadTexture('/src/3d/ck-texture-light.jpg');
                matSettings = {
                    // refractionRatio: 0.2,
                    // flatShading: true,
                    // emissiveIntensity: 1,
                    metalness: 0,
                    roughness: 0.6,
                    color: 0xffffff,
                };
            }
            const ballMaterial = Object.assign(Object.assign({}, matSettings), { map: texture, envMap: this._envMap.texture });
            const ballMat = new THREE.MeshStandardMaterial(ballMaterial);
            const geom = new THREE.SphereGeometry(1, 64, 64);
            this._sphere = new THREE.Mesh(geom, ballMat);
            this._sphere.scale.set(4, 4, 4);
            return this._sphere;
        });
    }
    createIconSphere(texturePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const texture = yield this.loadTexture(texturePath);
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
            sphere.position.x = 6;
            const group = new THREE.Group();
            group.add(sphere);
            this._icons.push(sphere);
            this._iconsGroups.push(group);
            return group;
        });
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
    }`, fragmentShader = `uniform vec3 color;
    varying float vAlpha;

    void main() {
      gl_FragColor = vec4( color, vAlpha );
    }`;
        const ballMat = new THREE.MeshBasicMaterial({
            color: this._isDark ? 0xffffff : 0x000000,
        });
        const geom = new THREE.SphereGeometry(1, 32, 32);
        const sphere = new THREE.Mesh(geom, ballMat);
        sphere.geometry.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1));
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
        }
        else {
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
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const texture = yield this.loadTexture(texturePath);
            const bumpMap = yield this.loadTexture('/src/3d/coffeeGrain/coffeeGrainBumpMap.jpg');
            let grainMat = new THREE.MeshStandardMaterial({
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
        }));
    }
    loadCoffeeGrain() {
        return new Promise((resolve) => {
            new OBJLoader().load('/src/3d/coffeeGrain/coffeeGrain.obj', (object) => {
                // object.castShadow = true;
                object.scale.set(0.01, 0.01, 0.01);
                object.position.set(0, 0, 0);
                resolve(object);
            });
        });
    }
    updateGeometryOf(object, k = 0.6, amount = 0.0005) {
        if (object._object)
            object = object._object;
        var time = performance.now() * amount;
        var positions = object.geometry.attributes.position.array;
        for (var i = 0; i < positions.length; i += 3) {
            const v = new THREE.Vector3(positions[i], positions[i + 1], positions[i + 2]);
            v.normalize().multiplyScalar(1 +
                0.3 *
                    this._perlin.perlin3(v.x * k + time, v.y * k, v.z * k));
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
        var _a, _b;
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
                grainObj.localGroup.lookAt(lastPosition.x, lastPosition.y, lastPosition.z);
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
        (_b = (_a = this._controls) === null || _a === void 0 ? void 0 : _a.update) === null || _b === void 0 ? void 0 : _b.call(_a);
        // this._postprocessing.composer.render(0.1);
        // this._renderer.render(this._scene, this._camera);
        this.renderBloom(true);
        this._finalComposer.render();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2tCbG9iLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQ2tCbG9iLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMkRBQTJELENBQUM7QUFDM0YsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHVEQUF1RCxDQUFDO0FBQ25GLG9GQUFvRjtBQUNwRixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFJaEYsNEVBQTRFO0FBQzVFLDZFQUE2RTtBQUM3RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFN0QscUZBQXFGO0FBQ3JGLFdBQVc7QUFDWCxtQkFBbUI7QUFDbkIsc0JBQXNCO0FBQ3RCLGtCQUFrQjtBQUNsQix1QkFBdUI7QUFDdkIscUJBQXFCO0FBQ3JCLHFCQUFxQjtBQUNyQix1QkFBdUI7QUFDdkIsbUJBQW1CO0FBQ25CLHFCQUFxQjtBQUNyQixvQkFBb0I7QUFDcEIsMEJBQTBCO0FBQzFCLHdCQUF3QjtBQUN4QixrQkFBa0I7QUFDbEIsMkJBQTJCO0FBQzNCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtRkFBbUYsQ0FBQztBQUNsSCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQzNCLE9BQU8sS0FBSyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBQy9CLE9BQU8sUUFBUSxNQUFNLG1CQUFtQixDQUFDO0FBQ3pDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUN6RSxpREFBaUQ7QUFDakQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBVTFFLE1BQU0sQ0FBQyxPQUFPLE9BQU8sTUFBTyxTQUFRLGVBQWU7SUFDL0M7O1FBQ0ksS0FBSyxDQUFDO1lBQ0YsWUFBWSxFQUFFO2dCQUNWLFNB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