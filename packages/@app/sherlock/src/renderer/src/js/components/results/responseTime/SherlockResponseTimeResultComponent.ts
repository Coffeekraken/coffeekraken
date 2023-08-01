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
            <div class="_charts">
                <div
                    class="_ping ${result.responseTime === -1
                        ? 'error'
                        : result.responseTime <= 50
                        ? 'low'
                        : result.responseTime <= 100
                        ? 'medium'
                        : 'high'}"
                >
                    <div class="_value" style="--ping: ${result.responseTime ?? 0};"></div>
                </div>
                <div
                    class="_ttfb ${result.ttfb === -1
                        ? 'error'
                        : result.ttfb <= 150
                        ? 'low'
                        : result.ttfb <= 250
                        ? 'medium'
                        : 'high'}"
                >
                    <div class="_value" style="--ttfb: ${result.ttfb ?? 0};"></div>
                </div>
            </div>

            <span class="_separator"></span>

            <div class="_values">
                <span class="_label">Ping</span>
                <span
                    class="_value ${result.responseTime <= 50
                        ? 'low'
                        : result.responseTime <= 100
                        ? 'medium'
                        : 'high'}"
                    >${result.responseTime === -1
                        ? html`<i class="fa-solid fa-xmark"></i>`
                        : `${parseFloat(result.responseTime).toFixed(2)}ms`}</span
                >

                <span class="_separator"></span>

                <span class="_label">TTFB</span>
                <span
                    class="_value ${result.ttfb === -1
                        ? 'error'
                        : result.ttfb <= 150
                        ? 'low'
                        : result.ttfb <= 250
                        ? 'medium'
                        : 'high'}"
                    >${result.ttfb === -1
                        ? html`<i class="fa-solid fa-xmark"></i>`
                        : `${parseFloat(result.ttfb).toFixed(2)}ms`}</span
                >
            </div>

            <!-- Response time is
            <span
                class="_response-time s-font:code s-tc:${result.status === 'success'
                ? 'success'
                : result.status === 'warning'
                ? 'accent'
                : 'error'}"
                >${__formatDuration(result.responseTime)}</span
            > -->
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
