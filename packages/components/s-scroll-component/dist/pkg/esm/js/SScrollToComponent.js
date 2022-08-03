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
import { html, css, unsafeCSS } from 'lit';
import __SScrollToComponentInterface from './interface/SScrollToComponentInterface';
import __SLitComponent from '@coffeekraken/s-lit-component';
import __STheme from '@coffeekraken/s-theme';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __scrollTo from '@coffeekraken/sugar/js/dom/scroll/scrollTo';
// @ts-ignore
import __css from '../../../../src/css/s-scroll-to.css'; // relative to /dist/pkg/esm/js
export default class SScrollToComponent extends __SLitComponent {
    static get properties() {
        return __SLitComponent.properties({}, __SScrollToComponentInterface);
    }
    static get styles() {
        return css `
            ${unsafeCSS(`
                ${__css}
            `)}
        `;
    }
    constructor() {
        super(__deepMerge({
            litComponent: {
                shadowDom: false,
            },
            componentUtils: {
                interface: __SScrollToComponentInterface,
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
        const scrollConfig = __STheme.get('scroll');
        const duration = this.props.duration || (scrollConfig === null || scrollConfig === void 0 ? void 0 : scrollConfig.duration) || 300;
        const offset = this.props.offset || scrollConfig.offset || 0;
        const offsetX = this.props.offsetX || scrollConfig.offsetX || offset;
        const offsetY = this.props.offsetY || scrollConfig.offsetY || offset;
        switch (target) {
            case 'top':
                __scrollTo('top', {
                    duration,
                    offset,
                    offsetX,
                    offsetY,
                });
                break;
            case 'bottom':
                __scrollTo('bottom', {
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
                __scrollTo($target, {
                    duration,
                    offset,
                    offsetX,
                    offsetY,
                });
                break;
        }
    }
    render() {
        return html ``;
    }
}
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
export function define(props = {}, tagName = 's-scroll') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SScrollToComponent);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDM0MsT0FBTyw2QkFBNkIsTUFBTSx5Q0FBeUMsQ0FBQztBQUNwRixPQUFPLGVBRU4sTUFBTSwrQkFBK0IsQ0FBQztBQUV2QyxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLFVBQVUsTUFBTSw0Q0FBNEMsQ0FBQztBQUVwRSxhQUFhO0FBQ2IsT0FBTyxLQUFLLE1BQU0scUNBQXFDLENBQUMsQ0FBQywrQkFBK0I7QUEwQ3hGLE1BQU0sQ0FBQyxPQUFPLE9BQU8sa0JBQW1CLFNBQVEsZUFBZTtJQUMzRCxNQUFNLEtBQUssVUFBVTtRQUNqQixPQUFPLGVBQWUsQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLDZCQUE2QixDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVELE1BQU0sS0FBSyxNQUFNO1FBQ2IsT0FBTyxHQUFHLENBQUE7Y0FDSixTQUFTLENBQUM7a0JBQ04sS0FBSzthQUNWLENBQUM7U0FDTCxDQUFDO0lBQ04sQ0FBQztJQUVEO1FBQ0ksS0FBSyxDQUNELFdBQVcsQ0FBQztZQUNSLFlBQVksRUFBRTtnQkFDVixTQUFTLEVBQUUsS0FBSzthQUNuQjtZQUNELGNBQWMsRUFBRTtnQkFDWixTQUFTLEVBQUUsNkJBQTZCO2FBQzNDO1NBQ0osQ0FBQyxDQUNMLENBQUM7SUFDTixDQUFDO0lBQ0ssWUFBWTs7WUFDZCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2pDLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDOUMsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO0tBQUE7SUFDRCxTQUFTLENBQUMsTUFBYztRQUNwQixNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzVDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxLQUFJLFlBQVksYUFBWixZQUFZLHVCQUFaLFlBQVksQ0FBRSxRQUFRLENBQUEsSUFBSSxHQUFHLENBQUM7UUFDdEUsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksWUFBWSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7UUFDN0QsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUksWUFBWSxDQUFDLE9BQU8sSUFBSSxNQUFNLENBQUM7UUFDckUsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUksWUFBWSxDQUFDLE9BQU8sSUFBSSxNQUFNLENBQUM7UUFFckUsUUFBUSxNQUFNLEVBQUU7WUFDWixLQUFLLEtBQUs7Z0JBQ04sVUFBVSxDQUFDLEtBQUssRUFBRTtvQkFDZCxRQUFRO29CQUNSLE1BQU07b0JBQ04sT0FBTztvQkFDUCxPQUFPO2lCQUNWLENBQUMsQ0FBQztnQkFDSCxNQUFNO1lBQ1YsS0FBSyxRQUFRO2dCQUNULFVBQVUsQ0FBQyxRQUFRLEVBQUU7b0JBQ2pCLFFBQVE7b0JBQ1IsTUFBTTtvQkFDTixPQUFPO29CQUNQLE9BQU87aUJBQ1YsQ0FBQyxDQUFDO2dCQUNILE1BQU07WUFDVjtnQkFDSSxnQ0FBZ0M7Z0JBQ2hDLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQy9DLElBQUksQ0FBQyxPQUFPO29CQUFFLE9BQU87Z0JBRXJCLFVBQVUsQ0FBQyxPQUFPLEVBQUU7b0JBQ2hCLFFBQVE7b0JBQ1IsTUFBTTtvQkFDTixPQUFPO29CQUNQLE9BQU87aUJBQ1YsQ0FBQyxDQUFDO2dCQUVILE1BQU07U0FDYjtJQUNMLENBQUM7SUFDRCxNQUFNO1FBQ0YsT0FBTyxJQUFJLENBQUEsRUFBRSxDQUFDO0lBQ2xCLENBQUM7Q0FDSjtBQUVEOzs7Ozs7Ozs7OztHQVdHO0FBQ0gsTUFBTSxVQUFVLE1BQU0sQ0FDbEIsUUFBMkMsRUFBRSxFQUM3QyxPQUFPLEdBQUcsVUFBVTtJQUVwQixlQUFlLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNoRCxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO0FBQ3ZELENBQUMifQ==