"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SSliderBehavior_1 = __importDefault(require("../SSliderBehavior"));
const SSliderCssAnimationBehaviorInterface_1 = __importDefault(require("./interface/SSliderCssAnimationBehaviorInterface"));
// @ts-ignore
const s_slider_slideable_behavior_css_1 = __importDefault(require("../../../../../src/css/s-slider-slideable-behavior.css")); // relative to /dist/pkg/esm/js/behaviors
class SSliderCssAnimationBehavior extends SSliderBehavior_1.default {
    /**
     * @name            constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings) {
        super(Object.assign(Object.assign({}, SSliderCssAnimationBehaviorInterface_1.default.defaults()), settings));
    }
    static get properties() {
        return SSliderBehavior_1.default.properties({}, SSliderCssAnimationBehaviorInterface_1.default);
    }
    static get styles() {
        return s_slider_slideable_behavior_css_1.default;
    }
    firstUpdated() {
        this.$slider.$slides.forEach(($slide) => {
            console.log($slide);
            // const cssAnimation = new __SCssAnimation($slide);
            // __onDrag($slide, (e) => {
            //     const percent = (100 / 500) * Math.abs(e.deltaX);
            //     console.log(percent);
            //     cssAnimation.seekTo(percent);
            // });
        });
        // handle slide
        // this._handleSlide();
        // this.$slider.addEventListener('s-slider-goto', (e) => {
        //     // @ts-ignore
        //     this._$lastGoToSlide = e.detail.$slide;
        // });
    }
}
exports.default = SSliderCssAnimationBehavior;
SSliderCssAnimationBehavior.interface = SSliderCssAnimationBehaviorInterface_1.default;
SSliderCssAnimationBehavior.id = 'cssAnimation';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEseUVBQW1EO0FBQ25ELDRIQUFzRztBQUV0RyxhQUFhO0FBQ2IsNkhBQTJFLENBQUMseUNBQXlDO0FBTXJILE1BQXFCLDJCQUE0QixTQUFRLHlCQUFpQjtJQWtCdEU7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUFtQztRQUMzQyxLQUFLLGlDQUNFLDhDQUFzQyxDQUFDLFFBQVEsRUFBRSxHQUNqRCxRQUFRLEVBQ2IsQ0FBQztJQUNQLENBQUM7SUFoQ0QsTUFBTSxLQUFLLFVBQVU7UUFDakIsT0FBTyx5QkFBaUIsQ0FBQyxVQUFVLENBQy9CLEVBQUUsRUFDRiw4Q0FBc0MsQ0FDekMsQ0FBQztJQUNOLENBQUM7SUFFRCxNQUFNLEtBQUssTUFBTTtRQUNiLE9BQU8seUNBQUssQ0FBQztJQUNqQixDQUFDO0lBeUJELFlBQVk7UUFDUixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNwQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRXBCLG9EQUFvRDtZQUVwRCw0QkFBNEI7WUFDNUIsd0RBQXdEO1lBQ3hELDRCQUE0QjtZQUU1QixvQ0FBb0M7WUFDcEMsTUFBTTtRQUNWLENBQUMsQ0FBQyxDQUFDO1FBRUgsZUFBZTtRQUNmLHVCQUF1QjtRQUN2QiwwREFBMEQ7UUFDMUQsb0JBQW9CO1FBQ3BCLDhDQUE4QztRQUM5QyxNQUFNO0lBQ1YsQ0FBQzs7QUF2REwsOENBc0VDO0FBMURVLHFDQUFTLEdBQUcsOENBQXNDLENBQUM7QUFDbkQsOEJBQUUsR0FBRyxjQUFjLENBQUMifQ==