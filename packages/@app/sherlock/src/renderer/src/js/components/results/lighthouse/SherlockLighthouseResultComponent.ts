import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import type { ISDobbyLighthouseTaskResult } from '@coffeekraken/s-dobby';

@customElement('sherlock-lighthouse-result')
export default class SherlockLighthouseResultComponent extends LitElement {
    static styles = css``;

    @property({ type: Object })
    results: ISDobbyLi = null;

    static renderListWidget(result: ISDobbyLighthouseTaskResult): any {
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
                    <div class="_global">
                        <s-gauge min="0" max="100" value="${globalScore}"></s-gauge>
                        <span class="_score">${globalScore}</span>
                    </div>
                    <div class="s-tooltip:right">Global score (${globalScore})</div>
                </div>
            </div>

            <span class="_separator"></span>

            <div class="_categories">
                <span class="_label">Categories</span>
                ${Object.entries(result.categories ?? {}).map(
                    ([id, category]) => html`
                        <div class="s-tooltip-container">
                            <div class="_category">
                                <s-gauge
                                    min="0"
                                    max="100"
                                    value="${category.score * 100}"
                                ></s-gauge>
                                <span class="_score">${category.score * 100}</span>
                            </div>
                            <div class="s-tooltip:right">
                                ${category.title} (${category.score * 100})
                            </div>
                        </div>
                    `,
                )}
            </div>

            <div class="_separator"></div>

            <div class="_vitals">
                <div class="_label">Vitals</div>
                ${['largest-contentful-paint', 'max-potential-fid', 'cumulative-layout-shift'].map(
                    (auditId) => {
                        const vital = result.audits[auditId];
                        if (!vital) return '';
                        return html`
                            <div class="s-tooltip-container">
                                <div class="_vital">
                                    <s-gauge
                                        min="0"
                                        max="100"
                                        value="${vital.score * 100}"
                                    ></s-gauge>
                                    <span class="_score">${vital.displayValue}</span>
                                </div>
                                <div class="s-tooltip:right">
                                    ${vital.title} (${vital.displayValue})
                                </div>
                            </div>
                        `;
                    },
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
