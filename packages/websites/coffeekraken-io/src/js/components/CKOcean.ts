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
import * as THREE from 'three';
import { html } from 'lit';
import __perlin from './lib/perlinNoise';
// import { RGBELoader } from './lib/RGBELoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';

interface IFlyingCoffee {
    grain: any;
    trail: any[];
    group: any;
}

export default class CKOcean extends __SLitComponent {
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
        this._renderer.shadowMap.type = THREE.PCFSoftShadowMap
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
        const planeMaterial = new THREE.MeshBasicMaterial({
            // opacity: this._isDark ? .2 : .05,
            opacity: 1,
            color: 0xff0000
        });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        // plane.receiveShadow = true;
        plane.position.set(0, -12, 0);
        plane.rotation.x = (Math.PI / 2) * -1;
        this._plane = plane;

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

        this._oceanWaves();

        this._pointSpheres = [pointsSphere1];

        if (this._isDark) {
            this._scene.add(backLight);
        }
        this._scene.add(light);
        this._scene.add(ambientLight);
        // this._scene.add(sphere);
        // this._pointSpheres.forEach((s) => this._scene.add(s));

        // this._scene.add(plane);
        // this._scene.add(helper);

        this.initPostprocessing();

        this.addControls();

        setInterval(() => {
            this._scene.updateMatrixWorld();
        }, 50);

        // this._scene.traverse( function( child ) { 
        //     if ( child.isMesh ) {
        //         child.castShadow = true;
        //         child.receiveShadow = true;
        //     }
        // });


