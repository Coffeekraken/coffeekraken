var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SEnv from '@coffeekraken/s-env';
import __SFeature from '@coffeekraken/s-feature';
import __SRequest from '@coffeekraken/s-request';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __querySelectorUp } from '@coffeekraken/sugar/dom';
import __scrollTo from '@coffeekraken/sugar/js/dom/scroll/scrollTo';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SPageTransitionFeatureInterface from './interface/SPageTransitionFeatureInterface';
// @ts-ignore
import __css from '../../../../src/css/s-page-transition.css'; // relative to /dist/pkg/esm/js
/**
 * @name            SPageTransitionFeature
 * @as              Page transition
 * @namespace       js
 * @type            Feature
 * @interface       ./interface/SPageTransitionFeatureInterface.ts
 * @menu            Styleguide / Features               /styleguide/feature/s-page-transition-feature
 * @platform        js
 * @status          beta
 *
 * This feature allows you to add page transition to your size by using ajax requests and configurable
 * transition effects.
 *
 * @event           s-page-transition.start             Dispatched when a transition starts
 * @event           s-page-transition.end               Dispatch when a transition ends
 * @event           s-page-transition.error             Dispatch when an error occurs
 *
 * @support          chromium
 * @support          firefox
 * @support          safari
 * @support          edge
 *
 * @example         html            Simple example
 * <p class="s-typo:p">On your body tag, put the <span class="s-typo:code">s-page-transition</span> attribute</p>
 * <!-- <body s-page-transition> -->
 *   <p class="s-typo:p">This website is a perfect example of this feature behavior...</p>
 *   <a class="s-typo:a" href="/package/@coffeekraken/s-page-transition-feature/styleguide/feature/s-page-transition-feature">This link will reload this same page using a page transition...</a>
 * <!-- </body> -->
 *
 * @example         html            Update only a part of the page
 * <p class="s-typo:p">To update only a part of the UI, simply add the <span class="s-typo:code">s-page-transition-container="something"</span> on the part you want to be updated</p>
 * <p class="s-typo:p">If this same container exists in the loaded page, only this part will be updated.</p>
 * <!-- <body s-page-transition> -->
 *   <div s-page-transition-container="my-container">
 *      <p class="s-typo:p">This website is a perfect example of this feature behavior...</p>
 *      <a class="s-typo:a" href="/package/@coffeekraken/s-page-transition-feature/styleguide/feature/s-page-transition-feature">This link will reload this same page using a page transition...</a>
 *   </div>
 * <!-- </body> -->
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SPageTransitionFeature extends __SFeature {
    constructor(name, node, settings) {
        super(name, node, __deepMerge({
            interface: __SPageTransitionFeatureInterface,
            style: __css,
        }, settings !== null && settings !== void 0 ? settings : {}));
        // store the current url
        this._currentUrl = `${document.location.pathname}${document.location.search}`;
        // save arrival state
        window.history.pushState({
            html: this.node.innerHTML,
        }, document.title, document.location.href);
        // handle popstate
        window.addEventListener('popstate', (e) => {
            var _a;
            if (!((_a = e.state) === null || _a === void 0 ? void 0 : _a.html))
                return;
            if (e.state.containerId) {
                const $elm = document.querySelector(`[s-page-transition-container="${e.state.containerId}"]`);
                if (!$elm) {
                    return;
                }
                $elm.innerHTML = e.state.html;
                __scrollTo($elm);
            }
            else {
                this.node.innerHTML = e.state.html;
                __scrollTo(this.node);
            }
        });
        // listen for "location.href" event
        document.addEventListener('location.href', (e) => {
            this.transitionTo(e.detail, e.target).catch((e) => { });
        });
        // listen for clicks to prevent default behaviors
        document.addEventListener('click', (e) => {
            const $target = e.target;
            // @ts-ignore
            if (this._isEligibleLink($target)) {
                e.preventDefault();
                this.transitionTo($target.getAttribute('href'), $target).catch((e) => { });
            }
            else {
                const $upHrefElm = __querySelectorUp($target, 'a[href]');
                if ($upHrefElm && this._isEligibleLink($upHrefElm)) {
                    e.preventDefault();
                    this.transitionTo($upHrefElm.getAttribute('href'), $upHrefElm).catch((e) => { });
                }
            }
        });
    }
    mount() { }
    _isEligibleLink($link) {
        return ($link.tagName === 'A' && $link.hasAttribute('href') &&
            // @ts-ignore
            !$link.getAttribute('href').match(/^https?:\/\//) &&
            // @ts-ignore
            !$link.getAttribute('href').match(/^#/) &&
            !$link.hasAttribute('target'));
    }
    transitionTo(url, $source) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            // dispatch an event
            this.componentUtils.dispatchEvent('start', {
                $elm: $source,
                detail: {
                    url
                }
            });
            // add classes
            document.body.classList.add('loading');
            document.body.setAttribute('loading', 'true');
            $source.classList.add('s-page-transition-source');
            $source.classList.add('loading');
            $source.setAttribute('loading', true);
            // before callback
            // @ts-ignore
            (_b = (_a = this.props).before) === null || _b === void 0 ? void 0 : _b.call(_a, {
                url,
                $source,
            });
            const request = new __SRequest({
                url,
            });
            let response;
            try {
                response = yield request.send();
            }
            catch (e) {
                response = e;
            }
            // handle error
            if (!response || response.status !== 200) {
                // after process with success
                this._onAfter($source, response.status, url);
                // stop here and reject
                return reject(response);
            }
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
                // after process with success
                this._onAfter($source, 500, url);
                // reject and stop here
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
            if ($inPageScopedContainer &&
                $scopedContainer &&
                ($inPageScopedContainer === null || $inPageScopedContainer === void 0 ? void 0 : $inPageScopedContainer.getAttribute('s-page-transition-container')) ===
                    $scopedContainer.getAttribute('s-page-transition-container')) {
                $inPageScopedContainer.innerHTML = $scopedContainer.innerHTML;
                newState.html = $scopedContainer.innerHTML;
                newState.containerId = $scopedContainer.getAttribute('s-page-transition-container');
            }
            else {
                // otherwise, we replace the main container
                $inPageContainer.innerHTML = $container.innerHTML;
                newState.html = $container.innerHTML;
            }
            // scrolltop if needed
            if (this.props.scrollTop) {
                // @ts-ignore
                __scrollTo($inPageScopedContainer !== null && $inPageScopedContainer !== void 0 ? $inPageScopedContainer : $inPageContainer);
            }
            // after process with success
            this._onAfter($source, 200, url, newState);
            // track pageView if gtag is present in the page
            if (window.gtag && __SEnv.is('production')) {
                const gaUid = typeof this.props.ga === 'string' ? this.props.ga : __SSugarConfig.get('google.ga');
                if (gaUid) {
                    window.gtag('event', 'page_view', {
                        page_title: document.title,
                        page_location: document.location.href,
                        page_path: document.location.pathname,
                        send_to: gaUid
                    });
                }
            }
            else if (window.gtag && this.props.verbose) {
                console.log(`%c[SPageTransitionFeature] Google analytics is activate and this transition to "${document.location.pathname}" will be correctly tracked in production environment`, 'color: lightGreen');
            }
            // resolve transition
            resolve();
        }));
    }
    /**
     * This function take care of handling the after transition process.
     * The code passed allows to know if the transition was a success (200) or an error (404|500)
     */
    _onAfter($source, code, url, newState) {
        var _a, _b, _c, _d;
        // remove class on body
        document.body.classList.remove('loading');
        document.body.removeAttribute('loading');
        $source.classList.remove('s-page-transition-source');
        $source.classList.remove('loading');
        $source.removeAttribute('loading');
        // before callback
        (_b = (_a = this.props).after) === null || _b === void 0 ? void 0 : _b.call(_a, {
            $source,
        });
        if (code !== 200) {
            // restore previous state
            history.replaceState('', '', this._currentUrl);
            // add the error class
            $source.classList.add('s-page-transition-source');
            $source.classList.add('error');
            $source.setAttribute('error', '');
            if (this.props.autoStyle) {
                $source.classList.add('s-tc:error');
            }
            // broken link icon
            // @ts-ignore
            if (this.props.injectBrokenLinkIcon && !$source.querySelector('[s-page-transition-broken-link-icon]')) {
                $source.innerHTML = `${$source.innerHTML}${this.props.brokenLinkIcon.replace(/^\<([a-z]+)/, '<$1 s-page-transition-broken-link-icon')}`;
            }
            // dispatch an error event
            this.componentUtils.dispatchEvent('error', {
                $elm: $source,
                detail: {
                    code,
                    $source
                }
            });
            // before callback
            (_d = (_c = this.props).onError) === null || _d === void 0 ? void 0 : _d.call(_c, {
                $source,
            });
        }
        // scroll to top
        __scrollTo('top');
        // push a new state
        if (code === 200 && newState && url) {
            window.history.pushState(newState, document.title, url);
            this._currentUrl = url;
        }
        // dispatch an event
        this.componentUtils.dispatchEvent('end', {
            $elm: $source,
            detail: {
                code,
                $source
            }
        });
    }
}
export function define(props = {}, name = 's-page-transition') {
    __SFeature.defineFeature(name, SPageTransitionFeature, props);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzVELE9BQU8sVUFBVSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3BFLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8saUNBQWlDLE1BQU0sNkNBQTZDLENBQUM7QUFFNUYsYUFBYTtBQUNiLE9BQU8sS0FBSyxNQUFNLDJDQUEyQyxDQUFDLENBQUMsK0JBQStCO0FBYTlGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlDRztBQUNILE1BQU0sQ0FBQyxPQUFPLE9BQU8sc0JBQXVCLFNBQVEsVUFBVTtJQU8xRCxZQUFZLElBQVksRUFBRSxJQUFpQixFQUFFLFFBQWE7UUFDdEQsS0FBSyxDQUNELElBQUksRUFDSixJQUFJLEVBQ0osV0FBVyxDQUNQO1lBQ0ksU0FBUyxFQUFFLGlDQUFpQztZQUM1QyxLQUFLLEVBQUUsS0FBSztTQUNmLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUFFRix3QkFBd0I7UUFDeEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFOUUscUJBQXFCO1FBQ3JCLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUNwQjtZQUNJLElBQUksRUFBRSxJQUFJLENBQUMs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