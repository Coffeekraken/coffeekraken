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
const s_feature_1 = __importDefault(require("@coffeekraken/s-feature"));
const datetime_1 = require("@coffeekraken/sugar/datetime");
const dom_1 = require("@coffeekraken/sugar/dom");
const feature_1 = require("@coffeekraken/sugar/feature");
const object_1 = require("@coffeekraken/sugar/object");
const SSugarFeatureInterface_1 = __importDefault(require("./interface/SSugarFeatureInterface"));
const define_1 = __importDefault(require("./define"));
exports.define = define_1.default;
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
class SSugarFeature extends s_feature_1.default {
    constructor(name, node, settings) {
        super(name, node, (0, object_1.__deepMerge)({
            name: 's-sugar',
            interface: SSugarFeatureInterface_1.default,
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
                (0, feature_1.__inputAdditionalAttributes)();
            // linksStateAttributes
            if (this.props.linksStateAttributes)
                (0, feature_1.__linksStateAttributes)();
            // prevent scroll restoration
            if (this.props.preventScrollRestoration)
                (0, dom_1.__preventScrollRestoration)();
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
                resetFn = (0, dom_1.__clearTransmations)();
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
        (0, dom_1.__expandPleasantCssClassnamesLive)({
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
        (0, dom_1.__querySelectorLive)('[confirm]', ($btn) => __awaiter(this, void 0, void 0, function* () {
            if ($btn.isConfirmed) {
                return;
            }
            $btn._isConfirmedStatus = undefined;
            $btn.isConfirmed = () => {
                return $btn._isConfirmedStatus === true;
            };
            let isFirstClick = true;
            yield (0, datetime_1.__wait)(100); // avoid css issues
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
exports.default = SSugarFeature;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHdFQUFpRDtBQUNqRCwyREFBc0Q7QUFDdEQsaURBS2lDO0FBQ2pDLHlEQUdxQztBQUNyQyx1REFBeUQ7QUFDekQsZ0dBQTBFO0FBRTFFLHNEQUFnQztBQStQWCxpQkEvUGQsZ0JBQVEsQ0ErUFk7QUFqUDNCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMERHO0FBRUgsSUFBSSxHQUFHLEdBQUcsVUFBVSxJQUFJO0lBQ3BCLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QixPQUFPLFVBQVUsR0FBRyxJQUFJO1FBQ3BCLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxHQUFHLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRTtZQUN4QyxPQUFPLEVBQUUsSUFBSTtZQUNiLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ2xCLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDLENBQUM7QUFDTixDQUFDLENBQUM7QUFDRixPQUFPLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUVyQyxNQUFxQixhQUFjLFNBQVEsbUJBQVU7SUFJakQsWUFBWSxJQUFZLEVBQUUsSUFBaUIsRUFBRSxRQUFhO1FBQ3RELEtBQUssQ0FDRCxJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUEsb0JBQVcsRUFDUDtZQUNJLElBQUksRUFBRSxTQUFTO1lBQ2YsU0FBUyxFQUFFLGdDQUF3QjtTQUN0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