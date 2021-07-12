import * as riot from "riot";
import {v4} from "uuid";
import __SPromise from "@coffeekraken/s-promise";
import __SInterface from "@coffeekraken/s-interface";
import __SComponentUtils from "@coffeekraken/s-component-utils";
function uniqid() {
  return v4();
}
function matches(el, selector) {
  if (el.nodeName == "#comment" || el.nodeName == "#text") {
    return false;
  }
  const p = Element.prototype;
  const f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function(s) {
    return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
  };
  return f.call(el, selector);
}
let _observer;
const _selectors = {};
function querySelectorLive(selector, cb = null, settings = {}) {
  const id = `${selector} - ${uniqid()}`;
  settings = Object.assign({}, {
    rootNode: document,
    once: true
  }, settings);
  if (!_selectors[selector]) {
    _selectors[selector] = [
      {
        id,
        selector,
        cb,
        lastMutationId: null,
        settings
      }
    ];
  } else {
    _selectors[selector].push({
      id,
      selector,
      cb,
      lastMutationId: null,
      settings
    });
  }
  return new __SPromise(({resolve, reject, emit}) => {
    function pushNewNode(node, sel, mutationId) {
      const objs = _selectors[sel];
      if (!objs)
        return;
      objs.forEach((obj) => {
        if (obj.lastMutationId && obj.lastMutationId === mutationId)
          return;
        if (obj.settings.once) {
          if (!node._querySelectorLive) {
            node._querySelectorLive = {};
          }
          if (node._querySelectorLive[obj.id])
            return;
          node._querySelectorLive[obj.id] = true;
        }
        emit("node", node);
        obj.cb && obj.cb(node, () => {
          delete _selectors[obj.selector];
        });
      });
    }
    if (!_observer) {
      _observer = new MutationObserver((mutations) => {
        const mutationId = `mutation-${uniqid()}`;
        mutations.forEach((mutation) => {
          if (mutation.addedNodes && mutation.addedNodes.length) {
            [].forEach.call(mutation.addedNodes, (node) => {
              const selectors = Object.keys(_selectors);
              selectors.forEach((sel) => {
                if (matches(node, sel)) {
                  pushNewNode(node, sel, mutationId);
                }
              });
              if (!node.querySelectorAll)
                return;
              selectors.forEach((sel) => {
                const nestedNodes = node.querySelectorAll(sel);
                [].forEach.call(nestedNodes, (nestedNode) => {
                  pushNewNode(nestedNode, sel, mutationId);
                });
              });
            });
          } else if (mutation.attributeName) {
            const selectors = Object.keys(_selectors);
            selectors.forEach((sel) => {
              if (matches(mutation.target, sel)) {
                pushNewNode(mutation.target, sel, mutationId);
              }
            });
          }
        });
      });
      _observer.observe(settings.rootNode, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["class", "id"]
      });
    }
    [].forEach.call(settings.rootNode.querySelectorAll(selector), (node) => {
      pushNewNode(node, selector, "init");
    });
  });
}
class SActivateComponentInterface extends __SInterface {
}
SActivateComponentInterface.definition = {
  target: {
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
const Component = {
  "css": ``,
  "exports": {
    $targets: void 0,
    $groupElements: void 0,
    targetSelector: void 0,
    onBeforeMount() {
      this.component = new __SComponentUtils(this.root, this.props, {
        interface: SActivateComponentInterface
      });
      if (this.component.props.saveState) {
        if (!this.root.id)
          throw new Error(`<red>[s-activate]</red> In order to use the "<yellow>saveState</yellow>" property, you MUST specify an "<cyan>id</cyan>" on your s-activate component`);
        this.component.props.active = localStorage.getItem(`s-activate-state-${this.root.id}`) !== null;
      }
      if (this.component.props.target) {
        if (!this.component.props.target.match(/^(\.|\[])/)) {
          this.targetSelector = `#${this.component.props.target}`;
        } else {
          this.targetSelector = this.component.props.target;
        }
      }
    },
    onMounted() {
      const targets = Array.from(document.querySelectorAll(this.targetSelector));
      if (targets.length)
        this.$targets = targets;
      if (this.component.props.group) {
        this.$groupElements = Array.from(document.querySelectorAll(`s-activate[group="${this.component.props.group}"]`));
      }
      this.component.props.trigger.forEach((trigger) => {
        switch (trigger) {
          case "click":
            this.root.addEventListener("click", (e) => {
              if (this.isActive() && this.component.props.toggle) {
                this.unactivate();
              } else {
                this.activate();
              }
            });
            break;
          case "anchor":
            if (document.location.hash === this.targetSelector) {
              this.activate();
            }
            window.addEventListener("hashchange", (e) => {
              if (document.location.hash === this.targetSelector) {
                this.activate();
              }
            });
            break;
        }
      });
      this.root.activate = this.activate.bind(this);
      this.root.unactivate = this.unactivate.bind(this);
      this.root.isActive = this.isActive.bind(this);
      if (this.component.props.active) {
        this.activate(true);
      }
    },
    isActive() {
      return this.root.hasAttribute("active");
    },
    activate(force = false) {
      if (!force && this.isActive())
        return;
      if (this.component.props.saveState) {
        if (!this.root.id)
          throw new Error(`<red>[s-activate]</red> In order to use the "<yellow>saveState</yellow>" property, you MUST specify an "<cyan>id</cyan>" on your s-activate component`);
        localStorage.setItem(`s-activate-state-${this.root.id}`, true);
      }
      if (this.component.props.history) {
        document.location.hash = this.targetSelector;
      }
      if (this.$groupElements) {
        this.$groupElements.forEach(($element) => {
          if ($element === this.root)
            return;
          try {
            $element.unactivate();
          } catch (e) {
          }
        });
      }
      this.root.setAttribute("active", true);
      if (this.$targets) {
        this.$targets.forEach(($target) => {
          $target.classList.add("active");
        });
      }
    },
    unactivate() {
      if (!this.isActive())
        return;
      if (this.component.props.saveState) {
        if (!this.root.id)
          throw new Error(`<red>[s-activate]</red> In order to use the "<yellow>saveState</yellow>" property, you MUST specify an "<cyan>id</cyan>" on your s-activate component`);
        localStorage.removeItem(`s-activate-state-${this.root.id}`);
      }
      this.root.removeAttribute("active");
      if (this.$targets) {
        this.$targets.forEach(($target) => {
          $target.classList.remove("active");
        });
      }
    }
  },
  "template": null,
  "name": "s-activate"
};
riot.register("s-activate", Component);
querySelectorLive("s-activate:not([s-mounted])", ($elm) => {
  const id = $elm.id || "s-activate-" + uniqid();
  $elm.setAttribute("id", id);
  riot.mount("#" + id);
});
Component.mount = () => {
  riot.mount("s-activate");
};
if (!window.env)
  window.env = {SUGAR: {}};
window.env.SUGAR = JSON.parse('{"ENVIRONMENT":"development"}');
export default Component;
