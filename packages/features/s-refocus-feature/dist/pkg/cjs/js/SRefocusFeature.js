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
const object_1 = require("@coffeekraken/sugar/object");
const SRefocusFeatureInterface_1 = __importDefault(require("./interface/SRefocusFeatureInterface"));
const dom_2 = require("@coffeekraken/sugar/dom");
const define_1 = __importDefault(require("./define"));
exports.define = define_1.default;
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
class SRefocusFeature extends s_feature_1.default {
    constructor(name, node, settings) {
        super(name, node, (0, object_1.__deepMerge)({
            name: 's-refocus',
            interface: SRefocusFeatureInterface_1.default,
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
            let $scrollable = (0, dom_2.__closestScrollable)($elm);
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
            yield (0, dom_1.__scrollTo)($elm, Object.assign(Object.assign({}, scrollToSettings), { $elm: $scrollable, force: true }));
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
exports.default = SRefocusFeature;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdFQUFpRDtBQUNqRCxpREFBcUQ7QUFFckQsdURBQXlEO0FBQ3pELG9HQUE4RTtBQUU5RSxpREFBOEQ7QUFFOUQsc0RBQWdDO0FBc05YLGlCQXROZCxnQkFBUSxDQXNOWTtBQXBNM0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0RHO0FBQ0gsTUFBcUIsZUFBZ0IsU0FBUSxtQkFBVTtJQUduRCxZQUFZLElBQVksRUFBRSxJQUFpQixFQUFFLFFBQWE7UUFDdEQsS0FBSyxDQUNELElBQUksRUFDSixJQUFJLEVBQ0osSUFBQSxvQkFBVyxFQUNQO1lBQ0ksSUFBSSxFQUFFLFdBQVc7WUFDakIsU0FBUyxFQUFFLGtDQUEwQjtTQUN4QyxFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO1FBYk4sNEJBQXVCLEdBQWtCLEVBQUUsQ0FBQztJQWM1QyxDQUFDO0lBQ0QsS0FBSztRQUNELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ25DLFFBQVEsT0FBTyxFQUFFO2dCQUNiLEtBQUssUUFBUTtvQkFDVCxVQUFVLENBQUMsR0FBRyxFQUFFO3dCQUNaLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7NEJBQ3hCLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUN0QyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDekIsQ0FBQzs0QkFDRixJQUFJLFVBQVUsRUFBRTtnQ0FDWixJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDOzZCQUM5Qjt5QkFDSjtvQkFDTCxDQUFDLEVBQUUsSUFBSSxD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