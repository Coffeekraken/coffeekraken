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
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import { css, html, unsafeCSS } from 'lit';
import __css from '../css/s-slider-component.css';
import __SSliderComponentInterface from './interface/SSliderComponentInterface';
import __draggable from '@coffeekraken/sugar/js/dom/drag/draggable';
export default class SSlider extends __SLitComponent {
    constructor() {
        super(__deepMerge({
            litComponent: {
                shadowDom: false,
            },
            componentUtils: {
                interface: __SSliderComponentInterface,
            },
        }));
        this._$items = [];
        this._currentPage = 0;
        this._currentItem = 0;
    }
    static get properties() {
        return __SLitComponent.properties({}, __SSliderComponentInterface);
    }
    static get styles() {
        return css `
            ${unsafeCSS(`
                ${__css}
            `)}
        `;
    }
    firstUpdated() {
        return __awaiter(this, void 0, void 0, function* () {
            this._$itemsContainer = this.querySelector('[ref="itemsContainer"]');
            this._$root = this.querySelector('[ref="root"]');
            this._$items = this.querySelectorAll('[s-slider-item]');
            this._$items.forEach($item => {
                // add the item class
                $item.classList.add(this.componentUtils.className('__item'));
                // add item into the container
                this._$itemsContainer.append($item);
            });
            // handle scroll
            this._handleScroll();
            // handle drag
            this._handleDrag();
        });
    }
    _getMostDisplayedItem() {
        let higherSurface = 0, $itemObj;
        for (let i = 0; i < this._$items.length; i++) {
            const $item = this._$items[i];
            console.log($item, $item.areaStats);
            if ($item.areaStats.percentage > higherSurface) {
                $itemObj = $item;
                higherSurface = $item.areaStats.percentage;
            }
        }
        if (!$itemObj) {
            const firstItem = this._$items[0];
            if (firstItem.originRelLeft >= this._$itemsContainer.getBoundingClientRect().width) {
                $itemObj = firstItem;
            }
            else {
                $itemObj = this._$items[this._$items.length - 1];
            }
        }
        return $itemObj;
    }
    _handleDrag() {
        __draggable(this._$root, {
            direction: this.props.direction
        });
    }
    _handleScroll() {
        // handle scroll
        this._$root.addEventListener('scroll', (e) => {
            let scrollTop = e.target.scrollTop;
            let scrollLeft = e.target.scrollLeft;
            let elmWidth = e.target.offsetWidth, elmHeight = e.target.offsetHeight;
            const fullWidth = elmWidth * this._$items.length, fullHeight = elmHeight * this._$items.length;
            const scrollXPercent = 100 / fullWidth * (scrollLeft + elmWidth), scrollYPercent = 100 / fullHeight * (scrollTop + elmHeight);
            this._scrollXPercent = scrollXPercent;
            this._scrollYPercent = scrollYPercent;
            if (this.props.direction === 'horizontal') {
                this._currentPage = Math.round(scrollXPercent / 100 * this._$items.length) - 1;
                this._currentItem = Math.round(this.props.itemsByPage * this._currentPage);
            }
            else if (this.props.direction === 'vertical') {
                this._currentPage = Math.round(scrollYPercent / 100 * this._$items.length) - 1;
                this._currentItem = Math.round(this.props.itemsByPage * this._currentPage);
            }
            this.requestUpdate();
        });
    }
    render() {
        return html `
            <div ref="root"
                class="${this.componentUtils.className('')}"
                style="
                    --s-slider-side-reveal: ${this.props.sideReveal};
                    --s-slider-page: ${this._currentPage};
                    --s-slider-item: ${this._currentItem};
                    --s-slider-total: ${this._$items.length};
                "
            >
                    <div ref="itemsContainer" class="${this.componentUtils.className('__items')}"></div>
            </div>
        `;
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
export function define(props = {}, tagName = 's-slider') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SSlider);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1NsaWRlckNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNTbGlkZXJDb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7OztBQUVkLE9BQU8sZUFFTixNQUFNLCtCQUErQixDQUFDO0FBQ3ZDLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUMzQyxPQUFPLEtBQUssTUFBTSwrQkFBK0IsQ0FBQztBQUNsRCxPQUFPLDJCQUEyQixNQUFNLHVDQUF1QyxDQUFDO0FBUWhGLE9BQU8sV0FBVyxNQUFNLDJDQUEyQyxDQUFDO0FBeUNwRSxNQUFNLENBQUMsT0FBTyxPQUFPLE9BQVEsU0FBUSxlQUFlO0lBb0JoRDtRQUNJLEtBQUssQ0FDRCxXQUFXLENBQUM7WUFDUixZQUFZLEVBQUU7Z0JBQ1YsU0FBUyxFQUFFLEtBQUs7YUFDbkI7WUFDRCxjQUFjLEVBQUU7Z0JBQ1osU0FBUyxFQUFFLDJCQUEyQjthQUN6QztTQUNKLENBQUMsQ0FDTCxDQUFDO1FBaEJOLFlBQU8sR0FBa0IsRUFBRSxDQUFDO1FBRzVCLGlCQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLGlCQUFZLEdBQUcsQ0FBQyxDQUFDO0lBYWpCLENBQUM7SUE5QkQsTUFBTSxLQUFLLFVBQVU7UUFDakIsT0FBTyxlQUFlLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSwyQkFBMkIsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFRCxNQUFNLEtBQUssTUFBTTtRQUNiLE9BQU8sR0FBRyxDQUFBO2NBQ0osU0FBUyxDQUFDO2tCQUNOLEtBQUs7YUFDVixDQUFDO1NBQ0wsQ0FBQztJQUNOLENBQUM7SUFxQkssWUFBWTs7WUFFZCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1lBQ3JF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