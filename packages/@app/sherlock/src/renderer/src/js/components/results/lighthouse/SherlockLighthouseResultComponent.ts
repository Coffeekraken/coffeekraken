import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import type { ISDobbyLighthouseTaskResult } from '@coffeekraken/s-dobby';

@customElement('sherlock-lighthouse-result')
export default class SherlockLighthouseResultComponent extends LitElement {
    static styles = css``;

    @property({ type: Object })
    results: ISDobbyLi = null;

    static renderListWidget(result: ISDobbyLighthouseTaskResult): any {
        console.log('az0', result);

        let total = 0;
        for (let [id, category] of Object.entries(result.categories ?? {})) {
            total += category.score * 100;
        }

        const categoriesCount = Object.keys(result.categories ?? {}).length,
            globalScore = Math.round((100 / (100 * categoriesCount)) * total);

        return html`<div class="sh-lighthouse-result-list-widget">
            <div class="_global">
                <span class="_label">Global</span>
                <div class="s-tooltip-container">
                    <s-gauge min="0" max="100" value="${globalScore}"></s-gauge>
                    <div class="s-tooltip:right">Global score (${globalScore})</div>
                </div>
                <span class="_score">${globalScore}</span>
            </div>

            <span class="_separator">-</span>

            <div class="_categories">
                <span class="_label">Categories</span>
                ${Object.entries(result.categories ?? {}).map(
                    ([id, category]) => html`
                        <div class="_category">
                            <div class="s-tooltip-container">
                                <s-gauge
                                    min="0"
                                    max="100"
                                    value="${category.score * 100}"
                                ></s-gauge>
                                <div class="s-tooltip:right">${category.title}</div>
                            </div>
                            <span class="_score">${category.score * 100}</span>
                        </div>
                    `,
                )}
            </div>
        </div>`;
    }

    constructor() {
        super();
    }

    render() {
        return html` <article class="sh-results sh-lighthous-result">Response time</article> `;
    }

    createRenderRoot() {
        return this;
    }
}
