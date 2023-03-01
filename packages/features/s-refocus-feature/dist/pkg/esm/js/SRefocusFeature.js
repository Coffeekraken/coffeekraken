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
import { __scrollTo } from '@coffeekraken/sugar/dom';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __SRefocusFeatureInterface from './interface/SRefocusFeatureInterface';
import { __closestScrollable } from '@coffeekraken/sugar/dom';
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
 * This feature will occurs on these actions:
 * - At page display, check the anchor and refocus if found an element with the correct id
 * - At some events like: popstate, hashchange and pushstate.
 *    - Note that the "pushstate" event is emitted by a proxies `history.pushState` method.
 *    - In order to make the refocus happend, your pushed state MUST have the `scroll` property to `true`
 * - On any events specified in the `props.trigger` property using this syntax: `event:click`, etc...
 *
 * @support          chromium
 * @support          firefox
 * @support          safari
 * @support          edge
 *
 * @import          import { define as __SRefocusFeatureDefine } from '@coffeekraken/s-refocus-feature';
 *
 * @snippet         __SRefocusFeatureDefine($1)
 *
 * @install         js
 * import { define as __SRefocusFeatureDefine } from '@coffeekraken/s-refocus-feature';
 * __SRefocusFeatureDefine();
 *
 * @install         bash
 * npm i @coffeekraken/s-form-validate-feature
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
        this._currentScrolledTargets = [];
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
                    ['hashchange', 'popstate', 'pushstate'].forEach((eventName) => {
                        window.addEventListener(eventName, (e) => {
                            var _a;
                            // if the event is the custom "pushstate"
                            // make sure that the state object has the "scroll" property to "true"
                            if (eventName === 'pushstate' &&
                                !((_a = e.detail) === null || _a === void 0 ? void 0 : _a.scroll)) {
                                return;
                            }
                            if (document.location.hash) {
                                const $targetElm = this.node.querySelector(document.location.hash);
                                if ($targetElm) {
                                    this._scrollTo($targetElm);
                                }
                            }
                            else {
                                setTimeout(() => {
                                    // scroll to top
                                    this._scrollTo(document.body);
                                }, 100);
                            }
                        });
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
        return __awaiter(this, void 0, void 0, function* () {
            // do not scroll to an element already in the current stack
            if (this._currentScrolledTargets.includes($elm)) {
                return;
            }
            // do not scroll to a none existing element
            if ($elm !== document.body && !this.node.contains($elm)) {
                return;
            }
            // // avoid scrolling if unecessary
            // const scrollTop =
            //     $elm === document.body
            //         ? document.documentElement.scrollTop
            //         : $elm.scrollTop;
            // const bounds = $elm.getBoundingClientRect();
            // console.log('bounds', bounds);
            // if (scrollTop > this.props.minToScroll) {
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
            // handle scrollable containers
            let $scrollable = __closestScrollable($elm);
            // do not scroll multiple times the same container
            if ($scrollable._isScrolling) {
                return;
            }
            $scrollable._isScrolling = true;
            // maintain the current scrollable stack
            if ($scrollable._sRefocusFeatureCurrentElm) {
                this._currentScrolledTargets.splice(this._currentScrolledTargets.indexOf($scrollable._sRefocusFeatureCurrentElm, 1));
            }
            $scrollable._sRefocusFeatureCurrentElm = $elm;
            this._currentScrolledTargets.push($elm);
            // scroll to element
            yield __scrollTo($elm, Object.assign(Object.assign({}, scrollToSettings), { $elm: $scrollable, force: true }));
            // reset the scrolling state
            $scrollable._isScrolling = false;
            // }
            // add and remove a "focused" class
            if (this.props.focusedClass && $elm !== document.body) {
                $elm.classList.add(this.props.focusedClass);
                setTimeout(() => {
                    $elm.classList.remove(this.props.focusedClass);
                }, this.props.focusedClassDuration);
            }
        });
    }
}
export { __define as define };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUVyRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTywwQkFBMEIsTUFBTSxzQ0FBc0MsQ0FBQztBQUU5RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUU5RCxPQUFPLFFBQVEsTUFBTSxVQUFVLENBQUM7QUFrQmhDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtERztBQUNILE1BQU0sQ0FBQyxPQUFPLE9BQU8sZUFBZ0IsU0FBUSxVQUFVO0lBR25ELFlBQVksSUFBWSxFQUFFLElBQWlCLEVBQUUsUUFBYTtRQUN0RCxLQUFLLENBQ0QsSUFBSSxFQUNKLElBQUksRUFDSixXQUFXLENBQ1A7WUFDSSxJQUFJLEVBQUUsV0FBVztZQUNqQixTQUFTLEVBQUUsMEJBQTBCO1NBQ3hDLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUFiTiw0QkFBdUIsR0FBa0IsRUFBRSxDQUFDO0lBYzVDLENBQUM7SUFDRCxLQUFLO1FBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDbkMsUUFBUSxPQUFPLEVBQUU7Z0JBQ2IsS0FBSyxRQUFRO29CQUNULFVBQVUsQ0FBQyxHQUFHLEVBQUU7d0JBQ1osSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRTs0QkFDeEIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQ3RDLFFBQVEs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