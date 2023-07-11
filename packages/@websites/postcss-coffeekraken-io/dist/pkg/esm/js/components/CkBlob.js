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
import __STheme from '@coffeekraken/s-theme';
// import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';
import { html } from 'lit';
import * as THREE from 'three';
import { OBJLoader } from './lib/three/examples/jsm/loaders/OBJLoader.js';
// import { RGBELoader } from './lib/three/examples/jsm/loaders/RGBELoader.js';
import { EffectComposer } from './lib/three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from './lib/three/examples/jsm/postprocessing/RenderPass.js';
export default class CKBlob extends __SLitComponent {
    static get properties() {
        return __SLitComponent.propertiesFromInterface();
    }
    constructor() {
        var _a;
        super({
            shadowDom: false,
        });
        this._grains = [];
        this._icons = [];
        this._iconsGroups = [];
        this._start = Date.now();
        // _perlin = __perlin();
        this._isDark = (_a = document
            .querySelector('html')
            .getAttribute('theme')) === null || _a === void 0 ? void 0 : _a.toString().includes('dark');
        this._postprocessing = {};
        this._$html = document.querySelector('html');
    }
    firstUpdated() {
        return __awaiter(this, void 0, void 0, function* () {
            this._scene = new THREE.Scene();
            this._camera = new THREE.PerspectiveCamera(30, this.offsetWidth / this.offsetHeight, 1, 10000);
            this._camera.position.z = 60;
            // theme change
            document.addEventListener('s-theme.change', (e) => {
                const newBlob = new CKBlob();
                this.after(newBlob);
                this.remove();
            });
            setInterval(() => {
                var _a;
                this._isDark = (_a = this._$html
                    .getAttribute('theme')) === null || _a === void 0 ? void 0 : _a.toString().includes('dark');
            }, 200);
            this._theme = __STheme.getCurrentTheme();
            this._colors = {
                accent: this._theme.getColor('accent').toHex(),
                complementary: this._theme.getColor('complementary').toHex(),
            };
            let saveTimeout;
            this._theme.on('update', (data) => {
                if (data.dotPath.includes('color.accent')) {
                    this._colors.accent = data.value;
                }
                else if (data.dotPath.includes('color.complementary')) {
                    this._colors.complementary = data.value;
                }
                clearTimeout(saveTimeout);
                saveTimeout = setTimeout(() => {
                    this._theme.save();
                }, 1000);
            });
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
            // this._envMap = await this.loadEnvMap();
            let backLight;
            if (this._isDark) {
                backLight = new THREE.PointLight(0xffffff, 2);
                backLight.position.set(8, 8, -10);
            }
            else {
                backLight = new THREE.PointLight(0xffffff, 1);
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
            // grains
            yield this.addGrains();
            //Create a plane that receives shadows (but does not cast them)
            const planeGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
            const planeMaterial = new THREE.ShadowMaterial({
                opacity: this._isDark ? 0.2 : 0.05,
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
                ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
            }
            else {
                ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
            }
            //Create a helper for the shadow camera (optional)
            const helper = new THREE.CameraHelper(light.shadow.camera);
            this._planePoints = this.createPlanePoints(0x212728);
            this._planePointsLight = this.createPlanePoints(0x212728, 1, '6.0');
            this._planePointsLight.rotation.set(Math.PI / 2, 0, Math.PI / 9);
            // this._pointSpheres = [pointsSphere1];
            this._scene.add(backLight);
            this._scene.add(light);
            this._scene.add(ambientLight);
            this._scene.add(plane);
            this._scene.add(this._planePoints);
            // this._scene.add(this._planePointsLight);
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
            const theTime = performance.now() * 0.001;
            for (var i = 0, l = pos.count; i < l; i++) {
                vec3.fromBufferAttribute(pos, i);
                vec3.sub(center);
                var z = Math.sin(vec3.length() / -waveSize + theTime) * magnitude;
                pos.setZ(i, z);
            }
            pos.needsUpdate = true;
        }
        wavesBuffer(2, 0.8);
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
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const grain = yield this.loadCoffeeGrain();
            this._grains = [];
            const yellowMaterial = yield this.createGrainMaterial(`${(_b = (_a = __SSugarConfig.get().serve) === null || _a === void 0 ? void 0 : _a.img) === null || _b === void 0 ? void 0 : _b.url}/3d/coffeeGrain/grain-yellow.jpg`);
            const purpleMaterial = yield this.createGrainMaterial(`${__SSugarConfig.get('serve.img.url')}/3d/coffeeGrain/grain-purple.jpg`);
            const materials = [yellowMaterial, purpleMaterial];
            const colors = ['accent', 'complementary'];
            const count = 12;
            for (let i = 0; i < count; i++) {
                let material = materials[i % 2];
                const newGrain = grain.clone();
                newGrain.position.set(0, -0.6, -0.5);
                newGrain.rotation.x = Math.PI / 2;
                newGrain.rotation.y = Math.PI;
                newGrain.scale.set(0.02, 0.02, 0.02);
                newGrain.castShadow = true;
                // newGrain.receiveShadow = true;
                let scale = 0.3 + Math.random();
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
                    color: colors[i % 2],
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
    createPlanePoints(color, alphaVariation, pointSize = '8.0') {
        const numVertices = this._plane.geometry.attributes.position.count;
        var alphas = new Float32Array(numVertices * 1); // 1 values per vertex
        const vec3 = new THREE.Vector3();
        const ballMat = new THREE.MeshBasicMaterial({
            color: this._isDark ? 0x000000 : 0xffffff,
        });
        const geom = new THREE.PlaneGeometry(30, 50, 16, 16);
        const plane = new THREE.Mesh(geom, ballMat);
        var pos = plane.geometry.attributes.position;
        let center = new THREE.Vector3(0, 0, 0);
        for (var i = 0; i < numVertices; i++) {
            vec3.fromBufferAttribute(pos, i);
            vec3.sub(center);
            const length = 12;
            let alpha = (1 / length) * (length - vec3.length());
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
                color: {
                    value: new THREE.Color(this._isDark ? color : 0xe7e7e7),
                },
            },
            vertexShader,
            fragmentShader,
            transparent: true,
        });
        this._pointsShadedMaterial = shaderMaterial;
        const cloud = new THREE.Points(plane.geometry, shaderMaterial);
        cloud._object = plane;
        cloud.rotation.set(Math.PI / 2, 0, 0);
        cloud.position.set(0, -10, 0);
        cloud.scale.set(2, 2, 1);
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
            const bumpMap = yield this.loadTexture(`${__SSugarConfig.get('serve.img.url')}/3d/coffeeGrain/coffeeGrainBumpMap.jpg`);
            const colors = [0xfabb03, 0xfabb03, 0x5101ff];
            let color = colors[Math.floor(Math.random() * colors.length)];
            let grainMat = new THREE.MeshStandardMaterial({
                metalness: 0,
                roughness: 1,
                color,
                // displacementMap: bumpMap,
                // normalMap: bumpMap,
                bumpMap: bumpMap,
                bumpScale: 0.1,
                // normalScale: new THREE.Vector2(0.15, 2),
                // map: texture,
                // emissive: 0xffffff,
                // emissiveIntensity: 0.5,
                // envMap: this._envMap.texture,
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
    // loadEnvMap() {
    //     return new Promise((resolve) => {
    //         let envmaploader = new THREE.PMREMGenerator(this._renderer);
    //         new RGBELoader()
    //             .setPath(`${__SSugarConfig.get('serve.img.path')}/3d/`)
    //             .load('HDRI_STUDIO_vol2_030.hdr', function (hdrmap) {
    //                 let envmap = envmaploader.fromCubemap(hdrmap);
    //                 resolve(envmap);
    //             });
    //     });
    // }
    animate() {
        var _a, _b;
        if (!this.utils.isInViewport()) {
            setTimeout(() => {
                this.animate();
            }, 100);
            return;
        }
        this._updatePlaneWave(this._planePoints);
        this._updatePlaneWave(this._planePointsLight);
        this._grains.forEach((grainObj) => {
            grainObj.group.rotation.x += grainObj.speed;
            grainObj.group.rotation.y += grainObj.speed;
            grainObj.group.rotation.z += grainObj.speed;
            if (!grainObj.localGroup.lastPositions)
                grainObj.localGroup.lastPositions = [];
            grainObj.grain.traverse((child) => {
                if (child.material) {
                    // console.log(grainObj.color);
                    child.material.color.setHex(`0x${this._colors[grainObj.color].replace('#', '')}`);
                }
            });
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
export function __define(props = {}, tagName = 'ck-blob') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, CKBlob);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxxSEFBcUg7QUFDckgsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEtBQUssQ0FBQztBQUMzQixPQUFPLEtBQUssS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUMvQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDMUUsK0VBQStFO0FBQy9FLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyREFBMkQsQ0FBQztBQUMzRixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sdURBQXVELENBQUM7QUFRbkYsTUFBTSxDQUFDLE9BQU8sT0FBTyxNQUFPLFNBQVEsZUFBZTtJQUMvQyxNQUFNLEtBQUssVUFBVTtRQUNqQixPQUFPLGVBQWUsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO0lBQ3JELENBQUM7SUFFRDs7UUFDSSxLQUFLLENBQUM7WUFDRixTQUFTLEVBQUUsS0FBSztTQUNuQixDQUFDLENBQUM7UUFRUCxZQUFPLEdBQUcsRUFBRSxDQUFDO1FBRWIsV0FBTSxHQUFHLEVBQUUsQ0FBQztRQUNaLGlCQUFZLEdBQUcsRUFBRSxDQUFDO1FBRWxCLFdBQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFFcEIsd0JBQXdCO1FBRXhCLFlBQU8sR0FBRyxNQUFBLFFBQVE7YUFDYixhQUFhLENBQUMsTUFBTSxDQUFDO2FBQ3JCLFlBQVksQ0FBQyxPQUFPLENBQUMsMENBQ3BCLFFBQVEsR0FDVCxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFdEIsb0JBQWUsR0FBRyxFQUFFLENBQUM7UUFFckIsV0FBTSxH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