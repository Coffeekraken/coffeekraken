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
var _wr = function (type) {
    var orig = history[type];
    return function () {
        var rv = orig.apply(this, arguments);
        var e = new Event(type);
        e.arguments = arguments;
        window.dispatchEvent(e);
        return rv;
    };
};
history.pushState = _wr('pushstate');
class SRefocusFeature extends s_feature_1.default {
    constructor(name, node, settings) {
        super(name, node, (0, object_1.__deepMerge)({
            name: 's-refocus',
            interface: SRefocusFeatureInterface_1.default,
        }, settings !== null && settings !== void 0 ? settings : {}));
    }
    mount() {
        console.log('props', this.props);
        this.props.trigger.forEach((trigger) => {
            switch (trigger) {
                case 'anchor':
                    setTimeout(() => {
                        console.log('COCO');
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
                        console.log('HASH change!', document.location.hash);
                        if (document.location.hash) {
                            const $targetElm = this.node.querySelector(document.location.hash);
                            if ($targetElm) {
                                this._scrollTo($targetElm);
                            }
                        }
                    });
                    window.addEventListener('popstate', (e) => {
                        console.log('HASH', document.location.hash);
                        if (document.location.hash) {
                            const $targetElm = this.node.querySelector(document.location.hash);
                            if ($targetElm) {
                                this._scrollTo($targetElm);
                            }
                        }
                    });
                    window.addEventListener('pushstate', (e) => {
                        console.log('PUSH HASH', document.location.hash);
                        if (document.location.hash) {
                            const $targetElm = this.node.querySelector(document.location.hash);
                            if ($targetElm) {
                                this._scrollTo($targetElm);
                            }
                        }
                    });
                    break;
                default:
                    // if (trigger.match(/^event:/)) {
                    //     const event = trigger.replace('event:', '').trim();
                    //     this.node.addEventListener(event, (e) => {
                    //         this._scrollTo(e.target);
                    //     });
                    // }
                    break;
            }
        });
    }
    _scrollTo($elm) {
        return __awaiter(this, void 0, void 0, function* () {
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
            // handle nested scrollable containers
            let $nestedScrollables = [];
            let $scrollable = (0, dom_2.__closestScrollable)($elm);
            // while ($scrollable) {
            //     $nestedScrollables.push($scrollable);
            //     $scrollable = __closestScrollable($scrollable);
            // }
            // if ($scrollable && !$nestedScrollables.includes($scrollable)) {
            //     $nestedScrollables.push($scrollable);
            // }
            // reverse the nestedScrollables to refocus it correctly
            // $nestedScrollables = $nestedScrollables.reverse();
            console.log('Scroll', $scrollable === window ? 'window' : 'node', $elm, 'scrollable', $scrollable);
            // scroll to element
            yield (0, dom_1.__scrollTo)($elm, Object.assign(Object.assign({}, scrollToSettings), { $elm: $scrollable !== null && $scrollable !== void 0 ? $scrollable : this.node }));
            // add and remove a "focused" class
            if (this.props.focusedClass) {
                $elm.classList.add(this.props.focusedClass);
                setTimeout(() => {
                    $elm.classList.remove(this.props.focusedClass);
                }, this.props.focusedClassDuration);
            }
        });
    }
}
exports.default = SRefocusFeature;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdFQUFpRDtBQUNqRCxpREFBcUQ7QUFFckQsdURBQXlEO0FBQ3pELG9HQUE4RTtBQUU5RSxpREFBOEQ7QUFFOUQsc0RBQWdDO0FBc01YLGlCQXRNZCxnQkFBUSxDQXNNWTtBQXJMM0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWlDRztBQUVILElBQUksR0FBRyxHQUFHLFVBQVUsSUFBSTtJQUNwQixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekIsT0FBTztRQUNILElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxHQUFHLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQ3hCLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDLENBQUM7QUFDTixDQUFDLENBQUM7QUFDRixPQUFPLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUVyQyxNQUFxQixlQUFnQixTQUFRLG1CQUFVO0lBQ25ELFlBQVksSUFBWSxFQUFFLElBQWlCLEVBQUUsUUFBYTtRQUN0RCxLQUFLLENBQ0QsSUFBSSxFQUNKLElBQUksRUFDSixJQUFBLG9CQUFXLEVBQ1A7WUFDSSxJQUFJLEVBQUUsV0FBVztZQUNqQixTQUFTLEVBQUUsa0NBQTBCO1NBQ3hDLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7SUFDTixDQUFDO0lBQ0QsS0FBSztRQUNELE9BQU8sQ0FBQyxHQUFH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