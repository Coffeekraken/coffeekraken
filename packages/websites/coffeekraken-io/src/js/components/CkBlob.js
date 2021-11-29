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
import { EffectComposer, EffectPass, OutlineEffect, GlitchEffect, RenderPass, } from 'postprocessing';
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
        this._grainsGroups = [];
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
            this._renderer = new THREE.WebGLRenderer({
                minFilter: THREE.LinearFilter,
                magFilter: THREE.LinearFilter,
                format: THREE.RGBAFormat,
                // stencilBuffer: false,
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
            light.castShadow = false; // default false
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
            this._pointSpheres.forEach((s) => this._scene.add(s));
            // this._scene.add(plane);
            // this._scene.add(helper);
            this.initPostprocessing();
            // this.addControls();
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
        // composer.addPass(
        //     new EffectPass(
        //         this._camera,
        //         new DepthOfFieldEffect(this._camera, {
        //             focusDistance: 0.4,
        //             focalLength: 0.1,
        //             bokehScale: 1,
        //         }),
        //     ),
        // );
        composer.addPass(new EffectPass(this._camera, new OutlineEffect(this._scene, this._camera)));
        // composer.addPass(
        //     new EffectPass(
        //         this._camera,
        //         new BloomEffect({
        //             intensity: 2,
        //         }),
        //     ),
        // );
        composer.addPass(new EffectPass(this._camera, new GlitchEffect({
            delay: new THREE.Vector2(5, 15),
            duration: new THREE.Vector2(0.05, 0.2),
            ratio: 0.1,
            strengh: new THREE.Vector2(0.01, 0.02),
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
            this._grainsGroups = [];
            this._grainsGroup = new THREE.Group();
            const yellowMaterial = yield this.createGrainMaterial('/src/3d/coffeeGrain/grain-yellow.jpg');
            const purpleMaterial = yield this.createGrainMaterial('/src/3d/coffeeGrain/grain-purple.jpg');
            const materials = [yellowMaterial, purpleMaterial];
            const count = 12;
            for (let i = 0; i < count; i++) {
                const newGrain = grain.clone();
                newGrain.position.set(0, 0, -0.3);
                newGrain.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                        child.material = materials[i <= count / 2 ? 0 : 1];
                    }
                });
                // const ballMat = new THREE.ShadowMaterial({
                //     opacity: 0.5,
                // });
                // const geom = new THREE.SphereGeometry(1, 32, 32);
                // const sphere = new THREE.Mesh(geom, ballMat);
                // sphere.scale.set(0.5, 0.5, 0.25);
                // sphere.receiveShadow = true;
                // sphere.castShadow = true;
                const group = new THREE.Group();
                // group.add(sphere);
                group.add(newGrain);
                group.rotation.set(Math.random() * 360, Math.random() * 360, Math.random() * 360);
                newGrain.position.x = 7 + Math.random() * 4;
                // newGrain.position.x = 9;
                // sphere.position.x = newGrain.position.x;
                // group.position.set(0, 5, 0);πwelcome
                // let scaleAddition = -1 + Math.random() * 2;
                // newGrain.scale.x = scaleAddition;
                // newGrain.scale.y = scaleAddition;
                // newGrain.scale.z = scaleAddition;
                const scale = 0.005 + (Math.random() / 100) * 2;
                newGrain.scale.set(scale, scale, scale);
                newGrain.castShadow = true;
                // group.receiveShadow = true;
                this._grains.push(newGrain);
                this._grainsGroups.push(group);
                this._scene.add(group);
                // this._grainsGroup.add(group);
            }
            return this._grainsGroup;
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
            this._sphere.receiveShadow = true;
            this._sphere.castShadow = true;
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
            sphere.receiveShadow = true;
            sphere.castShadow = true;
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
        this._pointSpheres.forEach((p) => {
            this.updateGeometryOf(p, 8, 0.0001);
            p.geometry.attributes.alpha.needsUpdate = true;
            p.geometry.attributes.position.needsUpdate = true;
            if (!p._speed)
                p._speed = Math.random() / 1000 / 8;
            p.rotation.x -= p._speed;
            p.rotation.y -= p._speed;
            p.rotation.z -= p._speed;
        });
        // this._sphere.rotation.x += 0.001;
        this._sphere.rotation.y += 0.003;
        // this._sphere.rotation.z += 0.005;
        this._grains.forEach((grain) => {
            if (!grain._speed)
                grain._speed = 0.003 + Math.random() / 100;
            grain.rotation.x += grain._speed;
            grain.rotation.y += grain._speed;
            grain.rotation.z += grain._speed;
        });
        this._grainsGroups.forEach((group) => {
            if (!group._speed)
                group._speed = 0.001 + Math.random() / 100 / 2;
            group.rotation.x += group._speed;
            group.rotation.y += group._speed;
            group.rotation.z += group._speed;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2tCbG9iLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQ2tCbG9iLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCw4RkFBOEY7QUFDOUYsc0ZBQXNGO0FBQ3RGLG9GQUFvRjtBQUNwRixtRkFBbUY7QUFDbkYsNEVBQTRFO0FBQzVFLDZFQUE2RTtBQUM3RSxxRkFBcUY7QUFDckYsT0FBTyxFQUVILGNBQWMsRUFDZCxVQUFVLEVBTVYsYUFBYSxFQUNiLFlBQVksRUFHWixVQUFVLEdBQ2IsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUZBQW1GLENBQUM7QUFDbEgsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEtBQUssQ0FBQztBQUMzQixPQUFPLEtBQUssS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUMvQixPQUFPLFFBQVEsTUFBTSxtQkFBbUIsQ0FBQztBQUN6QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDekUsaURBQWlEO0FBQ2pELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUcxRSxNQUFNLENBQUMsT0FBTyxPQUFPLE1BQU8sU0FBUSxlQUFlO0lBQy9DOztRQUNJLEtBQUssQ0FBQztZQUNGLFlBQVksRUFBRTtnQkFDVixTQUFTLEVBQUUsS0FBSzthQUNuQjtTQUNKLENBQUMsQ0FBQztRQVFQLFlBQU8sR0FBRyxFQUFFLENBQUM7UUFDYixrQkFBYSxHQUFHLEVBQUUsQ0FBQztRQUVuQixXQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ1osaUJBQVksR0FBRyxFQUFFLENBQUM7UUFFbEIsV0FBTSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUVwQixZQUFPLEdBQUcsUUFBUSxFQUFFLENBQUM7UUFFckIsWUFBTyxHQUFHLE1BQUEsUUFBUSxDQUFDLElB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