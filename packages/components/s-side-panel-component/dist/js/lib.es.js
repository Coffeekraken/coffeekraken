import {css, unsafeCSS, html} from "lit";
import __SInterface from "@coffeekraken/s-interface";
import __SComponentUtils, {SLitElement} from "@coffeekraken/s-component-utils";
import __SPromise from "@coffeekraken/s-promise";
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
class SSidePanelComponentInterface extends __SInterface {
}
SSidePanelComponentInterface.definition = {
  side: {
    type: "String",
    values: ["top", "left", "bottom", "right"],
    default: "left"
  },
  active: {
    type: "Boolean",
    default: false
  },
  overlay: {
    type: "Boolean",
    default: false
  },
  triggerer: {
    type: "String"
  },
  closeOn: {
    type: {
      type: "Array<String>",
      splitChars: [","]
    },
    values: ["click", "escape"],
    default: ["click", "escape"]
  }
};
/*!
* hotkeys-js v3.8.5
* A simple micro-library for defining and dispatching keyboard shortcuts. It has no dependencies.
* 
* Copyright (c) 2021 kenny wong <wowohoo@qq.com>
* http://jaywcjlove.github.io/hotkeys
* 
* Licensed under the MIT license.
*/
var isff = typeof navigator !== "undefined" ? navigator.userAgent.toLowerCase().indexOf("firefox") > 0 : false;
function addEvent(object, event, method) {
  if (object.addEventListener) {
    object.addEventListener(event, method, false);
  } else if (object.attachEvent) {
    object.attachEvent("on".concat(event), function() {
      method(window.event);
    });
  }
}
function getMods(modifier, key) {
  var mods = key.slice(0, key.length - 1);
  for (var i = 0; i < mods.length; i++) {
    mods[i] = modifier[mods[i].toLowerCase()];
  }
  return mods;
}
function getKeys(key) {
  if (typeof key !== "string")
    key = "";
  key = key.replace(/\s/g, "");
  var keys = key.split(",");
  var index = keys.lastIndexOf("");
  for (; index >= 0; ) {
    keys[index - 1] += ",";
    keys.splice(index, 1);
    index = keys.lastIndexOf("");
  }
  return keys;
}
function compareArray(a1, a2) {
  var arr1 = a1.length >= a2.length ? a1 : a2;
  var arr2 = a1.length >= a2.length ? a2 : a1;
  var isIndex = true;
  for (var i = 0; i < arr1.length; i++) {
    if (arr2.indexOf(arr1[i]) === -1)
      isIndex = false;
  }
  return isIndex;
}
var _keyMap = {
  backspace: 8,
  tab: 9,
  clear: 12,
  enter: 13,
  return: 13,
  esc: 27,
  escape: 27,
  space: 32,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  del: 46,
  delete: 46,
  ins: 45,
  insert: 45,
  home: 36,
  end: 35,
  pageup: 33,
  pagedown: 34,
  capslock: 20,
  num_0: 96,
  num_1: 97,
  num_2: 98,
  num_3: 99,
  num_4: 100,
  num_5: 101,
  num_6: 102,
  num_7: 103,
  num_8: 104,
  num_9: 105,
  num_multiply: 106,
  num_add: 107,
  num_enter: 108,
  num_subtract: 109,
  num_decimal: 110,
  num_divide: 111,
  "\u21EA": 20,
  ",": 188,
  ".": 190,
  "/": 191,
  "`": 192,
  "-": isff ? 173 : 189,
  "=": isff ? 61 : 187,
  ";": isff ? 59 : 186,
  "'": 222,
  "[": 219,
  "]": 221,
  "\\": 220
};
var _modifier = {
  "\u21E7": 16,
  shift: 16,
  "\u2325": 18,
  alt: 18,
  option: 18,
  "\u2303": 17,
  ctrl: 17,
  control: 17,
  "\u2318": 91,
  cmd: 91,
  command: 91
};
var modifierMap = {
  16: "shiftKey",
  18: "altKey",
  17: "ctrlKey",
  91: "metaKey",
  shiftKey: 16,
  ctrlKey: 17,
  altKey: 18,
  metaKey: 91
};
var _mods = {
  16: false,
  18: false,
  17: false,
  91: false
};
var _handlers = {};
for (var k = 1; k < 20; k++) {
  _keyMap["f".concat(k)] = 111 + k;
}
var _downKeys = [];
var _scope = "all";
var elementHasBindEvent = [];
var code = function code2(x) {
  return _keyMap[x.toLowerCase()] || _modifier[x.toLowerCase()] || x.toUpperCase().charCodeAt(0);
};
function setScope(scope) {
  _scope = scope || "all";
}
function getScope() {
  return _scope || "all";
}
function getPressedKeyCodes() {
  return _downKeys.slice(0);
}
function filter(event) {
  var target = event.target || event.srcElement;
  var tagName = target.tagName;
  var flag = true;
  if (target.isContentEditable || (tagName === "INPUT" || tagName === "TEXTAREA" || tagName === "SELECT") && !target.readOnly) {
    flag = false;
  }
  return flag;
}
function isPressed(keyCode) {
  if (typeof keyCode === "string") {
    keyCode = code(keyCode);
  }
  return _downKeys.indexOf(keyCode) !== -1;
}
function deleteScope(scope, newScope) {
  var handlers;
  var i;
  if (!scope)
    scope = getScope();
  for (var key in _handlers) {
    if (Object.prototype.hasOwnProperty.call(_handlers, key)) {
      handlers = _handlers[key];
      for (i = 0; i < handlers.length; ) {
        if (handlers[i].scope === scope)
          handlers.splice(i, 1);
        else
          i++;
      }
    }
  }
  if (getScope() === scope)
    setScope(newScope || "all");
}
function clearModifier(event) {
  var key = event.keyCode || event.which || event.charCode;
  var i = _downKeys.indexOf(key);
  if (i >= 0) {
    _downKeys.splice(i, 1);
  }
  if (event.key && event.key.toLowerCase() === "meta") {
    _downKeys.splice(0, _downKeys.length);
  }
  if (key === 93 || key === 224)
    key = 91;
  if (key in _mods) {
    _mods[key] = false;
    for (var k in _modifier) {
      if (_modifier[k] === key)
        hotkeys[k] = false;
    }
  }
}
function unbind(keysInfo) {
  if (!keysInfo) {
    Object.keys(_handlers).forEach(function(key) {
      return delete _handlers[key];
    });
  } else if (Array.isArray(keysInfo)) {
    keysInfo.forEach(function(info) {
      if (info.key)
        eachUnbind(info);
    });
  } else if (typeof keysInfo === "object") {
    if (keysInfo.key)
      eachUnbind(keysInfo);
  } else if (typeof keysInfo === "string") {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    var scope = args[0], method = args[1];
    if (typeof scope === "function") {
      method = scope;
      scope = "";
    }
    eachUnbind({
      key: keysInfo,
      scope,
      method,
      splitKey: "+"
    });
  }
}
var eachUnbind = function eachUnbind2(_ref) {
  var key = _ref.key, scope = _ref.scope, method = _ref.method, _ref$splitKey = _ref.splitKey, splitKey = _ref$splitKey === void 0 ? "+" : _ref$splitKey;
  var multipleKeys = getKeys(key);
  multipleKeys.forEach(function(originKey) {
    var unbindKeys = originKey.split(splitKey);
    var len = unbindKeys.length;
    var lastKey = unbindKeys[len - 1];
    var keyCode = lastKey === "*" ? "*" : code(lastKey);
    if (!_handlers[keyCode])
      return;
    if (!scope)
      scope = getScope();
    var mods = len > 1 ? getMods(_modifier, unbindKeys) : [];
    _handlers[keyCode] = _handlers[keyCode].map(function(record) {
      var isMatchingMethod = method ? record.method === method : true;
      if (isMatchingMethod && record.scope === scope && compareArray(record.mods, mods)) {
        return {};
      }
      return record;
    });
  });
};
function eventHandler(event, handler, scope) {
  var modifiersMatch;
  if (handler.scope === scope || handler.scope === "all") {
    modifiersMatch = handler.mods.length > 0;
    for (var y in _mods) {
      if (Object.prototype.hasOwnProperty.call(_mods, y)) {
        if (!_mods[y] && handler.mods.indexOf(+y) > -1 || _mods[y] && handler.mods.indexOf(+y) === -1) {
          modifiersMatch = false;
        }
      }
    }
    if (handler.mods.length === 0 && !_mods[16] && !_mods[18] && !_mods[17] && !_mods[91] || modifiersMatch || handler.shortcut === "*") {
      if (handler.method(event, handler) === false) {
        if (event.preventDefault)
          event.preventDefault();
        else
          event.returnValue = false;
        if (event.stopPropagation)
          event.stopPropagation();
        if (event.cancelBubble)
          event.cancelBubble = true;
      }
    }
  }
}
function dispatch(event) {
  var asterisk = _handlers["*"];
  var key = event.keyCode || event.which || event.charCode;
  if (!hotkeys.filter.call(this, event))
    return;
  if (key === 93 || key === 224)
    key = 91;
  if (_downKeys.indexOf(key) === -1 && key !== 229)
    _downKeys.push(key);
  ["ctrlKey", "altKey", "shiftKey", "metaKey"].forEach(function(keyName) {
    var keyNum = modifierMap[keyName];
    if (event[keyName] && _downKeys.indexOf(keyNum) === -1) {
      _downKeys.push(keyNum);
    } else if (!event[keyName] && _downKeys.indexOf(keyNum) > -1) {
      _downKeys.splice(_downKeys.indexOf(keyNum), 1);
    } else if (keyName === "metaKey" && event[keyName] && _downKeys.length === 3) {
      if (!(event.ctrlKey || event.shiftKey || event.altKey)) {
        _downKeys = _downKeys.slice(_downKeys.indexOf(keyNum));
      }
    }
  });
  if (key in _mods) {
    _mods[key] = true;
    for (var k in _modifier) {
      if (_modifier[k] === key)
        hotkeys[k] = true;
    }
    if (!asterisk)
      return;
  }
  for (var e in _mods) {
    if (Object.prototype.hasOwnProperty.call(_mods, e)) {
      _mods[e] = event[modifierMap[e]];
    }
  }
  if (event.getModifierState && !(event.altKey && !event.ctrlKey) && event.getModifierState("AltGraph")) {
    if (_downKeys.indexOf(17) === -1) {
      _downKeys.push(17);
    }
    if (_downKeys.indexOf(18) === -1) {
      _downKeys.push(18);
    }
    _mods[17] = true;
    _mods[18] = true;
  }
  var scope = getScope();
  if (asterisk) {
    for (var i = 0; i < asterisk.length; i++) {
      if (asterisk[i].scope === scope && (event.type === "keydown" && asterisk[i].keydown || event.type === "keyup" && asterisk[i].keyup)) {
        eventHandler(event, asterisk[i], scope);
      }
    }
  }
  if (!(key in _handlers))
    return;
  for (var _i = 0; _i < _handlers[key].length; _i++) {
    if (event.type === "keydown" && _handlers[key][_i].keydown || event.type === "keyup" && _handlers[key][_i].keyup) {
      if (_handlers[key][_i].key) {
        var record = _handlers[key][_i];
        var splitKey = record.splitKey;
        var keyShortcut = record.key.split(splitKey);
        var _downKeysCurrent = [];
        for (var a = 0; a < keyShortcut.length; a++) {
          _downKeysCurrent.push(code(keyShortcut[a]));
        }
        if (_downKeysCurrent.sort().join("") === _downKeys.sort().join("")) {
          eventHandler(event, record, scope);
        }
      }
    }
  }
}
function isElementBind(element) {
  return elementHasBindEvent.indexOf(element) > -1;
}
function hotkeys(key, option, method) {
  _downKeys = [];
  var keys = getKeys(key);
  var mods = [];
  var scope = "all";
  var element = document;
  var i = 0;
  var keyup = false;
  var keydown = true;
  var splitKey = "+";
  if (method === void 0 && typeof option === "function") {
    method = option;
  }
  if (Object.prototype.toString.call(option) === "[object Object]") {
    if (option.scope)
      scope = option.scope;
    if (option.element)
      element = option.element;
    if (option.keyup)
      keyup = option.keyup;
    if (option.keydown !== void 0)
      keydown = option.keydown;
    if (typeof option.splitKey === "string")
      splitKey = option.splitKey;
  }
  if (typeof option === "string")
    scope = option;
  for (; i < keys.length; i++) {
    key = keys[i].split(splitKey);
    mods = [];
    if (key.length > 1)
      mods = getMods(_modifier, key);
    key = key[key.length - 1];
    key = key === "*" ? "*" : code(key);
    if (!(key in _handlers))
      _handlers[key] = [];
    _handlers[key].push({
      keyup,
      keydown,
      scope,
      mods,
      shortcut: keys[i],
      method,
      key: keys[i],
      splitKey
    });
  }
  if (typeof element !== "undefined" && !isElementBind(element) && window) {
    elementHasBindEvent.push(element);
    addEvent(element, "keydown", function(e) {
      dispatch(e);
    });
    addEvent(window, "focus", function() {
      _downKeys = [];
    });
    addEvent(element, "keyup", function(e) {
      dispatch(e);
      clearModifier(e);
    });
  }
}
var _api = {
  setScope,
  getScope,
  deleteScope,
  getPressedKeyCodes,
  isPressed,
  filter,
  unbind
};
for (var a in _api) {
  if (Object.prototype.hasOwnProperty.call(_api, a)) {
    hotkeys[a] = _api[a];
  }
}
if (typeof window !== "undefined") {
  var _hotkeys = window.hotkeys;
  hotkeys.noConflict = function(deep) {
    if (deep && window.hotkeys === hotkeys) {
      window.hotkeys = _hotkeys;
    }
    return hotkeys;
  };
  window.hotkeys = hotkeys;
}
var hotkeys_common = hotkeys;
hotkeys_common.filter = function() {
  return true;
};
function hotkey(hotkey2, settings = {}) {
  return new __SPromise(({resolve, reject, emit, cancel}) => {
    settings = Object.assign({element: null, keyup: false, keydown: true, once: false, splitKey: "+"}, settings);
    hotkeys_common(hotkey2, settings, (e, h) => {
      emit("press", e);
      if (settings.once)
        cancel();
    });
  }, {
    id: "hotkey"
  }).on("finally", () => {
    hotkeys_common.unbind(hotkey2);
  });
}
var __css = "s-side-panel {\n    display: block;\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    z-index: 9999;\n    pointer-events: none;\n}\n\n    s-side-panel[active] {\n        pointer-events: all;\n    }\n\n    s-side-panel:not([mounted]) > * {\n        display: none;\n    }\n\n.s-side-panel__overlay {\n    position: absolute;\n    top: 0;\n    left: 0;\n    z-index: 0;\n    width: 100%;\n    height: 100%;\n}\n\n[default-style] .s-side-panel__overlay {\n        background: hsla(calc(var(--s-theme-color-main-h, 0) + var(--s-theme-color-main-spin ,0)),calc((var(--s-theme-color-main-s, 0) + var(--s-theme-color-main-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-main-l, 0) + var(--s-theme-color-main-lightness-offset, 0)) * 1%),var(--s-theme-color-main-a, 0.3));\n        transition: var(--s-theme-transition-default, all .3s cubic-bezier(0.700, 0.000, 0.305, 0.995));\n        opacity: 0;\n    }\n\n[default-style][active] .s-side-panel__overlay {\n        opacity: 1;\n    }\n\n.s-side-panel__container {\n    display: none;\n    position: absolute;\n    z-index: 1;\n}\n\n[mounted] .s-side-panel__container {\n        display: block;\n    }\n\n[default-style] .s-side-panel__container {\n        transition: var(--s-theme-transition-default, all .3s cubic-bezier(0.700, 0.000, 0.305, 0.995));\n    }\n\n[side='left'] .s-side-panel__container {\n        left: 0;\n        top: 0;\n        height: 100%;\n        transform: translateX(-100%);\n    }\n\n[side='top'] .s-side-panel__container {\n        left: 0;\n        top: 0;\n        width: 100%;\n        min-height: 40px;\n        transform: translateY(-100%);\n    }\n\n[side='right'] .s-side-panel__container {\n        right: 0;\n        top: 0;\n        height: 100%;\n        min-width: 40px;\n        transform: translateX(100%);\n    }\n\n[side='bottom'] .s-side-panel__container {\n        left: 0;\n        bottom: 0;\n        width: 100%;\n        min-height: 40px;\n        transform: translateY(100%);\n    }\n\n[active] .s-side-panel__container {\n        transform: translateX(0) translateY(0);\n    }\n\n.s-side-panel {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    pointer-events: none;\n}\n\n.s-side-panel[active] {\n        pointer-events: all;\n    }\n";
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
class SSidePanel extends SLitElement {
  constructor() {
    super();
    this._component = void 0;
    this._component = new __SComponentUtils(this.tagName.toLowerCase(), this, this.attributes, {
      componentUtils: {
        interface: SSidePanelComponentInterface,
        defaultProps: {}
      }
    });
    if (this._component.props.closeOn.indexOf("click") !== -1) {
      this.addEventListener("click", (e) => {
        if (this._$container.contains(e.target))
          return;
        if (this.constructor._activePanels.slice(-1)[0] !== this)
          return;
        this.constructor._activePanels.pop();
        this.active = false;
      });
    }
    if (this._component.props.closeOn.indexOf("escape") !== -1) {
      hotkey("escape").on("press", () => {
        if (this.constructor._activePanels.slice(-1)[0] !== this)
          return;
        this.constructor._activePanels.pop();
        this.active = false;
      });
    }
    if (this._component.props.defaultStyle) {
      this.setAttribute("default-style", true);
    }
    this._$nodes = Array.from(this.children);
    if (this._component.props.triggerer) {
      const $triggerers = Array.from(document.querySelectorAll(this._component.props.triggerer));
      $triggerers.forEach(($triggerer) => {
        $triggerer.addEventListener("click", (e) => {
          this.open();
        });
      });
    }
  }
  static get properties() {
    return __SComponentUtils.properties({}, SSidePanelComponentInterface);
  }
  static get styles() {
    return css`
            ${unsafeCSS(__css)}
        `;
  }
  set active(value) {
    this._active = value;
    if (value && this.constructor._activePanels.indexOf(this) === -1) {
      this.constructor._activePanels.push(this);
    }
    if (value) {
      this.setAttribute("active", true);
    } else
      this.removeAttribute("active");
    this.requestUpdate();
  }
  get active() {
    return this._active;
  }
  firstUpdated() {
    this._$container = this.querySelector(".s-side-panel__container");
    this._$nodes.forEach(($node) => {
      var _a;
      (_a = this._$container) === null || _a === void 0 ? void 0 : _a.appendChild($node);
    });
  }
  createRenderRoot() {
    return this;
  }
  open() {
    this.active = true;
  }
  close() {
    this.active = false;
  }
  render() {
    return html`
            ${this.overlay ? html` <div class="${this._component.className("__overlay")}"></div> ` : ""}
            <div class="${this._component.className("__container")}"></div>
        `;
  }
}
SSidePanel._activePanels = [];
__decorate([
  property()
], SSidePanel.prototype, "overlay", void 0);
function webcomponent(props = {}, tagName = "s-side-panel") {
  __SComponentUtils.setDefaultProps(tagName, props);
  customElements.define(tagName, SSidePanel);
}
export default SSidePanel;
export {webcomponent};
