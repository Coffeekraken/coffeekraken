var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SLitComponent from '@coffeekraken/s-lit-component';
import { css, html, unsafeCSS } from 'lit';
import { query, property } from 'lit/decorators.js';
import __SConfigExplorerComponentInterface from './interface/SConfigExplorerComponentInterface';
import __SRequest from '@coffeekraken/s-request';
import __minimatch from 'minimatch';
export default class SConfigExplorer extends __SLitComponent {
    constructor() {
        super();
        this._displayedConfig = [];
        this._component = new __SComponentUtils(this.tagName.toLowerCase(), this, this.attributes, {
            componentUtils: {
                // @TODO        check why is an issue here...
                // @ts-ignore
                interface: __SConfigExplorerComponentInterface,
                defaultProps: {},
            },
        });
        (() => __awaiter(this, void 0, void 0, function* () {
            const request = new __SRequest({});
            const response = yield request.send({
                type: 'GET',
                // @ts-ignore
                url: `/${this._component.props.apiUrl}?flat=1`,
            });
            this._config = response.data;
        }))();
    }
    static get styles() {
        return css `
            ${unsafeCSS(`
            :host {
                display: block;
            }
        `)}
        `;
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
    createRenderRoot() {
        return this;
    }
    render() {
        var _a, _b, _c;
        return html `
            <div class="${(_a = this._component) === null || _a === void 0 ? void 0 : _a.className()}">
                <table class="${(_b = this._component) === null || _b === void 0 ? void 0 : _b.className('__table', 's-table')}">
                    <tr>
                        <th>
                            <input
                                class="${(_c = this._component) === null || _c === void 0 ? void 0 : _c.className('__search', 's-input s-width:100')}"
                                type="text"
                                name="dotpath"
                                placeholder="Filter by dotpath"
                            />
                        </th>
                        <th>Value</th>
                    </tr>
                    ${this._config
            ? html `
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
                if (dotpath.startsWith(this._$dotpath.value))
                    return true;
                return __minimatch(dotpath, this._$dotpath.value, {
                    matchBase: true,
                });
            })
                .map((dotpath) => {
                return html `
                                          <tr>
                                              <td>
                                                  ${dotpath.split('.').map((part, i) => {
                    if (i < dotpath.split('.').length - 1) {
                        return html `
                                                              <a
                                                                  @click="${() => {
                            this._filter(dotpath
                                .split('.')
                                .slice(0, i + 1)
                                .join('.'));
                        }}"
                                                                  >${part}</a
                                                              >${i < dotpath.split('.').length - 1 ? '.' : ''}
                                                          `;
                    }
                    else {
                        return part;
                    }
                })}
                                              </td>
                                              <td>${this._config[dotpath]}</td>
                                          </tr>
                                      `;
            })}
                          `
            : html `
                              <tr>
                                  <td colspan="2">Loading configurations please wait...</td>
                              </tr>
                          `}
                </table>
            </div>
        `;
    }
}
__decorate([
    property()
], SConfigExplorer.prototype, "_config", void 0);
__decorate([
    query('input[name="dotpath"]')
], SConfigExplorer.prototype, "_$dotpath", void 0);
export function webcomponent(props = {}, tagName = 's-config-explorer', settings = {}) {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SConfigExplorer, settings);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbmZpZ0V4cGxvcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NvbmZpZ0V4cGxvcmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sZUFBNkMsTUFBTSwrQkFBK0IsQ0FBQztBQUMxRixPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDM0MsT0FBTyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNwRCxPQUFPLG1DQUFtQyxNQUFNLCtDQUErQyxDQUFDO0FBQ2hHLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sV0FBVyxNQUFNLFdBQVcsQ0FBQztBQU9wQyxNQUFNLENBQUMsT0FBTyxPQUFPLGVBQWdCLFNBQVEsZUFBZTtJQW1CeEQ7UUFDSSxLQUFLLEVBQUUsQ0FBQztRQW5CWixxQkFBZ0IsR0FBVSxFQUFFLENBQUM7UUFvQnpCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3ZGLGNBQWMsRUFBRTtnQkFDWiw2Q0FBNkM7Z0JBQzdDLGFBQWE7Z0JBQ2IsU0FBUyxFQUFFLG1DQUFtQztnQkFDOUMsWUFBWSxFQUFFLEVBQUU7YUFDbkI7U0FDSixDQUFDLENBQUM7UUFFSCxDQUFDLEdBQVMsRUFBRTtZQUNSLE1BQU0sT0FBTyxHQUFHLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ25DLE1BQU0sUUFBUSxHQUFRLE1BQU0sT0FBTyxDQUFDLElBQUksQ0FBQztnQkFDckMsSUFBSSxFQUFFLEtBQUs7Z0JBQ1gsYUFBYTtnQkFDYixHQUFHLEVBQUUsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLFNBQVM7YUFD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