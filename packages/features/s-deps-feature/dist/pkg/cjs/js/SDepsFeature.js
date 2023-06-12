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
const dom_1 = require("@coffeekraken/sugar/dom");
const whenNearViewport_1 = __importDefault(require("@coffeekraken/sugar/js/dom/detect/whenNearViewport"));
const object_1 = require("@coffeekraken/sugar/object");
const SDepsFeatureInterface_1 = __importDefault(require("./interface/SDepsFeatureInterface"));
const define_1 = __importDefault(require("./define"));
exports.define = define_1.default;
class SDepsFeature extends s_feature_1.default {
    static registerDeps(selector, props = {}) {
        (0, dom_1.__querySelectorLive)(selector, ($elm, { cancel }) => __awaiter(this, void 0, void 0, function* () {
            // wait for element to be near the viewport
            const whenNearViewportPromise = (0, whenNearViewport_1.default)($elm);
            // listen when an element has come near the viewport
            document.addEventListener('s-deps.resolved', (e) => {
                // @ts-ignore
                if (e.detail.selector === selector) {
                    whenNearViewportPromise.cancel();
                }
            });
            // wait for the node to comes near the viewport
            yield whenNearViewportPromise;
            // check if the selector has already been resolved
            // to avoid handling same selector multiple times
            if (this.resolvedSelectors.includes(selector)) {
                return;
            }
            // add the selector in the resolved stack to track them
            this.resolvedSelectors.push(selector);
            // when the first item is in the viewport, emit an event through the document
            // to let the others to stop listening
            document.dispatchEvent(new CustomEvent('s-deps.resolved', {
                detail: {
                    selector,
                    $elm,
                },
            }));
            // stop listening this selector
            cancel();
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
            $link.setAttribute('rel', 'preload');
            $link.setAttribute('as', 'style');
            $link.setAttribute('href', `${props.cssPartialsPath}/${finalPartialPath}`);
            // add the link in the head section
            document.head.appendChild($link);
            // wait for stylesheet to be ready
            yield (0, dom_1.__whenStylesheetsReady)($link);
            // put link in stylesheet again
            $link.setAttribute('rel', 'stylesheet');
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
        super(name, node, (0, object_1.__deepMerge)({
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
SDepsFeature.resolvedSelectors = [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdFQUFpRDtBQUNqRCxpREFHaUM7QUFDakMsMEdBQW9GO0FBQ3BGLHVEQUF5RDtBQUN6RCw4RkFBd0U7QUFFeEUsc0RBQWdDO0FBcU1YLGlCQXJNZCxnQkFBUSxDQXFNWTtBQTVKM0IsTUFBcUIsWUFBYSxTQUFRLG1CQUFVO0lBRWhELE1BQU0sQ0FBQyxZQUFZLENBQ2YsUUFBZ0IsRUFDaEIsUUFBcUMsRUFBRTtRQUV2QyxJQUFBLHlCQUFtQixFQUFDLFFBQVEsRUFBRSxDQUFPLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7WUFDckQsMkNBQTJDO1lBQzNDLE1BQU0sdUJBQXVCLEdBQUcsSUFBQSwwQkFBa0IsRUFBQyxJQUFJLENBQUMsQ0FBQztZQUV6RCxvREFBb0Q7WUFDcEQsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQy9DLGFBQWE7Z0JBQ2IsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsS0FBSyxRQUFRLEVBQUU7b0JBQ2hDLHVCQUF1QixDQUFDLE1BQU0sRUFBRSxDQUFDO2lCQUNwQztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsK0NBQStDO1lBQy9DLE1BQU0sdUJBQXVCLENBQUM7WUFFOUIsa0RBQWtEO1lBQ2xELGlEQUFpRDtZQUNqRCxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQzNDLE9BQU87YUFDVjtZQUVELHVEQUF1RDtZQUN2RCxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRXRDLDZFQUE2RTtZQUM3RSxzQ0FBc0M7WUFDdEMsUUFBUSxDQUFDLGFBQWEsQ0FDbEIsSUFBSSxXQUFXLENBQUMsaUJB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