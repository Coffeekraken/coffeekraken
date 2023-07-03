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
 * When inited, it will proxy all the internal links (not the _blank or links starting with http...) and make the ajax
 * transition between pages.
 * It also listen on the `document` for the `location.href` event and transition to the specified `detail` property of the event.
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
 * @import          import { define as __SPageTransitionFeatureDefine } from '@coffeekraken/s-page-transition-feature';
 *
 * @snippet         __SPageTransitionFeatureDefine($1)
 *
 * @install         js
 * import { define as __SPageTransitionFeatureDefine } from '@coffeekraken/s-page-transition-feature';
 * __SPageTransitionFeatureDefine();
 *
 * @install         bash
 * npm i @coffeekraken/s-form-validate-feature
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
            this._applyLoadingState($source);
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
     * This function just apply the loading state
     */
    _applyLoadingState($source) {
        document.body.classList.add('loading');
        document.body.setAttribute('loading', 'true');
        if ($source) {
            $source.classList.add('s-page-transition-source');
            $source.classList.add('loading');
            $source.setAttribute('loading', true);
        }
    }
    /**
     * This function just remove the loading state
     */
    _removeLoadingState($source) {
        // remove class on body
        document.body.classList.remove('loading');
        document.body.removeAttribute('loading');
        if ($source) {
            $source.classList.remove('s-page-transition-source');
            $source.classList.remove('loading');
            $source.removeAttribute('loading');
        }
    }
    /**
     * This function take care of handling the after transition process.
     * The code passed allows to know if the transition was a success (200) or an error (404|500)
     */
    _onAfter($source, code, url, newState) {
        var _a, _b, _c, _d, _e;
        if (url === void 0) { url = this._currentUrl; }
        if (newState === void 0) { newState = (_a = this._currentState) !== null && _a !== void 0 ? _a : {}; }
        // remove the loading state
        this._removeLoadingState($source);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxVQUFVLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxpQ0FBaUMsTUFBTSw2Q0FBNkMsQ0FBQztBQUU1RixhQUFhO0FBQ2IsT0FBTyxLQUFLLE1BQU0sMkNBQTJDLENBQUMsQ0FBQywrQkFBK0I7QUE4QjlGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdURHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sT0FBTyxzQkFBdUIsU0FBUSxVQUFVO0lBaUIxRCxZQUFZLElBQVksRUFBRSxJQUFpQixFQUFFLFFBQWE7UUFDdEQsS0FBSyxDQUNELElBQUksRUFDSixJQUFJLEVBQ0osV0FBVyxDQUNQO1lBQ0ksU0FBUyxFQUFFLGlDQUFpQztZQUM1QyxLQUFLLEVBQUUsS0FBSztTQUNmLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUFqQk47OztXQUdHO1FBQ0gseUJBQW9CLEdBQVcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7UUFldEQsd0JBQXdCO1FBQ3hCLElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRTlFLHFCQUFx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