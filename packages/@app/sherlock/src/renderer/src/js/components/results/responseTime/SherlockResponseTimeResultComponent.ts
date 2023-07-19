import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { __formatDuration } from '@coffeekraken/sugar/datetime';

import type { ISDobbyResponseTimeTaskResult } from '@coffeekraken/s-dobby';

@customElement('sherlock-response-time-result')
export default class SherlockResponseTimeResultComponent extends LitElement {
    static styles = css``;

    @property({ type: Object })
    results: ISDobbyResponseTimeTaskResult = null;

    static renderListWidget(result: ISDobbyResponseTimeTaskResult): any {
        return html`<div class="sh-response-time-result-list-widget">
            Response time is
            <span
                class="_response-time s-font:code s-tc:${result.status === 'success'
                    ? 'success'
                    : result.status === 'warning'
                    ? 'accent'
                    : 'error'}"
                >${__formatDuration(result.responseTime)}</span
            >
        </div>`;
    }

    constructor() {
        super();
    }

    render() {
        return html` <article class="sh-results sh-response-time-result">Response time</article> `;
    }

    createRenderRoot() {
        return this;
    }
}
