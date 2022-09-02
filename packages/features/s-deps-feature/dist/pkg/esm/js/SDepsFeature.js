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
import __whenNearViewport from '@coffeekraken/sugar/js/dom/detect/whenNearViewport';
import __whenStylesheetsReady from '@coffeekraken/sugar/js/dom/detect/whenStylesheetsReady';
import __querySelectorLive from '@coffeekraken/sugar/js/dom/query/querySelectorLive';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SDepsFeatureInterface from './interface/SDepsFeatureInterface';
export default class SDepsFeature extends __SFeature {
    // @ts-ignore
    constructor(name, node, settings) {
        super(name, node, __deepMerge({
            name: 's-deps',
            interface: __SDepsFeatureInterface,
            // style: __css,
        }, settings !== null && settings !== void 0 ? settings : {}));
    }
    static registerDeps(selector, props = {}) {
        __querySelectorLive(selector, ($elm, { cancel }) => __awaiter(this, void 0, void 0, function* () {
            // wait for element to be near the viewport
            const whenNearViewportPromise = __whenNearViewport($elm);
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
            props = __SDepsFeatureInterface.apply(props !== null && props !== void 0 ? props : {});
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
            yield __whenStylesheetsReady($link);
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
SDepsFeature.resolvedSelectors = [];
export function define(props = {}, name = 's-deps') {
    __SFeature.defineFeature(name, SDepsFeature, Object.assign({ mountWhen: 'nearViewport' }, props));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sa0JBQWtCLE1BQU0sb0RBQW9ELENBQUM7QUFDcEYsT0FBTyxzQkFBc0IsTUFBTSx3REFBd0QsQ0FBQztBQUM1RixPQUFPLG1CQUFtQixNQUFNLG9EQUFvRCxDQUFDO0FBQ3JGLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sdUJBQXVCLE1BQU0sbUNBQW1DLENBQUM7QUF5Q3hFLE1BQU0sQ0FBQyxPQUFPLE9BQU8sWUFBYSxTQUFRLFVBQVU7SUFxSWhELGFBQWE7SUFDYixZQUFZLElBQVksRUFBRSxJQUFpQixFQUFFLFFBQWE7UUFDdEQsS0FBSyxDQUNELElBQUksRUFDSixJQUFJLEVBQ0osV0FBVyxDQUNQO1lBQ0ksSUFBSSxFQUFFLFFBQVE7WUFDZCxTQUFTLEVBQUUsdUJBQXVCO1lBQ2xDLGdCQUFnQjtTQUNuQixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQWpKRCxNQUFNLENBQUMsWUFBWSxDQUNmLFFBQWdCLEVBQ2hCLFFBQXFDLEVBQUU7UUFFdkMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLENBQU8sSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtZQUNyRCwyQ0FBMkM7WUFDM0MsTUFBTSx1QkFBdUIsR0FBRyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUV6RCxvREFBb0Q7WUFDcEQsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQy9DLGFBQWE7Z0JBQ2IsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsS0FBSyxRQUFRLEVBQUU7b0JBQ2hDLHVCQUF1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