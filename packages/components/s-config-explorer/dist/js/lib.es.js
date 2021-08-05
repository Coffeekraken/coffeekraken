import __SComponentUtils from "@coffeekraken/s-component-utils";
import {LitElement, css, unsafeCSS, html, property, query} from "lit-element";
import __SInterface from "@coffeekraken/s-interface";
import __SRequest from "@coffeekraken/s-request";
import __minimatch from "minimatch";
class SConfigExplorerComponentInterface extends __SInterface {
}
SConfigExplorerComponentInterface.definition = {
  path: {
    type: "String",
    default: "api/config"
  },
  maxItems: {
    type: "Number",
    default: 30
  }
};
var __decorate = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
class SConfigExplorer extends LitElement {
  constructor() {
    super();
    this._component = void 0;
    this._displayedConfig = [];
    this._component = new __SComponentUtils(this.tagName.toLowerCase(), this, this.attributes, {
      interface: SConfigExplorerComponentInterface,
      defaultProps: {}
    });
    (() => __awaiter(this, void 0, void 0, function* () {
      const request = new __SRequest({});
      const response = yield request.send({
        type: "GET",
        url: `/${this._component.props.path}?flat=1`
      });
      this._config = response.data;
    }))();
  }
  static get styles() {
    return css`${unsafeCSS(`
            :host {
                display: block;
            }
        `)}`;
  }
  firstUpdated() {
    let timeout;
    this._$dotpath.addEventListener("keyup", (e) => {
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
    return html`
            <div class="${(_a = this._component) === null || _a === void 0 ? void 0 : _a.className()}">
                <table class="${(_b = this._component) === null || _b === void 0 ? void 0 : _b.className("__table", "s-table")}">
                    <tr>
                        <th>
                            <input class="${(_c = this._component) === null || _c === void 0 ? void 0 : _c.className("__search", "s-input s-width:100")}" type="text" name="dotpath" placeholder="Filter by dotpath" />
                        </th>
                        <th>Value</th>
                    </tr>
                    ${this._config ? html`
                        ${Object.keys(this._config).filter((dotpath, i) => {
      if (!this._$dotpath.value) {
        const splits = dotpath.split(".");
        if (this._displayedConfig.indexOf(splits[0]) === -1) {
          this._displayedConfig.push(splits[0]);
          return true;
        }
        return false;
      }
      if (dotpath.startsWith(this._$dotpath.value))
        return true;
      return __minimatch(dotpath, this._$dotpath.value, {
        matchBase: true
      });
    }).map((dotpath) => {
      return html`
                                <tr>
                                    <td>
                                        ${dotpath.split(".").map((part, i) => {
        if (i < dotpath.split(".").length - 1) {
          return html`
                                                    <a @click="${() => {
            this._filter(dotpath.split(".").slice(0, i + 1).join("."));
          }}">${part}</a>${i < dotpath.split(".").length - 1 ? "." : ""}
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
__decorate([
  property()
], SConfigExplorer.prototype, "_config", void 0);
__decorate([
  query('input[name="dotpath"]')
], SConfigExplorer.prototype, "_$dotpath", void 0);
function webcomponent(tagName = "s-config-explorer", settings = {}) {
  customElements.define(tagName, SConfigExplorer, settings);
}
if (!window.env)
  window.env = {SUGAR: {}};
window.env.SUGAR = JSON.parse('{"ENVIRONMENT":"development","ENV":"development"}');
export default SConfigExplorer;
export {webcomponent};
