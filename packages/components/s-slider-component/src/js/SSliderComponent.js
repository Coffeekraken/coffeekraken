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
        __draggable(this._$root, {
            horizontal: this.props.direction === 'horizontal',
            vertical: this.props.direction === 'vertical',
        });
        return;
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
                    console.log(duration);
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
                            // const mostDisplaysItem = this._getMostDisplayedItem();
                            // const translates = __getTranslateProperties(this._$itemsContainer);
                            // easingScrollInterval = __easeInterval(700, (per) => {
                            //     const offsetX = mostDisplaysItem.originRelLeft * -1 / 100 * per;
                            //     const lastItemLeft = lastItemBounds.left - itemsContainerBounds.left;
                            //     let translateX = translates.x + offsetX;
                            //     if (translateX + state.deltaX < lastItemLeft * -1) {
                            //         translateX = lastItemLeft * -1;
                            //     } else if (translateX + state.deltaX <= 0) {
                            //         // console.log(translateX, state.deltaX);
                            //         translateX = translateX + state.deltaX;
                            //     } else if (translateX + state.deltaX > 0) {
                            //         translateX = 0;
                            //     }
                            //     this._$itemsContainer.style.transform = `translateX(${translateX}px)`;
                            // });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1NsaWRlckNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNTbGlkZXJDb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7OztBQUVkLE9BQU8sZUFFTixNQUFNLCtCQUErQixDQUFDO0FBQ3ZDLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUMzQyxPQUFPLEtBQUssTUFBTSwrQkFBK0IsQ0FBQztBQUNsRCxPQUFPLDJCQUEyQixNQUFNLHVDQUF1QyxDQUFDO0FBRWhGLE9BQU8sUUFBUSxNQUFNLDBDQUEwQyxDQUFDO0FBQ2hFLE9BQU8sd0JBQXdCLE1BQU0seURBQXlELENBQUM7QUFDL0YsT0FBTyxjQUFjLE1BQU0sa0RBQWtELENBQUM7QUFFOUUsT0FBTyxTQUFTLE1BQU0sK0NBQStDLENBQUM7QUFDdEUsT0FBTyxjQUFjLE1BQU0saURBQWlELENBQUM7QUFFN0UsT0FBTyxXQUFXLE1BQU0sMkNBQTJDLENBQUM7QUF5Q3BFLE1BQU0sQ0FBQyxPQUFPLE9BQU8sT0FBUSxTQUFRLGVBQWU7SUFvQmhEO1FBQ0ksS0FBSyxDQUNELFdBQVcsQ0FBQztZQUNSLFlBQVksRUFBRTtnQkFDVixTQUFTLEVBQUUsS0FBSzthQUNuQjtZQUNELGNBQWMsRUFBRTtnQkFDWixTQUFTLEVBQUUsMkJBQTJCO2FBQ3pDO1NBQ0osQ0FBQyxDQUNMLENBQUM7UUFoQk4sWUFBTyxHQUFrQixFQUFFLENBQUM7UUFHNUIsaUJBQVksR0FBRyxDQUFDLENBQUM7UUFDakIsaUJBQVksR0FBRyxDQUFDLENBQUM7SUFhakIsQ0FBQztJQTlCRCxNQUFNLEtBQUssVUFBVTtRQUNqQixPQUFPLGVBQWUsQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLDJCQUEyQixDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVELE1BQU0s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