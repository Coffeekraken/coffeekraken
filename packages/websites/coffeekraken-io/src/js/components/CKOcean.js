var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var CKOcean_exports = {};
__export(CKOcean_exports, {
  default: () => CKOcean,
  define: () => define
});
module.exports = __toCommonJS(CKOcean_exports);
var import_s_lit_component = __toESM(require("@coffeekraken/s-lit-component"), 1);
var import_s_sugar_config = __toESM(require("@coffeekraken/s-sugar-config"), 1);
var import_OrbitControls = require("https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js");
var THREE = __toESM(require("three"), 1);
var import_lit = require("lit");
var import_perlinNoise = __toESM(require("./lib/perlinNoise"), 1);
var import_OBJLoader = require("three/examples/jsm/loaders/OBJLoader");
var import_RGBELoader = require("three/examples/jsm/loaders/RGBELoader");
var import_EffectComposer = require("three/examples/jsm/postprocessing/EffectComposer");
var import_RenderPass = require("three/examples/jsm/postprocessing/RenderPass");
var _a;
class CKOcean extends import_s_lit_component.default {
  constructor() {
    super({
      litComponent: {
        shadowDom: false
      }
    });
    this._grains = [];
    this._icons = [];
    this._iconsGroups = [];
    this._start = Date.now();
    this._perlin = (0, import_perlinNoise.default)();
    this._isDark = (_a = document.body.getAttribute("class")) == null ? void 0 : _a.toString().includes("-dark");
    this._postprocessing = {};
  }
  async firstUpdated() {
    this._scene = new THREE.Scene();
    this._camera = new THREE.PerspectiveCamera(30, this.offsetWidth / this.offsetHeight, 1, 1e4);
    this._camera.position.z = 60;
    this.ENTIRE_SCENE = 0;
    this.BLOOM_SCENE = 1;
    this._materialsByObj = {};
    this._darkMaterial = new THREE.MeshBasicMaterial({ color: "black" });
    var width = this.offsetWidth || 1;
    var height = this.offsetHeight || 1;
    var parameters = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      alpha: true,
      antialias: true
    };
    this._renderTarget = new THREE.WebGLRenderTarget(width, height, parameters);
    this._renderer = new THREE.WebGLRenderer(__spreadValues({}, parameters));
    this._renderer.setSize(this.offsetWidth, this.offsetHeight);
    this._renderer.setPixelRatio(window.devicePixelRatio);
    this._renderer.setRenderTarget(this._renderTarget);
    this._renderer.shadowMap.enabled = true;
    this._renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.querySelector(".ck-blob").appendChild(this._renderer.domElement);
    this._envMap = await this.loadEnvMap();
    let backLight;
    if (this._isDark) {
      backLight = new THREE.PointLight(16777215, 0.5);
      backLight.position.set(8, 8, -10);
    } else {
      backLight = new THREE.PointLight(16777215, 2);
      backLight.position.set(8, 8, -10);
    }
    const light = new THREE.DirectionalLight(16763927, 0.1, 100);
    light.position.set(0, 40, 0);
    light.castShadow = true;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 500;
    light.shadow.camera.left = -50;
    light.shadow.camera.right = 50;
    light.shadow.camera.top = 50;
    light.shadow.camera.bottom = -50;
    const sphere = await this.createSphere();
    await this.addGrains();
    const planeGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
    const planeMaterial = new THREE.MeshBasicMaterial({
      opacity: 1,
      color: 16711680
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.set(0, -12, 0);
    plane.rotation.x = Math.PI / 2 * -1;
    this._plane = plane;
    var ambientLight;
    if (this._isDark) {
      ambientLight = new THREE.AmbientLight(16777215, 0.3);
    } else {
      ambientLight = new THREE.AmbientLight(16777215, 0.3);
    }
    const helper = new THREE.CameraHelper(light.shadow.camera);
    const pointsSphere1 = this.createPointsSphere(this._isDark ? 16777215 : 0, 0, 0.1);
    pointsSphere1.scale.set(9, 9, 9);
    this._oceanWaves();
    this._pointSpheres = [pointsSphere1];
    if (this._isDark) {
      this._scene.add(backLight);
    }
    this._scene.add(light);
    this._scene.add(ambientLight);
    this.initPostprocessing();
    this.addControls();
    setInterval(() => {
      this._scene.updateMatrixWorld();
    }, 50);
    this.animate();
  }
  _oceanWaves() {
    this._tuniform = {
      time: {
        type: "f",
        value: 0.1
      },
      resolution: {
        type: "v2",
        value: new THREE.Vector2()
      },
      mouse: {
        type: "v4",
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
    var material = new THREE.ShaderMaterial({
      uniforms: this._tuniform,
      vertexShader,
      fragmentShader
    });
    var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(window.innerWidth, window.innerHeight, 40), material);
    this._scene.add(mesh);
  }
  initPostprocessing() {
    const renderPass = new import_RenderPass.RenderPass(this._scene, this._camera);
    const finalComposer = new import_EffectComposer.EffectComposer(this._renderer);
    finalComposer.addPass(renderPass);
    this._finalComposer = finalComposer;
  }
  addControls() {
    this._controls = new import_OrbitControls.OrbitControls(this._camera, this._renderer.domElement);
    this._controls.autoRotate = true;
    this._controls.autoRotateSpeed = 4;
    this._controls.enableDamping = true;
    this._controls.minPolarAngle = Math.PI / 2;
    this._controls.maxPolarAngle = Math.PI / 2;
    this._controls.enableZoom = false;
    this._controls.update();
  }
  async addGrains() {
    const grain = await this.loadCoffeeGrain();
    this._grains = [];
    const yellowMaterial = await this.createGrainMaterial(`${import_s_sugar_config.default.get("serve.img.url")}/3d/coffeeGrain/grain-yellow.jpg`);
    const purpleMaterial = await this.createGrainMaterial(`${import_s_sugar_config.default.get("serve.img.url")}/3d/coffeeGrain/grain-purple.jpg`);
    const materials = [yellowMaterial, purpleMaterial];
    const colors = [16431875, 16431875, 5308927];
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
      let scale = 0.2 + Math.random() - 0.2;
      newGrain.traverse(function(child) {
        if (child instanceof THREE.Mesh) {
          child.material = material;
        }
      });
      const localGroup = new THREE.Group();
      localGroup.scale.set(scale, scale, scale);
      localGroup.add(newGrain);
      const group = new THREE.Group();
      group.add(localGroup);
      const speed = 3e-3 + Math.random() / 100 / 2;
      const grainObj = {
        grain: newGrain,
        group,
        scale,
        speed,
        color,
        trailLength: 15 + Math.round(Math.random() * 20),
        localGroup,
        trail: []
      };
      group.rotation.set(Math.random() * 360, Math.random() * 360, Math.random() * 360);
      localGroup.position.x = 7 + Math.random() * 4;
      this._grains.push(grainObj);
      this._scene.add(group);
    }
  }
  async createSphere() {
    let texture;
    let matSettings;
    if (this._isDark) {
      texture = await this.loadTexture(`${import_s_sugar_config.default.get("serve.img.url")}/3d/ck-texture.jpg`);
      matSettings = {
        metalness: 0,
        roughness: 0.6,
        color: 16777215
      };
    } else {
      texture = await this.loadTexture(`${import_s_sugar_config.default.get("serve.img.url")}/3d/ck-texture-light.jpg`);
      matSettings = {
        metalness: 0,
        roughness: 0.6,
        color: 16777215
      };
    }
    const ballMaterial = __spreadProps(__spreadValues({}, matSettings), {
      map: texture,
      envMap: this._envMap.texture
    });
    const ballMat = new THREE.MeshStandardMaterial(ballMaterial);
    const geom = new THREE.SphereGeometry(1, 64, 64);
    this._sphere = new THREE.Mesh(geom, ballMat);
    this._sphere.castShadow = true;
    this._sphere.scale.set(4, 4, 4);
    return this._sphere;
  }
  createPointsSphere(color, minAlpha = 0, maxAlpha = 1) {
    const numVertices = this._sphere.geometry.attributes.position.count;
    var alphas = new Float32Array(numVertices * 1);
    for (var i = 0; i < numVertices; i++) {
      alphas[i] = minAlpha / (this._isDark ? 2 : 5) + Math.random() * maxAlpha / (this._isDark ? 2 : 5);
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
      color: this._isDark ? 16777215 : 0
    });
    const geom = new THREE.SphereGeometry(1, 32, 32);
    const sphere = new THREE.Mesh(geom, ballMat);
    sphere.geometry.setAttribute("alpha", new THREE.BufferAttribute(alphas, 1));
    var shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(color) }
      },
      vertexShader,
      fragmentShader,
      transparent: true
    });
    const cloud = new THREE.Points(sphere.geometry, shaderMaterial);
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
      let grainMat = new THREE.MeshStandardMaterial({
        metalness: 0,
        roughness: 1,
        color: 16777215,
        map: texture,
        envMap: this._envMap.texture
      });
      resolve(grainMat);
    });
  }
  loadCoffeeGrain() {
    return new Promise((resolve) => {
      new import_OBJLoader.OBJLoader().load(`${import_s_sugar_config.default.get("serve.img.url")}/3d/coffeeGrain/coffeeGrain.obj`, (object) => {
        object.castShadow = true;
        object.scale.set(0.01, 0.01, 0.01);
        object.position.set(0, 0, 0);
        resolve(object);
      });
    });
  }
  updateGeometryOf(object, k = 0.6, amount = 5e-4) {
    if (object._object)
      object = object._object;
    var time = performance.now() * amount;
    var positions = object.geometry.attributes.position.array;
    for (var i = 0; i < positions.length; i += 3) {
      const v = new THREE.Vector3(positions[i], positions[i + 1], positions[i + 2]);
      v.normalize().multiplyScalar(1 + 100 * this._perlin.perlin3(v.x * k + time, v.y * k, v.z * k));
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
      new import_RGBELoader.RGBELoader().setPath(`${import_s_sugar_config.default.get("serve.img.url")}/3d/`).load("HDRI_STUDIO_vol2_030.hdr", function(hdrmap) {
        let envmap = envmaploader.fromCubemap(hdrmap);
        resolve(envmap);
      });
    });
  }
  animate() {
    var _a2, _b;
    if (!this.componentUtils.isInViewport()) {
      setTimeout(() => {
        this.animate();
      }, 100);
      return;
    }
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
    });
    this._tuniform.time.value += 0.05;
    requestAnimationFrame(this.animate.bind(this));
    (_b = (_a2 = this._controls) == null ? void 0 : _a2.update) == null ? void 0 : _b.call(_a2);
    this._finalComposer.render();
  }
  render() {
    return import_lit.html`
            <div class="ck-blob">
                <canvas class="blob-perlin"></canvas>
            </div>
        `;
  }
}
function define(props = {}, tagName = "ck-ocean") {
  import_s_lit_component.default.setDefaultProps(tagName, props);
  customElements.define(tagName, CKOcean);
}
