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
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
const dom_1 = require("@coffeekraken/sugar/dom");
const object_1 = require("@coffeekraken/sugar/object");
const lit_1 = require("lit");
const SScrollComponentInterface_1 = __importDefault(require("./interface/SScrollComponentInterface"));
const define_1 = __importDefault(require("./define"));
exports.define = define_1.default;
// @ts-ignore
const s_scroll_css_1 = __importDefault(require("../../../../src/css/s-scroll.css")); // relative to /dist/pkg/esm/js
class SScrollComponent extends s_lit_component_1.default {
    static get properties() {
        return s_lit_component_1.default.createProperties({}, SScrollComponentInterface_1.default);
    }
    static get styles() {
        return (0, lit_1.css) `
            ${(0, lit_1.unsafeCSS)(`
                ${s_scroll_css_1.default}
            `)}
        `;
    }
    constructor() {
        super((0, object_1.__deepMerge)({
            name: 's-scroll',
            interface: SScrollComponentInterface_1.default,
        }));
    }
    firstUpdated() {
        return __awaiter(this, void 0, void 0, function* () {
            this.addEventListener('click', (e) => {
                e.preventDefault();
                this._scrollTo(this.props.to);
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
                (0, dom_1.__scrollTo)('top', {
                    duration,
                    offset,
                    offsetX,
                    offsetY,
                });
                break;
            case 'bottom':
                (0, dom_1.__scrollTo)('bottom', {
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
                (0, dom_1.__scrollTo)($target, {
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
exports.default = SScrollComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7QUFFZCxvRkFFdUM7QUFDdkMsb0VBQTZDO0FBQzdDLGlEQUFxRDtBQUNyRCx1REFBeUQ7QUFDekQsNkJBQTJDO0FBQzNDLHNHQUFnRjtBQUVoRixzREFBZ0M7QUF5SVgsaUJBeklkLGdCQUFRLENBeUlZO0FBdkkzQixhQUFhO0FBQ2Isb0ZBQXFELENBQUMsK0JBQStCO0FBZ0RyRixNQUFxQixnQkFBaUIsU0FBUSx5QkFBZTtJQUN6RCxNQUFNLEtBQUssVUFBVTtRQUNqQixPQUFPLHlCQUFlLENBQUMsZ0JBQWdCLENBQ25DLEVBQUUsRUFDRixtQ0FBMkIsQ0FDOUIsQ0FBQztJQUNOLENBQUM7SUFFRCxNQUFNLEtBQUssTUFBTTtRQUNiLE9BQU8sSUFBQSxTQUFHLEVBQUE7Y0FDSixJQUFBLGVBQVMsRUFBQztrQkFDTixzQkFBSzthQUNWLENBQUM7U0FDTCxDQUFDO0lBQ04sQ0FBQztJQUVEO1FBQ0ksS0FBSyxDQUNELElBQUEsb0JBQVcsRUFBQztZQUNSLElBQUksRUFBRSxVQUFVO1lBQ2hCLFNBQVMsRUFBRSxtQ0FBMkI7U0FDekMsQ0FBQyxDQUNMLENBQUM7SUFDTixDQUFDO0lBQ0ssWUFBWTs7WUFDZCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2pDLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2xDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztLQUFBO0lBQ0QsU0FBUyxDQUFDLE1BQWM7UUFDcEIsTUFBTSxZQUFZLEdBQUcsaUJBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDNUMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEtBQUksWUFBWSxhQUFaLFlBQVksdUJBQVosWUFBWSxDQUFFLFFBQVEsQ0FBQSxJQUFJLEdBQUcsQ0FBQztRQUN0RSxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxZQUFZLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztRQUM3RCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBSSxZQUFZLENBQUMsT0FBTyxJQUFJLE1BQU0sQ0FBQztRQUNyRSxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBSSxZQUFZLENBQUMsT0FBTyxJQUFJLE1BQU0sQ0FBQztRQUVyRSxRQUFRLE1BQU0sRUFBRTtZQUNaLEtBQUssS0FBSztnQkFDTixJQUFBLGdCQUFVLEVBQUMsS0FBSyxFQUFFO29CQUNkLFFBQVE7b0JBQ1IsTUFBTTtvQkFDTixPQUFPO29CQUNQLE9BQU87aUJBQ1YsQ0FBQyxDQUFDO2dCQUNILE1BQU07WUFDVixLQUFLLFFBQVE7Z0JBQ1QsSUFBQSxnQkFBVSxFQUFDLFFBQVEsRUFBRTtvQkFDakIsUUFBUTtvQkFDUixNQUFNO29CQUNOLE9BQU87b0JBQ1AsT0FBTztpQkFDVixDQUFDLENBQUM7Z0JBQ0gsTUFBTTtZQUNWO2dCQUNJLGdDQUFnQztnQkFDaEMsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDL0MsSUFBSSxDQUFDLE9BQU87b0JBQUUsT0FBTztnQkFFckIsSUFBQSxnQkFBVSxFQUFDLE9BQU8sRUFBRTtvQkFDaEIsUUFBUTtvQkFDUixNQUFNO29CQUNOLE9BQU87b0JBQ1AsT0FBTztpQkFDVixDQUFDLENBQUM7Z0JBRUgsTUFBTTtTQUNiO0lBQ0wsQ0FBQztJQUNELE1BQU07UUFDRixPQUFPLElBQUEsVUFBSSxFQUFBLEVBQUUsQ0FBQztJQUNsQixDQUFDO0NBQ0o7QUF4RUQsbUNBd0VDIn0=