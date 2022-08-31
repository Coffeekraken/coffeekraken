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
const whenNearViewport_1 = __importDefault(require("@coffeekraken/sugar/js/dom/detect/whenNearViewport"));
const whenStylesheetsReady_1 = __importDefault(require("@coffeekraken/sugar/js/dom/detect/whenStylesheetsReady"));
const querySelectorLive_1 = __importDefault(require("@coffeekraken/sugar/js/dom/query/querySelectorLive"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const SDepsFeatureInterface_1 = __importDefault(require("./interface/SDepsFeatureInterface"));
class SDepsFeature extends s_feature_1.default {
    static registerDeps(selector, props = {}) {
        (0, querySelectorLive_1.default)(selector, ($elm) => __awaiter(this, void 0, void 0, function* () {
            // wait for element to be near the viewport
            yield (0, whenNearViewport_1.default)($elm);
            // process passed props
            props = SDepsFeatureInterface_1.default.apply(props !== null && props !== void 0 ? props : {});
            // handle dependencies
            this._handleDepsForElement($elm, props);
        }));
    }
    /**
     * Check if all is loaded and add the "ready" class and attribute
     */
    static _checkAndApplyReadyStateForElement($elm, props = {}) {
        // css
        if (props.css && !$elm._sDepsCssLoaded) {
            return;
        }
        // apply class and attribute
        $elm.setAttribute('ready', 'true');
        $elm.classList.add('ready');
    }
    /**
     * Handle css dependencies for the passed element
     */
    static _handleCssDepsForElement($elm, props = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            // check if a partial already exists for this
            const $existing = document.querySelector(`link[s-deps-css="${props.css}"]`);
            if ($existing) {
                // mark the element css as loaded
                $elm._sDepsCssLoaded = true;
                // check and apply ready state
                this._checkAndApplyReadyStateForElement($elm, props);
            }
            // create a new link to add in the head
            let finalPartialPath = props.css;
            // @ts-ignore
            if (!finalPartialPath.match(/\.css$/)) {
                finalPartialPath += '.css';
            }
            const $link = document.createElement('link');
            $link.setAttribute('rel', 'stylesheet');
            // @ts-ignore
            $link.setAttribute('s-deps-css', props.css);
            $link.setAttribute('href', `${props.cssPartialsPath}/${finalPartialPath}`);
            // add the link in the head section
            document.head.appendChild($link);
            // wait for stylesheet to be ready
            yield (0, whenStylesheetsReady_1.default)($link);
            // mark the element css as loaded
            $elm._sDepsCssLoaded = true;
            // check and apply ready state
            this._checkAndApplyReadyStateForElement($elm, props);
        });
    }
    /**
     * Load a partial if needed
     */
    static _handleDepsForElement($elm, props = {}) {
        if (props.css) {
            this._handleCssDepsForElement($elm, props);
        }
    }
    // @ts-ignore
    constructor(name, node, settings) {
        super(name, node, (0, deepMerge_1.default)({
            name: 's-deps',
            interface: SDepsFeatureInterface_1.default,
            // style: __css,
        }, settings !== null && settings !== void 0 ? settings : {}));
    }
    mount() {
        return __awaiter(this, void 0, void 0, function* () {
            // handle partial stylesheet loading
            // @ts-ignore
            SDepsFeature._handleDepsForElement(this.node, this.props);
        });
    }
}
exports.default = SDepsFeature;
function define(props = {}, name = 's-deps') {
    s_feature_1.default.defineFeature(name, SDepsFeature, Object.assign({ mountWhen: 'nearViewport' }, props));
}
exports.define = define;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdFQUFpRDtBQUNqRCwwR0FBb0Y7QUFDcEYsa0hBQTRGO0FBQzVGLDJHQUFxRjtBQUNyRiw0RkFBc0U7QUFDdEUsOEZBQXdFO0FBeUN4RSxNQUFxQixZQUFhLFNBQVEsbUJBQVU7SUFDaEQsTUFBTSxDQUFDLFlBQVksQ0FDZixRQUFnQixFQUNoQixRQUFxQyxFQUFFO1FBRXZDLElBQUEsMkJBQW1CLEVBQUMsUUFBUSxFQUFFLENBQU8sSUFBSSxFQUFFLEVBQUU7WUFDekMsMkNBQTJDO1lBQzNDLE1BQU0sSUFBQSwwQkFBa0IsRUFBQyxJQUFJLENBQUMsQ0FBQztZQUUvQix1QkFBdUI7WUFDdkIsS0FBSyxHQUFHLCtCQUF1QixDQUFDLEtBQUssQ0FBQyxLQUFLLGFBQUwsS0FBSyxjQUFMLEtBQUssR0FBSSxFQUFFLENBQUMsQ0FBQztZQUVuRCxzQkFBc0I7WUFDdEIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM1QyxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOztPQUVHO0lBQ0gsTUFBTSxDQUFDLGtDQUFrQyxDQUNyQyxJQUFJLEVBQ0osUUFBcUMsRUFBRTtRQUV2QyxNQUFNO1FBQ04sSUFBSSxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUNwQyxPQUFPO1NBQ1Y7UUFFRCw0QkFBNEI7UUFDNUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsTUFBTSxDQUFPLHdCQUF3QixDQUNqQyxJQUFpQixFQUNqQixRQUFxQyxFQUFF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