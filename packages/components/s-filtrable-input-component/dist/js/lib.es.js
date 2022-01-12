import {css,unsafeCSS,html}from'lit';import __SInterface from'@coffeekraken/s-interface';import __SLitComponent from'@coffeekraken/s-lit-component';import __clone from'lodash.clone';import __deepClone from'lodash.clonedeep';import __SPromise from'@coffeekraken/s-promise';/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var _a, _b, _c, _d;
let issueWarning;
{
    (_a = globalThis.litIssuedWarnings) !== null && _a !== void 0 ? _a : (globalThis.litIssuedWarnings = new Set());
    // Issue a warning, if we haven't already.
    issueWarning = (code, warning) => {
        warning += code
            ? ` See https://lit.dev/msg/${code} for more information.`
            : '';
        if (!globalThis.litIssuedWarnings.has(warning)) {
            console.warn(warning);
            globalThis.litIssuedWarnings.add(warning);
        }
    };
    issueWarning('dev-mode', `Lit is in dev mode. Not recommended for production!`);
}
const wrap = ((_b = window.ShadyDOM) === null || _b === void 0 ? void 0 : _b.inUse) &&
    ((_c = window.ShadyDOM) === null || _c === void 0 ? void 0 : _c.noPatch) === true
    ? window.ShadyDOM.wrap
    : (node) => node;
const trustedTypes = globalThis.trustedTypes;
/**
 * Our TrustedTypePolicy for HTML which is declared using the html template
 * tag function.
 *
 * That HTML is a developer-authored constant, and is parsed with innerHTML
 * before any untrusted expressions have been mixed in. Therefor it is
 * considered safe by construction.
 */
const policy = trustedTypes
    ? trustedTypes.createPolicy('lit-html', {
        createHTML: (s) => s,
    })
    : undefined;
const identityFunction = (value) => value;
const noopSanitizer = (_node, _name, _type) => identityFunction;
const createSanitizer = (node, name, type) => {
    return sanitizerFactoryInternal(node, name, type);
};
// Added to an attribute name to mark the attribute as bound so we can find
// it easily.
const boundAttributeSuffix = '$lit$';
// This marker is used in many syntactic positions in HTML, so it must be
// a valid element name and attribute name. We don't support dynamic names (yet)
// but this at least ensures that the parse tree is closer to the template
// intention.
const marker = `lit$${String(Math.random()).slice(9)}$`;
// String used to tell if a comment is a marker comment
const markerMatch = '?' + marker;
// Text used to insert a comment marker node. We use processing instruction
// syntax because it's slightly smaller, but parses as a comment node.
const nodeMarker = `<${markerMatch}>`;
const d = document;
// Creates a dynamic marker. We never have to search for these in the DOM.
const createMarker = (v = '') => d.createComment(v);
const isPrimitive = (value) => value === null || (typeof value != 'object' && typeof value != 'function');
const isArray = Array.isArray;
const isIterable = (value) => {
    var _a;
    return isArray(value) ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        typeof ((_a = value) === null || _a === void 0 ? void 0 : _a[Symbol.iterator]) === 'function';
};
const SPACE_CHAR = `[ \t\n\f\r]`;
const ATTR_VALUE_CHAR = `[^ \t\n\f\r"'\`<>=]`;
const NAME_CHAR = `[^\\s"'>=/]`;
// These regexes represent the five parsing states that we care about in the
// Template's HTML scanner. They match the *end* of the state they're named
// after.
// Depending on the match, we transition to a new state. If there's no match,
// we stay in the same state.
// Note that the regexes are stateful. We utilize lastIndex and sync it
// across the multiple regexes used. In addition to the five regexes below
// we also dynamically create a regex to find the matching end tags for raw
// text elements.
/**
 * End of text is: `<` followed by:
 *   (comment start) or (tag) or (dynamic tag binding)
 */
const textEndRegex = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
const COMMENT_START = 1;
const TAG_NAME = 2;
const DYNAMIC_TAG_NAME = 3;
const commentEndRegex = /-->/g;
/**
 * Comments not started with <!--, like </{, can be ended by a single `>`
 */
const comment2EndRegex = />/g;
/**
 * The tagEnd regex matches the end of the "inside an opening" tag syntax
 * position. It either matches a `>`, an attribute-like sequence, or the end
 * of the string after a space (attribute-name position ending).
 *
 * See attributes in the HTML spec:
 * https://www.w3.org/TR/html5/syntax.html#elements-attributes
 *
 * " \t\n\f\r" are HTML space characters:
 * https://infra.spec.whatwg.org/#ascii-whitespace
 *
 * So an attribute is:
 *  * The name: any character except a whitespace character, ("), ('), ">",
 *    "=", or "/". Note: this is different from the HTML spec which also excludes control characters.
 *  * Followed by zero or more space characters
 *  * Followed by "="
 *  * Followed by zero or more space characters
 *  * Followed by:
 *    * Any character except space, ('), ("), "<", ">", "=", (`), or
 *    * (") then any non-("), or
 *    * (') then any non-(')
 */
const tagEndRegex = new RegExp(`>|${SPACE_CHAR}(?:(${NAME_CHAR}+)(${SPACE_CHAR}*=${SPACE_CHAR}*(?:${ATTR_VALUE_CHAR}|("|')|))|$)`, 'g');
const ENTIRE_MATCH = 0;
const ATTRIBUTE_NAME = 1;
const SPACES_AND_EQUALS = 2;
const QUOTE_CHAR = 3;
const singleQuoteAttrEndRegex = /'/g;
const doubleQuoteAttrEndRegex = /"/g;
/**
 * Matches the raw text elements.
 *
 * Comments are not parsed within raw text elements, so we need to search their
 * text content for marker strings.
 */
const rawTextElement = /^(?:script|style|textarea)$/i;
const SVG_RESULT = 2;
// TemplatePart types
// IMPORTANT: these must match the values in PartType
const ATTRIBUTE_PART = 1;
const CHILD_PART = 2;
const PROPERTY_PART = 3;
const BOOLEAN_ATTRIBUTE_PART = 4;
const EVENT_PART = 5;
const ELEMENT_PART = 6;
const COMMENT_PART = 7;
/**
 * A sentinel value that signals that a value was handled by a directive and
 * should not be written to the DOM.
 */
const noChange = Symbol.for('lit-noChange');
/**
 * A sentinel value that signals a ChildPart to fully clear its content.
 *
 * ```ts
 * const button = html`${
 *  user.isAdmin
 *    ? html`<button>DELETE</button>`
 *    : nothing
 * }`;
 * ```
 *
 * Prefer using `nothing` over other falsy values as it provides a consistent
 * behavior between various expression binding contexts.
 *
 * In child expressions, `undefined`, `null`, `''`, and `nothing` all behave the
 * same and render no nodes. In attribute expressions, `nothing` _removes_ the
 * attribute, while `undefined` and `null` will render an empty string. In
 * property expressions `nothing` becomes `undefined`.
 */
const nothing = Symbol.for('lit-nothing');
/**
 * The cache of prepared templates, keyed by the tagged TemplateStringsArray
 * and _not_ accounting for the specific template tag used. This means that
 * template tags cannot be dynamic - the must statically be one of html, svg,
 * or attr. This restriction simplifies the cache lookup, which is on the hot
 * path for rendering.
 */
const templateCache = new WeakMap();
const walker = d.createTreeWalker(d, 129 /* NodeFilter.SHOW_{ELEMENT|COMMENT} */, null, false);
let sanitizerFactoryInternal = noopSanitizer;
/**
 * Returns an HTML string for the given TemplateStringsArray and result type
 * (HTML or SVG), along with the case-sensitive bound attribute names in
 * template order. The HTML contains comment comment markers denoting the
 * `ChildPart`s and suffixes on bound attributes denoting the `AttributeParts`.
 *
 * @param strings template strings array
 * @param type HTML or SVG
 * @return Array containing `[html, attrNames]` (array returned for terseness,
 *     to avoid object fields since this code is shared with non-minified SSR
 *     code)
 */
