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
var SActivateFeature_exports = {};
__export(SActivateFeature_exports, {
  default: () => SActivateFeature,
  define: () => define
});
module.exports = __toCommonJS(SActivateFeature_exports);
var import_s_feature = __toESM(require("@coffeekraken/s-feature"));
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"));
var import_SActivateFeatureInterface = __toESM(require("./interface/SActivateFeatureInterface"));
var import_unique = __toESM(require("@coffeekraken/sugar/shared/array/unique"));
var import_querySelectorLive = __toESM(require("@coffeekraken/sugar/js/dom/query/querySelectorLive"));
class SActivateFeature extends import_s_feature.default {
  constructor(name, node, settings) {
    super(name, node, (0, import_deepMerge.default)({
      componentUtils: {
        interface: import_SActivateFeatureInterface.default
      },
      feature: {}
    }, settings != null ? settings : {}));
    this._$groupElements = [];
    if (this.props.triggerer) {
      this._$triggerers = Array.from(document.querySelectorAll(this.props.triggerer));
    } else {
      this._$triggerers = [this.node];
    }
    this.componentUtils.exposeApi({
      activate: this.activate,
      unactivate: this.unactivate,
      isActive: this.isActive
    }, this);
  }
  mount() {
    if (this.props.href) {
      this._hrefSelector = this.props.href;
    }
    let targets;
    if (this._hrefSelector)
      targets = Array.from(document.querySelectorAll(this._hrefSelector));
    if (targets == null ? void 0 : targets.length)
      this._$targets = targets;
    else
      this._$targets = [this.node];
    if (this.props.group) {
      (0, import_querySelectorLive.default)(`[${this.name}][group="${this.props.group}"]`, ($elm) => {
        var _a, _b;
        if ((_a = this._$groupElements) == null ? void 0 : _a.includes($elm))
          return;
        (_b = this._$groupElements) == null ? void 0 : _b.push($elm);
      }, {
        onRemove($removedElm) {
          console.log("remobve", $removedElm);
        }
      });
    }
    this._$triggerers.forEach(($triggerer) => {
      const triggererTriggers = $triggerer.hasAttribute("trigger") ? $triggerer.getAttribute("trigger").split(",").map((l) => l.trim()) : [];
      const triggers = (0, import_unique.default)([...this.props.trigger, ...triggererTriggers]);
      triggers.forEach((trigger) => {
        if (trigger.match(/^event:/)) {
          this.node.addEventListener("actual", (e) => {
            this.activate();
          });
        } else {
          switch (trigger) {
            case "click":
              $triggerer.addEventListener("click", (e) => {
                if (e.target !== $triggerer) {
                  if (e.target.parentElement !== $triggerer)
                    return;
                  if (e.currentTarget !== $triggerer)
                    return;
                }
                e.preventDefault();
                e.stopPropagation();
                if (this.isActive() && this.props.toggle) {
                  this.unactivate();
                } else {
                  this.activate();
                }
              });
              break;
            case "mousenter":
            case "mouseover":
              $triggerer.addEventListener("mouseover", (e) => {
                this.activate();
              });
              break;
            case "mouseout":
            case "mouseleave":
              $triggerer.addEventListener("mouseleave", (e) => {
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
        }
      });
    });
    if (this.props.unactivateOn) {
      this.props.unactivateOn.forEach((event) => {
        document.body.addEventListener(event, (e) => {
          this.unactivate();
        });
      });
    }
    if (this.props.active) {
      this.activate(true);
    }
    this._restoreState();
  }
  get saveStateId() {
    return this.props.group ? `group-${this.props.group}` : this.props.id;
  }
  isActive() {
    return this.node.hasAttribute("active");
  }
  _restoreState() {
    var _a;
    if (this.props.saveState) {
      if (!this.props.id)
        throw new Error(`<red>[s-activate]</red> In order to use the "<yellow>saveState</yellow>" property, you MUST specify an "<cyan>id</cyan>" on your s-activate component`);
      if (this.props.group) {
        const groupState = JSON.parse((_a = localStorage.getItem(`s-activate-group-state-${this.props.group}`)) != null ? _a : "{}");
        if (groupState.activeId === this.props.id) {
          this.activate(true);
        } else if (!groupState.activeId && this.props.active) {
          this.activate(true);
        }
      } else if (localStorage.getItem(`s-activate-state-${this.saveStateId}`) === this.props.id) {
        this.activate(true);
      } else {
      }
    }
  }
  _saveState() {
    if (this.props.saveState) {
      if (!this.props.id)
        throw new Error(`<red>[s-activate]</red> In order to use the "<yellow>saveState</yellow>" property, you MUST specify an "<cyan>id</cyan>" on your s-activate component`);
      if (this.props.group) {
        localStorage.setItem(`s-activate-group-state-${this.props.group}`, JSON.stringify({
          activeId: this.props.id
        }));
      } else {
        localStorage.setItem(`s-activate-state-${this.saveStateId}`, this.props.id);
      }
    }
  }
  async activate(force = false) {
    clearTimeout(this._unactivateTimeout);
    if (!force && this.isActive())
      return;
    setTimeout(() => {
      this._saveState();
      if (this.props.history && this._hrefSelector) {
        document.location.hash = this._hrefSelector;
      }
      if (this._$groupElements) {
        this._$groupElements.forEach(($element) => {
          var _a;
          if ($element === this.node)
            return;
          try {
            (_a = $element.unactivate) == null ? void 0 : _a.call($element);
          } catch (e) {
            console.log("eee", e);
          }
        });
      }
      this.props.active = true;
      if (this._$targets) {
        this._$targets.forEach(($target) => {
          if (this.props.activeClass) {
            $target.classList.add(this.props.activeClass);
          }
          if (this.props.activeAttribute) {
            $target.setAttribute(this.props.activeAttribute, "true");
          }
        });
      }
    }, this.props.activateTimeout);
  }
  async unactivate() {
    if (!this.isActive())
      return;
    this._unactivateTimeout = setTimeout(() => {
      if (this.props.saveState) {
        if (!this.props.id)
          throw new Error(`<red>[s-activate]</red> In order to use the "<yellow>saveState</yellow>" property, you MUST specify an "<cyan>id</cyan>" on your s-activate component`);
        localStorage.removeItem(`s-activate-state-${this.props.id}`);
      }
      this.node.removeAttribute("active");
      if (this._$targets) {
        this._$targets.forEach(($target) => {
          if (this.props.activeClass) {
            $target.classList.remove(this.props.activeClass);
          }
          if (this.props.activeAttribute) {
            $target.removeAttribute(this.props.activeAttribute);
          }
        });
      }
    }, this.props.unactivateTimeout);
  }
}
function define(props = {}, name = "s-activate") {
  import_s_feature.default.defineFeature(name, SActivateFeature, props);
}
