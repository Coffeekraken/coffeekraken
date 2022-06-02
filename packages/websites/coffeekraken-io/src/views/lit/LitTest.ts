import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';

export default class LitTest extends LitElement {
    // title = 'HWLLO lit';
    // createRenderRoot() {
    //     return this;
    // }
    @property()
    title = 'hello';

    render() {
        return html`
            <h1 class="s-typoh1">
                YYY
            </h1>
        `;
    }
}
