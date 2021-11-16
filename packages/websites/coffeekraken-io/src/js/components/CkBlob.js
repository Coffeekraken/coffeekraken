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
import { html } from 'lit';
import * as THREE from 'three/build/three';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';
import { FlakesTexture } from './lib/FlakesTexture';
import { RGBELoader } from './lib/RGBELoader';
import Perlin from './lib/perlinNoise';
class NoiseSphereGeometry extends THREE.SphereGeometry {
    constructor(radius, widthSegments, heightSegments, { seed, noiseWidth, noiseHeight }) {
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
        this._start = Date.now();
    }
    firstUpdated() {
        return __awaiter(this, void 0, void 0, function* () {
            this._scene = new THREE.Scene();
            this._camera = new THREE.PerspectiveCamera(30, this.offsetWidth / this.offsetHeight, 1, 10000);
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
            const envmap = yield this.loadEnvMap();
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
            this._controls = new OrbitControls(this._camera, this._renderer.domElement);
            this._controls.autoRotate = true;
            this._controls.autoRotateSpeed = 0.5;
            this._controls.enableDamping = true;
            this._perlin = Perlin();
            this._controls.update();
            this.animate();
        });
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
            const p = new THREE.Vector3(vertices[i], vertices[i + 1], vertices[i + 2]);
            p.normalize().multiplyScalar(1 + 0.3 * this._perlin.get3d(p.x * k + time, p.y * k, p.z * k));
            if (p[0] !== NaN)
                vertices[i] = p[0];
            if (p[1] !== NaN)
                vertices[i + 1] = p[1];
            if (p[2] !== NaN)
                vertices[i + 2] = p[2];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2tCbG9iLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQ2tCbG9iLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBTTNCLE9BQU8sS0FBSyxLQUFLLE1BQU0sbUJBQW1CLENBQUM7QUFFM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1GQUFtRixDQUFDO0FBR2xILE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDOUMsT0FBTyxNQUFNLE1BQU0sbUJBQW1CLENBQUM7QUFFdkMsTUFBTSxtQkFBb0IsU0FBUSxLQUFLLENBQUMsY0FBYztJQUNsRCxZQUNJLE1BQU0sRUFDTixhQUFhLEVBQ2IsY0FBYyxFQUNkLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUU7UUFFakMsS0FBSyxDQUFDLE1BQU0sRUFBRSxhQUFhLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDakQsQ0FBQztDQUNKO0FBRUQsTUFBTSxDQUFDLE9BQU8sT0FBTyxNQUFPLFNBQVEsZUFBZTtJQUMvQztRQUNJLEtBQUssQ0FBQztZQUNGLFlBQVksRUFBRTtnQkFDVixTQUFTLEVBQUUsS0FBSzthQUNuQjtTQUNKLENBQUMsQ0FBQztRQVFQLFdBQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFQcEIsQ0FBQztJQVNLLFlBQVk7O1lBQ2QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNoQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUN0QyxFQUFFLEVBQ0YsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUNwQyxDQUFDLEVBQ0QsS0FBSyxDQUNSLENBQUM7WUFDRixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBRTlCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxLQUFLLENBQUMsYUFBYSxDQUFDO2dCQUNyQyxLQUFLLEVBQUUsSUFBSTtnQkFDWCxTQUFTLEVBQUUsSUFBSTthQUNsQixDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUM1RCxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUN0RCxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRXRFLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQztZQUN6RCxJQUFJLENBQUMsU0FBUyxDQUFDLG1CQUFtQixHQUFHLENBQUMsQ0FBQztZQUV2QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksS0FBSyxDQUFDLGNBQWMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRXRELElBQUksT0FBTyxHQUFHLElBQUksS0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLGFBQWEsRUFBRSxDQUFDLENBQUM7WUFDM0QsT0FBTyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsY0FBYyxDQUFDO1lBQ3JDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLGNBQWMsQ0FBQztZQUNyQyw0Q0FBNEM7WUFDNUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ3RCLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUVyQixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUV2QyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFFZCxNQUFNLGNBQWMsR0FBRyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBRTlELElBQUksQ0FBQyxhQUFhLEdBQUc7Z0JBQ2pCLFNBQVMsRUFBRSxHQUFHO2dCQUNkLGlCQUFpQixFQUFFLEdBQUc7Z0JBQ3RCLFNBQVMsRUFBRSxHQUFHO2dCQUNkLFNBQVMsRUFBRSxHQUFHO2dCQUNkLEtBQUssRUFBRSxRQUFRO2dCQUNmLFNBQVMsRUFBRSxPQUFPO2dCQUNsQixXQUFXLEVBQUUsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7Z0JBQzFDLE1BQU0sRUFBRSxNQUFNLENBQUMsT0FBTzthQUN6QixDQUFDO1lBQ0YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLEdBQUcsY0FBYyxDQUFDO1lBQ3BELElBQUksQ0FBQyxhQUFhLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO1lBQzFDLElBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDMUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztZQUV0RCxJQUFJLE9BQU8sR0FBRyxJQUFJLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFFakUsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUN2RCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLGFBQWEsQ0FDOUIsSUFBSSxDQUFDLE9BQU8sRUFDWixJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FDNUIsQ0FBQztZQUVGLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztZQUNqQyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsR0FBRyxHQUFHLENBQUM7WUFDckMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1lBRXBDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxFQUFFLENBQUM7WUFFeEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN4QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDbkIsQ0FBQztLQUFBO0lBQ0QsTUFBTTtRQUNGLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBQ0QsVUFBVTtRQUNOLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUMzQixJQUFJLFlBQVksR0FBRyxJQUFJLEtBQUssQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzVELElBQUksVUFBVSxFQUFFO2lCQUNYLE9BQU8sQ0FBQyxlQUFlLENBQUM7aUJBQ3hCLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxVQUFVLE1BQU07Z0JBQzVDLElBQUksTUFBTSxHQUFHLFlBQVksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzlDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNwQixDQUFDLENBQUMsQ0FBQztRQUNYLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELE9BQU87UUFDSCwrQ0FBK0M7UUFDL0MsSUFBSSxJQUFJLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLEtBQUssQ0FBQztRQUNyQyxtQkFBbUI7UUFFbkIsOENBQThDO1FBRTlDLG1DQUFtQztRQUNuQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDYixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztRQUMvRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3pDLHVCQUF1QjtZQUV2QixNQUFNLENBQUMsR0FBRyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQ3ZCLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFDWCxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUNmLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQ2xCLENBQUM7WUFFRixDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsY0FBYyxDQUN4QixDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUNqRSxDQUFDO1lBRUYsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRztnQkFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUc7Z0JBQUUsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRztnQkFBRSxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM1QztRQUNELElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDN0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1FBQy9DLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztRQUVoRCxJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3RELHFCQUFxQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRUQsTUFBTTtRQUNGLE9BQU8sSUFBSSxDQUFBOzs7O1NBSVYsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUVELE1BQU0sVUFBVSxNQUFNLENBQUMsUUFBYSxFQUFFLEVBQUUsT0FBTyxHQUFHLFNBQVM7SUFDdkQsZUFBZSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDaEQsY0FBYyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDM0MsQ0FBQyJ9