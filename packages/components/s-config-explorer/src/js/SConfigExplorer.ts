import __SLitComponent from '@coffeekraken/s-lit-component';
import { css, html, unsafeCSS } from 'lit';
import { query, property } from 'lit/decorators.js';
import __SConfigExplorerComponentInterface from './interface/SConfigExplorerComponentInterface';
import __SRequest from '@coffeekraken/s-request';
import __minimatch from 'minimatch';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';

export interface ISConfigExplorerComponentProps {
    apiUrl: string;
    maxItems: number;
}

export default class SConfigExplorer extends __SLitComponent {
    _displayedConfig: any[] = [];

    @property()
    _config;

    @query('input[name="dotpath"]')
    _$dotpath;

    static get styles() {
        return css`
            ${unsafeCSS(`
            :host {
                display: block;
            }
        `)}
        `;
    }

    constructor() {
        super(
            __deepMerge({
                sLitComponent: {
                    shadowDom: false,
                },
                sComponentUtils: {
                    interface: __SConfigExplorerComponentInterface,
                },
            }),
        );

        (async () => {
            const request = new __SRequest({});
            const response: any = await request.send({
                type: 'GET',
                // @ts-ignore
                url: `/${this._component.props.apiUrl}?flat=1`,
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
        });
    }
    _filter(dotpath) {
        this._$dotpath.value = dotpath;
        this._displayedConfig = [];
        this.requestUpdate();
    }
    render() {
        return html`
            <div class="${this.componentUtils.className()}">
                <table class="${this.componentUtils.className('__table', 's-table')}">
                    <tr>
                        <th>
                            <input
                                class="${this.componentUtils.className('__search', 's-input s-width:100')}"
                                type="text"
                                name="dotpath"
                                placeholder="Filter by dotpath"
                            />
                        </th>
                        <th>Value</th>
                    </tr>
                    ${this._config
                        ? html`
                              ${Object.keys(this._config)
                                  .filter((dotpath, i) => {
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
                                          matchBase: true,
                                      });
                                  })
                                  .map((dotpath) => {
                                      return html`
                                          <tr>
                                              <td>
                                                  ${dotpath.split('.').map((part, i) => {
                                                      if (i < dotpath.split('.').length - 1) {
                                                          return html`
                                                              <a
                                                                  @click="${() => {
                                                                      this._filter(
                                                                          dotpath
                                                                              .split('.')
                                                                              .slice(0, i + 1)
                                                                              .join('.'),
                                                                      );
                                                                  }}"
                                                                  >${part}</a
                                                              >${i < dotpath.split('.').length - 1 ? '.' : ''}
                                                          `;
                                                      } else {
                                                          return part;
                                                      }
                                                  })}
                                              </td>
                                              <td>${this._config[dotpath]}</td>
                                          </tr>
                                      `;
                                  })}
                          `
                        : html`
                              <tr>
                                  <td colspan="2">Loading configurations please wait...</td>
                              </tr>
                          `}
                </table>
            </div>
        `;
    }
}

export function define(props: Partial<ISConfigExplorerComponentProps> = {}, tagName = 's-config-explorer') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SConfigExplorer);
}
