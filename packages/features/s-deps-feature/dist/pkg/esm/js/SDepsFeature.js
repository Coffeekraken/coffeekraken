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
    static registerDeps(selector, props = {}) {
        __querySelectorLive(selector, ($elm) => __awaiter(this, void 0, void 0, function* () {
            // wait for element to be near the viewport
            yield __whenNearViewport($elm);
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
export function define(props = {}, name = 's-deps') {
    __SFeature.defineFeature(name, SDepsFeature, Object.assign({ mountWhen: 'nearViewport' }, props));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sa0JBQWtCLE1BQU0sb0RBQW9ELENBQUM7QUFDcEYsT0FBTyxzQkFBc0IsTUFBTSx3REFBd0QsQ0FBQztBQUM1RixPQUFPLG1CQUFtQixNQUFNLG9EQUFvRCxDQUFDO0FBQ3JGLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sdUJBQXVCLE1BQU0sbUNBQW1DLENBQUM7QUF5Q3hFLE1BQU0sQ0FBQyxPQUFPLE9BQU8sWUFBYSxTQUFRLFVBQVU7SUFDaEQsTUFBTSxDQUFDLFlBQVksQ0FDZixRQUFnQixFQUNoQixRQUFxQyxFQUFFO1FBRXZDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxDQUFPLElBQUksRUFBRSxFQUFFO1lBQ3pDLDJDQUEyQztZQUMzQyxNQUFNLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBRS9CLHVCQUF1QjtZQUN2QixLQUFLLEdBQUcsdUJBQXVCLENBQUMsS0FBSyxDQUFDLEtBQUssYUFBTCxLQUFLLGNBQUwsS0FBSyxHQUFJLEVBQUUsQ0FBQyxDQUFDO1lBRW5ELHNCQUFzQjtZQUN0QixJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzVDLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxNQUFNLENBQUMsa0NBQWtDLENBQ3JDLElBQUksRUFDSixRQUFxQyxFQUFFO1FBRXZDLE1BQU07UUFDTixJQUFJLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3BDLE9BQU87U0FDVjtRQUVELDRCQUE0QjtRQUM1QixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FB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