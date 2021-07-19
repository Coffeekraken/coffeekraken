import __SRequest from '@coffeekraken/s-request';
import { html, LitElement, property } from 'lit-element';

import { loadDocmap, getCurrentVersion, setState } from '../state/state';

export default class VersionSelector extends LitElement {

    @property()
    _currentVersion;

    @property()
    _versions = [];

    constructor() {
        super();
        (async () => {
            const docmapJson = await loadDocmap();
            this._versions = docmapJson.snapshots || [];
            this._currentVersion = await getCurrentVersion();
        })();
    }
    createRenderRoot() {
        return this;
    }
    _change(e) {
        setState({
            version: e.target.value
        });
        setTimeout(() => {
            document.location.reload();
        });
    }
    render() {
        return html`
            <label class="s-select">
                <select @change="${this._change}">
                    ${this._versions.map(snap => html`
                        <option ?selected="${this._currentVersion === snap}" value="${snap}">${snap}</option>   
                    `)}
                </select>
            </label>
        `;
    }
}

export function webcomponent(tagName = 'version-selector') {
    customElements.define(tagName, VersionSelector);
}