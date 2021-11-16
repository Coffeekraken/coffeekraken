// @ts-nocheck

import __SLitComponent from '@coffeekraken/s-lit-component';
import { html } from 'lit';
import __filterObject from '@coffeekraken/sugar/shared/object/filter';
import __wait from '@coffeekraken/sugar/shared/time/wait';
import __noisify from './lib/noisify';
import { Simplex2 } from 'tumult';

import * as THREE from 'three/build/three';

import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';

import { ImprovedNoise } from './lib/ImprovedNoise';
import { FlakesTexture } from './lib/FlakesTexture';
import { RGBELoader } from './lib/RGBELoader';
import Perlin from './lib/perlinNoise';

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

    _start = Date.now();

    async firstUpdated() {
        this._scene = new THREE.Scene();
        this._camera = new THREE.PerspectiveCamera(
            30,
            this.offsetWidth / this.offsetHeight,
            1,
            10000,
        );
        this._camera.position.z = 100;

        this._renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
        });
        this._renderer.setSize(this.offsetWidth, this.offsetHeight);
        this._renderer.setPixelRatio(window.devicePixelRatio);
        this.querySelector('.ck-blob').appendChild(this._renderer.domElement);

        this._renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this._renderer.toneMappingExposure = 1;

        this._geometry = new THREE.SphereGeometry(20, 64, 64);

        let texture = new THREE.CanvasTexture(new FlakesTexture());
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        //repeat the wrapping 10 (x) and 6 (y) times
        texture.repeat.x = 10;
        texture.repeat.y = 6;

        const envmap = await this.loadEnvMap();

        this.perlin();

        const BumpMapTexture = new THREE.Texture(this._bumpMapCanvas);

        this._ballMaterial = {
            clearcoat: 1.0,
            cleacoatRoughness: 0.1,
            metalness: 0.9,
            roughness: 0.5,
            color: 0xf2bc2b,
            normalMap: texture,
            normalScale: new THREE.Vector2(0.15, 0.15),
            envMap: envmap.texture,
        };
        this._ballMaterial.displacementMap = BumpMapTexture;
        this._ballMaterial.displacementScale = 10;
        this._ballMaterial.displacementBias = -10;
        this._ballMaterial.displacementMap.needsUpdate = true;

        let ballMat = new THREE.MeshPhysicalMaterial(this._ballMaterial);

        this._sphere = new THREE.Mesh(this._geometry, ballMat);
        this._scene.add(this._sphere);

        this._controls = new OrbitControls(
            this._camera,
            this._renderer.domElement,
        );

        this._controls.autoRotate = true;
        this._controls.autoRotateSpeed = 0.5;
        this._controls.enableDamping = true;

        this._perlin = Perlin();

        this._controls.update();
        this.animate();
    }
    perlin() {
        this._bumpMapCanvas = this.querySelector('.blob-perlin');
    }
    loadEnvMap() {
        return new Promise((resolve) => {
            let envmaploader = new THREE.PMREMGenerator(this._renderer);
            new RGBELoader()
                .setPath('/src/img/hdr/')
                .load('studio_small_04_4k.hdr', function (hdrmap) {
                    let envmap = envmaploader.fromCubemap(hdrmap);
                    resolve(envmap);
                });
        });
    }
    animate() {
        // change '0.003' for more aggressive animation
        var time = performance.now() * 0.003;
        //console.log(time)

        //go through vertices here and reposition them

        // change 'k' value for more spikes
        var k = 1000;
        var vertices = this._sphere.geometry.attributes.position.array;
        for (var i = 0; i < vertices.length; i += 3) {
            // var p = vertices[i];

            const p = new THREE.Vector3(
                vertices[i],
                vertices[i + 1],
                vertices[i + 2],
            );

            p.normalize().multiplyScalar(
                1 + 0.3 * this._perlin.get3d(p.x * k + time, p.y * k, p.z * k),
            );

            if (p[0] !== NaN) vertices[i] = p[0];
            if (p[1] !== NaN) vertices[i + 1] = p[1];
            if (p[2] !== NaN) vertices[i + 2] = p[2];
        }
        this._sphere.geometry.computeVertexNormals();
        this._sphere.geometry.normalsNeedUpdate = true;
        this._sphere.geometry.verticesNeedUpdate = true;

        this._ballMaterial.displacementMap.needsUpdate = true;
        requestAnimationFrame(this.animate.bind(this));
        this._controls.update();
        this._renderer.render(this._scene, this._camera);
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
