import {LitElement, css, unsafeCSS, html, property} from "lit-element";
import __SInterface from "@coffeekraken/s-interface";
import __SComponentUtils from "@coffeekraken/s-component-utils";
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
class SActivate extends LitElement {
  constructor() {
    super();
    this._component = void 0;
    this._hrefSelector = void 0;
    this._$targets = void 0;
    this._$groupElements = void 0;
    this._state = "pending";
    this._component = new __SComponentUtils(this.tagName.toLowerCase(), this, this.attributes, {
      interface: SActivateComponentInterface,
      defaultProps: {}
    });
  }
  static get styles() {
    return css`${unsafeCSS(`
            :host {
                display: inline-block;
                cursor: pointer;
            }
        `)}`;
  }
  firstUpdated() {
    if (this._component.props.saveState) {
      if (!this.id)
        throw new Error(`<red>[s-activate]</red> In order to use the "<yellow>saveState</yellow>" property, you MUST specify an "<cyan>id</cyan>" on your s-activate component`);
      this._component.props.active = localStorage.getItem(`s-activate-state-${this.id}`) !== null;
    }
    if (this._component.props.href) {
      this._hrefSelector = this._component.props.href;
    }
    const targets = Array.from(document.querySelectorAll(this._hrefSelector));
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
      localStorage.setItem(`s-activate-state-${this.id}`, true);
    }
    if (this._component.props.history) {
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
    this.setAttribute("active", true);
    if (this._$targets) {
      this._$targets.forEach(($target) => {
        $target.classList.add("active");
        $target.setAttribute("active", true);
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
        $target.classList.remove("active");
        $target.removeAttribute("active");
      });
    }
  }
  render() {
    return html`<slot></slot>`;
  }
}
__decorate([
  property()
], SActivate.prototype, "_state", void 0);
function webcomponent(tagName = "s-activate", settings = {}) {
  customElements.define(tagName, SActivate, settings);
}
if (!window.env)
  window.env = {SUGAR: {}};
window.env.SUGAR = JSON.parse('{"ENVIRONMENT":"development"}');
export default SActivate;
export {webcomponent};
