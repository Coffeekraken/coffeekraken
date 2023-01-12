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
            // prevent loading same page multiple times
            // during a request
            if (this._currentRequestedUrl === url) {
                return;
            }
            // set the current requested url
            this._currentRequestedUrl = url;
            // dispatch an event
            this.utils.dispatchEvent('start', {
                $elm: $source,
                detail: {
                    url
                }
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
            this._currentRequestedUrl = null;
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
                    const inPageBodyClasses = $inPageBody.classList.toString().split(' ').map(l => l.trim()), newBodyClasses = $newBody.classList.toString().split(' ').map(l => l.trim());
                    // remove classes that are not in the new page body classes
                    inPageBodyClasses.forEach(cls => {
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
                    newBodyClasses.forEach(cls => {
                        // do not touch lod (level of details) classes
                        if (cls.match(/^s-lod/)) {
                            return;
                        }
                        // if the class is not already in the body classes,
                        // add it
                        if (!$inPageBody.classList.contains(cls)) {
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
            this.utils.dispatchEvent('error', {
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
        this.utils.dispatchEvent('end', {
            $elm: $source,
            detail: {
                code,
                $source
            }
        });
    }
}
export { __define as define };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxVQUFVLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxpQ0FBaUMsTUFBTSw2Q0FBNkMsQ0FBQztBQUU1RixPQUFPLFFBQVEsTUFBTSxVQUFVLENBQUM7QUFFaEMsYUFBYTtBQUNiLE9BQU8sS0FBSyxNQUFNLDJDQUEyQyxDQUFDLENBQUMsK0JBQStCO0FBYTlGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlDRztBQUNILE1BQU0sQ0FBQyxPQUFPLE9BQU8sc0JBQXVCLFNBQVEsVUFBVTtJQWExRCxZQUFZLElBQVksRUFBRSxJQUFpQixFQUFFLFFBQWE7UUFDdEQsS0FBSyxDQUNELElBQUksRUFDSixJQUFJLEVBQ0osV0FBVyxDQUNQO1lBQ0ksU0FBUyxFQUFFLGlDQUFpQztZQUM1QyxLQUFLLEVBQUUsS0FBSztTQUNmLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUFFRix3QkFBd0I7UUFDeEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFOUUscUJBQXFCO1FBQ3JCLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUNwQjtZQUNJLElB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