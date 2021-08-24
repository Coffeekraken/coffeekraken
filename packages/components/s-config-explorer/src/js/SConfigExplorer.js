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
import __SComponentUtils, { SLitElement } from '@coffeekraken/s-component-utils';
import { css, html, property, unsafeCSS, query } from 'lit-element';
import __SConfigExplorerComponentInterface from './interface/SConfigExplorerComponentInterface';
import __SRequest from '@coffeekraken/s-request';
import __minimatch from 'minimatch';
export default class SConfigExplorer extends SLitElement {
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
    __SComponentUtils.setDefaultProps(tagName, props);
    customElements.define(tagName, SConfigExplorer, settings);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbmZpZ0V4cGxvcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NvbmZpZ0V4cGxvcmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8saUJBQWlCLEVBQUUsRUFBRSxXQUFXLEVBQWdDLE1BQU0saUNBQWlDLENBQUM7QUFDL0csT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDcEUsT0FBTyxtQ0FBbUMsTUFBTSwrQ0FBK0MsQ0FBQztBQUNoRyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLFdBQVcsTUFBTSxXQUFXLENBQUM7QUFPcEMsTUFBTSxDQUFDLE9BQU8sT0FBTyxlQUFnQixTQUFRLFdBQVc7SUFvQnBEO1FBQ0ksS0FBSyxFQUFFLENBQUM7UUFuQloscUJBQWdCLEdBQVUsRUFBRSxDQUFDO1FBb0J6QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUN2RixjQUFjLEVBQUU7Z0JBQ1osNkNBQTZDO2dCQUM3QyxhQUFhO2dCQUNiLFNBQVMsRUFBRSxtQ0FBbUM7Z0JBQzlDLFlBQVksRUFBRSxFQUFFO2FBQ25CO1NBQ0osQ0FBQyxDQUFDO1FBRUgsQ0FBQyxHQUFTLEVBQUU7WUFDUixNQUFNLE9BQU8sR0FBRyxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNuQyxNQUFNLFFBQVEsR0FBUSxNQUFNLE9BQU8sQ0FBQyxJQUFJLENBQUM7Z0JBQ3JDLElBQUksRUFBRSxLQUFLO2dCQUNYLGFBQWE7Z0JBQ2IsR0FBRyxFQUFFLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxTQUFTO2FBQ2pELENBQUMsQ0FB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