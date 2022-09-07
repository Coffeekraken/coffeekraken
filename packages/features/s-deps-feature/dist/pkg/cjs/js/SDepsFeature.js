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
const dom_1 = require("@coffeekraken/sugar/dom");
const dom_2 = require("@coffeekraken/sugar/dom");
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const SDepsFeatureInterface_1 = __importDefault(require("./interface/SDepsFeatureInterface"));
class SDepsFeature extends s_feature_1.default {
    // @ts-ignore
    constructor(name, node, settings) {
        super(name, node, (0, deepMerge_1.default)({
            name: 's-deps',
            interface: SDepsFeatureInterface_1.default,
            // style: __css,
        }, settings !== null && settings !== void 0 ? settings : {}));
    }
    static registerDeps(selector, props = {}) {
        (0, dom_2.__querySelectorLive)(selector, ($elm, { cancel }) => __awaiter(this, void 0, void 0, function* () {
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
function define(props = {}, name = 's-deps') {
    s_feature_1.default.defineFeature(name, SDepsFeature, Object.assign({ mountWhen: 'nearViewport' }, props));
}
exports.define = define;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdFQUFpRDtBQUNqRCwwR0FBb0Y7QUFDcEYsaURBQWlFO0FBQ2pFLGlEQUE4RDtBQUM5RCw0RkFBc0U7QUFDdEUsOEZBQXdFO0FBeUN4RSxNQUFxQixZQUFhLFNBQVEsbUJBQVU7SUFxSWhELGFBQWE7SUFDYixZQUFZLElBQVksRUFBRSxJQUFpQixFQUFFLFFBQWE7UUFDdEQsS0FBSyxDQUNELElBQUksRUFDSixJQUFJLEVBQ0osSUFBQSxtQkFBVyxFQUNQO1lBQ0ksSUFBSSxFQUFFLFFBQVE7WUFDZCxTQUFTLEVBQUUsK0JBQXVCO1lBQ2xDLGdCQUFnQjtTQUNuQixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQWpKRCxNQUFNLENBQUMsWUFBWSxDQUNmLFFBQWdCLEVBQ2hCLFFBQXFDLEVBQUU7UUFFdkMsSUFBQSx5QkFBbUIsRUFBQyxRQUFRLEVBQUUsQ0FBTyxJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1lBQ3JELDJDQUEyQztZQUMzQyxNQUFNLHVCQUF1QixHQUFHLElBQUEsMEJBQWtCLEVBQUMsSUFBSSxDQUFDLENBQUM7WUFFekQsb0RBQW9EO1lBQ3BELFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUMvQyxhQUFhO2dCQUNiLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEtBQUssUUFBUSxFQUFFO29CQUNoQyx1QkFBdUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQztpQkFDcEM7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVILCtDQUErQztZQUMvQyxNQUFNLHVCQUF1QixDQUFDO1lBRTlCLGtEQUFrRDtZQUNsRCxpREFBaUQ7WUFDakQsSUFB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