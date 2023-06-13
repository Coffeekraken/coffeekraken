// @ts-nocheck

import __SLitComponent, { html } from '@coffeekraken/s-lit-component';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export default class CkSettings extends __SLitComponent {
    static get properties() {
        return __SLitComponent.propertiesFromInterface();
    }

    static state = {};

    _packages;

    constructor() {
        super({
            shadowDom: false,
        });
    }

    async mount() {
        const json = await this.fetchMenu();
        this._packages = json.packages;
        this.requestUpdate();
    }

    async fetchMenu() {
        const response = await fetch(
                'https://cdnv2.coffeekraken.io/ck-menu.json',
                {
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    referrerPolicy: 'no-referrer',
                },
            ),
            json = await response.json();

        return json;
    }

    render() {
        if (!this._packages) {
            return;
        }
        const h = html`
            <div class="s-dropdown-container">
                <button>
                    <i class="s-icon:ui-menu-grid-solid"></i>
                </button>
                <div class="s-dropdown:bottom-end">
                    <ul class="_packages">
                        ${this._packages.map(
                            (pkg) => html`
                                <li class="_package">
                                    <a
                                        href="${pkg.url}"
                                        title="Coffeekraken ${pkg.title}"
                                    >
                                        <div class="_icon">
                                            ${unsafeHTML(pkg.icon)}
                                        </div>
                                        <div class="_metas">
                                            <h3 class="_title">${pkg.title}</h3>
                                            <p class="_version">
                                                ${pkg.version}
                                            </p>
                                        </div>
                                    </a>
                                </li>
                            `,
                        )}
                    </ul>
                </div>
            </div>
        `;

        return h;
    }
}

export function define(props: any = {}, tagName = 'ck-menu') {
    __SLitComponent.define(tagName, CkSettings, {
        id: 'ck-menu',
        ...props,
    });
}
