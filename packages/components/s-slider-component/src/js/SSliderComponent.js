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
import __onDrag from '@coffeekraken/sugar/js/dom/detect/onDrag';
import __getTranslateProperties from '@coffeekraken/sugar/js/dom/style/getTranslateProperties';
import __easeInterval from '@coffeekraken/sugar/shared/function/easeInterval';
import __easeOut from '@coffeekraken/sugar/shared/easing/easeOutQuad';
import __sugarElement from '@coffeekraken/sugar/js/dom/element/sugarElement';
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
                // make sure we have a sugar element
                __sugarElement($item);
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
            console.log($item, $item.visibleSurface);
            if ($item.visibleSurface.percentage > higherSurface) {
                $itemObj = $item;
                higherSurface = $item.visibleSurface.percentage;
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
        let translateX = 0, easingScrollInterval;
        __onDrag(this._$root, (state) => {
            var _a;
            const translates = __getTranslateProperties(this._$itemsContainer);
            const lastItemBounds = this._$items[this._$items.length - 1].getBoundingClientRect();
            const itemsContainerBounds = this._$itemsContainer.getBoundingClientRect();
            switch (state.type) {
                case 'start':
                    translateX = translates.x;
                    (_a = easingScrollInterval === null || easingScrollInterval === void 0 ? void 0 : easingScrollInterval.cancel) === null || _a === void 0 ? void 0 : _a.call(easingScrollInterval);
                    break;
                case 'end':
                    let duration = 1000 / 3000 * Math.abs(state.pixelsXBySecond);
                    if (duration > 1000)
                        duration = 1000;
                    const mostDisplaysItem = this._getMostDisplayedItem();
                    console.log(mostDisplaysItem);
                    easingScrollInterval = __easeInterval(duration, (percentage) => {
                        const offsetX = state.pixelsXBySecond / 100 * percentage;
                        let translateX = translates.x + offsetX;
                        const lastItemLeft = lastItemBounds.left - itemsContainerBounds.left;
                        if (translateX + state.deltaX < lastItemLeft * -1) {
                            translateX = lastItemLeft * -1;
                        }
                        else if (translateX + state.deltaX <= 0) {
                            translateX = translateX + state.deltaX;
                        }
                        else if (translateX + state.deltaX > 0) {
                            translateX = 0;
                        }
                        this._$itemsContainer.style.transform = `translateX(${translateX}px)`;
                    }, {
                        easing: __easeOut,
                        onEnd: () => {
                            const mostDisplaysItem = this._getMostDisplayedItem();
                            const translates = __getTranslateProperties(this._$itemsContainer);
                            easingScrollInterval = __easeInterval(700, (per) => {
                                const offsetX = mostDisplaysItem.originRelLeft * -1 / 100 * per;
                                const lastItemLeft = lastItemBounds.left - itemsContainerBounds.left;
                                let translateX = translates.x + offsetX;
                                if (translateX + state.deltaX < lastItemLeft * -1) {
                                    translateX = lastItemLeft * -1;
                                }
                                else if (translateX + state.deltaX <= 0) {
                                    // console.log(translateX, state.deltaX);
                                    translateX = translateX + state.deltaX;
                                }
                                else if (translateX + state.deltaX > 0) {
                                    translateX = 0;
                                }
                                this._$itemsContainer.style.transform = `translateX(${translateX}px)`;
                            });
                        }
                    });
                    break;
                default:
                    const lastItemLeft = lastItemBounds.left - itemsContainerBounds.left;
                    if (translateX + state.deltaX < lastItemLeft * -1) {
                        this._$itemsContainer.style.transform = `translateX(${lastItemLeft * -1}px)`;
                    }
                    else if (translateX + state.deltaX <= 0) {
                        // console.log(translateX, state.deltaX);
                        this._$itemsContainer.style.transform = `translateX(${translateX + state.deltaX}px)`;
                    }
                    else if (translateX + state.deltaX > 0) {
                        this._$itemsContainer.style.transform = `translateX(0px)`;
                    }
                    break;
            }
        });
    }
    _handleScroll() {
        // handle scroll
        this._$root.addEventListener('scroll', (e) => {
            let scrollTop = e.target.scrollTop;
            let scrollLeft = e.target.scrollLeft;
            let docHeight = document.body.offsetHeight;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1NsaWRlckNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNTbGlkZXJDb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7OztBQUVkLE9BQU8sZUFFTixNQUFNLCtCQUErQixDQUFDO0FBQ3ZDLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUMzQyxPQUFPLEtBQUssTUFBTSwrQkFBK0IsQ0FBQztBQUNsRCxPQUFPLDJCQUEyQixNQUFNLHVDQUF1QyxDQUFDO0FBRWhGLE9BQU8sUUFBUSxNQUFNLDBDQUEwQyxDQUFDO0FBQ2hFLE9BQU8sd0JBQXdCLE1BQU0seURBQXlELENBQUM7QUFDL0YsT0FBTyxjQUFjLE1BQU0sa0RBQWtELENBQUM7QUFFOUUsT0FBTyxTQUFTLE1BQU0sK0NBQStDLENBQUM7QUFDdEUsT0FBTyxjQUFjLE1BQU0saURBQWlELENBQUM7QUEwQzdFLE1BQU0sQ0FBQyxPQUFPLE9BQU8sT0FBUSxTQUFRLGVBQWU7SUFvQmhEO1FBQ0ksS0FBSyxDQUNELFdBQVcsQ0FBQztZQUNSLFlBQVksRUFBRTtnQkFDVixTQUFTLEVBQUUsS0FBSzthQUNuQjtZQUNELGNBQWMsRUFBRTtnQkFDWixTQUFTLEVBQUUsMkJBQTJCO2FBQ3pDO1NBQ0osQ0FBQyxDQUNMLENBQUM7UUFoQk4sWUFBTyxHQUFrQixFQUFFLENBQUM7UUFHNUIsaUJBQVksR0FBRyxDQUFDLENBQUM7UUFDakIsaUJBQVksR0FBRyxDQUFDLENBQUM7SUFhakIsQ0FBQztJQTlCRCxNQUFNLEtBQUssVUFBVTtRQUNqQixPQUFPLGVBQWUsQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLDJCQUEyQixDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVELE1BQU0sS0FBSyxNQUFNO1FBQ2IsT0FBTyxHQUFHLENBQUE7Y0FD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