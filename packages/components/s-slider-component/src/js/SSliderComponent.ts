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
        });

        // handle scroll
        this._handleScroll();
        // handle drag
        this._handleDrag();

    }
    _handleDrag() {
        let scrollX;
        __onDrag(this._$root, (state) => {
            switch(state.type) {
                case 'start':
                    scrollX = this._$root.scrollLeft;
                    this._$root.style.scrollSnapType = 'none';
                break;
                case 'end':
                    this._$root.style.scrollSnapType = 'x mandatory';
                break;
                default:
                    this._$root.scrollLeft = (scrollX + state.deltaX) * -1;
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
