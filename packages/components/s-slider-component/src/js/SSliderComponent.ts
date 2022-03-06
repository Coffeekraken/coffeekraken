// @ts-nocheck

import __SLitComponent, {
    ISLitComponentDefaultProps
} from '@coffeekraken/s-lit-component';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import { css, html, unsafeCSS } from 'lit';
import __css from '../css/s-slider-component.css';
import __SSliderComponentInterface from './interface/SSliderComponentInterface';
import __querySelectorLive from '@coffeekraken/sugar/js/dom/query/querySelectorLive';
import __onDrag from '@coffeekraken/sugar/js/dom/detect/onDrag';
import __getTranslateProperties from '@coffeekraken/sugar/js/dom/style/getTranslateProperties';
import __easeInterval from '@coffeekraken/sugar/shared/function/easeInterval';
import __scrollTo from '@coffeekraken/sugar/js/dom/scroll/scrollTo';
import __easeOut from '@coffeekraken/sugar/shared/easing/easeOutQuad';
import __sugarElement from '@coffeekraken/sugar/js/dom/element/sugarElement';
import __visibleSuface from '@coffeekraken/sugar/js/dom/element/visibleSurface';
import __draggable from '@coffeekraken/sugar/js/dom/drag/draggable';
// import __Swiper from 'swiper';
// import __swiperCss from 'swiper/css';

/**
 * @name                Range
 * @namespace           js
 * @type                CustomElement
 * @interface           ./interface/SSliderComponentInterface.js
 * @menu                Styleguide / Forms              /styleguide/form/s-range
 * @platform            html
 * @status              beta
 *
 * This component specify a range with some additional features than the native one like
 * displaying the value automatically in tooltip or inline.
 *
 * @support         chromium
 * @support         firefox
 * @support         safari
 * @support         edge
 *
 * @install          bash 
 * npm i @coffeekraken/s-range-component
 * 
 * @install         js
 * import { define } from '@coffeekraken/s-range-component';
 * define();
 * 
 * @example         html        Simple range
 * <s-range name="myCoolRange" value="90" class="s-color:accent s-mbe:30"></s-range>
 *
 * @since           2.0.0
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISSliderComponentProps extends ISLitComponentDefaultProps {
    direction: 'horizontal' | 'vertical';
    itemsByPage: number;
    sideReveal: number;
}

export default class SSlider extends __SLitComponent {
    static get properties() {
        return __SLitComponent.properties({}, __SSliderComponentInterface);
    }

    static get styles() {
        return css`
            ${unsafeCSS(`
                ${__css}
            `)}
        `;
    }

    _$root: HTMLElement;
    _$items: HTMLElement[] = [];
    _$itemsContainer: HTMLElement;

    _currentPage = 0;
    _currentItem = 0;

    constructor() {
        super(
            __deepMerge({
                litComponent: {
                    shadowDom: false,
                },
                componentUtils: {
                    interface: __SSliderComponentInterface,
                },
            }),
        );
    }
    async firstUpdated() {

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
            const firstItem = this._$items[0],

            if (firstItem.originRelLeft >= this._$itemsContainer.getBoundingClientRect().width) {
                $itemObj = firstItem;
            } else {
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
            const translates = __getTranslateProperties(this._$itemsContainer);
             const lastItemBounds = this._$items[this._$items.length-1].getBoundingClientRect();
             const itemsContainerBounds = this._$itemsContainer.getBoundingClientRect();
            
             switch(state.type) {
                case 'start':
                    translateX = translates.x;
                    easingScrollInterval?.cancel?.();
                break;
                case 'end':

                    let duration = 1000 / 2000 * Math.abs(state.pixelsXBySecond);
                    if (duration > 2000) duration = 2000;

                    console.log(duration);

                    easingScrollInterval = __easeInterval(duration, (percentage) => {
                        const offsetX = state.pixelsXBySecond / 100 * percentage; 
                        let translateX = translates.x + offsetX;

                        const lastItemLeft = lastItemBounds.left - itemsContainerBounds.left;
                        if (translateX + state.deltaX < lastItemLeft * -1) {
                            translateX = lastItemLeft * -1;
                        } else if (translateX + state.deltaX <= 0) {
                            translateX = translateX + state.deltaX;
                        } else if (translateX + state.deltaX > 0) {
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
                    } else if (translateX + state.deltaX <= 0) {
                        // console.log(translateX, state.deltaX);
                        this._$itemsContainer.style.transform = `translateX(${translateX + state.deltaX}px)`;
                    } else if (translateX + state.deltaX > 0) {
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
            let elmWidth = e.target.offsetWidth,
                elmHeight = e.target.offsetHeight;

            const fullWidth = elmWidth * this._$items.length,
                fullHeight = elmHeight * this._$items.length;

            const scrollXPercent = 100 / fullWidth * (scrollLeft + elmWidth),
                scrollYPercent = 100 / fullHeight * (scrollTop + elmHeight);

            this._scrollXPercent = scrollXPercent;
            this._scrollYPercent = scrollYPercent;

            if (this.props.direction === 'horizontal') {
                this._currentPage = Math.round(scrollXPercent / 100 * this._$items.length) - 1;
                this._currentItem = Math.round(this.props.itemsByPage * this._currentPage);
            } else if (this.props.direction === 'vertical') {
                this._currentPage = Math.round(scrollYPercent / 100 * this._$items.length) - 1;
                this._currentItem = Math.round(this.props.itemsByPage * this._currentPage);
            }
            this.requestUpdate();
        });
    }
    render() {
        return html`
            <div ref="root"
                class="${this.componentUtils.className(
                    '',
                )}"
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
export function define(
    props: Partial<ISSliderComponentProps> = {},
    tagName = 's-slider',
) {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SSlider);
}
