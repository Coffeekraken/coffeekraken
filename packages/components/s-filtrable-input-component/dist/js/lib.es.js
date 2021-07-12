import * as riot from "riot";
import {v4} from "uuid";
import __SPromise from "@coffeekraken/s-promise";
import __SRawHtmlComponent from "@coffeekraken/s-raw-html-component";
import __SInterface from "@coffeekraken/s-interface";
import __clone from "lodash.clone";
import __deepClone from "lodash.clonedeep";
import __SComponent from "@coffeekraken/s-component-utils";
import React from "react";
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
class SHighlightJsComponentInterface extends __SInterface {
}
SHighlightJsComponentInterface.definition = {
  value: {
    type: "String",
    default: ""
  },
  noItemText: {
    type: "String",
    default: "No item to display"
  },
  filtrable: {
    type: {
      type: "Array<String>",
      splitChars: [","]
    },
    default: []
  },
  closeTimeout: {
    type: "Number",
    default: 200
  },
  interactive: {
    type: "Boolean",
    default: false
  },
  notSelectable: {
    type: "Boolean",
    default: false
  },
  maxItems: {
    type: "Number",
    default: 25
  }
};
function clone(object, settings = {}) {
  settings = Object.assign({deep: false}, settings);
  if (settings.deep) {
    return __deepClone(object);
  }
  return __clone(object);
}
function scrollTop() {
  return window.pageYOffset || document.scrollTop || document.body.scrollTop;
}
function offset(elm) {
  const box = elm.getBoundingClientRect(), body = document.body, docEl = document.documentElement, scrollTop2 = window.pageYOffset || docEl.scrollTop || body.scrollTop, scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft, clientTop = docEl.clientTop || body.clientTop || 0, clientLeft = docEl.clientLeft || body.clientLeft || 0, top = box.top + scrollTop2 - clientTop, left = box.left + scrollLeft - clientLeft;
  return {
    top: Math.round(top),
    left: Math.round(left)
  };
}
function fromElementTopToViewportBottom(elm) {
  const offsets = offset(elm);
  const scrollTop$1 = scrollTop();
  const viewportHeight = window.innerHeight;
  const distance = viewportHeight - offsets.top + scrollTop$1;
  return distance;
}
function camelize(text) {
  let res = "";
  const reg = /(?:^|[_-\s])(\w)/g;
  res = text.replace(reg, function(_, c) {
    return c ? c.toUpperCase() : "";
  });
  res = res.substr(0, 1).toLowerCase() + res.slice(1);
  return res.trim();
}
function autoCast(string) {
  if (typeof string !== "string")
    return string;
  if (string.substr(0, 1) === "'" && string.substr(-1) === "'") {
    return string.substr(1, string.length - 2);
  }
  const presumedNumber = parseFloat(string);
  if (!isNaN(presumedNumber)) {
    if (presumedNumber.toString() === string) {
      return presumedNumber;
    }
  }
  if (window[string]) {
    return string;
  }
  try {
    const obj = eval(`(${string})`);
    return obj;
  } catch (e) {
    return string;
  }
}
function getStyleProperty(elm, property) {
  setTimeout(() => {
    elm._sComputedStyle = null;
  });
  const computed = elm._sComputedStyle || window.getComputedStyle(elm);
  elm._sComputedStyle = computed;
  const prefixes = ["", "webkit-", "moz-", "ms-", "o-", "khtml-"];
  for (let i = 0; i < prefixes.length; i++) {
    const prefix = prefixes[i];
    const value = computed[camelize(`${prefix}${property}`)];
    if (value && value.trim() !== "")
      return autoCast(value);
  }
  return null;
}
function fromElementTopToViewportTop(elm) {
  const offsets = offset(elm);
  const scrollTop$1 = scrollTop();
  return offsets.top - scrollTop$1;
}
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
    for (var k2 in _modifier) {
      if (_modifier[k2] === key)
        hotkeys[k2] = false;
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
    for (var k2 in _modifier) {
      if (_modifier[k2] === key)
        hotkeys[k2] = true;
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
        for (var a2 = 0; a2 < keyShortcut.length; a2++) {
          _downKeysCurrent.push(code(keyShortcut[a2]));
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
function stripTags(html) {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}
function onScrollEnd($elm, callback, settings) {
  const finalSettings = Object.assign({offset: 20, once: false, times: -1}, settings !== null && settings !== void 0 ? settings : {});
  let isBody = false;
  let $scrollListenedElm = $elm;
  let $scrollHeightElm = $elm;
  if ($elm === window.document.body) {
    isBody = true;
    $scrollListenedElm = document;
    $scrollHeightElm = window.document.body;
  } else if ($elm === window.document) {
    isBody = true;
    $elm = window.document.body;
    $scrollHeightElm = window.document.body;
  }
  let active = true, count = 0;
  const internalCallback = (e) => {
    let fullHeight, viewportHeight, scrollTop2;
    if (isBody) {
      viewportHeight = window.innerHeight;
      scrollTop2 = $scrollHeightElm.scrollTop;
      fullHeight = Math.max(window.document.body.scrollHeight, window.document.documentElement.scrollHeight, window.document.body.offsetHeight, window.document.documentElement.offsetHeight, window.document.body.clientHeight, window.document.documentElement.clientHeight);
    } else {
      viewportHeight = $scrollHeightElm.scrollHeight;
      scrollTop2 = $scrollHeightElm.scrollTop;
      fullHeight = $scrollHeightElm.scrollHeight;
    }
    if (active && scrollTop2 + viewportHeight >= fullHeight - finalSettings.offset) {
      callback();
      count++;
      if (finalSettings.once) {
        $scrollListenedElm.removeEventListener("scroll", internalCallback);
        active = false;
      } else if (finalSettings.times > 0 && count >= finalSettings.times) {
        $scrollListenedElm.removeEventListener("scroll", internalCallback);
        active = false;
      }
    } else if ($scrollHeightElm.offsetHeight + $scrollHeightElm.scrollTop < $scrollHeightElm.scrollHeight - finalSettings.offset) {
      active = true;
    }
  };
  $scrollListenedElm.addEventListener("scroll", internalCallback);
}
const Component = {
  "css": ``,
  "exports": {
    $container: void 0,
    $list: void 0,
    $input: void 0,
    $itemTemplateElm: void 0,
    $noItemTemplateElm: void 0,
    $loadingTemplateElm: void 0,
    state: {
      itemTemplate: void 0,
      noItemTemplate: void 0,
      loadingTemplate: void 0,
      preselectedItemIdx: -1,
      selectedItemIdx: -1,
      displayedMaxItems: 0,
      value: "",
      isActive: false,
      isLoading: false,
      items: [],
      filteredItems: []
    },
    onBeforeMount() {
      this.component = new __SComponent(this.root, this.props, {
        interface: SHighlightJsComponentInterface
      });
      this.state.displayedMaxItems = this.component.props.maxItems;
      this.$itemTemplateElm = this.$("template#item");
      this.$noItemTemplateElm = this.$("template#no-item");
      this.$loadingTemplateElm = this.$("template#loading");
      this.$input = this.$("input");
      if (this.component.props.defaultStyle) {
        this.$input.classList.add("s-form-input");
      }
      if (this.$loadingTemplateElm) {
        this.state.loadingTemplate = this.$loadingTemplateElm.innerHTML;
      } else {
        this.state.loadingTemplate = `
              <div class="${this.component.className("__loading")}">
                  {{value}}
              </div>
          `;
      }
      if (this.$itemTemplateElm) {
        this.state.itemTemplate = this.$itemTemplateElm.innerHTML;
      } else {
        this.state.itemTemplate = `
              <div class="${this.component.className("__item")}">
                  {{value}}
              </div>
          `;
      }
      if (this.$noItemTemplateElm) {
        this.state.noItemTemplate = this.$noItemTemplateElm.innerHTML;
      } else {
        this.state.noItemTemplate = `
              <div class="${this.component.className("__no-item")}"> 
                  ${this.component.props.noItemText}
              </div>
          `;
      }
      if (!this.$input) {
        throw new Error(`<red>[s-filtrable-input]</red> In order to work you MUST have a valid input tag inside your s-filtrable-input component`);
      }
      this.$input.addEventListener("keyup", (e) => {
        const value = e.target.value;
        this.update({
          value,
          displayedMaxItems: this.component.props.maxItems
        });
        this.filterItems();
      });
      this.$input.classList.add(this.component.className("__input"));
      this.root.innerHTML = "";
    },
    onMounted() {
      this.$container = this.root.children[0];
      this.$list = this.root.querySelector("ul");
      this.root.prepend(this.$input);
      this.filterItems();
      __SRawHtmlComponent.mount();
      document.addEventListener("scroll", this._updateListSizeAndPosition);
      this.$input.addEventListener("focus", (e) => {
        this.update({
          isActive: true
        });
        this.filterItems();
        this._updateListSizeAndPosition();
      });
      this._updateListSizeAndPosition();
      onScrollEnd(this.$list, () => {
        var _a;
        this.update({
          displayedMaxItems: ((_a = this.state.displayedMaxItems) != null ? _a : 0) + this.component.props.maxItems
        });
        this.filterItems(false);
      });
      hotkey("escape").on("press", (e) => {
        e.preventDefault();
        if (!this.state.isActive)
          return;
        this.close();
      });
      hotkey("up").on("press", (e) => {
        e.preventDefault();
        if (!this.state.isActive)
          return;
        this.update({
          preselectedItemIdx: this.state.preselectedItemIdx > 0 ? this.state.preselectedItemIdx - 1 : 0
        });
        const $item = this.$list.children[this.state.preselectedItemIdx];
        $item.focus();
      });
      hotkey("down").on("press", (e) => {
        e.preventDefault();
        if (!this.state.isActive)
          return;
        this.update({
          preselectedItemIdx: this.state.preselectedItemIdx >= this.state.filteredItems.length - 1 ? this.state.filteredItems.length - 1 : this.state.preselectedItemIdx + 1
        });
        const $item = this.$list.children[this.state.preselectedItemIdx];
        $item.focus();
      });
      hotkey("return").on("press", (e) => {
        if (!this.state.isActive)
          return;
        this._validateAndClose();
      });
    },
    get selectedItem() {
      if (this.state.selectedItemIdx === -1)
        return;
      return this.state.filteredItems[this.state.selectedItemIdx];
    },
    get preselectedItem() {
      if (this.state.preselectedItemIdx === -1)
        return;
      return this.state.filteredItems[this.state.preselectedItemIdx];
    },
    _validateAndClose() {
      if (!this.preselectedItem)
        return;
      if (this.preselectedItem && !this.preselectedItem[this.component.props.value]) {
        throw new Error(`<red>[s-filtrable-input]</red> Sorry but the property "<yellow>${this.component.props.value}</yellow>" does not exists on your selected item`);
      }
      this.$input.value = stripTags(this.preselectedItem[this.component.props.value]);
      this.update({
        selectedItemIdx: this.state.preselectedItemIdx,
        value: this.$input.value
      });
      setTimeout(() => {
        this.close();
      }, this.component.props.closeTimeout);
    },
    close() {
      this.$input.focus();
      this.$input.blur();
      this.update({
        isActive: false
      });
    },
    _selectAndValidate(idx) {
      this._setPreselectedItemIdx(idx);
      this._validateAndClose();
    },
    _setPreselectedItemIdx(idx) {
      if (this.component.props.notSelectable)
        return;
      this.update({
        preselectedItemIdx: idx
      });
    },
    _updateListSizeAndPosition() {
      if (!this.state.isActive)
        return;
      const marginTop = getStyleProperty(this.$list, "marginTop");
      getStyleProperty(this.$list, "marginLeft");
      getStyleProperty(this.$list, "marginRight");
      const marginBottom = getStyleProperty(this.$list, "marginBottom");
      const distanceTop = fromElementTopToViewportTop(this.$input);
      const distanceBottom = fromElementTopToViewportBottom(this.$input) - this.$input.clientHeight;
      let maxHeight;
      if (distanceTop > distanceBottom) {
        this.$container.classList.add("s-filtrable-input--top");
        this.$list.style.top = `auto`;
        this.$list.style.bottom = `calc(100% - ${marginBottom})`;
        maxHeight = distanceTop - parseInt(marginTop);
      } else {
        this.$container.classList.remove("s-filtrable-input--top");
        this.$list.style.bottom = `auto`;
        this.$list.style.top = `calc(100% - ${marginTop})`;
        maxHeight = distanceBottom - parseInt(marginBottom);
      }
      this.$list.style.maxHeight = `${maxHeight}px`;
    },
    async filterItems(needUpdate = true) {
      let items = this.state.items;
      if (needUpdate) {
        try {
          this.update({
            isLoading: true
          });
          const res = await this.component.dispatchSyncEvent("update", {
            value: this.$input.value
          });
          if (res && res.length)
            items = res;
          this.update({
            items: res,
            isLoading: false
          });
        } catch (e) {
        }
      }
      let matchedItemsCount = 0;
      const filteredItems = items.map((item) => clone(item)).filter((item) => {
        if (matchedItemsCount >= this.state.displayedMaxItems)
          return false;
        if (!this.component.props.filtrable.length)
          return true;
        let matchFilter = false;
        for (let i = 0; i < Object.keys(item).length; i++) {
          const propName = Object.keys(item)[i], propValue = item[propName];
          if (typeof propValue !== "string")
            continue;
          if (this.component.props.filtrable.indexOf(propName) !== -1) {
            const reg = new RegExp(this.state.value, "gi");
            if (propValue.match(reg)) {
              matchFilter = true;
              if (this.state.value && this.state.value !== "") {
                const reg2 = new RegExp(this.state.value, "gi");
                const finalString = propValue.replace(reg2, (str) => {
                  return `<span class="${this.component.className("__list-item-highlight")} s-highlight">${str}</span>`;
                });
                item[propName] = finalString;
              }
            }
          }
        }
        if (matchFilter) {
          matchedItemsCount++;
        }
        return matchFilter;
      });
      this.update({
        filteredItems
      });
    }
  },
  "template": function(template, expressionTypes, bindingTypes, getComponent) {
    return template('<ul expr0="expr0"><li expr1="expr1"></li><li expr3="expr3"></li><li expr5="expr5" hoverable></li></ul>', [
      {
        "expressions": [
          {
            "type": expressionTypes.ATTRIBUTE,
            "name": "interactive",
            "evaluate": function(scope) {
              return scope.component.props.interactive;
            }
          },
          {
            "type": expressionTypes.ATTRIBUTE,
            "name": "not-selectable",
            "evaluate": function(scope) {
              return scope.component.props.notSelectable;
            }
          }
        ]
      },
      {
        "redundantAttribute": "expr0",
        "selector": "[expr0]",
        "expressions": [
          {
            "type": expressionTypes.ATTRIBUTE,
            "name": "class",
            "evaluate": function(scope) {
              return scope.component.className("__list", "s-list:interactive");
            }
          }
        ]
      },
      {
        "type": bindingTypes.IF,
        "evaluate": function(scope) {
          return scope.state.isLoading;
        },
        "redundantAttribute": "expr1",
        "selector": "[expr1]",
        "template": template('<s-raw-html expr2="expr2"></s-raw-html>', [
          {
            "expressions": [
              {
                "type": expressionTypes.ATTRIBUTE,
                "name": "class",
                "evaluate": function(scope) {
                  return scope.component.className("__list-item __list-loading");
                }
              }
            ]
          },
          {
            "type": bindingTypes.TAG,
            "getComponent": getComponent,
            "evaluate": function(scope) {
              return "s-raw-html";
            },
            "slots": [],
            "attributes": [
              {
                "type": expressionTypes.ATTRIBUTE,
                "name": "html",
                "evaluate": function(scope) {
                  return scope.component.compileMustache(scope.state.loadingTemplate, {
                    value: scope.state.value
                  });
                }
              }
            ],
            "redundantAttribute": "expr2",
            "selector": "[expr2]"
          }
        ])
      },
      {
        "type": bindingTypes.IF,
        "evaluate": function(scope) {
          return !scope.state.isLoading && scope.state.filteredItems.length <= 0;
        },
        "redundantAttribute": "expr3",
        "selector": "[expr3]",
        "template": template('<s-raw-html expr4="expr4"></s-raw-html>', [
          {
            "expressions": [
              {
                "type": expressionTypes.ATTRIBUTE,
                "name": "class",
                "evaluate": function(scope) {
                  return scope.component.className("__list-item __list-no-item");
                }
              }
            ]
          },
          {
            "type": bindingTypes.TAG,
            "getComponent": getComponent,
            "evaluate": function(scope) {
              return "s-raw-html";
            },
            "slots": [],
            "attributes": [
              {
                "type": expressionTypes.ATTRIBUTE,
                "name": "html",
                "evaluate": function(scope) {
                  return scope.component.compileMustache(scope.state.noItemTemplate, {
                    value: scope.state.value
                  });
                }
              }
            ],
            "redundantAttribute": "expr4",
            "selector": "[expr4]"
          }
        ])
      },
      {
        "type": bindingTypes.EACH,
        "getKey": null,
        "condition": function(scope) {
          return !scope.state.isLoading && scope.state.filteredItems.length;
        },
        "template": template('<s-raw-html expr6="expr6"></s-raw-html>', [
          {
            "expressions": [
              {
                "type": expressionTypes.ATTRIBUTE,
                "name": "style",
                "evaluate": function(scope) {
                  return [
                    "z-index: ",
                    999999999 - scope.idx
                  ].join("");
                }
              },
              {
                "type": expressionTypes.ATTRIBUTE,
                "name": "tabindex",
                "evaluate": function(scope) {
                  return scope.state.isActive ? scope.idx : -1;
                }
              },
              {
                "type": expressionTypes.EVENT,
                "name": "onfocus",
                "evaluate": function(scope) {
                  return () => scope._setPreselectedItemIdx(scope.idx);
                }
              },
              {
                "type": expressionTypes.EVENT,
                "name": "ondblclick",
                "evaluate": function(scope) {
                  return () => scope._selectAndValidate(scope.idx);
                }
              },
              {
                "type": expressionTypes.ATTRIBUTE,
                "name": "class",
                "evaluate": function(scope) {
                  return scope.component.className("__list-item") + " " + (scope.state.selectedItemIdx === scope.idx ? "active" : "");
                }
              }
            ]
          },
          {
            "type": bindingTypes.TAG,
            "getComponent": getComponent,
            "evaluate": function(scope) {
              return "s-raw-html";
            },
            "slots": [],
            "attributes": [
              {
                "type": expressionTypes.ATTRIBUTE,
                "name": "html",
                "evaluate": function(scope) {
                  return scope.component.renderHandlebars(scope.state.itemTemplate, scope.item);
                }
              }
            ],
            "redundantAttribute": "expr6",
            "selector": "[expr6]"
          }
        ]),
        "redundantAttribute": "expr5",
        "selector": "[expr5]",
        "itemName": "item",
        "indexName": "idx",
        "evaluate": function(scope) {
          return scope.state.filteredItems;
        }
      }
    ]);
  },
  "name": "s-filtrable-input"
};
riot.register("s-filtrable-input", Component);
querySelectorLive("s-filtrable-input:not([s-mounted])", ($elm) => {
  const id = $elm.id || "s-filtrable-input-" + uniqid();
  $elm.setAttribute("id", id);
  riot.mount("#" + id);
});
Component.mount = () => {
  riot.mount("s-filtrable-input");
};
class MyComponent extends React.Component {
  render() {
    return /* @__PURE__ */ React.createElement("s-filtrable-input", {
      ...this.props
    }, this.props.children);
  }
  componentDidMount() {
    Component.mount();
  }
}
if (!window.env)
  window.env = {SUGAR: {}};
window.env.SUGAR = JSON.parse('{"ENVIRONMENT":"development"}');
export default Component;
export {SHighlightJsComponentInterface as interface, MyComponent as reactComponent};
