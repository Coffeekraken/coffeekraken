import "../../../../chunk-PG3ZPS4G.mjs";
import __SFeature from "@coffeekraken/s-feature";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __SActivateFeatureInterface from "./interface/SActivateFeatureInterface";
import __unique from "@coffeekraken/sugar/shared/array/unique";
import __querySelectorLive from "@coffeekraken/sugar/js/dom/query/querySelectorLive";
class SActivateFeature extends __SFeature {
  constructor(name, node, settings) {
    super(name, node, __deepMerge({
      componentUtils: {
        interface: __SActivateFeatureInterface
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
      __querySelectorLive(`[${this.name}][group="${this.props.group}"]`, ($elm) => {
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
      const triggers = __unique([...this.props.trigger, ...triggererTriggers]);
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
  __SFeature.defineFeature(name, SActivateFeature, props);
}
export {
  SActivateFeature as default,
  define
};
