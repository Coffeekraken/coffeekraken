// @ts-nocheck

import { html, css, unsafeCSS } from 'lit';
import __SScrollComponentInterface from './interface/SScrollComponentInterface';
import __SLitComponent, {
    ISLitComponentDefaultProps,
} from '@coffeekraken/s-lit-component';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __STheme from '@coffeekraken/s-theme';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __scrollTo from '@coffeekraken/sugar/js/dom/scroll/scrollTo';

// @ts-ignore
import __css from '../../../../src/css/s-scroll.css'; // relative to /dist/pkg/esm/js

/**
 * @name            SScrollComponent
 * @as                Scroll to
 * @namespace           js
 * @type                CustomElement
 * @interface           ./interface/SScrollComponentInterface.ts
 * @menu                Styleguide / Tools              /styleguide/tool/s-scroll
 * @platform            html
 * @status              beta
 *
 * This component allows you to scroll to a specific element using a css selector or to the top|bottom of the page.
 *
 * @feature         Specify an item you want to scroll to using a css selector
 * @feature         Scroll to the top or the bottom of the page
 * @feature         Support properties like "duration", "offset", etc...
 * @feature         Support global theme properties specified in your theme configuration like "offset", "duration", etc...
 *
 * @support         chromium
 * @support         firefox
 * @support         safari
 * @support         edge
 *
 * @install          bash
 * npm i @coffeekraken/s-scroll-component
 *
 * @install         js
 * import { define } from '@coffeekraken/s-scroll-component';
 * define();
 *
 * @example         html        Scroll to top
 * <s-scroll class="s-btn s-color:accent" to="top">
 *     <i class="s-icon:angle-up s-mie:20"></i> Scroll to top
 * </s-scroll>
 *
 * @since           2.0.0
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISScrollComponentProps extends ISLitComponentDefaultProps {
    to: 'top' | 'bottom' | string;
    duration: number;
    offset: number;
    offsetX: number;
    offsetY: number;
}

export default class SScrollComponent extends __SLitComponent {
    static get properties() {
        return __SLitComponent.createProperties(
            {},
            __SScrollComponentInterface,
        );
    }

    static get styles() {
        return css`
            ${unsafeCSS(`
                ${__css}
            `)}
        `;
    }

    constructor() {
        super(
            __deepMerge({
                litComponent: {
                    shadowDom: false,
                },
                componentUtils: {
                    name: 's-scroll',
                },
            }),
        );
    }
    async firstUpdated() {
        this.addEventListener('click', (e) => {
            e.preventDefault();
            this._scrollTo(this.props.to);
        });
    }
    _scrollTo(target: string) {
        const scrollConfig = __STheme.get('scroll');
        const duration = this.props.duration || scrollConfig?.duration || 300;
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

                console.log('SCRO', target, $target);

                if (!$target) return;

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
        return html``;
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
    props: Partial<ISScrollComponentProps> = {},
    tagName = 's-scroll',
) {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SScrollComponent);
}