        this.animate();
    }

    _oceanWaves() {
        this._tuniform = {
            time: {
                type: 'f',
                value: 0.1
            },
            resolution: {
                type: 'v2',
                value: new THREE.Vector2()
            },
            mouse: {
                type: 'v4',
                value: new THREE.Vector2()
            }
        };

        const vertexShader = `void main() {
    gl_Position = vec4( position, 1.0 );
}`.trim(), fragmentShader = `#ifdef GL_ES
                precision mediump float;
                #endif

                uniform float time;
                uniform vec2 mouse;
                uniform vec2 resolution;
                varying vec2 surfacePosition;

                const int NUM_STEPS = 8;
                const float PI      = 3.1415;
                const float EPSILON = 1e-3;
                const float EPSILON_NRM   = 0.1 / 1024.0;

                // sea
                const int ITER_GEOMETRY = 3;
                const int ITER_FRAGMENT = 5;
                const float SEA_HEIGHT = 0.7;
                const float SEA_CHOPPY = 1.5;
                const float SEA_SPEED = 0.8;
                const float SEA_FREQ = 0.2;
                const vec3 SEA_BASE = vec3(0.15,0.18,0.2);
                const vec3 SEA_WATER_COLOR = vec3(0.0,0.0,0.0);
                const float SKY_INTENSITY = 0.1;

                #define SEA_TIME time * SEA_SPEED

                // math
                mat4 fromEuler(vec3 ang) {
                  vec2 a1 = vec2(sin(ang.x),cos(ang.x));
                    vec2 a2 = vec2(sin(ang.y),cos(ang.y));
                    vec2 a3 = vec2(sin(ang.z),cos(ang.z));
                    mat4 m;
                    m[0] = vec4(a1.y*a3.y+a1.x*a2.x*a3.x,a1.y*a2.x*a3.x+a3.y*a1.x,-a2.y*a3.x,0.0);
                	m[1] = vec4(-a2.y*a1.x,a1.y*a2.y,a2.x,0.0);
                	m[2] = vec4(a3.y*a1.x*a2.x+a1.y*a3.x,a1.x*a3.x-a1.y*a3.y*a2.x,a2.y*a3.y,0.0);
                	m[3] = vec4(0.0,0.0,0.0,1.0);
                	return m;
                }
                vec3 rotate(vec3 v, mat4 m) {
                    return vec3(dot(v,m[0].xyz),dot(v,m[1].xyz),dot(v,m[2].xyz));
                }
                float hash( vec2 p ) {
                    float h = dot(p,vec2(127.1,311.7));	
                    return fract(sin(h)*43758.5453123);
                }
                float noise( in vec2 p ) {
                    vec2 i = floor( p );
                    vec2 f = fract( p );	
                    vec2 u = f*f*(3.0-2.0*f);
                    return -1.0+2.0*mix( mix( hash( i + vec2(0.0,0.0) ), 
                                     hash( i + vec2(1.0,0.0) ), u.x),
                                mix( hash( i + vec2(0.0,1.0) ), 
                                     hash( i + vec2(1.0,1.0) ), u.x), u.y);
                }


                // lighting
                float diffuse(vec3 n,vec3 l,float p) { return pow(dot(n,l) * 0.4 + 0.6,p); }
                float specular(vec3 n,vec3 l,vec3 e,float s) {    
                    float nrm = (s + 8.0) / (3.1415 * 8.0);
                    return pow(max(dot(reflect(e,n),l),0.0),s) * nrm;
                }

                // sky
                vec3 sky_color(vec3 e) {
                    e.y = max(e.y,0.0);
                    vec3 ret;
                    ret.x = pow(1.0-e.y,2.0);
                    ret.y = 1.0-e.y;
                    ret.z = 0.6+(1.0-e.y)*0.4;
                    return ret * SKY_INTENSITY;
                }

                // sea
                float sea_octave(vec2 uv, float choppy) {
                    uv += noise(uv);        
                    vec2 wv = 1.0-abs(sin(uv));
                    vec2 swv = abs(cos(uv));    
                    wv = mix(wv,swv,wv);
                    return pow(1.0-pow(wv.x * wv.y,0.65),choppy);
                }

                float map(vec3 p) {
                    float freq = SEA_FREQ;
                    float amp = SEA_HEIGHT;
                    float choppy = SEA_CHOPPY;
                    vec2 uv = p.xz; uv.x *= 0.75;
                    mat2 m = mat2(1.6,1.2,-1.2,1.6);
                    
                    float d, h = 0.0;    
                    for(int i = 0; i < ITER_GEOMETRY; i++) {        
                    	d = sea_octave((uv+SEA_TIME)*freq,choppy);
                    	d += sea_octave((uv-SEA_TIME)*freq,choppy);
                        h += d * amp;        
                    	uv *= m; freq *= 1.9; amp *= 0.22;
                        choppy = mix(choppy,1.0,0.2);
                    }
                    return p.y - h;
                }
                float map_detailed(vec3 p) {
                    float freq = SEA_FREQ;
                    float amp = SEA_HEIGHT;
                    float choppy = SEA_CHOPPY;
                    vec2 uv = p.xz; uv.x *= 0.75;
                    mat2 m = mat2(1.6,1.2,-1.2,1.6);
                    
                    float d, h = 0.0;    
                    for(int i = 0; i < ITER_FRAGMENT; i++) {        
                    	d = sea_octave((uv+SEA_TIME)*freq,choppy);
                    	d += sea_octave((uv-SEA_TIME)*freq,choppy);
                        h += d * amp;        
                    	uv *= m; freq *= 1.9; amp *= 0.22;
                        choppy = mix(choppy,1.0,0.2);
                    }
                    return p.y - h;
                }

                vec3 sea_color(in vec3 p, in vec3 n, in vec3 eye, in vec3 dist) {  
                    float fresnel_o = 1.0 - max(dot(n,-eye),0.0);
                    float fresnel = pow(fresnel_o,3.0) * 0.65;
                        
                    // reflection
                    vec3 refl = sky_color(reflect(eye,n));
                    
                    // color
                    vec3 ret = SEA_BASE;    
                    ret = mix(ret,refl,fresnel);
                    
                    // wave peaks    
                    float atten = max(1.0 - dot(dist,dist) * 0.001, 0.0);
                    ret += SEA_WATER_COLOR * (p.y - SEA_HEIGHT) * 0.18 * atten;
                    
                    return ret;
                }

                // tracing
                vec3 getNormal(vec3 p, float eps) {
                    vec3 n;
                    n.y = map_detailed(p);    
                    n.x = map_detailed(vec3(p.x+eps,p.y,p.z)) - n.y;
                    n.z = map_detailed(vec3(p.x,p.y,p.z+eps)) - n.y;
                    n.y = eps;
                    return normalize(n);
                }
                float hftracing(vec3 ori, vec3 dir, out vec3 p) {  
                    float tm = 0.0;
                    float tx = 1000.0;    
                    float hx = map(ori + dir * tx);
                    if(hx > 0.0) return tx;   
                    float hm = map(ori + dir * tm);    
                    float tmid = 0.0;
                    for(int i = 0; i < NUM_STEPS; i++) {
                        tmid = mix(tm,tx, hm/(hm-hx));                   
                        p = ori + dir * tmid;                   
                    	float hmid = map(p);
                	if(hmid < 0.0) {
                            tx = tmid;
                            hx = hmid;
                        } else {
                            tm = tmid;
                            hm = hmid;
                        }
                    }
                    return tmid;
                }

                // main
                void main(void) 
                {
                  vec2 uv = gl_FragCoord.xy / resolution.xy;
                  uv = 1.0 - uv * 2.0;
                  uv.x *= resolution.x / resolution.y;   
                  //uv = (surfacePosition+vec2(0., .5))*17. + 5E-3*(pow(length(surfacePosition+vec2(0. ,0.5)), -2.));
                  uv.y *= -1.;
                  //uv.y += -2.;
                        
                  // ray
                  vec3 ang = vec3(0.0,0.003, pow(time, 0.6));
                  ang = vec3(0.0,clamp(2.0-mouse.y*0.01,-0.3,PI),mouse.x*0.01);
                  
                  vec3 ori = vec3(0.0,3.5,time*.05);
                  vec3 dir = normalize(vec3(uv.xy,-2.0));
                  dir.z -= length(uv) * 0.15;
                  //dir = rotate(normalize(dir),ang);
                  
                  // tracing
                  vec3 p;
                  float dens = hftracing(ori,dir,p);
                  vec3 dist = p - ori;
                  vec3 n = getNormal(p, dot(dist,dist)*EPSILON_NRM);
                  
                  // color
                  vec3 color = sea_color(p,n,dir,dist);
                  vec3 light = normalize(vec3(0.0,1.0,0.8));  
                  color += vec3(diffuse(n,light,80.0) * SEA_WATER_COLOR) * 0.12; 
                  color += vec3(specular(n,light,dir,60.0));  
                  
                  // post
                  color = mix(sky_color(dir),color,pow(smoothstep(0.0,-0.05,dir.y),0.3)); 
                  color = pow(color,vec3(0.75));
                  gl_FragColor = vec4(color,1.0);
                }`.trim();

        this._tuniform.resolution.value.x = window.innerWidth;
        this._tuniform.resolution.value.y = window.innerHeight;
        // Create Plane
        var material = new THREE.ShaderMaterial({
            uniforms: this._tuniform,
            vertexShader,
            fragmentShader
        });
        var mesh = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(window.innerWidth, window.innerHeight, 40), material
        );
        this._scene.add(mesh);

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
            `${__SSugarConfig.get('serve.img.url')}/3d/coffeeGrain/grain-yellow.jpg`
        );

        const purpleMaterial = await this.createGrainMaterial(
            `${__SSugarConfig.get('serve.img.url')}/3d/coffeeGrain/grain-purple.jpg`
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
            texture = await this.loadTexture(`${__SSugarConfig.get('serve.img.url')}/3d/ck-texture.jpg`);
            matSettings = {
                metalness: 0,
                roughness: 0.6,
                color: 0xffffff,
            };
        } else {
            texture = await this.loadTexture(`${__SSugarConfig.get('serve.img.url')}/3d/ck-texture-light.jpg`);
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
            envMap: this._envMap.texture,
        };

        const ballMat = new THREE.MeshStandardMaterial(ballMaterial);
        const geom = new THREE.SphereGeometry(1, 64, 64);

        this._sphere = new THREE.Mesh(geom, ballMat);
        this._sphere.castShadow = true;
        this._sphere.scale.set(4, 4, 4);

        return this._sphere;
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
        });
    }
    loadCoffeeGrain() {
        return new Promise((resolve) => {
            new OBJLoader().load(
                `${__SSugarConfig.get('serve.img.url')}/3d/coffeeGrain/coffeeGrain.obj`,
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
                    100 *
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

        // this.updateGeometryOf(this._plane, 1.4);
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

        this._tuniform.time.value += 0.05;

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

export function define(props: any = {}, tagName = 'ck-ocean') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, CKOcean);
}
