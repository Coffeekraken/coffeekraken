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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRml4ZXNVbnJlYWxCbG9vbVBhc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJGaXhlc1VucmVhbEJsb29tUGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0gsZ0JBQWdCLEVBQ2hCLEtBQUssRUFDTCxZQUFZLEVBQ1osaUJBQWlCLEVBQ2pCLFVBQVUsRUFDVixjQUFjLEVBRWQsYUFBYSxFQUNiLE9BQU8sRUFDUCxPQUFPLEVBRVAsaUJBQWlCLEdBQ3BCLE1BQU0sT0FBTyxDQUFDO0FBRWYsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBRWhFLHFEQUFxRDtBQUNyRCxZQUFZO0FBQ1osT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBRTFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwwREFBMEQsQ0FBQztBQUVwRzs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBTSx5Q0FBMEMsU0FBUSxJQUFJO0lBdUJ4RCxZQUNJLFVBQW1CLEVBQ25CLFFBQWdCLEVBQ2hCLE1BQWMsRUFDZCxTQUFpQjtRQUVqQixLQUFLLEVBQUUsQ0FBQztRQUVSLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsSUFBSSxDQUFDLFVBQVU7WUFDWCxVQUFVLEtBQUssU0FBUztnQkFDcEIsQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDekMsQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMs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