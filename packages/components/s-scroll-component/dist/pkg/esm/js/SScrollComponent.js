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
import __SLitComponent from '@coffeekraken/s-lit-component';
import __STheme from '@coffeekraken/s-theme';
import { __scrollTo } from '@coffeekraken/sugar/dom';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { css, html, unsafeCSS } from 'lit';
import __SScrollComponentInterface from './interface/SScrollComponentInterface.js';
// @ts-ignore
import __css from '../../../../src/css/s-scroll.css'; // relative to /dist/pkg/esm/js
export default class SScrollComponent extends __SLitComponent {
    static get properties() {
        return __SLitComponent.propertiesFromInterface({}, __SScrollComponentInterface);
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
            name: 's-scroll',
            interface: __SScrollComponentInterface,
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
        const scrollConfig = __STheme.current.get('scroll');
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
                document.location.hash = '';
                break;
            case 'bottom':
                __scrollTo('bottom', {
                    duration,
                    offset,
                    offsetX,
                    offsetY,
                });
                document.location.hash = '';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGVBRU4sTUFBTSwrQkFBK0IsQ0FBQztBQUN2QyxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDckQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUMzQyxPQUFPLDJCQUEyQixNQUFNLDBDQUEwQyxDQUFDO0FBRW5GLGFBQWE7QUFDYixPQUFPLEtBQUssTUFBTSxrQ0FBa0MsQ0FBQyxDQUFDLCtCQUErQjtBQW9EckYsTUFBTSxDQUFDLE9BQU8sT0FBTyxnQkFBaUIsU0FBUSxlQUFlO0lBQ3pELE1BQU0sS0FBSyxVQUFVO1FBQ2pCLE9BQU8sZUFBZSxDQUFDLHVCQUF1QixDQUMxQyxFQUFFLEVBQ0YsMkJBQTJCLENBQzlCLENBQUM7SUFDTixDQUFDO0lBRUQsTUFBTSxLQUFLLE1BQU07UUFDYixPQUFPLEdBQUcsQ0FBQTtjQUNKLFNBQVMsQ0FBQztrQkFDTixLQUFLO2FBQ1YsQ0FBQztTQUNMLENBQUM7SUFDTixDQUFDO0lBRUQ7UUFDSSxLQUFLLENBQ0QsV0FBVyxDQUFDO1lBQ1IsSUFBSSxFQUFFLFVBQVU7WUFDaEIsU0FBUyxFQUFFLDJCQUEyQjtTQUN6QyxDQUFDLENBQ0wsQ0FBQztJQUNOLENBQUM7SUFDSyxZQUFZOztZQUNkLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDakMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUNuQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDbEMsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO0tBQUE7SUFDRCxTQUFTLENBQUMsTUFBYztRQUNwQixNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwRCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsS0FBSSxZQUFZLGFBQVosWUFBWSx1QkFBWixZQUFZLENBQUUsUUFBUSxDQUFBLElBQUksR0FBRyxDQUFDO1FBQ3RFLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLFlBQVksQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO1FBQzdELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLFlBQVksQ0FBQyxPQUFPLElBQUksTUFBTSxDQUFDO1FBQ3JFLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLFlBQVksQ0FBQyxPQUFPLElBQUksTUFBTSxDQUFDO1FBRXJFLFFBQVEsTUFBTSxFQUFFO1lBQ1osS0FBSyxLQUFLO2dCQUNOLFVBQVUsQ0FBQyxLQUFLLEVBQUU7b0JBQ2QsUUFBUTtvQkFDUixNQUFNO29CQUNOLE9BQU87b0JBQ1AsT0FBTztpQkFDVixDQUFDLENBQUM7Z0JBQ0gsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO2dCQUM1QixNQUFNO1lBQ1YsS0FBSyxRQUFRO2dCQUNULFVBQVUsQ0FBQyxRQUFRLEVBQUU7b0JBQ2pCLFFBQVE7b0JBQ1IsTUFBTTtvQkFDTixPQUFPO29CQUNQLE9BQU87aUJBQ1YsQ0FBQyxDQUFDO2dCQUNILFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztnQkFDNUIsTUFBTTtZQUNWO2dCQUNJLGdDQUFnQztnQkFDaEMsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDL0MsSUFBSSxDQUFDLE9BQU87b0JBQUUsT0FBTztnQkFFckIsVUFBVSxDQUFDLE9BQU8sRUFBRTtvQkFDaEIsUUFBUTtvQkFDUixNQUFNO29CQUNOLE9BQU87b0JBQ1AsT0FBTztpQkFDVixDQUFDLENBQUM7Z0JBRUgsTUFBTTtTQUNiO0lBQ0wsQ0FBQztJQUNELE1BQU07UUFDRixPQUFPLElBQUksQ0FBQSxFQUFFLENBQUM7SUFDbEIsQ0FBQztDQUNKIn0=