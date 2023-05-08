import { S as SInterface, a as SFrontspec, b as SLitComponent, c as css, u as unsafeCSS, _ as __deepMerge, d as __camelCase, e as __parse, h as html, f as __upperFirst } from "./index-4cd7da31.js";
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
const __css = `.s-spaces-selector {
    display: block;
    aspect-ratio: 16/10;
    position: relative;
    width: 100%;
}

.s-spaces-selector_inner {
    position: absolute;

    top: var(--s-spaces-selector-offset-y, 0);
    right: var(--s-spaces-selector-offset-x, 0);
    bottom: var(--s-spaces-selector-offset-y, 0);
    left: var(--s-spaces-selector-offset-x, 0);
}

.s-spaces-selector_clear {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.s-spaces-selector_space {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.s-spaces-selector_select {
    position: absolute !important;
    text-align: center;
}

.s-spaces-selector_select-margin-top {
            left: 50%;
            bottom: calc(100%);
            transform: translateX(-50%);
        }

.s-spaces-selector_select-margin-right {
            top: 50%;
            left: calc(100%);
            transform: translateY(-50%);
        }

.s-spaces-selector_select-margin-bottom {
            left: 50%;
            top: calc(100%);
            transform: translateX(-50%);
        }

.s-spaces-selector_select-margin-left {
            top: 50%;
            right: calc(100%);
            transform: translateY(-50%);
        }

.s-spaces-selector_select-padding-top {
            left: 50%;
            top: 0;
            transform: translateX(-50%);
        }

.s-spaces-selector_select-padding-right {
            top: 50%;
            right: 0;
            transform: translateY(-50%);
        }

.s-spaces-selector_select-padding-bottom {
            left: 50%;
            bottom: 0;
            transform: translateX(-50%);
        }

.s-spaces-selector_select-padding-left {
            top: 50%;
            left: 0;
            transform: translateY(-50%);
        }body:after {
                    display: none;;
                    content: '{"lod":{"enabled":true,"defaultLevel":3,"botLevel":1,"levels":{"0":{"name":"bare","speedIndex":0},"1":{"name":"lnf","speedIndex":30},"2":{"name":"theme","speedIndex":40},"3":{"name":"high","speedIndex":50},"4":{"name":"ultra","speedIndex":60}},"method":"class","defaultAction":">=","cssProperties":{"animation":2,"animation-delay":2,"animation-direction":2,"animation-duration":2,"animation-fill-mode":2,"animation-iteration-count":2,"animation-name":2,"animation-play-state":2,"animation-timing-function":2,"backdrop-filter":3,"background":1,"background-attachment":1,"background-blend-mode":3,"background-clip":1,"background-color":1,"background-image":1,"background-origin":1,"background-position":1,"background-repeat":1,"background-size":1,"border":1,"border-bottom":1,"border-bottom-color":1,"border-bottom-left-radius":1,"border-bottom-right-radius":1,"border-bottom-style":1,"border-bottom-width":1,"border-collapse":1,"border-color":1,"border-image":1,"border-image-outset":1,"border-image-repeat":1,"border-image-slice":1,"border-image-source":1,"border-image-width":1,"border-left":1,"border-left-color":1,"border-left-style":1,"border-left-width":1,"border-radius":1,"border-right":1,"border-right-color":1,"border-right-style":1,"border-right-width":1,"border-spacing":1,"border-style":1,"border-top":1,"border-top-color":1,"border-top-left-radius":1,"border-top-right-radius":1,"border-top-style":1,"border-top-width":1,"border-width":1,"box-shadow":1,"caret-color":1,"color":1,"column-count":1,"column-fill":1,"column-rule":1,"column-rule-color":1,"column-rule-style":1,"column-rule-width":1,"counter-increment":1,"counter-reset":1,"filter":1,"list-style-image":1,"outline":1,"outline-color":1,"outline-offset":1,"outline-style":1,"outline-width":1,"text-decoration":1,"text-decoration-color":1,"text-decoration-line":1,"text-indent":1,"text-justify":1,"text-overflow":1,"text-shadow":2,"text-transform":1,"transition":1,"transition-delay":1,"transition-duration":1,"transition-property":1,"transition-timing-function":1,"word-break":1,"word-spacing":1,"word-wrap":1}},"clean":{"variables":false},"compress":{"variables":false}}';
}
`;
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
    return {};
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
    this.props.values = {};
    this.utils.dispatchEvent("change", {
      bubbles: true,
      detail: Object.assign({}, this.props.values)
    });
  }
  _updateSelect(e) {
    const propertyName = __camelCase(e.target.name);
    this.props.values[propertyName] = __parse(e.target.value);
    this.utils.dispatchEvent("change", {
      bubbles: true,
      detail: Object.assign({}, this.props.values)
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
      const options = (_a = this.props.spaces[spaceName]) !== null && _a !== void 0 ? _a : [], value = this.props.values[`${spaceName}${__upperFirst(side)}`];
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
                                        .value=${value}
                                        @change=${(e) => {
        this._updateSelect(e);
      }}
                                    >
                                        ${options.map((option) => {
        return html`
                                                <option
                                                    value="${option[this.props.valueProp]}"
                                                    ?selected=${selected === option || selected === null && option.default}
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
