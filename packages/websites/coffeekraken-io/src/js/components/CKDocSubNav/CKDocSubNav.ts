// @ts-nocheck

import __SLitComponent from '@coffeekraken/s-lit-component';
import { html } from 'lit';
import { property } from 'lit/decorators.js';
import __filterObject from '@coffeekraken/sugar/shared/object/filter';
import __md5 from '@coffeekraken/sugar/shared/crypt/md5';
import __wait from '@coffeekraken/sugar/shared/time/wait';

export default class CKDocSubNav extends __SLitComponent {
    @property({ type: String })
    source;

    constructor() {
        super({
            litComponent: {
                shadowDom: false,
            },
        });

        document.addEventListener('s-page-transition.end', (e) => {
            this._$items = [];
            this.requestUpdate();
            setTimeout(() => {
                this._grabItem();
            });
        });
    }

    _$items: HTMLElement[] = [];

    async firstUpdated() {
        this._grabItem();
    }

    async _grabItem() {
        const $source = document.querySelector(this.source);

        if (!$source) {
            this.classList.remove('active');
            return;
        }

        this._$items = Array.from(
            $source.querySelectorAll(
                '[id]:not(code [id]):not(template [id]):not(.preview-html [id])',
            ),
        ).filter(($item) => {
            if (!$item.id) return false;
            if ($item.innerText.match(/@/)) return false;
            switch ($item.tagName.toLowerCase()) {
                // case 'h1':
                case 'h2':
                case 'h3':
                case 'h4':
                case 'h5':
                case 'p':
                    // case 'h6':
                    return true;
                    break;
            }
            return false;
        });

        if (this._$items.length) {
            this.classList.add('active');
        } else {
            this.classList.remove('active');
        }

        this.requestUpdate();
    }

    render() {
        return html`
            <div class="ck-doc-sub-nav">
                <div class="__list">
                    ${this._$items.map(
                        ($item, i) => html`
                            <s-scroll class="__list-item" to="#${$item.id}">
                                    <span class="s-tc:accent class="__index"
                                        >${(i + 1)
                                            .toString()
                                            .padStart(2, 0)}</span
                                    >.
                                    <span class="s-typo:bold __title"
                                        >${$item.innerText.trim()}</span
                                    >
                            </s-scroll>
                        `,
                    )}
                </div>
            </div>
        `;
    }
}

export function define(props: any = {}, tagName = 'ck-doc-sub-nav') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, CKDocSubNav);
}
