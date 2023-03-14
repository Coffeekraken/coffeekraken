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
import { __wait } from '@coffeekraken/sugar/datetime';
import { __clearTransmations, __expandPleasantCssClassnamesLive, __preventScrollRestoration, __querySelectorLive, } from '@coffeekraken/sugar/dom';
import { __inputAdditionalAttributes, __linksStateAttributes, } from '@coffeekraken/sugar/feature';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __SSugarFeatureInterface from './interface/SSugarFeatureInterface';
import __define from './define';
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
 * @feature         Polyfill for container queries if needed
 * @feature        `scrolled` class applied on the body when the user has scrolled the page
 * @feature         Access to a `--vh` css variable that represent the exact viewport innerHeight and avoid having issues with mobile different viewport height values
 * @feature         Clear all transitions and animations on all the page during a window resize. Helps for performances and cleaner for user
 * @feature         Additional input attributes like `empty`, `dirty` and `has-value`
 * @feature         Add state attributes to links like `actual` and `actual-child` depending on the document location url
 * @feature         Prevent the scroll restoration behavior on chrome that can usually be anoying
 * @feature         Remove some classes at page loading end: "initial-loading", "loading"
 * @feature         Proxy the `history.pushState` method to make it dispatch an "pushstate" event with the actual state as detail
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
            // scrolled
            if (this.props.scrolled)
                this._scrolled();
            // vhvar
            if (this.props.vhvar)
                this._vhvar();
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
    _confirmBtn() {
        __querySelectorLive('[confirm]', ($btn) => __awaiter(this, void 0, void 0, function* () {
            if ($btn.isConfirmed) {
                return;
            }
            $btn._isConfirmedStatus = undefined;
            $btn.isConfirmed = () => {
                return $btn._isConfirmedStatus === true;
            };
            let isFirstClick = true;
            yield __wait(100); // avoid css issues
            const buttonElmStyle = window.getComputedStyle($btn), buttonWidth = buttonElmStyle.width;
            const confirmElmStyle = window.getComputedStyle($btn, ':after'), confirmWidth = `${parseInt(confirmElmStyle.width) + 10}px`; // add 4 just in case
            // set size
            $btn.style.setProperty('--s-btn-confirm-width', buttonWidth);
            $btn.addEventListener('pointerdown', (e) => {
                if ($btn._isConfirmedStatus === undefined) {
                    $btn._isConfirmedStatus = false;
                    $btn.style.setProperty('--s-btn-confirm-width', confirmWidth);
                }
                else if ($btn._isConfirmedStatus === false) {
                    setTimeout(() => {
                        $btn.style.setProperty('--s-btn-confirm-width', buttonWidth);
                    }, 100);
                    $btn._isConfirmedStatus = true;
                }
            });
            $btn.addEventListener('blur', (e) => {
                setTimeout(() => {
                    $btn.style.setProperty('--s-btn-confirm-width', buttonWidth);
                }, 100);
                $btn._isConfirmedStatus = undefined;
            });
            $btn.addEventListener('pointerup', (e) => {
                setTimeout(() => {
                    if ($btn._isConfirmedStatus === true) {
                        $btn.blur();
                        $btn._isConfirmedStatus = undefined;
                    }
                });
            });
        }));
    }
}
export { __define as define };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN0RCxPQUFPLEVBQ0gsbUJBQW1CLEVBQ25CLGlDQUFpQyxFQUNqQywwQkFBMEIsRUFDMUIsbUJBQW1CLEdBQ3RCLE1BQU0seUJBQXlCLENBQUM7QUFDakMsT0FBTyxFQUNILDJCQUEyQixFQUMzQixzQkFBc0IsR0FDekIsTUFBTSw2QkFBNkIsQ0FBQztBQUNyQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyx3QkFBd0IsTUFBTSxvQ0FBb0MsQ0FBQztBQUUxRSxPQUFPLFFBQVEsTUFBTSxVQUFVLENBQUM7QUFjaEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwREc7QUFFSCxJQUFJLEdBQUcsR0FBRyxVQUFVLElBQUk7SUFDcEIsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pCLE9BQU8sVUFBVSxHQUFHLElBQUk7UUFDcEIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLEdBQUcsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFO1lBQ3hDLE9BQU8sRUFBRSxJQUFJO1lBQ2IsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDbEIsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQztBQUNGLE9B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