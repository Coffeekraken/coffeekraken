import { a as SInterface, b as SFeature, c as __deepMerge, d as __querySelectorLive, e as __unique, f as __getCookie, g as get, h as __scrollSpy, i as __wait } from "./index.esm.js";
function expandTemplate($template) {
  var _a;
  const $container = document.createElement("div");
  const html = [];
  Array.from($template.content.childNodes).forEach(($child) => {
    var _a2;
    if ($child.tagName === "SCRIPT") {
      document.head.appendChild($child);
    } else {
      html.push((_a2 = $child.outerHTML) !== null && _a2 !== void 0 ? _a2 : $child.textContent);
    }
  });
  $container.innerHTML = html.join("\n");
  (_a = $template.parentElement) === null || _a === void 0 ? void 0 : _a.insertBefore($container, $template);
  $template.remove();
  return $container;
}
class SActivateFeatureInterface extends SInterface {
  static get _definition() {
    return {
      href: {
        description: "Specify the target element(s) to activate/unactivate",
        type: "String",
        default: ""
      },
      group: {
        description: "Specify a group id for your element. This is used for things like tabs, etc...",
        type: "String"
      },
      toggle: {
        description: "Specify if you want to be able to click on the same element to activate/unactivate it.",
        type: {
          type: "Boolean",
          nullishAsTrue: true
        },
        default: false
      },
      history: {
        description: "Specify if you want to store and react to history hash changes",
        type: {
          type: "Boolean",
          nullishAsTrue: true
        },
        default: false
      },
      active: {
        description: "Specify the initial state of your element",
        type: {
          type: "Boolean",
          nullishAsTrue: true
        },
        default: false,
        physical: true
      },
      activeClass: {
        description: 'Specify the class applied on target(s) when active. Default is "active"',
        type: "String",
        default: "active"
      },
      activeAttribute: {
        description: "Specify the attribute name applied on target(s) when active.",
        type: "String",
        default: "active"
      },
      saveState: {
        description: "Specify if you want to save state in localStorage to restore it on page reload, etc...",
        type: "Boolean",
        default: false
      },
      activateTimeout: {
        description: "Specify a timeout before actiavting the target(s)",
        type: "Number",
        default: 0
      },
      unactivateTimeout: {
        description: "Specify a timeout before unactivate the target(s)",
        type: "Number",
        default: 0
      },
      triggerer: {
        description: "Specify an element selector that will be used as the triggerer instead of this current element",
        type: "String"
      },
      trigger: {
        description: 'Specify what trigger an activate/unactivate action. Can be "click", "mouseover", "mouseout" ,"anchor", "event:%eventName" "and/or" "cookie:%cookieName.%optionalDotPath". When using the "event:", the listener will be the node itself by default but you can specify the "document" like so "event:%eventName:document". When using "cookie", you can negate the assertion like so "!cookie:myCookie.myValue"',
        type: {
          type: "Array<String>",
          splitChars: [",", " "]
        },
        values: [
          "click",
          "mouseover",
          "mouseenter",
          "mouseout",
          "mouseleave",
          "anchor"
        ],
        default: ["click"]
      },
      unactivateOn: {
        description: "Specify some event(s) catched on the body tag that will unactivate the target(s)",
        type: {
          type: "Array<String>",
          splitChars: [",", " "]
        }
      }
    };
  }
}
var __awaiter = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
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
class SActivateFeature extends SFeature {
  constructor(name, node, settings) {
    super(name, node, __deepMerge({
      interface: SActivateFeatureInterface
    }, settings !== null && settings !== void 0 ? settings : {}));
    this._$groupElements = [];
    this.state = {
      active: void 0
    };
    this.groupState = {
      activeId: void 0
    };
    this.state = this.utils.handleState(this.state, {
      save: this.props.saveState
    });
    if (this.props.group) {
      this.utils.handleState(this.groupState, {
        save: this.props.saveState,
        id: `s-activate-feature-group-${this.props.group}`
      });
    }
    if (this.props.triggerer) {
      this._$triggerers = Array.from(document.querySelectorAll(this.props.triggerer));
    } else {
      this._$triggerers = [this.node];
    }
    this.utils.exposeApi({
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
    this._$targets = [this.node, ...targets !== null && targets !== void 0 ? targets : []];
    if (this.props.group) {
      __querySelectorLive(`[${this.name}][group="${this.props.group}"]`, ($elm) => {
        var _a, _b;
        if ((_a = this._$groupElements) === null || _a === void 0 ? void 0 : _a.includes($elm))
          return;
        (_b = this._$groupElements) === null || _b === void 0 ? void 0 : _b.push($elm);
      }, {});
    }
    this._$triggerers.forEach(($triggerer) => {
      const triggererTriggers = $triggerer.hasAttribute("trigger") ? $triggerer.getAttribute("trigger").split(",").map((l) => l.trim()) : [];
      const triggers = __unique([
        ...this.props.trigger,
        ...triggererTriggers
      ]);
      triggers.forEach((trigger) => {
        var _a;
        if (trigger.match(/^\!?cookie:/)) {
          const isNegative = trigger.startsWith("!"), cookiePath = trigger.replace(/^\!?cookie:/, ""), cookieName = cookiePath.split(".")[0], cookieDotPath = cookiePath.split(".").slice(1).join(".");
          let cookieValue = __getCookie(cookieName);
          if (cookieValue && cookieDotPath) {
            cookieValue = get(cookieValue, cookieDotPath);
          }
          if (isNegative && !cookieValue) {
            this.activate({
              preventSave: true
            });
          } else if (!isNegative && cookieValue) {
            this.activate({
              preventSave: true
            });
          }
        } else if (trigger.match(/^event:/)) {
          const eventStr = trigger.replace(/^event:/, ""), eventName = eventStr.split(":")[0], listenerElm = eventStr.split(":").pop() === "document" ? document : this.node;
          listenerElm.addEventListener(eventName, (e) => {
            this.activate({
              preventSave: true
            });
          });
        } else if (trigger.match(/^scrollspy/)) {
          let parts = trigger.split(":"), selector = this.props.href, group = (_a = this.props.group) !== null && _a !== void 0 ? _a : "scrollspy";
          if (parts.length === 2) {
            selector = parts[1];
          }
          __querySelectorLive(selector, ($toSpyElm, api) => {
            var _a2;
            if (!((_a2 = this.node) === null || _a2 === void 0 ? void 0 : _a2.parentElement)) {
              api.cancel();
            }
            __scrollSpy($toSpyElm, {
              group
            }).on("activate", () => {
              if (!this.isActive()) {
                this.activate();
              }
            }).on("unactivate", () => {
              if (this.isActive()) {
                this.unactivate();
              }
            });
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
            case "history":
              window.addEventListener("popstate", (e) => {
                if (document.location.hash === this._hrefSelector) {
                  this.activate();
                } else {
                  this.unactivate();
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
        }
      });
    });
    if (this.props.unactivateOn) {
      this.props.unactivateOn.forEach((what) => {
        if (what.match(/^event:/)) {
          const eventStr = what.replace(/^event:/, ""), eventName = eventStr.split(":")[0], listenerElm = eventStr.split(":").pop() === "document" ? document : this.node;
          listenerElm.addEventListener(eventName, (e) => {
            this.unactivate();
          });
        } else {
          switch (what) {
            case "click":
              document.addEventListener("click", (e) => {
                this.unactivate();
              });
              break;
          }
        }
      });
    }
    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
      if (this.props.saveState) {
        this._restoreState();
      } else if (this.props.active) {
        this.activate();
      } else if (this.props.group && this._$groupElements[0] === this.node) {
        yield __wait();
        let hasActiveElementInGroup = false;
        for (let i = 0; i < this._$groupElements.length; i++) {
          const $elm = this._$groupElements[i];
          if ($elm.isActive()) {
            hasActiveElementInGroup = true;
            break;
          }
        }
        if (!hasActiveElementInGroup) {
          this.activate();
        }
      }
    }));
  }
  /**
   * @name        isActive
   * @type        Function
   *
   * This method allows you to know if this particular s-activate node is active or not
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  isActive() {
    return this.state.active;
  }
  _restoreState() {
    if (this.groupState.activeId && this.groupState.activeId === this.node.id) {
      return this.activate({
        force: true
      });
    }
    if (this.groupState.activeId && this.groupState.activeId !== this.node.id) {
      return;
    }
    if (this.state.active) {
      return this.activate({
        force: true
      });
    }
    if (this.state.active === void 0 && this.props.active) {
      return this.activate({
        force: true
      });
    }
    return this.unactivate({
      force: true
    });
  }
  /**
   * @name            activate
   * @type            Function
   * @async
   *
   * This async method allows you to activate this particular s-activate node
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  activate(params) {
    return __awaiter(this, void 0, void 0, function* () {
      const finalParams = Object.assign({ force: false, preventSave: false }, params !== null && params !== void 0 ? params : {});
      clearTimeout(this._unactivateTimeout);
      if (!finalParams.force && this.isActive())
        return;
      const activateFn = () => {
        if (this.props.history && this._hrefSelector) {
          document.location.hash = this._hrefSelector;
        }
        if (this._$groupElements) {
          this.groupState.activeId = this.node.id;
          this._$groupElements.forEach(($element) => {
            var _a;
            if ($element === this.node) {
              return;
            }
            (_a = $element.unactivate) === null || _a === void 0 ? void 0 : _a.call($element);
          });
        }
        this.state.active = true;
        this.props.active = true;
        this._$targets.forEach(($target) => {
          if (this.props.activeClass) {
            $target.classList.add(this.props.activeClass);
          }
          if (this.props.activeAttribute) {
            this.utils.fastdom.mutate(() => {
              $target.setAttribute(this.props.activeAttribute, "true");
            });
          }
          if ($target.children.length) {
            Array.from($target.children).forEach(($child) => {
              if ($child instanceof HTMLTemplateElement) {
                expandTemplate($child);
              }
            });
          }
          this.node.dispatchEvent(new CustomEvent("s-activate.activate", {
            bubbles: true
          }));
        });
      };
      if (this.props.activateTimeout) {
        setTimeout(activateFn, this.props.activateTimeout);
      } else {
        activateFn();
      }
    });
  }
  /**
   * @name            unactivate
   * @type            Function
   * @async
   *
   * This async method allows you to unactivate this particular s-activate node
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  unactivate(params) {
    return __awaiter(this, void 0, void 0, function* () {
      const finalParams = Object.assign({ force: false, preventSave: false }, params !== null && params !== void 0 ? params : {});
      if (!finalParams.force && !this.isActive())
        return;
      const unActivateFn = () => {
        this.state.active = false;
        this.props.active = false;
        this._$targets.forEach(($target) => {
          if (this.props.activeClass) {
            $target.classList.remove(this.props.activeClass);
          }
          if (this.props.activeAttribute) {
            $target.removeAttribute(this.props.activeAttribute);
          }
          this.node.dispatchEvent(new CustomEvent("s-activate.unactivate", {
            bubbles: true
          }));
        });
      };
      if (this.props.unactivateTimeout) {
        this._unactivateTimeout = setTimeout(unActivateFn, this.props.unactivateTimeout);
      } else {
        unActivateFn();
      }
    });
  }
}
function define(props = {}, name = "s-activate") {
  SActivateFeature.define(name, SActivateFeature, props);
}
export {
  define as default
};
