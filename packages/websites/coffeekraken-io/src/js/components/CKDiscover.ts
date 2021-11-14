// @ts-nocheck

import __SLitComponent from '@coffeekraken/s-lit-component';
import { html } from 'lit';
import { loadDocmap } from '../state/state';
import __filterObject from '@coffeekraken/sugar/shared/object/filter';

import __wait from '@coffeekraken/sugar/shared/time/wait';
export default class CKDiscover extends __SLitComponent {
    constructor() {
        super({
            litComponent: {
                shadowDom: false,
            },
        });
    }

    _docmap;
    item;

    async firstUpdated() {
        this._docmap = await loadDocmap();
        this.grabItem();
    }

    async grabItem() {
        this.item = undefined;
        this.requestUpdate();

        await __wait();

        const newMap = __filterObject(this._docmap.map, (key, item) => {
            if (!item.platform) return false;
            if (item.platform[0].name !== this.props.platform) return false;
            if (!item.example) return false;
            return true;
        });
        const mapCount = Object.keys(newMap).length;
        const mapKeys = Object.keys(newMap);
        const itemIdx = Math.floor(Math.random() * mapCount);

        this.item = newMap[mapKeys[itemIdx]];
        this.requestUpdate();
    }

    render() {
        return html`
            <div class="ck-discover">
                ${!this.item
                    ? html`<div class="s-code-example-loader">
                          <i class="s-loader:spinner s-color:accent"></i>
                          &nbsp;
                          <p class="s-typo:p s-display:inline-block">
                              Loading code example. Please wait...
                          </p>
                      </div>`
                    : html`
                          <h1 class="s-typo:h3 s-mbe:30">
                              ${this.item.async
                                  ? html`
                                        <span
                                            class="s-badge:outline s-color:accent"
                                            >Async</span
                                        >&nbsp;
                                    `
                                  : ''}
                              ${this.item.name}
                              <a
                                  @click="${this.grabItem}"
                                  class="s-btn s-radius:100 s-align:abs-top-right s-color:accent s-float:right"
                              >
                                  <i class="s-icon:refresh"></i>
                              </a>
                          </h1>
                          <p class="s-typo:p s-mbe:30">
                              ${this.item.description}
                          </p>
                          <s-code-example>
                              <textarea
                                  lang="${this.props.platform === 'ts' ||
                                  this.props.platform === 'node'
                                      ? 'js'
                                      : this.props.platform}"
                              >
                                ${this.item.example[0].code}
                              </textarea
                              >
                          </s-code-example>
                          <div
                              class="s-until:sibling:mounted s-code-example-loader"
                          >
                              <i class="s-loader:spinner s-color:accent"></i>
                              &nbsp;
                              <p class="s-typo:p s-display:inline-block">
                                  Loading code example. Please wait...
                              </p>
                          </div>
                      `}
            </div>
        `;
    }
}

export function define(props: any = {}, tagName = 'ck-discover') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, CKDiscover);
}
