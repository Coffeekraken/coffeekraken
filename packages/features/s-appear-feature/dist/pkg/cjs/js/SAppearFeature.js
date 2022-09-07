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
const s_sugar_element_1 = __importDefault(require("@coffeekraken/s-sugar-element"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
const dom_1 = require("@coffeekraken/sugar/dom");
const appendStyleTag_1 = __importDefault(require("@coffeekraken/sugar/js/dom/tag/appendStyleTag"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const uniqid_1 = __importDefault(require("@coffeekraken/sugar/shared/string/uniqid"));
const SAppearFeatureInterface_1 = __importDefault(require("./interface/SAppearFeatureInterface"));
// @ts-ignore
const s_appear_feature_css_1 = __importDefault(require("../../../../src/css/s-appear-feature.css")); // relative to /dist/pkg/esm/js
class SAppearFeature extends s_feature_1.default {
    // @ts-ignore
    constructor(name, node, settings) {
        super(name, node, (0, deepMerge_1.default)({
            name: 's-appear',
            interface: SAppearFeatureInterface_1.default,
            style: s_appear_feature_css_1.default,
        }, settings !== null && settings !== void 0 ? settings : {}));
        // add the s-appear attribute if not present
        if (!this.node.hasAttribute('s-appear')) {
            this.node.setAttribute('s-appear', true);
        }
    }
    mount() {
        return __awaiter(this, void 0, void 0, function* () {
            // check if the element is fully loaded (for images)
            switch (this.node.tagName.toLowerCase()) {
                case 'img':
                    yield (0, dom_1.__whenImageLoaded)(this.node);
                    this.appear();
                    break;
                default:
                    // get the images in the node
                    const $imgs = this.node.querySelectorAll('img');
                    if ($imgs.length) {
                        yield (0, dom_1.__whenImagesLoaded)($imgs);
                    }
                    this.appear();
                    break;
            }
        });
    }
    appear() {
        if (this.node.id === 'features-frontend') {
            console.log('APPEAR');
        }
        const appearId = (0, uniqid_1.default)();
        let delay = this.props.delay[0];
        if (this.props.delay.length === 2) {
            const minDelay = this.props.delay[0], maxDelay = this.props.delay[1];
            delay = minDelay + (maxDelay - minDelay) * Math.random();
        }
        let duration = this.props.duration[0];
        if (this.props.duration.length === 2) {
            const minDuration = this.props.duration[0], maxDuration = this.props.duration[1];
            duration =
                minDuration + (maxDuration - minDuration) * Math.random();
        }
        let distance = this.props.distance[0];
        if (this.props.distance.length === 2) {
            const minDistance = this.props.distance[0], maxDistance = this.props.distance[1];
            distance =
                minDistance + (maxDistance - minDistance) * Math.random();
        }
        const sugarElement = new s_sugar_element_1.default(this.node);
        setTimeout(() => {
            this.props.appear = true;
            let distanceX = 0, distanceY = 0;
            switch (this.props.in) {
                case 'top':
                    distanceY = distance * -1;
                    break;
                case 'bottom':
                    distanceY = distance;
                    break;
                case 'left':
                    distanceX = distance * -1;
                    break;
                case 'right':
                    distanceX = distance;
                    break;
            }
            const newTransforms = sugarElement.simulateTransform({
                translateX: distanceX,
                translateY: distanceY,
            });
            const animationStr = `
                @keyframes s-appear-${appearId} {
                    from {
                        transform: ${newTransforms.matrix};
                        opacity: 0;
                    }
                    to {
                        transform: ${sugarElement.matrixStr};
                        opacity: 1;
                    }
                }
                [s-appear-id="${appearId}"] {
                    animation: s-appear-${appearId} ${duration / 1000}s ${s_theme_1.default.get('easing.default')} forwards;
                }
            `;
            // add style into the page and assign the animation to the node element
            const $style = (0, appendStyleTag_1.default)(animationStr);
            this.node.setAttribute('s-appear-id', appearId);
            // after animation, remove the animation totally
            setTimeout(() => {
                this.node.removeAttribute('s-appear-id');
                $style.remove();
            }, duration);
        }, delay);
    }
}
exports.default = SAppearFeature;
function define(props = {}, name = 's-appear') {
    s_feature_1.default.defineFeature(name, SAppearFeature, Object.assign({ mountWhen: 'entersViewport' }, props));
}
exports.define = define;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdFQUFpRDtBQUNqRCxvRkFBNEQ7QUFDNUQsb0VBQTZDO0FBQzdDLGlEQUFnRjtBQUNoRixtR0FBNkU7QUFDN0UsNEZBQXNFO0FBQ3RFLHNGQUFnRTtBQUNoRSxrR0FBNEU7QUFFNUUsYUFBYTtBQUNiLG9HQUE2RCxDQUFDLCtCQUErQjtBQTZEN0YsTUFBcUIsY0FBZSxTQUFRLG1CQUFVO0lBQ2xELGFBQWE7SUFDYixZQUFZLElBQVksRUFBRSxJQUFpQixFQUFFLFFBQWE7UUFDdEQsS0FBSyxDQUNELElBQUksRUFDSixJQUFJLEVBQ0osSUFBQSxtQkFBVyxFQUNQO1lBQ0ksSUFBSSxFQUFFLFVBQVU7WUFDaEIsU0FBUyxFQUFFLGlDQUF5QjtZQUNwQyxLQUFLLEVBQUUsOEJBQUs7U0FDZixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO1FBRUYsNENBQTRDO1FBQzVDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUNyQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDNUM7SUFDTCxDQUFDO0lBRUssS0FBSzs7WUFDUCxvREFBb0Q7WUFDcEQsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRTtnQkFDckMsS0FBSyxLQUFLO29CQUNOLE1BQU0sSUFBQSx1QkFBaUIsRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ25DLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDZCxNQUFNO2dCQUNWO29CQUNJLDZCQUE2QjtvQkFDN0IsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUks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