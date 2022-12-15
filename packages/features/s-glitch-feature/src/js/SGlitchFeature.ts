import __SFeature from '@coffeekraken/s-feature';
import __STimer from '@coffeekraken/s-timer';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __SGlitchFeatureInterface from './interface/SGlitchFeatureInterface';

import __html2canvas from 'html2canvas';
import {
    AmbientLight,
    DirectionalLight,
    EffectComposer,
    Mesh,
    MeshBasicMaterial,
    OrthographicCamera,
    PlaneGeometry,
    RenderPass,
    Scene,
    TextureLoader,
    WebGLRenderer,
} from 'three-full';
import GlitchPass from './lib/glitchPass';

import __define from './define';

// @ts-ignore
import __css from '../../../../src/css/s-glitch-feature.css'; // relative to /dist/pkg/esm/js

/**
 * @name            SGlitchFeature
 * @as              Glitch
 * @namespace       js
 * @type            Feature
 * @interface       ./interface/SGlitchFeatureInterface.ts
 * @menu            Styleguide / Effects               /styleguide/effect/s-glitch-feature
 * @platform        js
 * @status          beta
 *
 * This feature allows you to apply some nice glitch effects on any HTMLElement.
 *
 * @support          chromium
 * @support          firefox
 * @support          safari
 * @support          edge
 *
 * @example         html            Highlight
 * <div class="s-radius s-bg:main s-depth s-mbe:30" style="height:100px" s-highlight>
 * </div>
 * <div class="s-radius s-bg:accent s-depth s-mbe:30" style="height:100px" s-highlight opacity="1">
 * </div>
 * <div class="s-radius s-bg:complementary s-depth s-mbe:30" style="height:100px" s-highlight opacity="1">
 * </div>
 * <div class="s-radius s-bg:error s-depth" style="height:100px" s-highlight opacity="1">
 * </div>
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISGlitchFeatureProps {
    fps: number;
    minTimeout: number;
    maxTimeout: number;
    minDuration: number;
    maxDuration: number;
}

export default class SGlitchFeature extends __SFeature {
    // @ts-ignore
    constructor(name: string, node: HTMLElement, settings: any) {
        super(
            name,
            node,
            __deepMerge(
                {
                    name: 's-glitch',
                    interface: __SGlitchFeatureInterface,
                    style: __css,
                },
                settings ?? {},
            ),
        );
    }

    private _$canvas;

    async mount() {
        try {
            const canvas = await this._getHtml2Canvas();
            this._$canvas = await this._initScene(canvas.toDataURL());

            // this._render()
            this._initTimeoutTimer();
            this._initGlitchTimer();

            // if (
            //     !this.props.glitchOnHover &&
            //     (!this.props.pauseWhenOut || __isInViewport(this.node))
            // ) {
            this._startTimeout();
            // }

            // // init glitch on hover handler
            // if (this.props.glitchOnHover) {
            //     this._addGlitchOnHoverHandler();
            // }

            // // init hover handler
            // if (this.props.pauseOnHover && !this.props.glitchOnHover) {
            //     this._addHoverHandler();
            // }

            // // in viewport change detector
            // if (this.props.pauseWhenOut && !this.props.glitchOnHover) {
            //     this._addInViewportChangeDetector();
            // }

            // // init the resize handler
            // this._addResizeHandler();

            /**
             * @event
             * @name    ready
             * Dispatched when the component is ready to accept inputs like "start", "pause", etc...
             */
            // dispatchEvent(this, 'ready');
        } catch (e) {
            console.log(e);
            // do nothing here
        }
    }

    /**
     * Transform the dom into a canvas element
     * @return    {HTMLCanvasElement}    A canvas element that contain the dom drawn on it
     */
    async _getHtml2Canvas() {
        const canvas = await __html2canvas(this.node, {
            logging: false,
            useCORS: true,
            removeContainer: false,
            ignoreElements: (element) => {
                if (element.tagName.toLowerCase() === 'canvas') return true;
                return false;
            },
        });
        return canvas;
    }

    private _renderer;
    private _offsetWidth = 0;
    private _offsetHeight = 0;
    private _plane;
    private _composer;

    /**
     * Init the 3d scene with light and plae
     * @param    {String}    image    urlData image to apply on the plane
     * @return    {HTMLCanvasElement}    The canvas on which the glitch will be drawn
     */
    async _initScene(image) {
        this._renderer = new WebGLRenderer();
        this._renderer.setSize(this._offsetWidth, this._offsetHeight);
        this._renderer.domElement.classList.add(
            this.componentUtils.className('__canvas'),
        );
        this.node.appendChild(this._renderer.domElement);

        // camera
        const camera = new OrthographicCamera(
            -this._offsetWidth * 0.5,
            this._offsetWidth * 0.5,
            this._offsetHeight * 0.5,
            -this._offsetHeight * 0.5,
            1,
            10000,
        );
        camera.position.z = 100;

        // scene
        const scene = new Scene();
        scene.add(camera);

        const texturedMaterial = await this._loadTexturedMaterial(image);

        // plane
        this._plane = new Mesh(
            new PlaneGeometry(this._offsetWidth, this._offsetHeight),
            texturedMaterial,
        );
        this._plane.overdraw = true;
        scene.add(this._plane);

        // add subtle ambient lighting
        const ambientLight = new AmbientLight(0x555555);
        scene.add(ambientLight);

        // add directional light source
        const directionalLight = new DirectionalLight(0xffffff);
        directionalLight.position.set(1, 1, 1).normalize();
        scene.add(directionalLight);

        this._composer = new EffectComposer(this._renderer);
        this._composer.addPass(new RenderPass(scene, camera));

        const glitchDtSize = 64;
        const glitchPass = new GlitchPass(glitchDtSize);
        glitchPass.renderToScreen = true;
        glitchPass.goWild = true;
        this._composer.addPass(glitchPass);

        // resolve the init scene
        return this._renderer.domElement;
    }

    /**
     * Load the textured material to apply on the place
     * @param    {String}    image    The urlData of the texture to apply
     * @return    {MeshBasicMaterial}    The basic material with the texture applied on it
     */
    async _loadTexturedMaterial(image) {
        const texture = await this._loadTexture(image);
        const texturedMaterial = new MeshBasicMaterial({
            map: texture,
        });
        texturedMaterial.map.needsUpdate = true;
        return texturedMaterial;
    }

    /**
     * Load a texture
     * @param    {String}    image    The urlData of the texture to load
     * @return    {Texture}    The loaded texture to apply on a material
     */
    _loadTexture(image) {
        return new Promise((resolve, reject) => {
            const loader = new TextureLoader();
            loader.load(
                image,
                (texture) => {
                    resolve(texture);
                },
                // onProgress callback currently not supported
                undefined,
                // onError callback
                (err) => {
                    reject(err);
                },
            );
        });
    }

    private _timeoutTimer;
    private _isTimeoutStarted = false;

    /**
     * Init the timeout timer
     */
    _initTimeoutTimer() {
        this._timeoutTimer = new __STimer(
            this.props.minTimeout +
                Math.round(
                    Math.random() *
                        (this.props.maxTimeout - this.props.minTimeout),
                ),
            {
                tickCount: 1,
            },
        );

        this._timeoutTimer.on('tick', this._startGlitch.bind(this));
    }

    _pauseTimeout() {
        this._isTimeoutStarted = false;
        this._timeoutTimer.pause();
    }

    /**
     * Start a timeout iteration that will start a glitch at his end
     */
    _startTimeout() {
        this._timeoutTimer.duration =
            this.props.minTimeout +
            Math.round(
                Math.random() * (this.props.maxTimeout - this.props.minTimeout),
            );
        this._isTimeoutStarted = true;
        this._timeoutTimer.start();
    }

    private _glitchTimer;
    private _isResizing = false;

    /**
     * Render a glitch frame
     */
    _render() {
        if (this._isResizing) return;
        this._composer.render();
    }

    /**
     * Init glitch timer
     */
    _initGlitchTimer() {
        const duration =
            this.props.minDuration +
            Math.round(
                Math.random() *
                    (this.props.maxDuration - this.props.minDuration),
            );
        this._glitchTimer = new __STimer(duration, {
            tickCount: (this.props.fps / 1000) * duration,
        });
        this._glitchTimer.on('tick', this._render.bind(this));
        this._glitchTimer.on('complete', () => {
            this.node.classList.remove('glitch');
            if (this._isTimeoutStarted) this._startTimeout();
        });
    }

    /**
     * Start a glitch iteration
     */
    _startGlitch() {
        this.node.classList.add('glitch');
        const duration =
            this.props.minDuration +
            Math.round(
                Math.random() *
                    (this.props.maxDuration - this.props.minDuration),
            );
        this._glitchTimer.duration = duration;
        this._glitchTimer.tickCount = (this.props.fps / 1000) * duration;
        this._glitchTimer.start();
    }
}

export { __define as define };
