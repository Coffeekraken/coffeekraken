import { S as SInterface, e as SFeature, c as __deepMerge, M as __closestScrollable, N as __scrollTo } from "./index.esm.js";
class SRefocusFeatureInterface extends SInterface {
  static get _definition() {
    return {
      trigger: {
        description: "Specify some trigger(s) on which to refocus a particular element like `event:actual`, `anchor`, `history`, etc...",
        type: {
          type: "Array<String>",
          splitChars: [","]
        },
        values: ["event:eventName", "anchor", "history"],
        default: []
      },
      timeout: {
        description: "Specify a timeout to wait before refocus the element",
        type: "Number",
        default: 500
      },
      duration: {
        description: "Specify the duration of the refocus animation",
        type: "Number"
      },
      easing: {
        description: "Specify the easing function of the refocus animation",
        type: "Function"
      },
      focusedClass: {
        description: "Specify the class to add when the target element has been focused",
        type: "String|Boolean",
        default: "focused"
      },
      focusedClassDuration: {
        description: "Specify how many ms the focused class has to be added, then removed",
        type: "Number",
        default: 1e3
      },
      // minToScroll: {
      //     description:
      //         'Specify a minimum scroll distance to make the browser actually scroll',
      //     type: 'Number',
      //     default: 200,
      // },
      offset: {
        description: "Specify the offset of the refocus animation in px",
        type: "Number"
      },
      offsetX: {
        description: "Specify the offset x of the refocus animation in px",
        type: "Number"
      },
      offsetY: {
        description: "Specify the offset y of the refocus animation in px",
        type: "Number"
      },
      align: {
        description: "Specify the alignment of the refocus animation",
        type: "String",
        values: ["start", "center", "end"]
      },
      justify: {
        description: "Specify the justification of the refocus animation",
        type: "String",
        values: ["start", "center", "end"]
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
class SRefocusFeature extends SFeature {
  constructor(name, node, settings) {
    super(name, node, __deepMerge({
      name: "s-refocus",
      interface: SRefocusFeatureInterface
    }, settings !== null && settings !== void 0 ? settings : {}));
    this._currentScrolledTargets = [];
  }
  mount() {
    this.props.trigger.forEach((trigger) => {
      switch (trigger) {
        case "anchor":
          setTimeout(() => {
            if (document.location.hash) {
              const $targetElm = this.node.querySelector(document.location.hash);
              if ($targetElm) {
                this._scrollTo($targetElm);
              }
            }
          }, this.props.timeout);
          break;
        case "history":
          ["hashchange", "popstate", "pushstate"].forEach((eventName) => {
            window.addEventListener(eventName, (e) => {
              var _a;
              if (eventName === "pushstate" && !((_a = e.detail) === null || _a === void 0 ? void 0 : _a.scroll)) {
                return;
              }
              if (document.location.hash) {
                const $targetElm = this.node.querySelector(document.location.hash);
                if ($targetElm) {
                  this._scrollTo($targetElm);
                }
              } else {
                setTimeout(() => {
                  this._scrollTo(document.body);
                }, 100);
              }
            });
          });
          break;
        default:
          if (trigger.match(/^event:/)) {
            const event = trigger.replace("event:", "").trim();
            this.node.addEventListener(event, (e) => {
              this._scrollTo(e.target);
            });
          }
          break;
      }
    });
  }
  _scrollTo($elm) {
    return __awaiter(this, void 0, void 0, function* () {
      if (this._currentScrolledTargets.includes($elm)) {
        return;
      }
      if ($elm !== document.body && !this.node.contains($elm)) {
        return;
      }
      const scrollToSettings = {
        $elm: this.node
      };
      if (this.props.duration)
        scrollToSettings.duration = this.props.duration;
      if (this.props.easing)
        scrollToSettings.easing = this.props.easing;
      if (this.props.offset)
        scrollToSettings.offset = this.props.offset;
      if (this.props.offsetX)
        scrollToSettings.offsetX = this.props.offsetX;
      if (this.props.offsetY)
        scrollToSettings.offsetY = this.props.offsetY;
      if (this.props.align)
        scrollToSettings.align = this.props.align;
      if (this.props.justify)
        scrollToSettings.justify = this.props.justify;
      let $scrollable = __closestScrollable($elm);
      if ($scrollable._isScrolling) {
        return;
      }
      $scrollable._isScrolling = true;
      if ($scrollable._sRefocusFeatureCurrentElm) {
        this._currentScrolledTargets.splice(this._currentScrolledTargets.indexOf($scrollable._sRefocusFeatureCurrentElm, 1));
      }
      $scrollable._sRefocusFeatureCurrentElm = $elm;
      this._currentScrolledTargets.push($elm);
      yield __scrollTo($elm, Object.assign(Object.assign({}, scrollToSettings), { $elm: $scrollable, force: true }));
      $scrollable._isScrolling = false;
      if (this.props.focusedClass && $elm !== document.body) {
        $elm.classList.add(this.props.focusedClass);
        setTimeout(() => {
          $elm.classList.remove(this.props.focusedClass);
        }, this.props.focusedClassDuration);
      }
    });
  }
}
function define(props = {}, name = "s-refocus") {
  SRefocusFeature.define(name, SRefocusFeature, Object.assign({}, props));
}
export {
  define as default
};
