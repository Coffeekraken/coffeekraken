// @ts-nocheck

import __SRequest from '@coffeekraken/s-request';
import { html } from 'lit';
import { property } from 'lit/decorators.js';
import __SLitComponent from '@coffeekraken/s-lit-component';

import { loadDocmap, getCurrentVersion, setState } from '../state/state';

export default class VersionSelector extends __SLitComponent {
    @property()
    _currentVersion;

    @property()
    _versions = [];

    constructor() {
        super({
            litComponent: {
                shadowDom: false,
            },
        });
        (async () => {
            const docmapJson = await loadDocmap();
            this._versions = docmapJson.snapshots || [];
            this._currentVersion = await getCurrentVersion();
        })();
    }
    _change(e) {
        setTimeout(() => {
            let newLocation = document.location.href;
            if (document.location.href.match(/^https?:\/\/v[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\./)) {
                newLocation = document.location.href.replace(
                    /^(https?:\/\/v)[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.(.*)/,
                    `$1${e.target.value}.$2`,
                );
            } else {
                newLocation = document.location.href.replace(/^(https?:\/\/)(.*)/, `$1v${e.target.value}.$2`);
            }
            document.location = newLocation;
        });
    }
    render() {
        return html`
            <label class="s-select s-color:accent">
                <select @change="${this._change}">
                    ${this._versions.map(
                        (snap) => html`
                            <option ?selected="${this._currentVersion === snap}" value="${snap}">${snap}</option>
                        `,
                    )}
                </select>
            </label>
        `;
    }
}

export function define(props: any = {}, tagName = 'version-selector') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, VersionSelector);
}
