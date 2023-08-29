import { S as SInterface, g as SFrontspec, h as SLitComponent, i as css, u as unsafeCSS, c as __deepMerge, j as __camelCase, k as __parse, l as html, m as __upperFirst } from "./index.esm.js";
class SSpacesSelectorComponentInterface extends SInterface {
  static get _definition() {
    return {
      spaces: {
        type: "Object",
        description: 'Specify the spaces you want as options. This object MUST contain two properties which are "margin" and "padding", which contains each every options you want as an object with "name" and "value" properties',
        required: true,
        get default() {
          var _a, _b;
          return {
            margin: (_a = SFrontspec.get("margin")) !== null && _a !== void 0 ? _a : {},
            padding: (_b = SFrontspec.get("padding")) !== null && _b !== void 0 ? _b : {}
          };
        }
      },
      values: {
        type: "Object",
        description: 'Specify the initial values for the selectors. MUST be an object with properties "paddingTop", "paddingLeft", "marginBottom", etc...',
        default: {}
      },
      valueProp: {
        type: "String",
        description: "Specify the space object propery to take as value",
        default: "value"
      }
    };
  }
}
const __css = ".s-spaces-selector {\n    display: block;\n    aspect-ratio: 16/10;\n    position: relative;\n    width: 100%;\n}\n\n.s-spaces-selector_inner {\n    position: absolute;\n\n    top: var(--s-spaces-selector-offset-y, 0);\n    right: var(--s-spaces-selector-offset-x, 0);\n    bottom: var(--s-spaces-selector-offset-y, 0);\n    left: var(--s-spaces-selector-offset-x, 0);\n}\n\n.s-spaces-selector_clear {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n}\n\n.s-spaces-selector_space {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n}\n\n.s-spaces-selector_select {\n    position: absolute !important;\n    text-align: center;\n}\n\n.s-spaces-selector_select-margin-top {\n            left: 50%;\n            bottom: calc(100%);\n            transform: translateX(-50%);\n        }\n\n.s-spaces-selector_select-margin-right {\n            top: 50%;\n            left: calc(100%);\n            transform: translateY(-50%);\n        }\n\n.s-spaces-selector_select-margin-bottom {\n            left: 50%;\n            top: calc(100%);\n            transform: translateX(-50%);\n        }\n\n.s-spaces-selector_select-margin-left {\n            top: 50%;\n            right: calc(100%);\n            transform: translateY(-50%);\n        }\n\n.s-spaces-selector_select-padding-top {\n            left: 50%;\n            top: 0;\n            transform: translateX(-50%);\n        }\n\n.s-spaces-selector_select-padding-right {\n            top: 50%;\n            right: 0;\n            transform: translateY(-50%);\n        }\n\n.s-spaces-selector_select-padding-bottom {\n            left: 50%;\n            bottom: 0;\n            transform: translateX(-50%);\n        }\n\n.s-spaces-selector_select-padding-left {\n            top: 50%;\n            left: 0;\n            transform: translateY(-50%);\n        }\n";
class SSpacesSelectorComponent extends SLitComponent {
  static get properties() {
    return SLitComponent.propertiesFromInterface({}, SSpacesSelectorComponentInterface);
  }
  static get styles() {
    return css`
            ${unsafeCSS(__css)}
        `;
  }
  static get state() {
    return {
      values: {}
    };
  }
  constructor() {
    super(__deepMerge({
      name: "s-spaces-selector",
      interface: SSpacesSelectorComponentInterface
    }));
    this._spacesNames = ["margin", "padding"];
  }
  firstUpdated() {
    const $marginLeft = this.querySelector('select[name="margin-left"]'), marginLeftBound = $marginLeft.getBoundingClientRect(), $marginTop = this.querySelector('select[name="margin-top"]'), marginTopBound = $marginTop.getBoundingClientRect();
    this.style.setProperty("--s-spaces-selector-offset-y", `${marginTopBound.height}px`);
    this.style.setProperty("--s-spaces-selector-offset-x", `${marginLeftBound.width}px`);
  }
  clear() {
    this.state.values = {};
    this.utils.dispatchEvent("change", {
      bubbles: true,
      detail: Object.assign({}, this.props.values)
    });
    Array.from(this.querySelectorAll("select")).forEach(($select) => {
      $select.selectedIndex = 0;
    });
    this.requestUpdate();
  }
  _updateSelect(e) {
    const propertyName = __camelCase(e.target.name);
    this.state.values[propertyName] = __parse(e.target.value);
    this.utils.dispatchEvent("change", {
      bubbles: true,
      detail: Object.assign({}, this.state.values)
    });
  }
  render() {
    return html`
            <div class="${this.utils.cls("_inner")}">
                ${this._spacesNames.map((spaceName) => html`
                        <div
                            class="${this.utils.cls("_space")} ${this.utils.cls(`_space-${spaceName}`)}"
                        >
                            ${["top", "right", "bottom", "left"].map((side) => {
      var _a;
      const options = (_a = this.props.spaces[spaceName]) !== null && _a !== void 0 ? _a : [], value = this.state.values[`${spaceName}${__upperFirst(side)}`];
      let selected = null;
      options.forEach((option) => {
        if (value && option[this.props.valueProp] == value) {
          selected = option;
        }
      });
      return html`
                                    <select
                                        class="${this.utils.cls("_select")} ${this.utils.cls(`_select-${spaceName}-${side}`)}"
                                        name="${spaceName}-${side}"
                                        @change=${(e) => {
        this._updateSelect(e);
      }}
                                    >
                                        ${options.map((option) => {
        return html`
                                                <option
                                                    .value=${option[this.props.valueProp]}
                                                    ?selected=${selected === option || selected === null && !option.value}
                                                >
                                                    ${option.name}
                                                </option>
                                            `;
      })}
                                    </select>
                                `;
    })}
                        </div>
                    `)}

                <button
                    class="${this.utils.cls("_clear")}"
                    @pointerup=${() => {
      this.clear();
    }}
                >
                    Clear
                </button>
            </div>
        `;
  }
}
function define(props = {}, tagName = "s-spaces-selector", settings) {
  SSpacesSelectorComponent.define(tagName, SSpacesSelectorComponent, props, settings);
}
export {
  define as default
};
