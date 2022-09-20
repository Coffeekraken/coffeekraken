import __SFeature from '@coffeekraken/s-feature';
import { __scrollTo } from '@coffeekraken/sugar/dom';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __SRefocusFeatureInterface from './interface/SRefocusFeatureInterface';
import __define from './define';
/**
 * @name            SRefocusFeature
 * @as              Refocus
 * @namespace       js
 * @type            Feature
 * @interface       ./interface/SRefocusFeatureInterface.ts
 * @menu            Styleguide / Features               /styleguide/feature/s-activate-feature
 * @platform        js
 * @status          beta
 *
 * This feature allows you to automatically visually refocus an element that is inside a scrollable one on different trigger(s) like events, etc...
 *
 * @support          chromium
 * @support          firefox
 * @support          safari
 * @support          edge
 *
 * @example         html            Simple usage
 * <div class="scrollable" s-refocus trigger="event:actual">
 *    <ul>
 *       <li>
 *          <a href="#hello">Hello</a>
 *          <!-- when this element dispatch an "actual" event,
 *               it will be refocused -->
 *       </li>
 *       <li>
 *          <a href="#world">World</a>
 *       </li>
 *    </ul>
 * </div>
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SRefocusFeature extends __SFeature {
    constructor(name, node, settings) {
        super(name, node, __deepMerge({
            name: 's-refocus',
            interface: __SRefocusFeatureInterface,
        }, settings !== null && settings !== void 0 ? settings : {}));
    }
    mount() {
        this.props.trigger.forEach((trigger) => {
            switch (trigger) {
                case 'anchor':
                    setTimeout(() => {
                        if (document.location.hash) {
                            const $targetElm = this.node.querySelector(document.location.hash);
                            if ($targetElm) {
                                this._scrollTo($targetElm);
                            }
                        }
                    }, this.props.timeout);
                    break;
                case 'history':
                    window.addEventListener('hashchange', (e) => {
                        if (document.location.hash) {
                            const $targetElm = this.node.querySelector(document.location.hash);
                            if ($targetElm) {
                                this._scrollTo($targetElm);
                            }
                        }
                    });
                    window.addEventListener('popstate', (e) => {
                        if (document.location.hash) {
                            const $targetElm = this.node.querySelector(document.location.hash);
                            if ($targetElm) {
                                this._scrollTo($targetElm);
                            }
                        }
                    });
                    break;
                default:
                    if (trigger.match(/^event:/)) {
                        const event = trigger.replace('event:', '').trim();
                        this.node.addEventListener(event, (e) => {
                            this._scrollTo(e.target);
                        });
                    }
                    break;
            }
        });
    }
    _scrollTo($elm) {
        const scrollToSettings = {
            $elm: this.node,
        };
        if (this.props.duration)
            scrollToSettings.duration = this.props.duration;
        if (this.props.easing)
            scrollToSettings.easing = this.props.easing;
        if (this.props.offset)
            scrollToSettings.offset = this.props.offset;
        if (this.props.offsetX)
            scrollToSettings.offsetX = this.props.offsetX;
        if (this.props.offsetY)
            scrollToSettings.offsetY = this.props.offsetY;
        if (this.props.align)
            scrollToSettings.align = this.props.align;
        if (this.props.justify)
            scrollToSettings.justify = this.props.justify;
        __scrollTo($elm, scrollToSettings);
    }
}
export { __define as define };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUVyRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTywwQkFBMEIsTUFBTSxzQ0FBc0MsQ0FBQztBQUU5RSxPQUFPLFFBQVEsTUFBTSxVQUFVLENBQUM7QUFlaEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWlDRztBQUNILE1BQU0sQ0FBQyxPQUFPLE9BQU8sZUFBZ0IsU0FBUSxVQUFVO0lBQ25ELFlBQVksSUFBWSxFQUFFLElBQWlCLEVBQUUsUUFBYTtRQUN0RCxLQUFLLENBQ0QsSUFBSSxFQUNKLElBQUksRUFDSixXQUFXLENBQ1A7WUFDSSxJQUFJLEVBQUUsV0FBVztZQUNqQixTQUFTLEVBQUUsMEJBQTBCO1NBQ3hDLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7SUFDTixDQUFDO0lBQ0QsS0FBSztRQUNELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ25DLFFBQVEsT0FBTyxFQUFFO2dCQUNiLEtBQUssUUFBUTtvQkFDVCxVQUFVLENBQUMsR0FBRyxFQUFFO3dCQUNaLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7NEJBQ3hCLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUN0QyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDekIsQ0FBQzs0QkFDRixJQUFJLFVBQVUsRUFBRTtnQ0FDWixJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDOzZCQUM5Qjt5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