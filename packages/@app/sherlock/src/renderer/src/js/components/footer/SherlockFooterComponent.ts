import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import __sherlockStores from '../../stores/SherlockStores.js';

@customElement('sherlock-footer')
export class SherlockFooterComponent extends LitElement {
    static styles = css``;

    constructor() {
        super();

        // reactive
        __sherlockStores.app.$set(['*'], () => {
            this.requestUpdate();
        });
    }

    render() {
        return html` <header class="sh-footer">Sherlock</header> `;
    }

    createRenderRoot() {
        return this;
    }
}
