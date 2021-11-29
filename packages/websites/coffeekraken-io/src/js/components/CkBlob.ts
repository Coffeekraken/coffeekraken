// @ts-nocheck

import __SLitComponent from '@coffeekraken/s-lit-component';
// import { EffectComposer } from './lib/three/examples/jsm/postprocessing/EffectComposer.js';
// import { RenderPass } from './lib/three/examples/jsm/postprocessing/RenderPass.js';
// import { BokehPass } from './lib/three/examples/jsm/postprocessing/BokehPass.js';
// import { ShaderPass } from './lib/three/examples/jsm/postprocessing/ShaderPass';
// import { FXAAShader } from './lib/three/examples/jsm/shaders/FXAAShader';
// import { MTLLoader } from './lib/three/examples/jsm/loaders/MTLLoader.js';
// import { TextureLoader } from './lib/three/examples/jsm/loaders/TextureLoader.js';
import {
    BloomEffect,
    EffectComposer,
    EffectPass,
    DotScreenEffect,
    GodRaysEffect,
    BlendFunction,
    ShockWaveEffect,
    NoiseEffect,
    OutlineEffect,
    GlitchEffect,
    DepthOfFieldEffect,
    PixelationEffect,
    RenderPass,
} from 'postprocessing';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';
import { html } from 'lit';
import * as THREE from 'three';
import __perlin from './lib/perlinNoise';
import { RGBELoader } from './lib/three/examples/jsm/loaders/RGBELoader';
// import { RGBELoader } from './lib/RGBELoader';
import { OBJLoader } from './lib/three/examples/jsm/loaders/OBJLoader.js';
import { Triangle } from 'three/build/three.module';

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
    _grainsGroups = [];

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
        const sphere = await this.createSphere();

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
        this._pointSpheres.forEach((s) => this._scene.add(s));

        // this._scene.add(plane);
        // this._scene.add(helper);

        this.initPostprocessing();

        // this.addControls();

        this.animate();
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
        composer.addPass(
            new EffectPass(
                this._camera,
                new OutlineEffect(this._scene, this._camera),
            ),
        );
        // composer.addPass(
        //     new EffectPass(
        //         this._camera,
        //         new BloomEffect({
        //             intensity: 2,
        //         }),
        //     ),
        // );
        composer.addPass(
            new EffectPass(
                this._camera,
                new GlitchEffect({
                    delay: new THREE.Vector2(5, 15),
                    duration: new THREE.Vector2(0.05, 0.2),
                    ratio: 0.1,
                    strengh: new THREE.Vector2(0.01, 0.02),
                }),
            ),
        );
        // composer.addPass(bokehPass);
        // composer.addPass(fxaaPass);

        this._composer = composer;

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
        this._grainsGroups = [];
        this._grainsGroup = new THREE.Group();

        const yellowMaterial = await this.createGrainMaterial(
            '/src/3d/coffeeGrain/grain-yellow.jpg',
        );

        const purpleMaterial = await this.createGrainMaterial(
            '/src/3d/coffeeGrain/grain-purple.jpg',
        );

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

            group.rotation.set(
                Math.random() * 360,
                Math.random() * 360,
                Math.random() * 360,
            );
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
        this._sphere.receiveShadow = true;
        this._sphere.castShadow = true;

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

        sphere.receiveShadow = true;
        sphere.castShadow = true;

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
                    object.castShadow = true;
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
        this._pointSpheres.forEach((p) => {
            this.updateGeometryOf(p, 8, 0.0001);
            p.geometry.attributes.alpha.needsUpdate = true;
            p.geometry.attributes.position.needsUpdate = true;
            if (!p._speed) p._speed = Math.random() / 1000 / 8;
            p.rotation.x -= p._speed;
            p.rotation.y -= p._speed;
            p.rotation.z -= p._speed;
        });
        // this._sphere.rotation.x += 0.001;
        this._sphere.rotation.y += 0.003;
        // this._sphere.rotation.z += 0.005;

        this._grains.forEach((grain) => {
            if (!grain._speed) grain._speed = 0.003 + Math.random() / 100;
            grain.rotation.x += grain._speed;
            grain.rotation.y += grain._speed;
            grain.rotation.z += grain._speed;
        });
        this._grainsGroups.forEach((group) => {
            if (!group._speed) group._speed = 0.001 + Math.random() / 100 / 2;
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
        this._controls?.update?.();
        // this._postprocessing.composer.render(0.1);
        // this._renderer.render(this._scene, this._camera);
        this._composer.render();
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
