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
                    let duration = 1000 / 2000 * Math.abs(state.pixelsXBySecond);
                    if (duration > 2000)
                        duration = 2000;
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