const getTemplateHtml = (strings, type) => {
    // Insert makers into the template HTML to represent the position of
    // bindings. The following code scans the template strings to determine the
    // syntactic position of the bindings. They can be in text position, where
    // we insert an HTML comment, attribute value position, where we insert a
    // sentinel string and re-write the attribute name, or inside a tag where
    // we insert the sentinel string.
    const l = strings.length - 1;
    // Stores the case-sensitive bound attribute names in the order of their
    // parts. ElementParts are also reflected in this array as undefined
    // rather than a string, to disambiguate from attribute bindings.
    const attrNames = [];
    let html = type === SVG_RESULT ? '<svg>' : '';
    // When we're inside a raw text tag (not it's text content), the regex
    // will still be tagRegex so we can find attributes, but will switch to
    // this regex when the tag ends.
    let rawTextEndRegex;
    // The current parsing state, represented as a reference to one of the
    // regexes
    let regex = textEndRegex;
    for (let i = 0; i < l; i++) {
        const s = strings[i];
        // The index of the end of the last attribute name. When this is
        // positive at end of a string, it means we're in an attribute value
        // position and need to rewrite the attribute name.
        // We also use a special value of -2 to indicate that we encountered
        // the end of a string in attribute name position.
        let attrNameEndIndex = -1;
        let attrName;
        let lastIndex = 0;
        let match;
        // The conditions in this loop handle the current parse state, and the
        // assignments to the `regex` variable are the state transitions.
        while (lastIndex < s.length) {
            // Make sure we start searching from where we previously left off
            regex.lastIndex = lastIndex;
            match = regex.exec(s);
            if (match === null) {
                break;
            }
            lastIndex = regex.lastIndex;
            if (regex === textEndRegex) {
                if (match[COMMENT_START] === '!--') {
                    regex = commentEndRegex;
                }
                else if (match[COMMENT_START] !== undefined) {
                    // We started a weird comment, like </{
                    regex = comment2EndRegex;
                }
                else if (match[TAG_NAME] !== undefined) {
                    if (rawTextElement.test(match[TAG_NAME])) {
                        // Record if we encounter a raw-text element. We'll switch to
                        // this regex at the end of the tag.
                        rawTextEndRegex = new RegExp(`</${match[TAG_NAME]}`, 'g');
                    }
                    regex = tagEndRegex;
                }
                else if (match[DYNAMIC_TAG_NAME] !== undefined) {
                    {
                        throw new Error('Bindings in tag names are not supported. Please use static templates instead. ' +
                            'See https://lit.dev/docs/templates/expressions/#static-expressions');
                    }
                }
            }
            else if (regex === tagEndRegex) {
                if (match[ENTIRE_MATCH] === '>') {
                    // End of a tag. If we had started a raw-text element, use that
                    // regex
                    regex = rawTextEndRegex !== null && rawTextEndRegex !== void 0 ? rawTextEndRegex : textEndRegex;
                    // We may be ending an unquoted attribute value, so make sure we
                    // clear any pending attrNameEndIndex
                    attrNameEndIndex = -1;
                }
                else if (match[ATTRIBUTE_NAME] === undefined) {
                    // Attribute name position
                    attrNameEndIndex = -2;
                }
                else {
                    attrNameEndIndex = regex.lastIndex - match[SPACES_AND_EQUALS].length;
                    attrName = match[ATTRIBUTE_NAME];
                    regex =
                        match[QUOTE_CHAR] === undefined
                            ? tagEndRegex
                            : match[QUOTE_CHAR] === '"'
                                ? doubleQuoteAttrEndRegex
                                : singleQuoteAttrEndRegex;
                }
            }
            else if (regex === doubleQuoteAttrEndRegex ||
                regex === singleQuoteAttrEndRegex) {
                regex = tagEndRegex;
            }
            else if (regex === commentEndRegex || regex === comment2EndRegex) {
                regex = textEndRegex;
            }
            else {
                // Not one of the five state regexes, so it must be the dynamically
                // created raw text regex and we're at the close of that element.
                regex = tagEndRegex;
                rawTextEndRegex = undefined;
            }
        }
        {
            // If we have a attrNameEndIndex, which indicates that we should
            // rewrite the attribute name, assert that we're in a valid attribute
            // position - either in a tag, or a quoted attribute value.
            console.assert(attrNameEndIndex === -1 ||
                regex === tagEndRegex ||
                regex === singleQuoteAttrEndRegex ||
                regex === doubleQuoteAttrEndRegex, 'unexpected parse state B');
        }
        // We have four cases:
        //  1. We're in text position, and not in a raw text element
        //     (regex === textEndRegex): insert a comment marker.
        //  2. We have a non-negative attrNameEndIndex which means we need to
        //     rewrite the attribute name to add a bound attribute suffix.
        //  3. We're at the non-first binding in a multi-binding attribute, use a
        //     plain marker.
        //  4. We're somewhere else inside the tag. If we're in attribute name
        //     position (attrNameEndIndex === -2), add a sequential suffix to
        //     generate a unique attribute name.
        // Detect a binding next to self-closing tag end and insert a space to
        // separate the marker from the tag end:
        const end = regex === tagEndRegex && strings[i + 1].startsWith('/>') ? ' ' : '';
        html +=
            regex === textEndRegex
                ? s + nodeMarker
                : attrNameEndIndex >= 0
                    ? (attrNames.push(attrName),
                        s.slice(0, attrNameEndIndex) +
                            boundAttributeSuffix +
                            s.slice(attrNameEndIndex)) +
                        marker +
                        end
                    : s +
                        marker +
                        (attrNameEndIndex === -2 ? (attrNames.push(undefined), i) : end);
    }
    const htmlResult = html + (strings[l] || '<?>') + (type === SVG_RESULT ? '</svg>' : '');
    // Returned as an array for terseness
    return [
        policy !== undefined
            ? policy.createHTML(htmlResult)
            : htmlResult,
        attrNames,
    ];
};
class Template {
    constructor(
    // This property needs to remain unminified.
    { strings, ['_$litType$']: type }, options) {
        /** @internal */
        this.parts = [];
        let node;
        let nodeIndex = 0;
        let attrNameIndex = 0;
        const partCount = strings.length - 1;
        const parts = this.parts;
        // Create template element
        const [html, attrNames] = getTemplateHtml(strings, type);
        this.el = Template.createElement(html, options);
        walker.currentNode = this.el.content;
        // Reparent SVG nodes into template root
        if (type === SVG_RESULT) {
            const content = this.el.content;
            const svgElement = content.firstChild;
            svgElement.remove();
            content.append(...svgElement.childNodes);
        }
        // Walk the template to find binding markers and create TemplateParts
        while ((node = walker.nextNode()) !== null && parts.length < partCount) {
            if (node.nodeType === 1) {
                {
                    const tag = node.localName;
                    // Warn if `textarea` includes an expression and throw if `template`
                    // does since these are not supported. We do this by checking
                    // innerHTML for anything that looks like a marker. This catches
                    // cases like bindings in textarea there markers turn into text nodes.
                    if (/^(?:textarea|template)$/i.test(tag) &&
                        node.innerHTML.includes(marker)) {
                        const m = `Expressions are not supported inside \`${tag}\` ` +
                            `elements. See https://lit.dev/msg/expression-in-${tag} for more ` +
                            `information.`;
                        if (tag === 'template') {
                            throw new Error(m);
                        }
                        else
                            issueWarning('', m);
                    }
                }
                // TODO (justinfagnani): for attempted dynamic tag names, we don't
                // increment the bindingIndex, and it'll be off by 1 in the element
                // and off by two after it.
                if (node.hasAttributes()) {
                    // We defer removing bound attributes because on IE we might not be
                    // iterating attributes in their template order, and would sometimes
                    // remove an attribute that we still need to create a part for.
                    const attrsToRemove = [];
                    for (const name of node.getAttributeNames()) {
                        // `name` is the name of the attribute we're iterating over, but not
                        // _neccessarily_ the name of the attribute we will create a part
                        // for. They can be different in browsers that don't iterate on
                        // attributes in source order. In that case the attrNames array
                        // contains the attribute name we'll process next. We only need the
                        // attribute name here to know if we should process a bound attribute
                        // on this element.
                        if (name.endsWith(boundAttributeSuffix) ||
                            name.startsWith(marker)) {
                            const realName = attrNames[attrNameIndex++];
                            attrsToRemove.push(name);
                            if (realName !== undefined) {
                                // Lowercase for case-sensitive SVG attributes like viewBox
                                const value = node.getAttribute(realName.toLowerCase() + boundAttributeSuffix);
                                const statics = value.split(marker);
                                const m = /([.?@])?(.*)/.exec(realName);
                                parts.push({
                                    type: ATTRIBUTE_PART,
                                    index: nodeIndex,
                                    name: m[2],
                                    strings: statics,
                                    ctor: m[1] === '.'
                                        ? PropertyPart
                                        : m[1] === '?'
                                            ? BooleanAttributePart
                                            : m[1] === '@'
                                                ? EventPart
                                                : AttributePart,
                                });
                            }
                            else {
                                parts.push({
                                    type: ELEMENT_PART,
                                    index: nodeIndex,
                                });
                            }
                        }
                    }
                    for (const name of attrsToRemove) {
                        node.removeAttribute(name);
                    }
                }
                // TODO (justinfagnani): benchmark the regex against testing for each
                // of the 3 raw text element names.
                if (rawTextElement.test(node.tagName)) {
                    // For raw text elements we need to split the text content on
                    // markers, create a Text node for each segment, and create
                    // a TemplatePart for each marker.
                    const strings = node.textContent.split(marker);
                    const lastIndex = strings.length - 1;
                    if (lastIndex > 0) {
                        node.textContent = trustedTypes
                            ? trustedTypes.emptyScript
                            : '';
                        // Generate a new text node for each literal section
                        // These nodes are also used as the markers for node parts
                        // We can't use empty text nodes as markers because they're
                        // normalized when cloning in IE (could simplify when
                        // IE is no longer supported)
                        for (let i = 0; i < lastIndex; i++) {
                            node.append(strings[i], createMarker());
                            // Walk past the marker node we just added
                            walker.nextNode();
                            parts.push({ type: CHILD_PART, index: ++nodeIndex });
                        }
                        // Note because this marker is added after the walker's current
                        // node, it will be walked to in the outer loop (and ignored), so
                        // we don't need to adjust nodeIndex here
                        node.append(strings[lastIndex], createMarker());
                    }
                }
            }
            else if (node.nodeType === 8) {
                const data = node.data;
                if (data === markerMatch) {
                    parts.push({ type: CHILD_PART, index: nodeIndex });
                }
                else {
                    let i = -1;
                    while ((i = node.data.indexOf(marker, i + 1)) !== -1) {
                        // Comment node has a binding marker inside, make an inactive part
                        // The binding won't work, but subsequent bindings will
                        parts.push({ type: COMMENT_PART, index: nodeIndex });
                        // Move to the end of the match
                        i += marker.length - 1;
                    }
                }
            }
            nodeIndex++;
        }
    }
    // Overridden via `litHtmlPolyfillSupport` to provide platform support.
    /** @nocollapse */
    static createElement(html, _options) {
        const el = d.createElement('template');
        el.innerHTML = html;
        return el;
    }
}
function resolveDirective(part, value, parent = part, attributeIndex) {
    var _a, _b, _c;
    var _d;
    // Bail early if the value is explicitly noChange. Note, this means any
    // nested directive is still attached and is not run.
    if (value === noChange) {
        return value;
    }
    let currentDirective = attributeIndex !== undefined
        ? (_a = parent.__directives) === null || _a === void 0 ? void 0 : _a[attributeIndex]
        : parent.__directive;
    const nextDirectiveConstructor = isPrimitive(value)
        ? undefined
        : // This property needs to remain unminified.
            value['_$litDirective$'];
    if ((currentDirective === null || currentDirective === void 0 ? void 0 : currentDirective.constructor) !== nextDirectiveConstructor) {
        // This property needs to remain unminified.
        (_b = currentDirective === null || currentDirective === void 0 ? void 0 : currentDirective['_$notifyDirectiveConnectionChanged']) === null || _b === void 0 ? void 0 : _b.call(currentDirective, false);
        if (nextDirectiveConstructor === undefined) {
            currentDirective = undefined;
        }
        else {
            currentDirective = new nextDirectiveConstructor(part);
            currentDirective._$initialize(part, parent, attributeIndex);
        }
        if (attributeIndex !== undefined) {
            ((_c = (_d = parent).__directives) !== null && _c !== void 0 ? _c : (_d.__directives = []))[attributeIndex] =
                currentDirective;
        }
        else {
            parent.__directive = currentDirective;
        }
    }
    if (currentDirective !== undefined) {
        value = resolveDirective(part, currentDirective._$resolve(part, value.values), currentDirective, attributeIndex);
    }
    return value;
}
/**
 * An updateable instance of a Template. Holds references to the Parts used to
 * update the template instance.
 */
