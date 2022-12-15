"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = void 0;
const s_feature_1 = __importDefault(require("@coffeekraken/s-feature"));
const s_timer_1 = __importDefault(require("@coffeekraken/s-timer"));
const object_1 = require("@coffeekraken/sugar/object");
const SGlitchFeatureInterface_1 = __importDefault(require("./interface/SGlitchFeatureInterface"));
const html2canvas_1 = __importDefault(require("html2canvas"));
const three_full_1 = require("three-full");
const glitchPass_1 = __importDefault(require("./lib/glitchPass"));
const define_1 = __importDefault(require("./define"));
exports.define = define_1.default;
// @ts-ignore
const s_glitch_feature_css_1 = __importDefault(require("../../../../src/css/s-glitch-feature.css")); // relative to /dist/pkg/esm/js
class SGlitchFeature extends s_feature_1.default {
    // @ts-ignore
    constructor(name, node, settings) {
        super(name, node, (0, object_1.__deepMerge)({
            name: 's-glitch',
            interface: SGlitchFeatureInterface_1.default,
            style: s_glitch_feature_css_1.default,
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
            const canvas = yield (0, html2canvas_1.default)(this.node, {
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
            this._renderer = new three_full_1.WebGLRenderer();
            this._renderer.setSize(this._offsetWidth, this._offsetHeight);
            this._renderer.domElement.classList.add(this.componentUtils.className('__canvas'));
            this.node.appendChild(this._renderer.domElement);
            // camera
            const camera = new three_full_1.OrthographicCamera(-this._offsetWidth * 0.5, this._offsetWidth * 0.5, this._offsetHeight * 0.5, -this._offsetHeight * 0.5, 1, 10000);
            camera.position.z = 100;
            // scene
            const scene = new three_full_1.Scene();
            scene.add(camera);
            const texturedMaterial = yield this._loadTexturedMaterial(image);
            // plane
            this._plane = new three_full_1.Mesh(new three_full_1.PlaneGeometry(this._offsetWidth, this._offsetHeight), texturedMaterial);
            this._plane.overdraw = true;
            scene.add(this._plane);
            // add subtle ambient lighting
            const ambientLight = new three_full_1.AmbientLight(0x555555);
            scene.add(ambientLight);
            // add directional light source
            const directionalLight = new three_full_1.DirectionalLight(0xffffff);
            directionalLight.position.set(1, 1, 1).normalize();
            scene.add(directionalLight);
            this._composer = new three_full_1.EffectComposer(this._renderer);
            this._composer.addPass(new three_full_1.RenderPass(scene, camera));
            const glitchDtSize = 64;
            const glitchPass = new glitchPass_1.default(glitchDtSize);
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
            const texturedMaterial = new three_full_1.MeshBasicMaterial({
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
            const loader = new three_full_1.TextureLoader();
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
        this._timeoutTimer = new s_timer_1.default(this.props.minTimeout +
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
        this._glitchTimer = new s_timer_1.default(duration, {
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
exports.default = SGlitchFeature;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdFQUFpRDtBQUNqRCxvRUFBNkM7QUFDN0MsdURBQXlEO0FBQ3pELGtHQUE0RTtBQUU1RSw4REFBd0M7QUFDeEMsMkNBWW9CO0FBQ3BCLGtFQUEwQztBQUUxQyxzREFBZ0M7QUE0VFgsaUJBNVRkLGdCQUFRLENBNFRZO0FBMVQzQixhQUFhO0FBQ2Isb0dBQTZELENBQUMsK0JBQStCO0FBeUM3RixNQUFxQixjQUFlLFNBQVEsbUJBQVU7SUFDbEQsYUFBYTtJQUNiLFlBQVksSUFBWSxFQUFFLElBQWlCLEVBQUUsUUFBYTtRQUN0RCxLQUFLLENBQ0QsSUFBSSxFQUNKLElBQUksRUFDSixJQUFBLG9CQUFXLEVBQ1A7WUFDSSxJQUFJLEVBQUUsVUFBVTtZQUNoQixTQUFTLEVBQUUsaUNBQXlCO1lBQ3BDLEtBQUssRUFBRSw4QkFBSztTQUNmLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUFxRUUsaUJBQVksR0FBRyxDQUFDLENBQUM7UUFDakIsa0JBQWEsR0FBRyxDQUFDLENBQUM7UUFzR2xCLHNCQUFpQixHQUFHLEtBQUssQ0FBQztRQXVDMUIsZ0JBQVcsR0FBRyxLQUFLLENBQUM7SUFsTjVCLENBQUM7SUFJSyxLQUFLOztZQUNQLElBQUk7Z0JBQ0EsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQzVDLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO2dCQUUxRCxpQkFBaUI7Z0JBQ2pCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2dCQUN6QixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztnQkFFeEIsT0FBTztn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