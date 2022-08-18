"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = void 0;
const s_env_1 = __importDefault(require("@coffeekraken/s-env"));
const s_feature_1 = __importDefault(require("@coffeekraken/s-feature"));
const s_request_1 = __importDefault(require("@coffeekraken/s-request"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const querySelectorUp_1 = __importDefault(require("@coffeekraken/sugar/js/dom/query/querySelectorUp"));
const scrollTo_1 = __importDefault(require("@coffeekraken/sugar/js/dom/scroll/scrollTo"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const SPageTransitionFeatureInterface_1 = __importDefault(require("./interface/SPageTransitionFeatureInterface"));
// @ts-ignore
const s_page_transition_css_1 = __importDefault(require("../../../../src/css/s-page-transition.css")); // relative to /dist/pkg/esm/js
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
class SPageTransitionFeature extends s_feature_1.default {
    constructor(name, node, settings) {
        super(name, node, (0, deepMerge_1.default)({
            interface: SPageTransitionFeatureInterface_1.default,
            style: s_page_transition_css_1.default,
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
                (0, scrollTo_1.default)($elm);
            }
            else {
                this.node.innerHTML = e.state.html;
                (0, scrollTo_1.default)(this.node);
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
                const $upHrefElm = (0, querySelectorUp_1.default)($target, 'a[href]');
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
            const request = new s_request_1.default({
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
                (0, scrollTo_1.default)($inPageScopedContainer !== null && $inPageScopedContainer !== void 0 ? $inPageScopedContainer : $inPageContainer);
            }
            // after process with success
            this._onAfter($source, 200, url, newState);
            // track pageView if gtag is present in the page
            if (window.gtag && s_env_1.default.is('production')) {
                const gaUid = typeof this.props.ga === 'string' ? this.props.ga : s_sugar_config_1.default.get('google.ga');
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
        (0, scrollTo_1.default)('top');
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
exports.default = SPageTransitionFeature;
function define(props = {}, name = 's-page-transition') {
    s_feature_1.default.defineFeature(name, SPageTransitionFeature, props);
}
exports.define = define;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdFQUF5QztBQUN6Qyx3RUFBaUQ7QUFDakQsd0VBQWlEO0FBQ2pELGtGQUEwRDtBQUMxRCx1R0FBaUY7QUFDakYsMEZBQW9FO0FBQ3BFLDRGQUFzRTtBQUN0RSxrSEFBNEY7QUFFNUYsYUFBYTtBQUNiLHNHQUE4RCxDQUFDLCtCQUErQjtBQWE5Rjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Q0c7QUFDSCxNQUFxQixzQkFBdUIsU0FBUSxtQkFBVTtJQU8xRCxZQUFZLElBQVksRUFBRSxJQUFpQixFQUFFLFFBQWE7UUFDdEQsS0FBSyxDQUNELElBQUksRUFDSixJQUFJLEVBQ0osSUFBQSxtQkFBVyxFQUNQO1lBQ0ksU0FBUyxFQUFFLHlDQUFpQztZQUM1QyxLQUFLLEVBQUUsK0JBQUs7U0FDZixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO1FBRUYsd0JBQXdCO1FBQ3hCLElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRTlFLHFCQUFxQjtRQUNyQixNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FDcEI7WUFDSSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTO1NBQzVCLEVBQ0QsUUFBUSxDQUFDLEtBQUssRUFDZCxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDekIsQ0FBQztRQUVGLGtCQUFrQjtRQUNsQixNQUFNLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7O1lBQ3RDLElBQUksQ0FBQyxDQUFBLE1BQUEsQ0FBQyxDQUFDLEtBQUss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