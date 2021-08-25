import {css, unsafeCSS, html, property} from "lit-element";
import __SInterface from "@coffeekraken/s-interface";
import __SComponentUtils, {SLitElement} from "@coffeekraken/s-component-utils";
class SActivateComponentInterface extends __SInterface {
}
SActivateComponentInterface.definition = {
  href: {
    type: "String"
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
    console.log(this.textContent);
    this._$nodes = Array.from(this.children);
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
    this._$nodes.forEach(($node) => {
      this.appendChild($node);
    });
    if (this._component.props.saveState) {
      if (!this.id)
        throw new Error(`<red>[s-activate]</red> In order to use the "<yellow>saveState</yellow>" property, you MUST specify an "<cyan>id</cyan>" on your s-activate component`);
      this._component.props.active = localStorage.getItem(`s-activate-state-${this.id}`) !== null;
    }
    if (this._component.props.href) {
      this._hrefSelector = this._component.props.href;
    }
    let targets;
    if (this._hrefSelector)
      targets = Array.from(document.querySelectorAll(this._hrefSelector));
    if (targets.length)
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
        case "hover":
          this.addEventListener("mouseover", (e) => {
            this.activate();
          });
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
    if (!force && this.isActive())
      return;
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
    this.setAttribute("active", "true");
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
  }
  unactivate() {
    if (!this.isActive())
      return;
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
