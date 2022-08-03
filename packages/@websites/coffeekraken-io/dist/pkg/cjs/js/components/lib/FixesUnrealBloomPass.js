"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnrealBloomPass = void 0;
const three_1 = require("three");
const Pass_1 = require("./three/examples/jsm/postprocessing/Pass");
// typescript definitions doesn't have FullScreenQuad
//@ts-ignore
const Pass_2 = require("./three/examples/jsm/postprocessing/Pass");
const CopyShader_js_1 = require("./three/examples/jsm/shaders/CopyShader.js");
const LuminosityHighPassShader_js_1 = require("./three/examples/jsm/shaders/LuminosityHighPassShader.js");
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
class TransparentBackgroundFixedUnrealBloomPass extends Pass_1.Pass {
    constructor(resolution, strength, radius, threshold) {
        super();
        this.strength = strength !== undefined ? strength : 1;
        this.radius = radius;
        this.threshold = threshold;
        this.resolution =
            resolution !== undefined
                ? new three_1.Vector2(resolution.x, resolution.y)
                : new three_1.Vector2(256, 256);
        // create color only once here, reuse it later inside the render function
        this.clearColor = new three_1.Color(0, 0, 0);
        // render targets
        const pars = {
            minFilter: three_1.LinearFilter,
            magFilter: three_1.LinearFilter,
            format: three_1.RGBAFormat,
        };
        this.renderTargetsHorizontal = [];
        this.renderTargetsVertical = [];
        this.nMips = 5;
        let resx = Math.round(this.resolution.x / 2);
        let resy = Math.round(this.resolution.y / 2);
        this.renderTargetBright = new three_1.WebGLRenderTarget(resx, resy, pars);
        this.renderTargetBright.texture.name = 'UnrealBloomPass.bright';
        this.renderTargetBright.texture.generateMipmaps = false;
        for (let i = 0; i < this.nMips; i++) {
            const renderTargetHorizonal = new three_1.WebGLRenderTarget(resx, resy, pars);
            renderTargetHorizonal.texture.name = 'UnrealBloomPass.h' + i;
            renderTargetHorizonal.texture.generateMipmaps = false;
            this.renderTargetsHorizontal.push(renderTargetHorizonal);
            const renderTargetVertical = new three_1.WebGLRenderTarget(resx, resy, pars);
            renderTargetVertical.texture.name = 'UnrealBloomPass.v' + i;
            renderTargetVertical.texture.generateMipmaps = false;
            this.renderTargetsVertical.push(renderTargetVertical);
            resx = Math.round(resx / 2);
            resy = Math.round(resy / 2);
        }
        // luminosity high pass material
        if (LuminosityHighPassShader_js_1.LuminosityHighPassShader === undefined)
            console.error('THREE.UnrealBloomPass relies on LuminosityHighPassShader');
        const highPassShader = LuminosityHighPassShader_js_1.LuminosityHighPassShader;
        this.highPassUniforms = three_1.UniformsUtils.clone(highPassShader.uniforms);
        this.highPassUniforms['luminosityThreshold'].value = threshold;
        this.highPassUniforms['smoothWidth'].value = 0.01;
        this.materialHighPassFilter = new three_1.ShaderMaterial({
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
                new three_1.Vector2(resx, resy);
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
            new three_1.Vector3(1, 1, 1),
            new three_1.Vector3(1, 1, 1),
            new three_1.Vector3(1, 1, 1),
            new three_1.Vector3(1, 1, 1),
            new three_1.Vector3(1, 1, 1),
        ];
        this.compositeMaterial.uniforms['bloomTintColors'].value =
            this.bloomTintColors;
        // copy material
        if (CopyShader_js_1.CopyShader === undefined) {
            console.error('THREE.UnrealBloomPass relies on CopyShader');
        }
        const copyShader = CopyShader_js_1.CopyShader;
        this.copyUniforms = three_1.UniformsUtils.clone(copyShader.uniforms);
        this.copyUniforms['opacity'].value = 1.0;
        this.materialCopy = new three_1.ShaderMaterial({
            uniforms: this.copyUniforms,
            vertexShader: copyShader.vertexShader,
            fragmentShader: copyShader.fragmentShader,
            blending: three_1.AdditiveBlending,
            depthTest: false,
            depthWrite: false,
            transparent: true,
        });
        this.enabled = true;
        this.needsSwap = false;
        this._oldClearColor = new three_1.Color();
        this.oldClearAlpha = 1;
        this.basic = new three_1.MeshBasicMaterial();
        this.fsQuad = new Pass_2.FullScreenQuad(null);
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
                new three_1.Vector2(resx, resy);
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
        return new three_1.ShaderMaterial({
            defines: {
                KERNEL_RADIUS: kernelRadius,
                SIGMA: kernelRadius,
            },
            uniforms: {
                colorTexture: { value: null },
                texSize: { value: new three_1.Vector2(0.5, 0.5) },
                direction: { value: new three_1.Vector2(0.5, 0.5) },
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
        return new three_1.ShaderMaterial({
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
exports.UnrealBloomPass = TransparentBackgroundFixedUnrealBloomPass;
TransparentBackgroundFixedUnrealBloomPass.BlurDirectionX = new three_1.Vector2(1.0, 0.0);
TransparentBackgroundFixedUnrealBloomPass.BlurDirectionY = new three_1.Vector2(0.0, 1.0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlDQWFlO0FBRWYsbUVBQWdFO0FBRWhFLHFEQUFxRDtBQUNyRCxZQUFZO0FBQ1osbUVBQTBFO0FBRTFFLDhFQUF3RTtBQUN4RSwwR0FBb0c7QUFFcEc7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQU0seUNBQTBDLFNBQVEsV0FBSTtJQXVCeEQsWUFDSSxVQUFtQixFQUNuQixRQUFnQixFQUNoQixNQUFjLEVBQ2QsU0FBaUI7UUFFakIsS0FBSyxFQUFFLENBQUM7UUFFUixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxVQUFVO1lBQ1gsVUFBVSxLQUFLLFNBQVM7Z0JBQ3BCLENBQUMsQ0FBQyxJQUFJLGVBQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pDLENBQUMsQ0FBQyxJQUFJLGVBQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFaEMseUVBQXlFO1FBQ3pFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxhQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUVyQyxpQkFBaUI7UUFDakIsTUFBTSxJQUFJLEdBQUc7WUFDVCxTQUFTLEVBQUUsb0JBQVk7WUFDdkIsU0FBUyxFQUFFLG9CQUFZO1lBQ3ZCLE1BQU0sRUFBRSxrQkFBVTtTQUNyQixDQUFDO1FBQ0YsSUFBSSxDQUFDLHVCQUF1QixHQUFHLEVBQUUsQ0FBQztRQUNsQyxJQUFJLENBQUMscUJBQXFCLEdBQUcsRUFBRSxD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