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
import { __clearTransmations, __preventScrollRestoration, } from '@coffeekraken/sugar/dom';
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
 * @feature         Polyfill for container queries if needed
 * @feature        `scrolled` class applied on the body when the user has scrolled the page
 * @feature         Access to a `--vh` css variable that represent the exact viewport innerHeight and avoid having issues with mobile different viewport height values
 * @feature         Clear all transitions and animations on all the page during a window resize. Helps for performances and cleaner for user
 * @feature         Additional input attributes like `empty`, `dirty` and `has-value`
 * @feature         Add state attributes to links like `actual` and `actual-child` depending on the document location url
 * @feature         Prevent the scroll restoration behavior on chrome that can usually be anoying
 * @feature         Remove some classes at page loading end: "initial-loading", "loading"
 *
 * @example         html        Simple usage        Simply add the `s-sugar` property on your body tag
 * <bodyTag s-sugar>
 *
 * </bodyTag>
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
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
            // if (this.props.pleasantCss) this._pleasantCss();
            // scrolled
            if (this.props.scrolled)
                this._scrolled();
            // vhvar
            if (this.props.vhvar)
                this._vhvar();
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
    // _pleasantCss() {
    //     // layout related
    //     __expandPleasantCssClassnamesLive({
    //         afterFirst() {
    //             setTimeout(() => {
    //                 document.body.classList.remove('initial-loading');
    //                 document.body.classList.remove('loading');
    //             }, 500);
    //         },
    //     });
    // }
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
}
export { __define as define };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sRUFDSCxtQkFBbUIsRUFDbkIsMEJBQTBCLEdBQzdCLE1BQU0seUJBQXlCLENBQUM7QUFDakMsT0FBTyxFQUNILDJCQUEyQixFQUMzQixzQkFBc0IsR0FDekIsTUFBTSw2QkFBNkIsQ0FBQztBQUNyQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyx3QkFBd0IsTUFBTSxvQ0FBb0MsQ0FBQztBQUUxRSxPQUFPLFFBQVEsTUFBTSxVQUFVLENBQUM7QUFjaEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZDRztBQUNILE1BQU0sQ0FBQyxPQUFPLE9BQU8sYUFBYyxTQUFRLFVBQVU7SUFJakQsWUFBWSxJQUFZLEVBQUUsSUFBaUIsRUFBRSxRQUFhO1FBQ3RELEtBQUssQ0FDRCxJQUFJLEVBQ0osSUFBSSxFQUNKLFdBQVcsQ0FDUDtZQUNJLElBQUksRUFBRSxTQUFTO1lBQ2YsU0FBUyxFQUFFLHdCQUF3QjtTQUN0QyxFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO1FBeUNOLGdCQUFXLEdBQUcsS0FBSyxDQUFDO0lBeENwQixDQUFDO0lBQ0ssS0FBSzs7WUFDUCxrQkFBa0I7WUFDbEIsT0FBTztZQUNQLG1DQUFtQztZQUNuQyx1REFBdUQ7WUFDdkQsTUFBTTtZQUNOLG9CQUFvQjtZQUNwQixrRUFBa0U7WUFDbEUsSUFBSTtZQUVKLGVBQWU7WUFDZixtREFBbUQ7WUFDbkQsV0FBVztZQUNYLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRO2dCQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUMxQyxRQUFR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