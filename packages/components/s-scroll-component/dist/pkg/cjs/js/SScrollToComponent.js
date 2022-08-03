"use strict";
// @ts-nocheck
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
const lit_1 = require("lit");
const SScrollToComponentInterface_1 = __importDefault(require("./interface/SScrollToComponentInterface"));
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const scrollTo_1 = __importDefault(require("@coffeekraken/sugar/js/dom/scroll/scrollTo"));
// @ts-ignore
const s_scroll_to_css_1 = __importDefault(require("../../../../src/css/s-scroll-to.css")); // relative to /dist/pkg/esm/js
class SScrollToComponent extends s_lit_component_1.default {
    static get properties() {
        return s_lit_component_1.default.properties({}, SScrollToComponentInterface_1.default);
    }
    static get styles() {
        return (0, lit_1.css) `
            ${(0, lit_1.unsafeCSS)(`
                ${s_scroll_to_css_1.default}
            `)}
        `;
    }
    constructor() {
        super((0, deepMerge_1.default)({
            litComponent: {
                shadowDom: false,
            },
            componentUtils: {
                interface: SScrollToComponentInterface_1.default,
            },
        }));
    }
    firstUpdated() {
        return __awaiter(this, void 0, void 0, function* () {
            this.addEventListener('click', (e) => {
                e.preventDefault();
                this._scrollTo(this.getAttribute('href'));
            });
        });
    }
    _scrollTo(target) {
        const scrollConfig = s_theme_1.default.get('scroll');
        const duration = this.props.duration || (scrollConfig === null || scrollConfig === void 0 ? void 0 : scrollConfig.duration) || 300;
        const offset = this.props.offset || scrollConfig.offset || 0;
        const offsetX = this.props.offsetX || scrollConfig.offsetX || offset;
        const offsetY = this.props.offsetY || scrollConfig.offsetY || offset;
        switch (target) {
            case 'top':
                (0, scrollTo_1.default)('top', {
                    duration,
                    offset,
                    offsetX,
                    offsetY,
                });
                break;
            case 'bottom':
                (0, scrollTo_1.default)('bottom', {
                    duration,
                    offset,
                    offsetX,
                    offsetY,
                });
                break;
            default:
                // grab the element to scroll to
                const $target = document.querySelector(target);
                if (!$target)
                    return;
                (0, scrollTo_1.default)($target, {
                    duration,
                    offset,
                    offsetX,
                    offsetY,
                });
                break;
        }
    }
    render() {
        return (0, lit_1.html) ``;
    }
}
exports.default = SScrollToComponent;
/**
 * @name            webcomponent
 * @type            Function
 *
 * This function allows you to define (register) your webcomponent with some default
 * props if needed.
 *
 * @param           {any}           [props={}]              Some default props you want to set for your webcomponent
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function define(props = {}, tagName = 's-scroll') {
    s_lit_component_1.default.setDefaultProps(tagName, props);
    customElements.define(tagName, SScrollToComponent);
}
exports.define = define;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7QUFFZCw2QkFBMkM7QUFDM0MsMEdBQW9GO0FBQ3BGLG9GQUV1QztBQUV2QyxvRUFBNkM7QUFDN0MsNEZBQXNFO0FBQ3RFLDBGQUFvRTtBQUVwRSxhQUFhO0FBQ2IsMEZBQXdELENBQUMsK0JBQStCO0FBMEN4RixNQUFxQixrQkFBbUIsU0FBUSx5QkFBZTtJQUMzRCxNQUFNLEtBQUssVUFBVTtRQUNqQixPQUFPLHlCQUFlLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxxQ0FBNkIsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFFRCxNQUFNLEtBQUssTUFBTTtRQUNiLE9BQU8sSUFBQSxTQUFHLEVBQUE7Y0FDSixJQUFBLGVBQVMsRUFBQztrQkFDTix5QkFBSzthQUNWLENBQUM7U0FDTCxDQUFDO0lBQ04sQ0FBQztJQUVEO1FBQ0ksS0FBSyxDQUNELElBQUEsbUJBQVcsRUFBQztZQUNSLFlBQVksRUFBRTtnQkFDVixTQUFTLEVBQUUsS0FBSzthQUNuQjtZQUNELGNBQWMsRUFBRTtnQkFDWixTQUFTLEVBQUUscUNBQTZCO2FBQzNDO1NBQ0osQ0FBQyxDQUNMLENBQUM7SUFDTixDQUFDO0lBQ0ssWUFBWTs7WUFDZCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2pDLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDOUMsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO0tBQUE7SUFDRCxTQUFTLENBQUMsTUFBYztRQUNwQixNQUFNLFlBQVksR0FBRyxpQkFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1QyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsS0FBSSxZQUFZLGFBQVosWUFBWSx1QkFBWixZQUFZLENBQUUsUUFBUSxDQUFBLElBQUksR0FBRyxDQUFDO1FBQ3RFLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLFlBQVksQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO1FBQzdELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLFlBQVksQ0FBQyxPQUFPLElBQUksTUFBTSxDQUFDO1FBQ3JFLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLFlBQVksQ0FBQyxPQUFPLElBQUksTUFBTSxDQUFDO1FBRXJFLFFBQVEsTUFBTSxFQUFFO1lBQ1osS0FBSyxLQUFLO2dCQUNOLElBQUEsa0JBQVUsRUFBQyxLQUFLLEVBQUU7b0JBQ2QsUUFBUTtvQkFDUixNQUFNO29CQUNOLE9BQU87b0JBQ1AsT0FBTztpQkFDVixDQUFDLENBQUM7Z0JBQ0gsTUFBTTtZQUNWLEtBQUssUUFBUTtnQkFDVCxJQUFBLGtCQUFVLEVBQUMsUUFBUSxFQUFFO29CQUNqQixRQUFRO29CQUNSLE1BQU07b0JBQ04sT0FBTztvQkFDUCxPQUFPO2lCQUNWLENBQUMsQ0FBQztnQkFDSCxNQUFNO1lBQ1Y7Z0JBQ0ksZ0NBQWdDO2dCQUNoQyxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUMvQyxJQUFJLENBQUMsT0FBTztvQkFBRSxPQUFPO2dCQUVyQixJQUFBLGtCQUFVLEVBQUMsT0FBTyxFQUFFO29CQUNoQixRQUFRO29CQUNSLE1BQU07b0JBQ04sT0FBTztvQkFDUCxPQUFPO2lCQUNWLENBQUMsQ0FBQztnQkFFSCxNQUFNO1NBQ2I7SUFDTCxDQUFDO0lBQ0QsTUFBTTtRQUNGLE9BQU8sSUFBQSxVQUFJLEVBQUEsRUFBRSxDQUFDO0lBQ2xCLENBQUM7Q0FDSjtBQXpFRCxxQ0F5RUM7QUFFRDs7Ozs7Ozs7Ozs7R0FXRztBQUNILFNBQWdCLE1BQU0sQ0FDbEIsUUFBMkMsRUFBRSxFQUM3QyxPQUFPLEdBQUcsVUFBVTtJQUVwQix5QkFBZSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDaEQsY0FBYyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztBQUN2RCxDQUFDO0FBTkQsd0JBTUMifQ==