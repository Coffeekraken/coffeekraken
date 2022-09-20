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
const s_component_utils_1 = __importDefault(require("@coffeekraken/s-component-utils"));
const s_feature_1 = __importDefault(require("@coffeekraken/s-feature"));
const dom_1 = require("@coffeekraken/sugar/dom");
const whenNearViewport_1 = __importDefault(require("@coffeekraken/sugar/js/dom/detect/whenNearViewport"));
const object_1 = require("@coffeekraken/sugar/object");
const SDepsFeatureInterface_1 = __importDefault(require("./interface/SDepsFeatureInterface"));
const define_1 = __importDefault(require("./define"));
exports.define = define_1.default;
class SDepsFeature extends s_feature_1.default {
    // @ts-ignore
    constructor(name, node, settings) {
        super(name, node, (0, object_1.__deepMerge)({
            name: 's-deps',
            interface: SDepsFeatureInterface_1.default,
            // style: __css,
        }, settings !== null && settings !== void 0 ? settings : {}));
    }
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
        s_component_utils_1.default.fastdom.mutate(() => {
            $elm.setAttribute('ready', 'true');
            $elm.classList.add('ready');
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdGQUFnRTtBQUNoRSx3RUFBaUQ7QUFDakQsaURBR2lDO0FBQ2pDLDBHQUFvRjtBQUNwRix1REFBeUQ7QUFDekQsOEZBQXdFO0FBRXhFLHNEQUFnQztBQXVNWCxpQkF2TWQsZ0JBQVEsQ0F1TVk7QUE5SjNCLE1BQXFCLFlBQWEsU0FBUSxtQkFBVTtJQXVJaEQsYUFBYTtJQUNiLFlBQVksSUFBWSxFQUFFLElBQWlCLEVBQUUsUUFBYTtRQUN0RCxLQUFLLENBQ0QsSUFBSSxFQUNKLElBQUksRUFDSixJQUFBLG9CQUFXLEVBQ1A7WUFDSSxJQUFJLEVBQUUsUUFBUTtZQUNkLFNBQVMsRUFBRSwrQkFBdUI7WUFDbEMsZ0JBQWdCO1NBQ25CLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7SUFDTixDQUFDO0lBbkpELE1BQU0sQ0FBQyxZQUFZLENBQ2YsUUFBZ0IsRUFDaEIsUUFBcUMsRUFBRTtRQUV2QyxJQUFBLHlCQUFtQixFQUFDLFFBQVEsRUFBRSxDQUFPLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7WUFDckQsMkNBQTJDO1lBQzNDLE1BQU0sdUJBQXVCLEdBQUcsSUFBQSwwQkFBa0IsRUFBQyxJQUFJLENBQUMsQ0FBQztZQUV6RCxvREFBb0Q7WUFDcEQsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQy9DLGFBQWE7Z0JBQ2IsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsS0FBSyxRQUFRLEVBQUU7b0JBQ2hDLHVCQUF1QixDQUFDLE1BQU0sRUFBRSxDQUFDO2lCQUNwQztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsK0NBQStDO1lBQy9DLE1BQU0sdUJBQXVCLENB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