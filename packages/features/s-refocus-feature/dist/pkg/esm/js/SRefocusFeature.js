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
import __SRefocusFeatureInterface from './interface/SRefocusFeatureInterface.js';
import { __closestScrollable } from '@coffeekraken/sugar/dom';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBRWpELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTywwQkFBMEIsTUFBTSx5Q0FBeUMsQ0FBQztBQUVqRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQWtCOUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0RHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sT0FBTyxlQUFnQixTQUFRLFVBQVU7SUFHbkQsWUFBWSxJQUFZLEVBQUUsSUFBaUIsRUFBRSxRQUFhO1FBQ3RELEtBQUssQ0FDRCxJQUFJLEVBQ0osSUFBSSxFQUNKLFdBQVcsQ0FDUDtZQUNJLElBQUksRUFBRSxXQUFXO1lBQ2pCLFNBQVMsRUFBRSwwQkFBMEI7U0FDeEMsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQWJOLDRCQUF1QixHQUFrQixFQUFFLENBQUM7SUFjNUMsQ0FBQztJQUNELEtBQUs7UUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUNuQyxRQUFRLE9BQU8sRUFBRTtnQkFDYixLQUFLLFFBQVE7b0JBQ1QsVUFBVSxDQUFDLEdBQUcsRUFBRTt3QkFDWixJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFOzRCQUN4QixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FDdEMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQ3pCLENBQUM7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