// @ts-nocheck

import __SLitComponent, {
    ISLitComponentDefaultProps
} from '@coffeekraken/s-lit-component';
import __slideable from '@coffeekraken/sugar/js/dom/slide/slideable';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import { css, html, unsafeCSS } from 'lit';
import __css from '../css/s-slider-component.css';
import __SSliderComponentInterface from './interface/SSliderComponentInterface';
import __getTranslateProperties from '@coffeekraken/sugar/js/dom/style/getTranslateProperties';
import __easeInterval from '@coffeekraken/sugar/shared/function/easeInterval';

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
    transitionDuration: number;
    transitionEasing: number;
    transitionHandler: Function;
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
    _$navs: HTMLElement[] = [];
    _$itemsContainer: HTMLElement;

    _currentPageIdx = 0;
    _currentItemIdx = 0;

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

        this._$navs = this.querySelectorAll('[s-slider-nav]');
        this._$navs.forEach($nav => {
            $nav.classList.add(this.componentUtils.className('__nav'));
            this._$root.append($nav);
        });
        this._$items = this.querySelectorAll('[s-slider-item]');
        this._$items.forEach($item => {
            // add the item class
            $item.classList.add(this.componentUtils.className('__item'));
            // add item into the container
            this._$itemsContainer.append($item);
        });

        // handle scroll
        this._handleScroll();
        // handle slide
        this._handleSlide();

        // setTimeout(() => {
        //     this.next();
        // }, 1000);
        // setTimeout(() => {
        //     this.next();
        // }, 2000);
        // setTimeout(() => {
        //     this.next();
        // }, 3000);
        // setTimeout(() => {
        //     this.goTo(0);
        // }, 4000);

    }

    getCurrentSlideIdx() {
        return this._currentItemIdx;
    }
    getCurrentSlideItem() {
        return this._$items[this._currentItemIdx]
    }
    getNextSlideIdx() {
        const nextSlideIdx = this._currentItemIdx + 1;
        if (nextSlideIdx >= this._$items.length - 1) return this._$items.length - 1;
        return nextSlideIdx;
    }
    getPreviousSlideIdx() {
        const previousSlideIdx = this._currentItemIdx - 1;
        if (previousSlideIdx <= 0) return 0;
        return previousSlideIdx;
    }
    getNextSlideItem() {
        return this._$items[this.getNextSlideIdx()];
    }
    getPreviousSlideItem() {
        return this._$items[this.getPreviousSlideIdx()];
    }
    goTo(slideIdx: number) {
        if (!this._$items[slideIdx]) return;
        const $nextItem = this._$items[slideIdx];
        const $currentItem = this.getCurrentSlideItem();
        this._currentItemIdx = slideIdx;
        this._transitionHandler($currentItem, $nextItem);
    }
    next() {
        const $nextItem = this.getNextSlideItem();
        const $currentItem = this.getCurrentSlideItem();
        this._currentItemIdx = this.getNextSlideIdx();
        this._transitionHandler($currentItem, $nextItem);
    }
    previous() {
        const $previousItem = this.getPreviousSlideItem();
        const $currentItem = this.getCurrentSlideItem();
        this._currentItemIdx = this.getPreviousSlideIdx();
        this._transitionHandler($currentItem, $previousItem);
    }
    _transitionHandler($from, $to) {
        
        const $slideableItem = this._$root.children[0];
        const translates = __getTranslateProperties($slideableItem);

        if (this.props.transitionHandler) {
            this.props.transitionHandler($from, $to);
            return;
        }

        const nextBounds = $to.getBoundingClientRect();
        const sliderBounds = this._$root.getBoundingClientRect();

        const deltaX = nextBounds.left - sliderBounds.left,
            deltaY = nextBounds.top;

        __easeInterval(this.props.transitionDuration, (percent) => {
            if (this.props.direction === 'horizontal') {
                const computedDelta = translates.x + (deltaX / 100 * percent) * -1;
                $slideableItem.style.transform = `translateX(${computedDelta}px)`;
            } else {
                const computedDelta = translates.y + (deltaY * -1 / 100 * percent) * -1;
                $slideableItem.style.transform = `translateY(${computedDelta}px)`;
            }

        }, {
            easing: this.props.transitionEasing
        });

        this.requestUpdate();
    }
    _handleSlide() {
        __slideable(this._$root, {
            direction: this.props.direction,
            onRefocus: ($slide) => {
                this._currentItemIdx = [...this._$items].indexOf($slide);
                this.requestUpdate();
            }
        });
    }
    _handleScroll() {
        // handle scroll
        this._$root.addEventListener('scroll', (e) => {
            let scrollTop = e.target.scrollTop;
            let scrollLeft = e.target.scrollLeft;

            let elmWidth = e.target.offsetWidth,
                elmHeight = e.target.offsetHeight;

            const fullWidth = elmWidth * this._$items.length,
                fullHeight = elmHeight * this._$items.length;

            const scrollXPercent = 100 / fullWidth * (scrollLeft + elmWidth),
                scrollYPercent = 100 / fullHeight * (scrollTop + elmHeight);

            this._scrollXPercent = scrollXPercent;
            this._scrollYPercent = scrollYPercent;

            if (this.props.direction === 'horizontal') {
                this._currentPageIdx = Math.round(scrollXPercent / 100 * this._$items.length) - 1;
                this._currentItemIdx = Math.round(this.props.itemsByPage * this._currentPageIdx);
            } else if (this.props.direction === 'vertical') {
                this._currentPageIdx = Math.round(scrollYPercent / 100 * this._$items.length) - 1;
                this._currentItemIdx = Math.round(this.props.itemsByPage * this._currentPageIdx);
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
                    --s-slider-block-reveal: ${this.props.sideReveal};
                    --s-slider-page: ${this._currentPageIdx};
                    --s-slider-item: ${this._currentItemIdx};
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
