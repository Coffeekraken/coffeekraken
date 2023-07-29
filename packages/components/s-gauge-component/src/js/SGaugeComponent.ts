import __SLitComponent from '@coffeekraken/s-lit-component';

import { __deepMerge } from '@coffeekraken/sugar/object';
import { css, html, unsafeCSS } from 'lit';
import __SGaugeComponentInterface from './interface/SGaugeComponentInterface.js';

// @ts-ignore
import __css from '../../../../src/css/s-gauge-component.css'; // relative to /dist/pkg/esm/js

export interface ISGaugeComponentProps {
    min: number;
    max: number;
    value: number;
    linecap: 'butt' | 'square' | 'round';
    classes: Record<string, number>;
}

/**
 * @name                SGaugeComponent
 * @as                  Gauge
 * @namespace           js
 * @type                CustomElement
 * @interface           ./interface/SGaugeComponentInterface.ts
 * @menu                Styleguide / UI              /styleguide/ui/s-gauge
 * @platform            html
 * @status              beta
 *
 * This component represent a simple "gauge" component .
 *
 * @support         chromium
 * @support         firefox
 * @support         safari
 * @support         edge
 *
 * @import          import { define as __SGaugeComponentDefine } from '@coffeekraken/s-gauge-component';
 *
 * @snippet         __SGaugeComponentDefine($1)
 *
 * @install           shell
 * npm i @coffeekraken/s-gauge-component
 *
 * @install           js
 * import { define as __SGaugeComponentDefine } from '@coffeekraken/s-gauge-component';
 * __SGaugeComponentDefine();
 *
 * @example         html        Copy from an input
 * <s-gauge max="100" value="67"></<s-gauge>
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default class SGaugeComponent extends __SLitComponent {
    static get properties() {
        return __SLitComponent.propertiesFromInterface(
            {},
            __SGaugeComponentInterface,
        );
    }

    static get styles() {
        return css`
            ${unsafeCSS(__css)}
        `;
    }

    static get state() {
        return {};
    }

    constructor() {
        super(
            __deepMerge({
                name: 's-gauge',
                interface: __SGaugeComponentInterface,
            }),
        );
    }

    render() {
        const value = parseFloat(this.props.value);
        const boundings = this.getBoundingClientRect(),
            strokeWidth = parseFloat(window.getComputedStyle(this).strokeWidth),
            scale = (1 / (boundings.width + strokeWidth)) * boundings.width,
            valuePercent =
                (100 / this.props.max) * parseFloat(this.props.value);

        for (let [cls, percentage] of Object.entries(this.props.classes)) {
            if ((100 / this.props.max) * value >= <number>percentage) {
                this.classList.add(cls);
            } else {
                this.classList.remove(cls);
            }
        }

        return html`
            <svg
                style="--start-degree: ${this.props.start}; --end-degree: ${this
                    .props.end}; --value-percent: ${valuePercent};"
                viewBox="0 0 ${boundings.width} ${boundings.height}"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    class="_track"
                    style="transform: rotateZ(-180deg) scale(${scale});"
                    stroke-linecap="${this.props.linecap}"
                    d="
    M 0, ${boundings.width * 0.5}
    a ${boundings.width * 0.5},${boundings.width *
                    0.5} 0 1,1 ${boundings.width},0
    a ${boundings.width * 0.5},${boundings.width *
                    0.5} 0 1,1 -${boundings.width},0
  "
                />
                <path
                    class="_gauge"
                    style="transform: rotateZ(-180deg) scale(${scale});"
                    stroke-linecap="${this.props.linecap}"
                    d="
    M 0, ${boundings.width * 0.5}
    a ${boundings.width * 0.5},${boundings.width *
                    0.5} 0 1,1 ${boundings.width},0
    a ${boundings.width * 0.5},${boundings.width *
                    0.5} 0 1,1 -${boundings.width},0
  "
                />
            </svg>
            <div class="_value">${this.props.value}</div>
        `;
    }
}
