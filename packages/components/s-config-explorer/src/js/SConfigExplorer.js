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
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
export default class SConfigExplorer extends __SLitComponent {
    constructor() {
        super(__deepMerge({
            sLitComponent: {
                shadowDom: false,
            },
            sComponentUtils: {
                interface: __SConfigExplorerComponentInterface,
            },
        }));
        this._displayedConfig = [];
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
    render() {
        return html `
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
export function define(props = {}, tagName = 's-config-explorer') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SConfigExplorer);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbmZpZ0V4cGxvcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NvbmZpZ0V4cGxvcmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBQzVELE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUMzQyxPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3BELE9BQU8sbUNBQW1DLE1BQU0sK0NBQStDLENBQUM7QUFDaEcsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxXQUFXLE1BQU0sV0FBVyxDQUFDO0FBQ3BDLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBT3RFLE1BQU0sQ0FBQyxPQUFPLE9BQU8sZUFBZ0IsU0FBUSxlQUFlO0lBbUJ4RDtRQUNJLEtBQUssQ0FDRCxXQUFXLENBQUM7WUFDUixhQUFhLEVBQUU7Z0JBQ1gsU0FBUyxFQUFFLEtBQUs7YUFDbkI7WUFDRCxlQUFlLEVBQUU7Z0JBQ2IsU0FBUyxFQUFFLG1DQUFtQzthQUNqRDtTQUNKLENBQUMsQ0FDTCxDQUFDO1FBNUJOLHFCQUFnQixHQUFVLEVBQUUsQ0FBQztRQThCekIsQ0FBQyxHQUFTLEVBQUU7WUFDUixNQUFNLE9BQU8sR0FBRyxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNuQyxNQUFNLFFBQVEsR0FBUSxNQUFNLE9BQU8sQ0FBQyxJQUFJLENBQUM7Z0JBQ3JDLElBQUksRUFBRSxLQUFLO2dCQUNYLGFBQWE7Z0JBQ2IsR0FBRyxFQUFFLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxTQUFTO2FBQ2pELENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztRQUNqQyxDQUFDLENB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