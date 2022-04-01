import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
var VersionSelector_exports = {};
__export(VersionSelector_exports, {
  default: () => VersionSelector,
  define: () => define
});
module.exports = __toCommonJS(VersionSelector_exports);
var import_lit = require("lit");
var import_decorators = require("lit/decorators.js");
var import_s_lit_component = __toESM(require("@coffeekraken/s-lit-component"), 1);
var import_state = require("../state/state");
class VersionSelector extends import_s_lit_component.default {
  constructor() {
    super({
      litComponent: {
        shadowDom: false
      }
    });
    this._versions = [];
    (async () => {
      const docmapJson = await (0, import_state.loadDocmap)();
      this._versions = docmapJson.snapshots || [];
    })();
  }
  _change(e) {
    setTimeout(() => {
      let newLocation = document.location.href;
      if (document.location.href.match(/^https?:\/\/v[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\./)) {
        newLocation = document.location.href.replace(/^(https?:\/\/v)[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.(.*)/, `$1${e.target.value}.$2`);
      } else {
        newLocation = document.location.href.replace(/^(https?:\/\/)(.*)/, `$1v${e.target.value}.$2`);
      }
      document.location = newLocation;
    });
  }
  render() {
    return import_lit.html`
            <label class="s-select s-color:accent">
                <select @change="${this._change}">
                    ${this._versions.map((snap) => import_lit.html`
                            <option
                                ?selected="${this._currentVersion === snap}"
                                value="${snap}"
                            >
                                ${snap}
                            </option>
                        `)}
                </select>
            </label>
        `;
  }
}
__decorateClass([
  (0, import_decorators.property)()
], VersionSelector.prototype, "_currentVersion", 2);
__decorateClass([
  (0, import_decorators.property)()
], VersionSelector.prototype, "_versions", 2);
function define(props = {}, tagName = "version-selector") {
  import_s_lit_component.default.setDefaultProps(tagName, props);
  customElements.define(tagName, VersionSelector);
}
