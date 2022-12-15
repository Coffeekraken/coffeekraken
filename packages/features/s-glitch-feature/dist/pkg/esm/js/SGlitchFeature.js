var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SFeature from '@coffeekraken/s-feature';
import __STimer from '@coffeekraken/s-timer';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __SGlitchFeatureInterface from './interface/SGlitchFeatureInterface';
import __html2canvas from 'html2canvas';
import { AmbientLight, DirectionalLight, EffectComposer, Mesh, MeshBasicMaterial, OrthographicCamera, PlaneGeometry, RenderPass, Scene, TextureLoader, WebGLRenderer, } from 'three-full';
import GlitchPass from './lib/glitchPass';
import __define from './define';
// @ts-ignore
import __css from '../../../../src/css/s-glitch-feature.css'; // relative to /dist/pkg/esm/js
export default class SGlitchFeature extends __SFeature {
    // @ts-ignore
    constructor(name, node, settings) {
        super(name, node, __deepMerge({
            name: 's-glitch',
            interface: __SGlitchFeatureInterface,
            style: __css,
        }, settings !== null && settings !== void 0 ? settings : {}));
        this._offsetWidth = 0;
        this._offsetHeight = 0;
        this._isTimeoutStarted = false;
        this._isResizing = false;
    }
    mount() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const canvas = yield this._getHtml2Canvas();
                this._$canvas = yield this._initScene(canvas.toDataURL());
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
            }
            catch (e) {
                console.log(e);
                // do nothing here
            }
        });
    }
    /**
     * Transform the dom into a canvas element
     * @return    {HTMLCanvasElement}    A canvas element that contain the dom drawn on it
     */
    _getHtml2Canvas() {
        return __awaiter(this, void 0, void 0, function* () {
            const canvas = yield __html2canvas(this.node, {
                logging: false,
                useCORS: true,
                removeContainer: false,
                ignoreElements: (element) => {
                    if (element.tagName.toLowerCase() === 'canvas')
                        return true;
                    return false;
                },
            });
            return canvas;
        });
    }
    /**
     * Init the 3d scene with light and plae
     * @param    {String}    image    urlData image to apply on the plane
     * @return    {HTMLCanvasElement}    The canvas on which the glitch will be drawn
     */
    _initScene(image) {
        return __awaiter(this, void 0, void 0, function* () {
            this._renderer = new WebGLRenderer();
            this._renderer.setSize(this._offsetWidth, this._offsetHeight);
            this._renderer.domElement.classList.add(this.componentUtils.className('__canvas'));
            this.node.appendChild(this._renderer.domElement);
            // camera
            const camera = new OrthographicCamera(-this._offsetWidth * 0.5, this._offsetWidth * 0.5, this._offsetHeight * 0.5, -this._offsetHeight * 0.5, 1, 10000);
            camera.position.z = 100;
            // scene
            const scene = new Scene();
            scene.add(camera);
            const texturedMaterial = yield this._loadTexturedMaterial(image);
            // plane
            this._plane = new Mesh(new PlaneGeometry(this._offsetWidth, this._offsetHeight), texturedMaterial);
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
        });
    }
    /**
     * Load the textured material to apply on the place
     * @param    {String}    image    The urlData of the texture to apply
     * @return    {MeshBasicMaterial}    The basic material with the texture applied on it
     */
    _loadTexturedMaterial(image) {
        return __awaiter(this, void 0, void 0, function* () {
            const texture = yield this._loadTexture(image);
            const texturedMaterial = new MeshBasicMaterial({
                map: texture,
            });
            texturedMaterial.map.needsUpdate = true;
            return texturedMaterial;
        });
    }
    /**
     * Load a texture
     * @param    {String}    image    The urlData of the texture to load
     * @return    {Texture}    The loaded texture to apply on a material
     */
    _loadTexture(image) {
        return new Promise((resolve, reject) => {
            const loader = new TextureLoader();
            loader.load(image, (texture) => {
                resolve(texture);
            }, 
            // onProgress callback currently not supported
            undefined, 
            // onError callback
            (err) => {
                reject(err);
            });
        });
    }
    /**
     * Init the timeout timer
     */
    _initTimeoutTimer() {
        this._timeoutTimer = new __STimer(this.props.minTimeout +
            Math.round(Math.random() *
                (this.props.maxTimeout - this.props.minTimeout)), {
            tickCount: 1,
        });
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
                Math.round(Math.random() * (this.props.maxTimeout - this.props.minTimeout));
        this._isTimeoutStarted = true;
        this._timeoutTimer.start();
    }
    /**
     * Render a glitch frame
     */
    _render() {
        if (this._isResizing)
            return;
        this._composer.render();
    }
    /**
     * Init glitch timer
     */
    _initGlitchTimer() {
        const duration = this.props.minDuration +
            Math.round(Math.random() *
                (this.props.maxDuration - this.props.minDuration));
        this._glitchTimer = new __STimer(duration, {
            tickCount: (this.props.fps / 1000) * duration,
        });
        this._glitchTimer.on('tick', this._render.bind(this));
        this._glitchTimer.on('complete', () => {
            this.node.classList.remove('glitch');
            if (this._isTimeoutStarted)
                this._startTimeout();
        });
    }
    /**
     * Start a glitch iteration
     */
    _startGlitch() {
        this.node.classList.add('glitch');
        const duration = this.props.minDuration +
            Math.round(Math.random() *
                (this.props.maxDuration - this.props.minDuration));
        this._glitchTimer.duration = duration;
        this._glitchTimer.tickCount = (this.props.fps / 1000) * duration;
        this._glitchTimer.start();
    }
}
export { __define as define };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLHlCQUF5QixNQUFNLHFDQUFxQyxDQUFDO0FBRTVFLE9BQU8sYUFBYSxNQUFNLGFBQWEsQ0FBQztBQUN4QyxPQUFPLEVBQ0gsWUFBWSxFQUNaLGdCQUFnQixFQUNoQixjQUFjLEVBQ2QsSUFBSSxFQUNKLGlCQUFpQixFQUNqQixrQkFBa0IsRUFDbEIsYUFBYSxFQUNiLFVBQVUsRUFDVixLQUFLLEVBQ0wsYUFBYSxFQUNiLGFBQWEsR0FDaEIsTUFBTSxZQUFZLENBQUM7QUFDcEIsT0FBTyxVQUFVLE1BQU0sa0JBQWtCLENBQUM7QUFFMUMsT0FBTyxRQUFRLE1BQU0sVUFBVSxDQUFDO0FBRWhDLGFBQWE7QUFDYixPQUFPLEtBQUssTUFBTSwwQ0FBMEMsQ0FBQyxDQUFDLCtCQUErQjtBQXlDN0YsTUFBTSxDQUFDLE9BQU8sT0FBTyxjQUFlLFNBQVEsVUFBVTtJQUNsRCxhQUFhO0lBQ2IsWUFBWSxJQUFZLEVBQUUsSUFBaUIsRUFBRSxRQUFhO1FBQ3RELEtBQUssQ0FDRCxJQUFJLEVBQ0osSUFBSSxFQUNKLFdBQVcsQ0FDUDtZQUNJLElBQUksRUFBRSxVQUFVO1lBQ2hCLFNBQVMsRUFBRSx5QkFBeUI7WUFDcEMsS0FBSyxFQUFFLEtBQUs7U0FDZixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO1FBcUVFLGlCQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLGtCQUFhLEdBQUcsQ0FBQyxDQUFDO1FBc0dsQixzQkFBaUIsR0FBRyxLQUFLLENBQUM7UUF1QzFCLGdC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