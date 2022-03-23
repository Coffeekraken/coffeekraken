import {
  __decorateClass
} from "../../../../../chunk-PG3ZPS4G.mjs";
import { html } from "lit";
import { property } from "lit/decorators.js";
import __SLitComponent from "@coffeekraken/s-lit-component";
import { loadDocmap } from "../state/state";
class VersionSelector extends __SLitComponent {
  constructor() {
    super({
      litComponent: {
        shadowDom: false
      }
    });
    this._versions = [];
    (async () => {
      const docmapJson = await loadDocmap();
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
    return html`
            <label class="s-select s-color:accent">
                <select @change="${this._change}">
                    ${this._versions.map((snap) => html`
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
  property()
], VersionSelector.prototype, "_currentVersion", 2);
__decorateClass([
  property()
], VersionSelector.prototype, "_versions", 2);
function define(props = {}, tagName = "version-selector") {
  __SLitComponent.setDefaultProps(tagName, props);
  customElements.define(tagName, VersionSelector);
}
export {
  VersionSelector as default,
  define
};
