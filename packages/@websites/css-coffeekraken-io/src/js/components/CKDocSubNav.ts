// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';
import __SLitComponent from '@coffeekraken/s-lit-component';
import { html } from 'lit';

class SCKSubNavPropsInterface extends __SInterface {
    static get _definition() {
        return {
            source: {
                type: 'String',
            },
        };
    }
}

export default class CKDocSubNav extends __SLitComponent {
    static get properties() {
        return __SLitComponent.propertiesFromInterface(
            {},
            SCKSubNavPropsInterface,
        );
    }

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
                '[id]:not(code [id]):not(template [id]):not(.preview-html [id]), h4#doc-api',
            ),
        )?.filter?.(($item) => {
            if (!$item.id) return false;
            if ($item.innerText?.match(/@/)) return false;
            switch ($item.tagName.toLowerCase()) {
                case 'h1':
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
            <div class="ck-doc-sub-nav" s-deps css="ckDocSubNav">
                <div class="_list">
                    ${this._$items.map(
                        ($item, i) => html`
                            <s-scroll class="_list-item" to="#${
                                $item.id
                            }" s-activate trigger="scrollspy:#${$item.id}">
                                    <span class="s-tc:accent class="_index"
                                        >${(i + 1)
                                            .toString()
                                            .padStart(2, 0)}</span
                                    >.
                                    <span class="__title s-mis:20"
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
    __SLitComponent.define(tagName, CKDocSubNav, props);
}
