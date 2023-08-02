import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import type { ISDobbyEcoindexTaskResult } from '@coffeekraken/s-dobby';

import { __formatFileSize } from '@coffeekraken/sugar/format';

@customElement('sherlock-ecoindex-result')
export default class SherlockResponseTimeResultComponent extends LitElement {
    static styles = css``;

    @property({ type: Object })
    results: ISDobbyEcoindexTaskResult = null;

    static renderListWidget(result: ISDobbyEcoindexTaskResult): any {
        return html`<div class="sh-ecoindex-result-list-widget">
            ${result.ecoindex
                ? html`
                      <div
                          class="_grade ${['A', 'B'].includes(result.ecoindex.grade)
                              ? 'high'
                              : ['C', 'D'].includes(result.ecoindex.grade)
                              ? 'medium'
                              : 'low'}"
                      >
                          <span class="_label">Grade</span>
                          <span class="_value">${result.ecoindex.grade}</span>
                      </div>

                      <div class="_separator"></div>

                      <div
                          class="_score ${result.ecoindex.score < 33
                              ? 'low'
                              : result.ecoindex.score < 66
                              ? 'medium'
                              : 'high'}"
                      >
                          <span class="_label">Score</span>
                          <span class="_value">${result.ecoindex.score}</span>
                      </div>

                      <div class="_separator"></div>

                      <div
                          class="_size ${result.ecoindex.size >= 6000
                              ? 'low'
                              : result.ecoindex.size >= 3000
                              ? 'medium'
                              : 'high'}"
                      >
                          <span class="_label">Size</span>
                          <span class="_value"
                              >${__formatFileSize(result.ecoindex.size * 1000)}</span
                          >
                      </div>

                      <div class="_separator"></div>

                      <div
                          class="_requests ${result.ecoindex.requests >= 50
                              ? 'low'
                              : result.ecoindex.size >= 25
                              ? 'medium'
                              : 'high'}"
                      >
                          <span class="_label">Requests</span>
                          <span class="_value">${result.ecoindex.requests}</span>
                      </div>

                      <div class="_separator"></div>

                      <div
                          class="_water ${result.ecoindex.water >= 3
                              ? 'low'
                              : result.ecoindex.water >= 2
                              ? 'medium'
                              : 'high'}"
                      >
                          <span class="_label">Water</span>
                          <span class="_value">${result.ecoindex.water} CL</span>
                      </div>
                  `
                : 'No data'}
        </div>`;
    }

    constructor() {
        super();
    }

    render() {
        return html` <article class="sh-results sh-ecoindex-result">Ecoindex</article> `;
    }

    createRenderRoot() {
        return this;
    }
}
