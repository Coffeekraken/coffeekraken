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
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SPageTransitionFeatureInterface from './interface/SPageTransitionFeatureInterface';
import __SRequest from '@coffeekraken/s-request';
import __querySelectorUp from '@coffeekraken/sugar/js/dom/query/querySelectorUp';
import __scrollTo from '@coffeekraken/sugar/js/dom/scroll/scrollTo';
/**
 * @name            SPageTransitionFeature
 * @namespace       js
 * @type            Feature
 * @interface       ./interface/SPageTransitionFeatureInterface.js
 * @menu            Styleguide / Features               /styleguide/feature/s-page-transition-feature
 * @platform        js
 * @status          beta
 *
 * This feature allows you to add page transition to your size by using ajax requests and configurable
 * transition effects.
 *
 * @support          chromium
 * @support          firefox
 * @support          safari
 * @support          edge
 *
 * @example         html            Simple click activation
 * <div s-page-transition></div>
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SPageTransitionFeature extends __SFeature {
    constructor(name, node, settings) {
        super(name, node, __deepMerge({
            componentUtils: {
                interface: __SPageTransitionFeatureInterface,
            },
            feature: {},
        }, settings !== null && settings !== void 0 ? settings : {}));
        // save arrival state
        window.history.pushState({
            html: this.node.innerHTML
        }, document.title, document.location.href);
        // handle popstate
        window.addEventListener('popstate', (e) => {
            var _a;
            if (!((_a = e.state) === null || _a === void 0 ? void 0 : _a.html))
                return;
            if (e.state.containerId) {
                const $elm = document.querySelector(`[s-page-transition-container="${e.state.containerId}"]`);
                if (!$elm)
                    return;
                $elm.innerHTML = e.state.html;
                __scrollTo($elm);
            }
            else {
                this.node.innerHTML = e.state.html;
                __scrollTo(this.node);
            }
        });
        // listen for "location.href" event
        window.addEventListener('location.href', (e) => {
            this.transitionTo(e.detail, e.target);
        });
        // listen for clicks to prevent default behaviors
        window.addEventListener('click', (e) => {
            const $target = e.target;
            // @ts-ignore          
            if ($target.hasAttribute('href') && !$target.getAttribute('href').match(/^https?:\/\//) && !$target.hasAttribute('target')) {
                e.preventDefault();
                this.transitionTo($target.getAttribute('href'), $target);
            }
            else {
                const $upHrefElm = __querySelectorUp($target, 'a[href]');
                if ($upHrefElm) {
                    e.preventDefault();
                    this.transitionTo($upHrefElm.getAttribute('href'), $upHrefElm);
                }
            }
        });
    }
    mount() { }
    transitionTo(url, $source) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e;
            // dispatch an event
            $source.dispatchEvent(new CustomEvent('page-transition-start', {
                detail: {
                    url
                },
                bubbles: true
            }));
            // add classes
            document.body.classList.add('s-page-transition');
            document.body.classList.add('loading');
            document.body.setAttribute('loading', true);
            $source.classList.add('s-page-transition-source');
            $source.classList.add('loading');
            $source.setAttribute('loading', true);
            // before callback
            (_b = (_a = this.props).before) === null || _b === void 0 ? void 0 : _b.call(_a, {
                url,
                $source
            });
            const request = new __SRequest({
                url
            });
            const response = yield request.send();
            console.log(response);
            const domParser = new DOMParser();
            const dom = domParser.parseFromString((_c = response.data) !== null && _c !== void 0 ? _c : '', 'text/html');
            // get the main containers in each "pages"
            const $inPageContainer = document.querySelector('[s-page-transition]');
            const $container = dom.querySelector('[s-page-transition]');
            // get the scoped containers in each "pages"
            const $inPageScopedContainer = document.querySelector('[s-page-transition-container]');
            const $scopedContainer = dom.querySelector('[s-page-transition-container]');
            // if no container in one of the page, reject
            if (!$container || !$inPageContainer) {
                return reject();
            }
            // patching the body tag if requested
            if (this.props.patchBody) {
                const $inPageBody = document.querySelector('body');
                const $newBody = dom.querySelector('body');
                if ($inPageBody && $newBody) {
                    const newAttrNames = [];
                    // @ts-ignore
                    for (let attr of $newBody.attributes) {
                        $inPageBody.setAttribute(attr.name, attr.value);
                        newAttrNames.push(attr.name);
                    }
                    // @ts-ignore
                    for (let attr of $inPageBody.attributes) {
                        if (!newAttrNames.includes(attr.name)) {
                            $inPageBody.removeAttribute(attr.name);
                        }
                    }
                }
            }
            let newState = {};
            // if we have scoped containers in each "pages" and they match each other
            // we remplace only this content
            if ($inPageScopedContainer && $scopedContainer && ($inPageScopedContainer === null || $inPageScopedContainer === void 0 ? void 0 : $inPageScopedContainer.getAttribute('s-page-transition-container')) === $scopedContainer.getAttribute('s-page-transition-container')) {
                $inPageScopedContainer.innerHTML = $scopedContainer.innerHTML;
                newState.html = $scopedContainer.innerHTML;
                newState.containerId = $scopedContainer.getAttribute('s-page-transition-container');
            }
            else {
                // otherwise, we replace the main container
                $inPageContainer.innerHTML = $container.innerHTML;
                newState.html = $container.innerHTML;
            }
            // push a new state
            window.history.pushState(newState, document.title, url);
            // scrolltop if needed
            if (this.props.scrollTop) {
                // @ts-ignore
                __scrollTo($inPageScopedContainer !== null && $inPageScopedContainer !== void 0 ? $inPageScopedContainer : $inPageContainer);
            }
            // remove class on body
            document.body.classList.remove('s-page-transition');
            document.body.classList.remove('loading');
            document.body.removeAttribute('loading');
            $source.classList.remove('s-page-transition-source');
            $source.classList.remove('loading');
            $source.removeAttribute('loading');
            // before callback
            (_e = (_d = this.props).after) === null || _e === void 0 ? void 0 : _e.call(_d, {
                url,
                $source
            });
            // dispatch an event
            $source.dispatchEvent(new CustomEvent('page-transition-end', {
                detail: {
                    url
                },
                bubbles: true
            }));
        }));
    }
}
export function define(props = {}, name = 's-page-transition') {
    __SFeature.defineFeature(name, SPageTransitionFeature, props);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1BhZ2VUcmFuc2l0aW9uRmVhdHVyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNQYWdlVHJhbnNpdGlvbkZlYXR1cmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxpQ0FBaUMsTUFBTSw2Q0FBNkMsQ0FBQztBQUM1RixPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLGlCQUFpQixNQUFNLGtEQUFrRCxDQUFDO0FBQ2pGLE9BQU8sVUFBVSxNQUFNLDRDQUE0QyxDQUFDO0FBU3BFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sT0FBTyxzQkFBdUIsU0FBUSxVQUFVO0lBRTFELFlBQVksSUFBWSxFQUFFLElBQWlCLEVBQUUsUUFBYTtRQUN0RCxLQUFLLENBQ0QsSUFBSSxFQUNKLElBQUksRUFDSixXQUFXLENBQ1A7WUFDSSxjQUFjLEVBQUU7Z0JBQ1osU0FBUyxFQUFFLGlDQUFpQzthQUMvQztZQUNELE9BQU8sRUFBRSxFQUFFO1NBQ2QsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQUVGLHFCQUFxQjtRQUNyQixNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztZQUNyQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTO1NBQzVCLEVBQUUsUUFBUSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTNDLGtCQUFrQjtRQUNsQixNQUFNLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7O1lBQ3RDLElBQUksQ0FBQyxDQUFBLE1BQUEsQ0FBQyxDQUFDLEtBQUssMENBQUUsSUFBSSxD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