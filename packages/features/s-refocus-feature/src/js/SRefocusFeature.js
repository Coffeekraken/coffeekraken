import __SFeature from '@coffeekraken/s-feature';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SRefocusFeatureInterface from './interface/SRefocusFeatureInterface';
import __scrollTo from '@coffeekraken/sugar/js/dom/scroll/scrollTo';
/**
 * @name            SRefocusFeature
 * @namespace       js
 * @type            Feature
 * @interface       ./interface/SRefocusFeatureInterface.js
 * @menu            Styleguide / Features               /styleguide/features/s-activate-feature
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
 * @example         html
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SRefocusFeature extends __SFeature {
    constructor(name, node, settings) {
        super(name, node, __deepMerge({
            componentUtils: {
                interface: __SRefocusFeatureInterface,
            },
            feature: {},
        }, settings !== null && settings !== void 0 ? settings : {}));
    }
    mount() {
        this.props.trigger.forEach((trigger) => {
            switch (trigger) {
                case 'anchor':
                    if (document.location.hash) {
                        const $targetElm = this.node.querySelector(document.location.hash);
                        if ($targetElm) {
                            this._scrollTo($targetElm);
                        }
                    }
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
        var _a;
        __scrollTo($elm, Object.assign({ $elm: this.node }, (_a = this.props.scrollToSettings) !== null && _a !== void 0 ? _a : {}), this.props.timeout);
    }
}
export function define(props = {}, name = 's-refocus') {
    __SFeature.defineFeature(name, SRefocusFeature, props);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1JlZm9jdXNGZWF0dXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1JlZm9jdXNGZWF0dXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sMEJBQTBCLE1BQU0sc0NBQXNDLENBQUM7QUFHOUUsT0FBTyxVQUFpQyxNQUFNLDRDQUE0QyxDQUFDO0FBUTNGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWdDRztBQUNILE1BQU0sQ0FBQyxPQUFPLE9BQU8sZUFBZ0IsU0FBUSxVQUFVO0lBQ25ELFlBQVksSUFBWSxFQUFFLElBQWlCLEVBQUUsUUFBYTtRQUN0RCxLQUFLLENBQ0QsSUFBSSxFQUNKLElBQUksRUFDSixXQUFXLENBQ1A7WUFDSSxjQUFjLEVBQUU7Z0JBQ1osU0FBUyxFQUFFLDBCQUEwQjthQUN4QztZQUNELE9BQU8sRUFBRSxFQUFFO1NBQ2QsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztJQUNOLENBQUM7SUFDRCxLQUFLO1FBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDbkMsUUFBTyxPQUFPLEVBQUU7Z0JBQ1osS0FBSyxRQUFRO29CQUNULElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7d0JBQ3hCLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ25FLElBQUksVUFBVSxFQUFFOzRCQUNaLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7eUJBQzlCO3FCQUNKO29CQUNMLE1BQU07Z0JBQ04sS0FBSyxTQUFTO29CQUNWLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTt3QkFDeEMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRTs0QkFDeEIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDbkUsSUFBSSxVQUFVLEVBQUU7Z0NBQ1osSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQzs2QkFDOUI7eUJBQ0o7b0JBQ0wsQ0FBQyxDQUFDLENBQUM7b0JBQ1AsTUFBTTtnQkFDTjtvQkFDSSxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUU7d0JBQzFCLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO3dCQUNuRCxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFOzRCQUNwQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFDN0IsQ0FBQyxDQUFDLENBQUM7cUJBQ047b0JBQ0wsTUFBTTthQUNUO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsU0FBUyxDQUFDLElBQUk7O1FBQ1YsVUFBVSxDQUFDLElBQUksa0JBQ1gsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLElBQ1osTUFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixtQ0FBSSxFQUFFLEdBRXJDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDM0IsQ0FBQztDQUVKO0FBRUQsTUFBTSxVQUFVLE1BQU0sQ0FDbEIsUUFBd0MsRUFBRSxFQUMxQyxJQUFJLEdBQUcsV0FBVztJQUVsQixVQUFVLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxlQUFlLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDM0QsQ0FBQyJ9