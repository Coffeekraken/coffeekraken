import __SComponentUtils, {SComponentUtilsDefaultInterface, SLitElement} from "@coffeekraken/s-component-utils";
import {css as css$1, unsafeCSS, html as html$2} from "lit";
import {webcomponent as webcomponent$1} from "@coffeekraken/s-clipboard-copy-component";
import __SInterface from "@coffeekraken/s-interface";
function wait(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
}
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
var _a, _b, _c, _d, _e;
var _f;
{
  console.warn("lit-html is in dev mode. Not recommended for production!");
}
const wrap = ((_a = window.ShadyDOM) === null || _a === void 0 ? void 0 : _a.inUse) && ((_b = window.ShadyDOM) === null || _b === void 0 ? void 0 : _b.noPatch) === true ? window.ShadyDOM.wrap : (node) => node;
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
(_d = (_c = globalThis)["litHtmlPlatformSupport"]) === null || _d === void 0 ? void 0 : _d.call(_c, Template, ChildPart);
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
function query(selector, cache) {
  return decorateProperty({
    descriptor: (name) => {
      const descriptor = {
        get() {
          var _a2;
          return (_a2 = this.renderRoot) === null || _a2 === void 0 ? void 0 : _a2.querySelector(selector);
        },
        enumerable: true,
        configurable: true
      };
      if (cache) {
        const key = typeof name === "symbol" ? Symbol() : `__${name}`;
        descriptor.get = function() {
          var _a2;
          if (this[key] === void 0) {
            this[key] = (_a2 = this.renderRoot) === null || _a2 === void 0 ? void 0 : _a2.querySelector(selector);
          }
          return this[key];
        };
      }
      return descriptor;
    }
  });
}
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
const ElementProto = Element.prototype;
const legacyMatches = ElementProto.msMatchesSelector || ElementProto.webkitMatchesSelector;
function queryAssignedNodes(slotName = "", flatten = false, selector = "") {
  return decorateProperty({
    descriptor: (_name) => ({
      get() {
        var _a2, _b2;
        const slotSelector = `slot${slotName ? `[name=${slotName}]` : ":not([name])"}`;
        const slot = (_a2 = this.renderRoot) === null || _a2 === void 0 ? void 0 : _a2.querySelector(slotSelector);
        let nodes = (_b2 = slot) === null || _b2 === void 0 ? void 0 : _b2.assignedNodes({flatten});
        if (nodes && selector) {
          nodes = nodes.filter((node) => node.nodeType === Node.ELEMENT_NODE && (node.matches ? node.matches(selector) : legacyMatches.call(node, selector)));
        }
        return nodes;
      },
      enumerable: true,
      configurable: true
    })
  });
}
var deepFreezeEs6 = {exports: {}};
function deepFreeze(obj) {
  if (obj instanceof Map) {
    obj.clear = obj.delete = obj.set = function() {
      throw new Error("map is read-only");
    };
  } else if (obj instanceof Set) {
    obj.add = obj.clear = obj.delete = function() {
      throw new Error("set is read-only");
    };
  }
  Object.freeze(obj);
  Object.getOwnPropertyNames(obj).forEach(function(name) {
    var prop = obj[name];
    if (typeof prop == "object" && !Object.isFrozen(prop)) {
      deepFreeze(prop);
    }
  });
  return obj;
}
deepFreezeEs6.exports = deepFreeze;
deepFreezeEs6.exports.default = deepFreeze;
var deepFreeze$1 = deepFreezeEs6.exports;
class Response {
  constructor(mode) {
    if (mode.data === void 0)
      mode.data = {};
    this.data = mode.data;
    this.isMatchIgnored = false;
  }
  ignoreMatch() {
    this.isMatchIgnored = true;
  }
}
function escapeHTML(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
}
function inherit$1(original, ...objects) {
  const result = Object.create(null);
  for (const key in original) {
    result[key] = original[key];
  }
  objects.forEach(function(obj) {
    for (const key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
}
const SPAN_CLOSE = "</span>";
const emitsWrappingTags = (node) => {
  return !!node.kind;
};
const expandScopeName = (name, {prefix}) => {
  if (name.includes(".")) {
    const pieces = name.split(".");
    return [
      `${prefix}${pieces.shift()}`,
      ...pieces.map((x, i) => `${x}${"_".repeat(i + 1)}`)
    ].join(" ");
  }
  return `${prefix}${name}`;
};
class HTMLRenderer {
  constructor(parseTree, options) {
    this.buffer = "";
    this.classPrefix = options.classPrefix;
    parseTree.walk(this);
  }
  addText(text) {
    this.buffer += escapeHTML(text);
  }
  openNode(node) {
    if (!emitsWrappingTags(node))
      return;
    let scope = node.kind;
    if (node.sublanguage) {
      scope = `language-${scope}`;
    } else {
      scope = expandScopeName(scope, {prefix: this.classPrefix});
    }
    this.span(scope);
  }
  closeNode(node) {
    if (!emitsWrappingTags(node))
      return;
    this.buffer += SPAN_CLOSE;
  }
  value() {
    return this.buffer;
  }
  span(className) {
    this.buffer += `<span class="${className}">`;
  }
}
class TokenTree {
  constructor() {
    this.rootNode = {children: []};
    this.stack = [this.rootNode];
  }
  get top() {
    return this.stack[this.stack.length - 1];
  }
  get root() {
    return this.rootNode;
  }
  add(node) {
    this.top.children.push(node);
  }
  openNode(kind) {
    const node = {kind, children: []};
    this.add(node);
    this.stack.push(node);
  }
  closeNode() {
    if (this.stack.length > 1) {
      return this.stack.pop();
    }
    return void 0;
  }
  closeAllNodes() {
    while (this.closeNode())
      ;
  }
  toJSON() {
    return JSON.stringify(this.rootNode, null, 4);
  }
  walk(builder) {
    return this.constructor._walk(builder, this.rootNode);
  }
  static _walk(builder, node) {
    if (typeof node === "string") {
      builder.addText(node);
    } else if (node.children) {
      builder.openNode(node);
      node.children.forEach((child) => this._walk(builder, child));
      builder.closeNode(node);
    }
    return builder;
  }
  static _collapse(node) {
    if (typeof node === "string")
      return;
    if (!node.children)
      return;
    if (node.children.every((el) => typeof el === "string")) {
      node.children = [node.children.join("")];
    } else {
      node.children.forEach((child) => {
        TokenTree._collapse(child);
      });
    }
  }
}
class TokenTreeEmitter extends TokenTree {
  constructor(options) {
    super();
    this.options = options;
  }
  addKeyword(text, kind) {
    if (text === "") {
      return;
    }
    this.openNode(kind);
    this.addText(text);
    this.closeNode();
  }
  addText(text) {
    if (text === "") {
      return;
    }
    this.add(text);
  }
  addSublanguage(emitter, name) {
    const node = emitter.root;
    node.kind = name;
    node.sublanguage = true;
    this.add(node);
  }
  toHTML() {
    const renderer = new HTMLRenderer(this, this.options);
    return renderer.value();
  }
  finalize() {
    return true;
  }
}
function source$4(re) {
  if (!re)
    return null;
  if (typeof re === "string")
    return re;
  return re.source;
}
function lookahead$3(re) {
  return concat$4("(?=", re, ")");
}
function concat$4(...args) {
  const joined = args.map((x) => source$4(x)).join("");
  return joined;
}
function stripOptionsFromArgs$1(args) {
  const opts = args[args.length - 1];
  if (typeof opts === "object" && opts.constructor === Object) {
    args.splice(args.length - 1, 1);
    return opts;
  } else {
    return {};
  }
}
function either$1(...args) {
  const opts = stripOptionsFromArgs$1(args);
  const joined = "(" + (opts.capture ? "" : "?:") + args.map((x) => source$4(x)).join("|") + ")";
  return joined;
}
function countMatchGroups(re) {
  return new RegExp(re.toString() + "|").exec("").length - 1;
}
function startsWith(re, lexeme) {
  const match = re && re.exec(lexeme);
  return match && match.index === 0;
}
const BACKREF_RE = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;
function _rewriteBackreferences(regexps, {joinWith}) {
  let numCaptures = 0;
  return regexps.map((regex) => {
    numCaptures += 1;
    const offset = numCaptures;
    let re = source$4(regex);
    let out = "";
    while (re.length > 0) {
      const match = BACKREF_RE.exec(re);
      if (!match) {
        out += re;
        break;
      }
      out += re.substring(0, match.index);
      re = re.substring(match.index + match[0].length);
      if (match[0][0] === "\\" && match[1]) {
        out += "\\" + String(Number(match[1]) + offset);
      } else {
        out += match[0];
        if (match[0] === "(") {
          numCaptures++;
        }
      }
    }
    return out;
  }).map((re) => `(${re})`).join(joinWith);
}
const MATCH_NOTHING_RE = /\b\B/;
const IDENT_RE$1 = "[a-zA-Z]\\w*";
const UNDERSCORE_IDENT_RE = "[a-zA-Z_]\\w*";
const NUMBER_RE = "\\b\\d+(\\.\\d+)?";
const C_NUMBER_RE = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)";
const BINARY_NUMBER_RE = "\\b(0b[01]+)";
const RE_STARTERS_RE = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~";
const SHEBANG = (opts = {}) => {
  const beginShebang = /^#![ ]*\//;
  if (opts.binary) {
    opts.begin = concat$4(beginShebang, /.*\b/, opts.binary, /\b.*/);
  }
  return inherit$1({
    scope: "meta",
    begin: beginShebang,
    end: /$/,
    relevance: 0,
    "on:begin": (m, resp) => {
      if (m.index !== 0)
        resp.ignoreMatch();
    }
  }, opts);
};
const BACKSLASH_ESCAPE = {
  begin: "\\\\[\\s\\S]",
  relevance: 0
};
const APOS_STRING_MODE = {
  scope: "string",
  begin: "'",
  end: "'",
  illegal: "\\n",
  contains: [BACKSLASH_ESCAPE]
};
const QUOTE_STRING_MODE = {
  scope: "string",
  begin: '"',
  end: '"',
  illegal: "\\n",
  contains: [BACKSLASH_ESCAPE]
};
const PHRASAL_WORDS_MODE = {
  begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
};
const COMMENT = function(begin, end, modeOptions = {}) {
  const mode = inherit$1({
    scope: "comment",
    begin,
    end,
    contains: []
  }, modeOptions);
  mode.contains.push({
    scope: "doctag",
    begin: "[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",
    end: /(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,
    excludeBegin: true,
    relevance: 0
  });
  const ENGLISH_WORD = either$1("I", "a", "is", "so", "us", "to", "at", "if", "in", "it", "on", /[A-Za-z]+['](d|ve|re|ll|t|s|n)/, /[A-Za-z]+[-][a-z]+/, /[A-Za-z][a-z]{2,}/);
  mode.contains.push({
    begin: concat$4(/[ ]+/, "(", ENGLISH_WORD, /[.]?[:]?([.][ ]|[ ])/, "){3}")
  });
  return mode;
};
const C_LINE_COMMENT_MODE = COMMENT("//", "$");
const C_BLOCK_COMMENT_MODE = COMMENT("/\\*", "\\*/");
const HASH_COMMENT_MODE = COMMENT("#", "$");
const NUMBER_MODE = {
  scope: "number",
  begin: NUMBER_RE,
  relevance: 0
};
const C_NUMBER_MODE = {
  scope: "number",
  begin: C_NUMBER_RE,
  relevance: 0
};
const BINARY_NUMBER_MODE = {
  scope: "number",
  begin: BINARY_NUMBER_RE,
  relevance: 0
};
const REGEXP_MODE = {
  begin: /(?=\/[^/\n]*\/)/,
  contains: [{
    scope: "regexp",
    begin: /\//,
    end: /\/[gimuy]*/,
    illegal: /\n/,
    contains: [
      BACKSLASH_ESCAPE,
      {
        begin: /\[/,
        end: /\]/,
        relevance: 0,
        contains: [BACKSLASH_ESCAPE]
      }
    ]
  }]
};
const TITLE_MODE = {
  scope: "title",
  begin: IDENT_RE$1,
  relevance: 0
};
const UNDERSCORE_TITLE_MODE = {
  scope: "title",
  begin: UNDERSCORE_IDENT_RE,
  relevance: 0
};
const METHOD_GUARD = {
  begin: "\\.\\s*" + UNDERSCORE_IDENT_RE,
  relevance: 0
};
const END_SAME_AS_BEGIN = function(mode) {
  return Object.assign(mode, {
    "on:begin": (m, resp) => {
      resp.data._beginMatch = m[1];
    },
    "on:end": (m, resp) => {
      if (resp.data._beginMatch !== m[1])
        resp.ignoreMatch();
    }
  });
};
var MODES$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  MATCH_NOTHING_RE,
  IDENT_RE: IDENT_RE$1,
  UNDERSCORE_IDENT_RE,
  NUMBER_RE,
  C_NUMBER_RE,
  BINARY_NUMBER_RE,
  RE_STARTERS_RE,
  SHEBANG,
  BACKSLASH_ESCAPE,
  APOS_STRING_MODE,
  QUOTE_STRING_MODE,
  PHRASAL_WORDS_MODE,
  COMMENT,
  C_LINE_COMMENT_MODE,
  C_BLOCK_COMMENT_MODE,
  HASH_COMMENT_MODE,
  NUMBER_MODE,
  C_NUMBER_MODE,
  BINARY_NUMBER_MODE,
  REGEXP_MODE,
  TITLE_MODE,
  UNDERSCORE_TITLE_MODE,
  METHOD_GUARD,
  END_SAME_AS_BEGIN
});
function skipIfHasPrecedingDot(match, response) {
  const before = match.input[match.index - 1];
  if (before === ".") {
    response.ignoreMatch();
  }
}
function scopeClassName(mode, _parent) {
  if (mode.className !== void 0) {
    mode.scope = mode.className;
    delete mode.className;
  }
}
function beginKeywords(mode, parent) {
  if (!parent)
    return;
  if (!mode.beginKeywords)
    return;
  mode.begin = "\\b(" + mode.beginKeywords.split(" ").join("|") + ")(?!\\.)(?=\\b|\\s)";
  mode.__beforeBegin = skipIfHasPrecedingDot;
  mode.keywords = mode.keywords || mode.beginKeywords;
  delete mode.beginKeywords;
  if (mode.relevance === void 0)
    mode.relevance = 0;
}
function compileIllegal(mode, _parent) {
  if (!Array.isArray(mode.illegal))
    return;
  mode.illegal = either$1(...mode.illegal);
}
function compileMatch(mode, _parent) {
  if (!mode.match)
    return;
  if (mode.begin || mode.end)
    throw new Error("begin & end are not supported with match");
  mode.begin = mode.match;
  delete mode.match;
}
function compileRelevance(mode, _parent) {
  if (mode.relevance === void 0)
    mode.relevance = 1;
}
const beforeMatchExt = (mode, parent) => {
  if (!mode.beforeMatch)
    return;
  if (mode.starts)
    throw new Error("beforeMatch cannot be used with starts");
  const originalMode = Object.assign({}, mode);
  Object.keys(mode).forEach((key) => {
    delete mode[key];
  });
  mode.keywords = originalMode.keywords;
  mode.begin = concat$4(originalMode.beforeMatch, lookahead$3(originalMode.begin));
  mode.starts = {
    relevance: 0,
    contains: [
      Object.assign(originalMode, {endsParent: true})
    ]
  };
  mode.relevance = 0;
  delete originalMode.beforeMatch;
};
const COMMON_KEYWORDS = [
  "of",
  "and",
  "for",
  "in",
  "not",
  "or",
  "if",
  "then",
  "parent",
  "list",
  "value"
];
const DEFAULT_KEYWORD_SCOPE = "keyword";
function compileKeywords(rawKeywords, caseInsensitive, scopeName = DEFAULT_KEYWORD_SCOPE) {
  const compiledKeywords = Object.create(null);
  if (typeof rawKeywords === "string") {
    compileList(scopeName, rawKeywords.split(" "));
  } else if (Array.isArray(rawKeywords)) {
    compileList(scopeName, rawKeywords);
  } else {
    Object.keys(rawKeywords).forEach(function(scopeName2) {
      Object.assign(compiledKeywords, compileKeywords(rawKeywords[scopeName2], caseInsensitive, scopeName2));
    });
  }
  return compiledKeywords;
  function compileList(scopeName2, keywordList) {
    if (caseInsensitive) {
      keywordList = keywordList.map((x) => x.toLowerCase());
    }
    keywordList.forEach(function(keyword) {
      const pair = keyword.split("|");
      compiledKeywords[pair[0]] = [scopeName2, scoreForKeyword(pair[0], pair[1])];
    });
  }
}
function scoreForKeyword(keyword, providedScore) {
  if (providedScore) {
    return Number(providedScore);
  }
  return commonKeyword(keyword) ? 0 : 1;
}
function commonKeyword(keyword) {
  return COMMON_KEYWORDS.includes(keyword.toLowerCase());
}
const seenDeprecations = {};
const error = (message) => {
  console.error(message);
};
const warn = (message, ...args) => {
  console.log(`WARN: ${message}`, ...args);
};
const deprecated = (version2, message) => {
  if (seenDeprecations[`${version2}/${message}`])
    return;
  console.log(`Deprecated as of ${version2}. ${message}`);
  seenDeprecations[`${version2}/${message}`] = true;
};
const MultiClassError = new Error();
function remapScopeNames(mode, regexes, {key}) {
  let offset = 0;
  const scopeNames = mode[key];
  const emit = {};
  const positions = {};
  for (let i = 1; i <= regexes.length; i++) {
    positions[i + offset] = scopeNames[i];
    emit[i + offset] = true;
    offset += countMatchGroups(regexes[i - 1]);
  }
  mode[key] = positions;
  mode[key]._emit = emit;
  mode[key]._multi = true;
}
function beginMultiClass(mode) {
  if (!Array.isArray(mode.begin))
    return;
  if (mode.skip || mode.excludeBegin || mode.returnBegin) {
    error("skip, excludeBegin, returnBegin not compatible with beginScope: {}");
    throw MultiClassError;
  }
  if (typeof mode.beginScope !== "object" || mode.beginScope === null) {
    error("beginScope must be object");
    throw MultiClassError;
  }
  remapScopeNames(mode, mode.begin, {key: "beginScope"});
  mode.begin = _rewriteBackreferences(mode.begin, {joinWith: ""});
}
function endMultiClass(mode) {
  if (!Array.isArray(mode.end))
    return;
  if (mode.skip || mode.excludeEnd || mode.returnEnd) {
    error("skip, excludeEnd, returnEnd not compatible with endScope: {}");
    throw MultiClassError;
  }
  if (typeof mode.endScope !== "object" || mode.endScope === null) {
    error("endScope must be object");
    throw MultiClassError;
  }
  remapScopeNames(mode, mode.end, {key: "endScope"});
  mode.end = _rewriteBackreferences(mode.end, {joinWith: ""});
}
function scopeSugar(mode) {
  if (mode.scope && typeof mode.scope === "object" && mode.scope !== null) {
    mode.beginScope = mode.scope;
    delete mode.scope;
  }
}
function MultiClass(mode) {
  scopeSugar(mode);
  if (typeof mode.beginScope === "string") {
    mode.beginScope = {_wrap: mode.beginScope};
  }
  if (typeof mode.endScope === "string") {
    mode.endScope = {_wrap: mode.endScope};
  }
  beginMultiClass(mode);
  endMultiClass(mode);
}
function compileLanguage(language) {
  function langRe(value, global) {
    return new RegExp(source$4(value), "m" + (language.case_insensitive ? "i" : "") + (global ? "g" : ""));
  }
  class MultiRegex {
    constructor() {
      this.matchIndexes = {};
      this.regexes = [];
      this.matchAt = 1;
      this.position = 0;
    }
    addRule(re, opts) {
      opts.position = this.position++;
      this.matchIndexes[this.matchAt] = opts;
      this.regexes.push([opts, re]);
      this.matchAt += countMatchGroups(re) + 1;
    }
    compile() {
      if (this.regexes.length === 0) {
        this.exec = () => null;
      }
      const terminators = this.regexes.map((el) => el[1]);
      this.matcherRe = langRe(_rewriteBackreferences(terminators, {joinWith: "|"}), true);
      this.lastIndex = 0;
    }
    exec(s) {
      this.matcherRe.lastIndex = this.lastIndex;
      const match = this.matcherRe.exec(s);
      if (!match) {
        return null;
      }
      const i = match.findIndex((el, i2) => i2 > 0 && el !== void 0);
      const matchData = this.matchIndexes[i];
      match.splice(0, i);
      return Object.assign(match, matchData);
    }
  }
  class ResumableMultiRegex {
    constructor() {
      this.rules = [];
      this.multiRegexes = [];
      this.count = 0;
      this.lastIndex = 0;
      this.regexIndex = 0;
    }
    getMatcher(index) {
      if (this.multiRegexes[index])
        return this.multiRegexes[index];
      const matcher = new MultiRegex();
      this.rules.slice(index).forEach(([re, opts]) => matcher.addRule(re, opts));
      matcher.compile();
      this.multiRegexes[index] = matcher;
      return matcher;
    }
    resumingScanAtSamePosition() {
      return this.regexIndex !== 0;
    }
    considerAll() {
      this.regexIndex = 0;
    }
    addRule(re, opts) {
      this.rules.push([re, opts]);
      if (opts.type === "begin")
        this.count++;
    }
    exec(s) {
      const m = this.getMatcher(this.regexIndex);
      m.lastIndex = this.lastIndex;
      let result = m.exec(s);
      if (this.resumingScanAtSamePosition()) {
        if (result && result.index === this.lastIndex)
          ;
        else {
          const m2 = this.getMatcher(0);
          m2.lastIndex = this.lastIndex + 1;
          result = m2.exec(s);
        }
      }
      if (result) {
        this.regexIndex += result.position + 1;
        if (this.regexIndex === this.count) {
          this.considerAll();
        }
      }
      return result;
    }
  }
  function buildModeRegex(mode) {
    const mm = new ResumableMultiRegex();
    mode.contains.forEach((term) => mm.addRule(term.begin, {rule: term, type: "begin"}));
    if (mode.terminatorEnd) {
      mm.addRule(mode.terminatorEnd, {type: "end"});
    }
    if (mode.illegal) {
      mm.addRule(mode.illegal, {type: "illegal"});
    }
    return mm;
  }
  function compileMode(mode, parent) {
    const cmode = mode;
    if (mode.isCompiled)
      return cmode;
    [
      scopeClassName,
      compileMatch,
      MultiClass,
      beforeMatchExt
    ].forEach((ext) => ext(mode, parent));
    language.compilerExtensions.forEach((ext) => ext(mode, parent));
    mode.__beforeBegin = null;
    [
      beginKeywords,
      compileIllegal,
      compileRelevance
    ].forEach((ext) => ext(mode, parent));
    mode.isCompiled = true;
    let keywordPattern = null;
    if (typeof mode.keywords === "object" && mode.keywords.$pattern) {
      mode.keywords = Object.assign({}, mode.keywords);
      keywordPattern = mode.keywords.$pattern;
      delete mode.keywords.$pattern;
    }
    keywordPattern = keywordPattern || /\w+/;
    if (mode.keywords) {
      mode.keywords = compileKeywords(mode.keywords, language.case_insensitive);
    }
    cmode.keywordPatternRe = langRe(keywordPattern, true);
    if (parent) {
      if (!mode.begin)
        mode.begin = /\B|\b/;
      cmode.beginRe = langRe(mode.begin);
      if (!mode.end && !mode.endsWithParent)
        mode.end = /\B|\b/;
      if (mode.end)
        cmode.endRe = langRe(mode.end);
      cmode.terminatorEnd = source$4(mode.end) || "";
      if (mode.endsWithParent && parent.terminatorEnd) {
        cmode.terminatorEnd += (mode.end ? "|" : "") + parent.terminatorEnd;
      }
    }
    if (mode.illegal)
      cmode.illegalRe = langRe(mode.illegal);
    if (!mode.contains)
      mode.contains = [];
    mode.contains = [].concat(...mode.contains.map(function(c) {
      return expandOrCloneMode(c === "self" ? mode : c);
    }));
    mode.contains.forEach(function(c) {
      compileMode(c, cmode);
    });
    if (mode.starts) {
      compileMode(mode.starts, parent);
    }
    cmode.matcher = buildModeRegex(cmode);
    return cmode;
  }
  if (!language.compilerExtensions)
    language.compilerExtensions = [];
  if (language.contains && language.contains.includes("self")) {
    throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");
  }
  language.classNameAliases = inherit$1(language.classNameAliases || {});
  return compileMode(language);
}
function dependencyOnParent(mode) {
  if (!mode)
    return false;
  return mode.endsWithParent || dependencyOnParent(mode.starts);
}
function expandOrCloneMode(mode) {
  if (mode.variants && !mode.cachedVariants) {
    mode.cachedVariants = mode.variants.map(function(variant) {
      return inherit$1(mode, {variants: null}, variant);
    });
  }
  if (mode.cachedVariants) {
    return mode.cachedVariants;
  }
  if (dependencyOnParent(mode)) {
    return inherit$1(mode, {starts: mode.starts ? inherit$1(mode.starts) : null});
  }
  if (Object.isFrozen(mode)) {
    return inherit$1(mode);
  }
  return mode;
}
var version = "11.1.0";
const escape = escapeHTML;
const inherit = inherit$1;
const NO_MATCH = Symbol("nomatch");
const MAX_KEYWORD_HITS = 7;
const HLJS = function(hljs) {
  const languages = Object.create(null);
  const aliases = Object.create(null);
  const plugins = [];
  let SAFE_MODE = true;
  const LANGUAGE_NOT_FOUND = "Could not find the language '{}', did you forget to load/include a language module?";
  const PLAINTEXT_LANGUAGE = {disableAutodetect: true, name: "Plain text", contains: []};
  let options = {
    ignoreUnescapedHTML: false,
    noHighlightRe: /^(no-?highlight)$/i,
    languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
    classPrefix: "hljs-",
    cssSelector: "pre code",
    languages: null,
    __emitter: TokenTreeEmitter
  };
  function shouldNotHighlight(languageName) {
    return options.noHighlightRe.test(languageName);
  }
  function blockLanguage(block) {
    let classes = block.className + " ";
    classes += block.parentNode ? block.parentNode.className : "";
    const match = options.languageDetectRe.exec(classes);
    if (match) {
      const language = getLanguage(match[1]);
      if (!language) {
        warn(LANGUAGE_NOT_FOUND.replace("{}", match[1]));
        warn("Falling back to no-highlight mode for this block.", block);
      }
      return language ? match[1] : "no-highlight";
    }
    return classes.split(/\s+/).find((_class) => shouldNotHighlight(_class) || getLanguage(_class));
  }
  function highlight2(codeOrLanguageName, optionsOrCode, ignoreIllegals) {
    let code = "";
    let languageName = "";
    if (typeof optionsOrCode === "object") {
      code = codeOrLanguageName;
      ignoreIllegals = optionsOrCode.ignoreIllegals;
      languageName = optionsOrCode.language;
    } else {
      deprecated("10.7.0", "highlight(lang, code, ...args) has been deprecated.");
      deprecated("10.7.0", "Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277");
      languageName = codeOrLanguageName;
      code = optionsOrCode;
    }
    if (ignoreIllegals === void 0) {
      ignoreIllegals = true;
    }
    const context = {
      code,
      language: languageName
    };
    fire("before:highlight", context);
    const result = context.result ? context.result : _highlight(context.language, context.code, ignoreIllegals);
    result.code = context.code;
    fire("after:highlight", result);
    return result;
  }
  function _highlight(languageName, codeToHighlight, ignoreIllegals, continuation) {
    const keywordHits = Object.create(null);
    function keywordData(mode, matchText) {
      return mode.keywords[matchText];
    }
    function processKeywords() {
      if (!top.keywords) {
        emitter.addText(modeBuffer);
        return;
      }
      let lastIndex = 0;
      top.keywordPatternRe.lastIndex = 0;
      let match = top.keywordPatternRe.exec(modeBuffer);
      let buf = "";
      while (match) {
        buf += modeBuffer.substring(lastIndex, match.index);
        const word = language.case_insensitive ? match[0].toLowerCase() : match[0];
        const data = keywordData(top, word);
        if (data) {
          const [kind, keywordRelevance] = data;
          emitter.addText(buf);
          buf = "";
          keywordHits[word] = (keywordHits[word] || 0) + 1;
          if (keywordHits[word] <= MAX_KEYWORD_HITS)
            relevance += keywordRelevance;
          if (kind.startsWith("_")) {
            buf += match[0];
          } else {
            const cssClass = language.classNameAliases[kind] || kind;
            emitter.addKeyword(match[0], cssClass);
          }
        } else {
          buf += match[0];
        }
        lastIndex = top.keywordPatternRe.lastIndex;
        match = top.keywordPatternRe.exec(modeBuffer);
      }
      buf += modeBuffer.substr(lastIndex);
      emitter.addText(buf);
    }
    function processSubLanguage() {
      if (modeBuffer === "")
        return;
      let result2 = null;
      if (typeof top.subLanguage === "string") {
        if (!languages[top.subLanguage]) {
          emitter.addText(modeBuffer);
          return;
        }
        result2 = _highlight(top.subLanguage, modeBuffer, true, continuations[top.subLanguage]);
        continuations[top.subLanguage] = result2._top;
      } else {
        result2 = highlightAuto(modeBuffer, top.subLanguage.length ? top.subLanguage : null);
      }
      if (top.relevance > 0) {
        relevance += result2.relevance;
      }
      emitter.addSublanguage(result2._emitter, result2.language);
    }
    function processBuffer() {
      if (top.subLanguage != null) {
        processSubLanguage();
      } else {
        processKeywords();
      }
      modeBuffer = "";
    }
    function emitMultiClass(scope, match) {
      let i = 1;
      while (match[i] !== void 0) {
        if (!scope._emit[i]) {
          i++;
          continue;
        }
        const klass = language.classNameAliases[scope[i]] || scope[i];
        const text = match[i];
        if (klass) {
          emitter.addKeyword(text, klass);
        } else {
          modeBuffer = text;
          processKeywords();
          modeBuffer = "";
        }
        i++;
      }
    }
    function startNewMode(mode, match) {
      if (mode.scope && typeof mode.scope === "string") {
        emitter.openNode(language.classNameAliases[mode.scope] || mode.scope);
      }
      if (mode.beginScope) {
        if (mode.beginScope._wrap) {
          emitter.addKeyword(modeBuffer, language.classNameAliases[mode.beginScope._wrap] || mode.beginScope._wrap);
          modeBuffer = "";
        } else if (mode.beginScope._multi) {
          emitMultiClass(mode.beginScope, match);
          modeBuffer = "";
        }
      }
      top = Object.create(mode, {parent: {value: top}});
      return top;
    }
    function endOfMode(mode, match, matchPlusRemainder) {
      let matched = startsWith(mode.endRe, matchPlusRemainder);
      if (matched) {
        if (mode["on:end"]) {
          const resp = new Response(mode);
          mode["on:end"](match, resp);
          if (resp.isMatchIgnored)
            matched = false;
        }
        if (matched) {
          while (mode.endsParent && mode.parent) {
            mode = mode.parent;
          }
          return mode;
        }
      }
      if (mode.endsWithParent) {
        return endOfMode(mode.parent, match, matchPlusRemainder);
      }
    }
    function doIgnore(lexeme) {
      if (top.matcher.regexIndex === 0) {
        modeBuffer += lexeme[0];
        return 1;
      } else {
        resumeScanAtSamePosition = true;
        return 0;
      }
    }
    function doBeginMatch(match) {
      const lexeme = match[0];
      const newMode = match.rule;
      const resp = new Response(newMode);
      const beforeCallbacks = [newMode.__beforeBegin, newMode["on:begin"]];
      for (const cb of beforeCallbacks) {
        if (!cb)
          continue;
        cb(match, resp);
        if (resp.isMatchIgnored)
          return doIgnore(lexeme);
      }
      if (newMode.skip) {
        modeBuffer += lexeme;
      } else {
        if (newMode.excludeBegin) {
          modeBuffer += lexeme;
        }
        processBuffer();
        if (!newMode.returnBegin && !newMode.excludeBegin) {
          modeBuffer = lexeme;
        }
      }
      startNewMode(newMode, match);
      return newMode.returnBegin ? 0 : lexeme.length;
    }
    function doEndMatch(match) {
      const lexeme = match[0];
      const matchPlusRemainder = codeToHighlight.substr(match.index);
      const endMode = endOfMode(top, match, matchPlusRemainder);
      if (!endMode) {
        return NO_MATCH;
      }
      const origin = top;
      if (top.endScope && top.endScope._wrap) {
        processBuffer();
        emitter.addKeyword(lexeme, top.endScope._wrap);
      } else if (top.endScope && top.endScope._multi) {
        processBuffer();
        emitMultiClass(top.endScope, match);
      } else if (origin.skip) {
        modeBuffer += lexeme;
      } else {
        if (!(origin.returnEnd || origin.excludeEnd)) {
          modeBuffer += lexeme;
        }
        processBuffer();
        if (origin.excludeEnd) {
          modeBuffer = lexeme;
        }
      }
      do {
        if (top.scope && !top.isMultiClass) {
          emitter.closeNode();
        }
        if (!top.skip && !top.subLanguage) {
          relevance += top.relevance;
        }
        top = top.parent;
      } while (top !== endMode.parent);
      if (endMode.starts) {
        startNewMode(endMode.starts, match);
      }
      return origin.returnEnd ? 0 : lexeme.length;
    }
    function processContinuations() {
      const list = [];
      for (let current = top; current !== language; current = current.parent) {
        if (current.scope) {
          list.unshift(current.scope);
        }
      }
      list.forEach((item) => emitter.openNode(item));
    }
    let lastMatch = {};
    function processLexeme(textBeforeMatch, match) {
      const lexeme = match && match[0];
      modeBuffer += textBeforeMatch;
      if (lexeme == null) {
        processBuffer();
        return 0;
      }
      if (lastMatch.type === "begin" && match.type === "end" && lastMatch.index === match.index && lexeme === "") {
        modeBuffer += codeToHighlight.slice(match.index, match.index + 1);
        if (!SAFE_MODE) {
          const err = new Error(`0 width match regex (${languageName})`);
          err.languageName = languageName;
          err.badRule = lastMatch.rule;
          throw err;
        }
        return 1;
      }
      lastMatch = match;
      if (match.type === "begin") {
        return doBeginMatch(match);
      } else if (match.type === "illegal" && !ignoreIllegals) {
        const err = new Error('Illegal lexeme "' + lexeme + '" for mode "' + (top.scope || "<unnamed>") + '"');
        err.mode = top;
        throw err;
      } else if (match.type === "end") {
        const processed = doEndMatch(match);
        if (processed !== NO_MATCH) {
          return processed;
        }
      }
      if (match.type === "illegal" && lexeme === "") {
        return 1;
      }
      if (iterations > 1e5 && iterations > match.index * 3) {
        const err = new Error("potential infinite loop, way more iterations than matches");
        throw err;
      }
      modeBuffer += lexeme;
      return lexeme.length;
    }
    const language = getLanguage(languageName);
    if (!language) {
      error(LANGUAGE_NOT_FOUND.replace("{}", languageName));
      throw new Error('Unknown language: "' + languageName + '"');
    }
    const md = compileLanguage(language);
    let result = "";
    let top = continuation || md;
    const continuations = {};
    const emitter = new options.__emitter(options);
    processContinuations();
    let modeBuffer = "";
    let relevance = 0;
    let index = 0;
    let iterations = 0;
    let resumeScanAtSamePosition = false;
    try {
      top.matcher.considerAll();
      for (; ; ) {
        iterations++;
        if (resumeScanAtSamePosition) {
          resumeScanAtSamePosition = false;
        } else {
          top.matcher.considerAll();
        }
        top.matcher.lastIndex = index;
        const match = top.matcher.exec(codeToHighlight);
        if (!match)
          break;
        const beforeMatch = codeToHighlight.substring(index, match.index);
        const processedCount = processLexeme(beforeMatch, match);
        index = match.index + processedCount;
      }
      processLexeme(codeToHighlight.substr(index));
      emitter.closeAllNodes();
      emitter.finalize();
      result = emitter.toHTML();
      return {
        language: languageName,
        value: result,
        relevance,
        illegal: false,
        _emitter: emitter,
        _top: top
      };
    } catch (err) {
      if (err.message && err.message.includes("Illegal")) {
        return {
          language: languageName,
          value: escape(codeToHighlight),
          illegal: true,
          relevance: 0,
          _illegalBy: {
            message: err.message,
            index,
            context: codeToHighlight.slice(index - 100, index + 100),
            mode: err.mode,
            resultSoFar: result
          },
          _emitter: emitter
        };
      } else if (SAFE_MODE) {
        return {
          language: languageName,
          value: escape(codeToHighlight),
          illegal: false,
          relevance: 0,
          errorRaised: err,
          _emitter: emitter,
          _top: top
        };
      } else {
        throw err;
      }
    }
  }
  function justTextHighlightResult(code) {
    const result = {
      value: escape(code),
      illegal: false,
      relevance: 0,
      _top: PLAINTEXT_LANGUAGE,
      _emitter: new options.__emitter(options)
    };
    result._emitter.addText(code);
    return result;
  }
  function highlightAuto(code, languageSubset) {
    languageSubset = languageSubset || options.languages || Object.keys(languages);
    const plaintext = justTextHighlightResult(code);
    const results = languageSubset.filter(getLanguage).filter(autoDetection).map((name) => _highlight(name, code, false));
    results.unshift(plaintext);
    const sorted = results.sort((a, b) => {
      if (a.relevance !== b.relevance)
        return b.relevance - a.relevance;
      if (a.language && b.language) {
        if (getLanguage(a.language).supersetOf === b.language) {
          return 1;
        } else if (getLanguage(b.language).supersetOf === a.language) {
          return -1;
        }
      }
      return 0;
    });
    const [best, secondBest] = sorted;
    const result = best;
    result.secondBest = secondBest;
    return result;
  }
  function updateClassName(element, currentLang, resultLang) {
    const language = currentLang && aliases[currentLang] || resultLang;
    element.classList.add("hljs");
    element.classList.add(`language-${language}`);
  }
  function highlightElement(element) {
    let node = null;
    const language = blockLanguage(element);
    if (shouldNotHighlight(language))
      return;
    fire("before:highlightElement", {el: element, language});
    if (!options.ignoreUnescapedHTML && element.children.length > 0) {
      console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk.");
      console.warn("https://github.com/highlightjs/highlight.js/issues/2886");
      console.warn(element);
    }
    node = element;
    const text = node.textContent;
    const result = language ? highlight2(text, {language, ignoreIllegals: true}) : highlightAuto(text);
    element.innerHTML = result.value;
    updateClassName(element, language, result.language);
    element.result = {
      language: result.language,
      re: result.relevance,
      relevance: result.relevance
    };
    if (result.secondBest) {
      element.secondBest = {
        language: result.secondBest.language,
        relevance: result.secondBest.relevance
      };
    }
    fire("after:highlightElement", {el: element, result, text});
  }
  function configure(userOptions) {
    options = inherit(options, userOptions);
  }
  const initHighlighting = () => {
    highlightAll();
    deprecated("10.6.0", "initHighlighting() deprecated.  Use highlightAll() now.");
  };
  function initHighlightingOnLoad() {
    highlightAll();
    deprecated("10.6.0", "initHighlightingOnLoad() deprecated.  Use highlightAll() now.");
  }
  let wantsHighlight = false;
  function highlightAll() {
    if (document.readyState === "loading") {
      wantsHighlight = true;
      return;
    }
    const blocks = document.querySelectorAll(options.cssSelector);
    blocks.forEach(highlightElement);
  }
  function boot() {
    if (wantsHighlight)
      highlightAll();
  }
  if (typeof window !== "undefined" && window.addEventListener) {
    window.addEventListener("DOMContentLoaded", boot, false);
  }
  function registerLanguage(languageName, languageDefinition) {
    let lang = null;
    try {
      lang = languageDefinition(hljs);
    } catch (error$1) {
      error("Language definition for '{}' could not be registered.".replace("{}", languageName));
      if (!SAFE_MODE) {
        throw error$1;
      } else {
        error(error$1);
      }
      lang = PLAINTEXT_LANGUAGE;
    }
    if (!lang.name)
      lang.name = languageName;
    languages[languageName] = lang;
    lang.rawDefinition = languageDefinition.bind(null, hljs);
    if (lang.aliases) {
      registerAliases(lang.aliases, {languageName});
    }
  }
  function unregisterLanguage(languageName) {
    delete languages[languageName];
    for (const alias of Object.keys(aliases)) {
      if (aliases[alias] === languageName) {
        delete aliases[alias];
      }
    }
  }
  function listLanguages() {
    return Object.keys(languages);
  }
  function getLanguage(name) {
    name = (name || "").toLowerCase();
    return languages[name] || languages[aliases[name]];
  }
  function registerAliases(aliasList, {languageName}) {
    if (typeof aliasList === "string") {
      aliasList = [aliasList];
    }
    aliasList.forEach((alias) => {
      aliases[alias.toLowerCase()] = languageName;
    });
  }
  function autoDetection(name) {
    const lang = getLanguage(name);
    return lang && !lang.disableAutodetect;
  }
  function upgradePluginAPI(plugin) {
    if (plugin["before:highlightBlock"] && !plugin["before:highlightElement"]) {
      plugin["before:highlightElement"] = (data) => {
        plugin["before:highlightBlock"](Object.assign({block: data.el}, data));
      };
    }
    if (plugin["after:highlightBlock"] && !plugin["after:highlightElement"]) {
      plugin["after:highlightElement"] = (data) => {
        plugin["after:highlightBlock"](Object.assign({block: data.el}, data));
      };
    }
  }
  function addPlugin(plugin) {
    upgradePluginAPI(plugin);
    plugins.push(plugin);
  }
  function fire(event, args) {
    const cb = event;
    plugins.forEach(function(plugin) {
      if (plugin[cb]) {
        plugin[cb](args);
      }
    });
  }
  function deprecateHighlightBlock(el) {
    deprecated("10.7.0", "highlightBlock will be removed entirely in v12.0");
    deprecated("10.7.0", "Please use highlightElement now.");
    return highlightElement(el);
  }
  Object.assign(hljs, {
    highlight: highlight2,
    highlightAuto,
    highlightAll,
    highlightElement,
    highlightBlock: deprecateHighlightBlock,
    configure,
    initHighlighting,
    initHighlightingOnLoad,
    registerLanguage,
    unregisterLanguage,
    listLanguages,
    getLanguage,
    registerAliases,
    autoDetection,
    inherit,
    addPlugin
  });
  hljs.debugMode = function() {
    SAFE_MODE = false;
  };
  hljs.safeMode = function() {
    SAFE_MODE = true;
  };
  hljs.versionString = version;
  for (const key in MODES$1) {
    if (typeof MODES$1[key] === "object") {
      deepFreeze$1(MODES$1[key]);
    }
  }
  Object.assign(hljs, MODES$1);
  return hljs;
};
var highlight = HLJS({});
var core = highlight;
const IDENT_RE = "[A-Za-z$_][0-9A-Za-z$_]*";
const KEYWORDS = [
  "as",
  "in",
  "of",
  "if",
  "for",
  "while",
  "finally",
  "var",
  "new",
  "function",
  "do",
  "return",
  "void",
  "else",
  "break",
  "catch",
  "instanceof",
  "with",
  "throw",
  "case",
  "default",
  "try",
  "switch",
  "continue",
  "typeof",
  "delete",
  "let",
  "yield",
  "const",
  "class",
  "debugger",
  "async",
  "await",
  "static",
  "import",
  "from",
  "export",
  "extends"
];
const LITERALS = [
  "true",
  "false",
  "null",
  "undefined",
  "NaN",
  "Infinity"
];
const TYPES = [
  "Intl",
  "DataView",
  "Number",
  "Math",
  "Date",
  "String",
  "RegExp",
  "Object",
  "Function",
  "Boolean",
  "Error",
  "Symbol",
  "Set",
  "Map",
  "WeakSet",
  "WeakMap",
  "Proxy",
  "Reflect",
  "JSON",
  "Promise",
  "Float64Array",
  "Int16Array",
  "Int32Array",
  "Int8Array",
  "Uint16Array",
  "Uint32Array",
  "Float32Array",
  "Array",
  "Uint8Array",
  "Uint8ClampedArray",
  "ArrayBuffer",
  "BigInt64Array",
  "BigUint64Array",
  "BigInt"
];
const ERROR_TYPES = [
  "EvalError",
  "InternalError",
  "RangeError",
  "ReferenceError",
  "SyntaxError",
  "TypeError",
  "URIError"
];
const BUILT_IN_GLOBALS = [
  "setInterval",
  "setTimeout",
  "clearInterval",
  "clearTimeout",
  "require",
  "exports",
  "eval",
  "isFinite",
  "isNaN",
  "parseFloat",
  "parseInt",
  "decodeURI",
  "decodeURIComponent",
  "encodeURI",
  "encodeURIComponent",
  "escape",
  "unescape"
];
const BUILT_IN_VARIABLES = [
  "arguments",
  "this",
  "super",
  "console",
  "window",
  "document",
  "localStorage",
  "module",
  "global"
];
const BUILT_INS = [].concat(BUILT_IN_GLOBALS, TYPES, ERROR_TYPES);
function source$3(re) {
  if (!re)
    return null;
  if (typeof re === "string")
    return re;
  return re.source;
}
function lookahead$2(re) {
  return concat$3("(?=", re, ")");
}
function concat$3(...args) {
  const joined = args.map((x) => source$3(x)).join("");
  return joined;
}
function javascript(hljs) {
  const hasClosingTag = (match, {after}) => {
    const tag2 = "</" + match[0].slice(1);
    const pos = match.input.indexOf(tag2, after);
    return pos !== -1;
  };
  const IDENT_RE$12 = IDENT_RE;
  const FRAGMENT = {
    begin: "<>",
    end: "</>"
  };
  const XML_TAG = {
    begin: /<[A-Za-z0-9\\._:-]+/,
    end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
    isTrulyOpeningTag: (match, response) => {
      const afterMatchIndex = match[0].length + match.index;
      const nextChar = match.input[afterMatchIndex];
      if (nextChar === "<") {
        response.ignoreMatch();
        return;
      }
      if (nextChar === ">") {
        if (!hasClosingTag(match, {after: afterMatchIndex})) {
          response.ignoreMatch();
        }
      }
    }
  };
  const KEYWORDS$1 = {
    $pattern: IDENT_RE,
    keyword: KEYWORDS,
    literal: LITERALS,
    built_in: BUILT_INS,
    "variable.language": BUILT_IN_VARIABLES
  };
  const decimalDigits = "[0-9](_?[0-9])*";
  const frac = `\\.(${decimalDigits})`;
  const decimalInteger = `0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*`;
  const NUMBER = {
    className: "number",
    variants: [
      {begin: `(\\b(${decimalInteger})((${frac})|\\.)?|(${frac}))[eE][+-]?(${decimalDigits})\\b`},
      {begin: `\\b(${decimalInteger})\\b((${frac})\\b|\\.)?|(${frac})\\b`},
      {begin: `\\b(0|[1-9](_?[0-9])*)n\\b`},
      {begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},
      {begin: "\\b0[bB][0-1](_?[0-1])*n?\\b"},
      {begin: "\\b0[oO][0-7](_?[0-7])*n?\\b"},
      {begin: "\\b0[0-7]+n?\\b"}
    ],
    relevance: 0
  };
  const SUBST = {
    className: "subst",
    begin: "\\$\\{",
    end: "\\}",
    keywords: KEYWORDS$1,
    contains: []
  };
  const HTML_TEMPLATE = {
    begin: "html`",
    end: "",
    starts: {
      end: "`",
      returnEnd: false,
      contains: [
        hljs.BACKSLASH_ESCAPE,
        SUBST
      ],
      subLanguage: "xml"
    }
  };
  const CSS_TEMPLATE = {
    begin: "css`",
    end: "",
    starts: {
      end: "`",
      returnEnd: false,
      contains: [
        hljs.BACKSLASH_ESCAPE,
        SUBST
      ],
      subLanguage: "css"
    }
  };
  const TEMPLATE_STRING = {
    className: "string",
    begin: "`",
    end: "`",
    contains: [
      hljs.BACKSLASH_ESCAPE,
      SUBST
    ]
  };
  const JSDOC_COMMENT = hljs.COMMENT(/\/\*\*(?!\/)/, "\\*/", {
    relevance: 0,
    contains: [
      {
        begin: "(?=@[A-Za-z]+)",
        relevance: 0,
        contains: [
          {
            className: "doctag",
            begin: "@[A-Za-z]+"
          },
          {
            className: "type",
            begin: "\\{",
            end: "\\}",
            excludeEnd: true,
            excludeBegin: true,
            relevance: 0
          },
          {
            className: "variable",
            begin: IDENT_RE$12 + "(?=\\s*(-)|$)",
            endsParent: true,
            relevance: 0
          },
          {
            begin: /(?=[^\n])\s/,
            relevance: 0
          }
        ]
      }
    ]
  });
  const COMMENT2 = {
    className: "comment",
    variants: [
      JSDOC_COMMENT,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.C_LINE_COMMENT_MODE
    ]
  };
  const SUBST_INTERNALS = [
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE,
    HTML_TEMPLATE,
    CSS_TEMPLATE,
    TEMPLATE_STRING,
    NUMBER,
    hljs.REGEXP_MODE
  ];
  SUBST.contains = SUBST_INTERNALS.concat({
    begin: /\{/,
    end: /\}/,
    keywords: KEYWORDS$1,
    contains: [
      "self"
    ].concat(SUBST_INTERNALS)
  });
  const SUBST_AND_COMMENTS = [].concat(COMMENT2, SUBST.contains);
  const PARAMS_CONTAINS = SUBST_AND_COMMENTS.concat([
    {
      begin: /\(/,
      end: /\)/,
      keywords: KEYWORDS$1,
      contains: ["self"].concat(SUBST_AND_COMMENTS)
    }
  ]);
  const PARAMS = {
    className: "params",
    begin: /\(/,
    end: /\)/,
    excludeBegin: true,
    excludeEnd: true,
    keywords: KEYWORDS$1,
    contains: PARAMS_CONTAINS
  };
  const CLASS_OR_EXTENDS = {
    variants: [
      {
        match: [
          /class/,
          /\s+/,
          IDENT_RE$12
        ],
        scope: {
          1: "keyword",
          3: "title.class"
        }
      },
      {
        match: [
          /extends/,
          /\s+/,
          concat$3(IDENT_RE$12, "(", concat$3(/\./, IDENT_RE$12), ")*")
        ],
        scope: {
          1: "keyword",
          3: "title.class.inherited"
        }
      }
    ]
  };
  const CLASS_REFERENCE = {
    relevance: 0,
    match: /\b[A-Z][a-z]+([A-Z][a-z]+)*/,
    className: "title.class",
    keywords: {
      _: [
        ...TYPES,
        ...ERROR_TYPES
      ]
    }
  };
  const USE_STRICT = {
    label: "use_strict",
    className: "meta",
    relevance: 10,
    begin: /^\s*['"]use (strict|asm)['"]/
  };
  const FUNCTION_DEFINITION = {
    variants: [
      {
        match: [
          /function/,
          /\s+/,
          IDENT_RE$12,
          /(?=\s*\()/
        ]
      },
      {
        match: [
          /function/,
          /\s*(?=\()/
        ]
      }
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    label: "func.def",
    contains: [PARAMS],
    illegal: /%/
  };
  const UPPER_CASE_CONSTANT = {
    relevance: 0,
    match: /\b[A-Z][A-Z_0-9]+\b/,
    className: "variable.constant"
  };
  function noneOf(list) {
    return concat$3("(?!", list.join("|"), ")");
  }
  const FUNCTION_CALL = {
    match: concat$3(/\b/, noneOf([
      ...BUILT_IN_GLOBALS,
      "super"
    ]), IDENT_RE$12, lookahead$2(/\(/)),
    className: "title.function",
    relevance: 0
  };
  const PROPERTY_ACCESS = {
    begin: concat$3(/\./, lookahead$2(concat$3(IDENT_RE$12, /(?![0-9A-Za-z$_(])/))),
    end: IDENT_RE$12,
    excludeBegin: true,
    keywords: "prototype",
    className: "property",
    relevance: 0
  };
  const GETTER_OR_SETTER = {
    match: [
      /get|set/,
      /\s+/,
      IDENT_RE$12,
      /(?=\()/
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      {
        begin: /\(\)/
      },
      PARAMS
    ]
  };
  const FUNC_LEAD_IN_RE = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + hljs.UNDERSCORE_IDENT_RE + ")\\s*=>";
  const FUNCTION_VARIABLE = {
    match: [
      /const|var|let/,
      /\s+/,
      IDENT_RE$12,
      /\s*/,
      /=\s*/,
      lookahead$2(FUNC_LEAD_IN_RE)
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      PARAMS
    ]
  };
  return {
    name: "Javascript",
    aliases: ["js", "jsx", "mjs", "cjs"],
    keywords: KEYWORDS$1,
    exports: {PARAMS_CONTAINS},
    illegal: /#(?![$_A-z])/,
    contains: [
      hljs.SHEBANG({
        label: "shebang",
        binary: "node",
        relevance: 5
      }),
      USE_STRICT,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      HTML_TEMPLATE,
      CSS_TEMPLATE,
      TEMPLATE_STRING,
      COMMENT2,
      NUMBER,
      CLASS_REFERENCE,
      {
        className: "attr",
        begin: IDENT_RE$12 + lookahead$2(":"),
        relevance: 0
      },
      FUNCTION_VARIABLE,
      {
        begin: "(" + hljs.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
        keywords: "return throw case",
        relevance: 0,
        contains: [
          COMMENT2,
          hljs.REGEXP_MODE,
          {
            className: "function",
            begin: FUNC_LEAD_IN_RE,
            returnBegin: true,
            end: "\\s*=>",
            contains: [
              {
                className: "params",
                variants: [
                  {
                    begin: hljs.UNDERSCORE_IDENT_RE,
                    relevance: 0
                  },
                  {
                    className: null,
                    begin: /\(\s*\)/,
                    skip: true
                  },
                  {
                    begin: /\(/,
                    end: /\)/,
                    excludeBegin: true,
                    excludeEnd: true,
                    keywords: KEYWORDS$1,
                    contains: PARAMS_CONTAINS
                  }
                ]
              }
            ]
          },
          {
            begin: /,/,
            relevance: 0
          },
          {
            match: /\s+/,
            relevance: 0
          },
          {
            variants: [
              {begin: FRAGMENT.begin, end: FRAGMENT.end},
              {
                begin: XML_TAG.begin,
                "on:begin": XML_TAG.isTrulyOpeningTag,
                end: XML_TAG.end
              }
            ],
            subLanguage: "xml",
            contains: [
              {
                begin: XML_TAG.begin,
                end: XML_TAG.end,
                skip: true,
                contains: ["self"]
              }
            ]
          }
        ]
      },
      FUNCTION_DEFINITION,
      {
        beginKeywords: "while if switch catch for"
      },
      {
        begin: "\\b(?!function)" + hljs.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
        returnBegin: true,
        label: "func.def",
        contains: [
          PARAMS,
          hljs.inherit(hljs.TITLE_MODE, {begin: IDENT_RE$12, className: "title.function"})
        ]
      },
      {
        match: /\.\.\./,
        relevance: 0
      },
      PROPERTY_ACCESS,
      {
        match: "\\$" + IDENT_RE$12,
        relevance: 0
      },
      {
        match: [/\bconstructor(?=\s*\()/],
        className: {1: "title.function"},
        contains: [PARAMS]
      },
      FUNCTION_CALL,
      UPPER_CASE_CONSTANT,
      CLASS_OR_EXTENDS,
      GETTER_OR_SETTER,
      {
        match: /\$[(.]/
      }
    ]
  };
}
function source$2(re) {
  if (!re)
    return null;
  if (typeof re === "string")
    return re;
  return re.source;
}
function lookahead$1(re) {
  return concat$2("(?=", re, ")");
}
function optional(re) {
  return concat$2("(?:", re, ")?");
}
function concat$2(...args) {
  const joined = args.map((x) => source$2(x)).join("");
  return joined;
}
function stripOptionsFromArgs(args) {
  const opts = args[args.length - 1];
  if (typeof opts === "object" && opts.constructor === Object) {
    args.splice(args.length - 1, 1);
    return opts;
  } else {
    return {};
  }
}
function either(...args) {
  const opts = stripOptionsFromArgs(args);
  const joined = "(" + (opts.capture ? "" : "?:") + args.map((x) => source$2(x)).join("|") + ")";
  return joined;
}
function xml(hljs) {
  const TAG_NAME_RE = concat$2(/[A-Z_]/, optional(/[A-Z0-9_.-]*:/), /[A-Z0-9_.-]*/);
  const XML_IDENT_RE = /[A-Za-z0-9._:-]+/;
  const XML_ENTITIES = {
    className: "symbol",
    begin: /&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/
  };
  const XML_META_KEYWORDS = {
    begin: /\s/,
    contains: [
      {
        className: "keyword",
        begin: /#?[a-z_][a-z1-9_-]+/,
        illegal: /\n/
      }
    ]
  };
  const XML_META_PAR_KEYWORDS = hljs.inherit(XML_META_KEYWORDS, {
    begin: /\(/,
    end: /\)/
  });
  const APOS_META_STRING_MODE = hljs.inherit(hljs.APOS_STRING_MODE, {
    className: "string"
  });
  const QUOTE_META_STRING_MODE = hljs.inherit(hljs.QUOTE_STRING_MODE, {
    className: "string"
  });
  const TAG_INTERNALS = {
    endsWithParent: true,
    illegal: /</,
    relevance: 0,
    contains: [
      {
        className: "attr",
        begin: XML_IDENT_RE,
        relevance: 0
      },
      {
        begin: /=\s*/,
        relevance: 0,
        contains: [
          {
            className: "string",
            endsParent: true,
            variants: [
              {
                begin: /"/,
                end: /"/,
                contains: [XML_ENTITIES]
              },
              {
                begin: /'/,
                end: /'/,
                contains: [XML_ENTITIES]
              },
              {
                begin: /[^\s"'=<>`]+/
              }
            ]
          }
        ]
      }
    ]
  };
  return {
    name: "HTML, XML",
    aliases: [
      "html",
      "xhtml",
      "rss",
      "atom",
      "xjb",
      "xsd",
      "xsl",
      "plist",
      "wsf",
      "svg"
    ],
    case_insensitive: true,
    contains: [
      {
        className: "meta",
        begin: /<![a-z]/,
        end: />/,
        relevance: 10,
        contains: [
          XML_META_KEYWORDS,
          QUOTE_META_STRING_MODE,
          APOS_META_STRING_MODE,
          XML_META_PAR_KEYWORDS,
          {
            begin: /\[/,
            end: /\]/,
            contains: [
              {
                className: "meta",
                begin: /<![a-z]/,
                end: />/,
                contains: [
                  XML_META_KEYWORDS,
                  XML_META_PAR_KEYWORDS,
                  QUOTE_META_STRING_MODE,
                  APOS_META_STRING_MODE
                ]
              }
            ]
          }
        ]
      },
      hljs.COMMENT(/<!--/, /-->/, {
        relevance: 10
      }),
      {
        begin: /<!\[CDATA\[/,
        end: /\]\]>/,
        relevance: 10
      },
      XML_ENTITIES,
      {
        className: "meta",
        begin: /<\?xml/,
        end: /\?>/,
        relevance: 10
      },
      {
        className: "tag",
        begin: /<style(?=\s|>)/,
        end: />/,
        keywords: {
          name: "style"
        },
        contains: [TAG_INTERNALS],
        starts: {
          end: /<\/style>/,
          returnEnd: true,
          subLanguage: [
            "css",
            "xml"
          ]
        }
      },
      {
        className: "tag",
        begin: /<script(?=\s|>)/,
        end: />/,
        keywords: {
          name: "script"
        },
        contains: [TAG_INTERNALS],
        starts: {
          end: /<\/script>/,
          returnEnd: true,
          subLanguage: [
            "javascript",
            "handlebars",
            "xml"
          ]
        }
      },
      {
        className: "tag",
        begin: /<>|<\/>/
      },
      {
        className: "tag",
        begin: concat$2(/</, lookahead$1(concat$2(TAG_NAME_RE, either(/\/>/, />/, /\s/)))),
        end: /\/?>/,
        contains: [
          {
            className: "name",
            begin: TAG_NAME_RE,
            relevance: 0,
            starts: TAG_INTERNALS
          }
        ]
      },
      {
        className: "tag",
        begin: concat$2(/<\//, lookahead$1(concat$2(TAG_NAME_RE, />/))),
        contains: [
          {
            className: "name",
            begin: TAG_NAME_RE,
            relevance: 0
          },
          {
            begin: />/,
            relevance: 0,
            endsParent: true
          }
        ]
      }
    ]
  };
}
function source$1(re) {
  if (!re)
    return null;
  if (typeof re === "string")
    return re;
  return re.source;
}
function concat$1(...args) {
  const joined = args.map((x) => source$1(x)).join("");
  return joined;
}
function bash(hljs) {
  const VAR = {};
  const BRACED_VAR = {
    begin: /\$\{/,
    end: /\}/,
    contains: [
      "self",
      {
        begin: /:-/,
        contains: [VAR]
      }
    ]
  };
  Object.assign(VAR, {
    className: "variable",
    variants: [
      {begin: concat$1(/\$[\w\d#@][\w\d_]*/, `(?![\\w\\d])(?![$])`)},
      BRACED_VAR
    ]
  });
  const SUBST = {
    className: "subst",
    begin: /\$\(/,
    end: /\)/,
    contains: [hljs.BACKSLASH_ESCAPE]
  };
  const HERE_DOC = {
    begin: /<<-?\s*(?=\w+)/,
    starts: {
      contains: [
        hljs.END_SAME_AS_BEGIN({
          begin: /(\w+)/,
          end: /(\w+)/,
          className: "string"
        })
      ]
    }
  };
  const QUOTE_STRING = {
    className: "string",
    begin: /"/,
    end: /"/,
    contains: [
      hljs.BACKSLASH_ESCAPE,
      VAR,
      SUBST
    ]
  };
  SUBST.contains.push(QUOTE_STRING);
  const ESCAPED_QUOTE = {
    className: "",
    begin: /\\"/
  };
  const APOS_STRING = {
    className: "string",
    begin: /'/,
    end: /'/
  };
  const ARITHMETIC = {
    begin: /\$\(\(/,
    end: /\)\)/,
    contains: [
      {begin: /\d+#[0-9a-f]+/, className: "number"},
      hljs.NUMBER_MODE,
      VAR
    ]
  };
  const SH_LIKE_SHELLS = [
    "fish",
    "bash",
    "zsh",
    "sh",
    "csh",
    "ksh",
    "tcsh",
    "dash",
    "scsh"
  ];
  const KNOWN_SHEBANG = hljs.SHEBANG({
    binary: `(${SH_LIKE_SHELLS.join("|")})`,
    relevance: 10
  });
  const FUNCTION = {
    className: "function",
    begin: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
    returnBegin: true,
    contains: [hljs.inherit(hljs.TITLE_MODE, {begin: /\w[\w\d_]*/})],
    relevance: 0
  };
  const KEYWORDS2 = [
    "if",
    "then",
    "else",
    "elif",
    "fi",
    "for",
    "while",
    "in",
    "do",
    "done",
    "case",
    "esac",
    "function"
  ];
  const LITERALS2 = [
    "true",
    "false"
  ];
  return {
    name: "Bash",
    aliases: ["sh"],
    keywords: {
      $pattern: /\b[a-z._-]+\b/,
      keyword: KEYWORDS2,
      literal: LITERALS2,
      built_in: "break cd continue eval exec exit export getopts hash pwd readonly return shift test times trap umask unset alias bind builtin caller command declare echo enable help let local logout mapfile printf read readarray source type typeset ulimit unalias set shopt autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate fc fg float functions getcap getln history integer jobs kill limit log noglob popd print pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof zpty zregexparse zsocket zstyle ztcp"
    },
    contains: [
      KNOWN_SHEBANG,
      hljs.SHEBANG(),
      FUNCTION,
      ARITHMETIC,
      hljs.HASH_COMMENT_MODE,
      HERE_DOC,
      QUOTE_STRING,
      ESCAPED_QUOTE,
      APOS_STRING,
      VAR
    ]
  };
}
function php(hljs) {
  const VARIABLE = {
    className: "variable",
    begin: `\\$+[a-zA-Z_\x7F-\xFF][a-zA-Z0-9_\x7F-\xFF]*(?![A-Za-z0-9])(?![$])`
  };
  const PREPROCESSOR = {
    className: "meta",
    variants: [
      {begin: /<\?php/, relevance: 10},
      {begin: /<\?[=]?/},
      {begin: /\?>/}
    ]
  };
  const SUBST = {
    className: "subst",
    variants: [
      {begin: /\$\w+/},
      {begin: /\{\$/, end: /\}/}
    ]
  };
  const SINGLE_QUOTED = hljs.inherit(hljs.APOS_STRING_MODE, {
    illegal: null
  });
  const DOUBLE_QUOTED = hljs.inherit(hljs.QUOTE_STRING_MODE, {
    illegal: null,
    contains: hljs.QUOTE_STRING_MODE.contains.concat(SUBST)
  });
  const HEREDOC = hljs.END_SAME_AS_BEGIN({
    begin: /<<<[ \t]*(\w+)\n/,
    end: /[ \t]*(\w+)\b/,
    contains: hljs.QUOTE_STRING_MODE.contains.concat(SUBST)
  });
  const STRING = {
    className: "string",
    contains: [hljs.BACKSLASH_ESCAPE, PREPROCESSOR],
    variants: [
      hljs.inherit(SINGLE_QUOTED, {
        begin: "b'",
        end: "'"
      }),
      hljs.inherit(DOUBLE_QUOTED, {
        begin: 'b"',
        end: '"'
      }),
      DOUBLE_QUOTED,
      SINGLE_QUOTED,
      HEREDOC
    ]
  };
  const NUMBER = {
    className: "number",
    variants: [
      {begin: `\\b0b[01]+(?:_[01]+)*\\b`},
      {begin: `\\b0o[0-7]+(?:_[0-7]+)*\\b`},
      {begin: `\\b0x[\\da-f]+(?:_[\\da-f]+)*\\b`},
      {begin: `(?:\\b\\d+(?:_\\d+)*(\\.(?:\\d+(?:_\\d+)*))?|\\B\\.\\d+)(?:e[+-]?\\d+)?`}
    ],
    relevance: 0
  };
  const KEYWORDS2 = {
    keyword: "__CLASS__ __DIR__ __FILE__ __FUNCTION__ __LINE__ __METHOD__ __NAMESPACE__ __TRAIT__ die echo exit include include_once print require require_once array abstract and as binary bool boolean break callable case catch class clone const continue declare default do double else elseif empty enddeclare endfor endforeach endif endswitch endwhile enum eval extends final finally float for foreach from global goto if implements instanceof insteadof int integer interface isset iterable list match|0 mixed new object or private protected public real return string switch throw trait try unset use var void while xor yield",
    literal: "false null true",
    built_in: "Error|0 AppendIterator ArgumentCountError ArithmeticError ArrayIterator ArrayObject AssertionError BadFunctionCallException BadMethodCallException CachingIterator CallbackFilterIterator CompileError Countable DirectoryIterator DivisionByZeroError DomainException EmptyIterator ErrorException Exception FilesystemIterator FilterIterator GlobIterator InfiniteIterator InvalidArgumentException IteratorIterator LengthException LimitIterator LogicException MultipleIterator NoRewindIterator OutOfBoundsException OutOfRangeException OuterIterator OverflowException ParentIterator ParseError RangeException RecursiveArrayIterator RecursiveCachingIterator RecursiveCallbackFilterIterator RecursiveDirectoryIterator RecursiveFilterIterator RecursiveIterator RecursiveIteratorIterator RecursiveRegexIterator RecursiveTreeIterator RegexIterator RuntimeException SeekableIterator SplDoublyLinkedList SplFileInfo SplFileObject SplFixedArray SplHeap SplMaxHeap SplMinHeap SplObjectStorage SplObserver SplObserver SplPriorityQueue SplQueue SplStack SplSubject SplSubject SplTempFileObject TypeError UnderflowException UnexpectedValueException UnhandledMatchError ArrayAccess Closure Generator Iterator IteratorAggregate Serializable Stringable Throwable Traversable WeakReference WeakMap Directory __PHP_Incomplete_Class parent php_user_filter self static stdClass"
  };
  return {
    case_insensitive: true,
    keywords: KEYWORDS2,
    contains: [
      hljs.HASH_COMMENT_MODE,
      hljs.COMMENT("//", "$", {contains: [PREPROCESSOR]}),
      hljs.COMMENT("/\\*", "\\*/", {
        contains: [
          {
            className: "doctag",
            begin: "@[A-Za-z]+"
          }
        ]
      }),
      hljs.COMMENT("__halt_compiler.+?;", false, {
        endsWithParent: true,
        keywords: "__halt_compiler"
      }),
      PREPROCESSOR,
      {
        className: "keyword",
        begin: /\$this\b/
      },
      VARIABLE,
      {
        begin: /(::|->)+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/
      },
      {
        className: "function",
        relevance: 0,
        beginKeywords: "fn function",
        end: /[;{]/,
        excludeEnd: true,
        illegal: "[$%\\[]",
        contains: [
          {
            beginKeywords: "use"
          },
          hljs.UNDERSCORE_TITLE_MODE,
          {
            begin: "=>",
            endsParent: true
          },
          {
            className: "params",
            begin: "\\(",
            end: "\\)",
            excludeBegin: true,
            excludeEnd: true,
            keywords: KEYWORDS2,
            contains: [
              "self",
              VARIABLE,
              hljs.C_BLOCK_COMMENT_MODE,
              STRING,
              NUMBER
            ]
          }
        ]
      },
      {
        className: "class",
        variants: [
          {beginKeywords: "enum", illegal: /[($"]/},
          {beginKeywords: "class interface trait", illegal: /[:($"]/}
        ],
        relevance: 0,
        end: /\{/,
        excludeEnd: true,
        contains: [
          {beginKeywords: "extends implements"},
          hljs.UNDERSCORE_TITLE_MODE
        ]
      },
      {
        beginKeywords: "namespace",
        relevance: 0,
        end: ";",
        illegal: /[.']/,
        contains: [hljs.UNDERSCORE_TITLE_MODE]
      },
      {
        beginKeywords: "use",
        relevance: 0,
        end: ";",
        contains: [hljs.UNDERSCORE_TITLE_MODE]
      },
      STRING,
      NUMBER
    ]
  };
}
const MODES = (hljs) => {
  return {
    IMPORTANT: {
      scope: "meta",
      begin: "!important"
    },
    HEXCOLOR: {
      scope: "number",
      begin: "#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})"
    },
    ATTRIBUTE_SELECTOR_MODE: {
      scope: "selector-attr",
      begin: /\[/,
      end: /\]/,
      illegal: "$",
      contains: [
        hljs.APOS_STRING_MODE,
        hljs.QUOTE_STRING_MODE
      ]
    },
    CSS_NUMBER_MODE: {
      scope: "number",
      begin: hljs.NUMBER_RE + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
      relevance: 0
    },
    CSS_VARIABLE: {
      className: "attr",
      begin: /--[A-Za-z][A-Za-z0-9_-]*/
    }
  };
};
const TAGS = [
  "a",
  "abbr",
  "address",
  "article",
  "aside",
  "audio",
  "b",
  "blockquote",
  "body",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "dd",
  "del",
  "details",
  "dfn",
  "div",
  "dl",
  "dt",
  "em",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "hgroup",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "label",
  "legend",
  "li",
  "main",
  "mark",
  "menu",
  "nav",
  "object",
  "ol",
  "p",
  "q",
  "quote",
  "samp",
  "section",
  "span",
  "strong",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "tr",
  "ul",
  "var",
  "video"
];
const MEDIA_FEATURES = [
  "any-hover",
  "any-pointer",
  "aspect-ratio",
  "color",
  "color-gamut",
  "color-index",
  "device-aspect-ratio",
  "device-height",
  "device-width",
  "display-mode",
  "forced-colors",
  "grid",
  "height",
  "hover",
  "inverted-colors",
  "monochrome",
  "orientation",
  "overflow-block",
  "overflow-inline",
  "pointer",
  "prefers-color-scheme",
  "prefers-contrast",
  "prefers-reduced-motion",
  "prefers-reduced-transparency",
  "resolution",
  "scan",
  "scripting",
  "update",
  "width",
  "min-width",
  "max-width",
  "min-height",
  "max-height"
];
const PSEUDO_CLASSES = [
  "active",
  "any-link",
  "blank",
  "checked",
  "current",
  "default",
  "defined",
  "dir",
  "disabled",
  "drop",
  "empty",
  "enabled",
  "first",
  "first-child",
  "first-of-type",
  "fullscreen",
  "future",
  "focus",
  "focus-visible",
  "focus-within",
  "has",
  "host",
  "host-context",
  "hover",
  "indeterminate",
  "in-range",
  "invalid",
  "is",
  "lang",
  "last-child",
  "last-of-type",
  "left",
  "link",
  "local-link",
  "not",
  "nth-child",
  "nth-col",
  "nth-last-child",
  "nth-last-col",
  "nth-last-of-type",
  "nth-of-type",
  "only-child",
  "only-of-type",
  "optional",
  "out-of-range",
  "past",
  "placeholder-shown",
  "read-only",
  "read-write",
  "required",
  "right",
  "root",
  "scope",
  "target",
  "target-within",
  "user-invalid",
  "valid",
  "visited",
  "where"
];
const PSEUDO_ELEMENTS = [
  "after",
  "backdrop",
  "before",
  "cue",
  "cue-region",
  "first-letter",
  "first-line",
  "grammar-error",
  "marker",
  "part",
  "placeholder",
  "selection",
  "slotted",
  "spelling-error"
];
const ATTRIBUTES = [
  "align-content",
  "align-items",
  "align-self",
  "animation",
  "animation-delay",
  "animation-direction",
  "animation-duration",
  "animation-fill-mode",
  "animation-iteration-count",
  "animation-name",
  "animation-play-state",
  "animation-timing-function",
  "auto",
  "backface-visibility",
  "background",
  "background-attachment",
  "background-clip",
  "background-color",
  "background-image",
  "background-origin",
  "background-position",
  "background-repeat",
  "background-size",
  "border",
  "border-bottom",
  "border-bottom-color",
  "border-bottom-left-radius",
  "border-bottom-right-radius",
  "border-bottom-style",
  "border-bottom-width",
  "border-collapse",
  "border-color",
  "border-image",
  "border-image-outset",
  "border-image-repeat",
  "border-image-slice",
  "border-image-source",
  "border-image-width",
  "border-left",
  "border-left-color",
  "border-left-style",
  "border-left-width",
  "border-radius",
  "border-right",
  "border-right-color",
  "border-right-style",
  "border-right-width",
  "border-spacing",
  "border-style",
  "border-top",
  "border-top-color",
  "border-top-left-radius",
  "border-top-right-radius",
  "border-top-style",
  "border-top-width",
  "border-width",
  "bottom",
  "box-decoration-break",
  "box-shadow",
  "box-sizing",
  "break-after",
  "break-before",
  "break-inside",
  "caption-side",
  "clear",
  "clip",
  "clip-path",
  "color",
  "column-count",
  "column-fill",
  "column-gap",
  "column-rule",
  "column-rule-color",
  "column-rule-style",
  "column-rule-width",
  "column-span",
  "column-width",
  "columns",
  "content",
  "counter-increment",
  "counter-reset",
  "cursor",
  "direction",
  "display",
  "empty-cells",
  "filter",
  "flex",
  "flex-basis",
  "flex-direction",
  "flex-flow",
  "flex-grow",
  "flex-shrink",
  "flex-wrap",
  "float",
  "font",
  "font-display",
  "font-family",
  "font-feature-settings",
  "font-kerning",
  "font-language-override",
  "font-size",
  "font-size-adjust",
  "font-smoothing",
  "font-stretch",
  "font-style",
  "font-variant",
  "font-variant-ligatures",
  "font-variation-settings",
  "font-weight",
  "height",
  "hyphens",
  "icon",
  "image-orientation",
  "image-rendering",
  "image-resolution",
  "ime-mode",
  "inherit",
  "initial",
  "justify-content",
  "left",
  "letter-spacing",
  "line-height",
  "list-style",
  "list-style-image",
  "list-style-position",
  "list-style-type",
  "margin",
  "margin-bottom",
  "margin-left",
  "margin-right",
  "margin-top",
  "marks",
  "mask",
  "max-height",
  "max-width",
  "min-height",
  "min-width",
  "nav-down",
  "nav-index",
  "nav-left",
  "nav-right",
  "nav-up",
  "none",
  "normal",
  "object-fit",
  "object-position",
  "opacity",
  "order",
  "orphans",
  "outline",
  "outline-color",
  "outline-offset",
  "outline-style",
  "outline-width",
  "overflow",
  "overflow-wrap",
  "overflow-x",
  "overflow-y",
  "padding",
  "padding-bottom",
  "padding-left",
  "padding-right",
  "padding-top",
  "page-break-after",
  "page-break-before",
  "page-break-inside",
  "perspective",
  "perspective-origin",
  "pointer-events",
  "position",
  "quotes",
  "resize",
  "right",
  "src",
  "tab-size",
  "table-layout",
  "text-align",
  "text-align-last",
  "text-decoration",
  "text-decoration-color",
  "text-decoration-line",
  "text-decoration-style",
  "text-indent",
  "text-overflow",
  "text-rendering",
  "text-shadow",
  "text-transform",
  "text-underline-position",
  "top",
  "transform",
  "transform-origin",
  "transform-style",
  "transition",
  "transition-delay",
  "transition-duration",
  "transition-property",
  "transition-timing-function",
  "unicode-bidi",
  "vertical-align",
  "visibility",
  "white-space",
  "widows",
  "width",
  "word-break",
  "word-spacing",
  "word-wrap",
  "z-index"
].reverse();
function source(re) {
  if (!re)
    return null;
  if (typeof re === "string")
    return re;
  return re.source;
}
function lookahead(re) {
  return concat("(?=", re, ")");
}
function concat(...args) {
  const joined = args.map((x) => source(x)).join("");
  return joined;
}
function css(hljs) {
  const modes = MODES(hljs);
  const FUNCTION_DISPATCH = {
    className: "built_in",
    begin: /[\w-]+(?=\()/
  };
  const VENDOR_PREFIX = {
    begin: /-(webkit|moz|ms|o)-(?=[a-z])/
  };
  const AT_MODIFIERS = "and or not only";
  const AT_PROPERTY_RE = /@-?\w[\w]*(-\w+)*/;
  const IDENT_RE2 = "[a-zA-Z-][a-zA-Z0-9_-]*";
  const STRINGS = [
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE
  ];
  return {
    name: "CSS",
    case_insensitive: true,
    illegal: /[=|'\$]/,
    keywords: {
      keyframePosition: "from to"
    },
    classNameAliases: {
      keyframePosition: "selector-tag"
    },
    contains: [
      hljs.C_BLOCK_COMMENT_MODE,
      VENDOR_PREFIX,
      modes.CSS_NUMBER_MODE,
      {
        className: "selector-id",
        begin: /#[A-Za-z0-9_-]+/,
        relevance: 0
      },
      {
        className: "selector-class",
        begin: "\\." + IDENT_RE2,
        relevance: 0
      },
      modes.ATTRIBUTE_SELECTOR_MODE,
      {
        className: "selector-pseudo",
        variants: [
          {
            begin: ":(" + PSEUDO_CLASSES.join("|") + ")"
          },
          {
            begin: "::(" + PSEUDO_ELEMENTS.join("|") + ")"
          }
        ]
      },
      modes.CSS_VARIABLE,
      {
        className: "attribute",
        begin: "\\b(" + ATTRIBUTES.join("|") + ")\\b"
      },
      {
        begin: ":",
        end: "[;}]",
        contains: [
          modes.HEXCOLOR,
          modes.IMPORTANT,
          modes.CSS_NUMBER_MODE,
          ...STRINGS,
          {
            begin: /(url|data-uri)\(/,
            end: /\)/,
            relevance: 0,
            keywords: {
              built_in: "url data-uri"
            },
            contains: [
              {
                className: "string",
                begin: /[^)]/,
                endsWithParent: true,
                excludeEnd: true
              }
            ]
          },
          FUNCTION_DISPATCH
        ]
      },
      {
        begin: lookahead(/@/),
        end: "[{;]",
        relevance: 0,
        illegal: /:/,
        contains: [
          {
            className: "keyword",
            begin: AT_PROPERTY_RE
          },
          {
            begin: /\s/,
            endsWithParent: true,
            excludeEnd: true,
            relevance: 0,
            keywords: {
              $pattern: /[a-z-]+/,
              keyword: AT_MODIFIERS,
              attribute: MEDIA_FEATURES.join(" ")
            },
            contains: [
              {
                begin: /[a-z-]+(?=:)/,
                className: "attribute"
              },
              ...STRINGS,
              modes.CSS_NUMBER_MODE
            ]
          }
        ]
      },
      {
        className: "selector-tag",
        begin: "\\b(" + TAGS.join("|") + ")\\b"
      }
    ]
  };
}
var __css = ".hljs {\n    display: block;\n    overflow: hidden;\n    padding: var(--s-theme-space-30, 24px);\n    background-color: hsla(calc(var(--s-theme-color-ui-h, 0) + var(--s-theme-color-ui-surface-spin ,0)),calc((var(--s-theme-color-ui-s, 0) + var(--s-theme-color-ui-surface-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-ui-l, 0) + var(--s-theme-color-ui-surface-lightness-offset, 0)) * 1%),var(--s-theme-color-ui-surface-a, 1));\n    color: hsla(calc(var(--s-theme-color-ui-h, 0) + var(--s-theme-color-ui-surfaceForeground-spin ,0)),calc((var(--s-theme-color-ui-s, 0) + var(--s-theme-color-ui-surfaceForeground-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-ui-l, 0) + var(--s-theme-color-ui-surfaceForeground-lightness-offset, 0)) * 1%),var(--s-theme-color-ui-surfaceForeground-a, 1));\n    line-height: 1.5 !important;\n}\n\n    .hljs,\n    .hljs.hljs-subst {\n        color: hsla(calc(var(--s-theme-color-ui-h, 0) + var(--s-theme-color-ui-surfaceForeground-spin ,0)),calc((var(--s-theme-color-ui-s, 0) + var(--s-theme-color-ui-surfaceForeground-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-ui-l, 0) + var(--s-theme-color-ui-surfaceForeground-lightness-offset, 0)) * 1%),var(--s-theme-color-ui-surfaceForeground-a, 1));\n    }\n\n    .hljs .hljs-selector-tag {\n        color: hsla(calc(var(--s-theme-color-accent-h, 0) + var(--s-theme-color-accent-spin ,340)),calc((var(--s-theme-color-accent-s, 0) + var(--s-theme-color-accent-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-accent-l, 0) + var(--s-theme-color-accent-lightness-offset, 0)) * 1%),var(--s-theme-color-accent-a, 1));\n    }\n\n    .hljs .hljs-selector-id {\n        color: hsla(calc(var(--s-theme-color-info-h, 0) + var(--s-theme-color-info-spin ,0)),calc((var(--s-theme-color-info-s, 0) + var(--s-theme-color-info-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-info-l, 0) + var(--s-theme-color-info-lightness-offset, 0)) * 1%),var(--s-theme-color-info-a, 1));\n        font-weight: bold;\n    }\n\n    .hljs .hljs-selector-class {\n        color: hsla(calc(var(--s-theme-color-info-h, 0) + var(--s-theme-color-info-spin ,0)),calc((var(--s-theme-color-info-s, 0) + var(--s-theme-color-info-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-info-l, 0) + var(--s-theme-color-info-lightness-offset, 0)) * 1%),var(--s-theme-color-info-a, 1));\n    }\n\n    .hljs .hljs-selector-attr {\n        color: hsla(calc(var(--s-theme-color-info-h, 0) + var(--s-theme-color-info-spin ,0)),calc((var(--s-theme-color-info-s, 0) + var(--s-theme-color-info-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-info-l, 0) + var(--s-theme-color-info-lightness-offset, 0)) * 1%),var(--s-theme-color-info-a, 1));\n    }\n\n    .hljs .hljs-selector-pseudo {\n        color: #88C0D0;\n    }\n\n    .hljs .hljs-addition {\n        background-color: rgba(163, 190, 140, 0.5);\n    }\n\n    .hljs .hljs-deletion {\n        background-color: rgba(191, 97, 106, 0.5);\n    }\n\n    .hljs .hljs-built_in,\n    .hljs .hljs-type {\n        color: hsla(calc(var(--s-theme-color-info-h, 0) + var(--s-theme-color-info-spin ,0)),calc((var(--s-theme-color-info-s, 0) + var(--s-theme-color-info-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-info-l, 0) + var(--s-theme-color-info-lightness-offset, 0)) * 1%),var(--s-theme-color-info-a, 1));\n    }\n\n    .hljs .hljs-class {\n        color: hsla(calc(var(--s-theme-color-info-h, 0) + var(--s-theme-color-info-spin ,0)),calc((var(--s-theme-color-info-s, 0) + var(--s-theme-color-info-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-info-l, 0) + var(--s-theme-color-info-lightness-offset, 0)) * 1%),var(--s-theme-color-info-a, 1));\n    }\n\n    .hljs .hljs-function {\n        color: #88C0D0;\n    }\n\n    .hljs .hljs-function > .hljs-title {\n        color: #88C0D0;\n    }\n\n    .hljs .hljs-keyword,\n    .hljs .hljs-literal,\n    .hljs .hljs-symbol {\n        color: hsla(calc(var(--s-theme-color-accent-h, 0) + var(--s-theme-color-accent-spin ,340)),calc((var(--s-theme-color-accent-s, 0) + var(--s-theme-color-accent-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-accent-l, 0) + var(--s-theme-color-accent-lightness-offset, 0)) * 1%),var(--s-theme-color-accent-a, 1));\n    }\n\n    .hljs .hljs-number {\n        color: #B48EAD;\n    }\n\n    .hljs .hljs-regexp {\n        color: hsla(calc(var(--s-theme-color-accent-h, 0) + var(--s-theme-color-accent-spin ,0)),calc((var(--s-theme-color-accent-s, 0) + var(--s-theme-color-accent-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-accent-l, 0) + var(--s-theme-color-accent-lightness-offset, 0)) * 1%),var(--s-theme-color-accent-a, 1));\n    }\n\n    .hljs .hljs-string {\n        color: hsla(calc(var(--s-theme-color-accent-h, 0) + var(--s-theme-color-accent-spin ,0)),calc((var(--s-theme-color-accent-s, 0) + var(--s-theme-color-accent-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-accent-l, 0) + var(--s-theme-color-accent-lightness-offset, 0)) * 1%),var(--s-theme-color-accent-a, 1));\n    }\n\n    .hljs .hljs-title {\n        color: hsla(calc(var(--s-theme-color-info-h, 0) + var(--s-theme-color-info-spin ,0)),calc((var(--s-theme-color-info-s, 0) + var(--s-theme-color-info-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-info-l, 0) + var(--s-theme-color-info-lightness-offset, 0)) * 1%),var(--s-theme-color-info-a, 1));\n    }\n\n    .hljs .hljs-params {\n        color: hsla(calc(var(--s-theme-color-text-h, 0) + var(--s-theme-color-text-spin ,0)),calc((var(--s-theme-color-text-s, 0) + var(--s-theme-color-text-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-text-l, 0) + var(--s-theme-color-text-lightness-offset, 0)) * 1%),var(--s-theme-color-text-a, 1));\n    }\n\n    .hljs .hljs-bullet {\n        color: hsla(calc(var(--s-theme-color-accent-h, 0) + var(--s-theme-color-accent-spin ,340)),calc((var(--s-theme-color-accent-s, 0) + var(--s-theme-color-accent-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-accent-l, 0) + var(--s-theme-color-accent-lightness-offset, 0)) * 1%),var(--s-theme-color-accent-a, 1));\n    }\n\n    .hljs .hljs-code {\n        color: hsla(calc(var(--s-theme-color-info-h, 0) + var(--s-theme-color-info-spin ,0)),calc((var(--s-theme-color-info-s, 0) + var(--s-theme-color-info-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-info-l, 0) + var(--s-theme-color-info-lightness-offset, 0)) * 1%),var(--s-theme-color-info-a, 1));\n    }\n\n    .hljs .hljs-emphasis {\n        font-style: italic;\n    }\n\n    .hljs .hljs-formula {\n        color: hsla(calc(var(--s-theme-color-info-h, 0) + var(--s-theme-color-info-spin ,0)),calc((var(--s-theme-color-info-s, 0) + var(--s-theme-color-info-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-info-l, 0) + var(--s-theme-color-info-lightness-offset, 0)) * 1%),var(--s-theme-color-info-a, 1));\n    }\n\n    .hljs .hljs-strong {\n        font-weight: bold;\n    }\n\n    .hljs .hljs-link:hover {\n        text-decoration: underline;\n    }\n\n    .hljs .hljs-quote {\n        color: hsla(calc(var(--s-theme-color-ui-h, 0) + var(--s-theme-color-ui-30-spin ,0)),calc((var(--s-theme-color-ui-s, 0) + var(--s-theme-color-ui-30-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-ui-l, 0) + var(--s-theme-color-ui-30-lightness-offset, 0)) * 1%),var(--s-theme-color-ui-30-a, 1));\n    }\n\n    .hljs .hljs-comment {\n        color: hsla(calc(var(--s-theme-color-ui-h, 0) + var(--s-theme-color-ui-30-spin ,0)),calc((var(--s-theme-color-ui-s, 0) + var(--s-theme-color-ui-30-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-ui-l, 0) + var(--s-theme-color-ui-30-lightness-offset, 0)) * 1%),var(--s-theme-color-ui-30-a, 1));\n    }\n\n    .hljs .hljs-doctag {\n        color: hsla(calc(var(--s-theme-color-info-h, 0) + var(--s-theme-color-info-spin ,0)),calc((var(--s-theme-color-info-s, 0) + var(--s-theme-color-info-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-info-l, 0) + var(--s-theme-color-info-lightness-offset, 0)) * 1%),var(--s-theme-color-info-a, 1));\n    }\n\n    .hljs .hljs-meta,\n    .hljs .hljs-meta-keyword {\n        color: #5E81AC;\n    }\n\n    .hljs .hljs-meta-string {\n        color: hsla(calc(var(--s-theme-color-accent-h, 0) + var(--s-theme-color-accent-spin ,0)),calc((var(--s-theme-color-accent-s, 0) + var(--s-theme-color-accent-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-accent-l, 0) + var(--s-theme-color-accent-lightness-offset, 0)) * 1%),var(--s-theme-color-accent-a, 1));\n    }\n\n    .hljs .hljs-attr {\n        color: hsla(calc(var(--s-theme-color-info-h, 0) + var(--s-theme-color-info-spin ,0)),calc((var(--s-theme-color-info-s, 0) + var(--s-theme-color-info-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-info-l, 0) + var(--s-theme-color-info-lightness-offset, 0)) * 1%),var(--s-theme-color-info-a, 1));\n    }\n\n    .hljs .hljs-attribute {\n        color: hsla(calc(var(--s-theme-color-text-h, 0) + var(--s-theme-color-text-30-spin ,0)),calc((var(--s-theme-color-text-s, 0) + var(--s-theme-color-text-30-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-text-l, 0) + var(--s-theme-color-text-30-lightness-offset, 0)) * 1%),var(--s-theme-color-text-30-a, 1));\n    }\n\n    .hljs .hljs-builtin-name {\n        color: hsla(calc(var(--s-theme-color-accent-h, 0) + var(--s-theme-color-accent-spin ,340)),calc((var(--s-theme-color-accent-s, 0) + var(--s-theme-color-accent-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-accent-l, 0) + var(--s-theme-color-accent-lightness-offset, 0)) * 1%),var(--s-theme-color-accent-a, 1));\n    }\n\n    .hljs .hljs-name {\n        color: hsla(calc(var(--s-theme-color-accent-h, 0) + var(--s-theme-color-accent-spin ,340)),calc((var(--s-theme-color-accent-s, 0) + var(--s-theme-color-accent-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-accent-l, 0) + var(--s-theme-color-accent-lightness-offset, 0)) * 1%),var(--s-theme-color-accent-a, 1));\n    }\n\n    .hljs .hljs-section {\n        color: #88C0D0;\n    }\n\n    .hljs .hljs-tag {\n        color: hsla(calc(var(--s-theme-color-accent-h, 0) + var(--s-theme-color-accent-spin ,340)),calc((var(--s-theme-color-accent-s, 0) + var(--s-theme-color-accent-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-accent-l, 0) + var(--s-theme-color-accent-lightness-offset, 0)) * 1%),var(--s-theme-color-accent-a, 1));\n    }\n\n    .hljs .hljs-variable {\n        color: hsla(calc(var(--s-theme-color-text-h, 0) + var(--s-theme-color-text-spin ,0)),calc((var(--s-theme-color-text-s, 0) + var(--s-theme-color-text-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-text-l, 0) + var(--s-theme-color-text-lightness-offset, 0)) * 1%),var(--s-theme-color-text-a, 1));\n    }\n\n    .hljs .hljs-template-variable {\n        color: hsla(calc(var(--s-theme-color-text-h, 0) + var(--s-theme-color-text-spin ,0)),calc((var(--s-theme-color-text-s, 0) + var(--s-theme-color-text-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-text-l, 0) + var(--s-theme-color-text-lightness-offset, 0)) * 1%),var(--s-theme-color-text-a, 1));\n    }\n\n    .hljs .hljs-template-tag {\n        color: #5E81AC;\n    }\n\n    .hljs.abnf .hljs-attribute {\n        color: #88C0D0;\n    }\n\n    .hljs.abnf .hljs-symbol {\n        color: hsla(calc(var(--s-theme-color-accent-h, 0) + var(--s-theme-color-accent-spin ,0)),calc((var(--s-theme-color-accent-s, 0) + var(--s-theme-color-accent-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-accent-l, 0) + var(--s-theme-color-accent-lightness-offset, 0)) * 1%),var(--s-theme-color-accent-a, 1));\n    }\n\n    .hljs.apache .hljs-attribute {\n        color: #88C0D0;\n    }\n\n    .hljs.apache .hljs-section {\n        color: hsla(calc(var(--s-theme-color-accent-h, 0) + var(--s-theme-color-accent-spin ,340)),calc((var(--s-theme-color-accent-s, 0) + var(--s-theme-color-accent-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-accent-l, 0) + var(--s-theme-color-accent-lightness-offset, 0)) * 1%),var(--s-theme-color-accent-a, 1));\n    }\n\n    .hljs.arduino .hljs-built_in {\n        color: #88C0D0;\n    }\n\n    .hljs.aspectj .hljs-meta {\n        color: #D08770;\n    }\n\n    .hljs.aspectj > .hljs-title {\n        color: #88C0D0;\n    }\n\n    .hljs.bnf .hljs-attribute {\n        color: hsla(calc(var(--s-theme-color-info-h, 0) + var(--s-theme-color-info-spin ,0)),calc((var(--s-theme-color-info-s, 0) + var(--s-theme-color-info-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-info-l, 0) + var(--s-theme-color-info-lightness-offset, 0)) * 1%),var(--s-theme-color-info-a, 1));\n    }\n\n    .hljs.clojure .hljs-name {\n        color: #88C0D0;\n    }\n\n    .hljs.clojure .hljs-symbol {\n        color: hsla(calc(var(--s-theme-color-accent-h, 0) + var(--s-theme-color-accent-spin ,0)),calc((var(--s-theme-color-accent-s, 0) + var(--s-theme-color-accent-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-accent-l, 0) + var(--s-theme-color-accent-lightness-offset, 0)) * 1%),var(--s-theme-color-accent-a, 1));\n    }\n\n    .hljs.coq .hljs-built_in {\n        color: #88C0D0;\n    }\n\n    .hljs.cpp .hljs-meta-string {\n        color: hsla(calc(var(--s-theme-color-info-h, 0) + var(--s-theme-color-info-spin ,0)),calc((var(--s-theme-color-info-s, 0) + var(--s-theme-color-info-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-info-l, 0) + var(--s-theme-color-info-lightness-offset, 0)) * 1%),var(--s-theme-color-info-a, 1));\n    }\n\n    .hljs.css .hljs-built_in {\n        color: #88C0D0;\n    }\n\n    .hljs.css .hljs-keyword {\n        color: #D08770;\n    }\n\n    .hljs.diff .hljs-meta {\n        color: hsla(calc(var(--s-theme-color-info-h, 0) + var(--s-theme-color-info-spin ,0)),calc((var(--s-theme-color-info-s, 0) + var(--s-theme-color-info-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-info-l, 0) + var(--s-theme-color-info-lightness-offset, 0)) * 1%),var(--s-theme-color-info-a, 1));\n    }\n\n    .hljs.ebnf .hljs-attribute {\n        color: hsla(calc(var(--s-theme-color-info-h, 0) + var(--s-theme-color-info-spin ,0)),calc((var(--s-theme-color-info-s, 0) + var(--s-theme-color-info-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-info-l, 0) + var(--s-theme-color-info-lightness-offset, 0)) * 1%),var(--s-theme-color-info-a, 1));\n    }\n\n    .hljs.glsl .hljs-built_in {\n        color: #88C0D0;\n    }\n\n    .hljs.groovy .hljs-meta:not(:first-child) {\n        color: #D08770;\n    }\n\n    .hljs.haxe .hljs-meta {\n        color: #D08770;\n    }\n\n    .hljs.java .hljs-meta {\n        color: #D08770;\n    }\n\n    .hljs.ldif .hljs-attribute {\n        color: hsla(calc(var(--s-theme-color-info-h, 0) + var(--s-theme-color-info-spin ,0)),calc((var(--s-theme-color-info-s, 0) + var(--s-theme-color-info-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-info-l, 0) + var(--s-theme-color-info-lightness-offset, 0)) * 1%),var(--s-theme-color-info-a, 1));\n    }\n\n    .hljs.lisp .hljs-name {\n        color: #88C0D0;\n    }\n\n    .hljs.lua .hljs-built_in {\n        color: #88C0D0;\n    }\n\n    .hljs.moonscript .hljs-built_in {\n        color: #88C0D0;\n    }\n\n    .hljs.nginx .hljs-attribute {\n        color: #88C0D0;\n    }\n\n    .hljs.nginx .hljs-section {\n        color: #5E81AC;\n    }\n\n    .hljs.pf .hljs-built_in {\n        color: #88C0D0;\n    }\n\n    .hljs.processing .hljs-built_in {\n        color: #88C0D0;\n    }\n\n    .hljs.scss .hljs-keyword {\n        color: hsla(calc(var(--s-theme-color-accent-h, 0) + var(--s-theme-color-accent-spin ,340)),calc((var(--s-theme-color-accent-s, 0) + var(--s-theme-color-accent-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-accent-l, 0) + var(--s-theme-color-accent-lightness-offset, 0)) * 1%),var(--s-theme-color-accent-a, 1));\n    }\n\n    .hljs.stylus .hljs-keyword {\n        color: hsla(calc(var(--s-theme-color-accent-h, 0) + var(--s-theme-color-accent-spin ,340)),calc((var(--s-theme-color-accent-s, 0) + var(--s-theme-color-accent-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-accent-l, 0) + var(--s-theme-color-accent-lightness-offset, 0)) * 1%),var(--s-theme-color-accent-a, 1));\n    }\n\n    .hljs.swift .hljs-meta {\n        color: #D08770;\n    }\n\n    .hljs.vim .hljs-built_in {\n        color: #88C0D0;\n        font-style: italic;\n    }\n\n    .hljs.yaml .hljs-meta {\n        color: #D08770;\n    }\n\n:host {\n    display: block;\n    border-radius: var(--s-theme-ui-code-borderRadius, 6px);\n    border: hsla(calc(var(--s-theme-color-ui-h, 0) + var(--s-theme-color-ui-border-spin ,0)),calc((var(--s-theme-color-ui-s, 0) + var(--s-theme-color-ui-border-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-ui-l, 0) + var(--s-theme-color-ui-border-lightness-offset, 0)) * 1%),var(--s-theme-color-ui-border-a, 1)) solid 1px;\n    /* overflow: hidden; */\n\n    /* @sugar.utils.configToCss(ui.code, $only: rhythm-vertical); */\n}\n\n.s-code-example > * {\n        display: none;\n    }\n\n.s-code-example[mounted] > * {\n            display: block;\n        }\n\n.hljs {\n    overflow: visible;\n    white-space: pre-wrap;\n}\n\n.s-code-example__slot {\n    display: none;\n}\n\n.s-code-example__nav {\n    position: relative;\n}\n\n.s-code-example__tabs {\n    display: flex;\n    list-style: none;\n    border-bottom-left-radius: 0 !important;\n    border-bottom-right-radius: 0 !important;\n}\n.s-code-example__tab {\n}\n\n.s-code-example__content {\n    /* overflow: hidden; */\n    position: relative;\n\n    /* [default-style] & {\n        overflow: auto;\n        @sugar.scrollbar (accent);\n    } */\n}\n\n.s-code-example__code {\n    display: none;\n    border-top-left-radius: 0 !important;\n    border-top-right-radius: 0 !important;\n    /* overflow: hidden; */\n    line-height: 0;\n}\n\n.s-code-example__code[active] {\n        display: block;\n    }\n\n.s-code-example__code > code {\n        line-height: 1;\n    }\n\n.s-code-example__toolbar {\n    position: absolute;\n    right: var(--s-theme-space-20, 12px);\n    top: var(--s-theme-space-20, 12px);\n    z-index: 10;\n}\n\n.s-code-example__toolbar > * {\n        font-size: 20px;\n        opacity: 0.5;\n    }\n\n.s-code-example__toolbar > *:hover {\n            opacity: 1;\n        }\n\n[toolbar-position='nav'] .s-code-example__toolbar {\n    right: var(--s-theme-space-20, 12px);\n    top: var(--s-theme-space-20, 12px);\n    /* transform: translate(0, -50%); */\n}\n";
class SCodeExampleInterface extends __SInterface {
}
SCodeExampleInterface.definition = Object.assign(Object.assign({}, SComponentUtilsDefaultInterface.definition), {theme: {
  type: "String",
  default: "https://gitcdn.link/repo/PrismJS/prism-themes/master/themes/prism-nord.css"
}, active: {
  type: "String"
}, toolbar: {
  type: "Array<String>",
  values: ["copy"],
  default: ["copy"]
}, toolbarPosition: {
  type: "String",
  values: ["content", "nav"],
  default: "nav"
}, languages: {
  type: "Object",
  default: {}
}});
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
webcomponent$1();
class SCodeExample extends SLitElement {
  constructor() {
    var _a2;
    super();
    this._$copy = void 0;
    this._items = [];
    this._activeTabId = void 0;
    this._component = new __SComponentUtils(this.tagName.toLowerCase(), this, this.attributes, {
      componentUtils: {
        interface: SCodeExampleInterface,
        defaultProps: {}
      }
    });
    const languages = Object.assign({html: xml, javascript, js: javascript, php, bash, shell: bash, css}, (_a2 = this._component.props.languages) !== null && _a2 !== void 0 ? _a2 : {});
    Object.keys(languages).forEach((lang) => {
      core.registerLanguage(lang, languages[lang]);
    });
  }
  static get properties() {
    return __SComponentUtils.properties({}, SCodeExampleInterface);
  }
  static get styles() {
    return css$1`
            ${unsafeCSS(__css)}
        `;
  }
  firstUpdated() {
    return __awaiter(this, void 0, void 0, function* () {
      this.$templates.forEach(($template) => {
        var _a2, _b2, _c2, _d2, _e2;
        if (!$template.getAttribute)
          return;
        this._items = [
          ...this._items,
          {
            id: (_c2 = (_b2 = (_a2 = $template.getAttribute("id")) !== null && _a2 !== void 0 ? _a2 : $template.getAttribute("language")) !== null && _b2 !== void 0 ? _b2 : $template.getAttribute("lang")) !== null && _c2 !== void 0 ? _c2 : "html",
            lang: (_e2 = (_d2 = $template.getAttribute("language")) !== null && _d2 !== void 0 ? _d2 : $template.getAttribute("lang")) !== null && _e2 !== void 0 ? _e2 : "html",
            code: $template.innerHTML
          }
        ];
        $template.remove();
      });
      if (this.active) {
        this.setActiveTab(this.active);
      } else {
        this.setActiveTab(this._items[0].id);
      }
      yield wait(500);
      return true;
    });
  }
  render() {
    var _a2, _b2, _c2, _d2;
    return html$2`
            <div
                class="${(_a2 = this._component) === null || _a2 === void 0 ? void 0 : _a2.className()}"
                ?mounted="${this.mounted}"
                ?default-style="${this.defaultStyle}"
                toolbar-position="${this.toolbarPosition}"
            >
                <div class="templates">
                    <slot></slot>
                </div>

                ${this._component ? html$2`<header class="${this._component.className("__nav")}">
                          <ol class="${this._component.className("__tabs", "s-tabs")}">
                              ${((_b2 = this._items) !== null && _b2 !== void 0 ? _b2 : []).map((item) => html$2`
                                      <li
                                          class="${this._component.className("__tab")}"
                                          id="${item.id}"
                                          ?active="${this._activeTabId === item.id}"
                                          @click="${this.setActiveTabByTab}"
                                      >
                                          ${item.lang}
                                      </li>
                                  `)}
                          </ol>
                          ${this.toolbarPosition === "nav" ? html$2`
                                        <div class="${this._component.className("__toolbar")}">
                                            <s-clipboard-copy @click="${this.copy}"></s-clipboard-copy>
                                        </div>
                                    ` : ""}
                      </header>` : ""}
                ${this._component ? html$2`
                          <div class="${this._component.className("__content")}">
                              ${this.toolbarPosition !== "nav" ? html$2`
                                            <div class="${(_c2 = this._component) === null || _c2 === void 0 ? void 0 : _c2.className("__toolbar")}">
                                                <s-clipboard-copy @click="${this.copy}"></s-clipboard-copy>
                                            </div>
                                        ` : ""}
                              ${((_d2 = this._items) !== null && _d2 !== void 0 ? _d2 : []).map((item) => {
      var _a3, _b3, _c3;
      return html$2`
                                      <pre
                                          class="${this._component.className("__code")}"
                                          style="line-height:0;"
                                          id="${(_a3 = item.id) !== null && _a3 !== void 0 ? _a3 : item.lang}"
                                          ?active="${this._activeTabId === ((_b3 = item.id) !== null && _b3 !== void 0 ? _b3 : item.lang)}"
                                      >
                            <code lang="${(_c3 = item.lang) !== null && _c3 !== void 0 ? _c3 : item.id}" class="language-${item.lang} ${item.lang} ${this._component.props.defaultStyle ? "hljs" : ""}">
                                
                                ${html([item.code])}
                            </code>
                        </pre>
                                  `;
    })}
                          </div>
                      ` : ""}
            </div>
        `;
  }
  setActiveTabByTab(e) {
    this.setActiveTab(e.target.id);
  }
  setActiveTab(id) {
    return __awaiter(this, void 0, void 0, function* () {
      yield wait();
      this._activeTabId = id;
      this.initPrismOnTab(id);
    });
  }
  initPrismOnTab(id) {
    var _a2;
    const $content = (_a2 = this.shadowRoot) === null || _a2 === void 0 ? void 0 : _a2.querySelector(`pre#${id} code`);
    if ($content.hasAttribute("inited"))
      return;
    $content.setAttribute("inited", "true");
    const highlightedCode = core.highlight($content === null || $content === void 0 ? void 0 : $content.innerHTML.replace(/\<\!\-\-\?lit\$.*\$\-\-\>/g, ""), {
      language: $content.getAttribute("lang")
    }).value.trim();
    $content.innerHTML = highlightedCode;
  }
  copy() {
    const id = this._activeTabId;
    const item = this._items.filter((i) => i.id === id)[0];
    this.$copy.copy(item.code);
  }
}
__decorate([
  property()
], SCodeExample.prototype, "_items", void 0);
__decorate([
  property()
], SCodeExample.prototype, "_activeTabId", void 0);
__decorate([
  property({
    type: String
  })
], SCodeExample.prototype, "active", void 0);
__decorate([
  property()
], SCodeExample.prototype, "props", void 0);
__decorate([
  query("s-clipboard-copy")
], SCodeExample.prototype, "$copy", void 0);
__decorate([
  query(".templates")
], SCodeExample.prototype, "$templatesContainer", void 0);
__decorate([
  queryAssignedNodes()
], SCodeExample.prototype, "$templates", void 0);
function webcomponent(props = {}, tagName = "s-code-example") {
  __SComponentUtils.setDefaultProps(tagName, props);
  customElements.define(tagName, SCodeExample);
}
export default SCodeExample;
export {webcomponent};
