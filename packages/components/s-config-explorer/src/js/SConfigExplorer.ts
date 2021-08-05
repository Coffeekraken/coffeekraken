import __SComponentUtils from '@coffeekraken/s-component-utils';
import { css, html, LitElement, property, unsafeCSS, query } from 'lit-element';
import __SConfigExplorerComponentInterface from './interface/SConfigExplorerComponentInterface';
import __SRequest from '@coffeekraken/s-request';
import __minimatch from 'minimatch';

export default class SConfigExplorer extends LitElement {

    _component = undefined;
    _displayedConfig = [];

    @property()
    _config;

    @query('input[name="dotpath"]')
    _$dotpath;

    static get styles() {
        return css`${unsafeCSS(`
            :host {
                display: block;
            }
        `)}`;
    }

    constructor() {
        super();
        this._component = new __SComponentUtils(this.tagName.toLowerCase(), this, this.attributes, {
            interface: __SConfigExplorerComponentInterface,
            defaultProps: {}
        });

        (async () => {
            const request = new __SRequest({});
            const response: any = await request.send({
                type: 'GET',
                url: `/${this._component.props.path}?flat=1`
            });
            this._config = response.data;
        })();
    }
    firstUpdated() {
        let timeout;
        this._$dotpath.addEventListener('keyup', (e) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                this._displayedConfig = [];
                this.requestUpdate();
            }, 100);
        })
    }
    _filter(dotpath) {
        this._$dotpath.value = dotpath;
        this._displayedConfig = [];
        this.requestUpdate();
    }
    createRenderRoot() {
        return this;
    }
    render() {
        return html`
            <div class="${this._component?.className()}">
                <table class="${this._component?.className('__table', 's-table')}">
                    <tr>
                        <th>
                            <input class="${this._component?.className('__search', 's-input s-width:100')}" type="text" name="dotpath" placeholder="Filter by dotpath" />
                        </th>
                        <th>Value</th>
                    </tr>
                    ${this._config ? html`
                        ${Object.keys(this._config).filter((dotpath, i) => {
                            if (!this._$dotpath.value) {
                                const splits = dotpath.split('.');
                                if (this._displayedConfig.indexOf(splits[0]) === -1) {
                                    this._displayedConfig.push(splits[0]);
                                    return true;
                                }
                                return false;
                            }
                            // if (!this._$dotpath.value) return true;
                            if (dotpath.startsWith(this._$dotpath.value)) return true;
                            return __minimatch(dotpath, this._$dotpath.value, {
                                matchBase: true
                            });
                        }).map(dotpath => {
                            return html`
                                <tr>
                                    <td>
                                        ${dotpath.split('.').map((part,i) => {
                                            if (i < dotpath.split('.').length -1) {
                                                return html`
                                                    <a @click="${() => { this._filter(dotpath.split('.').slice(0,i+1).join('.')) }}">${part}</a>${i < dotpath.split('.').length - 1 ? '.' : ''}
                                                `;
                                            } else {
                                                return part
                                            }
                                        })}    
                                    </td>
                                    <td>${this._config[dotpath]}</td>
                                </tr>
                            `;
                        })}
                    ` : html`
                        <tr>
                            <td colspan="2">Loading configurations please wait...</td>
                        </tr>
                    `}
                </table>
            </div>
        `;
    }
}

export function webcomponent(tagName = 's-config-explorer', settings = {}) {
    customElements.define(tagName, SConfigExplorer, settings);
}