// @ts-nocheck

import __SLitComponent from '@coffeekraken/s-lit-component';
import { html } from 'lit';
import { property } from 'lit/decorators.js';
import __SRequest from '@coffeekraken/s-request';
import __set from '@coffeekraken/sugar/shared/object/set';
import __get from '@coffeekraken/sugar/shared/object/get';

export interface IApiNavComponentProps {}

export default class ApiNav extends __SLitComponent {
    constructor() {
        super({
            litComponent: {
                shadowDom: false,
            },
            componentUtils: {
                // interface: __ApiNavComponentInterface,
            },
        });
    }

    _openedNamespaces = [];
    _menuStack = {};
    _menuStates = {};

    async firstUpdated() {
        const request = new __SRequest({
            url: '/api/docmap',
            method: 'get',
        });
        const res = await request.send();

        Object.keys(res.data.map).forEach((namespace) => {
            __set(this._menuStack, namespace, res.data.map[namespace]);
        });

        // restore state
        this._menuStates = JSON.parse(
            window.localStorage.getItem('apiNav') ?? '{}',
        );

        this.requestUpdate();
    }

    _toggle(namespace) {
        if (!this._menuStates[namespace]) {
            this._menuStates[namespace] = {
                opened: true,
            };
        } else {
            this._menuStates[namespace].opened =
                !this._menuStates[namespace].opened;
        }

        // save state
        window.localStorage.setItem('apiNav', JSON.stringify(this._menuStates));

        this.requestUpdate();
    }

    _renderList(obj, currentNamespace = '') {
        const items = Object.keys(obj).map((itemName) => {
            const itemObj = obj[itemName];
            const itemNamespace = `${
                currentNamespace ? `${currentNamespace}.` : ''
            }${itemName}`;

            if (itemObj.name && itemObj.namespace) {
                return html`
                    <li class="__slug">
                        <a href="/api/${itemNamespace}">${itemObj.name}</a>
                    </li>
                `;
            } else {
                return html`
                    <li class="__toggle">
                        <span
                            @click=${() => {
                                this._toggle(itemNamespace);
                            }}
                        >
                            ${itemName}
                        </span>
                        ${this._menuStates[itemNamespace]?.opened
                            ? html`
                                  ${this._renderList(
                                      __get(this._menuStack, itemNamespace),
                                      itemNamespace,
                                  )}
                              `
                            : ''}
                    </li>
                `;
            }
        });

        return html`
            <ul class="${!currentNamespace ? 'folder-nav' : ''}">
                ${items}
            </ul>
        `;
    }

    render() {
        return html`
            <div class="${this.componentUtils.className('')}">
                ${this._renderList(this._menuStack)}
            </div>
        `;
    }
}

customElements.define('api-nav', ApiNav);
