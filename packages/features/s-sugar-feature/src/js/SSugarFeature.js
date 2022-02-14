import __SFeature from '@coffeekraken/s-feature';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SSugarFeatureInterface from './interface/SSugarFeatureInterface';
import __clearTransmations from '@coffeekraken/sugar/js/dom/transmation/clearTransmations';
import __inputAdditionalAttributes from '@coffeekraken/sugar/js/feature/inputAdditionalAttributes';
import __linksStateAttributes from '@coffeekraken/sugar/js/feature/linksStateAttributes';
/**
 * @name            SSugarFeature
 * @namespace       js
 * @type            Feature
 * @interface       ./interface/SSugarFeatureInterface.js
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
 * @feature        `scrolled` class applied on the body when the user has scrolled the page
 * @feature         Access to a `--vh` css variable that represent the exact viewport innerHeight and avoid having issues with mobile different viewport height values
 * @feature         Clear all transitions and animations on all the page during a window resize. Helps for performances and cleaner for user
 * @feature         Additional input attributes like `empty`, `dirty` and `has-value`
 * @feature         Add state attributes to links like `actual` and `actual-child` depending on the document location url
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SSugarFeature extends __SFeature {
    constructor(name, node, settings) {
        super(name, node, __deepMerge({
            componentUtils: {
                interface: __SSugarFeatureInterface,
            },
            feature: {},
        }, settings !== null && settings !== void 0 ? settings : {}));
        this._isResizing = false;
    }
    mount() {
        // scrolled
        if (this.componentUtils.props.scrolled)
            this._scrolled();
        // vhvar
        if (this.componentUtils.props.vhvar)
            this._vhvar();
        // resizeTransmations
        if (this.componentUtils.props.resizeTransmations)
            this._clearTransmationsOnResize();
        // inputAdditionalAttributes
        if (this.componentUtils.props.inputAdditionalAttributes)
            __inputAdditionalAttributes();
        // linksStateAttributes
        if (this.componentUtils.props.linksStateAttributes)
            __linksStateAttributes();
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
    _scrolled() {
        document.addEventListener('scroll', (e) => {
            if (window.scrollY >= this.componentUtils.props.scrolledDelta) {
                document.body.classList.add('scrolled');
            }
            else {
                document.body.classList.remove('scrolled');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N1Z2FyRmVhdHVyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNTdWdhckZlYXR1cmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxVQUF5QixNQUFNLHlCQUF5QixDQUFDO0FBQ2hFLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sd0JBQXdCLE1BQU0sb0NBQW9DLENBQUM7QUFDMUUsT0FBTyxtQkFBbUIsTUFBTSwwREFBMEQsQ0FBQztBQUMzRixPQUFPLDJCQUEyQixNQUFNLDBEQUEwRCxDQUFDO0FBQ25HLE9BQU8sc0JBQXNCLE1BQU0scURBQXFELENBQUM7QUFVekY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQ0c7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLGFBQWMsU0FBUSxVQUFVO0lBSWpELFlBQVksSUFBWSxFQUFFLElBQWlCLEVBQUUsUUFBYTtRQUN0RCxLQUFLLENBQ0QsSUFBSSxFQUNKLElBQUksRUFDSixXQUFXLENBQ1A7WUFDSSxjQUFjLEVBQUU7Z0JBQ1osU0FBUyxFQUFFLHdCQUF3QjthQUN0QztZQUNELE9BQU8sRUFBRSxFQUFFO1NBQ2QsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQWVOLGdCQUFXLEdBQUcsS0FBSyxDQUFDO0lBZHBCLENBQUM7SUFDRCxLQUFLO1FBQ0QsV0FBVztRQUNYLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsUUFBUTtZQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN6RCxRQUFRO1FBQ1IsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxLQUFLO1lBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ25ELHFCQUFxQjtRQUNyQixJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLGtCQUFrQjtZQUFFLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDO1FBQ3BGLDRCQUE0QjtRQUM1QixJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLHlCQUF5QjtZQUFFLDJCQUEyQixFQUFFLENBQUM7UUFDdkYsdUJBQXVCO1FBQ3ZCLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsb0JBQW9CO1lBQUUsc0JBQXNCLEVBQUUsQ0FBQztJQUNqRixDQUFDO0lBR0QsMEJBQTBCO1FBQ3RCLElBQUksT0FBTyxDQUFDO1FBQ1osTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7WUFDbkMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQ25CLE9BQU8sR0FBRyxtQkFBbUIsRUFBRSxDQUFDO2FBQ25DO1lBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7WUFFeEIsWUFBWSxDQUFDLElBQUksQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1lBQ3JELElBQUksQ0FBQyxpQ0FBaUMsR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNyRCxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztnQkFDekIsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxFQUFJLENBQUM7WUFDaEIsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ1osQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsU0FBUztRQUNMLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUN0QyxJQUFJLE1BQU0sQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFO2dCQUMzRCxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDM0M7aUJBQU07Z0JBQ0gsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQzlDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsTUFBTTtRQUNGLElBQUksRUFBRSxHQUFHLE1BQU0sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ25DLFFBQVEsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzlELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFO1lBQ25DLEVBQUUsR0FBRyxNQUFNLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztZQUMvQixRQUFRLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNsRSxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSjtBQUVELE1BQU0sVUFBVSxNQUFNLENBQ2xCLFFBQXNDLEVBQUUsRUFDeEMsSUFBSSxHQUFHLFNBQVM7SUFFaEIsVUFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3pELENBQUMifQ==