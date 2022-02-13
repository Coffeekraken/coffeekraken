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
import __SSugarConfig from '@coffeekraken/s-sugar-config';
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
import * as THREE from 'three';
import { html } from 'lit';
import __perlin from './lib/perlinNoise';
// import { RGBELoader } from './lib/RGBELoader';
import { OBJLoader } from './lib/three/examples/jsm/loaders/OBJLoader.js';
import { RGBELoader } from './lib/three/examples/jsm/loaders/RGBELoader';
import { EffectComposer } from './lib/three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from './lib/three/examples/jsm/postprocessing/RenderPass.js';
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
            this._camera.position.z = 60;
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
            this._renderer.shadowMap.enabled = true;
            this._renderer.shadowMap.type = THREE.PCFSoftShadowMap;
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
            const sphere = yield this.createSphere();
            // grains
            yield this.addGrains();
            //Create a plane that receives shadows (but does not cast them)
            const planeGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
            const planeMaterial = new THREE.ShadowMaterial({
                opacity: this._isDark ? .2 : .05,
                // opacity: 1,
                // color: 0xff0000
            });
            const plane = new THREE.Mesh(planeGeometry, planeMaterial);
            // plane.receiveShadow = true;
            plane.position.set(0, -12, 0);
            plane.scale.set(2, 2, 2);
            plane.rotation.x = (Math.PI / 2) * -1;
            this._plane = plane;
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
            // this._oceanWaves();
            this._planePoints = this.createPlanePoints(0x262C2E);
            this._planePointsLight = this.createPlanePoints(0x262C2E, 1, '6.0');
            this._planePointsLight.rotation.set(Math.PI / 2, 0, Math.PI / 9);
            this._pointSpheres = [pointsSphere1];
            if (this._isDark) {
                this._scene.add(backLight);
            }
            this._scene.add(light);
            this._scene.add(ambientLight);
            // this._scene.add(sphere);
            // this._pointSpheres.forEach((s) => this._scene.add(s));
            this._scene.add(plane);
            this._scene.add(this._planePoints);
            this._scene.add(this._planePointsLight);
            // this._scene.add(helper);
            this.initPostprocessing();
            // this.addControls();
            setInterval(() => {
                this._scene.updateMatrixWorld();
            }, 50);
            this._scene.traverse(function (child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            this.animate();
        });
    }
    _updatePlaneWave(object) {
        var pos = object.geometry.attributes.position;
        let center = new THREE.Vector3(0, 0, 0);
        var vec3 = new THREE.Vector3(); // for re-use
        function wavesBuffer(waveSize, magnitude) {
            const theTime = performance.now() * .001;
            for (var i = 0, l = pos.count; i < l; i++) {
                vec3.fromBufferAttribute(pos, i);
                vec3.sub(center);
                var z = Math.sin(vec3.length() / -waveSize + (theTime)) * magnitude;
                pos.setZ(i, z);
            }
            pos.needsUpdate = true;
        }
        wavesBuffer(2, .8);
    }
    initPostprocessing() {
        const renderPass = new RenderPass(this._scene, this._camera);
        const finalComposer = new EffectComposer(this._renderer);
        finalComposer.addPass(renderPass);
        // finalComposer.addPass(finalPass);
        // this._bloomComposer = bloomComposer;
        this._finalComposer = finalComposer;
    }
    addControls() {
        this._controls = new OrbitControls(this._camera, this._renderer.domElement);
        this._controls.autoRotate = true;
        this._controls.autoRotateSpeed = 4;
        this._controls.enableDamping = true;
        this._controls.minPolarAngle = Math.PI / 2;
        this._controls.maxPolarAngle = Math.PI / 2;
        this._controls.enableZoom = false;
        // this._controls.enableDamping = true;
        this._controls.update();
    }
    addGrains() {
        return __awaiter(this, void 0, void 0, function* () {
            const grain = yield this.loadCoffeeGrain();
            this._grains = [];
            const yellowMaterial = yield this.createGrainMaterial(`${__SSugarConfig.get('serve.img.url')}/3d/coffeeGrain/grain-yellow.jpg`);
            const purpleMaterial = yield this.createGrainMaterial(`${__SSugarConfig.get('serve.img.url')}/3d/coffeeGrain/grain-purple.jpg`);
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
                newGrain.castShadow = true;
                // newGrain.receiveShadow = true;
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
                texture = yield this.loadTexture(`${__SSugarConfig.get('serve.img.url')}/3d/ck-texture.jpg`);
                matSettings = {
                    metalness: 0,
                    roughness: 0.6,
                    color: 0xffffff,
                };
            }
            else {
                texture = yield this.loadTexture(`${__SSugarConfig.get('serve.img.url')}/3d/ck-texture-light.jpg`);
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
            this._sphere.castShadow = true;
            this._sphere.scale.set(4, 4, 4);
            return this._sphere;
        });
    }
    createPlanePoints(color, alphaVariation, pointSize = '8.0') {
        const numVertices = this._plane.geometry.attributes.position.count;
        var alphas = new Float32Array(numVertices * 1); // 1 values per vertex
        const vec3 = new THREE.Vector3();
        const ballMat = new THREE.MeshBasicMaterial({
            color: this._isDark ? 0x000000 : 0x000000,
        });
        const geom = new THREE.PlaneGeometry(30, 50, 16, 16);
        const plane = new THREE.Mesh(geom, ballMat);
        var pos = plane.geometry.attributes.position;
        let center = new THREE.Vector3(0, 0, 0);
        for (var i = 0; i < numVertices; i++) {
            vec3.fromBufferAttribute(pos, i);
            vec3.sub(center);
            const length = 12;
            let alpha = 1 / length * (length - vec3.length());
            if (alphaVariation) {
                alpha = 0 + Math.random() / 3;
                // alpha += -alphaVariation + Math.random() * alphaVariation * 2;
            }
            // set alpha randomly
            alphas[i] = alpha;
        }
        const vertexShader = `attribute float alpha;
        varying float vAlpha;

        void main() {
        vAlpha = alpha;
        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
        gl_PointSize = ${pointSize};
        gl_Position = projectionMatrix * mvPosition;
        }`, fragmentShader = `uniform vec3 color;
        varying float vAlpha;

        void main() {
        gl_FragColor = vec4( color, vAlpha );
        }`;
        plane.geometry.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1));
        // point cloud material
        var shaderMaterial = new THREE.ShaderMaterial({
            uniforms: {
                color: { value: new THREE.Color(color) },
            },
            vertexShader,
            fragmentShader,
            transparent: true,
        });
        const cloud = new THREE.Points(plane.geometry, shaderMaterial);
        cloud._object = plane;
        cloud.rotation.set(Math.PI / 2, 0, 0);
        cloud.position.set(0, -10, 0);
        cloud.scale.set(2, 2, 1);
        return cloud;
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
    // renderBloom(mask) {
    //     if (mask === true) {
    //         this._scene.traverse(this.darkenNonBloomed.bind(this));
    //         this._bloomComposer.render();
    //         this._scene.traverse(this.restoreMaterial.bind(this));
    //     } else {
    //         this._camera.layers.set(this.BLOOM_SCENE);
    //         this._bloomComposer.render();
    //         this._camera.layers.set(this.ENTIRE_SCENE);
    //     }
    // }
    // darkenNonBloomed(obj) {
    //     if (obj.isMesh && this._bloomLayer.test(obj.layers) === false) {
    //         this._materialsByObj[obj.uuid] = obj.material;
    //         obj.material = this._darkMaterial;
    //     }
    // }
    // restoreMaterial(obj) {
    //     if (this._materialsByObj[obj.uuid]) {
    //         obj.material = this._materialsByObj[obj.uuid];
    //         delete this._materialsByObj[obj.uuid];
    //     }
    // }
    createGrainMaterial(texturePath) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const texture = yield this.loadTexture(texturePath);
            // const bumpMap = await this.loadTexture(
            //     '/src/3d/coffeeGrain/coffeeGrainBumpMap.jpg',
            // );
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
            new OBJLoader().load(`${__SSugarConfig.get('serve.img.url')}/3d/coffeeGrain/coffeeGrain.obj`, (object) => {
                object.castShadow = true;
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
                100 *
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
                .setPath(`${__SSugarConfig.get('serve.img.url')}/3d/`)
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
        this._updatePlaneWave(this._planePoints);
        this._updatePlaneWave(this._planePointsLight);
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
        // this._sphere.rotation.y += 0.003;
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
        // this._tuniform.time.value += 0.05;
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
        // this.renderBloom(true);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2tCbG9iLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQ2tCbG9iLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxxRkFBcUY7QUFDckYsV0FBVztBQUNYLG1CQUFtQjtBQUNuQixzQkFBc0I7QUFDdEIsa0JBQWtCO0FBQ2xCLHVCQUF1QjtBQUN2QixxQkFBcUI7QUFDckIscUJBQXFCO0FBQ3JCLHVCQUF1QjtBQUN2QixtQkFBbUI7QUFDbkIscUJBQXFCO0FBQ3JCLG9CQUFvQjtBQUNwQiwwQkFBMEI7QUFDMUIsd0JBQXdCO0FBQ3hCLGtCQUFrQjtBQUNsQiwyQkFBMkI7QUFDM0IsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1GQUFtRixDQUFDO0FBQ2xILE9BQU8sS0FBSyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBQy9CLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDM0IsT0FBTyxRQUFRLE1BQU0sbUJBQW1CLENBQUM7QUFDekMsaURBQWlEO0FBQ2pELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUMxRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDekUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDJEQUEyRCxDQUFDO0FBQzNGLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx1REFBdUQsQ0FBQztBQVFuRixNQUFNLENBQUMsT0FBTyxPQUFPLE1BQU8sU0FBUSxlQUFlO0lBQy9DOztRQUNJLEtBQUssQ0FBQztZQUNGLFlBQVksRUFBRTtnQkFDVixTQUFTLEVBQUUsS0FBSzthQUNuQjtTQUNKLENBQUMsQ0FBQztRQVFQLFlBQU8sR0FBRyxFQUFFLENBQUM7UUFFYixXQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ1osaUJB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