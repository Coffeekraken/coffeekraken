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
const imageLoaded_1 = __importDefault(require("@coffeekraken/sugar/js/dom/load/imageLoaded"));
const imagesLoaded_1 = __importDefault(require("@coffeekraken/sugar/js/dom/load/imagesLoaded"));
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
                    yield (0, imageLoaded_1.default)(this.node);
                    this.appear();
                    break;
                default:
                    // get the images in the node
                    const $imgs = this.node.querySelectorAll('img');
                    if ($imgs.length) {
                        yield (0, imagesLoaded_1.default)($imgs);
                    }
                    this.appear();
                    break;
            }
        });
    }
    appear() {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdFQUFpRDtBQUNqRCxvRkFBNEQ7QUFDNUQsb0VBQTZDO0FBQzdDLDhGQUF3RTtBQUN4RSxnR0FBMEU7QUFDMUUsbUdBQTZFO0FBQzdFLDRGQUFzRTtBQUN0RSxzRkFBZ0U7QUFDaEUsa0dBQTRFO0FBRTVFLGFBQWE7QUFDYixvR0FBNkQsQ0FBQywrQkFBK0I7QUE2RDdGLE1BQXFCLGNBQWUsU0FBUSxtQkFBVTtJQUNsRCxhQUFhO0lBQ2IsWUFBWSxJQUFZLEVBQUUsSUFBaUIsRUFBRSxRQUFhO1FBQ3RELEtBQUssQ0FDRCxJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUEsbUJBQVcsRUFDUDtZQUNJLElBQUksRUFBRSxVQUFVO1lBQ2hCLFNBQVMsRUFBRSxpQ0FBeUI7WUFDcEMsS0FBSyxFQUFFLDhCQUFLO1NBQ2YsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQUVGLDRDQUE0QztRQUM1QyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzVDO0lBQ0wsQ0FBQztJQUVLLEtBQUs7O1lBQ1Asb0RBQW9EO1lBQ3BELFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUU7Z0JBQ3JDLEtBQUssS0FBSztvQkFDTixNQUFNLElBQUEscUJBQWEsRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQy9CLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDZCxNQUFNO2dCQUNWO29CQUNJLDZCQUE2QjtvQkFDN0IsTUFBTSxLQUFLLEdBQUcsSUFB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