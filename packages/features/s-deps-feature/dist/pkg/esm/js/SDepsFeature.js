var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SComponentUtils from '@coffeekraken/s-component-utils';
import __SFeature from '@coffeekraken/s-feature';
import { __querySelectorLive, __whenStylesheetsReady, } from '@coffeekraken/sugar/dom';
import __whenNearViewport from '@coffeekraken/sugar/js/dom/detect/whenNearViewport';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __SDepsFeatureInterface from './interface/SDepsFeatureInterface';
import __define from './define';
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
        __SComponentUtils.fastdom.mutate(() => {
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
export { __define as define };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8saUJBQWlCLE1BQU0saUNBQWlDLENBQUM7QUFDaEUsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxFQUNILG1CQUFtQixFQUNuQixzQkFBc0IsR0FDekIsTUFBTSx5QkFBeUIsQ0FBQztBQUNqQyxPQUFPLGtCQUFrQixNQUFNLG9EQUFvRCxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLHVCQUF1QixNQUFNLG1DQUFtQyxDQUFDO0FBRXhFLE9BQU8sUUFBUSxNQUFNLFVBQVUsQ0FBQztBQXlDaEMsTUFBTSxDQUFDLE9BQU8sT0FBTyxZQUFhLFNBQVEsVUFBVTtJQXVJaEQsYUFBYTtJQUNiLFlBQVksSUFBWSxFQUFFLElBQWlCLEVBQUUsUUFBYTtRQUN0RCxLQUFLLENBQ0QsSUFBSSxFQUNKLElBQUksRUFDSixXQUFXLENBQ1A7WUFDSSxJQUFJLEVBQUUsUUFBUTtZQUNkLFNBQVMsRUFBRSx1QkFBdUI7WUFDbEMsZ0JBQWdCO1NBQ25CLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7SUFDTixDQUFDO0lBbkpELE1BQU0sQ0FBQyxZQUFZLENBQ2YsUUFBZ0IsRUFDaEIsUUFBcUMsRUFBRTtRQUV2QyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsQ0FBTyxJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1lBQ3JELDJDQUEyQztZQUMzQyxNQUFNLHVCQUF1QixHQUFHLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXpELG9EQUFvRDtZQUNwRCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDL0MsYUFB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