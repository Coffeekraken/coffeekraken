// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';
import __SLitComponent from '@coffeekraken/s-lit-component';
import __filterObject from '@coffeekraken/sugar/shared/object/filter';
import { html } from 'lit';
import { loadDocmap } from '../state/state';

class SCKDiscoverPropsInterface extends __SInterface {
    static get _definition() {
        return {
            platform: {
                type: 'String',
            },
        };
    }
}

export default class CKDiscover extends __SLitComponent {
    static get properties() {
        return __SLitComponent.propertiesFromInterface(
            {},
            SCKDiscoverPropsInterface,
        );
    }

    constructor() {
        super({
            shadowDom: false,
        });
    }

    _docmap;
    item;
    timeout;

    async firstUpdated() {
        this._docmap = await loadDocmap();
        _console.log('DOC', this._docmap);
        this.grabItem();
    }

    async grabItem() {
        // this.item = undefined;
        // this.timeout = undefined;
        // this.requestUpdate();

        const newMap = __filterObject(this._docmap.map, (key, item) => {
            if (!item.platform) return false;
            if (!item.example?.[0]?.code) return false;
            if (
                this.props.platform &&
                item.platform[0].name !== this.props.platform
            )
                return false;
            return true;
        });

        const mapCount = Object.keys(newMap).length;
        const mapKeys = Object.keys(newMap);
        const itemIdx = Math.floor(Math.random() * mapCount);

        this.item = newMap[mapKeys[itemIdx]];
        this.requestUpdate();

        this.timeout = setTimeout(() => {
            this.timeout = undefined;
            this.requestUpdate();
        }, 200);
    }

    render() {
        return html`
            <div class="ck-discover">
                ${!this.item
                    ? html`
                          <div class="s-code-example-loader">
                              <i class="s-loader:spinner s-color:accent"></i>
                              &nbsp;
                              <p class="s-typo:p s-display:inline-block">
                                  Loading code example. Please wait...
                              </p>
                          </div>
                      `
                    : html`
                          <a
                              @click="${this.grabItem}"
                              class="s-btn s-radius:100 s-align:abs-top-right s-color:accent s-float:right"
                          >
                              <i class="s-icon:ui-refresh"></i>
                          </a>
                          ${this.item.async
                              ? html`
                                    <span class="s-badge:outline s-color:accent"
                                        >Async</span
                                    >&nbsp;
                                `
                              : ''}
                          ${this.item.type?.types?.[0].type || this.item.type
                              ? html`
                                    <span class="s-badge s-color:complementary"
                                        >${this.item.type?.types?.[0]?.type ??
                                        this.item.type}</span
                                    >
                                `
                              : ''}
                          <br />
                          <br />
                          <h1 class="s-typo:h3 s-mbe:30">${this.item.name}</h1>
                          <p class="s-typo:p s-mbe:30 s-truncate:3">
                              ${this.item.description}
                          </p>
                          ${!this.timeout
                              ? html`
                                    <s-code-example
                                        lines="8"
                                        s-deps
                                        css="codeExample"
                                    >
                                        <code
                                            lang="${this.props.platform ===
                                                'ts' ||
                                            this.props.platform === 'node'
                                                ? 'js'
                                                : this.props.platform ===
                                                  'postcss'
                                                ? 'css'
                                                : this.props.platform}"
                                        >
                                            ${this.item.example[0].code}
                                        </code>
                                    </s-code-example>
                                `
                              : ''}
                      `}
            </div>
        `;
    }
}

export function define(props: any = {}, tagName = 'ck-discover') {
    __SLitComponent.define(tagName, CKDiscover, props);
}
