import { S as SInterface, e as SFeature, c as __deepMerge, E as __makeFloat } from "./index.esm.js";
class SFloatingFeatureInterface extends SInterface {
  static get _definition() {
    return {
      ref: {
        description: "Specify the reference HTMLElement from which to position the floating one. If not specified, will take the previous element in the DOM",
        type: "String"
      },
      position: {
        description: "Specify the placement of your floating element. By default it will try to be placed as good as possible.",
        type: "String",
        values: [
          "top",
          "right",
          "bottom",
          "left",
          "top-start",
          "top-end",
          "right-start",
          "right-end",
          "bottom-start",
          "bottom-end",
          "left-start",
          "left-end",
          "auto"
        ],
        default: "auto"
      },
      shift: {
        description: "Specify a space between the floating element and the viewport side to respect",
        type: "Number",
        default: 10
      },
      offset: {
        description: "Specify a space between the floating element and the reference one to respect",
        type: "Number"
      },
      arrow: {
        description: "Specify if you want an arrow or not",
        type: "Boolean",
        default: true
      },
      arrowSize: {
        description: "Specify the size of the arrow in px",
        type: "Number",
        default: 15
      },
      arrowPadding: {
        description: "Specify the padding of the arrow in px",
        type: "Number",
        default: 10
      }
    };
  }
}
const __css = ".s-floating {\n    transform: none;\n    transition: none;\n}\n\n    .s-floating:before {\n        content: none;\n    }\n\n    .s-floating:after {\n        content: none;\n    }\n\n    .s-floating .s-floating_arrow {\n        position: absolute;\n        background: hsla(calc(var(--s-color-current-h, 0) + var(--s-color-current-spin ,0)),calc((var(--s-color-current-s, 0)) * 1%),calc((var(--s-color-current-l, 0)) * 1%),var(--s-color-current-a, 1));\n        width: var(--arrow-size, 8px);\n        height: var(--arrow-size, 8px);\n        transform: rotate(45deg);\n    }\n";
class SFloatingFeature extends SFeature {
  // @ts-ignore
  constructor(name, node, settings) {
    super(name, node, __deepMerge({
      name: "s-floating",
      interface: SFloatingFeatureInterface,
      style: __css
    }, settings !== null && settings !== void 0 ? settings : {}));
    if (!this.props.ref) {
      this._$ref = this.node.parentElement;
    } else {
      this._$ref = document.querySelector(this.props.ref);
    }
  }
  mount() {
    if (this.props.offset === void 0 && this.props.arrow) {
      this.props.offset = this.props.arrowSize;
    }
    __makeFloat(this.node, this._$ref, this.props);
  }
}
function define(props = {}, name = "s-floating") {
  SFloatingFeature.define(name, SFloatingFeature, Object.assign({}, props));
}
export {
  define as default
};
