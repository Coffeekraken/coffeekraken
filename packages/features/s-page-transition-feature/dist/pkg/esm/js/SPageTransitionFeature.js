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
import { __querySelectorUp, __scrollTo } from '@coffeekraken/sugar/dom';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __SPageTransitionFeatureInterface from './interface/SPageTransitionFeatureInterface';
import __define from './define';
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
        /**
         * Store the current loading page url to avoid triggering multiple
         * same requests during a page load
         */
        this._currentRequestedUrl = document.location.pathname;
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
                if (this.props.scroll) {
                    __scrollTo($elm);
                }
            }
            else {
                this.node.innerHTML = e.state.html;
                if (this.props.scroll) {
                    __scrollTo(this.node);
                }
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
        return ($link.tagName === 'A' &&
            $link.hasAttribute('href') &&
            // @ts-ignore
            !$link.getAttribute('href').match(/^https?:\/\//) &&
            // @ts-ignore
            !$link.getAttribute('href').match(/^#/) &&
            !$link.hasAttribute('target'));
    }
    transitionTo(url, $source) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            // get the pathame to compare with the current url
            const pathname = url.replace(/#[\w\W]+$/, '');
            // prevent loading same page multiple times
            // during a request
            if (this._currentRequestedUrl === pathname) {
                this._onAfter($source, 200, url);
                return;
            }
            // set the current requested url
            this._currentRequestedUrl = pathname;
            // dispatch an event
            this.utils.dispatchEvent('start', {
                $elm: $source,
                detail: {
                    url,
                },
            });
            // add classes
            this.utils.fastdom.mutate(() => {
                document.body.classList.add('loading');
                document.body.setAttribute('loading', 'true');
                $source.classList.add('s-page-transition-source');
                $source.classList.add('loading');
                $source.setAttribute('loading', true);
            });
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
            // reset the current requested url
            // this._currentRequestedUrl = null;
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
                    // handle the classes differently than the others attributes
                    const inPageBodyClasses = $inPageBody.classList
                        .toString()
                        .split(' ')
                        .map((l) => l.trim()), newBodyClasses = $newBody.classList
                        .toString()
                        .split(' ')
                        .map((l) => l.trim());
                    // remove classes that are not in the new page body classes
                    inPageBodyClasses.forEach((cls) => {
                        // do not touch lod (level of details) classes
                        if (cls.match(/^s-lod/)) {
                            return;
                        }
                        // if the class is not in the new page one
                        if (!newBodyClasses.includes(cls)) {
                            $inPageBody.classList.remove(cls);
                        }
                    });
                    // add the new classes that are not in the page already
                    newBodyClasses.forEach((cls) => {
                        // do not touch lod (level of details) classes
                        if (cls.match(/^s-lod/)) {
                            return;
                        }
                        // if the class is not already in the body classes,
                        // add it
                        if (cls && !$inPageBody.classList.contains(cls)) {
                            if (cls === 'initial-loading') {
                                return;
                            }
                            $inPageBody.classList.add(cls);
                        }
                    });
                    // remove the attributes that are not in the new page
                    // @ts-ignore
                    for (let attr of $inPageBody.attributes) {
                        if (attr.name === 'class')
                            continue;
                        if (!newAttrNames.includes(attr.name)) {
                            $inPageBody.removeAttribute(attr.name);
                        }
                    }
                    // add the attributes that are in the new page
                    // @ts-ignore
                    for (let attr of $newBody.attributes) {
                        if (attr.name === 'class')
                            continue;
                        $inPageBody.setAttribute(attr.name, attr.value);
                        newAttrNames.push(attr.name);
                    }
                }
            }
            // @ts-ignore
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
            // save current state
            this._currentState = newState;
            // scroll if needed
            if (this.props.scroll) {
                // @ts-ignore
                __scrollTo($inPageScopedContainer !== null && $inPageScopedContainer !== void 0 ? $inPageScopedContainer : $inPageContainer);
            }
            // after process with success
            this._onAfter($source, 200, url, newState);
            // track pageView if gtag is present in the page
            if (window.gtag && __SEnv.is('production')) {
                const gaUid = typeof this.props.ga === 'string'
                    ? this.props.ga
                    : __SSugarConfig.get('google.ga');
                if (gaUid) {
                    window.gtag('event', 'page_view', {
                        page_title: document.title,
                        page_location: document.location.href,
                        page_path: document.location.pathname,
                        send_to: gaUid,
                    });
                }
            }
            else if (window.gtag && this.props.verbose) {
                console.log(`<green>[SPageTransitionFeature]</green> Google analytics is activate and this transition to "${document.location.pathname}" will be correctly tracked in production environment`);
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
        var _a, _b, _c, _d, _e;
        if (url === void 0) { url = this._currentUrl; }
        if (newState === void 0) { newState = (_a = this._currentState) !== null && _a !== void 0 ? _a : {}; }
        // remove class on body
        document.body.classList.remove('loading');
        document.body.removeAttribute('loading');
        $source.classList.remove('s-page-transition-source');
        $source.classList.remove('loading');
        $source.removeAttribute('loading');
        // before callback
        (_c = (_b = this.props).after) === null || _c === void 0 ? void 0 : _c.call(_b, {
            code,
            url,
            newState,
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
            if (this.props.injectBrokenLinkIcon &&
                !$source.querySelector('[s-page-transition-broken-link-icon]')) {
                $source.innerHTML = `${$source.innerHTML}${this.props.brokenLinkIcon.replace(/^\<([a-z]+)/, '<$1 s-page-transition-broken-link-icon')}`;
            }
            // dispatch an error event
            this.utils.dispatchEvent('error', {
                $elm: $source,
                detail: {
                    code,
                    $source,
                },
            });
            // before callback
            (_e = (_d = this.props).onError) === null || _e === void 0 ? void 0 : _e.call(_d, {
                $source,
            });
        }
        // scroll to top
        if (this.props.scroll) {
            __scrollTo('top');
        }
        // push a new state
        if (code === 200 && newState && url) {
            window.history.pushState(Object.assign(Object.assign({}, newState), { scroll: !this.props.scroll }), document.title, url);
            this._currentUrl = url;
        }
        // dispatch an event
        this.utils.dispatchEvent('end', {
            $elm: $source,
            detail: {
                code,
                $source,
            },
        });
    }
}
export { __define as define };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxVQUFVLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxpQ0FBaUMsTUFBTSw2Q0FBNkMsQ0FBQztBQUU1RixPQUFPLFFBQVEsTUFBTSxVQUFVLENBQUM7QUFFaEMsYUFBYTtBQUNiLE9BQU8sS0FBSyxNQUFNLDJDQUEyQyxDQUFDLENBQUMsK0JBQStCO0FBOEI5Rjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Q0c7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLHNCQUF1QixTQUFRLFVBQVU7SUFpQjFELFlBQVksSUFBWSxFQUFFLElBQWlCLEVBQUUsUUFBYTtRQUN0RCxLQUFLLENBQ0QsSUFBSSxFQUNKLElBQUksRUFDSixXQUFXLENBQ1A7WUFDSSxTQUFTLEVBQUUsaUNBQWlDO1lBQzVDLEtBQUssRUFBRSxLQUFLO1NBQ2YsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQWpCTjs7O1dBR0c7UUFDSCx5QkFBb0IsR0FBVyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztRQWV0RCx3QkFBd0I7UUFDeEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFF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