// @ts-nocheck

import __SLitComponent from "@coffeekraken/s-lit-component";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
import __STheme from "@coffeekraken/s-theme";
// import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';
import { html } from "lit";
import * as THREE from "three";
import { OBJLoader } from "./lib/three/examples/jsm/loaders/OBJLoader.js";
// import { RGBELoader } from './lib/three/examples/jsm/loaders/RGBELoader';
import { EffectComposer } from "./lib/three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "./lib/three/examples/jsm/postprocessing/RenderPass.js";

interface IFlyingCoffee {
  grain: any;
  trail: any[];
  group: any;
}

export default class CKBlob extends __SLitComponent {
  static get properties() {
    return __SLitComponent.createProperties();
  }

  constructor() {
    super({
      shadowDom: false,
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
    .querySelector("html")
    .getAttribute("theme")
    ?.toString()
    .includes("dark");

  _postprocessing = {};

  _$html = document.querySelector("html");

  async firstUpdated() {
    this._scene = new THREE.Scene();
    this._camera = new THREE.PerspectiveCamera(
      30,
      this.offsetWidth / this.offsetHeight,
      1,
      10000
    );
    this._camera.position.z = 60;

    // theme change
    document.addEventListener("s-theme.change", (e) => {
      const newBlob = new CKBlob();
      this.after(newBlob);
      this.remove();
    });

    setInterval(() => {
      this._isDark = this._$html
        .getAttribute("theme")
        ?.toString()
        .includes("dark");
    }, 200);

    this._theme = __STheme.getCurrentTheme();
    this._colors = {
      accent: this._theme.getColor("accent").toHex(),
      complementary: this._theme.getColor("complementary").toHex(),
    };
    let saveTimeout;
    this._theme.on("update", (data) => {
      if (data.dotPath.includes("color.accent")) {
        this._colors.accent = data.value;
      } else if (data.dotPath.includes("color.complementary")) {
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

    this._darkMaterial = new THREE.MeshBasicMaterial({ color: "black" });

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
    this.querySelector(".ck-blob").appendChild(this._renderer.domElement);

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

    this._planePoints = this.createPlanePoints(0x212728);

    this._planePointsLight = this.createPlanePoints(0x212728, 1, "6.0");
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

    const finalComposer = new EffectComposer(
      this._renderer
      // this._renderTarget,
    );
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
  async addGrains() {
    const grain = await this.loadCoffeeGrain();
    this._grains = [];

    const yellowMaterial = await this.createGrainMaterial(
      `${__SSugarConfig.get("serve.img.url")}/3d/coffeeGrain/grain-yellow.jpg`
    );

    const purpleMaterial = await this.createGrainMaterial(
      `${__SSugarConfig.get("serve.img.url")}/3d/coffeeGrain/grain-purple.jpg`
    );

    const materials = [yellowMaterial, purpleMaterial];
    const colors = ["accent", "complementary"];

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
      const grainObj: IFlyingCoffee = {
        grain: newGrain,
        group,
        scale,
        speed,
        color: colors[i % 2],
        trailLength: 15 + Math.round(Math.random() * 20),
        localGroup,
        trail: [],
      };

      group.rotation.set(
        Math.random() * 360,
        Math.random() * 360,
        Math.random() * 360
      );
      localGroup.position.x = 7 + Math.random() * 4;

      this._grains.push(grainObj);
      this._scene.add(group);
    }
  }

  createPlanePoints(color, alphaVariation, pointSize = "8.0") {
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

    plane.geometry.setAttribute("alpha", new THREE.BufferAttribute(alphas, 1));
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
    return new Promise(async (resolve) => {
      const texture = await this.loadTexture(texturePath);
      const bumpMap = await this.loadTexture(
        `${__SSugarConfig.get(
          "serve.img.url"
        )}/3d/coffeeGrain/coffeeGrainBumpMap.jpg`
      );

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
    });
  }
  loadCoffeeGrain() {
    return new Promise((resolve) => {
      new OBJLoader().load(
        `${__SSugarConfig.get("serve.img.url")}/3d/coffeeGrain/coffeeGrain.obj`,
        (object) => {
          object.castShadow = true;
          object.scale.set(0.01, 0.01, 0.01);
          object.position.set(0, 0, 0);

          resolve(object);
        }
      );
    });
  }

  // loadEnvMap() {
  //     return new Promise((resolve) => {
  //         let envmaploader = new THREE.PMREMGenerator(this._renderer);
  //         new RGBELoader()
  //             .setPath(`${__SSugarConfig.get('serve.img.url')}/3d/`)
  //             .load('HDRI_STUDIO_vol2_030.hdr', function (hdrmap) {
  //                 let envmap = envmaploader.fromCubemap(hdrmap);
  //                 resolve(envmap);
  //             });
  //     });
  // }
  animate() {
    if (!this.componentUtils.isInViewport()) {
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
          child.material.color.setHex(
            `0x${this._colors[grainObj.color].replace("#", "")}`
          );
        }
      });

      const originalPosition = new THREE.Vector3();
      const newPosition = new THREE.Vector3();
      if (grainObj.localGroup.lastPositions.length > 10) {
        grainObj.localGroup.getWorldPosition(newPosition);
        const lastPosition = grainObj.localGroup.lastPositions.shift();
        grainObj.localGroup.lookAt(
          lastPosition.x,
          lastPosition.y,
          lastPosition.z
        );
      }
      grainObj.localGroup.getWorldPosition(originalPosition);
      grainObj.localGroup.lastPositions.push(originalPosition);

      // grainObj.grain.rotation.x = group.rotation.x;
      // grainObj.grain.rotation.y = group.rotation.y;
      // grainObj.grain.rotation.z = group.rotation.z;
    });

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

export function define(props: any = {}, tagName = "ck-blob") {
  __SLitComponent.setDefaultProps(tagName, props);
  customElements.define(tagName, CKBlob);
}
