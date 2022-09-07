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
import { __whenStylesheetsReady } from '@coffeekraken/sugar/dom';
import { __querySelectorLive } from '@coffeekraken/sugar/dom';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sa0JBQWtCLE1BQU0sb0RBQW9ELENBQUM7QUFDcEYsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDakUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyx1QkFBdUIsTUFBTSxtQ0FBbUMsQ0FBQztBQXlDeEUsTUFBTSxDQUFDLE9BQU8sT0FBTyxZQUFhLFNBQVEsVUFBVTtJQXFJaEQsYUFBYTtJQUNiLFlBQVksSUFBWSxFQUFFLElBQWlCLEVBQUUsUUFBYTtRQUN0RCxLQUFLLENBQ0QsSUFBSSxFQUNKLElBQUksRUFDSixXQUFXLENBQ1A7WUFDSSxJQUFJLEVBQUUsUUFBUTtZQUNkLFNBQVMsRUFBRSx1QkFBdUI7WUFDbEMsZ0JBQWdCO1NBQ25CLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7SUFDTixDQUFDO0lBakpELE1BQU0sQ0FBQyxZQUFZLENBQ2YsUUFBZ0IsRUFDaEIsUUFBcUMsRUFBRTtRQUV2QyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsQ0FBTyxJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1lBQ3JELDJDQUEyQztZQUMzQyxNQUFNLHVCQUF1QixHQUFHLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXpELG9EQUFvRDtZQUNwRCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDL0MsYUFBYTtnQkFDYixJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxLQUFLLFFB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