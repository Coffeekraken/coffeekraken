"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _SWebComponent = _interopRequireDefault(require("@coffeekraken/sugar/js/core/SWebComponent"));
var _getTransitionProperties = _interopRequireDefault(require("@coffeekraken/sugar/js/dom/getTransitionProperties"));
var _scrollTop = _interopRequireDefault(require("@coffeekraken/sugar/js/dom/scrollTop"));
var _hotkey = _interopRequireDefault(require("@coffeekraken/sugar/js/keyboard/hotkey"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
class DrawerWebcomponent extends _SWebComponent.default {
  static get defaultProps() {
    return {
      name: null,
      closeOnLinksClick: false,
      escapeKey: true,
      handleHash: true,
      preventContentScroll: false
    };
  }
  static get requiredProps() {
    return ["name"];
  }
  static get physicalProps() {
    return ["name"];
  }
  static defaultCss(componentName, componentNameDash) {
    return `
			${componentNameDash} {
				display : block;
			}
      input[${componentNameDash}-toggle] {
        position: fixed;
        top:0; left: 0;
        opacity: 0;
        pointer-events: none;
      }
		`;
  }
  componentMount() {
    super.componentMount();
    this.contentElm = document.querySelector(`[${this.componentNameDash}-content]`);
    this.bkgElm = document.querySelector(`[${this.componentNameDash}-bkg][for="${this.props.name}"]`);
    if (!this.bkgElm) {
      this.bkgElm = document.createElement("div");
      this.mutate(() => {
        this.bkgElm.setAttribute(`${this.componentNameDash}-bkg`, true);
        this.bkgElm.setAttribute("for", this.props.name);
        this.parentElement.insertBefore(this.bkgElm, this.parentElement.firstChild);
      });
    }
    this.overlayElm = document.querySelector(`label[is="${this.componentNameDash}-overlay"][for="${this.props.name}"]`);
    if (!this.overlayElm) {
      this.overlayElm = document.createElement("label");
      this.overlayElm.setAttribute("for", this.props.name);
      this.overlayElm.setAttribute(`${this.componentNameDash}-overlay`, true);
      this.mutate(() => {
        this.parentElement.insertBefore(this.overlayElm, this.parentElement.firstChild);
      });
    }
    this.toggleElm = document.querySelector(`input[is="${this.componentNameDash}-toggle"][name="${this.props.name}"]`);
    if (!this.toggleElm) {
      this.toggleElm = document.createElement("input");
      this.toggleElm.setAttribute("name", this.props.name);
      this.toggleElm.setAttribute("id", this.props.name);
      this.toggleElm.setAttribute("type", "checkbox");
      this.toggleElm.setAttribute(`${this.componentNameDash}-toggle`, true);
      this.mutate(() => {
        this.parentElement.insertBefore(this.toggleElm, this.parentElement.firstChild);
      });
    }
    this._scrollTop = 0;
    this.toggleElm.addEventListener("change", (e) => {
      let name = e.target.name;
      this.mutate(() => {
        if (e.target.checked) {
          this.open();
          document.body.classList.add(`${this.componentNameDash}-${this.props.name}`);
          if (this.props.preventContentScroll) {
            this._scrollTop = (0, _scrollTop.default)();
            this.contentElm.style.transition = "none";
            this.mutate(() => {
              this.contentElm.style.transform = `translateY(-${this._scrollTop}px)`;
              this.ownerDocument.body.style.position = "fixed";
              this.ownerDocument.body.style.overflow = "hidden";
              setTimeout(() => {
                this.contentElm.style.transition = "";
              });
            });
          }
        } else {
          this.close();
          document.body.classList.remove(`${this.componentNameDash}-${this.props.name}`);
          if (this.props.preventContentScroll) {
            this.contentElm.style.transition = "none";
            this.mutate(() => {
              this.contentElm.style.transform = "";
              this.ownerDocument.body.style.position = "";
              this.ownerDocument.body.style.overflow = "";
              window.scrollTo(0, this._scrollTop);
              setTimeout(() => {
                this.contentElm.style.transition = "";
              });
            });
          }
        }
      });
    });
    if (this.props.handleHash) {
      window.addEventListener("hashchange", (e) => {
        if (document.location.hash.substr(1) === this.props.name && !this.isOpen()) {
          this.open();
        } else if (this.isOpen() && document.location.hash.substr(1) !== this.props.name) {
          this.close();
        }
      });
    }
    document.body.addEventListener("click", (e) => {
      if (e.target.hasAttribute(`${this.componentNameDash}-open`)) {
        if (e.target.getAttribute(`${this.componentNameDash}-open`) === this.props.name || e.target.getAttribute("href").substr(1) === this.props.name) {
          this.open();
        }
      }
    });
    this.addEventListener("click", (e) => {
      if (e.target.hasAttribute(`${this.componentNameDash}-close`)) {
        this.close();
        return;
      }
      if (this.props.closeOnLinksClick) {
        if (e.target.tagName.toLowerCase() === "a") {
          this.close();
        }
      }
    });
    if (this.props.escapeKey) {
      (0, _hotkey.default)("esc", (e) => {
        if (this.isOpen()) {
          this.close();
        }
      });
    }
    if (this.props.handleHash) {
      if (document.location.hash) {
        let hash = document.location.hash.substr(1);
        if (hash == this.props.name) {
          this.open();
        }
      }
    }
  }
  open() {
    if (this.props.handleHash) {
      document.location.hash = `#${this.props.name}`;
    }
    this.mutate(() => {
      this.toggleElm.checked = true;
      this.toggleElm.setAttribute("checked", true);
      document.body.classList.add(`${this.componentNameDash}-${this.props.name}`);
    });
    return this;
  }
  close() {
    this.mutate(() => {
      this.toggleElm.checked = false;
      this.toggleElm.removeAttribute("checked");
    });
    if (this.props.handleHash) {
      document.location.hash = "";
    }
    const transition = (0, _getTransitionProperties.default)(this);
    setTimeout(() => {
      this.mutate(() => {
        document.body.classList.remove(`${this.componentNameDash}-${this.props.name}`);
      });
    }, transition.totalDuration);
    return this;
  }
  isOpen() {
    return this.toggleElm.checked;
  }
}
exports.default = DrawerWebcomponent;
module.exports = exports.default;
