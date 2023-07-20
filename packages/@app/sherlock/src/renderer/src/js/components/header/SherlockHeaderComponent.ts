import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import type { ISherlockService, ISherlockSpace } from '../../../../../shared/SherlockTypes.js';

import __sherlockStores from '../../stores/SherlockStores.js';

@customElement('sherlock-header')
export class SherlockHeaderComponent extends LitElement {
    static styles = css``;

    constructor() {
        super();

        // reactive
        __sherlockStores.app.$set(['*'], () => {
            this.requestUpdate();
        });
    }

    render() {
        const service: ISherlockService = __sherlockStores.route.service,
            space: ISherlockSpace = __sherlockStores.route.space;

        return html`
            <header class="sh-header">
                <svg
                    class="s-logo s-logo--coffeekraken-picto"
                    viewBox="0 0 299 229"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M102.5 55.3151V202.802H191V229H71V29H142V55.3151H102.5Z"
                        fill="white"
                    />
                    <path
                        d="M265.5 26.3151V202.802H227.5V229H298.5V0H227.5V26.3151H265.5Z"
                        fill="white"
                    />
                    <path d="M31.5 109.315V166.802H31V193H0V83H71V109.315H31.5Z" fill="white" />
                    <path
                        d="M173 144.5C173 159.136 162.703 171 150 171C137.297 171 127 159.136 127 144.5C127 129.864 137.297 118 150 118C167.5 118 173 129.864 173 144.5Z"
                        fill="#FEBD0F"
                    />
                    <path
                        d="M240 144.5C240 159.136 229.703 171 217 171C204.297 171 194 159.136 194 144.5C194 129.864 200.5 118 217 118C229.703 118 240 129.864 240 144.5Z"
                        fill="#FEBD0F"
                    />
                </svg>

                <h1 class="_title">${space?.name ?? 'Sherlock'}</h1>
            </header>
        `;
    }

    createRenderRoot() {
        return this;
    }
}
