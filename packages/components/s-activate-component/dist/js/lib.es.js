import {css, unsafeCSS, html} from "lit";
import __SInterface from "@coffeekraken/s-interface";
import __SComponentUtils, {SLitElement} from "@coffeekraken/s-component-utils";
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
const standardProperty = (options, element) => {
  if (element.kind === "method" && element.descriptor && !("value" in element.descriptor)) {
    return {
      ...element,
      finisher(clazz) {
        clazz.createProperty(element.key, options);
      }
    };
  } else {
    return {
      kind: "field",
      key: Symbol(),
      placement: "own",
      descriptor: {},
      originalKey: element.key,
      initializer() {
        if (typeof element.initializer === "function") {
          this[element.key] = element.initializer.call(this);
        }
      },
      finisher(clazz) {
        clazz.createProperty(element.key, options);
      }
    };
  }
};
const legacyProperty = (options, proto, name) => {
  proto.constructor.createProperty(name, options);
};
function property(options) {
  return (protoOrDescriptor, name) => name !== void 0 ? legacyProperty(options, protoOrDescriptor, name) : standardProperty(options, protoOrDescriptor);
}
class SActivateComponentInterface extends __SInterface {
}
SActivateComponentInterface.definition = {
  href: {
    type: "String",
    default: ""
  },
  group: {
    type: "String"
  },
  toggle: {
    type: {
      type: "Boolean",
      nullishAsTrue: true
    },
    default: false
  },
  history: {
    type: {
      type: "Boolean",
      nullishAsTrue: true
    },
    default: false
  },
  active: {
    type: {
      type: "Boolean",
      nullishAsTrue: true
    },
    default: false
  },
  activeClass: {
    type: "String",
    description: "Specify the class to apply on target(s) when activate",
    default: "active"
  },
  activeAttribute: {
    type: "String",
    description: "Specify the attribute to apply on target(s) when activate",
    default: "active"
  },
  saveState: {
    type: "Boolean",
    default: false
  },
  activateTimeout: {
    type: "Number",
    default: 0
  },
  unactivateTimeout: {
    type: "Number",
    default: 0
  },
  trigger: {
    type: {
      type: "Array<String>",
      splitChars: [","]
    },
    default: ["click"]
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
class SActivate extends SLitElement {
  constructor() {
    super();
    this._state = "pending";
    this._component = new __SComponentUtils(this.tagName.toLowerCase(), this, this.attributes, {
      componentUtils: {
        interface: SActivateComponentInterface,
        defaultProps: {}
      }
    });
    this._$nodes = Array.from(this.children);
  }
  static get properties() {
    return __SComponentUtils.properties({}, SActivateComponentInterface);
  }
  static get styles() {
    return css`
            ${unsafeCSS(`
            s-activate {
                display: inline-block;
                cursor: pointer;
            }
        `)}
        `;
  }
  createRenderRoot() {
    return this;
  }
  firstUpdated() {
    var _a;
    (_a = this._$nodes) === null || _a === void 0 ? void 0 : _a.forEach(($node) => {
      this.appendChild($node);
    });
    if (this._component.props.saveState) {
      if (!this.id)
        throw new Error(`<red>[s-activate]</red> In order to use the "<yellow>saveState</yellow>" property, you MUST specify an "<cyan>id</cyan>" on your s-activate component`);
      this.active = localStorage.getItem(`s-activate-state-${this.id}`) !== null;
    }
    if (this._component.props.href) {
      this._hrefSelector = this._component.props.href;
    }
    let targets;
    if (this._hrefSelector)
      targets = Array.from(document.querySelectorAll(this._hrefSelector));
    if (targets === null || targets === void 0 ? void 0 : targets.length)
      this._$targets = targets;
    if (this._component.props.group) {
      this._$groupElements = Array.from(document.querySelectorAll(`s-activate[group="${this._component.props.group}"]`));
    }
    this._component.props.trigger.forEach((trigger) => {
      switch (trigger) {
        case "click":
          this.addEventListener("click", (e) => {
            if (this.isActive() && this._component.props.toggle) {
              this.unactivate();
            } else {
              this.activate();
            }
          });
          break;
        case "mouseover":
          this.addEventListener("mouseover", (e) => {
            this.activate();
          });
          break;
        case "mouseout":
        case "mouseleave":
          this.addEventListener("mouseleave", (e) => {
            this.unactivate();
          });
          break;
        case "anchor":
          if (document.location.hash === this._hrefSelector) {
            this.activate();
          }
          window.addEventListener("hashchange", (e) => {
            if (document.location.hash === this._hrefSelector) {
              this.activate();
            }
          });
          break;
      }
    });
    if (this._component.props.active) {
      this.activate(true);
    }
  }
  isActive() {
    return this.hasAttribute("active");
  }
  activate(force = false) {
    return __awaiter(this, void 0, void 0, function* () {
      clearTimeout(this._unactivateTimeout);
      if (!force && this.isActive())
        return;
      setTimeout(() => {
        if (this._component.props.saveState) {
          if (!this.id)
            throw new Error(`<red>[s-activate]</red> In order to use the "<yellow>saveState</yellow>" property, you MUST specify an "<cyan>id</cyan>" on your s-activate component`);
          localStorage.setItem(`s-activate-state-${this.id}`, "true");
        }
        if (this._component.props.history && this._hrefSelector) {
          document.location.hash = this._hrefSelector;
        }
        if (this._$groupElements) {
          this._$groupElements.forEach(($element) => {
            if ($element === this)
              return;
            try {
              $element.unactivate();
            } catch (e) {
            }
          });
        }
        this.active = true;
        if (this._$targets) {
          this._$targets.forEach(($target) => {
            if (this._component.props.activeClass) {
              $target.classList.add(this._component.props.activeClass);
            }
            if (this._component.props.activeAttribute) {
              $target.setAttribute(this._component.props.activeAttribute, "true");
            }
          });
        }
      }, this._component.props.activateTimeout);
    });
  }
  unactivate() {
    return __awaiter(this, void 0, void 0, function* () {
      if (!this.isActive())
        return;
      this._unactivateTimeout = setTimeout(() => {
        if (this._component.props.saveState) {
          if (!this.id)
            throw new Error(`<red>[s-activate]</red> In order to use the "<yellow>saveState</yellow>" property, you MUST specify an "<cyan>id</cyan>" on your s-activate component`);
          localStorage.removeItem(`s-activate-state-${this.id}`);
        }
        this.removeAttribute("active");
        if (this._$targets) {
          this._$targets.forEach(($target) => {
            if (this._component.props.activeClass) {
              $target.classList.remove(this._component.props.activeClass);
            }
            if (this._component.props.activeAttribute) {
              $target.removeAttribute(this._component.props.activeAttribute);
            }
          });
        }
      }, this._component.props.unactivateTimeout);
    });
  }
  render() {
    return html``;
  }
}
__decorate([
  property()
], SActivate.prototype, "_state", void 0);
function webcomponent(props = {}, tagName = "s-activate", settings = {}) {
  __SComponentUtils.setDefaultProps(tagName, props);
  customElements.define(tagName, SActivate, settings);
}
export default SActivate;
export {webcomponent};
