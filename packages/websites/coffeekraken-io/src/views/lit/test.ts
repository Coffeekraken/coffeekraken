import { html } from 'lit';
import __LitTest from './LitTest';
customElements.define('lit-test', __LitTest);

export default () => {
    return html`
        <div>
            <h1>Plop</h1>
            <lit-test></lit-test>
        </div>
    `;
};
