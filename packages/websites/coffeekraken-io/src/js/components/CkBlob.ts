// @ts-nocheck

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
import { html } from 'lit';
import * as THREE from 'three';
// import __perlin from './lib/perlinNoise';
// import { RGBELoader } from './lib/RGBELoader';
import { OBJLoader } from './lib/three/examples/jsm/loaders/OBJLoader.js';
import { RGBELoader } from './lib/three/examples/jsm/loaders/RGBELoader';
import { EffectComposer } from './lib/three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from './lib/three/examples/jsm/postprocessing/RenderPass.js';

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

    // _perlin = __perlin();

    _isDark = document
        .querySelector('html')
        .getAttribute('theme')
        ?.toString()
        .includes('dark');

    _postprocessing = {};

    async firstUpdated() {
        this._scene = new THREE.Scene();
        this._camera = new THREE.PerspectiveCamera(
            30,
            this.offsetWidth / this.offsetHeight,
            1,
            10000,
        );
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
        } else {
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

        // sphere
        const sphere = await this.createSphere();

        // grains
        await this.addGrains();

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
        } else {
            ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
        }

        //Create a helper for the shadow camera (optional)
        const helper = new THREE.CameraHelper(light.shadow.camera);

        // const pointsSphere1 = this.createPointsSphere(
        //     this._isDark ? 0xffffff : 0x000000,
        //     0,
        //     0.1,
        // );
        // pointsSphere1.scale.set(9, 9, 9);
        // const pointsSphere2 = this.createPointsSphere(0x7043ff, 0, 0.3);
        // pointsSphere2.scale.set(7.5, 7.5, 7.5);
        // const pointsSphere3 = this.createPointsSphere(0xffffff, 0, 0.1);
        // pointsSphere3.scale.set(9, 9, 9);

        // this._oceanWaves();

        this._planePoints = this.createPlanePoints(0x212728);

        this._planePointsLight = this.createPlanePoints(0x212728, 1, '6.0');
        this._planePointsLight.rotation.set(Math.PI / 2, 0, Math.PI / 9);

        // this._pointSpheres = [pointsSphere1];

        if (this._isDark) {
        }
        this._scene.add(backLight);
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

                var z =
                    Math.sin(vec3.length() / -waveSize + theTime) * magnitude;

                pos.setZ(i, z);
            }
            pos.needsUpdate = true;
        }

        wavesBuffer(2, 0.8);
    }

    initPostprocessing() {
        const renderPass = new RenderPass(this._scene, this._camera);

        const finalComposer = new EffectComposer(
            this._renderer,
            // this._renderTarget,
        );
        finalComposer.addPass(renderPass);
        // finalComposer.addPass(finalPass);

        // this._bloomComposer = bloomComposer;
        this._finalComposer = finalComposer;
    }

    addControls() {
        this._controls = new OrbitControls(
            this._camera,
            this._renderer.domElement,
        );

        this._controls.autoRotate = true;
        this._controls.autoRotateSpeed = 4;
        this._controls.enableDamping = true;
        this._controls.minPolarAngle = Math.PI / 2;
        this._controls.maxPolarAngle = Math.PI / 2;
        this._controls.enableZoom = false;
        // this._controls.enableDamping = true;
        this._controls.update();
    }
    async addGrains() {
        const grain = await this.loadCoffeeGrain();
        this._grains = [];

        const yellowMaterial = await this.createGrainMaterial(
            `${__SSugarConfig.get(
                'serve.img.url',
            )}/3d/coffeeGrain/grain-yellow.jpg`,
        );

        const purpleMaterial = await this.createGrainMaterial(
            `${__SSugarConfig.get(
                'serve.img.url',
            )}/3d/coffeeGrain/grain-purple.jpg`,
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
            newGrain.castShadow = true;
            // newGrain.receiveShadow = true;

            let scale = 0.2 + Math.random();
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
            texture = await this.loadTexture(
                `${__SSugarConfig.get('serve.img.url')}/3d/ck-texture.jpg`,
            );
            matSettings = {
                metalness: 0,
                roughness: 0.6,
                color: 0xffffff,
            };
        } else {
            texture = await this.loadTexture(
                `${__SSugarConfig.get(
                    'serve.img.url',
                )}/3d/ck-texture-light.jpg`,
            );
            matSettings = {
                // refractionRatio: 0.2,
                // flatShading: true,
                // emissiveIntensity: 1,
                metalness: 0,
                roughness: 0.6,
                color: 0xffffff,
            };
        }
        const ballMaterial = {
            ...matSettings,
            map: texture,
            // envMap: this._envMap.texture,
        };

        const ballMat = new THREE.MeshStandardMaterial(ballMaterial);
        const geom = new THREE.SphereGeometry(1, 64, 64);

        this._sphere = new THREE.Mesh(geom, ballMat);
        this._sphere.castShadow = true;
        this._sphere.scale.set(4, 4, 4);

        return this._sphere;
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
        }`,
            fragmentShader = `uniform vec3 color;
        varying float vAlpha;

        void main() {
        gl_FragColor = vec4( color, vAlpha );
        }`;

        plane.geometry.setAttribute(
            'alpha',
            new THREE.BufferAttribute(alphas, 1),
        );
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
        return new Promise(async (resolve) => {
            const texture = await this.loadTexture(texturePath);
            const bumpMap = await this.loadTexture(
                `${__SSugarConfig.get(
                    'serve.img.url',
                )}/3d/coffeeGrain/coffeeGrainBumpMap.jpg`,
            );

            let grainMat = new THREE.MeshStandardMaterial({
                metalness: 0,
                roughness: 1,
                color: 0xffffff,
                // displacementMap: bumpMap,
                // normalMap: bumpMap,
                bumpMap: bumpMap,
                bumpScale: 0.1,
                // normalScale: new THREE.Vector2(0.15, 2),
                map: texture,
                // emissive: 0xffffff,
                // emissiveIntensity: 0.5,
                // envMap: this._envMap.texture,
            });

            resolve(grainMat);
        });
    }
    loadCoffeeGrain() {
        return new Promise((resolve) => {
            new OBJLoader().load(
                `${__SSugarConfig.get(
                    'serve.img.url',
                )}/3d/coffeeGrain/coffeeGrain.obj`,
                (object) => {
                    object.castShadow = true;
                    object.scale.set(0.01, 0.01, 0.01);
                    object.position.set(0, 0, 0);

                    resolve(object);
                },
            );
        });
    }
    // updateGeometryOf(object, k = 0.6, amount = 0.0005) {
    //     if (object._object) object = object._object;

    //     var time = performance.now() * amount;
    //     var positions = object.geometry.attributes.position.array;
    //     for (var i = 0; i < positions.length; i += 3) {
    //         const v = new THREE.Vector3(
    //             positions[i],
    //             positions[i + 1],
    //             positions[i + 2],
    //         );

    //         v.normalize().multiplyScalar(
    //             1 +
    //                 100 *
    //                     this._perlin.perlin3(v.x * k + time, v.y * k, v.z * k),
    //         );

    //         positions[i] = v.x;
    //         positions[i + 1] = v.y;
    //         positions[i + 2] = v.z;
    //     }

    //     object.geometry.computeVertexNormals();
    //     object.geometry.normalsNeedUpdate = true;
    //     object.geometry.verticesNeedUpdate = true;
    // }
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
        this._controls?.update?.();
        // this._postprocessing.composer.render(0.1);
        // this._renderer.render(this._scene, this._camera);
        // this.renderBloom(true);
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
