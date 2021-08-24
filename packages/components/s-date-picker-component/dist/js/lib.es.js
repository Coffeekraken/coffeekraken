import __SInterface from "@coffeekraken/s-interface";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
import __SComponentUtils, {SLitElement} from "@coffeekraken/s-component-utils";
import __pikaday from "pikaday";
import __moment from "moment";
/**
* @license
* Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
* This code may only be used under the BSD style license found at
* http://polymer.github.io/LICENSE.txt
* The complete set of authors may be found at
* http://polymer.github.io/AUTHORS.txt
* The complete set of contributors may be found at
* http://polymer.github.io/CONTRIBUTORS.txt
* Code distributed by Google as part of the polymer project is also
* subject to an additional IP rights grant found at
* http://polymer.github.io/PATENTS.txt
*/
const isCEPolyfill = typeof window !== "undefined" && window.customElements != null && window.customElements.polyfillWrapFlushCallback !== void 0;
const removeNodes = (container, start, end = null) => {
  while (start !== end) {
    const n = start.nextSibling;
    container.removeChild(start);
    start = n;
  }
};
/**
* @license
* Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
* This code may only be used under the BSD style license found at
* http://polymer.github.io/LICENSE.txt
* The complete set of authors may be found at
* http://polymer.github.io/AUTHORS.txt
* The complete set of contributors may be found at
* http://polymer.github.io/CONTRIBUTORS.txt
* Code distributed by Google as part of the polymer project is also
* subject to an additional IP rights grant found at
* http://polymer.github.io/PATENTS.txt
*/
const marker = `{{lit-${String(Math.random()).slice(2)}}}`;
const nodeMarker = `<!--${marker}-->`;
const boundAttributeSuffix = "$lit$";
const isTemplatePartActive = (part) => part.index !== -1;
const createMarker = () => document.createComment("");
const lastAttributeNameRegex = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
/**
* @license
* Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
* This code may only be used under the BSD style license found at
* http://polymer.github.io/LICENSE.txt
* The complete set of authors may be found at
* http://polymer.github.io/AUTHORS.txt
* The complete set of contributors may be found at
* http://polymer.github.io/CONTRIBUTORS.txt
* Code distributed by Google as part of the polymer project is also
* subject to an additional IP rights grant found at
* http://polymer.github.io/PATENTS.txt
*/
const directives = new WeakMap();
const directive = (f) => (...args) => {
  const d = f(...args);
  directives.set(d, true);
  return d;
};
const isDirective = (o) => {
  return typeof o === "function" && directives.has(o);
};
/**
* @license
* Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
* This code may only be used under the BSD style license found at
* http://polymer.github.io/LICENSE.txt
* The complete set of authors may be found at
* http://polymer.github.io/AUTHORS.txt
* The complete set of contributors may be found at
* http://polymer.github.io/CONTRIBUTORS.txt
* Code distributed by Google as part of the polymer project is also
* subject to an additional IP rights grant found at
* http://polymer.github.io/PATENTS.txt
*/
const noChange = {};
const nothing = {};
/**
* @license
* Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
* This code may only be used under the BSD style license found at
* http://polymer.github.io/LICENSE.txt
* The complete set of authors may be found at
* http://polymer.github.io/AUTHORS.txt
* The complete set of contributors may be found at
* http://polymer.github.io/CONTRIBUTORS.txt
* Code distributed by Google as part of the polymer project is also
* subject to an additional IP rights grant found at
* http://polymer.github.io/PATENTS.txt
*/
class TemplateInstance {
  constructor(template, processor, options) {
    this.__parts = [];
    this.template = template;
    this.processor = processor;
    this.options = options;
  }
  update(values) {
    let i = 0;
    for (const part of this.__parts) {
      if (part !== void 0) {
        part.setValue(values[i]);
      }
      i++;
    }
    for (const part of this.__parts) {
      if (part !== void 0) {
        part.commit();
      }
    }
  }
  _clone() {
    const fragment = isCEPolyfill ? this.template.element.content.cloneNode(true) : document.importNode(this.template.element.content, true);
    const stack = [];
    const parts = this.template.parts;
    const walker = document.createTreeWalker(fragment, 133, null, false);
    let partIndex = 0;
    let nodeIndex = 0;
    let part;
    let node = walker.nextNode();
    while (partIndex < parts.length) {
      part = parts[partIndex];
      if (!isTemplatePartActive(part)) {
        this.__parts.push(void 0);
        partIndex++;
        continue;
      }
      while (nodeIndex < part.index) {
        nodeIndex++;
        if (node.nodeName === "TEMPLATE") {
          stack.push(node);
          walker.currentNode = node.content;
        }
        if ((node = walker.nextNode()) === null) {
          walker.currentNode = stack.pop();
          node = walker.nextNode();
        }
      }
      if (part.type === "node") {
        const part2 = this.processor.handleTextExpression(this.options);
        part2.insertAfterNode(node.previousSibling);
        this.__parts.push(part2);
      } else {
        this.__parts.push(...this.processor.handleAttributeExpressions(node, part.name, part.strings, this.options));
      }
      partIndex++;
    }
    if (isCEPolyfill) {
      document.adoptNode(fragment);
      customElements.upgrade(fragment);
    }
    return fragment;
  }
}
/**
* @license
* Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
* This code may only be used under the BSD style license found at
* http://polymer.github.io/LICENSE.txt
* The complete set of authors may be found at
* http://polymer.github.io/AUTHORS.txt
* The complete set of contributors may be found at
* http://polymer.github.io/CONTRIBUTORS.txt
* Code distributed by Google as part of the polymer project is also
* subject to an additional IP rights grant found at
* http://polymer.github.io/PATENTS.txt
*/
const policy = window.trustedTypes && trustedTypes.createPolicy("lit-html", {createHTML: (s) => s});
const commentMarker = ` ${marker} `;
class TemplateResult {
  constructor(strings, values, type, processor) {
    this.strings = strings;
    this.values = values;
    this.type = type;
    this.processor = processor;
  }
  getHTML() {
    const l = this.strings.length - 1;
    let html2 = "";
    let isCommentBinding = false;
    for (let i = 0; i < l; i++) {
      const s = this.strings[i];
      const commentOpen = s.lastIndexOf("<!--");
      isCommentBinding = (commentOpen > -1 || isCommentBinding) && s.indexOf("-->", commentOpen + 1) === -1;
      const attributeMatch = lastAttributeNameRegex.exec(s);
      if (attributeMatch === null) {
        html2 += s + (isCommentBinding ? commentMarker : nodeMarker);
      } else {
        html2 += s.substr(0, attributeMatch.index) + attributeMatch[1] + attributeMatch[2] + boundAttributeSuffix + attributeMatch[3] + marker;
      }
    }
    html2 += this.strings[l];
    return html2;
  }
  getTemplateElement() {
    const template = document.createElement("template");
    let value = this.getHTML();
    if (policy !== void 0) {
      value = policy.createHTML(value);
    }
    template.innerHTML = value;
    return template;
  }
}
/**
* @license
* Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
* This code may only be used under the BSD style license found at
* http://polymer.github.io/LICENSE.txt
* The complete set of authors may be found at
* http://polymer.github.io/AUTHORS.txt
* The complete set of contributors may be found at
* http://polymer.github.io/CONTRIBUTORS.txt
* Code distributed by Google as part of the polymer project is also
* subject to an additional IP rights grant found at
* http://polymer.github.io/PATENTS.txt
*/
const isPrimitive = (value) => {
  return value === null || !(typeof value === "object" || typeof value === "function");
};
const isIterable = (value) => {
  return Array.isArray(value) || !!(value && value[Symbol.iterator]);
};
class AttributeCommitter {
  constructor(element, name, strings) {
    this.dirty = true;
    this.element = element;
    this.name = name;
    this.strings = strings;
    this.parts = [];
    for (let i = 0; i < strings.length - 1; i++) {
      this.parts[i] = this._createPart();
    }
  }
  _createPart() {
    return new AttributePart(this);
  }
  _getValue() {
    const strings = this.strings;
    const l = strings.length - 1;
    const parts = this.parts;
    if (l === 1 && strings[0] === "" && strings[1] === "") {
      const v = parts[0].value;
      if (typeof v === "symbol") {
        return String(v);
      }
      if (typeof v === "string" || !isIterable(v)) {
        return v;
      }
    }
    let text = "";
    for (let i = 0; i < l; i++) {
      text += strings[i];
      const part = parts[i];
      if (part !== void 0) {
        const v = part.value;
        if (isPrimitive(v) || !isIterable(v)) {
          text += typeof v === "string" ? v : String(v);
        } else {
          for (const t of v) {
            text += typeof t === "string" ? t : String(t);
          }
        }
      }
    }
    text += strings[l];
    return text;
  }
  commit() {
    if (this.dirty) {
      this.dirty = false;
      this.element.setAttribute(this.name, this._getValue());
    }
  }
}
class AttributePart {
  constructor(committer) {
    this.value = void 0;
    this.committer = committer;
  }
  setValue(value) {
    if (value !== noChange && (!isPrimitive(value) || value !== this.value)) {
      this.value = value;
      if (!isDirective(value)) {
        this.committer.dirty = true;
      }
    }
  }
  commit() {
    while (isDirective(this.value)) {
      const directive2 = this.value;
      this.value = noChange;
      directive2(this);
    }
    if (this.value === noChange) {
      return;
    }
    this.committer.commit();
  }
}
class NodePart {
  constructor(options) {
    this.value = void 0;
    this.__pendingValue = void 0;
    this.options = options;
  }
  appendInto(container) {
    this.startNode = container.appendChild(createMarker());
    this.endNode = container.appendChild(createMarker());
  }
  insertAfterNode(ref) {
    this.startNode = ref;
    this.endNode = ref.nextSibling;
  }
  appendIntoPart(part) {
    part.__insert(this.startNode = createMarker());
    part.__insert(this.endNode = createMarker());
  }
  insertAfterPart(ref) {
    ref.__insert(this.startNode = createMarker());
    this.endNode = ref.endNode;
    ref.endNode = this.startNode;
  }
  setValue(value) {
    this.__pendingValue = value;
  }
  commit() {
    if (this.startNode.parentNode === null) {
      return;
    }
    while (isDirective(this.__pendingValue)) {
      const directive2 = this.__pendingValue;
      this.__pendingValue = noChange;
      directive2(this);
    }
    const value = this.__pendingValue;
    if (value === noChange) {
      return;
    }
    if (isPrimitive(value)) {
      if (value !== this.value) {
        this.__commitText(value);
      }
    } else if (value instanceof TemplateResult) {
      this.__commitTemplateResult(value);
    } else if (value instanceof Node) {
      this.__commitNode(value);
    } else if (isIterable(value)) {
      this.__commitIterable(value);
    } else if (value === nothing) {
      this.value = nothing;
      this.clear();
    } else {
      this.__commitText(value);
    }
  }
  __insert(node) {
    this.endNode.parentNode.insertBefore(node, this.endNode);
  }
  __commitNode(value) {
    if (this.value === value) {
      return;
    }
    this.clear();
    this.__insert(value);
    this.value = value;
  }
  __commitText(value) {
    const node = this.startNode.nextSibling;
    value = value == null ? "" : value;
    const valueAsString = typeof value === "string" ? value : String(value);
    if (node === this.endNode.previousSibling && node.nodeType === 3) {
      node.data = valueAsString;
    } else {
      this.__commitNode(document.createTextNode(valueAsString));
    }
    this.value = value;
  }
  __commitTemplateResult(value) {
    const template = this.options.templateFactory(value);
    if (this.value instanceof TemplateInstance && this.value.template === template) {
      this.value.update(value.values);
    } else {
      const instance = new TemplateInstance(template, value.processor, this.options);
      const fragment = instance._clone();
      instance.update(value.values);
      this.__commitNode(fragment);
      this.value = instance;
    }
  }
  __commitIterable(value) {
    if (!Array.isArray(this.value)) {
      this.value = [];
      this.clear();
    }
    const itemParts = this.value;
    let partIndex = 0;
    let itemPart;
    for (const item of value) {
      itemPart = itemParts[partIndex];
      if (itemPart === void 0) {
        itemPart = new NodePart(this.options);
        itemParts.push(itemPart);
        if (partIndex === 0) {
          itemPart.appendIntoPart(this);
        } else {
          itemPart.insertAfterPart(itemParts[partIndex - 1]);
        }
      }
      itemPart.setValue(item);
      itemPart.commit();
      partIndex++;
    }
    if (partIndex < itemParts.length) {
      itemParts.length = partIndex;
      this.clear(itemPart && itemPart.endNode);
    }
  }
  clear(startNode = this.startNode) {
    removeNodes(this.startNode.parentNode, startNode.nextSibling, this.endNode);
  }
}
class BooleanAttributePart {
  constructor(element, name, strings) {
    this.value = void 0;
    this.__pendingValue = void 0;
    if (strings.length !== 2 || strings[0] !== "" || strings[1] !== "") {
      throw new Error("Boolean attributes can only contain a single expression");
    }
    this.element = element;
    this.name = name;
    this.strings = strings;
  }
  setValue(value) {
    this.__pendingValue = value;
  }
  commit() {
    while (isDirective(this.__pendingValue)) {
      const directive2 = this.__pendingValue;
      this.__pendingValue = noChange;
      directive2(this);
    }
    if (this.__pendingValue === noChange) {
      return;
    }
    const value = !!this.__pendingValue;
    if (this.value !== value) {
      if (value) {
        this.element.setAttribute(this.name, "");
      } else {
        this.element.removeAttribute(this.name);
      }
      this.value = value;
    }
    this.__pendingValue = noChange;
  }
}
class PropertyCommitter extends AttributeCommitter {
  constructor(element, name, strings) {
    super(element, name, strings);
    this.single = strings.length === 2 && strings[0] === "" && strings[1] === "";
  }
  _createPart() {
    return new PropertyPart(this);
  }
  _getValue() {
    if (this.single) {
      return this.parts[0].value;
    }
    return super._getValue();
  }
  commit() {
    if (this.dirty) {
      this.dirty = false;
      this.element[this.name] = this._getValue();
    }
  }
}
class PropertyPart extends AttributePart {
}
let eventOptionsSupported = false;
(() => {
  try {
    const options = {
      get capture() {
        eventOptionsSupported = true;
        return false;
      }
    };
    window.addEventListener("test", options, options);
    window.removeEventListener("test", options, options);
  } catch (_e) {
  }
})();
class EventPart {
  constructor(element, eventName, eventContext) {
    this.value = void 0;
    this.__pendingValue = void 0;
    this.element = element;
    this.eventName = eventName;
    this.eventContext = eventContext;
    this.__boundHandleEvent = (e) => this.handleEvent(e);
  }
  setValue(value) {
    this.__pendingValue = value;
  }
  commit() {
    while (isDirective(this.__pendingValue)) {
      const directive2 = this.__pendingValue;
      this.__pendingValue = noChange;
      directive2(this);
    }
    if (this.__pendingValue === noChange) {
      return;
    }
    const newListener = this.__pendingValue;
    const oldListener = this.value;
    const shouldRemoveListener = newListener == null || oldListener != null && (newListener.capture !== oldListener.capture || newListener.once !== oldListener.once || newListener.passive !== oldListener.passive);
    const shouldAddListener = newListener != null && (oldListener == null || shouldRemoveListener);
    if (shouldRemoveListener) {
      this.element.removeEventListener(this.eventName, this.__boundHandleEvent, this.__options);
    }
    if (shouldAddListener) {
      this.__options = getOptions(newListener);
      this.element.addEventListener(this.eventName, this.__boundHandleEvent, this.__options);
    }
    this.value = newListener;
    this.__pendingValue = noChange;
  }
  handleEvent(event) {
    if (typeof this.value === "function") {
      this.value.call(this.eventContext || this.element, event);
    } else {
      this.value.handleEvent(event);
    }
  }
}
const getOptions = (o) => o && (eventOptionsSupported ? {capture: o.capture, passive: o.passive, once: o.once} : o.capture);
/**
* @license
* Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
* This code may only be used under the BSD style license found at
* http://polymer.github.io/LICENSE.txt
* The complete set of authors may be found at
* http://polymer.github.io/AUTHORS.txt
* The complete set of contributors may be found at
* http://polymer.github.io/CONTRIBUTORS.txt
* Code distributed by Google as part of the polymer project is also
* subject to an additional IP rights grant found at
* http://polymer.github.io/PATENTS.txt
*/
class DefaultTemplateProcessor {
  handleAttributeExpressions(element, name, strings, options) {
    const prefix = name[0];
    if (prefix === ".") {
      const committer2 = new PropertyCommitter(element, name.slice(1), strings);
      return committer2.parts;
    }
    if (prefix === "@") {
      return [new EventPart(element, name.slice(1), options.eventContext)];
    }
    if (prefix === "?") {
      return [new BooleanAttributePart(element, name.slice(1), strings)];
    }
    const committer = new AttributeCommitter(element, name, strings);
    return committer.parts;
  }
  handleTextExpression(options) {
    return new NodePart(options);
  }
}
const defaultTemplateProcessor = new DefaultTemplateProcessor();
/**
* @license
* Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
* This code may only be used under the BSD style license found at
* http://polymer.github.io/LICENSE.txt
* The complete set of authors may be found at
* http://polymer.github.io/AUTHORS.txt
* The complete set of contributors may be found at
* http://polymer.github.io/CONTRIBUTORS.txt
* Code distributed by Google as part of the polymer project is also
* subject to an additional IP rights grant found at
* http://polymer.github.io/PATENTS.txt
*/
if (typeof window !== "undefined") {
  (window["litHtmlVersions"] || (window["litHtmlVersions"] = [])).push("1.4.1");
}
const html = (strings, ...values) => new TemplateResult(strings, values, "html", defaultTemplateProcessor);
/**
* @license
* Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
* This code may only be used under the BSD style license found at
* http://polymer.github.io/LICENSE.txt
* The complete set of authors may be found at
* http://polymer.github.io/AUTHORS.txt
* The complete set of contributors may be found at
* http://polymer.github.io/CONTRIBUTORS.txt
* Code distributed by Google as part of the polymer project is also
* subject to an additional IP rights grant found at
* http://polymer.github.io/PATENTS.txt
*/
if (typeof window.ShadyCSS === "undefined")
  ;
