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
import __SComponentUtils from '@coffeekraken/s-component-utils';
import { css, html, LitElement, property, unsafeCSS, query } from 'lit-element';
import __SConfigExplorerComponentInterface from './interface/SConfigExplorerComponentInterface';
import __SRequest from '@coffeekraken/s-request';
import __minimatch from 'minimatch';
export default class SConfigExplorer extends LitElement {
    constructor() {
        super();
        this._component = undefined;
        this._displayedConfig = [];
        this._component = new __SComponentUtils(this.tagName.toLowerCase(), this, this.attributes, {
            interface: __SConfigExplorerComponentInterface,
            defaultProps: {}
        });
        (() => __awaiter(this, void 0, void 0, function* () {
            const request = new __SRequest({});
            const response = yield request.send({
                type: 'GET',
                url: `/${this._component.props.path}?flat=1`
            });
            this._config = response.data;
        }))();
    }
    static get styles() {
        return css `${unsafeCSS(`
            :host {
                display: block;
            }
        `)}`;
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
                            <input class="${(_c = this._component) === null || _c === void 0 ? void 0 : _c.className('__search', 's-input s-width:100')}" type="text" name="dotpath" placeholder="Filter by dotpath" />
                        </th>
                        <th>Value</th>
                    </tr>
                    ${this._config ? html `
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
            if (dotpath.startsWith(this._$dotpath.value))
                return true;
            return __minimatch(dotpath, this._$dotpath.value, {
                matchBase: true
            });
        }).map(dotpath => {
            return html `
                                <tr>
                                    <td>
                                        ${dotpath.split('.').map((part, i) => {
                if (i < dotpath.split('.').length - 1) {
                    return html `
                                                    <a @click="${() => { this._filter(dotpath.split('.').slice(0, i + 1).join('.')); }}">${part}</a>${i < dotpath.split('.').length - 1 ? '.' : ''}
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
                    ` : html `
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
export function webcomponent(tagName = 's-config-explorer', settings = {}) {
    customElements.define(tagName, SConfigExplorer, settings);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbmZpZ0V4cGxvcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NvbmZpZ0V4cGxvcmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8saUJBQWlCLE1BQU0saUNBQWlDLENBQUM7QUFDaEUsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ2hGLE9BQU8sbUNBQW1DLE1BQU0sK0NBQStDLENBQUM7QUFDaEcsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxXQUFXLE1BQU0sV0FBVyxDQUFDO0FBRXBDLE1BQU0sQ0FBQyxPQUFPLE9BQU8sZUFBZ0IsU0FBUSxVQUFVO0lBbUJuRDtRQUNJLEtBQUssRUFBRSxDQUFDO1FBbEJaLGVBQVUsR0FBRyxTQUFTLENBQUM7UUFDdkIscUJBQWdCLEdBQUcsRUFBRSxDQUFDO1FBa0JsQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUN2RixTQUFTLEVBQUUsbUNBQW1DO1lBQzlDLFlBQVksRUFBRSxFQUFFO1NBQ25CLENBQUMsQ0FBQztRQUVILENBQUMsR0FBUyxFQUFFO1lBQ1IsTUFBTSxPQUFPLEdBQUcsSUFBSSxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDbkMsTUFBTSxRQUFRLEdBQVEsTUFBTSxPQUFPLENBQUMsSUFBSSxDQUFDO2dCQUNyQyxJQUFJLEVBQUUsS0FBSztnQkFDWCxHQUFHLEVBQUUsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLFNBQVM7YUFDL0MsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsSUFBSSxD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