class TemplateInstance {
    constructor(template, parent) {
        /** @internal */
        this._parts = [];
        /** @internal */
        this._$disconnectableChildren = undefined;
        this._$template = template;
        this._$parent = parent;
    }
    // Called by ChildPart parentNode getter
    get parentNode() {
        return this._$parent.parentNode;
    }
    // See comment in Disconnectable interface for why this is a getter
    get _$isConnected() {
        return this._$parent._$isConnected;
    }
    // This method is separate from the constructor because we need to return a
    // DocumentFragment and we don't want to hold onto it with an instance field.
    _clone(options) {
        var _a;
        const { el: { content }, parts: parts, } = this._$template;
        const fragment = ((_a = options === null || options === void 0 ? void 0 : options.creationScope) !== null && _a !== void 0 ? _a : d).importNode(content, true);
        walker.currentNode = fragment;
        let node = walker.nextNode();
        let nodeIndex = 0;
        let partIndex = 0;
        let templatePart = parts[0];
        while (templatePart !== undefined) {
            if (nodeIndex === templatePart.index) {
                let part;
                if (templatePart.type === CHILD_PART) {
                    part = new ChildPart(node, node.nextSibling, this, options);
                }
                else if (templatePart.type === ATTRIBUTE_PART) {
                    part = new templatePart.ctor(node, templatePart.name, templatePart.strings, this, options);
                }
                else if (templatePart.type === ELEMENT_PART) {
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
            if (part !== undefined) {
                if (part.strings !== undefined) {
                    part._$setValue(values, part, i);
                    // The number of values the part consumes is part.strings.length - 1
                    // since values are in between template spans. We increment i by 1
                    // later in the loop, so increment it by part.strings.length - 2 here
                    i += part.strings.length - 2;
                }
                else {
                    part._$setValue(values[i]);
                }
            }
            i++;
        }
    }
}
class ChildPart {
    constructor(startNode, endNode, parent, options) {
        var _a;
        this.type = CHILD_PART;
        this._$committedValue = nothing;
        // The following fields will be patched onto ChildParts when required by
        // AsyncDirective
        /** @internal */
        this._$disconnectableChildren = undefined;
        this._$startNode = startNode;
        this._$endNode = endNode;
        this._$parent = parent;
        this.options = options;
        // Note __isConnected is only ever accessed on RootParts (i.e. when there is
        // no _$parent); the value on a non-root-part is "don't care", but checking
        // for parent would be more code
        this.__isConnected = (_a = options === null || options === void 0 ? void 0 : options.isConnected) !== null && _a !== void 0 ? _a : true;
        {
            // Explicitly initialize for consistent class shape.
            this._textSanitizer = undefined;
        }
    }
    // See comment in Disconnectable interface for why this is a getter
    get _$isConnected() {
        var _a, _b;
        // ChildParts that are not at the root should always be created with a
        // parent; only RootChildNode's won't, so they return the local isConnected
        // state
        return (_b = (_a = this._$parent) === null || _a === void 0 ? void 0 : _a._$isConnected) !== null && _b !== void 0 ? _b : this.__isConnected;
    }
    /**
     * The parent node into which the part renders its content.
     *
     * A ChildPart's content consists of a range of adjacent child nodes of
     * `.parentNode`, possibly bordered by 'marker nodes' (`.startNode` and
     * `.endNode`).
     *
     * - If both `.startNode` and `.endNode` are non-null, then the part's content
     * consists of all siblings between `.startNode` and `.endNode`, exclusively.
     *
     * - If `.startNode` is non-null but `.endNode` is null, then the part's
     * content consists of all siblings following `.startNode`, up to and
     * including the last child of `.parentNode`. If `.endNode` is non-null, then
     * `.startNode` will always be non-null.
     *
     * - If both `.endNode` and `.startNode` are null, then the part's content
     * consists of all child nodes of `.parentNode`.
     */
    get parentNode() {
        let parentNode = wrap(this._$startNode).parentNode;
        const parent = this._$parent;
        if (parent !== undefined &&
            parentNode.nodeType === 11 /* Node.DOCUMENT_FRAGMENT */) {
            // If the parentNode is a DocumentFragment, it may be because the DOM is
            // still in the cloned fragment during initial render; if so, get the real
            // parentNode the part will be committed into by asking the parent.
            parentNode = parent.parentNode;
        }
        return parentNode;
    }
    /**
     * The part's leading marker node, if any. See `.parentNode` for more
     * information.
     */
    get startNode() {
        return this._$startNode;
    }
    /**
     * The part's trailing marker node, if any. See `.parentNode` for more
     * information.
     */
    get endNode() {
        return this._$endNode;
    }
    _$setValue(value, directiveParent = this) {
        if (this.parentNode === null) {
            throw new Error(`This \`ChildPart\` has no \`parentNode\` and therefore cannot accept a value. This likely means the element containing the part was manipulated in an unsupported way outside of Lit's control such that the part's marker nodes were ejected from DOM. For example, setting the element's \`innerHTML\` or \`textContent\` can do this.`);
        }
        value = resolveDirective(this, value, directiveParent);
        if (isPrimitive(value)) {
            // Non-rendering child values. It's important that these do not render
            // empty text nodes to avoid issues with preventing default <slot>
            // fallback content.
            if (value === nothing || value == null || value === '') {
                if (this._$committedValue !== nothing) {
                    this._$clear();
                }
                this._$committedValue = nothing;
            }
            else if (value !== this._$committedValue && value !== noChange) {
                this._commitText(value);
            }
            // This property needs to remain unminified.
        }
        else if (value['_$litType$'] !== undefined) {
            this._commitTemplateResult(value);
        }
        else if (value.nodeType !== undefined) {
            this._commitNode(value);
        }
        else if (isIterable(value)) {
            this._commitIterable(value);
        }
        else {
            // Fallback, will render the string representation
            this._commitText(value);
        }
    }
    _insert(node, ref = this._$endNode) {
        return wrap(wrap(this._$startNode).parentNode).insertBefore(node, ref);
    }
    _commitNode(value) {
        var _a;
        if (this._$committedValue !== value) {
            this._$clear();
            if (sanitizerFactoryInternal !== noopSanitizer) {
                const parentNodeName = (_a = this._$startNode.parentNode) === null || _a === void 0 ? void 0 : _a.nodeName;
                if (parentNodeName === 'STYLE' || parentNodeName === 'SCRIPT') {
                    let message = 'Forbidden';
                    {
                        if (parentNodeName === 'STYLE') {
                            message =
                                `Lit does not support binding inside style nodes. ` +
                                    `This is a security risk, as style injection attacks can ` +
                                    `exfiltrate data and spoof UIs. ` +
                                    `Consider instead using css\`...\` literals ` +
                                    `to compose styles, and make do dynamic styling with ` +
                                    `css custom properties, ::parts, <slot>s, ` +
                                    `and by mutating the DOM rather than stylesheets.`;
                        }
                        else {
                            message =
                                `Lit does not support binding inside script nodes. ` +
                                    `This is a security risk, as it could allow arbitrary ` +
                                    `code execution.`;
                        }
                    }
                    throw new Error(message);
                }
            }
            this._$committedValue = this._insert(value);
        }
    }
    _commitText(value) {
        // If the committed value is a primitive it means we called _commitText on
        // the previous render, and we know that this._$startNode.nextSibling is a
        // Text node. We can now just replace the text content (.data) of the node.
        if (this._$committedValue !== nothing &&
            isPrimitive(this._$committedValue)) {
            const node = wrap(this._$startNode).nextSibling;
            {
                if (this._textSanitizer === undefined) {
                    this._textSanitizer = createSanitizer(node, 'data', 'property');
                }
                value = this._textSanitizer(value);
            }
            node.data = value;
        }
        else {
            {
                const textNode = document.createTextNode('');
                this._commitNode(textNode);
                // When setting text content, for security purposes it matters a lot
                // what the parent is. For example, <style> and <script> need to be
                // handled with care, while <span> does not. So first we need to put a
                // text node into the document, then we can sanitize its contentx.
                if (this._textSanitizer === undefined) {
                    this._textSanitizer = createSanitizer(textNode, 'data', 'property');
                }
                value = this._textSanitizer(value);
                textNode.data = value;
            }
        }
        this._$committedValue = value;
    }
    _commitTemplateResult(result) {
        var _a;
        // This property needs to remain unminified.
        const { values, ['_$litType$']: type } = result;
        // If $litType$ is a number, result is a plain TemplateResult and we get
        // the template from the template cache. If not, result is a
        // CompiledTemplateResult and _$litType$ is a CompiledTemplate and we need
        // to create the <template> element the first time we see it.
        const template = typeof type === 'number'
            ? this._$getTemplate(result)
            : (type.el === undefined &&
                (type.el = Template.createElement(type.h, this.options)),
                type);
        if (((_a = this._$committedValue) === null || _a === void 0 ? void 0 : _a._$template) === template) {
            this._$committedValue._update(values);
        }
        else {
            const instance = new TemplateInstance(template, this);
            const fragment = instance._clone(this.options);
            instance._update(values);
            this._commitNode(fragment);
            this._$committedValue = instance;
        }
    }
    // Overridden via `litHtmlPolyfillSupport` to provide platform support.
    /** @internal */
    _$getTemplate(result) {
        let template = templateCache.get(result.strings);
        if (template === undefined) {
            templateCache.set(result.strings, (template = new Template(result)));
        }
        return template;
    }
    _commitIterable(value) {
        // For an Iterable, we create a new InstancePart per item, then set its
        // value to the item. This is a little bit of overhead for every item in
        // an Iterable, but it lets us recurse easily and efficiently update Arrays
        // of TemplateResults that will be commonly returned from expressions like:
        // array.map((i) => html`${i}`), by reusing existing TemplateInstances.
        // If value is an array, then the previous render was of an
        // iterable and value will contain the ChildParts from the previous
        // render. If value is not an array, clear this part and make a new
        // array for ChildParts.
        if (!isArray(this._$committedValue)) {
            this._$committedValue = [];
            this._$clear();
        }
        // Lets us keep track of how many items we stamped so we can clear leftover
        // items from a previous render
        const itemParts = this._$committedValue;
        let partIndex = 0;
        let itemPart;
        for (const item of value) {
            if (partIndex === itemParts.length) {
                // If no existing part, create a new one
                // TODO (justinfagnani): test perf impact of always creating two parts
                // instead of sharing parts between nodes
                // https://github.com/lit/lit/issues/1266
                itemParts.push((itemPart = new ChildPart(this._insert(createMarker()), this._insert(createMarker()), this, this.options)));
            }
            else {
                // Reuse an existing part
                itemPart = itemParts[partIndex];
            }
            itemPart._$setValue(item);
            partIndex++;
        }
        if (partIndex < itemParts.length) {
            // itemParts always have end nodes
            this._$clear(itemPart && wrap(itemPart._$endNode).nextSibling, partIndex);
            // Truncate the parts array so _value reflects the current state
            itemParts.length = partIndex;
        }
    }
    /**
     * Removes the nodes contained within this Part from the DOM.
     *
     * @param start Start node to clear from, for clearing a subset of the part's
     *     DOM (used when truncating iterables)
     * @param from  When `start` is specified, the index within the iterable from
     *     which ChildParts are being removed, used for disconnecting directives in
     *     those Parts.
     *
     * @internal
     */
    _$clear(start = wrap(this._$startNode).nextSibling, from) {
        var _a;
        (_a = this._$notifyConnectionChanged) === null || _a === void 0 ? void 0 : _a.call(this, false, true, from);
        while (start && start !== this._$endNode) {
            const n = wrap(start).nextSibling;
            wrap(start).remove();
            start = n;
        }
    }
    /**
     * Implementation of RootPart's `isConnected`. Note that this metod
     * should only be called on `RootPart`s (the `ChildPart` returned from a
     * top-level `render()` call). It has no effect on non-root ChildParts.
     * @param isConnected Whether to set
     * @internal
     */
    setConnected(isConnected) {
        var _a;
        if (this._$parent === undefined) {
            this.__isConnected = isConnected;
            (_a = this._$notifyConnectionChanged) === null || _a === void 0 ? void 0 : _a.call(this, isConnected);
        }
        else {
            throw new Error('part.setConnected() may only be called on a ' +
                'RootPart returned from render().');
        }
    }
}
class AttributePart {
    constructor(element, name, strings, parent, options) {
        this.type = ATTRIBUTE_PART;
        /** @internal */
        this._$committedValue = nothing;
        /** @internal */
        this._$disconnectableChildren = undefined;
        this.element = element;
        this.name = name;
        this._$parent = parent;
        this.options = options;
        if (strings.length > 2 || strings[0] !== '' || strings[1] !== '') {
            this._$committedValue = new Array(strings.length - 1).fill(new String());
            this.strings = strings;
        }
        else {
            this._$committedValue = nothing;
        }
        {
            this._sanitizer = undefined;
        }
    }
    get tagName() {
        return this.element.tagName;
    }
    // See comment in Disconnectable interface for why this is a getter
    get _$isConnected() {
        return this._$parent._$isConnected;
    }
    /**
     * Sets the value of this part by resolving the value from possibly multiple
     * values and static strings and committing it to the DOM.
     * If this part is single-valued, `this._strings` will be undefined, and the
     * method will be called with a single value argument. If this part is
     * multi-value, `this._strings` will be defined, and the method is called
     * with the value array of the part's owning TemplateInstance, and an offset
     * into the value array from which the values should be read.
     * This method is overloaded this way to eliminate short-lived array slices
     * of the template instance values, and allow a fast-path for single-valued
     * parts.
     *
     * @param value The part value, or an array of values for multi-valued parts
     * @param valueIndex the index to start reading values from. `undefined` for
     *   single-valued parts
     * @param noCommit causes the part to not commit its value to the DOM. Used
     *   in hydration to prime attribute parts with their first-rendered value,
     *   but not set the attribute, and in SSR to no-op the DOM operation and
     *   capture the value for serialization.
     *
     * @internal
     */
    _$setValue(value, directiveParent = this, valueIndex, noCommit) {
        const strings = this.strings;
        // Whether any of the values has changed, for dirty-checking
        let change = false;
        if (strings === undefined) {
            // Single-value binding case
            value = resolveDirective(this, value, directiveParent, 0);
            change =
                !isPrimitive(value) ||
                    (value !== this._$committedValue && value !== noChange);
            if (change) {
                this._$committedValue = value;
            }
        }
        else {
            // Interpolation case
            const values = value;
            value = strings[0];
            let i, v;
            for (i = 0; i < strings.length - 1; i++) {
                v = resolveDirective(this, values[valueIndex + i], directiveParent, i);
                if (v === noChange) {
                    // If the user-provided value is `noChange`, use the previous value
                    v = this._$committedValue[i];
                }
                change || (change = !isPrimitive(v) || v !== this._$committedValue[i]);
                if (v === nothing) {
                    value = nothing;
                }
                else if (value !== nothing) {
                    value += (v !== null && v !== void 0 ? v : '') + strings[i + 1];
                }
                // We always record each value, even if one is `nothing`, for future
                // change detection.
                this._$committedValue[i] = v;
            }
        }
        if (change && !noCommit) {
            this._commitValue(value);
        }
    }
    /** @internal */
    _commitValue(value) {
        if (value === nothing) {
            wrap(this.element).removeAttribute(this.name);
        }
        else {
            {
                if (this._sanitizer === undefined) {
                    this._sanitizer = sanitizerFactoryInternal(this.element, this.name);
                }
                value = this._sanitizer(value !== null && value !== void 0 ? value : '');
            }
            wrap(this.element).setAttribute(this.name, (value !== null && value !== void 0 ? value : ''));
        }
    }
}
class PropertyPart extends AttributePart {
    constructor() {
        super(...arguments);
        this.type = PROPERTY_PART;
    }
    /** @internal */
    _commitValue(value) {
        {
            if (this._sanitizer === undefined) {
                this._sanitizer = sanitizerFactoryInternal(this.element, this.name);
            }
            value = this._sanitizer(value);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.element[this.name] = value === nothing ? undefined : value;
    }
}
class BooleanAttributePart extends AttributePart {
    constructor() {
        super(...arguments);
        this.type = BOOLEAN_ATTRIBUTE_PART;
    }
    /** @internal */
    _commitValue(value) {
        if (value && value !== nothing) {
            wrap(this.element).setAttribute(this.name, '');
        }
        else {
            wrap(this.element).removeAttribute(this.name);
        }
    }
}
class EventPart extends AttributePart {
    constructor(element, name, strings, parent, options) {
        super(element, name, strings, parent, options);
        this.type = EVENT_PART;
        if (this.strings !== undefined) {
            throw new Error(`A \`<${element.localName}>\` has a \`@${name}=...\` listener with ` +
                'invalid content. Event listeners in templates must have exactly ' +
                'one expression and no surrounding text.');
        }
    }
    // EventPart does not use the base _$setValue/_resolveValue implementation
    // since the dirty checking is more complex
    /** @internal */
    _$setValue(newListener, directiveParent = this) {
        var _a;
        newListener =
            (_a = resolveDirective(this, newListener, directiveParent, 0)) !== null && _a !== void 0 ? _a : nothing;
        if (newListener === noChange) {
            return;
        }
        const oldListener = this._$committedValue;
        // If the new value is nothing or any options change we have to remove the
        // part as a listener.
        const shouldRemoveListener = (newListener === nothing && oldListener !== nothing) ||
            newListener.capture !==
                oldListener.capture ||
            newListener.once !==
                oldListener.once ||
            newListener.passive !==
                oldListener.passive;
        // If the new value is not nothing and we removed the listener, we have
        // to add the part as a listener.
        const shouldAddListener = newListener !== nothing &&
            (oldListener === nothing || shouldRemoveListener);
        if (shouldRemoveListener) {
            this.element.removeEventListener(this.name, this, oldListener);
        }
        if (shouldAddListener) {
            // Beware: IE11 and Chrome 41 don't like using the listener as the
            // options object. Figure out how to deal w/ this in IE11 - maybe
            // patch addEventListener?
            this.element.addEventListener(this.name, this, newListener);
        }
        this._$committedValue = newListener;
    }
    handleEvent(event) {
        var _a, _b;
        if (typeof this._$committedValue === 'function') {
            this._$committedValue.call((_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.host) !== null && _b !== void 0 ? _b : this.element, event);
        }
        else {
            this._$committedValue.handleEvent(event);
        }
    }
}
class ElementPart {
    constructor(element, parent, options) {
        this.element = element;
        this.type = ELEMENT_PART;
        /** @internal */
        this._$disconnectableChildren = undefined;
        this._$parent = parent;
        this.options = options;
    }
    // See comment in Disconnectable interface for why this is a getter
    get _$isConnected() {
        return this._$parent._$isConnected;
    }
    _$setValue(value) {
        resolveDirective(this, value);
    }
}
// Apply polyfills if available
const polyfillSupport = window.litHtmlPolyfillSupportDevMode
    ;
polyfillSupport === null || polyfillSupport === void 0 ? void 0 : polyfillSupport(Template, ChildPart);
// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for lit-html usage.
((_d = globalThis.litHtmlVersions) !== null && _d !== void 0 ? _d : (globalThis.litHtmlVersions = [])).push('2.0.1');
if (globalThis.litHtmlVersions.length > 1) {
    issueWarning('multiple-versions', `Multiple versions of Lit loaded. ` +
        `Loading multiple versions is not recommended.`);
}/**
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
    ELEMENT: 6,
};
/**
 * Creates a user-facing directive function from a Directive class. This
 * function has the same parameters as the directive's render() method.
 */
const directive = (c) => (...values) => ({
    // This property needs to remain unminified.
    ['_$litDirective$']: c,
    values,
});
/**
 * Base class for creating custom directives. Users should extend this class,
 * implement `render` and/or `update`, and then pass their subclass to
 * `directive`.
 */
class Directive {
    constructor(_partInfo) { }
    // See comment in Disconnectable interface for why this is a getter
    get _$isConnected() {
        return this._$parent._$isConnected;
    }
    /** @internal */
    _$initialize(part, parent, attributeIndex) {
        this.__part = part;
        this._$parent = parent;
        this.__attributeIndex = attributeIndex;
    }
    /** @internal */
    _$resolve(part, props) {
        return this.update(part, props);
    }
    update(_part, props) {
        return this.render(...props);
    }
}/**
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
        if (value === nothing || value == null) {
            this._templateResult = undefined;
            return (this._value = value);
        }
        if (value === noChange) {
            return value;
        }
        if (typeof value != 'string') {
            throw new Error(`${this.constructor.directiveName}() called with a non-string value`);
        }
        if (value === this._value) {
            return this._templateResult;
        }
        this._value = value;
        const strings = [value];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        strings.raw = strings;
        // WARNING: impersonating a TemplateResult like this is extremely
        // dangerous. Third-party directives should not do this.
        return (this._templateResult = {
            // Cast to a known set of integers that satisfy ResultType so that we
            // don't have to export ResultType and possibly encourage this pattern.
            // This property needs to remain unminified.
            ['_$litType$']: this.constructor
                .resultType,
            strings,
            values: [],
        });
    }
}
UnsafeHTMLDirective.directiveName = 'unsafeHTML';
UnsafeHTMLDirective.resultType = HTML_RESULT;
/**
 * Renders the result as HTML, rather than text.
 *
 * The values `undefined`, `null`, and `nothing`, will all result in no content
 * (empty string) being rendered.
 *
 * Note, this is unsafe to use with any user-provided input that hasn't been
 * sanitized or escaped, as it may lead to cross-site-scripting
 * vulnerabilities.
 */
const unsafeHTML = directive(UnsafeHTMLDirective);/**
 * @name                SFiltrableInputComponentInterface
 * @namespace           js.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe parameters of the SFiltrableInputComponent
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SFiltrableInputComponentInterface extends __SInterface {
    static get _definition() {
        return {
            items: {
                description: 'Specify an array of items to use in your filtrable list. Can be a JSON string, a function that take an object with the "value" property and must return an array of items to use',
                type: 'String|Function',
            },
            value: {
                description: 'Specify the attribute in your items to use as a value. Can be also a function that will be called with an object containing the selected item and must return the string you want to use as value',
                type: 'String',
                default: 'value',
            },
            label: {
                description: 'Specify the attribute in your items to use as a label. Can be also a function that will be called with an object containing the selected item and must return the string you want to use as label',
                type: 'String|Function',
                default: 'value',
            },
            emptyText: {
                description: 'Specify the text to use for the default "empty" (no result) state',
                type: 'String',
                default: 'No item to display',
            },
            searchValuePreprocess: {
                description: 'Specify a function used to preprocess the value just before actually searching through the items',
                type: 'Function',
            },
            loadingText: {
                description: 'Specify the text to use for the default "loading" state',
                type: 'String',
                default: 'Loading please wait...',
            },
            filterItems: {
                description: 'Specify a function to use to filter the items. Must return the filtered list of items',
                type: 'Function'
            },
            filtrable: {
                description: 'Specify all the properties of your "item" to use as source for the filtrable process',
                type: {
                    type: 'Array<String>',
                    splitChars: [','],
                },
                default: [],
            },
            templates: {
                description: 'Specify either an object with properties like "item", "empty" and "loading", or a function returning the good template depending on tne "type" argument property',
                type: 'Object|Function',
            },
            closeTimeout: {
                description: 'Specify the duration before closing the list when having selected an item',
                type: 'Number',
                default: 100,
            },
            interactive: {
                description: 'Specify if your items in the list are interactive or not to let the user click and interact with them',
                type: 'Boolean',
                default: false,
            },
            notSelectable: {
                description: 'Specify if you want the items to be not selectable',
                type: 'Boolean',
                default: false,
            },
            maxItems: {
                description: 'Specify the maximum number of items to display at first in the list',
                type: 'Number',
                default: 25,
            },
        };
    }
}// @ts-nocheck
/**
 * @name                      plainObject
 * @namespace            js.is
 * @type                      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Check if the passed object (or array of objects) is/are plain object(s)
 *
 * @param         {Object|Array}            object                  The object(s) to check
 * @return        {Boolean}                                         true if is plain object(s), false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example           js
 * import isPlainObject from '@coffeekraken/sugar/js/is/plainObject';
 * isPlainObject({ hello: 'world'}); // => true
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function plainObject(object) {
    if (!object)
        return false;
    if (typeof object !== 'object')
        return false;
    if (object.constructor && object.constructor.name !== 'Object')
        return false;
    if (Object.prototype.toString.call(object) !== '[object Object]')
        return false;
    if (object !== Object(object))
        return false;
    // if (object.constructor !== Object) return false;
    return true;
}// @ts-nocheck
/**
 * @name                deepMerge
 * @namespace            js.object
 * @type                Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Deep merge one object with another and return the merged object result. This merging implementation support:
 * - Merging object with getters/setters
 * - n numbers of objects as arguments
 *
 * @param           {Object}            args...        Pass all the objects you want to merge
 * @param           {Object}            [settings={}]       Pass as last object the settings one that can contain these properties:
 * - object (true) {Boolean}: Specify if you want to merge the objects
 * - array (false) {Boolean}: Specify if you want to merge the arrays
 * @return          {Object}                              The merged object result
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example           js
 * import deepMerge from '@coffeekraken/sugar/node/object/deepMerge';
 * deepMerge({a: {b: {c: 'c', d: 'd'}}}, {a: {b: {e: 'e', f: 'f'}}});
 * // => { a: { b: { c: 'c', d: 'd', e: 'e', f: 'f' } } }
 *
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
// function deepMerge(...args) {
//     const settings = {
//         array: false,
//         object: true,
//     };
//     function merge(firstObj, secondObj) {
//         const newObj = {};
//         if (!firstObj && secondObj) return secondObj;
//         if (!secondObj && firstObj) return firstObj;
//         if (!firstObj && !secondObj) return {};
//         __copyTo(firstObj).withAccess().toCover(newObj);
//         for (const key of Object.keys(secondObj)) {
//             // merging arrays
//             // if (settings.array === true && Array.isArray(firstObj[key]) && Array.isArray(secondObj[key])) {
//             //     const newArray = __unique([...firstObj[key], ...secondObj[key]]);
//             //     newObj[key] = newArray;
//             //     continue;
//             // }
//             // merging objects
//             if (settings.object === true && __isPlainObject(firstObj[key]) && __isPlainObject(secondObj[key])) {
//                 const descriptor = Object.getOwnPropertyDescriptor(secondObj, key);
//                 if (descriptor.get || descriptor.set) {
//                 } else {
//                     newObj[key] = merge(firstObj[key], secondObj[key]);
//                     continue;
//                 }
//             }
//             __copyTo(secondObj).withAccess().pick(key).toCover(newObj);
//         }
//         return newObj;
//     }
//     const potentialSettingsObj = args[args.length - 1] || {};
//     if (
//         (potentialSettingsObj.array && typeof potentialSettingsObj.array === 'boolean') ||
//         (potentialSettingsObj.object && typeof potentialSettingsObj.object === 'boolean')
//     ) {
//         if (potentialSettingsObj.array !== undefined) settings.array = potentialSettingsObj.array;
//         if (potentialSettingsObj.object !== undefined) settings.object = potentialSettingsObj.object;
//         args.pop();
//     }
//     let currentObj = {};
//     for (let i = 0; i < args.length; i++) {
//         const toMergeObj = args[i];
//         currentObj = merge(currentObj, toMergeObj);
//     }
//     return currentObj;
// }
function __deepMerge (...args) {
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
            }
            else {
                newObj[key] = firstObj[key];
            }
        });
        const secondProps = Object.getOwnPropertyNames(secondObj);
        secondProps.forEach((key) => {
            const desc = Object.getOwnPropertyDescriptor(secondObj, key);
            if (desc.set || desc.get) {
                Object.defineProperty(newObj, key, desc);
            }
            else if (plainObject(newObj[key]) &&
                plainObject(secondObj[key])) {
                newObj[key] = merge(newObj[key], secondObj[key]);
            }
            else {
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
// export default deepMerge;
/**
 * @name      cursorToEnd
 * @namespace            js.dom.input
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Place the cursor to the end of the input
 *
 * @param 		{HTMLFormElement} 		$input 		The input to process
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import cursorToEnd from '@coffeekraken/sugar/js/dom/input/cursorToEnd';
 * cursorToEnd($input);
 *
 * @see             https://stackoverflow.com/a/56416714
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierboss$input.com)
 */
function cursorToEnd($input) {
    $input.focus();
    if (typeof $input.selectionStart == "number") {
        $input.selectionStart = $input.selectionEnd = $input.value.length;
    }
    else if (typeof $input.createTextRange != "undefined") {
        var range = $input.createTextRange();
        range.collapse(false);
        range.select();
    }
}// @ts-nocheck
/**
 * @name                clone
 * @namespace            js.object
 * @type                Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * This function allows you to clone an object either at 1 level, or deeply.
 *
 * @param       {Object}        object        The object to copy
 * @param       {Object}       [settings={}]   Specify some settings to configure your clone process
 * @return      {Object}                      The cloned object
 *
 * @setting     {Boolean}       [deep=false]      Specify if you want to clone the object deeply
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import clone from '@coffeekraken/sugar/js/object/clone';
 * clone({
 *    hello: 'world'
 * });
 *
 * @see       https://www.npmjs.com/package/lodash
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function clone(object, settings = {}) {
    settings = Object.assign({ deep: false }, settings);
    if (settings.deep) {
        return __deepClone(object);
    }
    return __clone(object);
}// @ts-nocheck
/**
 * @name      scrollTop
 * @namespace            js.dom.scroll
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Return the amount of scroll top that the user as made in the page
 *
 * @return      {Number}            The amount of scroll top that the user as made in the page
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example     js
 * import scrollTop from '@coffeekraken/sugar/js/dom/scrollTop';
 * scrollTop();
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com) (https://olivierbossel.com)
 */
function scrollTop() {
    return window.pageYOffset || document.scrollTop || document.body.scrollTop;
}// @ts-nocheck
/**
 * @name      offset
 * @namespace            js.dom.offset
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Get the offset top and left of the passed element from the document top left point
 *
 * @param 		{HTMLElement} 					elm  		The element to get the offset from
 * @return 		{top: number; left: number;} 									The offset top and left object
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import offset from '@coffeekraken/sugar/js/dom/offset'
 * const offsetElm = offset(myCoolElement);
 * // output : { top : 200, left : 300 }
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function offset(elm) {
    const box = elm.getBoundingClientRect(), body = document.body, docEl = document.documentElement, scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop, scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft, clientTop = docEl.clientTop || body.clientTop || 0, clientLeft = docEl.clientLeft || body.clientLeft || 0, top = box.top + scrollTop - clientTop, left = box.left + scrollLeft - clientLeft;
    return {
        top: Math.round(top),
        left: Math.round(left),
    };
}/**
 * @name            fromElementTopToViewportBottom
 * @namespace       js.dom.distance
 * @type            Function
 * @platform          js
 * @status          beta
 *
 * This function take an element as parameter and returns you to distance it has
 * from the element top to the viewport bottom in pixels
 *
 * @param       {HTMLElement}       elm             The element you want to get the distance from
 * @return      {Number}                            The calculated distance
 *
 * @example         js
 * import distanceFromElementTopToViewportBottom from '@coffeekraken/sugar/js/dom/distance/fromElementTopToViewportBottom';
 * distanceFromElementTopViewportBottom(myElement); // => 23
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function fromElementTopToViewportBottom(elm) {
    const offsets = offset(elm);
    const scrollTop$1 = scrollTop();
    // @ts-ignore
    const viewportHeight = window.innerHeight;
    const distance = viewportHeight - offsets.top + scrollTop$1;
    return distance;
}// @ts-nocheck
/**
 * @name        camelize
 * @namespace            js.string
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Camelize a string
 *
 * @param         {String}          text        The string to camelize
 * @return        {String}                      The camelized string
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example     js
 * import camelize from '@coffeekraken/sugar/js/string/camelize';
 * camelize('hello world'); // => helloWorld
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function camelize(text) {
    if (!text)
        text = '';
    let res = '';
    const reg = /(?:^|[_-\s])(\w)/g;
    res = text.replace(reg, function (_, c) {
        return c ? c.toUpperCase() : '';
    });
    res = res.substr(0, 1).toLowerCase() + res.slice(1);
    return res.trim();
}// @ts-nocheck
/**
 * @name        autoCast
 * @namespace            js.string
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Auto cast the string into the correct variable type
 *
 * @param    {String}    string    The string to auto cast
 * @return    {Mixed}    The casted value
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import autoCast from '@coffeekraken/sugar/js/string/autoCast'
 * autoCast('12') // => 12
 * autoCast('window.HTMLElement') // => HTMLElement
 * autoCast('{"hello":"world"}') // {hello:'world'}
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function autoCast(string) {
    // if the passed string is not a string, return the value
    if (typeof string !== 'string')
        return string;
    // handle the single quotes strings like '"hello world"'
    if (string.substr(0, 1) === "'" && string.substr(-1) === "'") {
        return string.substr(1, string.length - 2);
    }
    // number
    // before the window check cause window['0'] correspond to something
    const presumedNumber = parseFloat(string);
    if (!isNaN(presumedNumber)) {
        if (presumedNumber.toString() === string) {
            return presumedNumber;
        }
    }
    // avoid getting item from the window object
    if (window[string]) {
        return string;
    }
    // try to eval the passed string
    // if no exception, mean that it's a valid
    // js variable type
    try {
        const obj = eval(`(${string})`);
        return obj;
    }
    catch (e) {
        // assume that the string passed is a string
        return string;
    }
}// @ts-nocheck
/**
 * @name      getStyleProperty
 * @namespace            js.dom.style
 * @type      Function
 * @platform          js
 * @status      beta
 *
 * Get a style property on the passed element through the computed style.
 * This function try to store the actual style to not trigger more that 1 redraw
 * each js execution loop.
 *
 * @param 		{HTMLElement} 					elm  		The element to get style from
 * @param 		{String} 						property 	The css property to get
 * @return 		{Mixed} 									The style value
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import getStyleProperty from '@coffeekraken/sugar/js/dom/getStyleProperty'
 * const opacity = getStyleProperty(myCoolHTMLElement, 'opacity');
 *
 * @see 		https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function getStyleProperty(elm, property) {
    // caching mecanisme
    setTimeout(() => {
        elm._sComputedStyle = null;
    });
    const computed = elm._sComputedStyle || window.getComputedStyle(elm);
    elm._sComputedStyle = computed;
    const prefixes = ['', 'webkit-', 'moz-', 'ms-', 'o-', 'khtml-'];
    for (let i = 0; i < prefixes.length; i++) {
        const prefix = prefixes[i];
        const value = computed[camelize(`${prefix}${property}`)];
        if (value && value.trim() !== '')
            return autoCast(value);
    }
    return null;
}/**
 * @name            fromElementTopToViewportTop
 * @namespace       js.dom.distance
 * @type            Function
 * @platform          js
 * @status          betas
 *
 * This function take an element as parameter and returns you to distance it has
 * from the element top to the viewport top in pixels
 *
 * @param       {HTMLElement}       elm             The element you want to get the distance from
 * @return      {Number}                            The calculated distance
 *
 * @example         js
 * import distanceFromElementTopToViewportTop from '@coffeekraken/sugar/js/dom/distance/fromElementTopToViewportTop';
 * distanceFromElementTopViewportBottom(myElement); // => 23
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function fromElementTopToViewportTop(elm) {
    const offsets = offset(elm);
    const scrollTop$1 = scrollTop();
    // @ts-ignore
    return offsets.top - scrollTop$1;
}/*!
 * hotkeys-js v3.8.7
 * A simple micro-library for defining and dispatching keyboard shortcuts. It has no dependencies.
 * 
 * Copyright (c) 2021 kenny wong <wowohoo@qq.com>
 * http://jaywcjlove.github.io/hotkeys
 * 
 * Licensed under the MIT license.
 */

var isff = typeof navigator !== 'undefined' ? navigator.userAgent.toLowerCase().indexOf('firefox') > 0 : false; // 绑定事件

function addEvent(object, event, method) {
  if (object.addEventListener) {
    object.addEventListener(event, method, false);
  } else if (object.attachEvent) {
    object.attachEvent("on".concat(event), function () {
      method(window.event);
    });
  }
} // 修饰键转换成对应的键码


function getMods(modifier, key) {
  var mods = key.slice(0, key.length - 1);

  for (var i = 0; i < mods.length; i++) {
    mods[i] = modifier[mods[i].toLowerCase()];
  }

  return mods;
} // 处理传的key字符串转换成数组


function getKeys(key) {
  if (typeof key !== 'string') key = '';
  key = key.replace(/\s/g, ''); // 匹配任何空白字符,包括空格、制表符、换页符等等

  var keys = key.split(','); // 同时设置多个快捷键，以','分割

  var index = keys.lastIndexOf(''); // 快捷键可能包含','，需特殊处理

  for (; index >= 0;) {
    keys[index - 1] += ',';
    keys.splice(index, 1);
    index = keys.lastIndexOf('');
  }

  return keys;
} // 比较修饰键的数组


function compareArray(a1, a2) {
  var arr1 = a1.length >= a2.length ? a1 : a2;
  var arr2 = a1.length >= a2.length ? a2 : a1;
  var isIndex = true;

  for (var i = 0; i < arr1.length; i++) {
    if (arr2.indexOf(arr1[i]) === -1) isIndex = false;
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
  '⇪': 20,
  ',': 188,
  '.': 190,
  '/': 191,
  '`': 192,
  '-': isff ? 173 : 189,
  '=': isff ? 61 : 187,
  ';': isff ? 59 : 186,
  '\'': 222,
  '[': 219,
  ']': 221,
  '\\': 220
}; // Modifier Keys

var _modifier = {
  // shiftKey
  '⇧': 16,
  shift: 16,
  // altKey
  '⌥': 18,
  alt: 18,
  option: 18,
  // ctrlKey
  '⌃': 17,
  ctrl: 17,
  control: 17,
  // metaKey
  '⌘': 91,
  cmd: 91,
  command: 91
};
var modifierMap = {
  16: 'shiftKey',
  18: 'altKey',
  17: 'ctrlKey',
  91: 'metaKey',
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
var _handlers = {}; // F1~F12 special key

for (var k = 1; k < 20; k++) {
  _keyMap["f".concat(k)] = 111 + k;
}

var _downKeys = []; // 记录摁下的绑定键

var _scope = 'all'; // 默认热键范围

var elementHasBindEvent = []; // 已绑定事件的节点记录
// 返回键码

var code = function code(x) {
  return _keyMap[x.toLowerCase()] || _modifier[x.toLowerCase()] || x.toUpperCase().charCodeAt(0);
}; // 设置获取当前范围（默认为'所有'）


function setScope(scope) {
  _scope = scope || 'all';
} // 获取当前范围


function getScope() {
  return _scope || 'all';
} // 获取摁下绑定键的键值


function getPressedKeyCodes() {
  return _downKeys.slice(0);
} // 表单控件控件判断 返回 Boolean
// hotkey is effective only when filter return true


function filter(event) {
  var target = event.target || event.srcElement;
  var tagName = target.tagName;
  var flag = true; // ignore: isContentEditable === 'true', <input> and <textarea> when readOnly state is false, <select>

  if (target.isContentEditable || (tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT') && !target.readOnly) {
    flag = false;
  }

  return flag;
} // 判断摁下的键是否为某个键，返回true或者false


function isPressed(keyCode) {
  if (typeof keyCode === 'string') {
    keyCode = code(keyCode); // 转换成键码
  }

  return _downKeys.indexOf(keyCode) !== -1;
} // 循环删除handlers中的所有 scope(范围)


function deleteScope(scope, newScope) {
  var handlers;
  var i; // 没有指定scope，获取scope

  if (!scope) scope = getScope();

  for (var key in _handlers) {
    if (Object.prototype.hasOwnProperty.call(_handlers, key)) {
      handlers = _handlers[key];

      for (i = 0; i < handlers.length;) {
        if (handlers[i].scope === scope) handlers.splice(i, 1);else i++;
      }
    }
  } // 如果scope被删除，将scope重置为all


  if (getScope() === scope) setScope(newScope || 'all');
} // 清除修饰键


function clearModifier(event) {
  var key = event.keyCode || event.which || event.charCode;

  var i = _downKeys.indexOf(key); // 从列表中清除按压过的键


  if (i >= 0) {
    _downKeys.splice(i, 1);
  } // 特殊处理 cmmand 键，在 cmmand 组合快捷键 keyup 只执行一次的问题


  if (event.key && event.key.toLowerCase() === 'meta') {
    _downKeys.splice(0, _downKeys.length);
  } // 修饰键 shiftKey altKey ctrlKey (command||metaKey) 清除


  if (key === 93 || key === 224) key = 91;

  if (key in _mods) {
    _mods[key] = false; // 将修饰键重置为false

    for (var k in _modifier) {
      if (_modifier[k] === key) hotkeys[k] = false;
    }
  }
}

function unbind(keysInfo) {
  // unbind(), unbind all keys
  if (!keysInfo) {
    Object.keys(_handlers).forEach(function (key) {
      return delete _handlers[key];
    });
  } else if (Array.isArray(keysInfo)) {
    // support like : unbind([{key: 'ctrl+a', scope: 's1'}, {key: 'ctrl-a', scope: 's2', splitKey: '-'}])
    keysInfo.forEach(function (info) {
      if (info.key) eachUnbind(info);
    });
  } else if (typeof keysInfo === 'object') {
    // support like unbind({key: 'ctrl+a, ctrl+b', scope:'abc'})
    if (keysInfo.key) eachUnbind(keysInfo);
  } else if (typeof keysInfo === 'string') {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    // support old method
    // eslint-disable-line
    var scope = args[0],
        method = args[1];

    if (typeof scope === 'function') {
      method = scope;
      scope = '';
    }

    eachUnbind({
      key: keysInfo,
      scope: scope,
      method: method,
      splitKey: '+'
    });
  }
} // 解除绑定某个范围的快捷键


var eachUnbind = function eachUnbind(_ref) {
  var key = _ref.key,
      scope = _ref.scope,
      method = _ref.method,
      _ref$splitKey = _ref.splitKey,
      splitKey = _ref$splitKey === void 0 ? '+' : _ref$splitKey;
  var multipleKeys = getKeys(key);
  multipleKeys.forEach(function (originKey) {
    var unbindKeys = originKey.split(splitKey);
    var len = unbindKeys.length;
    var lastKey = unbindKeys[len - 1];
    var keyCode = lastKey === '*' ? '*' : code(lastKey);
    if (!_handlers[keyCode]) return; // 判断是否传入范围，没有就获取范围

    if (!scope) scope = getScope();
    var mods = len > 1 ? getMods(_modifier, unbindKeys) : [];
    _handlers[keyCode] = _handlers[keyCode].map(function (record) {
      // 通过函数判断，是否解除绑定，函数相等直接返回
      var isMatchingMethod = method ? record.method === method : true;

      if (isMatchingMethod && record.scope === scope && compareArray(record.mods, mods)) {
        return {};
      }

      return record;
    });
  });
}; // 对监听对应快捷键的回调函数进行处理


function eventHandler(event, handler, scope) {
  var modifiersMatch; // 看它是否在当前范围

  if (handler.scope === scope || handler.scope === 'all') {
    // 检查是否匹配修饰符（如果有返回true）
    modifiersMatch = handler.mods.length > 0;

    for (var y in _mods) {
      if (Object.prototype.hasOwnProperty.call(_mods, y)) {
        if (!_mods[y] && handler.mods.indexOf(+y) > -1 || _mods[y] && handler.mods.indexOf(+y) === -1) {
          modifiersMatch = false;
        }
      }
    } // 调用处理程序，如果是修饰键不做处理


    if (handler.mods.length === 0 && !_mods[16] && !_mods[18] && !_mods[17] && !_mods[91] || modifiersMatch || handler.shortcut === '*') {
      if (handler.method(event, handler) === false) {
        if (event.preventDefault) event.preventDefault();else event.returnValue = false;
        if (event.stopPropagation) event.stopPropagation();
        if (event.cancelBubble) event.cancelBubble = true;
      }
    }
  }
} // 处理keydown事件


function dispatch(event) {
  var asterisk = _handlers['*'];
  var key = event.keyCode || event.which || event.charCode; // 表单控件过滤 默认表单控件不触发快捷键

  if (!hotkeys.filter.call(this, event)) return; // Gecko(Firefox)的command键值224，在Webkit(Chrome)中保持一致
  // Webkit左右 command 键值不一样

  if (key === 93 || key === 224) key = 91;
  /**
   * Collect bound keys
   * If an Input Method Editor is processing key input and the event is keydown, return 229.
   * https://stackoverflow.com/questions/25043934/is-it-ok-to-ignore-keydown-events-with-keycode-229
   * http://lists.w3.org/Archives/Public/www-dom/2010JulSep/att-0182/keyCode-spec.html
   */

  if (_downKeys.indexOf(key) === -1 && key !== 229) _downKeys.push(key);
  /**
   * Jest test cases are required.
   * ===============================
   */

  ['ctrlKey', 'altKey', 'shiftKey', 'metaKey'].forEach(function (keyName) {
    var keyNum = modifierMap[keyName];

    if (event[keyName] && _downKeys.indexOf(keyNum) === -1) {
      _downKeys.push(keyNum);
    } else if (!event[keyName] && _downKeys.indexOf(keyNum) > -1) {
      _downKeys.splice(_downKeys.indexOf(keyNum), 1);
    } else if (keyName === 'metaKey' && event[keyName] && _downKeys.length === 3) {
      /**
       * Fix if Command is pressed:
       * ===============================
       */
      if (!(event.ctrlKey || event.shiftKey || event.altKey)) {
        _downKeys = _downKeys.slice(_downKeys.indexOf(keyNum));
      }
    }
  });
  /**
   * -------------------------------
   */

  if (key in _mods) {
    _mods[key] = true; // 将特殊字符的key注册到 hotkeys 上

    for (var k in _modifier) {
      if (_modifier[k] === key) hotkeys[k] = true;
    }

    if (!asterisk) return;
  } // 将 modifierMap 里面的修饰键绑定到 event 中


  for (var e in _mods) {
    if (Object.prototype.hasOwnProperty.call(_mods, e)) {
      _mods[e] = event[modifierMap[e]];
    }
  }
  /**
   * https://github.com/jaywcjlove/hotkeys/pull/129
   * This solves the issue in Firefox on Windows where hotkeys corresponding to special characters would not trigger.
   * An example of this is ctrl+alt+m on a Swedish keyboard which is used to type μ.
   * Browser support: https://caniuse.com/#feat=keyboardevent-getmodifierstate
   */


  if (event.getModifierState && !(event.altKey && !event.ctrlKey) && event.getModifierState('AltGraph')) {
    if (_downKeys.indexOf(17) === -1) {
      _downKeys.push(17);
    }

    if (_downKeys.indexOf(18) === -1) {
      _downKeys.push(18);
    }

    _mods[17] = true;
    _mods[18] = true;
  } // 获取范围 默认为 `all`


  var scope = getScope(); // 对任何快捷键都需要做的处理

  if (asterisk) {
    for (var i = 0; i < asterisk.length; i++) {
      if (asterisk[i].scope === scope && (event.type === 'keydown' && asterisk[i].keydown || event.type === 'keyup' && asterisk[i].keyup)) {
        eventHandler(event, asterisk[i], scope);
      }
    }
  } // key 不在 _handlers 中返回


  if (!(key in _handlers)) return;

  for (var _i = 0; _i < _handlers[key].length; _i++) {
    if (event.type === 'keydown' && _handlers[key][_i].keydown || event.type === 'keyup' && _handlers[key][_i].keyup) {
      if (_handlers[key][_i].key) {
        var record = _handlers[key][_i];
        var splitKey = record.splitKey;
        var keyShortcut = record.key.split(splitKey);
        var _downKeysCurrent = []; // 记录当前按键键值

        for (var a = 0; a < keyShortcut.length; a++) {
          _downKeysCurrent.push(code(keyShortcut[a]));
        }

        if (_downKeysCurrent.sort().join('') === _downKeys.sort().join('')) {
          // 找到处理内容
          eventHandler(event, record, scope);
        }
      }
    }
  }
} // 判断 element 是否已经绑定事件


function isElementBind(element) {
  return elementHasBindEvent.indexOf(element) > -1;
}

function hotkeys(key, option, method) {
  _downKeys = [];
  var keys = getKeys(key); // 需要处理的快捷键列表

  var mods = [];
  var scope = 'all'; // scope默认为all，所有范围都有效

  var element = document; // 快捷键事件绑定节点

  var i = 0;
  var keyup = false;
  var keydown = true;
  var splitKey = '+'; // 对为设定范围的判断

  if (method === undefined && typeof option === 'function') {
    method = option;
  }

  if (Object.prototype.toString.call(option) === '[object Object]') {
    if (option.scope) scope = option.scope; // eslint-disable-line

    if (option.element) element = option.element; // eslint-disable-line

    if (option.keyup) keyup = option.keyup; // eslint-disable-line

    if (option.keydown !== undefined) keydown = option.keydown; // eslint-disable-line

    if (typeof option.splitKey === 'string') splitKey = option.splitKey; // eslint-disable-line
  }

  if (typeof option === 'string') scope = option; // 对于每个快捷键进行处理

  for (; i < keys.length; i++) {
    key = keys[i].split(splitKey); // 按键列表

    mods = []; // 如果是组合快捷键取得组合快捷键

    if (key.length > 1) mods = getMods(_modifier, key); // 将非修饰键转化为键码

    key = key[key.length - 1];
    key = key === '*' ? '*' : code(key); // *表示匹配所有快捷键
    // 判断key是否在_handlers中，不在就赋一个空数组

    if (!(key in _handlers)) _handlers[key] = [];

    _handlers[key].push({
      keyup: keyup,
      keydown: keydown,
      scope: scope,
      mods: mods,
      shortcut: keys[i],
      method: method,
      key: keys[i],
      splitKey: splitKey
    });
  } // 在全局document上设置快捷键


  if (typeof element !== 'undefined' && !isElementBind(element) && window) {
    elementHasBindEvent.push(element);
    addEvent(element, 'keydown', function (e) {
      dispatch(e);
    });
    addEvent(window, 'focus', function () {
      _downKeys = [];
    });
    addEvent(element, 'keyup', function (e) {
      dispatch(e);
      clearModifier(e);
    });
  }
}

var _api = {
  setScope: setScope,
  getScope: getScope,
  deleteScope: deleteScope,
  getPressedKeyCodes: getPressedKeyCodes,
  isPressed: isPressed,
  filter: filter,
  unbind: unbind
};

for (var a in _api) {
  if (Object.prototype.hasOwnProperty.call(_api, a)) {
    hotkeys[a] = _api[a];
  }
}

if (typeof window !== 'undefined') {
  var _hotkeys = window.hotkeys;

  hotkeys.noConflict = function (deep) {
    if (deep && window.hotkeys === hotkeys) {
      window.hotkeys = _hotkeys;
    }

    return hotkeys;
  };

  window.hotkeys = hotkeys;
}

var hotkeys_common = hotkeys;// @ts-nocheck
hotkeys_common.filter = function () {
    return true;
};
function hotkey(hotkey, settings = {}) {
    return new __SPromise(({ resolve, reject, emit, cancel }) => {
        // merge default settings with passed ones:
        settings = Object.assign({ element: null, keyup: false, keydown: true, once: false, splitKey: '+' }, settings);
        // init the hotkey
        hotkeys_common(hotkey, settings, (e, h) => {
            // call the handler function
            emit('press', e);
            // unsubscribe if once is truc
            if (settings.once)
                cancel();
        });
    }, {
        id: 'hotkey',
    }).on('finally', () => {
        hotkeys_common.unbind(hotkey);
    });
}// @ts-nocheck
/**
 * @name      stripTags
 * @namespace            js.dom.manipulate
 * @type      Function
 * @platform          js
 * @status      beta
 *
 * Strip the tags of the passed text
 *
 * @param    {String}    html    the html to process
 * @return    {String}    The html without any tags
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import stripTags from '@coffeekraken/sugar/js/dom/stripTags'
 * stripTags('<h1>Hello World</h1>') // => Hello World
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function stripTags(html) {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
}// @ts-nocheck
function onScrollEnd($elm, callback, settings) {
    const finalSettings = Object.assign({ offset: 20, once: false, times: -1 }, (settings !== null && settings !== void 0 ? settings : {}));
    let isBody = false;
    let $scrollListenedElm = $elm;
    let $scrollHeightElm = $elm;
    if ($elm === window.document.body) {
        isBody = true;
        $scrollListenedElm = document;
        $scrollHeightElm = window.document.body;
    }
    else if ($elm === window.document) {
        isBody = true;
        $elm = window.document.body;
        $scrollHeightElm = window.document.body;
    }
    let active = true, count = 0;
    const internalCallback = (e) => {
        let fullHeight, viewportHeight, scrollTop;
        if (isBody) {
            viewportHeight = window.innerHeight;
            scrollTop = $scrollHeightElm.scrollTop;
            fullHeight = Math.max(window.document.body.scrollHeight, window.document.documentElement.scrollHeight, window.document.body.offsetHeight, window.document.documentElement.offsetHeight, window.document.body.clientHeight, window.document.documentElement.clientHeight);
        }
        else {
            viewportHeight = $scrollHeightElm.offsetHeight;
            scrollTop = $scrollHeightElm.scrollTop;
            fullHeight = $scrollHeightElm.scrollHeight;
        }
        if (active &&
            scrollTop + viewportHeight >= fullHeight - finalSettings.offset) {
            callback();
            count++;
            if (finalSettings.once) {
                $scrollListenedElm.removeEventListener('scroll', internalCallback);
                active = false;
            }
            else if (finalSettings.times > 0 &&
                count >= finalSettings.times) {
                $scrollListenedElm.removeEventListener('scroll', internalCallback);
                active = false;
            }
        }
        else if ($scrollHeightElm.offsetHeight + $scrollHeightElm.scrollTop <
            $scrollHeightElm.scrollHeight - finalSettings.offset) {
            active = true;
        }
    };
    $scrollListenedElm.addEventListener('scroll', internalCallback);
}var __css = ".s-filtrable-input {\n    font-size: calc(1rem * var(--s-scale, 1));\n    display: inline-block;\n    position: relative;\n}\n\n    .s-filtrable-input .s-filtrable-input__input {\n    }\n\n    .s-filtrable-input .s-filtrable-input__before,\n    .s-filtrable-input .s-filtrable-input__after {\n        flex-grow: 0;\n        width: 100%;\n    }\n\n    .s-filtrable-input .s-filtrable-input__dropdown {\n        position: absolute;\n        top: 100%;\n        left: 0;\n        opacity: 0;\n        max-width: calc(100vw - 100px);\n        pointer-events: none;\n        margin: 20px 0;\n        display: flex;\n        flex-direction: column;\n    }\n\n    .s-filtrable-input:focus-within .s-filtrable-input__dropdown {\n        pointer-events: all;\n        opacity: 1;\n    }\n\n    .s-filtrable-input.s-filtrable-input--top .s-filtrable-input__dropdown {\n            top: auto;\n            bottom: 100%;\n        }\n\n    .s-filtrable-input .s-filtrable-input__input:focus + .s-filtrable-input__dropdown,\n    .s-filtrable-input .s-filtrable-input__dropdown:focus,\n    .s-filtrable-input .s-filtrable-input__dropdown:focus-within {\n        opacity: 1;\n        pointer-events: all !important;\n    }\n\n    .s-filtrable-input .s-filtrable-input__list {\n        overflow-x: hidden;\n        overflow-y: auto;\n    }\n\n    .s-filtrable-input .s-filtrable-input__list-item {\n        position: relative;\n        -webkit-user-select: none;\n           -moz-user-select: none;\n            -ms-user-select: none;\n                user-select: none;\n    }\n\n    .s-filtrable-input:not([interactive]) .s-filtrable-input__list-item {\n        cursor: pointer;\n    }\n\n    .s-filtrable-input:not([interactive]) .s-filtrable-input__list-item * {\n            pointer-events: none;\n        }\n";var __awaiter = (globalThis && globalThis.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class SFiltrableInput extends __SLitComponent {
    constructor() {
        super(__deepMerge({
            litComponent: {
                shadowDom: false,
            },
            componentUtils: {
                interface: SFiltrableInputComponentInterface,
            },
        }));
        this._templatesFromHtml = {};
        this.state = {
            baseTemplates: {},
            preselectedItem: {},
            preselectedItemIdx: -1,
            selectedItemIdx: -1,
            selectedItem: {},
            displayedMaxItems: 0,
            value: '',
            isActive: false,
            isLoading: false,
            items: [],
            filteredItems: [],
        };
        this.state.displayedMaxItems = this.props.maxItems;
        if (this.props.items && typeof this.props.items === 'string') {
            const $itemsElm = document.querySelector(this.props.items);
            if ($itemsElm) {
                this.state.items = JSON.parse($itemsElm.innerHTML);
                this.requestUpdate();
            }
        }
        // @ts-ignore
        this.state.baseTemplates = ({ type, item, html }) => {
            switch (type) {
                case 'item':
                    return html `
                        <div class="${this.componentUtils.className('__item')}">
                            ${unsafeHTML(typeof this.props.label === 'function'
                        ? this.props.label({ item })
                        : item[this.props.label])}
                        </div>
                    `;
                case 'empty':
                    return html `
                        <div
                            class="${this.componentUtils.className('__empty')}"
                        >
                            ${this.props.emptyText}
                        </div>
                    `;
                case 'loading':
                    return html `
                        <div
                            class="${this.componentUtils.className('__loading')}"
                        >
                            ${this.props.loadingText}
                        </div>
                    `;
            }
        };
    }
    static get styles() {
        return css `
            ${unsafeCSS(__css)}
        `;
    }
    firstUpdated() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            // input
            this.$input = this.querySelector('input');
            this.$input.setAttribute('autocomplete', 'off');
            // @ts-ignore
            this.$form = this.$input.form;
            // prevent from sending form if search is opened
            this.$form.addEventListener('submit', e => {
                if (this.state.isActive) {
                    e.preventDefault();
                }
            });
            // grab templates
            this._grabTemplates();
            if (!this.props.bare) {
                // @ts-ignore
                (_a = this.$input.classList) === null || _a === void 0 ? void 0 : _a.add('s-input');
            }
            // @ts-ignore
            this.$input.addEventListener('keyup', (e) => {
                this.state.isActive = true;
                // @ts-ignore
                const value = e.target.value;
                this.state.value = value;
                this.state.displayedMaxItems = this.props.maxItems;
                this.filterItems();
            });
            this.$input.addEventListener('focus', (e) => {
                this.state.isActive = true;
                this.filterItems();
                this._updateListSizeAndPosition();
            });
            // @ts-ignore
            this.$input.classList.add(this.componentUtils.className('__input'));
            this.$container = this;
            this.$container.classList.add('s-filtrable-input');
            this.$container.classList.add(this.componentUtils.className());
            // @ts-ignore
            this.$list = this.querySelector('ul');
            // @ts-ignore
            this.$dropdown = this.querySelector(`.s-filtrable-input__dropdown`);
            this.prepend(this.$input);
            this.filterItems();
            document.addEventListener('scroll', () => {
                this._updateListSizeAndPosition();
            });
            this._updateListSizeAndPosition();
            onScrollEnd(this.$list, () => {
                var _a;
                this.state.displayedMaxItems =
                    ((_a = this.state.displayedMaxItems) !== null && _a !== void 0 ? _a : 0) + this.props.maxItems;
                this.filterItems(false);
            });
            hotkey('escape').on('press', (e) => {
                e.preventDefault();
                if (!this.state.isActive)
                    return;
                this.close();
            });
            hotkey('up').on('press', (e) => {
                e.preventDefault();
                if (!this.state.isActive)
                    return;
                this.state.preselectedItemIdx =
                    this.state.preselectedItemIdx > 0
                        ? this.state.preselectedItemIdx - 1
                        : 0;
                this.requestUpdate();
                const $item = this.$list.children[this.state.preselectedItemIdx];
                // @ts-ignore
                $item.focus();
            });
            hotkey('down').on('press', (e) => {
                e.preventDefault();
                if (!this.state.isActive)
                    return;
                this.state.preselectedItemIdx =
                    this.state.preselectedItemIdx >=
                        this.state.filteredItems.length - 1
                        ? this.state.filteredItems.length - 1
                        : this.state.preselectedItemIdx + 1;
                this.requestUpdate();
                const $item = this.$list.children[this.state.preselectedItemIdx];
                // @ts-ignore
                $item.focus();
            });
            hotkey('return').on('press', (e) => {
                // protect agains actions when not focus
                if (!this.state.isActive)
                    return;
                this.validateAndClose();
            });
            // open if a value exists
            if (this.$input.value) {
                this.state.value = this.$input.value;
                cursorToEnd(this.$input);
                this.filterItems(true);
            }
        });
    }
    _grabTemplates() {
        this.querySelectorAll('template').forEach($template => {
            if (!$template.hasAttribute('type'))
                return;
            // @ts-ignore
            this._templatesFromHtml[$template.getAttribute('type')] = $template.innerHTML;
        });
    }
    _getTemplate(type) {
        if (this.props.templates) {
            const res = this.props.templates({
                type,
                html
            });
            if (res)
                return res;
        }
        // from template tags
        if (this._templatesFromHtml[type]) {
            return html `
                ${unsafeHTML(this._templatesFromHtml[type])}
            `;
        }
        // @ts-ignore
        return this.state.baseTemplates({
            type,
            html
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
        var _a, _b;
        // protect against not selected item
        if (this.state.preselectedItemIdx === -1)
            return;
        // set the value in the input
        if (this.preselectedItem) {
            const itemProps = __deepMerge(Object.assign({}, this.props), (_a = this.state.preselectedItem.props) !== null && _a !== void 0 ? _a : {});
            if (typeof itemProps.value === 'string' &&
                ((_b = this.preselectedItem) === null || _b === void 0 ? void 0 : _b[itemProps.value])) {
                this.$input.value = stripTags(
                // @ts-ignore
                this.preselectedItem[itemProps.value]);
            }
            else if (typeof itemProps.value === 'function') {
                // @ts-ignore
                const v = itemProps.value({
                    item: this.state.filteredItems[this.state.preselectedItemIdx],
                });
                if (typeof v !== 'string') {
                    throw new Error(`<red>[s-filtrable-input]</red> Sorry but the returned value "<yellow>${v}</yellow>" has to be a string...`);
                }
                this.$input.value = stripTags(v);
            }
        }
        this.state.selectedItemIdx = this.state.preselectedItemIdx;
        // @ts-ignore
        this.state.value = this.$input.value;
        this.requestUpdate();
        // dispatch an event
        const event = new CustomEvent('selectItem', {
            bubbles: true,
            detail: this.selectedItem,
        });
        // @ts-ignore
        this.dispatchEvent(event);
    }
    validateAndClose() {
        this.validate();
        setTimeout(() => {
            this.close();
        }, this.props.closeTimeout);
    }
    resetSelected() {
        this.state.preselectedItemIdx = -1;
        this.state.preselectedItem = {};
        this.state.selectedItemIdx = -1;
        this.state.selectedItem = {};
    }
    reset() {
        this.resetSelected();
        this.$input.value = '';
    }
    close() {
        cursorToEnd(this.$input);
        // this.$input.blur();
        this.state.isActive = false;
    }
    refreshItems() {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof this.props.items === 'function') {
                this.state.isLoading = true;
                this.requestUpdate();
                const items = yield this.props.items({
                    value: this.$input.value,
                });
                if (plainObject(items)) {
                    this.state.items = Object.values(items);
                }
                else if (Array.isArray(items)) {
                    // @ts-ignore
                    this.state.items = items;
                }
                else {
                    throw new Error(`Sorry but the "items" MUST be an Array...`);
                }
            }
        });
    }
    filterItems(needUpdate = true) {
        return __awaiter(this, void 0, void 0, function* () {
            if (needUpdate)
                yield this.refreshItems();
            // reset selected
            this.resetSelected();
            let items = this.state.items;
            let searchValue = this.state.value;
            if (this.props.searchValuePreprocess) {
                searchValue = this.props.searchValuePreprocess(searchValue);
            }
            let filteredItems = items.map(item => clone(item));
            // custom function
            if (this.props.filterItems) {
                filteredItems = yield this.props.filterItems(filteredItems, searchValue, this.state);
            }
            else {
                let matchedItemsCount = 0;
                filteredItems = filteredItems
                    .filter((item) => {
                    if (matchedItemsCount >= this.state.displayedMaxItems)
                        return false;
                    if (!this.props.filtrable.length)
                        return true;
                    let matchFilter = false;
                    for (let i = 0; i < Object.keys(item).length; i++) {
                        const propName = Object.keys(item)[i], propValue = item[propName];
                        // prevent not string value
                        if (typeof propValue !== 'string')
                            continue;
                        // check if the current propName is specified in the filtrable list
                        if (this.props.filtrable.indexOf(propName) !== -1) {
                            const reg = new RegExp(searchValue.split(' ').join('|'), 'gi');
                            if (propValue.match(reg)) {
                                matchFilter = true;
                                if (searchValue && searchValue !== '') {
                                    const reg = new RegExp(searchValue.split(' ').join('|'), 'gi');
                                    const finalString = propValue.replace(reg, (str) => {
                                        return `<span class="${this.componentUtils.className('__list-item-highlight')} s-highlight"
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
            }
            // @ts-ignore
            this.state.filteredItems = filteredItems;
            this.state.isLoading = false;
            this.requestUpdate();
        });
    }
    select(idx) {
        // set the selected idx
        this._setPreselectedItemByIdx(idx);
    }
    preselectAndValidate(idx) {
        // set the selected idx
        this._setPreselectedItemByIdx(idx);
        // validate
        this.validate();
    }
    preselectValidateAndClose(idx) {
        // set the selected idx
        this._setPreselectedItemByIdx(idx);
        // validate
        this.validateAndClose();
    }
    _setSelectedItemByIdx(idx) {
        // check if the component is in not selectable mode
        if (this.props.notSelectable)
            return;
        this.state.selectedItemIdx = idx;
        this.state.selectedItem = this.selectedItem;
        this.requestUpdate();
    }
    _setPreselectedItemByIdx(idx) {
        // check if the component is in not selectable mode
        if (this.props.notSelectable)
            return;
        this.state.preselectedItemIdx = idx;
        this.state.preselectedItem = this.preselectedItem;
        this.requestUpdate();
    }
    _updateListSizeAndPosition() {
        //   if (!__isFocus(this.$input)) return;
        if (!this.state.isActive)
            return;
        const marginTop = getStyleProperty(this.$dropdown, 'marginTop'); getStyleProperty(this.$dropdown, 'marginLeft'); getStyleProperty(this.$dropdown, 'marginRight'); const marginBottom = getStyleProperty(this.$dropdown, 'marginBottom');
        const distanceTop = fromElementTopToViewportTop(this.$input);
        const distanceBottom = fromElementTopToViewportBottom(this.$input) -
            this.$input.clientHeight;
        let maxHeight;
        if (distanceTop > distanceBottom) {
            this.$container.classList.add('s-filtrable-input--top');
            this.$dropdown.style.top = `auto`;
            this.$dropdown.style.bottom = `calc(100% - ${marginBottom})`;
            maxHeight = distanceTop - parseInt(marginTop);
        }
        else {
            this.$container.classList.remove('s-filtrable-input--top');
            this.$dropdown.style.bottom = `auto`;
            this.$dropdown.style.top = `calc(100% - ${marginTop})`;
            maxHeight = distanceBottom - parseInt(marginBottom);
        }
        this.$dropdown.style.maxHeight = `${maxHeight}px`;
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return html `
            <div class="s-filtrable-input__dropdown">
                <div class="s-filtrable-input__before" tabindex="0">
                    ${this._getTemplate('before')}
                </div>
                <ul class="s-filtrable-input__list">
                    ${this.state.isLoading
            ? html `
                            <li
                                class="s-filtrable-input__list-item s-filtrable-input__list-loading"
                            >
                                ${(_c = (_b = (_a = this.props).templates) === null || _b === void 0 ? void 0 : _b.call(_a, {
                type: 'loading',
                html,
            })) !== null && _c !== void 0 ? _c : 
            // @ts-ignore
            this.state.baseTemplates({
                type: 'loading',
                html,
            })}
                            </li>
                        `
            : !this.state.isLoading &&
                this.state.filteredItems.length <= 0
                ? html `
                            <li
                                class="s-filtrable-input__list-item s-filtrable-input__list-no-item"
                            >
                                ${(_f = (_e = (_d = this.props).templates) === null || _e === void 0 ? void 0 : _e.call(_d, {
                    type: 'empty',
                    html,
                })) !== null && _f !== void 0 ? _f : 
                // @ts-ignore
                this.state.baseTemplates({
                    type: 'empty',
                    html,
                })}
                            </li>
                        `
                : !this.state.isLoading && this.state.filteredItems.length
                    ? this.state.filteredItems.map((item, idx) => {
                        var _a, _b, _c;
                        return idx < this.state.displayedMaxItems
                            ? html `
                                        <li
                                            @click=${() => this.preselectAndValidate(idx)}
                                            @dblclick=${() => this.preselectValidateAndClose(idx)}
                                            @focus=${() => this._setPreselectedItemByIdx(idx)}
                                            style="z-index: ${999999999 - idx}"
                                            tabindex="0"
                                            class="s-filtrable-input__list-item ${(this.state.selectedItemIdx === idx
                                ? 'active'
                                : '')}"
                                            hoverable
                                        >
                                            ${(_c = (_b = (_a = this.props).templates) === null || _b === void 0 ? void 0 : _b.call(_a, {
                                type: 'item',
                                html,
                                unsafeHTML,
                                item,
                                idx,
                            })) !== null && _c !== void 0 ? _c : 
                            // @ts-ignore
                            this.state.baseTemplates({
                                type: 'item',
                                html,
                                unsafeHTML,
                                item,
                                idx,
                            })}
                                        </li>
                                    `
                            : '';
                    })
                    : ''}
                </ul>
                <div class="s-filtrable-input__after" tabindex="0">
                    ${(_h = (_g = this.props).templates) === null || _h === void 0 ? void 0 : _h.call(_g, {
            type: 'after',
            html,
        })}
                </div>
            </div>
        `;
    }
}
/**
 * @name            define
 * @type            Function
 *
 * This function allows you to define (register) your custom element with some default
 * props if needed.
 *
 * @param           {any}           [props={}]              Some default props you want to set for your custom element
 * @param           {String}        [tagName='s-filtrable-input']       The tagName associated to this custom element
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function define(props = {}, tagName = 's-filtrable-input') {
    __SLitComponent.setDefaultProps(tagName, props);
    // @ts-ignore
    customElements.define(tagName, SFiltrableInput);
}export{SFiltrableInput as default,define};