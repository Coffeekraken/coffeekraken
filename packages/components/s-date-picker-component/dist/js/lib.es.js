import {css, unsafeCSS, html as html$2} from "lit";
import __SInterface from "@coffeekraken/s-interface";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
import __SComponentUtils, {SLitElement} from "@coffeekraken/s-component-utils";
import __pikaday from "pikaday";
import __moment from "moment";
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
var _a$1, _b$1, _c$1, _d, _e;
var _f;
{
  console.warn("lit-html is in dev mode. Not recommended for production!");
}
const wrap = ((_a$1 = window.ShadyDOM) === null || _a$1 === void 0 ? void 0 : _a$1.inUse) && ((_b$1 = window.ShadyDOM) === null || _b$1 === void 0 ? void 0 : _b$1.noPatch) === true ? window.ShadyDOM.wrap : (node) => node;
const trustedTypes = globalThis.trustedTypes;
const policy = trustedTypes ? trustedTypes.createPolicy("lit-html", {
  createHTML: (s) => s
}) : void 0;
const identityFunction = (value) => value;
const noopSanitizer = (_node, _name, _type) => identityFunction;
const createSanitizer = (node, name, type) => {
  return sanitizerFactoryInternal();
};
const boundAttributeSuffix = "$lit$";
const marker = `lit$${String(Math.random()).slice(9)}$`;
const markerMatch = "?" + marker;
const nodeMarker = `<${markerMatch}>`;
const d = document;
const createMarker = (v = "") => d.createComment(v);
const isPrimitive = (value) => value === null || typeof value != "object" && typeof value != "function";
const isArray = Array.isArray;
const isIterable = (value) => {
  var _a2;
  return isArray(value) || typeof ((_a2 = value) === null || _a2 === void 0 ? void 0 : _a2[Symbol.iterator]) === "function";
};
const SPACE_CHAR = `[ 	
\f\r]`;
const ATTR_VALUE_CHAR = `[^ 	
\f\r"'\`<>=]`;
const NAME_CHAR = `[^\\s"'>=/]`;
const textEndRegex = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
const COMMENT_START = 1;
const TAG_NAME = 2;
const DYNAMIC_TAG_NAME = 3;
const commentEndRegex = /-->/g;
const comment2EndRegex = />/g;
const tagEndRegex = new RegExp(`>|${SPACE_CHAR}(?:(${NAME_CHAR}+)(${SPACE_CHAR}*=${SPACE_CHAR}*(?:${ATTR_VALUE_CHAR}|("|')|))|$)`, "g");
const ENTIRE_MATCH = 0;
const ATTRIBUTE_NAME = 1;
const SPACES_AND_EQUALS = 2;
const QUOTE_CHAR = 3;
const singleQuoteAttrEndRegex = /'/g;
const doubleQuoteAttrEndRegex = /"/g;
const rawTextElement = /^(?:script|style|textarea)$/i;
const HTML_RESULT = 1;
const SVG_RESULT = 2;
const ATTRIBUTE_PART = 1;
const CHILD_PART = 2;
const PROPERTY_PART = 3;
const BOOLEAN_ATTRIBUTE_PART = 4;
const EVENT_PART = 5;
const ELEMENT_PART = 6;
const COMMENT_PART = 7;
const tag = (type) => (strings, ...values) => {
  if (strings.some((s) => s === void 0)) {
    console.warn("Some template strings are undefined.\nThis is probably caused by illegal octal escape sequences.");
  }
  return {
    ["_$litType$"]: type,
    strings,
    values
  };
};
const html$1 = tag(HTML_RESULT);
const noChange = Symbol.for("lit-noChange");
const nothing = Symbol.for("lit-nothing");
const templateCache = new WeakMap();
const walker = d.createTreeWalker(d, 129, null, false);
let sanitizerFactoryInternal = noopSanitizer;
const getTemplateHtml = (strings, type) => {
  const l = strings.length - 1;
  const attrNames = [];
  let html2 = type === SVG_RESULT ? "<svg>" : "";
  let rawTextEndRegex;
  let regex = textEndRegex;
  for (let i = 0; i < l; i++) {
    const s = strings[i];
    let attrNameEndIndex = -1;
    let attrName;
    let lastIndex = 0;
    let match;
    while (lastIndex < s.length) {
      regex.lastIndex = lastIndex;
      match = regex.exec(s);
      if (match === null) {
        break;
      }
      lastIndex = regex.lastIndex;
      if (regex === textEndRegex) {
        if (match[COMMENT_START] === "!--") {
          regex = commentEndRegex;
        } else if (match[COMMENT_START] !== void 0) {
          regex = comment2EndRegex;
        } else if (match[TAG_NAME] !== void 0) {
          if (rawTextElement.test(match[TAG_NAME])) {
            rawTextEndRegex = new RegExp(`</${match[TAG_NAME]}`, "g");
          }
          regex = tagEndRegex;
        } else if (match[DYNAMIC_TAG_NAME] !== void 0) {
          regex = tagEndRegex;
        }
      } else if (regex === tagEndRegex) {
        if (match[ENTIRE_MATCH] === ">") {
          regex = rawTextEndRegex !== null && rawTextEndRegex !== void 0 ? rawTextEndRegex : textEndRegex;
          attrNameEndIndex = -1;
        } else if (match[ATTRIBUTE_NAME] === void 0) {
          attrNameEndIndex = -2;
        } else {
          attrNameEndIndex = regex.lastIndex - match[SPACES_AND_EQUALS].length;
          attrName = match[ATTRIBUTE_NAME];
          regex = match[QUOTE_CHAR] === void 0 ? tagEndRegex : match[QUOTE_CHAR] === '"' ? doubleQuoteAttrEndRegex : singleQuoteAttrEndRegex;
        }
      } else if (regex === doubleQuoteAttrEndRegex || regex === singleQuoteAttrEndRegex) {
        regex = tagEndRegex;
      } else if (regex === commentEndRegex || regex === comment2EndRegex) {
        regex = textEndRegex;
      } else {
        regex = tagEndRegex;
        rawTextEndRegex = void 0;
      }
    }
    {
      console.assert(attrNameEndIndex === -1 || regex === tagEndRegex || regex === singleQuoteAttrEndRegex || regex === doubleQuoteAttrEndRegex, "unexpected parse state B");
    }
    const end = regex === tagEndRegex && strings[i + 1].startsWith("/>") ? " " : "";
    html2 += regex === textEndRegex ? s + nodeMarker : attrNameEndIndex >= 0 ? (attrNames.push(attrName), s.slice(0, attrNameEndIndex) + boundAttributeSuffix + s.slice(attrNameEndIndex)) + marker + end : s + marker + (attrNameEndIndex === -2 ? (attrNames.push(void 0), i) : end);
  }
  const htmlResult = html2 + (strings[l] || "<?>") + (type === SVG_RESULT ? "</svg>" : "");
  return [
    policy !== void 0 ? policy.createHTML(htmlResult) : htmlResult,
    attrNames
  ];
};
class Template {
  constructor({strings, ["_$litType$"]: type}, options) {
    this.parts = [];
    let node;
    let nodeIndex = 0;
    let attrNameIndex = 0;
    const partCount = strings.length - 1;
    const parts = this.parts;
    const [html2, attrNames] = getTemplateHtml(strings, type);
    this.el = Template.createElement(html2, options);
    walker.currentNode = this.el.content;
    if (type === SVG_RESULT) {
      const content = this.el.content;
      const svgElement = content.firstChild;
      svgElement.remove();
      content.append(...svgElement.childNodes);
    }
    while ((node = walker.nextNode()) !== null && parts.length < partCount) {
      if (node.nodeType === 1) {
        if (node.hasAttributes()) {
          const attrsToRemove = [];
          for (const name of node.getAttributeNames()) {
            if (name.endsWith(boundAttributeSuffix) || name.startsWith(marker)) {
              const realName = attrNames[attrNameIndex++];
              attrsToRemove.push(name);
              if (realName !== void 0) {
                const value = node.getAttribute(realName.toLowerCase() + boundAttributeSuffix);
                const statics = value.split(marker);
                const m = /([.?@])?(.*)/.exec(realName);
                parts.push({
                  type: ATTRIBUTE_PART,
                  index: nodeIndex,
                  name: m[2],
                  strings: statics,
                  ctor: m[1] === "." ? PropertyPart : m[1] === "?" ? BooleanAttributePart : m[1] === "@" ? EventPart : AttributePart
                });
              } else {
                parts.push({
                  type: ELEMENT_PART,
                  index: nodeIndex
                });
              }
            }
          }
          for (const name of attrsToRemove) {
            node.removeAttribute(name);
          }
        }
        if (rawTextElement.test(node.tagName)) {
          const strings2 = node.textContent.split(marker);
          const lastIndex = strings2.length - 1;
          if (lastIndex > 0) {
            node.textContent = trustedTypes ? trustedTypes.emptyScript : "";
            for (let i = 0; i < lastIndex; i++) {
              node.append(strings2[i], createMarker());
              walker.nextNode();
              parts.push({type: CHILD_PART, index: ++nodeIndex});
            }
            node.append(strings2[lastIndex], createMarker());
          }
        }
      } else if (node.nodeType === 8) {
        const data = node.data;
        if (data === markerMatch) {
          parts.push({type: CHILD_PART, index: nodeIndex});
        } else {
          let i = -1;
          while ((i = node.data.indexOf(marker, i + 1)) !== -1) {
            parts.push({type: COMMENT_PART, index: nodeIndex});
            i += marker.length - 1;
          }
        }
      }
      nodeIndex++;
    }
  }
  static createElement(html2, _options) {
    const el = d.createElement("template");
    el.innerHTML = html2;
    return el;
  }
}
function resolveDirective(part, value, parent = part, attributeIndex) {
  var _a2, _b2, _c2;
  var _d2;
  if (value === noChange) {
    return value;
  }
  let currentDirective = attributeIndex !== void 0 ? (_a2 = parent.__directives) === null || _a2 === void 0 ? void 0 : _a2[attributeIndex] : parent.__directive;
  const nextDirectiveConstructor = isPrimitive(value) ? void 0 : value["_$litDirective$"];
  if ((currentDirective === null || currentDirective === void 0 ? void 0 : currentDirective.constructor) !== nextDirectiveConstructor) {
    (_b2 = currentDirective === null || currentDirective === void 0 ? void 0 : currentDirective["_$notifyDirectiveConnectionChanged"]) === null || _b2 === void 0 ? void 0 : _b2.call(currentDirective, false);
    if (nextDirectiveConstructor === void 0) {
      currentDirective = void 0;
    } else {
      currentDirective = new nextDirectiveConstructor(part);
      currentDirective._$initialize(part, parent, attributeIndex);
    }
    if (attributeIndex !== void 0) {
      ((_c2 = (_d2 = parent).__directives) !== null && _c2 !== void 0 ? _c2 : _d2.__directives = [])[attributeIndex] = currentDirective;
    } else {
      parent.__directive = currentDirective;
    }
  }
  if (currentDirective !== void 0) {
    value = resolveDirective(part, currentDirective._$resolve(part, value.values), currentDirective, attributeIndex);
  }
  return value;
}
class TemplateInstance {
  constructor(template, parent) {
    this._parts = [];
    this._$disconnectableChildren = void 0;
    this._$template = template;
    this._$parent = parent;
  }
  get _$isConnected() {
    return this._$parent._$isConnected;
  }
  _clone(options) {
    var _a2;
    const {el: {content}, parts} = this._$template;
    const fragment = ((_a2 = options === null || options === void 0 ? void 0 : options.creationScope) !== null && _a2 !== void 0 ? _a2 : d).importNode(content, true);
    walker.currentNode = fragment;
    let node = walker.nextNode();
    let nodeIndex = 0;
    let partIndex = 0;
    let templatePart = parts[0];
    while (templatePart !== void 0) {
      if (nodeIndex === templatePart.index) {
        let part;
        if (templatePart.type === CHILD_PART) {
          part = new ChildPart(node, node.nextSibling, this, options);
        } else if (templatePart.type === ATTRIBUTE_PART) {
          part = new templatePart.ctor(node, templatePart.name, templatePart.strings, this, options);
        } else if (templatePart.type === ELEMENT_PART) {
          part = new ElementPart(node, this, options);
        }
        this._parts.push(part);
        templatePart = parts[++partIndex];
      }
      if (nodeIndex !== (templatePart === null || templatePart === void 0 ? void 0 : templatePart.index)) {
        node = walker.nextNode();
        nodeIndex++;
      }
    }
    return fragment;
  }
  _update(values) {
    let i = 0;
    for (const part of this._parts) {
      if (part !== void 0) {
        if (part.strings !== void 0) {
          part._$setValue(values, part, i);
          i += part.strings.length - 2;
        } else {
          part._$setValue(values[i]);
        }
      }
      i++;
    }
  }
}
class ChildPart {
  constructor(startNode, endNode, parent, options) {
    this.type = CHILD_PART;
    this.__isConnected = true;
    this._$disconnectableChildren = void 0;
    this._$startNode = startNode;
    this._$endNode = endNode;
    this._$parent = parent;
    this.options = options;
    {
      this._textSanitizer = void 0;
    }
  }
  get _$isConnected() {
    var _a2, _b2;
    return (_b2 = (_a2 = this._$parent) === null || _a2 === void 0 ? void 0 : _a2._$isConnected) !== null && _b2 !== void 0 ? _b2 : this.__isConnected;
  }
  get parentNode() {
    return wrap(this._$startNode).parentNode;
  }
  get startNode() {
    return this._$startNode;
  }
  get endNode() {
    return this._$endNode;
  }
  _$setValue(value, directiveParent = this) {
    value = resolveDirective(this, value, directiveParent);
    if (isPrimitive(value)) {
      if (value === nothing || value == null || value === "") {
        if (this._$committedValue !== nothing) {
          this._$clear();
        }
        this._$committedValue = nothing;
      } else if (value !== this._$committedValue && value !== noChange) {
        this._commitText(value);
      }
    } else if (value["_$litType$"] !== void 0) {
      this._commitTemplateResult(value);
    } else if (value.nodeType !== void 0) {
      this._commitNode(value);
    } else if (isIterable(value)) {
      this._commitIterable(value);
    } else {
      this._commitText(value);
    }
  }
  _insert(node, ref = this._$endNode) {
    return wrap(wrap(this._$startNode).parentNode).insertBefore(node, ref);
  }
  _commitNode(value) {
    var _a2;
    if (this._$committedValue !== value) {
      this._$clear();
      if (sanitizerFactoryInternal !== noopSanitizer) {
        const parentNodeName = (_a2 = this._$startNode.parentNode) === null || _a2 === void 0 ? void 0 : _a2.nodeName;
        if (parentNodeName === "STYLE" || parentNodeName === "SCRIPT") {
          this._insert(new Text("/* lit-html will not write TemplateResults to scripts and styles */"));
          return;
        }
      }
      this._$committedValue = this._insert(value);
    }
  }
  _commitText(value) {
    const node = wrap(this._$startNode).nextSibling;
    if (node !== null && node.nodeType === 3 && (this._$endNode === null ? wrap(node).nextSibling === null : node === wrap(this._$endNode).previousSibling)) {
      {
        if (this._textSanitizer === void 0) {
          this._textSanitizer = createSanitizer();
        }
        value = this._textSanitizer(value);
      }
      node.data = value;
    } else {
      {
        const textNode = document.createTextNode("");
        this._commitNode(textNode);
        if (this._textSanitizer === void 0) {
          this._textSanitizer = createSanitizer();
        }
        value = this._textSanitizer(value);
        textNode.data = value;
      }
    }
    this._$committedValue = value;
  }
  _commitTemplateResult(result) {
    var _a2;
    const {values, ["_$litType$"]: type} = result;
    const template = typeof type === "number" ? this._$getTemplate(result) : (type.el === void 0 && (type.el = Template.createElement(type.h, this.options)), type);
    if (((_a2 = this._$committedValue) === null || _a2 === void 0 ? void 0 : _a2._$template) === template) {
      this._$committedValue._update(values);
    } else {
      const instance = new TemplateInstance(template, this);
      const fragment = instance._clone(this.options);
      instance._update(values);
      this._commitNode(fragment);
      this._$committedValue = instance;
    }
  }
  _$getTemplate(result) {
    let template = templateCache.get(result.strings);
    if (template === void 0) {
      templateCache.set(result.strings, template = new Template(result));
    }
    return template;
  }
  _commitIterable(value) {
    if (!isArray(this._$committedValue)) {
      this._$committedValue = [];
      this._$clear();
    }
    const itemParts = this._$committedValue;
    let partIndex = 0;
    let itemPart;
    for (const item of value) {
      if (partIndex === itemParts.length) {
        itemParts.push(itemPart = new ChildPart(this._insert(createMarker()), this._insert(createMarker()), this, this.options));
      } else {
        itemPart = itemParts[partIndex];
      }
      itemPart._$setValue(item);
      partIndex++;
    }
    if (partIndex < itemParts.length) {
      this._$clear(itemPart && wrap(itemPart._$endNode).nextSibling, partIndex);
      itemParts.length = partIndex;
    }
  }
  _$clear(start = wrap(this._$startNode).nextSibling, from) {
    var _a2;
    (_a2 = this._$notifyConnectionChanged) === null || _a2 === void 0 ? void 0 : _a2.call(this, false, true, from);
    while (start && start !== this._$endNode) {
      const n = wrap(start).nextSibling;
      wrap(start).remove();
      start = n;
    }
  }
  setConnected(isConnected) {
    var _a2;
    if (this._$parent === void 0) {
      this.__isConnected = isConnected;
      (_a2 = this._$notifyConnectionChanged) === null || _a2 === void 0 ? void 0 : _a2.call(this, isConnected);
    } else {
      throw new Error("part.setConnected() may only be called on a RootPart returned from render().");
    }
  }
}
class AttributePart {
  constructor(element, name, strings, parent, options) {
    this.type = ATTRIBUTE_PART;
    this._$committedValue = nothing;
    this._$disconnectableChildren = void 0;
    this.element = element;
    this.name = name;
    this._$parent = parent;
    this.options = options;
    if (strings.length > 2 || strings[0] !== "" || strings[1] !== "") {
      this._$committedValue = new Array(strings.length - 1).fill(nothing);
      this.strings = strings;
    } else {
      this._$committedValue = nothing;
    }
    {
      this._sanitizer = void 0;
    }
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$isConnected() {
    return this._$parent._$isConnected;
  }
  _$setValue(value, directiveParent = this, valueIndex, noCommit) {
    const strings = this.strings;
    let change = false;
    if (strings === void 0) {
      value = resolveDirective(this, value, directiveParent, 0);
      change = !isPrimitive(value) || value !== this._$committedValue && value !== noChange;
      if (change) {
        this._$committedValue = value;
      }
    } else {
      const values = value;
      value = strings[0];
      let i, v;
      for (i = 0; i < strings.length - 1; i++) {
        v = resolveDirective(this, values[valueIndex + i], directiveParent, i);
        if (v === noChange) {
          v = this._$committedValue[i];
        }
        change || (change = !isPrimitive(v) || v !== this._$committedValue[i]);
        if (v === nothing) {
          value = nothing;
        } else if (value !== nothing) {
          value += (v !== null && v !== void 0 ? v : "") + strings[i + 1];
        }
        this._$committedValue[i] = v;
      }
    }
    if (change && !noCommit) {
      this._commitValue(value);
    }
  }
  _commitValue(value) {
    if (value === nothing) {
      wrap(this.element).removeAttribute(this.name);
    } else {
      {
        if (this._sanitizer === void 0) {
          this._sanitizer = sanitizerFactoryInternal(this.element, this.name);
        }
        value = this._sanitizer(value !== null && value !== void 0 ? value : "");
      }
      wrap(this.element).setAttribute(this.name, value !== null && value !== void 0 ? value : "");
    }
  }
}
class PropertyPart extends AttributePart {
  constructor() {
    super(...arguments);
    this.type = PROPERTY_PART;
  }
  _commitValue(value) {
    {
      if (this._sanitizer === void 0) {
        this._sanitizer = sanitizerFactoryInternal(this.element, this.name);
      }
      value = this._sanitizer(value);
    }
    this.element[this.name] = value === nothing ? void 0 : value;
  }
}
class BooleanAttributePart extends AttributePart {
  constructor() {
    super(...arguments);
    this.type = BOOLEAN_ATTRIBUTE_PART;
  }
  _commitValue(value) {
    if (value && value !== nothing) {
      wrap(this.element).setAttribute(this.name, "");
    } else {
      wrap(this.element).removeAttribute(this.name);
    }
  }
}
class EventPart extends AttributePart {
  constructor() {
    super(...arguments);
    this.type = EVENT_PART;
  }
  _$setValue(newListener, directiveParent = this) {
    var _a2;
    newListener = (_a2 = resolveDirective(this, newListener, directiveParent, 0)) !== null && _a2 !== void 0 ? _a2 : nothing;
    if (newListener === noChange) {
      return;
    }
    const oldListener = this._$committedValue;
    const shouldRemoveListener = newListener === nothing && oldListener !== nothing || newListener.capture !== oldListener.capture || newListener.once !== oldListener.once || newListener.passive !== oldListener.passive;
    const shouldAddListener = newListener !== nothing && (oldListener === nothing || shouldRemoveListener);
    if (shouldRemoveListener) {
      this.element.removeEventListener(this.name, this, oldListener);
    }
    if (shouldAddListener) {
      this.element.addEventListener(this.name, this, newListener);
    }
    this._$committedValue = newListener;
  }
  handleEvent(event) {
    var _a2, _b2;
    if (typeof this._$committedValue === "function") {
      this._$committedValue.call((_b2 = (_a2 = this.options) === null || _a2 === void 0 ? void 0 : _a2.host) !== null && _b2 !== void 0 ? _b2 : this.element, event);
    } else {
      this._$committedValue.handleEvent(event);
    }
  }
}
class ElementPart {
  constructor(element, parent, options) {
    this.element = element;
    this.type = ELEMENT_PART;
    this._$disconnectableChildren = void 0;
    this._$parent = parent;
    this.options = options;
  }
  get _$isConnected() {
    return this._$parent._$isConnected;
  }
  _$setValue(value) {
    resolveDirective(this, value);
  }
}
(_d = (_c$1 = globalThis)["litHtmlPlatformSupport"]) === null || _d === void 0 ? void 0 : _d.call(_c$1, Template, ChildPart);
((_e = (_f = globalThis)["litHtmlVersions"]) !== null && _e !== void 0 ? _e : _f["litHtmlVersions"] = []).push("2.0.0-rc.4");
/**
* @license
* Copyright 2020 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
const stringsCache = new Map();
const withStatic = (coreTag) => (strings, ...values) => {
  var _a2;
  const l = values.length;
  let staticValue;
  let dynamicValue;
  const staticStrings = [];
  const dynamicValues = [];
  let i = 0;
  let hasStatics = false;
  let s;
  while (i < l) {
    s = strings[i];
    while (i < l && (dynamicValue = values[i], staticValue = (_a2 = dynamicValue) === null || _a2 === void 0 ? void 0 : _a2["_$litStatic$"]) !== void 0) {
      s += staticValue + strings[++i];
      hasStatics = true;
    }
    dynamicValues.push(dynamicValue);
    staticStrings.push(s);
    i++;
  }
  if (i === l) {
    staticStrings.push(strings[l]);
  }
  if (hasStatics) {
    const key = staticStrings.join("$$lit$$");
    strings = stringsCache.get(key);
    if (strings === void 0) {
      stringsCache.set(key, strings = staticStrings);
    }
    values = dynamicValues;
  }
  return coreTag(strings, ...values);
};
const html = withStatic(html$1);
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
const decorateProperty = ({finisher, descriptor}) => (protoOrDescriptor, name) => {
  var _a2;
  if (name !== void 0) {
    const ctor = protoOrDescriptor.constructor;
    if (descriptor !== void 0) {
      Object.defineProperty(protoOrDescriptor, name, descriptor(name));
    }
    finisher === null || finisher === void 0 ? void 0 : finisher(ctor, name);
  } else {
    const key = (_a2 = protoOrDescriptor.originalKey) !== null && _a2 !== void 0 ? _a2 : protoOrDescriptor.key;
    const info = descriptor != void 0 ? {
      kind: "method",
      placement: "prototype",
      key,
      descriptor: descriptor(protoOrDescriptor.key)
    } : {...protoOrDescriptor, key};
    if (finisher != void 0) {
      info.finisher = function(ctor) {
        finisher(ctor, key);
      };
    }
    return info;
  }
};
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
function queryAsync(selector) {
  return decorateProperty({
    descriptor: (_name) => ({
      async get() {
        var _a2;
        await this.updateComplete;
        return (_a2 = this.renderRoot) === null || _a2 === void 0 ? void 0 : _a2.querySelector(selector);
      },
      enumerable: true,
      configurable: true
    })
  });
}
var __isNode = () => {
  return typeof process !== "undefined" && process.release && process.release.name === "node";
};
var _a, _b, _c;
class SDatePickerComponentInterface extends __SInterface {
}
SDatePickerComponentInterface.definition = {
  name: {
    type: "String",
    required: true
  },
  value: {
    type: "String"
  },
  placeholder: {
    type: "String"
  },
  format: {
    type: "String",
    default: (_a = __SSugarConfig.get("datetime.dateFormat")) !== null && _a !== void 0 ? _a : "YYYY-MM-DD"
  },
  firstDay: {
    type: "Number",
    description: "Specify the first day of the week. 0 is sunday, 1 monday, etc...",
    default: 1
  },
  minDate: {
    type: "String",
    description: "the minimum/earliest date that can be selected (this should be a native Date object - e.g. new Date() or moment().toDate())"
  },
  maxDate: {
    type: "String",
    description: "the maximum/latest date that can be selected (this should be a native Date object - e.g. new Date() or moment().toDate())"
  },
  disableWeekends: {
    type: "Boolean",
    description: "disallow selection of Saturdays or Sundays",
    default: false
  },
  yearRange: {
    type: {
      type: "Array<Number>",
      splitChars: [","]
    },
    description: "number of years either side (e.g. 10) or array of upper/lower range (e.g. [1900,2015])"
  },
  rtl: {
    type: "Boolean",
    description: "reverse the calendar for right-to-left languages",
    default: !__isNode() ? ((_b = document.querySelector("html")) === null || _b === void 0 ? void 0 : _b.getAttribute("dir")) === "rtl" : false
  },
  i18n: {
    type: "String",
    description: "language defaults for month and weekday names",
    default: (_c = __SSugarConfig.get("datetime.i18n")) !== null && _c !== void 0 ? _c : {
      previousMonth: "Previous Month",
      nextMonth: "Next Month",
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      weekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    }
  },
  numberOfMonths: {
    type: "Number",
    description: "number of visible calendars",
    default: 1
  },
  events: {
    type: {
      type: "Array<String>",
      splitChars: [","]
    },
    description: `array of dates that you would like to differentiate from regular days (e.g. ['Sat Jun 28 2017', 'Sun Jun 29 2017', 'Tue Jul 01 2017',])`,
    default: []
  },
  button: {
    type: "Boolean",
    default: true
  },
  arrowIcon: {
    type: "String",
    default: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z"/></svg>'
  },
  calendarIcon: {
    type: "String",
    default: '<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="calendar-alt" class="svg-inline--fa fa-calendar-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M148 288h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm108-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 96v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96-260v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48zm-48 346V160H48v298c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z"></path></svg>'
  }
};
function plainObject(object) {
  if (!object)
    return false;
  if (typeof object !== "object")
    return false;
  if (object.constructor && object.constructor.name !== "Object")
    return false;
  if (Object.prototype.toString.call(object) !== "[object Object]")
    return false;
  if (object !== Object(object))
    return false;
  return true;
}
function __deepMerge(...args) {
  function merge(firstObj, secondObj) {
    const newObj = {};
    if (!firstObj && secondObj)
      return secondObj;
    if (!secondObj && firstObj)
      return firstObj;
    if (!firstObj && !secondObj)
      return {};
    const firstProps = Object.getOwnPropertyNames(firstObj);
    firstProps.forEach((key) => {
      const desc = Object.getOwnPropertyDescriptor(firstObj, key);
      if (desc.set || desc.get) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = firstObj[key];
      }
    });
    const secondProps = Object.getOwnPropertyNames(secondObj);
    secondProps.forEach((key) => {
      const desc = Object.getOwnPropertyDescriptor(secondObj, key);
      if (desc.set || desc.get) {
        Object.defineProperty(newObj, key, desc);
      } else if (plainObject(newObj[key]) && plainObject(secondObj[key])) {
        newObj[key] = merge(newObj[key], secondObj[key]);
      } else {
        newObj[key] = secondObj[key];
      }
    });
    return newObj;
  }
  let currentObj = {};
  for (let i = 0; i < args.length; i++) {
    const toMergeObj = args[i];
    currentObj = merge(currentObj, toMergeObj);
  }
  return currentObj;
}
function whenInteract(elm, settings) {
  return new Promise((resolve, reject) => {
    settings = __deepMerge({
      mouse: {
        over: true,
        out: true,
        click: true
      },
      touch: {
        start: true,
        end: true
      },
      focus: true
    }, settings !== null && settings !== void 0 ? settings : {});
    function interacted(interaction) {
      resolve(interaction);
      elm.removeEventListener("mouseover", mouseover);
      elm.removeEventListener("mouseout", mouseout);
      elm.removeEventListener("click", click);
      elm.removeEventListener("touchstart", touchstart);
      elm.removeEventListener("touchend", touchend);
      elm.removeEventListener("focus", focus);
      elm.removeEventListener("focusin", focus);
    }
    function mouseover(e) {
      interacted("mouseover");
    }
    if (settings.mouse === true || settings.mouse.over) {
      elm.addEventListener("mouseover", mouseover);
    }
    function mouseout(e) {
      interacted("mouseout");
    }
    if (settings.mouse === true || settings.mouse.out) {
      elm.addEventListener("mouseout", mouseout);
    }
    function click(e) {
      interacted("click");
    }
    if (settings.mouse === true || settings.mouse.click) {
      elm.addEventListener("click", click);
    }
    function touchstart(e) {
      interacted("touchstart");
    }
    if (settings.touch === true || settings.touch.start) {
      elm.addEventListener("touchstart", touchstart);
    }
    function touchend(e) {
      interacted("touchend");
    }
    if (settings.touch === true || settings.touch.start) {
      elm.addEventListener("touchend", touchend);
    }
    function focus(e) {
      interacted("focus");
    }
    if (settings.focus === true) {
      elm.addEventListener("focus", focus);
      elm.addEventListener("focusin", focus);
    }
  });
}
var __css = "s-date-picker {\n    display: inline-block;\n}\n\n    s-date-picker:not([mounted]) > * {\n        /* display: none; */\n    }\n.s-date-picker {\n    display: flex;\n    width: 100%;\n}\n\n.s-date-picker__input {\n    flex-grow: 1;\n    padding: var(--s-theme-ui-datePicker-padding, 6px 12px);\n}\n.s-date-picker__button {\n    padding: var(--s-theme-ui-datePicker-padding, 6px 12px);\n}\n\ns-date-picker[default-style]:not([rtl]) .s-date-picker__input {\n            border-top-right-radius: 0;\n            border-bottom-right-radius: 0;\n        }\n\ns-date-picker[default-style]:not([rtl]) .s-date-picker__button {\n            border-top-left-radius: 0;\n            border-bottom-left-radius: 0;\n        }\n\ns-date-picker[default-style][rtl] .s-date-picker__button {\n            border-top-right-radius: 0;\n            border-bottom-right-radius: 0;\n            order: 0;\n        }\n\ns-date-picker[default-style][rtl] .s-date-picker__input {\n            border-top-left-radius: 0;\n            border-bottom-left-radius: 0;\n            order: 1;\n        }\n\n.s-date-picker__button svg {\n        height: 1em;\n    }\n\n.s-date-picker__button svg,\n        .s-date-picker__button svg > * {\n            box-shadow: 0px 0px 3px 0 hsla(calc(var(--s-theme-color-ui-h, 0) + var(--s-theme-color-ui-spin ,0)),calc((var(--s-theme-color-ui-s, 0) + var(--s-theme-color-ui-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-ui-l, 0) + -10) * 1%),var(--s-theme-color-ui-a, 1));\n        }\n";
var __themeCss = "/**\n * This theme is an example to show how you can create your own.\n */\n\n.pika-lendar {\n    width: auto;\n}\n\n.pika-single.s-pikaday {\n    color: hsla(calc(var(--s-theme-color-main-h, 0) + var(--s-theme-color-main-foreground-spin ,0)),calc((var(--s-theme-color-main-s, 0) + var(--s-theme-color-main-foreground-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-main-l, 0) + var(--s-theme-color-main-foreground-lightness-offset, 0)) * 1%),var(--s-theme-color-main-foreground-a, 1));\n    background: hsla(calc(var(--s-theme-color-main-h, 0) + var(--s-theme-color-main-surface-spin ,0)),calc((var(--s-theme-color-main-s, 0) + var(--s-theme-color-main-surface-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-main-l, 0) + var(--s-theme-color-main-surface-lightness-offset, 0)) * 1%),var(--s-theme-color-main-surface-a, 1));\n    border: 1px solid hsla(calc(var(--s-theme-color-ui-h, 0) + var(--s-theme-color-ui-border-spin ,0)),calc((var(--s-theme-color-ui-s, 0) + var(--s-theme-color-ui-border-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-ui-l, 0) + var(--s-theme-color-ui-border-lightness-offset, 0)) * 1%),var(--s-theme-color-ui-border-a, 1));box-shadow: var(--s-theme-depth-100, 0);\n    border-radius: var(--s-theme-ui-colorPicker-borderRadius, 6px);\n    padding: var(--s-theme-ui-colorPicker-padding, 6px 12px);\n}\n\n.s-pikaday .pika-label {\n    background-color: transparent;\n    color: hsla(calc(var(--s-theme-color-ui-h, 0) + var(--s-theme-color-ui-spin ,0)),calc((var(--s-theme-color-ui-s, 0) + var(--s-theme-color-ui-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-ui-l, 0) + var(--s-theme-color-ui-lightness-offset, 0)) * 1%),var(--s-theme-color-ui-a, 1));\n    top: -0.5em;\n}\n\n.s-pikaday .pika-prev,\n.s-pikaday .is-rtl .pika-next,\n.s-pikaday .pika-next,\n.s-pikaday .is-rtl .pika-prev {\n    background: none;\n    position: relative;\n    display: inline-block;\n    font-size: 0;\n    color: hsla(calc(var(--s-theme-color-ui-h, 0) + var(--s-theme-color-ui-spin ,0)),calc((var(--s-theme-color-ui-s, 0) + var(--s-theme-color-ui-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-ui-l, 0) + var(--s-theme-color-ui-lightness-offset, 0)) * 1%),var(--s-theme-color-ui-a, 1));\n    overflow: visible;\n    background: red;\n    opacity: 1;\n    width: 1em;\n    height: 1em;\n    opacity: 0.7;\n}\n\n.s-pikaday .pika-prev:hover,\n    .s-pikaday .pika-prev:focus,\n    .s-pikaday .is-rtl .pika-next:hover,\n    .s-pikaday .is-rtl .pika-next:focus,\n    .s-pikaday .pika-next:hover,\n    .s-pikaday .pika-next:focus,\n    .s-pikaday .is-rtl .pika-prev:hover,\n    .s-pikaday .is-rtl .pika-prev:focus {\n        opacity: 1;\n    }\n\n.s-pikaday .pika-prev:after, .s-pikaday .is-rtl .pika-next:after, .s-pikaday .pika-next:after, .s-pikaday .is-rtl .pika-prev:after {\n        content: '\u276F';\n        color: inherit;\n        font-size: 1rem;\n        position: absolute;\n        top: 0;\n        left: -2.2em;\n    }\n.s-pikaday .pika-prev:after, .s-pikaday.is-rtl .pika-next:after {\n        transform: rotate(180deg);\n        left: 1em;\n    }\n.s-pikaday.is-rtl .pika-prev:after {\n        transform: rotate(0deg) !important;\n        left: -2em;\n    }\n\n.s-pikaday .pika-table {\n    background: hsla(calc(var(--s-theme-color-main-h, 0) + var(--s-theme-color-main-background-spin ,0)),calc((var(--s-theme-color-main-s, 0) + var(--s-theme-color-main-background-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-main-l, 0) + var(--s-theme-color-main-background-lightness-offset, 0)) * 1%),var(--s-theme-color-main-background-a, 1));\n    border-radius: var(--s-theme-ui-colorPicker-borderRadius, 6px);\n    padding: var(--s-theme-ui-colorPicker-padding, 6px 12px);\n}\n\n.s-pikaday .pika-table th * {\n    text-decoration: none;\n    color: hsla(calc(var(--s-theme-color-main-h, 0) + var(--s-theme-color-main-text-spin ,0)),calc((var(--s-theme-color-main-s, 0) + var(--s-theme-color-main-text-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-main-l, 0) + var(--s-theme-color-main-text-lightness-offset, 0)) * 1%),var(--s-theme-color-main-text-a, 1));\n}\n\n.s-pikaday .pika-button {\n    background: hsla(calc(var(--s-theme-color-main-h, 0) + var(--s-theme-color-main-background-spin ,0)),calc((var(--s-theme-color-main-s, 0) + var(--s-theme-color-main-background-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-main-l, 0) + var(--s-theme-color-main-background-lightness-offset, 0)) * 1%),var(--s-theme-color-main-background-a, 1));\n    color: hsla(calc(var(--s-theme-color-main-h, 0) + var(--s-theme-color-main-text-spin ,0)),calc((var(--s-theme-color-main-s, 0) + var(--s-theme-color-main-text-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-main-l, 0) + var(--s-theme-color-main-text-lightness-offset, 0)) * 1%),var(--s-theme-color-main-text-a, 1));\n    padding: var(--s-theme-ui-colorPicker-padding, 6px 12px);\n}\n\n.s-pikaday .pika-week {\n    text-decoration: none;\n}\n\n.s-pikaday .is-today .pika-button {\n    color: hsla(calc(var(--s-theme-color-ui-h, 0) + var(--s-theme-color-ui-spin ,0)),calc((var(--s-theme-color-ui-s, 0) + var(--s-theme-color-ui-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-ui-l, 0) + var(--s-theme-color-ui-lightness-offset, 0)) * 1%),var(--s-theme-color-ui-a, 1));\n    outline: none;\n}\n\n.s-pikaday .is-selected .pika-button {\n    color: hsla(calc(var(--s-theme-color-main-h, 0) + var(--s-theme-color-main-text-spin ,0)),calc((var(--s-theme-color-main-s, 0) + var(--s-theme-color-main-text-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-main-l, 0) + var(--s-theme-color-main-text-lightness-offset, 0)) * 1%),var(--s-theme-color-main-text-a, 1));\n    background: hsla(calc(var(--s-theme-color-ui-h, 0) + var(--s-theme-color-ui-spin ,0)),calc((var(--s-theme-color-ui-s, 0) + var(--s-theme-color-ui-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-ui-l, 0) + var(--s-theme-color-ui-lightness-offset, 0)) * 1%),var(--s-theme-color-ui-a, 0.5));\n    box-shadow: none !important;\n}\n\n.s-pikaday .is-disabled .pika-button {\n    color: hsla(calc(var(--s-theme-color-main-h, 0) + var(--s-theme-color-main-text-spin ,0)),calc((var(--s-theme-color-main-s, 0) + var(--s-theme-color-main-text-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-main-l, 0) + var(--s-theme-color-main-text-lightness-offset, 0)) * 1%),var(--s-theme-color-main-text-a, 1));\n    opacity: 0.3;\n}\n\n.s-pikaday .pika-button:hover {\n    color: hsla(calc(var(--s-theme-color-ui-h, 0) + var(--s-theme-color-ui-foreground-spin ,0)),calc((var(--s-theme-color-ui-s, 0) + var(--s-theme-color-ui-foreground-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-ui-l, 0) + var(--s-theme-color-ui-foreground-lightness-offset, 0)) * 1%),var(--s-theme-color-ui-foreground-a, 1)) !important;\n    background: hsla(calc(var(--s-theme-color-ui-h, 0) + var(--s-theme-color-ui-spin ,0)),calc((var(--s-theme-color-ui-s, 0) + var(--s-theme-color-ui-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-ui-l, 0) + var(--s-theme-color-ui-lightness-offset, 0)) * 1%),var(--s-theme-color-ui-a, 1)) !important;\n}\n";
var __baseCss = `@charset "UTF-8";

/*!
 * Pikaday
 * Copyright \xA9 2014 David Bushell | BSD & MIT license | https://dbushell.com/
 */

.pika-single {
    z-index: 9999;
    display: block;
    position: relative;
    color: #333;
    background: #fff;
    border: 1px solid #ccc;
    border-bottom-color: #bbb;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

/*
clear child float (pika-lendar), using the famous micro clearfix hack
http://nicolasgallagher.com/micro-clearfix-hack/
*/
.pika-single:before,
.pika-single:after {
    content: " ";
    display: table;
}
.pika-single:after { clear: both }

.pika-single.is-hidden {
    display: none;
}

.pika-single.is-bound {
    position: absolute;
    box-shadow: 0 5px 15px -5px rgba(0,0,0,.5);
}

.pika-lendar {
    float: left;
    width: 240px;
    margin: 8px;
}

.pika-title {
    position: relative;
    text-align: center;
}

.pika-label {
    display: inline-block;
    position: relative;
    z-index: 9999;
    overflow: hidden;
    margin: 0;
    padding: 5px 3px;
    font-size: 14px;
    line-height: 20px;
    font-weight: bold;
    background-color: #fff;
}
.pika-title select {
    cursor: pointer;
    position: absolute;
    z-index: 9998;
    margin: 0;
    left: 0;
    top: 5px;
    opacity: 0;
}

.pika-prev,
.pika-next {
    display: block;
    cursor: pointer;
    position: relative;
    outline: none;
    border: 0;
    padding: 0;
    width: 20px;
    height: 30px;
    /* hide text using text-indent trick, using width value (it's enough) */
    text-indent: 20px;
    white-space: nowrap;
    overflow: hidden;
    background-color: transparent;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 75% 75%;
    opacity: .5;
}

.pika-prev:hover,
.pika-next:hover {
    opacity: 1;
}

.pika-prev,
.is-rtl .pika-next {
    float: left;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAYAAAAsEj5rAAAAUklEQVR42u3VMQoAIBADQf8Pgj+OD9hG2CtONJB2ymQkKe0HbwAP0xucDiQWARITIDEBEnMgMQ8S8+AqBIl6kKgHiXqQqAeJepBo/z38J/U0uAHlaBkBl9I4GwAAAABJRU5ErkJggg==');
}

.pika-next,
.is-rtl .pika-prev {
    float: right;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAYAAAAsEj5rAAAAU0lEQVR42u3VOwoAMAgE0dwfAnNjU26bYkBCFGwfiL9VVWoO+BJ4Gf3gtsEKKoFBNTCoCAYVwaAiGNQGMUHMkjGbgjk2mIONuXo0nC8XnCf1JXgArVIZAQh5TKYAAAAASUVORK5CYII=');
}

.pika-prev.is-disabled,
.pika-next.is-disabled {
    cursor: default;
    opacity: .2;
}

.pika-select {
    display: inline-block;
}

.pika-table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    border: 0;
}

.pika-table th,
.pika-table td {
    width: 14.285714285714286%;
    padding: 0;
}

.pika-table th {
    color: #999;
    font-size: 12px;
    line-height: 25px;
    font-weight: bold;
    text-align: center;
}

.pika-button {
    cursor: pointer;
    display: block;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    outline: none;
    border: 0;
    margin: 0;
    width: 100%;
    padding: 5px;
    color: #666;
    font-size: 12px;
    line-height: 15px;
    text-align: right;
    background: #f5f5f5;
    height: initial;
}

.pika-week {
    font-size: 11px;
    color: #999;
}

.is-today .pika-button {
    color: #33aaff;
    font-weight: bold;
}

.is-selected .pika-button,
.has-event .pika-button {
    color: #fff;
    font-weight: bold;
    background: #33aaff;
    box-shadow: inset 0 1px 3px #178fe5;
    border-radius: 3px;
}

.has-event .pika-button {
    background: #005da9;
    box-shadow: inset 0 1px 3px #0076c9;
}

.is-disabled .pika-button,
.is-inrange .pika-button {
    background: #D5E9F7;
}

.is-startrange .pika-button {
    color: #fff;
    background: #6CB31D;
    box-shadow: none;
    border-radius: 3px;
}

.is-endrange .pika-button {
    color: #fff;
    background: #33aaff;
    box-shadow: none;
    border-radius: 3px;
}

.is-disabled .pika-button {
    pointer-events: none;
    cursor: default;
    color: #999;
    opacity: .3;
}

.is-outside-current-month .pika-button {
    color: #999;
    opacity: .3;
}

.is-selection-disabled {
    pointer-events: none;
    cursor: default;
}

.pika-button:hover,
.pika-row.pick-whole-week:hover .pika-button {
    color: #fff;
    background: #ff8000;
    box-shadow: none;
    border-radius: 3px;
}

/* styling for abbr */
.pika-table abbr {
    border-bottom: none;
    cursor: help;
}
`;
var __decorate = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d2;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d2 = decorators[i])
        r = (c < 3 ? d2(r) : c > 3 ? d2(target, key, r) : d2(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = function(thisArg, _arguments, P, generator) {
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
class SDatePicker extends SLitElement {
  constructor() {
    super();
    this._component = void 0;
    this._component = new __SComponentUtils(this.tagName.toLowerCase(), this, this.attributes, {
      componentUtils: {
        interface: SDatePickerComponentInterface,
        defaultProps: {}
      }
    });
  }
  static get properties() {
    return __SComponentUtils.properties({}, SDatePickerComponentInterface);
  }
  static get styles() {
    return css`
            ${unsafeCSS(`
                ${__baseCss}
                ${__css}
                ${__themeCss}
            `)}
        `;
  }
  firstUpdated() {
    return __awaiter(this, void 0, void 0, function* () {
      const $input = yield this._$input;
      let $button;
      if (this._component.props.button)
        $button = yield this._$button;
      yield whenInteract(this);
      const _this = this;
      this._picker = new __pikaday({
        field: $input,
        format: this._component.props.format,
        trigger: $button,
        firstDay: this._component.props.firstDay,
        minDate: this.parseDate(this._component.props.minDate),
        maxDate: this.parseDate(this._component.props.maxDate),
        disableWeekends: this._component.props.disableWeekends,
        yearRange: this._component.props.yearRange,
        isRTL: this._component.props.rtl,
        i18n: this._component.props.i18n,
        numberOfMonths: this._component.props.numberOfMonths,
        events: this._component.props.events,
        defaultDate: this._component.props.value,
        theme: this._component.props.defaultStyle ? "s-pikaday" : "",
        toString(date, format) {
          return _this.dateToString(date, format);
        },
        parse(dateString, format) {
          return _this.parseDate(dateString, format);
        },
        onSelect: () => {
          this._dispatchEvent("select");
        },
        onOpen: () => {
          this._dispatchEvent("open");
        },
        onClose: () => {
          this._dispatchEvent("close");
        },
        onDraw: () => {
          this._dispatchEvent("draw");
        }
      });
      Array.from(this.classList).forEach((cls) => {
        if (cls.match(/^s-ui/))
          this._picker.el.classList.add(cls);
      });
      [
        "toString",
        "getDate",
        "setDate",
        "getMoment",
        "clear",
        "gotoDate",
        "gotoToday",
        "gotoMonth",
        "nextMonth",
        "prevMonth",
        "gotoYear",
        "setMinDate",
        "setMaxDate",
        "setStartRange",
        "setEndRange",
        "isVisible",
        "show",
        "adjustPosition",
        "hide",
        "destroy"
      ].forEach((key) => {
        this[key] = this._picker[key].bind(this._picker);
      });
    });
  }
  parseDate(dateString, format = this._component.props.format) {
    return __moment(dateString, format).toDate();
  }
  dateToString(date, format = this._component.props.format) {
    return __moment(date).format(format);
  }
  _dispatchEvent(eventName) {
    const event = new CustomEvent(eventName, {
      detail: {
        dateStr: this._picker.toString(),
        date: this._picker.getDate()
      }
    });
    this.dispatchEvent(event);
  }
  createRenderRoot() {
    return this;
  }
  render() {
    return html$2`
            <div class="${this._component.className("")}">
                <input
                    class="${this._component.className("__input", "s-input")}"
                    type="text"
                    name="${this.name}"
                    ?rtl="${this.rtl}"
                    placeholder="${this.placeholder}"
                    autocomplete="off"
                />
                ${this.button ? html$2`
                          <button class="${this._component.className("__button", "s-btn")}">
                              ${html([this.calendarIcon])}
                          </button>
                      ` : ""}
            </div>
        `;
  }
}
__decorate([
  queryAsync("input")
], SDatePicker.prototype, "_$input", void 0);
__decorate([
  queryAsync("button")
], SDatePicker.prototype, "_$button", void 0);
function webcomponent(props = {}, tagName = "s-date-picker") {
  __SComponentUtils.setDefaultProps(tagName, props);
  customElements.define(tagName, SDatePicker);
}
export default SDatePicker;
export {webcomponent};
