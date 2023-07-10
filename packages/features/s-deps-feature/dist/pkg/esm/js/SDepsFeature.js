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
import { __querySelectorLive, __readCssDataFrom, __whenNearViewport, __whenStylesheetsReady, } from '@coffeekraken/sugar/dom';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __SDepsFeatureInterface from './interface/SDepsFeatureInterface';
export default class SDepsFeature extends __SFeature {
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
        // @ts-ignore
        if (props.css && !$elm._sDepsCssStack) {
            return;
        }
        // @ts-ignore
        if ($elm._sDepsCssStack.length) {
            return;
        }
        // apply class and attribute
        $elm.setAttribute('resolved', 'true');
        $elm.classList.add('resolved');
    }
    /**
     * Handle css dependencies for the passed element
     */
    static _handleCssDepsForElement($elm, props = {}) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            // create a new link to add in the head
            let finalDepsPath = props.css.split(',').map((l) => l.trim());
            // store in the element hte css deps to load as an array.
            // each deps when loaded will be removed from the array
            // @ts-ignore
            $elm._sDepsCssStack = finalDepsPath;
            // loop on all the css deps specified
            // @ts-ignore
            for (let [i, finalDepPath] of finalDepsPath.entries()) {
                // check if we have some "chunks" in the cssFrontData
                // that is coming from the postcssSugarPlugin.
                // if not, accept all chunks. if some, check if the requested chunk is in the list
                if (finalDepPath.match(/[a-zA-Z0-9_-]+/) &&
                    SDepsFeature._cssFrontData.chunks) {
                    if (!((_b = (_a = SDepsFeature._cssFrontData.chunks).includes) === null || _b === void 0 ? void 0 : _b.call(_a, finalDepPath))) {
                        continue;
                    }
                }
                // check if a partial already exists for this
                const $existing = document.querySelector(`link[s-deps-css="${finalDepPath}"]`);
                if ($existing) {
                    // mark the element css as loaded
                    // @ts-ignore
                    (_d = (_c = $elm._sDepsCssStack) === null || _c === void 0 ? void 0 : _c.splice) === null || _d === void 0 ? void 0 : _d.call(_c, 
                    // @ts-ignore
                    $elm._sDepsCssStack.indexOf(finalDepPath), 1);
                    // check and apply ready state
                    this._checkAndApplyReadyStateForElement($elm, props);
                    // continue to next
                    continue;
                }
                // @ts-ignore
                if (!finalDepPath.match(/\.css$/)) {
                    finalDepPath += '.css';
                }
                const $link = document.createElement('link');
                $link.setAttribute('rel', 'stylesheet');
                // @ts-ignore
                $link.setAttribute('s-deps-css', props.css);
                $link.setAttribute('rel', 'preload');
                $link.setAttribute('as', 'style');
                $link.setAttribute('href', `${props.cssChunksBasePath}/${finalDepPath}`);
                // add the link in the head section
                document.head.appendChild($link);
                // wait for stylesheet to be ready
                const promise = __whenStylesheetsReady($link);
                // when loaded
                promise.then(() => {
                    var _a, _b;
                    // put link in stylesheet again
                    $link.setAttribute('rel', 'stylesheet');
                    // mark the element css as loaded
                    // @ts-ignore
                    (_b = (_a = $elm._sDepsCssStack) === null || _a === void 0 ? void 0 : _a.splice) === null || _b === void 0 ? void 0 : _b.call(_a, 
                    // @ts-ignore
                    $elm._sDepsCssStack.indexOf(finalDepPath), 1);
                    // check and apply ready state
                    this._checkAndApplyReadyStateForElement($elm, props);
                });
            }
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
        super(name, node, __deepMerge({
            name: 's-deps',
            interface: __SDepsFeatureInterface,
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
SDepsFeature._cssFrontData = __readCssDataFrom(document.body);
SDepsFeature.resolvedSelectors = [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sRUFDSCxtQkFBbUIsRUFDbkIsaUJBQWlCLEVBQ2pCLGtCQUFrQixFQUNsQixzQkFBc0IsR0FDekIsTUFBTSx5QkFBeUIsQ0FBQztBQUNqQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyx1QkFBdUIsTUFBTSxtQ0FBbUMsQ0FBQztBQXlDeEUsTUFBTSxDQUFDLE9BQU8sT0FBTyxZQUFhLFNBQVEsVUFBVTtJQUdoRCxNQUFNLENBQUMsWUFBWSxDQUNmLFFBQWdCLEVBQ2hCLFFBQXFDLEVBQUU7UUFFdkMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLENBQU8sSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtZQUNyRCwyQ0FBMkM7WUFDM0MsTUFBTSx1QkFBdUIsR0FBRyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUV6RCxvREFBb0Q7WUFDcEQsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQy9DLGFBQWE7Z0JBQ2IsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsS0FBSyxRQUFRLEVBQUU7b0JBQ2hDLHVCQUF1QixDQUFDLE1BQU0sRUFBRSxDQUFDO2lCQUNwQztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsK0NBQStDO1lBQy9DLE1BQU0sdUJBQXVCLENBQUM7WUFFOUIsa0RBQWtEO1lBQ2xELGlEQUFpRDtZQUNqRCxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQzNDLE9BQU87YUFDVjtZQUVELHVEQUF1RDtZQUN2RCxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxD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