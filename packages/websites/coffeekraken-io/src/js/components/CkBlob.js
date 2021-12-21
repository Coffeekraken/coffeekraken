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
                    sphere.position.copy(grainObj.localGroup.matrixWorld.getPosition());
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
                    clearcoat: 0,
                    clearcoatRoughness: 0,
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
                    clearcoat: 0,
                    clearcoatRoughness: 0,
                    metalness: 0,
                    roughness: 0.6,
                    color: 0xffffff,
                };
            }
            const roughnessMap = yield this.loadTexture('/src/3d/ck-roughness.jpg');
            const ballMaterial = Object.assign(Object.assign({}, matSettings), { map: texture, envMap: this._envMap.texture });
            const ballMat = new THREE.MeshStandardMaterial(ballMaterial);
            const geom = new THREE.SphereGeometry(1, 64, 64);
            this._sphere = new THREE.Mesh(geom, ballMat);
            this._sphere.scale.set(4, 4, 4);
            // this._sphere.receiveShadow = true;
            // this._sphere.castShadow = true;
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
            // sphere.position.x = 5 + 4;
            sphere.position.x = 6;
            // sphere.receiveShadow = true;
            // sphere.castShadow = true;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2tCbG9iLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQ2tCbG9iLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMkRBQTJELENBQUM7QUFDM0YsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHVEQUF1RCxDQUFDO0FBQ25GLG9GQUFvRjtBQUNwRixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFJaEYsNEVBQTRFO0FBQzVFLDZFQUE2RTtBQUM3RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFN0QscUZBQXFGO0FBQ3JGLFdBQVc7QUFDWCxtQkFBbUI7QUFDbkIsc0JBQXNCO0FBQ3RCLGtCQUFrQjtBQUNsQix1QkFBdUI7QUFDdkIscUJBQXFCO0FBQ3JCLHFCQUFxQjtBQUNyQix1QkFBdUI7QUFDdkIsbUJBQW1CO0FBQ25CLHFCQUFxQjtBQUNyQixvQkFBb0I7QUFDcEIsMEJBQTBCO0FBQzFCLHdCQUF3QjtBQUN4QixrQkFBa0I7QUFDbEIsMkJBQTJCO0FBQzNCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtRkFBbUYsQ0FBQztBQUNsSCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQzNCLE9BQU8sS0FBSyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBQy9CLE9BQU8sUUFBUSxNQUFNLG1CQUFtQixDQUFDO0FBQ3pDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUN6RSxpREFBaUQ7QUFDakQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBUzFFLE1BQU0sQ0FBQyxPQUFPLE9BQU8sTUFBTyxTQUFRLGVBQWU7SUFDL0M7O1FBQ0ksS0FBSyxDQUFDO1lBQ0YsWUFBWSxFQUFFO2dCQUNWLFNB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