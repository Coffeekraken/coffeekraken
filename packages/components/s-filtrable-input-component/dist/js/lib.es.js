import {css, unsafeCSS, html} from "lit";
import __SInterface from "@coffeekraken/s-interface";
import __SLitComponent from "@coffeekraken/s-lit-component";
import __clone from "lodash.clone";
import __deepClone from "lodash.clonedeep";
import __SPromise from "@coffeekraken/s-promise";
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
const SVG_RESULT = 2;
const ATTRIBUTE_PART = 1;
const CHILD_PART = 2;
const PROPERTY_PART = 3;
const BOOLEAN_ATTRIBUTE_PART = 4;
const EVENT_PART = 5;
const ELEMENT_PART = 6;
const COMMENT_PART = 7;
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
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
const PartType = {
  ATTRIBUTE: 1,
  CHILD: 2,
  PROPERTY: 3,
  BOOLEAN_ATTRIBUTE: 4,
  EVENT: 5,
  ELEMENT: 6
};
const directive = (c) => (...values) => ({
  ["_$litDirective$"]: c,
  values
});
class Directive {
  constructor(_partInfo) {
  }
  get _$isConnected() {
    return this._$parent._$isConnected;
  }
  _$initialize(part, parent, attributeIndex) {
    this.__part = part;
    this._$parent = parent;
    this.__attributeIndex = attributeIndex;
  }
  _$resolve(part, props) {
    return this.update(part, props);
  }
  update(_part, props) {
    return this.render(...props);
  }
}
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
const HTML_RESULT = 1;
class UnsafeHTMLDirective extends Directive {
  constructor(partInfo) {
    super(partInfo);
    this._value = nothing;
    if (partInfo.type !== PartType.CHILD) {
      throw new Error(`${this.constructor.directiveName}() can only be used in child bindings`);
    }
  }
  render(value) {
    if (value === nothing) {
      this._templateResult = void 0;
      return this._value = value;
    }
    if (value === noChange) {
      return value;
    }
    if (typeof value != "string") {
      throw new Error(`${this.constructor.directiveName}() called with a non-string value`);
    }
    if (value === this._value) {
      return this._templateResult;
    }
    this._value = value;
    const strings = [value];
    strings.raw = strings;
    return this._templateResult = {
      ["_$litType$"]: this.constructor.resultType,
      strings,
      values: []
    };
  }
}
UnsafeHTMLDirective.directiveName = "unsafeHTML";
UnsafeHTMLDirective.resultType = HTML_RESULT;
const unsafeHTML = directive(UnsafeHTMLDirective);
class SHighlightJsComponentInterface extends __SInterface {
}
SHighlightJsComponentInterface.definition = {
  items: {
    type: "String|Function"
  },
  value: {
    type: "String",
    default: "value"
  },
  label: {
    type: "String|Function",
    default: "value"
  },
  emptyText: {
    type: "String",
    default: "No item to display"
  },
  loadingText: {
    type: "String",
    default: "Loading please wait..."
  },
  filtrable: {
    type: {
      type: "Array<String>",
      splitChars: [","]
    },
    default: []
  },
  templates: {
    description: 'Specify either an object with properties like "item", "empty" and "loading", or a function returning the good template depending on tne "type" argument property',
    type: "Object|Function"
  },
  closeTimeout: {
    type: "Number",
    default: 100
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
function stripTags(html2) {
  const tmp = document.createElement("div");
  tmp.innerHTML = html2;
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
      viewportHeight = $scrollHeightElm.offsetHeight;
      scrollTop2 = $scrollHeightElm.scrollTop;
      fullHeight = $scrollHeightElm.scrollHeight;
    }
    console.log("is", active);
    console.log($elm, scrollTop2, viewportHeight, fullHeight, finalSettings.offset);
    console.log(scrollTop2 + viewportHeight, fullHeight - finalSettings.offset);
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
  console.log($scrollListenedElm);
  $scrollListenedElm.addEventListener("scroll", internalCallback);
}
var __css = ".s-filtrable-input {\n    font-size: calc(1rem * var(--s-scale, 1));\n    display: inline-block;\n    position: relative;\n\n    /* @sugar.scope.lnf {\n        .s-filtrable-input__list {\n            transition: max-height 0.1s ease-in-out;\n        }\n\n        .s-filtrable-input__list-item-highlight {\n            background-color: sugar.color(current);\n        }\n    } */\n}\n\n    .s-filtrable-input .s-filtrable-input__input {\n    }\n\n    .s-filtrable-input .s-filtrable-input__list {\n        position: absolute;\n        top: 100%;\n        left: 0;\n        overflow-x: hidden;\n        overflow-y: auto;\n        opacity: 0;\n        max-width: calc(100vw - 100px);\n        pointer-events: none;\n        margin: 20px 0;\n    }\n\n    .s-filtrable-input:focus-within .s-filtrable-input__list {\n        pointer-events: all;\n        opacity: 1;\n    }\n\n    .s-filtrable-input.s-filtrable-input--top .s-filtrable-input__list {\n            top: auto;\n            bottom: 100%;\n        }\n\n    .s-filtrable-input .s-filtrable-input__input:focus + .s-filtrable-input__list,\n    .s-filtrable-input .s-filtrable-input__list:focus,\n    .s-filtrable-input .s-filtrable-input__list:focus-within {\n        opacity: 1;\n        pointer-events: all !important;\n    }\n\n    .s-filtrable-input .s-filtrable-input__list-item {\n        position: relative;\n        -webkit-user-select: none;\n           -moz-user-select: none;\n            -ms-user-select: none;\n                user-select: none;\n    }\n\n    .s-filtrable-input:not([interactive]) .s-filtrable-input__list-item {\n        cursor: pointer;\n    }\n\n    .s-filtrable-input:not([interactive]) .s-filtrable-input__list-item * {\n            pointer-events: none;\n        }\n";
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
class SFiltrableInput extends __SLitComponent {
  constructor() {
    super(__deepMerge({
      litComponent: {
        shadowDom: false
      },
      componentUtils: {
        interface: SHighlightJsComponentInterface
      }
    }));
    this.state = {
      baseTemplates: void 0,
      preselectedItem: void 0,
      preselectedItemIdx: -1,
      selectedItemIdx: -1,
      displayedMaxItems: 0,
      value: "",
      isActive: false,
      isLoading: false,
      items: [],
      filteredItems: []
    };
    this.state.displayedMaxItems = this.props.maxItems;
    if (this.props.items && typeof this.props.items === "string") {
      const $itemsElm = document.querySelector(this.props.items);
      if ($itemsElm) {
        this.state.items = JSON.parse($itemsElm.innerHTML);
        this.requestUpdate();
      }
    }
    this.state.baseTemplates = ({type, item, html: html2}) => {
      switch (type) {
        case "item":
          return html2`
                        <div class="${this.componentUtils.className("__item")}">
                            ${unsafeHTML(typeof this.props.label === "function" ? this.props.label(item) : item[this.props.label])}
                        </div>
                    `;
        case "empty":
          return html2`
                        <div
                            class="${this.componentUtils.className("__empty")}"
                        >
                            ${this.props.emptyText}
                        </div>
                    `;
        case "loading":
          return html2`
                        <div
                            class="${this.componentUtils.className("__loading")}"
                        >
                            ${this.props.loadingText}
                        </div>
                    `;
      }
    };
  }
  static get styles() {
    return css`
            ${unsafeCSS(__css)}
        `;
  }
  firstUpdated() {
    var _a2;
    return __awaiter(this, void 0, void 0, function* () {
      this.$input = this.querySelector("input");
      this.$input.setAttribute("autocomplete", "off");
      if (!this.props.bare) {
        (_a2 = this.$input.classList) === null || _a2 === void 0 ? void 0 : _a2.add("s-input");
      }
      this.$input.addEventListener("keyup", (e) => {
        const value = e.target.value;
        this.state.value = value;
        this.state.displayedMaxItems = this.props.maxItems;
        this.filterItems();
      });
      this.$input.classList.add(this.componentUtils.className("__input"));
      this.$container = this;
      this.$container.classList.add("s-filtrable-input");
      this.$container.classList.add(this.componentUtils.className());
      this.$list = this.querySelector("ul");
      this.prepend(this.$input);
      this.filterItems();
      document.addEventListener("scroll", () => {
        this._updateListSizeAndPosition();
      });
      this.$input.addEventListener("focus", (e) => {
        this.state.isActive = true;
        this.filterItems();
        this._updateListSizeAndPosition();
      });
      this._updateListSizeAndPosition();
      onScrollEnd(this.$list, () => {
        var _a3;
        this.state.displayedMaxItems = ((_a3 = this.state.displayedMaxItems) !== null && _a3 !== void 0 ? _a3 : 0) + this.props.maxItems;
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
        this.state.preselectedItemIdx = this.state.preselectedItemIdx > 0 ? this.state.preselectedItemIdx - 1 : 0;
        this.requestUpdate();
        const $item = this.$list.children[this.state.preselectedItemIdx];
        $item.focus();
      });
      hotkey("down").on("press", (e) => {
        e.preventDefault();
        if (!this.state.isActive)
          return;
        this.state.preselectedItemIdx = this.state.preselectedItemIdx >= this.state.filteredItems.length - 1 ? this.state.filteredItems.length - 1 : this.state.preselectedItemIdx + 1;
        this.requestUpdate();
        const $item = this.$list.children[this.state.preselectedItemIdx];
        $item.focus();
      });
      hotkey("return").on("press", (e) => {
        if (!this.state.isActive)
          return;
        this.validateAndClose();
      });
    });
  }
  get selectedItem() {
    if (this.state.selectedItemIdx === -1)
      return;
    return this.state.filteredItems[this.state.selectedItemIdx];
  }
  get preselectedItem() {
    if (this.state.preselectedItemIdx === -1)
      return;
    return this.state.filteredItems[this.state.preselectedItemIdx];
  }
  validate() {
    if (!this.state.preselectedItem)
      return;
    if (this.state.preselectedItem) {
      if (typeof this.props.value === "string" && this.state.preselectedItem[this.props.value]) {
        this.$input.value = stripTags(this.state.preselectedItem[this.props.value]);
      } else if (typeof this.props.value === "function") {
        const v = this.props.value({
          item: this.state.filteredItems[this.state.preselectedItemIdx]
        });
        if (typeof v !== "string") {
          throw new Error(`<red>[s-filtrable-input]</red> Sorry but the returned value "<yellow>${v}</yellow>" has to be a string...`);
        }
        this.$input.value = stripTags(v);
      }
    }
    this.state.selectedItemIdx = this.state.preselectedItemIdx;
    this.state.value = this.$input.value;
    this.requestUpdate();
  }
  validateAndClose() {
    this.validate();
    setTimeout(() => {
      this.close();
    }, this.props.closeTimeout);
  }
  close() {
    this.$input.focus();
    this.$input.blur();
    this.state.isActive = false;
  }
  refreshItems() {
    return __awaiter(this, void 0, void 0, function* () {
      if (typeof this.props.items === "function") {
        this.state.isLoading = true;
        this.requestUpdate();
        const items = yield this.props.items({
          value: this.$input.value
        });
        if (plainObject(items)) {
          this.state.items = Object.values(items);
        } else if (Array.isArray(items)) {
          this.state.items = items;
        } else {
          throw new Error(`Sorry but the "items" MUST be an Array...`);
        }
      }
    });
  }
  filterItems(needUpdate = true) {
    return __awaiter(this, void 0, void 0, function* () {
      if (needUpdate)
        yield this.refreshItems();
      let items = this.state.items;
      let matchedItemsCount = 0;
      const filteredItems = items.map((item) => clone(item)).filter((item) => {
        if (matchedItemsCount >= this.state.displayedMaxItems)
          return false;
        if (!this.props.filtrable.length)
          return true;
        let matchFilter = false;
        for (let i = 0; i < Object.keys(item).length; i++) {
          const propName = Object.keys(item)[i], propValue = item[propName];
          if (typeof propValue !== "string")
            continue;
          if (this.props.filtrable.indexOf(propName) !== -1) {
            const reg = new RegExp(this.state.value.split(" ").join("|"), "gi");
            if (propValue.match(reg)) {
              matchFilter = true;
              if (this.state.value && this.state.value !== "") {
                const reg2 = new RegExp(this.state.value.split(" ").join("|"), "gi");
                const finalString = propValue.replace(reg2, (str) => {
                  return `<span class="${this.componentUtils.className("__list-item-highlight")} s-highlight"
                                                >${str}</span>`;
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
      this.state.filteredItems = filteredItems;
      this.state.isLoading = false;
      this.requestUpdate();
    });
  }
  select(idx) {
    this._setPreselectedItemByIdx(idx);
    this.validate();
  }
  selectAndValidate(idx) {
    this._setPreselectedItemByIdx(idx);
    this.validate();
  }
  selectValidateAndClose(idx) {
    this._setPreselectedItemByIdx(idx);
    this.validateAndClose();
  }
  _setPreselectedItemByIdx(idx) {
    if (this.props.notSelectable)
      return;
    this.state.preselectedItemIdx = idx;
    this.state.preselectedItem = this.state.items[idx];
    this.requestUpdate();
  }
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
  }
  render() {
    var _a2, _b2, _c2, _d2, _e2, _f2;
    return html`
            <ul
                class="s-filtrable-input__list ${this.componentUtils.className("__list")}"
            >
                ${this.state.isLoading ? html`
                          <li
                              class="s-filtrable-input__list-item s-filtrable-input__list-loading ${this.componentUtils.className("__list-item __list-loading")}"
                          >
                              ${(_c2 = (_b2 = (_a2 = this.props).templates) === null || _b2 === void 0 ? void 0 : _b2.call(_a2, {
      type: "loading",
      html
    })) !== null && _c2 !== void 0 ? _c2 : this.state.baseTemplates({
      type: "loading",
      html
    })}
                          </li>
                      ` : !this.state.isLoading && this.state.filteredItems.length <= 0 ? html`
                          <li
                              class="s-filtrable-input__list-item s-filtrable-input__list-no-item  ${this.componentUtils.className("__list-item __list-no-item")}"
                          >
                              ${(_f2 = (_e2 = (_d2 = this.props).templates) === null || _e2 === void 0 ? void 0 : _e2.call(_d2, {
      type: "empty",
      html
    })) !== null && _f2 !== void 0 ? _f2 : this.state.baseTemplates({
      type: "empty",
      html
    })}
                          </li>
                      ` : !this.state.isLoading && this.state.filteredItems.length ? this.state.filteredItems.map((item, idx) => {
      var _a3, _b3, _c3;
      return idx < this.state.displayedMaxItems ? html`
                                    <li
                                        @click=${() => this.selectAndValidate(idx)}
                                        @dblclick=${() => this.selectValidateAndClose(idx)}
                                        @focus=${() => this._setPreselectedItemByIdx(idx)}
                                        style="z-index: ${999999999 - idx}"
                                        tabindex="0"
                                        class="s-filtrable-input__list-item ${this.componentUtils.className("__list-item") + " " + (this.state.selectedItemIdx === idx ? "active" : "")}"
                                        hoverable
                                    >
                                        ${(_c3 = (_b3 = (_a3 = this.props).templates) === null || _b3 === void 0 ? void 0 : _b3.call(_a3, {
        type: "item",
        html,
        unsafeHTML,
        item,
        idx
      })) !== null && _c3 !== void 0 ? _c3 : this.state.baseTemplates({
        type: "item",
        html,
        unsafeHTML,
        item,
        idx
      })}
                                    </li>
                                ` : "";
    }) : ""}
            </ul>
        `;
  }
}
function define(props = {}, tagName = "s-filtrable-input") {
  __SLitComponent.setDefaultProps(tagName, props);
  customElements.define(tagName, SFiltrableInput);
}
export default SFiltrableInput;
export {define};
