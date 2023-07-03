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
import { __clearTransmations, __expandPleasantCssClassnamesLive, __preventScrollRestoration, __querySelectorLive, } from '@coffeekraken/sugar/dom';
import { __autoFocus, __autoResize, __confirmButton, __inputAdditionalAttributes, __linksStateAttributes, } from '@coffeekraken/sugar/feature';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __SSugarFeatureInterface from './interface/SSugarFeatureInterface';
import { __viewportEvents } from '@coffeekraken/sugar/dom';
/**
 * @name            SSugarFeature
 * @as              Sugar features
 * @namespace       js
 * @type            Feature
 * @interface       ./interface/SSugarFeatureInterface.ts
 * @menu            Styleguide / Features               /styleguide/feature/s-sugar-feature
 * @platform        js
 * @status          beta
 *
 * This feature allows you to apply some "nice to have" features like having a "scrolled" class applied on the body
 * when the user has scroll in the page or having access to a `--vh` css variable that represent the exact
 * viewport innerHeight and avoid having issues with mobile different viewport height values. Note that if you use
 * the `sPostcssSugarPlugin` postcss plugin, you can use the `vh` unit as normal and if will automatically take the
 * value of the `--vh` variable if it exists.
 * More feature can be added in the future depending on the needs.
 *
 * @support          chromium
 * @support          firefox
 * @support          safari
 * @support          edge
 *
 * @install         bash
 * yarn add @coffeekraken/s-sugar-feature
 *
 * @install         js
 * import { define } from '@coffeekraken/s-sugar-feature';
 * define();
 *
 * @feature         Support for "pleasant css" syntax like "s-btn:outline"
 * @feature         Make sure your "autofocus" fields works as expected
 * @feature         Polyfill for container queries if needed
 * @feature        `scrolled` class applied on the body when the user has scrolled the page
 * @feature         Access to a `--vh` css variable that represent the exact viewport innerHeight and avoid having issues with mobile different viewport height values
 * @feature         Clear all transitions and animations on all the page during a window resize. Helps for performances and cleaner for user
 * @feature         Additional input attributes like `empty`, `dirty` and `has-value`
 * @feature         Add state attributes to links like `actual` and `actual-child` depending on the document location url
 * @feature         Prevent the scroll restoration behavior on chrome that can usually be anoying
 * @feature         Remove some classes at page loading end: "initial-loading", "loading"
 * @feature         Proxy the `history.pushState` method to make it dispatch an "pushstate" event with the actual state as detail
 * @feature         Track in/out viewport events and classes for particular marked section/div by adding the "viewport-aware" attribute on any HTMLElements
 *
 * @import          import { define as __SSugarFeatureDefine } from '@coffeekraken/s-sugar-feature';
 *
 * @snippet         __SSugarFeatureDefine($1)
 *
 * @install         js
 * import { define as __SSugarFeatureDefine } from '@coffeekraken/s-sugar-feature';
 * __SSugarFeatureDefine();
 *
 * @install         bash
 * npm i @coffeekraken/s-form-validate-feature
 *
 * @example         html        Simple usage        Simply add the `s-sugar` property on your body tag
 * <bodyTag s-sugar>
 *
 * </bodyTag>
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
var _wr = function (type) {
    var orig = history[type];
    return function (...args) {
        var rv = orig.apply(this, arguments);
        var e = new CustomEvent(type.toLowerCase(), {
            bubbles: true,
            detail: args[0],
        });
        window.dispatchEvent(e);
        return rv;
    };
};
history.pushState = _wr('pushState');
export default class SSugarFeature extends __SFeature {
    constructor(name, node, settings) {
        super(name, node, __deepMerge({
            name: 's-sugar',
            interface: __SSugarFeatureInterface,
        }, settings !== null && settings !== void 0 ? settings : {}));
        this._isResizing = false;
    }
    mount() {
        return __awaiter(this, void 0, void 0, function* () {
            // container query
            // if (
            //     this.props.containerQuery &&
            //     !('container' in document.documentElement.style)
            // ) {
            //     // @ts-ignore
            //     import('https://cdn.skypack.dev/container-query-polyfill');
            // }
            // pleasant css
            if (this.props.pleasantCss)
                this._pleasantCss();
            // autofocus
            if (this.props.autofocus)
                this._autofocus();
            // viewport aware
            if (this.props.viewportAware)
                this._viewportAware();
            // scrolled
            if (this.props.scrolled)
                this._scrolled();
            // vhvar
            if (this.props.vhvar)
                this._vhvar();
            // auto resize
            if (this.props.autoResize)
                this._autoResize();
            // confirm button
            if (this.props.confirmBtn)
                this._confirmBtn();
            // resizeTransmations
            if (this.props.resizeTransmations)
                this._clearTransmationsOnResize();
            // inputAdditionalAttributes
            if (this.props.inputAdditionalAttributes)
                __inputAdditionalAttributes();
            // linksStateAttributes
            if (this.props.linksStateAttributes)
                __linksStateAttributes();
            // prevent scroll restoration
            if (this.props.preventScrollRestoration)
                __preventScrollRestoration();
            // remove some classes like "initial-loading", etc...
            if (document.readyState !== 'complete') {
                document.addEventListener('readystatechange', () => {
                    if (document.readyState === 'complete') {
                        document.body.classList.remove('initial-loading');
                        document.body.classList.remove('loading');
                    }
                });
            }
            else {
                document.body.classList.remove('initial-loading');
                document.body.classList.remove('loading');
            }
        });
    }
    _clearTransmationsOnResize() {
        let resetFn;
        window.addEventListener('resize', () => {
            if (!this._isResizing) {
                resetFn = __clearTransmations();
            }
            this._isResizing = true;
            clearTimeout(this._clearTransmationsOnResizeTimeout);
            this._clearTransmationsOnResizeTimeout = setTimeout(() => {
                this._isResizing = false;
                resetFn === null || resetFn === void 0 ? void 0 : resetFn();
            }, 100);
        });
    }
    _pleasantCss() {
        // layout related
        __expandPleasantCssClassnamesLive({
            afterFirst() {
                setTimeout(() => {
                    document.body.classList.remove('initial-loading');
                    document.body.classList.remove('loading');
                }, 500);
            },
        });
    }
    _viewportAware() {
        __querySelectorLive('[viewport-aware]', ($elm) => {
            __viewportEvents($elm);
            $elm.addEventListener('viewport.enter', () => {
                $elm.setAttribute('in-viewport', 'true');
                $elm.classList.add('in-viewport');
            });
            $elm.addEventListener('viewport.exit', () => {
                $elm.removeAttribute('in-viewport');
                $elm.classList.remove('in-viewport');
            });
        });
    }
    _autofocus() {
        __autoFocus();
    }
    _scrolled() {
        document.addEventListener('scroll', (e) => {
            if (window.scrollY >= this.props.scrolledDelta) {
                if (!document.body.classList.contains('scrolled')) {
                    document.body.classList.add('scrolled');
                }
            }
            else {
                if (document.body.classList.contains('scrolled')) {
                    document.body.classList.remove('scrolled');
                }
            }
        });
    }
    _vhvar() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        window.addEventListener('resize', () => {
            vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        });
    }
    _autoResize() {
        __autoResize();
    }
    _confirmBtn() {
        __confirmButton();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sRUFDSCxtQkFBbUIsRUFDbkIsaUNBQWlDLEVBQ2pDLDBCQUEwQixFQUMxQixtQkFBbUIsR0FDdEIsTUFBTSx5QkFBeUIsQ0FBQztBQUNqQyxPQUFPLEVBQ0gsV0FBVyxFQUNYLFlBQVksRUFDWixlQUFlLEVBQ2YsMkJBQTJCLEVBQzNCLHNCQUFzQixHQUN6QixNQUFNLDZCQUE2QixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLHdCQUF3QixNQUFNLG9DQUFvQyxDQUFDO0FBRTFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBZ0IzRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNERHO0FBRUgsSUFBSSxHQUFHLEdBQUcsVUFBVSxJQUFJO0lBQ3BCLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QixPQUFPLFVBQVUsR0FBRyxJQUFJO1FBQ3BCLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxHQUFHLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRTtZQUN4QyxPQUFPLEVBQUUsSUFBSTtZQUNiLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ2xCLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDLENBQUM7QUFDTixDQUFDLENBQUM7QUFD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