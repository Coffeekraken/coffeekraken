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
exports.default = SSugarFeature;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHdFQUFpRDtBQUNqRCxpREFHaUM7QUFDakMseURBR3FDO0FBQ3JDLHVEQUF5RDtBQUN6RCxnR0FBMEU7QUFFMUUsc0RBQWdDO0FBc0tYLGlCQXRLZCxnQkFBUSxDQXNLWTtBQXhKM0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZDRztBQUNILE1BQXFCLGFBQWMsU0FBUSxtQkFBVTtJQUlqRCxZQUFZLElBQVksRUFBRSxJQUFpQixFQUFFLFFBQWE7UUFDdEQsS0FBSyxDQUNELElBQUksRUFDSixJQUFJLEVBQ0osSUFBQSxvQkFBVyxFQUNQO1lBQ0ksSUFBSSxFQUFFLFNBQVM7WUFDZixTQUFTLEVBQUUsZ0NBQXdCO1NBQ3RDLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUF5Q04sZ0JBQVcsR0FBRyxLQUFLLENBQUM7SUF4Q3BCLENBQUM7SUFDSyxLQUFLOztZQUNQLGtCQUFrQjtZQUNsQixPQUFPO1lBQ1AsbUNBQW1DO1lBQ25DLHVEQUF1RDtZQUN2RCxNQUFNO1lBQ04sb0JBQW9CO1lBQ3BCLGtFQUFrRTtZQUNsRSxJQUFJO1lBRUosZUFBZTtZQUNmLG1EQUFtRDtZQUNuRCxXQUFXO1lBQ1gsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVE7Z0JBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQzFDLFFBQVE7WUFDUixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSztnQkFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDcEMscUJBQXFCO1lBQ3JCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0I7Z0JBQUUsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7WUFDckUsNEJBQTRCO1lBQzVCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyx5QkFBeUI7Z0JBQUUsSUFBQSxxQ0FBMkIsR0FBRSxDQUFDO1lBQ3hFLHVCQUF1QjtZQUN2QixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsb0JBQW9CO2dCQUFFLElBQUEsZ0NBQXNCLEdBQUUsQ0FBQztZQUM5RCw2QkFBNkI7WUFDN0IsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLHdCQUF3QjtnQkFBRSxJQUFBLGdDQUEwQixHQUFFLENBQUM7WUFFdEUscURBQXFEO1lBQ3JELElBQUksUUFBUSxDQUFDLFVBQVUsS0FBSyxVQUFVLEVBQUU7Z0JBQ3BDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLEVBQUU7b0JBQy9DLElBQUksUUFBUSxDQUFDLFVBQVUsS0FBSyxVQUFVLEVBQUU7d0JBQ3BDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO3dCQUNsRCxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7cUJBQzdDO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2FBQ047aUJBQU07Z0JBQ0gsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7Z0JBQ2xELFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUM3QztRQUNMLENBQUM7S0FBQTtJQUdELDBCQUEwQjtRQUN0QixJQUFJLE9BQU8sQ0FBQztRQUNaLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFO1lBQ25DLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNuQixPQUFPLEdBQUcsSUFBQSx5QkFBbUIsR0FBRSxDQUFDO2FBQ25DO1lBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7WUFFeEIsWUFBWSxDQUFDLElBQUksQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1lBQ3JELElBQUksQ0FBQyxpQ0FBaUMsR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNyRCxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztnQkFDekIsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxFQUFJLENBQUM7WUFDaEIsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ1osQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsbUJBQW1CO0lBQ25CLHdCQUF3QjtJQUN4QiwwQ0FBMEM7SUFDMUMseUJBQXlCO0lBQ3pCLGlDQUFpQztJQUNqQyxxRUFBcUU7SUFDckUsNkRBQTZEO0lBQzdELHVCQUF1QjtJQUN2QixhQUFhO0lBQ2IsVUFBVTtJQUNWLElBQUk7SUFDSixTQUFTO1FBQ0wsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ3RDLElBQUksTUFBTSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRTtnQkFDNUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTtvQkFDL0MsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2lCQUMzQzthQUNKO2lCQUFNO2dCQUNILElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO29CQUM5QyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7aUJBQzlDO2FBQ0o7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRCxNQUFNO1FBQ0YsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDbkMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDOUQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7WUFDbkMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1lBQy9CLFFBQVEsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xFLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKO0FBeEdELGdDQXdHQyJ9