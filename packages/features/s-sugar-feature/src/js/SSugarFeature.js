import __SFeature from '@coffeekraken/s-feature';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SSugarFeatureInterface from './interface/SSugarFeatureInterface';
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
    }
    mount() {
        // scrolled
        if (this.componentUtils.props.scrolled)
            this._scrolled();
        // vhvar
        if (this.componentUtils.props.vhvar)
            this._vhvar();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N1Z2FyRmVhdHVyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNTdWdhckZlYXR1cmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxVQUF5QixNQUFNLHlCQUF5QixDQUFDO0FBQ2hFLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sd0JBQXdCLE1BQU0sb0NBQW9DLENBQUM7QUFRMUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0Qkc7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLGFBQWMsU0FBUSxVQUFVO0lBSWpELFlBQVksSUFBWSxFQUFFLElBQWlCLEVBQUUsUUFBYTtRQUN0RCxLQUFLLENBQ0QsSUFBSSxFQUNKLElBQUksRUFDSixXQUFXLENBQ1A7WUFDSSxjQUFjLEVBQUU7Z0JBQ1osU0FBUyxFQUFFLHdCQUF3QjthQUN0QztZQUNELE9BQU8sRUFBRSxFQUFFO1NBQ2QsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztJQUNOLENBQUM7SUFDRCxLQUFLO1FBQ0QsV0FBVztRQUNYLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsUUFBUTtZQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN6RCxRQUFRO1FBQ1IsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxLQUFLO1lBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3ZELENBQUM7SUFDRCxTQUFTO1FBQ0wsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ3RDLElBQUksTUFBTSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUU7Z0JBQzNELFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUMzQztpQkFBTTtnQkFDSCxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDOUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRCxNQUFNO1FBQ0YsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDbkMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDOUQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7WUFDbkMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1lBQy9CLFFBQVEsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xFLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKO0FBRUQsTUFBTSxVQUFVLE1BQU0sQ0FDbEIsUUFBc0MsRUFBRSxFQUN4QyxJQUFJLEdBQUcsU0FBUztJQUVoQixVQUFVLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDekQsQ0FBQyJ9