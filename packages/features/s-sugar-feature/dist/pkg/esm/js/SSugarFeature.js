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
import __preventScrollRestoration from '@coffeekraken/sugar/js/dom/scroll/preventScrollRestoration';
import __clearTransmations from '@coffeekraken/sugar/js/dom/transmation/clearTransmations';
import __inputAdditionalAttributes from '@coffeekraken/sugar/js/feature/inputAdditionalAttributes';
import __linksStateAttributes from '@coffeekraken/sugar/js/feature/linksStateAttributes';
import __expandPleasantCssClassnamesLive from '@coffeekraken/sugar/js/html/expandPleasantCssClassnamesLive';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SSugarFeatureInterface from './interface/SSugarFeatureInterface';
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
 * @feature         Support for "pleasant css" syntax like "s-btn:outline"
 * @feature         Polyfill for container queries if needed
 * @feature        `scrolled` class applied on the body when the user has scrolled the page
 * @feature         Access to a `--vh` css variable that represent the exact viewport innerHeight and avoid having issues with mobile different viewport height values
 * @feature         Clear all transitions and animations on all the page during a window resize. Helps for performances and cleaner for user
 * @feature         Additional input attributes like `empty`, `dirty` and `has-value`
 * @feature         Add state attributes to links like `actual` and `actual-child` depending on the document location url
 * @feature         Prevent the scroll restoration behavior on chrome that can usually be anoying
 * @feature         Remove some classes at page loading end: "initial-loading", "loading"
 *
 * @support          chromium
 * @support          firefox
 * @support          safari
 * @support          edge
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
            if (this.props.pleasantCss)
                this._pleasantCss();
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
            document.addEventListener('DOMContentLoaded', () => {
                document.body.classList.remove('initial-loading');
                document.body.classList.remove('loading');
            });
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
}
export function define(props = {}, name = 's-sugar') {
    __SFeature.defineFeature(name, SSugarFeature, props);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sMEJBQTBCLE1BQU0sNERBQTRELENBQUM7QUFDcEcsT0FBTyxtQkFBbUIsTUFBTSwwREFBMEQsQ0FBQztBQUMzRixPQUFPLDJCQUEyQixNQUFNLDBEQUEwRCxDQUFDO0FBQ25HLE9BQU8sc0JBQXNCLE1BQU0scURBQXFELENBQUM7QUFDekYsT0FBTyxpQ0FBaUMsTUFBTSw2REFBNkQsQ0FBQztBQUM1RyxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLHdCQUF3QixNQUFNLG9DQUFvQyxDQUFDO0FBYTFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Q0c7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLGFBQWMsU0FBUSxVQUFVO0lBSWpELFlBQVksSUFBWSxFQUFFLElBQWlCLEVBQUUsUUFBYTtRQUN0RCxLQUFLLENBQ0QsSUFBSSxFQUNKLElBQUksRUFDSixXQUFXLENBQ1A7WUFDSSxJQUFJLEVBQUUsU0FBUztZQUNmLFNBQVMsRUFBRSx3QkFBd0I7U0FDdEMsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQWlDTixnQkFBVyxHQUFHLEtBQUssQ0FBQztJQWhDcEIsQ0FBQztJQUNLLEtBQUs7O1lBQ1Asa0JBQWtCO1lBQ2xCLE9BQU87WUFDUCxtQ0FBbUM7WUFDbkMsdURBQXVEO1lBQ3ZELE1BQU07WUFDTixvQkFBb0I7WUFDcEIsa0VBQWtFO1lBQ2xFLElBQUk7WUFDSixlQUFlO1lBQ2YsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVc7Z0JBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ2hELFdBQVc7WUFDWCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUTtnQkFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDMUMsUUFBUTtZQUNSLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLO2dCQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNwQyxxQkFBcUI7WUFDckIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQjtnQkFBRSxJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztZQUNyRSw0QkFBNEI7WUFDNUIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLHlCQUF5QjtnQkFBRSwyQkFBMkIsRUFBRSxDQUFDO1lBQ3hFLHVCQUF1QjtZQUN2QixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsb0JBQW9CO2dCQUFFLHNCQUFzQixFQUFFLENBQUM7WUFDOUQsNkJBQTZCO1lBQzdCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyx3QkFBd0I7Z0JBQUUsMEJBQTBCLEVBQUUsQ0FBQztZQUV0RSxxREFBcUQ7WUFDckQsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLEdBQUcsRUFBRTtnQkFDL0MsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7Z0JBQ2xELFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM5QyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7S0FBQTtJQUdELDBCQUEwQjtRQUN0QixJQUFJLE9BQU8sQ0FBQztRQUNaLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFO1lBQ25DLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNuQixPQUFPLEdBQUcsbUJBQW1CLEVBQUUsQ0FBQzthQUNuQztZQUNELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1lBRXhCLFlBQVksQ0FBQyxJQUFJLENBQUMsaUNBQWlDLENBQUMsQ0FBQztZQUNyRCxJQUFJLENBQUMsaUNBQWlDLEdBQUcsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDckQsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7Z0JBQ3pCLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sRUFBSSxDQUFDO1lBQ2hCLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNaLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELFlBQVk7UUFDUixpQkFBaUI7UUFDakIsaUNBQWlDLENBQUM7WUFDOUIsVUFBVTtnQkFDTixVQUFVLENBQUMsR0FBRyxFQUFFO29CQUNaLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO29CQUNsRCxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzlDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNaLENBQUM7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsU0FBUztRQUNMLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUN0QyxJQUFJLE1BQU0sQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUU7Z0JBQzVDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7b0JBQy9DLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztpQkFDM0M7YUFDSjtpQkFBTTtnQkFDSCxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTtvQkFDOUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2lCQUM5QzthQUNKO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsTUFBTTtRQUNGLElBQUksRUFBRSxHQUFHLE1BQU0sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ25DLFFBQVEsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzlELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFO1lBQ25DLEVBQUUsR0FBRyxNQUFNLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztZQUMvQixRQUFRLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNsRSxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSjtBQUVELE1BQU0sVUFBVSxNQUFNLENBQ2xCLFFBQXNDLEVBQUUsRUFDeEMsSUFBSSxHQUFHLFNBQVM7SUFFaEIsVUFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3pELENBQUMifQ==