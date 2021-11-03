// @ts-nocheck

import __SRequest from '@coffeekraken/s-request';
import { html } from 'lit';
import __SLitComponent from '@coffeekraken/s-lit-component';
import __expandPleasantCssClassnamesLive from '@coffeekraken/sugar/js/html/expandPleasantCssClassnamesLive';

import {
    loadDocmap,
    getCurrentVersion,
    setState,
    getState,
} from '../state/state';

export default class CKSearch extends __SLitComponent {
    constructor() {
        super({
            litComponent: {
                shadowDom: false,
            },
        });
    }

    async firstUpdated() {}
    render() {
        return html`
            <div class="ck-search">
                <div class="__background"></div>
                <div class="__content">
                    <input type="text" name="search" class="s-input" />
                </div>
            </div>
        `;
    }
}

export function define(props: any = {}, tagName = 'ck-search') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, CKSearch);
}
