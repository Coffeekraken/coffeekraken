import { AdditiveBlending, Color, LinearFilter, MeshBasicMaterial, RGBAFormat, ShaderMaterial, UniformsUtils, Vector2, Vector3, WebGLRenderTarget, } from 'three';
import { Pass } from './three/examples/jsm/postprocessing/Pass';
// typescript definitions doesn't have FullScreenQuad
//@ts-ignore
import { FullScreenQuad } from './three/examples/jsm/postprocessing/Pass';
import { CopyShader } from './three/examples/jsm/shaders/CopyShader.js';
import { LuminosityHighPassShader } from './three/examples/jsm/shaders/LuminosityHighPassShader.js';
/**
 * Thanks to https://github.com/mrdoob/three.js/issues/14104#issuecomment-429664412 for this fragmentShaderfix
 *
 * UnrealBloomPass is inspired by the bloom pass of Unreal Engine. It creates a
 * mip map chain of bloom textures and blurs them with different radii. Because
 * of the weighted combination of mips, and because larger blurs are done on
 * higher mips, this effect provides good quality and performance.
 *
 * Reference:
 * - https://docs.unrealengine.com/latest/INT/Engine/Rendering/PostProcessEffects/Bloom/
 */
class TransparentBackgroundFixedUnrealBloomPass extends Pass {
    constructor(resolution, strength, radius, threshold) {
        super();
        this.strength = strength !== undefined ? strength : 1;
        this.radius = radius;
        this.threshold = threshold;
        this.resolution =
            resolution !== undefined
                ? new Vector2(resolution.x, resolution.y)
                : new Vector2(256, 256);
        // create color only once here, reuse it later inside the render function
        this.clearColor = new Color(0, 0, 0);
        // render targets
        const pars = {
            minFilter: LinearFilter,
            magFilter: LinearFilter,
            format: RGBAFormat,
        };
        this.renderTargetsHorizontal = [];
        this.renderTargetsVertical = [];
        this.nMips = 5;
        let resx = Math.round(this.resolution.x / 2);
        let resy = Math.round(this.resolution.y / 2);
        this.renderTargetBright = new WebGLRenderTarget(resx, resy, pars);
        this.renderTargetBright.texture.name = 'UnrealBloomPass.bright';
        this.renderTargetBright.texture.generateMipmaps = false;
        for (let i = 0; i < this.nMips; i++) {
            const renderTargetHorizonal = new WebGLRenderTarget(resx, resy, pars);
            renderTargetHorizonal.texture.name = 'UnrealBloomPass.h' + i;
            renderTargetHorizonal.texture.generateMipmaps = false;
            this.renderTargetsHorizontal.push(renderTargetHorizonal);
            const renderTargetVertical = new WebGLRenderTarget(resx, resy, pars);
            renderTargetVertical.texture.name = 'UnrealBloomPass.v' + i;
            renderTargetVertical.texture.generateMipmaps = false;
            this.renderTargetsVertical.push(renderTargetVertical);
            resx = Math.round(resx / 2);
            resy = Math.round(resy / 2);
        }
        // luminosity high pass material
        if (LuminosityHighPassShader === undefined)
            console.error('THREE.UnrealBloomPass relies on LuminosityHighPassShader');
        const highPassShader = LuminosityHighPassShader;
        this.highPassUniforms = UniformsUtils.clone(highPassShader.uniforms);
        this.highPassUniforms['luminosityThreshold'].value = threshold;
        this.highPassUniforms['smoothWidth'].value = 0.01;
        this.materialHighPassFilter = new ShaderMaterial({
            uniforms: this.highPassUniforms,
            vertexShader: highPassShader.vertexShader,
            fragmentShader: highPassShader.fragmentShader,
            defines: {},
        });
        // Gaussian Blur Materials
        this.separableBlurMaterials = [];
        const kernelSizeArray = [3, 5, 7, 9, 11];
        resx = Math.round(this.resolution.x / 2);
        resy = Math.round(this.resolution.y / 2);
        for (let i = 0; i < this.nMips; i++) {
            this.separableBlurMaterials.push(this.getSeperableBlurMaterial(kernelSizeArray[i]));
            this.separableBlurMaterials[i].uniforms['texSize'].value =
                new Vector2(resx, resy);
            resx = Math.round(resx / 2);
            resy = Math.round(resy / 2);
        }
        // Composite material
        this.compositeMaterial = this.getCompositeMaterial(this.nMips);
        this.compositeMaterial.uniforms['blurTexture1'].value =
            this.renderTargetsVertical[0].texture;
        this.compositeMaterial.uniforms['blurTexture2'].value =
            this.renderTargetsVertical[1].texture;
        this.compositeMaterial.uniforms['blurTexture3'].value =
            this.renderTargetsVertical[2].texture;
        this.compositeMaterial.uniforms['blurTexture4'].value =
            this.renderTargetsVertical[3].texture;
        this.compositeMaterial.uniforms['blurTexture5'].value =
            this.renderTargetsVertical[4].texture;
        this.compositeMaterial.uniforms['bloomStrength'].value = strength;
        this.compositeMaterial.uniforms['bloomRadius'].value = 0.1;
        this.compositeMaterial.needsUpdate = true;
        const bloomFactors = [1.0, 0.8, 0.6, 0.4, 0.2];
        this.compositeMaterial.uniforms['bloomFactors'].value = bloomFactors;
        this.bloomTintColors = [
            new Vector3(1, 1, 1),
            new Vector3(1, 1, 1),
            new Vector3(1, 1, 1),
            new Vector3(1, 1, 1),
            new Vector3(1, 1, 1),
        ];
        this.compositeMaterial.uniforms['bloomTintColors'].value =
            this.bloomTintColors;
        // copy material
        if (CopyShader === undefined) {
            console.error('THREE.UnrealBloomPass relies on CopyShader');
        }
        const copyShader = CopyShader;
        this.copyUniforms = UniformsUtils.clone(copyShader.uniforms);
        this.copyUniforms['opacity'].value = 1.0;
        this.materialCopy = new ShaderMaterial({
            uniforms: this.copyUniforms,
            vertexShader: copyShader.vertexShader,
            fragmentShader: copyShader.fragmentShader,
            blending: AdditiveBlending,
            depthTest: false,
            depthWrite: false,
            transparent: true,
        });
        this.enabled = true;
        this.needsSwap = false;
        this._oldClearColor = new Color();
        this.oldClearAlpha = 1;
        this.basic = new MeshBasicMaterial();
        this.fsQuad = new FullScreenQuad(null);
    }
    dispose() {
        for (let i = 0; i < this.renderTargetsHorizontal.length; i++) {
            this.renderTargetsHorizontal[i].dispose();
        }
        for (let i = 0; i < this.renderTargetsVertical.length; i++) {
            this.renderTargetsVertical[i].dispose();
        }
        this.renderTargetBright.dispose();
    }
    setSize(width, height) {
        let resx = Math.round(width / 2);
        let resy = Math.round(height / 2);
        this.renderTargetBright.setSize(resx, resy);
        for (let i = 0; i < this.nMips; i++) {
            this.renderTargetsHorizontal[i].setSize(resx, resy);
            this.renderTargetsVertical[i].setSize(resx, resy);
            this.separableBlurMaterials[i].uniforms['texSize'].value =
                new Vector2(resx, resy);
            resx = Math.round(resx / 2);
            resy = Math.round(resy / 2);
        }
    }
    render(renderer, writeBuffer, readBuffer, deltaTime, maskActive) {
        renderer.getClearColor(this._oldClearColor);
        this.oldClearAlpha = renderer.getClearAlpha();
        const oldAutoClear = renderer.autoClear;
        renderer.autoClear = false;
        renderer.setClearColor(this.clearColor, 0);
        if (maskActive)
            renderer.state.buffers.stencil.setTest(false);
        // Render input to screen
        if (this.renderToScreen) {
            this.fsQuad.material = this.basic;
            this.basic.map = readBuffer.texture;
            renderer.setRenderTarget(null);
            renderer.clear();
            this.fsQuad.render(renderer);
        }
        // 1. Extract Bright Areas
        this.highPassUniforms['tDiffuse'].value = readBuffer.texture;
        this.highPassUniforms['luminosityThreshold'].value = this.threshold;
        this.fsQuad.material = this.materialHighPassFilter;
        renderer.setRenderTarget(this.renderTargetBright);
        renderer.clear();
        this.fsQuad.render(renderer);
        // 2. Blur All the mips progressively
        let inputRenderTarget = this.renderTargetBright;
        for (let i = 0; i < this.nMips; i++) {
            this.fsQuad.material = this.separableBlurMaterials[i];
            this.separableBlurMaterials[i].uniforms['colorTexture'].value =
                inputRenderTarget.texture;
            this.separableBlurMaterials[i].uniforms['direction'].value =
                TransparentBackgroundFixedUnrealBloomPass.BlurDirectionX;
            renderer.setRenderTarget(this.renderTargetsHorizontal[i]);
            renderer.clear();
            this.fsQuad.render(renderer);
            this.separableBlurMaterials[i].uniforms['colorTexture'].value =
                this.renderTargetsHorizontal[i].texture;
            this.separableBlurMaterials[i].uniforms['direction'].value =
                TransparentBackgroundFixedUnrealBloomPass.BlurDirectionY;
            renderer.setRenderTarget(this.renderTargetsVertical[i]);
            renderer.clear();
            this.fsQuad.render(renderer);
            inputRenderTarget = this.renderTargetsVertical[i];
        }
        // Composite All the mips
        this.fsQuad.material = this.compositeMaterial;
        this.compositeMaterial.uniforms['bloomStrength'].value = this.strength;
        this.compositeMaterial.uniforms['bloomRadius'].value = this.radius;
        this.compositeMaterial.uniforms['bloomTintColors'].value =
            this.bloomTintColors;
        renderer.setRenderTarget(this.renderTargetsHorizontal[0]);
        renderer.clear();
        this.fsQuad.render(renderer);
        // Blend it additively over the input texture
        this.fsQuad.material = this.materialCopy;
        this.copyUniforms['tDiffuse'].value =
            this.renderTargetsHorizontal[0].texture;
        if (maskActive)
            renderer.state.buffers.stencil.setTest(true);
        if (this.renderToScreen) {
            renderer.setRenderTarget(null);
            this.fsQuad.render(renderer);
        }
        else {
            renderer.setRenderTarget(readBuffer);
            this.fsQuad.render(renderer);
        }
        // Restore renderer settings
        renderer.setClearColor(this._oldClearColor, this.oldClearAlpha);
        renderer.autoClear = oldAutoClear;
    }
    getSeperableBlurMaterial(kernelRadius) {
        return new ShaderMaterial({
            defines: {
                KERNEL_RADIUS: kernelRadius,
                SIGMA: kernelRadius,
            },
            uniforms: {
                colorTexture: { value: null },
                texSize: { value: new Vector2(0.5, 0.5) },
                direction: { value: new Vector2(0.5, 0.5) },
            },
            vertexShader: `varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,
            fragmentShader: `#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 texSize;
				uniform vec2 direction;

				float gaussianPdf(in float x, in float sigma) {
					return 0.39894 * exp( -0.5 * x * x/( sigma * sigma))/sigma;
				}
				void main() {\n\
          vec2 invSize = 1.0 / texSize;\
          float fSigma = float(SIGMA);\
          float weightSum = gaussianPdf(0.0, fSigma);\
          float alphaSum = 0.0;\
          vec3 diffuseSum = texture2D( colorTexture, vUv).rgb * weightSum;\
          for( int i = 1; i < KERNEL_RADIUS; i ++ ) {\
            float x = float(i);\
            float w = gaussianPdf(x, fSigma);\
            vec2 uvOffset = direction * invSize * x;\
            vec4 sample1 = texture2D( colorTexture, vUv + uvOffset);\
            vec4 sample2 = texture2D( colorTexture, vUv - uvOffset);\
            diffuseSum += (sample1.rgb + sample2.rgb) * w;\
            alphaSum += (sample1.a + sample2.a) * w;\
            weightSum += 2.0 * w;\
          }\
          gl_FragColor = vec4(diffuseSum/weightSum, alphaSum/weightSum);\n\
        }`,
        });
    }
    getCompositeMaterial(nMips) {
        return new ShaderMaterial({
            defines: {
                NUM_MIPS: nMips,
            },
            uniforms: {
                blurTexture1: { value: null },
                blurTexture2: { value: null },
                blurTexture3: { value: null },
                blurTexture4: { value: null },
                blurTexture5: { value: null },
                dirtTexture: { value: null },
                bloomStrength: { value: 1.0 },
                bloomFactors: { value: null },
                bloomTintColors: { value: null },
                bloomRadius: { value: 0.0 },
            },
            vertexShader: `varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,
            fragmentShader: `varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform sampler2D dirtTexture;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`,
        });
    }
}
TransparentBackgroundFixedUnrealBloomPass.BlurDirectionX = new Vector2(1.0, 0.0);
TransparentBackgroundFixedUnrealBloomPass.BlurDirectionY = new Vector2(0.0, 1.0);
export { TransparentBackgroundFixedUnrealBloomPass as UnrealBloomPass };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDSCxnQkFBZ0IsRUFDaEIsS0FBSyxFQUNMLFlBQVksRUFDWixpQkFBaUIsRUFDakIsVUFBVSxFQUNWLGNBQWMsRUFFZCxhQUFhLEVBQ2IsT0FBTyxFQUNQLE9BQU8sRUFFUCxpQkFBaUIsR0FDcEIsTUFBTSxPQUFPLENBQUM7QUFFZixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFFaEUscURBQXFEO0FBQ3JELFlBQVk7QUFDWixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFFMUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDBEQUEwRCxDQUFDO0FBRXBHOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFNLHlDQUEwQyxTQUFRLElBQUk7SUF1QnhELFlBQ0ksVUFBbUIsRUFDbkIsUUFBZ0IsRUFDaEIsTUFBYyxFQUNkLFNBQWlCO1FBRWpCLEtBQUssRUFBRSxDQUFDO1FBRVIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0RCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsVUFBVTtZQUNYLFVBQVUsS0FBSyxTQUFTO2dCQUNwQixDQUFDLENBQUMsSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUN6QyxDQUFDLENBQUMsSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRWhDLHlFQUF5RTtRQUN6RSxJQUFJ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