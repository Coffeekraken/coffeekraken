import { S as SInterface, a as SFeature, _ as __deepMerge, b as __makeFloat } from "./index-24861f6a.js";
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
const __css = `.s-floating {
    transform: none;
    transition: none;
}

    .s-floating:before {
        content: none;
    }

    .s-floating:after {
        content: none;
    }

    .s-floating .s-floating_arrow {
        position: absolute;
        background: hsla(calc(var(--s-theme-color-current-h, 0) + var(--s-theme-color-current-spin ,0)),calc((var(--s-theme-color-current-s, 0)) * 1%),calc((var(--s-theme-color-current-l, 0)) * 1%),var(--s-theme-color-current-a, 1));
        width: var(--arrow-size, 8px);
        height: var(--arrow-size, 8px);
        transform: rotate(45deg);
    }body:after {
                    display: none;;
                    content: '{"lod":{"enabled":false,"defaultLevel":3,"botLevel":1,"levels":{"0":{"name":"bare","speedIndex":0},"1":{"name":"lnf","speedIndex":30},"2":{"name":"theme","speedIndex":40},"3":{"name":"high","speedIndex":50},"4":{"name":"ultra","speedIndex":60}},"method":"class","defaultAction":">=","cssProperties":{"animation":2,"animation-delay":2,"animation-direction":2,"animation-duration":2,"animation-fill-mode":2,"animation-iteration-count":2,"animation-name":2,"animation-play-state":2,"animation-timing-function":2,"backdrop-filter":3,"background":1,"background-attachment":1,"background-blend-mode":3,"background-clip":1,"background-color":1,"background-image":1,"background-origin":1,"background-position":1,"background-repeat":1,"background-size":1,"border":1,"border-bottom":1,"border-bottom-color":1,"border-bottom-left-radius":1,"border-bottom-right-radius":1,"border-bottom-style":1,"border-bottom-width":1,"border-collapse":1,"border-color":1,"border-image":1,"border-image-outset":1,"border-image-repeat":1,"border-image-slice":1,"border-image-source":1,"border-image-width":1,"border-left":1,"border-left-color":1,"border-left-style":1,"border-left-width":1,"border-radius":1,"border-right":1,"border-right-color":1,"border-right-style":1,"border-right-width":1,"border-spacing":1,"border-style":1,"border-top":1,"border-top-color":1,"border-top-left-radius":1,"border-top-right-radius":1,"border-top-style":1,"border-top-width":1,"border-width":1,"box-shadow":1,"caret-color":1,"color":1,"column-count":1,"column-fill":1,"column-rule":1,"column-rule-color":1,"column-rule-style":1,"column-rule-width":1,"counter-increment":1,"counter-reset":1,"filter":1,"list-style-image":1,"outline":1,"outline-color":1,"outline-offset":1,"outline-style":1,"outline-width":1,"text-decoration":1,"text-decoration-color":1,"text-decoration-line":1,"text-indent":1,"text-justify":1,"text-overflow":1,"text-shadow":2,"text-transform":1,"transition":1,"transition-delay":1,"transition-duration":1,"transition-property":1,"transition-timing-function":1,"word-break":1,"word-spacing":1,"word-wrap":1}},"clean":{"variables":false},"compress":{"variables":false}}';
}`;
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
