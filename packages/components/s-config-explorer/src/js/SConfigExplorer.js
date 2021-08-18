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
        this._component = undefined;
        this._displayedConfig = [];
        this._component = new __SComponentUtils(this.tagName.toLowerCase(), this, this.attributes, {
            interface: __SConfigExplorerComponentInterface,
            defaultProps: {},
        });
        (() => __awaiter(this, void 0, void 0, function* () {
            const request = new __SRequest({});
            const response = yield request.send({
                type: 'GET',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbmZpZ0V4cGxvcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NvbmZpZ0V4cGxvcmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8saUJBQWlCLEVBQUUsRUFBRSxXQUFXLEVBQWdDLE1BQU0saUNBQWlDLENBQUM7QUFDL0csT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDcEUsT0FBTyxtQ0FBbUMsTUFBTSwrQ0FBK0MsQ0FBQztBQUNoRyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLFdBQVcsTUFBTSxXQUFXLENBQUM7QUFPcEMsTUFBTSxDQUFDLE9BQU8sT0FBTyxlQUFnQixTQUFRLFdBQVc7SUFvQnBEO1FBQ0ksS0FBSyxFQUFFLENBQUM7UUFwQlosZUFBVSxHQUFHLFNBQVMsQ0FBQztRQUN2QixxQkFBZ0IsR0FBRyxFQUFFLENBQUM7UUFvQmxCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3ZGLFNBQVMsRUFBRSxtQ0FBbUM7WUFDOUMsWUFBWSxFQUFFLEVBQUU7U0FDbkIsQ0FBQyxDQUFDO1FBRUgsQ0FBQyxHQUFTLEVBQUU7WUFDUixNQUFNLE9BQU8sR0FBRyxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNuQyxNQUFNLFFBQVEsR0FBUSxNQUFNLE9BQU8sQ0FBQyxJQUFJLENBQUM7Z0JBQ3JDLElBQUksRUFBRSxLQUFLO2dCQUNYLEdBQUcsRUFBRSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sU0FBUzthQUNqRCxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDakMsQ0FBQyxDQUFBLENBQUMsRUFBRSxDQUFDO0lBQ1QsQ0FBQztJQXpCRCxNQUFNLEtBQUssTUFBTTtRQUNiLE9BQU8sR0FBRyxDQUFBO2NBQ0osU0FBUyxDQUFDOzs7O1NBSWYsQ0FBQztTQUNELENBQUM7SUFDTixDQUFDO0lBa0JELFlBQVk7UUFDUixJQUFJLE9BQU8sQ0FBQztRQUNaLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDM0MsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3RCLE9BQU8sR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUN0QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO2dCQUMzQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDekIsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ1osQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsT0FBTyxDQUFDLE9BQU87UUFDWCxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7UUFDL0IsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUNELGdCQUFnQjtRQUNaLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDRCxNQUFNOztRQUNGLE9BQU8sSUFBSSxDQUFBOzBCQUNPLE1BQUEsSUFBSSxDQUFDLFVBQVUsMENBQUUsU0FBUyxFQUFFO2dDQUN0QixNQUFBLElBQUksQ0FBQyxVQUFVLDBDQUFFLFNBQVMsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDOzs7O3lDQUl2QyxNQUFBLElBQUksQ0FBQyxVQUFVLDBDQUFFLFNBQVMsQ0FBQyxVQUFVLEVBQUUscUJBQXFCLENBQUM7Ozs7Ozs7O3NCQVFoRixJQUFJLENBQUMsT0FBTztZQUNWLENBQUMsQ0FBQyxJQUFJLENBQUE7Z0NBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO2lCQUN0QixNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRTtvQkFDdkIsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDbEMsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO3dCQUNqRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN0QyxPQUFPLElBQUksQ0FBQztxQkFDZjtvQkFDRCxPQUFPLEtBQUssQ0FBQztpQkFDaEI7Z0JBQ0QsMENBQTBDO2dCQUMxQyxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7b0JBQUUsT0FBTyxJQUFJLENBQUM7Z0JBQzFELE9BQU8sV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRTtvQkFDOUMsU0FBUyxFQUFFLElBQUk7aUJBQ2xCLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQztpQkFDRCxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtnQkFDYixPQUFPLElBQUksQ0FBQTs7O29EQUdHLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUNqQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7d0JBQ25DLE9BQU8sSUFBSSxDQUFBOzs0RUFFTyxHQUFHLEVBQUU7NEJBQ1gsSUFBSSxDQUFDLE9BQU8sQ0FDUixPQUFPO2lDQUNGLEtBQUssQ0FBQyxHQUFHLENBQUM7aUNBQ1YsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lDQUNmLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FDakIsQ0FBQzt3QkFDTixDQUFDO3FFQUNFLElBQUk7aUVBQ1IsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFOzJEQUNsRCxDQUFDO3FCQUNMO3lCQUFNO3dCQUNILE9BQU8sSUFBSSxDQUFDO3FCQUNmO2dCQUNMLENBQUMsQ0FBQzs7b0RBRUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7O3VDQUVsQyxDQUFDO1lBQ04sQ0FBQyxDQUFDOzJCQUNUO1lBQ0gsQ0FBQyxDQUFDLElBQUksQ0FBQTs7OzsyQkFJSDs7O1NBR2xCLENBQUM7SUFDTixDQUFDO0NBQ0o7QUF4SEc7SUFEQyxRQUFRLEVBQUU7Z0RBQ0g7QUFHUjtJQURDLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQztrREFDckI7QUF1SGQsTUFBTSxVQUFVLFlBQVksQ0FDeEIsUUFBaUQsRUFBRSxFQUNuRCxPQUFPLEdBQUcsbUJBQW1CLEVBQzdCLFFBQVEsR0FBRyxFQUFFO0lBRWIsaUJBQWlCLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNsRCxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDOUQsQ0FBQyJ9