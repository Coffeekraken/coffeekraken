import __SLitComponent from '@coffeekraken/s-lit-component';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import { css, html, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
// @ts-ignore
import __css from '../../../../src/css/s-dashboard.css'; // relative to /dist/pkg/esm/js
import __SDashboardComponentInterface from './interface/SDashboardComponentInterface';

export interface ISDashboardComponentProps {}

export default class SDashboardComponent extends __SLitComponent {
    static get styles() {
        return css`
            ${unsafeCSS(__css)}
        `;
    }

    constructor() {
        super(
            __deepMerge({
                litComponent: {
                    shadowDom: false,
                },
                componentUtils: {
                    interface: __SDashboardComponentInterface,
                },
            }),
        );
        console.log('PORP', this.componentUtils.props);
    }

    render() {
        return html`
            <div class="${this.componentUtils.className('')}">
                <h1>Hello component!!!</h1>
            </div>
        `;
    }
}

export function define(
    props: Partial<ISDashboardComponentProps> = {},
    tagName = 's-dashboard',
) {
    __SLitComponent.setDefaultProps(tagName, props);
    // @ts-ignore
    customElements.define(tagName, SDashboardComponent);
}