else if (typeof window.ShadyCSS.prepareTemplateDom === "undefined") {
  console.warn(`Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1.`);
}
/**
* @license
* Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
* This code may only be used under the BSD style license found at
* http://polymer.github.io/LICENSE.txt
* The complete set of authors may be found at
* http://polymer.github.io/AUTHORS.txt
* The complete set of contributors may be found at
* http://polymer.github.io/CONTRIBUTORS.txt
* Code distributed by Google as part of the polymer project is also
* subject to an additional IP rights grant found at
* http://polymer.github.io/PATENTS.txt
*/
window.JSCompiler_renameProperty = (prop, _obj) => prop;
/**
* @license
* Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
* This code may only be used under the BSD style license found at
* http://polymer.github.io/LICENSE.txt
* The complete set of authors may be found at
* http://polymer.github.io/AUTHORS.txt
* The complete set of contributors may be found at
* http://polymer.github.io/CONTRIBUTORS.txt
* Code distributed by Google as part of the polymer project is also
* subject to an additional IP rights grant found at
* http://polymer.github.io/PATENTS.txt
*/
function queryAsync(selector) {
  return (protoOrDescriptor, name) => {
    const descriptor = {
      async get() {
        await this.updateComplete;
        return this.renderRoot.querySelector(selector);
      },
      enumerable: true,
      configurable: true
    };
    return name !== void 0 ? legacyQuery(descriptor, protoOrDescriptor, name) : standardQuery(descriptor, protoOrDescriptor);
  };
}
const legacyQuery = (descriptor, proto, name) => {
  Object.defineProperty(proto, name, descriptor);
};
const standardQuery = (descriptor, element) => ({
  kind: "method",
  placement: "prototype",
  key: element.key,
  descriptor
});
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const supportsAdoptingStyleSheets = window.ShadowRoot && (window.ShadyCSS === void 0 || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
const constructionToken = Symbol();
class CSSResult {
  constructor(cssText, safeToken) {
    if (safeToken !== constructionToken) {
      throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    }
    this.cssText = cssText;
  }
  get styleSheet() {
    if (this._styleSheet === void 0) {
      if (supportsAdoptingStyleSheets) {
        this._styleSheet = new CSSStyleSheet();
        this._styleSheet.replaceSync(this.cssText);
      } else {
        this._styleSheet = null;
      }
    }
    return this._styleSheet;
  }
  toString() {
    return this.cssText;
  }
}
const unsafeCSS = (value) => {
  return new CSSResult(String(value), constructionToken);
};
const textFromCSSResult = (value) => {
  if (value instanceof CSSResult) {
    return value.cssText;
  } else if (typeof value === "number") {
    return value;
  } else {
    throw new Error(`Value passed to 'css' function must be a 'css' function result: ${value}. Use 'unsafeCSS' to pass non-literal values, but
            take care to ensure page security.`);
  }
};
const css = (strings, ...values) => {
  const cssText = values.reduce((acc, v, idx) => acc + textFromCSSResult(v) + strings[idx + 1], strings[0]);
  return new CSSResult(cssText, constructionToken);
};
/**
* @license
* Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
* This code may only be used under the BSD style license found at
* http://polymer.github.io/LICENSE.txt
* The complete set of authors may be found at
* http://polymer.github.io/AUTHORS.txt
* The complete set of contributors may be found at
* http://polymer.github.io/CONTRIBUTORS.txt
* Code distributed by Google as part of the polymer project is also
* subject to an additional IP rights grant found at
* http://polymer.github.io/PATENTS.txt
*/
(window["litElementVersions"] || (window["litElementVersions"] = [])).push("2.5.1");
/**
* @license
* Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
* This code may only be used under the BSD style license found at
* http://polymer.github.io/LICENSE.txt
* The complete set of authors may be found at
* http://polymer.github.io/AUTHORS.txt
* The complete set of contributors may be found at
* http://polymer.github.io/CONTRIBUTORS.txt
* Code distributed by Google as part of the polymer project is also
* subject to an additional IP rights grant found at
* http://polymer.github.io/PATENTS.txt
*/
const previousValues = new WeakMap();
const unsafeHTML = directive((value) => (part) => {
  if (!(part instanceof NodePart)) {
    throw new Error("unsafeHTML can only be used in text bindings");
  }
  const previousValue = previousValues.get(part);
  if (previousValue !== void 0 && isPrimitive(value) && value === previousValue.value && part.value === previousValue.fragment) {
    return;
  }
  const template = document.createElement("template");
  template.innerHTML = value;
  const fragment = document.importNode(template.content, true);
  part.setValue(fragment);
  previousValues.set(part, {value, fragment});
});
var _a, _b;
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
  format: {
    type: "String",
    default: __SSugarConfig.get("datetime.dateFormat")
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
  showWeekNumber: {
    type: "Boolean",
    description: " show the ISO week number at the head of the row (default false)",
    default: false
  },
  rtl: {
    type: "Boolean",
    description: "reverse the calendar for right-to-left languages",
    default: ((_a = document.querySelector("html")) === null || _a === void 0 ? void 0 : _a.getAttribute("dir")) === "rtl"
  },
  i18n: {
    type: "String",
    description: "language defaults for month and weekday names",
    default: (_b = __SSugarConfig.get("datetime.i18n")) !== null && _b !== void 0 ? _b : {
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
var __css = "s-date-picker {\n    display: inline-block;\n}\n.s-date-picker {\n    display: flex;\n    width: 100%;\n}\n\n.s-date-picker__input {\n    flex-grow: 1;\n}\n\n/* .s-pikaday.is-hidden {\n    opacity: 0;\n    pointer-events: none;\n    transform: translateY(20px);\n}\n.s-pikaday {\n    opacity: 1;\n    pointer-events: all;\n    transform: translateY(0);\n    display: block !important;\n    transition: sugar.theme(ui.colorPicker.transition);\n} */\n\ns-date-picker[default-style] .s-date-picker__input {\n        border-top-right-radius: 0;\n        border-bottom-right-radius: 0;\n    }\n\ns-date-picker[default-style] .s-date-picker__button {\n        border-top-left-radius: 0;\n        border-bottom-left-radius: 0;\n    }\n\n.s-date-picker__button svg {\n        height: 1em;\n    }\n";
var __themeCss = "/**\n * This theme is an example to show how you can create your own.\n */\n.pika-single.s-pikaday {\n    color: s-color(main, foreground);\n    background: hsla(calc(var(--s-theme-color-main-h, 0) + var(--s-theme-color-main-surface-spin ,0)),calc((var(--s-theme-color-main-s, 0) + var(--s-theme-color-main-surface-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-main-l, 0) + var(--s-theme-color-main-surface-lightness-offset, 0)) * 1%),var(--s-theme-color-main-surface-a, 1));\n    border: 1px solid hsla(calc(var(--s-theme-color-ui-h, 0) + var(--s-theme-color-ui-border-spin ,0)),calc((var(--s-theme-color-ui-s, 0) + var(--s-theme-color-ui-border-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-ui-l, 0) + var(--s-theme-color-ui-border-lightness-offset, 0)) * 1%),var(--s-theme-color-ui-border-a, 1));box-shadow: var(--s-theme-depth-100, 0);\n    border-radius: var(--s-theme-ui-colorPicker-borderRadius, 6px);\n    padding: var(--s-theme-ui-colorPicker-padding, 6px 12px);\n}\n\n.s-pikaday .pika-label {\n    background-color: transparent;\n    color: hsla(calc(var(--s-theme-color-ui-h, 0) + var(--s-theme-color-ui-spin ,0)),calc((var(--s-theme-color-ui-s, 0) + var(--s-theme-color-ui-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-ui-l, 0) + var(--s-theme-color-ui-lightness-offset, 0)) * 1%),var(--s-theme-color-ui-a, 1));\n    top: -0.5em;\n}\n\n.s-pikaday .pika-prev,\n.s-pikaday .is-rtl .pika-next,\n.s-pikaday .pika-next,\n.s-pikaday .is-rtl .pika-prev {\n    background: none;\n    position: relative;\n    display: inline-block;\n    font-size: 0;\n    color: hsla(calc(var(--s-theme-color-ui-h, 0) + var(--s-theme-color-ui-spin ,0)),calc((var(--s-theme-color-ui-s, 0) + var(--s-theme-color-ui-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-ui-l, 0) + var(--s-theme-color-ui-lightness-offset, 0)) * 1%),var(--s-theme-color-ui-a, 1));\n    overflow: visible;\n    background: red;\n    opacity: 1;\n    width: 1em;\n    height: 1em;\n    opacity: 0.7;\n}\n\n.s-pikaday .pika-prev:hover,\n    .s-pikaday .pika-prev:focus,\n    .s-pikaday .is-rtl .pika-next:hover,\n    .s-pikaday .is-rtl .pika-next:focus,\n    .s-pikaday .pika-next:hover,\n    .s-pikaday .pika-next:focus,\n    .s-pikaday .is-rtl .pika-prev:hover,\n    .s-pikaday .is-rtl .pika-prev:focus {\n        opacity: 1;\n    }\n\n.s-pikaday .pika-prev:after, .s-pikaday .is-rtl .pika-next:after, .s-pikaday .pika-next:after, .s-pikaday .is-rtl .pika-prev:after {\n        content: '\u276F';\n        color: inherit;\n        font-size: 1rem;\n        position: absolute;\n        top: 0;\n        left: -2.2em;\n    }\n.s-pikaday .pika-prev:after, .s-pikaday .is-rtl .pika-next:after {\n        transform: rotate(180deg);\n        left: 1em;\n    }\n\n.s-pikaday .pika-next,\n.s-pikaday .is-rtl .pika-prev {\n    /* background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAQAAACGG/bgAAAAP0lEQVQ4y+3TMQoAMAgEwfwfAvvjTZ1uGzuvHhBPPGczEG+FRqqRaqQaqUaqkX6QBmmjacvQ6qEVTjsh+xizebvlaWptGXZAAAAAAElFTkSuQmCC'); */\n}\n\n.s-pikaday .pika-table {\n    background: hsla(calc(var(--s-theme-color-main-h, 0) + var(--s-theme-color-main-background-spin ,0)),calc((var(--s-theme-color-main-s, 0) + var(--s-theme-color-main-background-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-main-l, 0) + var(--s-theme-color-main-background-lightness-offset, 0)) * 1%),var(--s-theme-color-main-background-a, 1));\n    border-radius: var(--s-theme-ui-colorPicker-borderRadius, 6px);\n    padding: var(--s-theme-ui-colorPicker-padding, 6px 12px);\n}\n\n.s-pikaday .pika-table th * {\n    text-decoration: none;\n    color: hsla(calc(var(--s-theme-color-main-h, 0) + var(--s-theme-color-main-text-spin ,0)),calc((var(--s-theme-color-main-s, 0) + var(--s-theme-color-main-text-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-main-l, 0) + var(--s-theme-color-main-text-lightness-offset, 0)) * 1%),var(--s-theme-color-main-text-a, 1));\n}\n\n.s-pikaday .pika-button {\n    background: hsla(calc(var(--s-theme-color-main-h, 0) + var(--s-theme-color-main-background-spin ,0)),calc((var(--s-theme-color-main-s, 0) + var(--s-theme-color-main-background-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-main-l, 0) + var(--s-theme-color-main-background-lightness-offset, 0)) * 1%),var(--s-theme-color-main-background-a, 1));\n    color: hsla(calc(var(--s-theme-color-main-h, 0) + var(--s-theme-color-main-text-spin ,0)),calc((var(--s-theme-color-main-s, 0) + var(--s-theme-color-main-text-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-main-l, 0) + var(--s-theme-color-main-text-lightness-offset, 0)) * 1%),var(--s-theme-color-main-text-a, 1));\n    padding: var(--s-theme-ui-colorPicker-padding, 6px 12px);\n}\n\n.s-pikaday .pika-week {\n    text-decoration: none;\n}\n\n.s-pikaday .is-today .pika-button {\n    color: hsla(calc(var(--s-theme-color-ui-h, 0) + var(--s-theme-color-ui-spin ,0)),calc((var(--s-theme-color-ui-s, 0) + var(--s-theme-color-ui-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-ui-l, 0) + var(--s-theme-color-ui-lightness-offset, 0)) * 1%),var(--s-theme-color-ui-a, 1));\n    outline: none;\n}\n\n.s-pikaday .is-selected .pika-button {\n    color: hsla(calc(var(--s-theme-color-main-h, 0) + var(--s-theme-color-main-text-spin ,0)),calc((var(--s-theme-color-main-s, 0) + var(--s-theme-color-main-text-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-main-l, 0) + var(--s-theme-color-main-text-lightness-offset, 0)) * 1%),var(--s-theme-color-main-text-a, 1));\n    background: hsla(calc(var(--s-theme-color-ui-h, 0) + var(--s-theme-color-ui-spin ,0)),calc((var(--s-theme-color-ui-s, 0) + var(--s-theme-color-ui-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-ui-l, 0) + var(--s-theme-color-ui-lightness-offset, 0)) * 1%),var(--s-theme-color-ui-a, 0.5));\n    box-shadow: none !important;\n}\n\n.s-pikaday .is-disabled .pika-button {\n    color: hsla(calc(var(--s-theme-color-main-h, 0) + var(--s-theme-color-main-text-spin ,0)),calc((var(--s-theme-color-main-s, 0) + var(--s-theme-color-main-text-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-main-l, 0) + var(--s-theme-color-main-text-lightness-offset, 0)) * 1%),var(--s-theme-color-main-text-a, 1));\n    opacity: 0.3;\n}\n\n.s-pikaday .pika-button:hover {\n    color: hsla(calc(var(--s-theme-color-ui-h, 0) + var(--s-theme-color-ui-foreground-spin ,0)),calc((var(--s-theme-color-ui-s, 0) + var(--s-theme-color-ui-foreground-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-ui-l, 0) + var(--s-theme-color-ui-foreground-lightness-offset, 0)) * 1%),var(--s-theme-color-ui-foreground-a, 1)) !important;\n    background: hsla(calc(var(--s-theme-color-ui-h, 0) + var(--s-theme-color-ui-spin ,0)),calc((var(--s-theme-color-ui-s, 0) + var(--s-theme-color-ui-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-ui-l, 0) + var(--s-theme-color-ui-lightness-offset, 0)) * 1%),var(--s-theme-color-ui-a, 1)) !important;\n}\n";
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
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
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
      interface: SDatePickerComponentInterface,
      defaultProps: {}
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
      this._picker = new __pikaday({
        field: $input,
        format: this._component.props.format,
        trigger: $button,
        firstDay: this._component.props.firstDay,
        minDate: this._component.props.minDate,
        maxDate: this._component.props.maxDate,
        disableWeekends: this._component.props.disableWeekends,
        yearRange: this._component.props.yearRange,
        showWeekNumber: this._component.props.showWeekNumber,
        rtl: this._component.props.rtl,
        i18n: this._component.props.i18n,
        numberOfMonths: this._component.props.numberOfMonths,
        events: this._component.props.events,
        defaultDate: this._component.props.value,
        theme: this._component.props.defaultStyle ? "s-pikaday" : "",
        toString(date, format) {
          return __moment(date).format(format);
        },
        parse(dateString, format) {
          return __moment(dateString, format).toDate();
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
    return html`
            <div class="${this._component.className("")}">
                <input
                    class="${this._component.className("__input", "s-input")}"
                    type="text"
                    name="${this.name}"
                    autocomplete="off"
                />
                ${this._component.props.button ? html`
                          <button class="${this._component.className("__button", "s-btn")}">
                              ${unsafeHTML(this._component.props.calendarIcon)}
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
