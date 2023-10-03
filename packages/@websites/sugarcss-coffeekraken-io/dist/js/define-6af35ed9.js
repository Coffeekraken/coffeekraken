import { d as __querySelectorLive, H as __fastdom, c as __deepMerge, a as SInterface, b as SFeature, I as __clearTransmations, J as autoResizeFeature, K as confirmButtonFeature } from "./index.esm.js";
function __expandPleasantCssClassname(classesStr) {
  var _a, _b;
  let classesArray = [];
  const classNames = classesStr.split(/\s+/);
  let currentMedia = "";
  classNames.forEach((className) => {
    if (className.slice(0, 1) == "@") {
      currentMedia = className.replace("@", "_");
      return;
    }
    const parts = className.split(":");
    if (parts.length === 1) {
      let name = className;
      if (currentMedia !== "")
        name = className + currentMedia;
      classesArray.push(name);
    } else {
      const firstClass = parts[0];
      let name = firstClass;
      if (currentMedia !== "")
        name = firstClass + currentMedia;
      classesArray.push(name);
      parts.forEach((part, i) => {
        if (i > 0) {
          name = firstClass + "-" + part;
          if (currentMedia !== "")
            name = name + currentMedia;
          classesArray.push(name);
        }
      });
    }
  });
  if ((_b = (_a = document.env) === null || _a === void 0 ? void 0 : _a.SUGAR) === null || _b === void 0 ? void 0 : _b.classmap) {
    classesArray = classesArray.map((cls) => document.env.SUGAR.classmap.resolve(cls));
  }
  return classesArray.join(" ");
}
function __expandPleasantCssClassnamesLive(settings) {
  settings = Object.assign({ afterFirst: void 0, rootNode: document }, settings);
  __querySelectorLive('[class*=":"]:not(code [class*=":"]):not(template [class*=":"]),[class*="@"]:not(code [class*="@"]):not(template [class*="@"])', ($elm) => {
    const classesStr = $elm.getAttribute("class");
    const newClassesStr = __expandPleasantCssClassname(classesStr);
    __fastdom.mutate(() => {
      $elm.setAttribute("class", newClassesStr);
    });
  }, {
    afterFirst: settings.afterFirst,
    rootNode: settings === null || settings === void 0 ? void 0 : settings.rootNode
  });
}
function __viewportEvents($elm, settings) {
  let observer, status = "out";
  if ($elm._viewportEventsInited) {
    return $elm;
  }
  $elm._viewportEventsInited = true;
  settings = Object.assign({ offset: "25px", once: false }, settings !== null && settings !== void 0 ? settings : {});
  observer = new IntersectionObserver((entries, observer2) => {
    if (!entries.length)
      return;
    const entry = entries.pop();
    if (entry.intersectionRatio > 0) {
      if (status === "in") {
        return;
      }
      status = "in";
      $elm.dispatchEvent(new CustomEvent("viewport.in", {
        bubbles: true
      }));
      if (settings === null || settings === void 0 ? void 0 : settings.once) {
        observer2.disconnect();
      }
    } else {
      if (status === "out") {
        return;
      }
      status = "out";
      $elm.dispatchEvent(new CustomEvent("viewport.out", {
        bubbles: true
      }));
    }
  }, {
    root: null,
    rootMargin: settings.offset,
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
  });
  observer.observe($elm);
  return $elm;
}
function __preventScrollRestoration() {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
}
function autoFocusFeature() {
  __querySelectorLive("[autofocus]", ($elm) => {
    var _a, _b;
    (_b = (_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.blur) === null || _b === void 0 ? void 0 : _b.call(_a);
    setTimeout(() => {
      $elm.focus();
    });
  });
}
function __inputAdditionalAttributes(settings = {}) {
  settings = Object.assign({ empty: true, hasValue: true, dirty: true }, settings);
  function handleInputAttributes(eOrElm) {
    const field = eOrElm.target ? eOrElm.target : eOrElm;
    if (!field || !field.tagName)
      return;
    switch (field.tagName) {
      case "INPUT":
      case "TEXTAREA":
      case "SELECT":
        if (field.type && (field.type === "checkbox" || field.type === "radio")) {
          return;
        }
        __fastdom.mutate(() => {
          if (field.value && !field.hasAttribute("has-value")) {
            if (settings.hasValue) {
              field.setAttribute("has-value", true);
            }
            if (settings.empty) {
              field.removeAttribute("empty");
            }
          } else if (field.value === void 0 || field.value === null || field.value === "") {
            if (settings.hasValue) {
              field.removeAttribute("has-value");
            }
            field.removeAttribute("value");
            if (settings.empty) {
              if (!field.hasAttribute("empty")) {
                field.setAttribute("empty", true);
              }
            }
          }
          if (settings.dirty) {
            if (!field.hasAttribute("dirty") && field.value) {
              field.setAttribute("dirty", true);
            }
          }
        });
        break;
    }
  }
  function handleFormSubmitOrReset(e) {
    [].forEach.call(e.target.elements, (field) => {
      handleInputAttributes(field);
      if (e.type === "submit")
        return;
      field.removeAttribute("dirty");
    });
  }
  __querySelectorLive('select, textarea, input:not([type="submit"])', (elm) => {
    handleInputAttributes(elm);
  });
  document.addEventListener("change", handleInputAttributes);
  document.addEventListener("keyup", handleInputAttributes);
  document.addEventListener("reset", handleFormSubmitOrReset);
  document.addEventListener("submit", handleFormSubmitOrReset);
}
function __linksStateAttributes(settings = {}) {
  settings = __deepMerge({}, settings);
  function handleLink($linkElm) {
    if (!$linkElm) {
      return;
    }
    __fastdom.mutate(() => {
      if ($linkElm.getAttribute("href") === document.location.pathname) {
        $linkElm.setAttribute("actual", true);
        $linkElm.parentNode.setAttribute("actual-parent", true);
        $linkElm.dispatchEvent(new CustomEvent("actual", {
          bubbles: true
        }));
      } else if (document.location.pathname !== "/" && $linkElm.getAttribute("href").startsWith(document.location.pathname)) {
        $linkElm.removeAttribute("actual");
        $linkElm.setAttribute("actual-child", true);
        $linkElm.dispatchEvent(new CustomEvent("actual", {
          bubbles: true
        }));
      } else {
        $linkElm.removeAttribute("actual");
        $linkElm.removeAttribute("actual-child");
        $linkElm.parentNode.removeAttribute("actual-parent");
      }
    });
  }
  __querySelectorLive(`a[href]`, ($linkElm) => {
    handleLink($linkElm);
    setTimeout(() => {
      handleLink($linkElm);
    }, 500);
  });
  window.addEventListener("locationchange", () => {
    Array.from(document.querySelectorAll("a[href]")).forEach(($linkElm) => {
      handleLink($linkElm);
    });
  });
  window.addEventListener("popstate", () => {
    Array.from(document.querySelectorAll("a[href]")).forEach(($linkElm) => {
      handleLink($linkElm);
    });
  });
  window.addEventListener("pushstate", () => {
    Array.from(document.querySelectorAll("a[href]")).forEach(($linkElm) => {
      handleLink($linkElm);
    });
  });
}
class SSugarFeatureInterface extends SInterface {
  static get _definition() {
    return {
      pleasantCss: {
        description: 'Specify if you want the "pleasant css" syntax in your pages',
        type: "Boolean",
        default: true
      },
      autofocus: {
        description: 'Specify if you want the "autofocus" to work on your page',
        type: "Boolean",
        default: true
      },
      viewportAware: {
        description: 'Specify if you want the "viewport-aware" attribute to be enabled or not. If true, the elements that have this attribute will dispatch the "viewport.enter" and "viewport.exit" events as well as have the "in-viewport" class and attribute',
        type: "Boolean",
        default: true
      },
      containerQuery: {
        description: "Specify if you want support for container queries in your css or not",
        type: "Boolean",
        default: true
      },
      scrollClasses: {
        description: "Specify if you want the scroll classes to be applied on the `body` element when the page has been scrolled",
        type: "Boolean",
        default: true
      },
      scrolledDelta: {
        description: "Specify after how many scroll the scrolled class will be applied",
        type: "Number",
        default: 200
      },
      vhvar: {
        description: "Specify if you want the `--vh` css variable to be computed and available",
        type: "Boolean",
        default: true
      },
      autoResize: {
        description: "Specify if you want the auto resize to be enabled",
        type: "Boolean",
        default: true
      },
      confirmBtn: {
        description: 'Specify if you want the "confirm button" feature to be enabled',
        type: "Boolean",
        default: true
      },
      inputAdditionalAttributes: {
        description: 'Specify if you want to have the additional attributes on inputs like "has-value", "empty" and "dirty" or not',
        type: "Boolean",
        default: true
      },
      resizeTransmations: {
        description: "Specify if you want all the transitions and animations cleared during window resize",
        type: "Boolean",
        default: true
      },
      linksStateAttributes: {
        description: 'Specify if you want to have the state attributes on links like "actual" and "actual-child" or not',
        type: "Boolean",
        default: true
      },
      preventScrollRestoration: {
        description: "Specify if you want to prevent the scroll restoration behavior on chrome that can usually be anoying",
        type: "Boolean",
        default: true
      },
      env: {
        description: "Specify if you want to display the current environment at start",
        type: "Boolean",
        default: true
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
var _wr = function(type) {
  var orig = history[type];
  return function(...args) {
    var rv = orig.apply(this, arguments);
    var e = new CustomEvent(type.toLowerCase(), {
      bubbles: true,
      detail: args[0]
    });
    window.dispatchEvent(e);
    return rv;
  };
};
history.pushState = _wr("pushState");
class SSugarFeature extends SFeature {
  constructor(name, node, settings) {
    super(name, node, __deepMerge({
      name: "s-sugar",
      interface: SSugarFeatureInterface
    }, settings !== null && settings !== void 0 ? settings : {}));
    this._isResizing = false;
  }
  mount() {
    return __awaiter(this, void 0, void 0, function* () {
      if (this.props.pleasantCss)
        this._pleasantCss();
      if (this.props.autofocus)
        this._autofocus();
      if (this.props.viewportAware)
        this._viewportAware();
      if (this.props.scrollClasses)
        this._scrollClasses();
      if (this.props.vhvar)
        this._vhvar();
      if (this.props.autoResize)
        this._autoResize();
      if (this.props.confirmBtn)
        this._confirmBtn();
      if (this.props.resizeTransmations)
        this._clearTransmationsOnResize();
      if (this.props.inputAdditionalAttributes)
        __inputAdditionalAttributes();
      if (this.props.linksStateAttributes)
        __linksStateAttributes();
      if (this.props.preventScrollRestoration)
        __preventScrollRestoration();
      if (document.readyState !== "complete") {
        document.addEventListener("readystatechange", () => {
          if (document.readyState === "complete") {
            document.body.classList.remove("initial-loading");
            document.body.classList.remove("loading");
          }
        });
      } else {
        document.body.classList.remove("initial-loading");
        document.body.classList.remove("loading");
      }
    });
  }
  _clearTransmationsOnResize() {
    let resetFn;
    window.addEventListener("resize", () => {
      if (!this._isResizing) {
        resetFn = __clearTransmations();
      }
      this._isResizing = true;
      clearTimeout(this._clearTransmationsOnResizeTimeout);
      this._clearTransmationsOnResizeTimeout = setTimeout(() => {
        this._isResizing = false;
        resetFn === null || resetFn === void 0 ? void 0 : resetFn();
      }, 100);
    });
  }
  _pleasantCss() {
    __expandPleasantCssClassnamesLive({
      afterFirst() {
        setTimeout(() => {
          document.body.classList.remove("initial-loading");
          document.body.classList.remove("loading");
        }, 500);
      }
    });
  }
  _viewportAware() {
    __querySelectorLive("[viewport-aware]", ($elm) => {
      __viewportEvents($elm);
      $elm.addEventListener("viewport.enter", () => {
        $elm.setAttribute("in-viewport", "true");
        $elm.classList.add("in-viewport");
      });
      $elm.addEventListener("viewport.exit", () => {
        $elm.removeAttribute("in-viewport");
        $elm.classList.remove("in-viewport");
      });
    });
  }
  _autofocus() {
    autoFocusFeature();
  }
  _scrollClasses() {
    let previousX = 0, previousY = 0;
    let directionX, directionY;
    document.addEventListener("scroll", (e) => {
      if (window.scrollY >= this.props.scrolledDelta) {
        if (!document.body.classList.contains("scrolled")) {
          document.body.classList.add("scrolled");
        }
      } else {
        if (document.body.classList.contains("scrolled")) {
          document.body.classList.remove("scrolled");
        }
      }
      if (window.scrollY > previousY) {
        directionY = "down";
      } else {
        directionY = "up";
      }
      if (window.scrollX > previousX) {
        directionX = "right";
      } else if (window.scrollX <= previousX) {
        directionX = "left";
      }
      previousX = window.scrollX;
      previousY = window.scrollY;
      if (directionY === "up") {
        document.body.classList.remove("scroll-down");
        document.body.classList.add("scroll-up");
      } else {
        document.body.classList.remove("scroll-up");
        document.body.classList.add("scroll-down");
      }
      if (directionX === "left") {
        document.body.classList.remove("scroll-right");
        document.body.classList.add("scroll-left");
      } else if (directionX === "right") {
        document.body.classList.remove("scroll-left");
        document.body.classList.add("scroll-right");
      }
    });
  }
  _vhvar() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    window.addEventListener("resize", () => {
      vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });
  }
  _autoResize() {
    autoResizeFeature();
  }
  _confirmBtn() {
    confirmButtonFeature();
  }
}
function define(props = {}, name = "s-sugar") {
  SSugarFeature.define(name, SSugarFeature, Object.assign({ mountWhen: "direct" }, props));
}
export {
  define as default
};
