// @ts-nocheck
import { blockElements } from '../lib/elements';
import { findLastIndex, isASTNode, isPreTagContent } from './helpers';
const unsupportedLanguages = [
    'coffee',
    'coffeescript',
    'pug',
    'styl',
    'stylus',
    'sass'
];
export function isInlineElement(path, options, node) {
    return (node &&
        node.type === 'Element' &&
        !isBlockElement(node, options) &&
        !isPreTagContent(path));
}
export function isBlockElement(node, options) {
    return (node &&
        node.type === 'Element' &&
        options.htmlWhitespaceSensitivity !== 'strict' &&
        (options.htmlWhitespaceSensitivity === 'ignore' ||
            blockElements.includes(node.name)));
}
export function isSvelteBlock(node) {
    return [
        'IfBlock',
        'AwaitBlock',
        'CatchBlock',
        'EachBlock',
        'ElseBlock',
        'KeyBlock',
        'PendingBlock',
        'ThenBlock'
    ].includes(node.type);
}
export function isNodeWithChildren(node) {
    return node.children;
}
export function getChildren(node) {
    return isNodeWithChildren(node) ? node.children : [];
}
/**
 * Returns siblings, that is, the children of the parent.
 */
export function getSiblings(path) {
    let parent = path.getParentNode();
    if (isASTNode(parent)) {
        parent = parent.html;
    }
    return getChildren(parent);
}
/**
 * Returns the previous sibling node.
 */
export function getPreviousNode(path) {
    const node = path.getNode();
    return getSiblings(path).find((child) => child.end === node.start);
}
/**
 * Returns the next sibling node.
 */
export function getNextNode(path, node = path.getNode()) {
    return getSiblings(path).find((child) => child.start === node.end);
}
/**
 * Returns the comment that is above the current node.
 */
export function getLeadingComment(path) {
    const siblings = getSiblings(path);
    let node = path.getNode();
    let prev = siblings.find((child) => child.end === node.start);
    while (prev) {
        if (prev.type === 'Comment' &&
            !isIgnoreStartDirective(prev) &&
            !isIgnoreEndDirective(prev)) {
            return prev;
        }
        else if (isEmptyTextNode(prev)) {
            node = prev;
            prev = siblings.find((child) => child.end === node.start);
        }
        else {
            return undefined;
        }
    }
}
/**
 * Did there use to be any embedded object (that has been snipped out of the AST to be moved)
 * at the specified position?
 */
export function doesEmbedStartAfterNode(node, path, siblings = getSiblings(path)) {
    // If node is not at the top level of html, an embed cannot start after it,
    // because embeds are only at the top level
    if (!isNodeTopLevelHTML(node, path)) {
        return false;
    }
    const position = node.end;
    const root = path.stack[0];
    const embeds = [
        root.css,
        root.html,
        root.instance,
        root.js,
        root.module
    ];
    const nextNode = siblings[siblings.indexOf(node) + 1];
    return embeds.find((n) => n && n.start >= position && (!nextNode || n.end <= nextNode.start));
}
export function isNodeTopLevelHTML(node, path) {
    const root = path.stack[0];
    return (!!root.html && !!root.html.children && root.html.children.includes(node));
}
export function isEmptyTextNode(node) {
    return !!node && node.type === 'Text' && getUnencodedText(node).trim() === '';
}
export function isIgnoreDirective(node) {
    return (!!node && node.type === 'Comment' && node.data.trim() === 'prettier-ignore');
}
export function isIgnoreStartDirective(node) {
    return (!!node &&
        node.type === 'Comment' &&
        node.data.trim() === 'prettier-ignore-start');
}
export function isIgnoreEndDirective(node) {
    return (!!node &&
        node.type === 'Comment' &&
        node.data.trim() === 'prettier-ignore-end');
}
export function printRaw(node, originalText, stripLeadingAndTrailingNewline = false) {
    if (node.children.length === 0) {
        return '';
    }
    const firstChild = node.children[0];
    const lastChild = node.children[node.children.length - 1];
    let raw = originalText.substring(firstChild.start, lastChild.end);
    if (!stripLeadingAndTrailingNewline) {
        return raw;
    }
    if (startsWithLinebreak(raw)) {
        raw = raw.substring(raw.indexOf('\n') + 1);
    }
    if (endsWithLinebreak(raw)) {
        raw = raw.substring(0, raw.lastIndexOf('\n'));
        if (raw.charAt(raw.length - 1) === '\r') {
            raw = raw.substring(0, raw.length - 1);
        }
    }
    return raw;
}
function isTextNode(node) {
    return node.type === 'Text';
}
function getAttributeValue(attributeName, node) {
    const attributes = node['attributes'];
    const langAttribute = attributes.find((attribute) => attribute.name === attributeName);
    return langAttribute && langAttribute.value;
}
export function getAttributeTextValue(attributeName, node) {
    const value = getAttributeValue(attributeName, node);
    if (value != null && typeof value === 'object') {
        const textValue = value.find(isTextNode);
        if (textValue) {
            return textValue.data;
        }
    }
    return null;
}
function getLangAttribute(node) {
    const value = getAttributeTextValue('lang', node) || getAttributeTextValue('type', node);
    if (value != null) {
        return value.replace(/^text\//, '');
    }
    else {
        return null;
    }
}
/**
 * Checks whether the node contains a `lang` or `type` attribute with a value corresponding to
 * a language we cannot format. This might for example be `<template lang="pug">`.
 * If the node does not contain a `lang` attribute, the result is true.
 */
export function isNodeSupportedLanguage(node) {
    const lang = getLangAttribute(node);
    return !(lang && unsupportedLanguages.includes(lang));
}
/**
 * Checks whether the node contains a `lang` or `type` attribute which indicates that
 * the script contents are written in TypeScript. Note that the absence of the tag
 * does not mean it's not TypeScript, because the user could have set the default
 * to TypeScript in his settings.
 */
export function isTypeScript(node) {
    const lang = getLangAttribute(node) || '';
    return ['typescript', 'ts'].includes(lang);
}
export function isLoneMustacheTag(node) {
    return node !== true && node.length === 1 && node[0].type === 'MustacheTag';
}
export function isAttributeShorthand(node) {
    return (node !== true && node.length === 1 && node[0].type === 'AttributeShorthand');
}
/**
 * True if node is of type `{a}` or `a={a}`
 */
export function isOrCanBeConvertedToShorthand(node) {
    if (isAttributeShorthand(node.value)) {
        return true;
    }
    if (isLoneMustacheTag(node.value)) {
        const expression = node.value[0].expression;
        return expression.type === 'Identifier' && expression.name === node.name;
    }
    return false;
}
export function getUnencodedText(node) {
    // `raw` will contain HTML entities in unencoded form
    return node.raw || node.data;
}
export function isTextNodeStartingWithLinebreak(node, nrLines = 1) {
    return (node.type === 'Text' && startsWithLinebreak(getUnencodedText(node), nrLines));
}
export function startsWithLinebreak(text, nrLines = 1) {
    return new RegExp(`^([\\t\\f\\r ]*\\n){${nrLines}}`).test(text);
}
export function isTextNodeEndingWithLinebreak(node, nrLines = 1) {
    return (node.type === 'Text' && endsWithLinebreak(getUnencodedText(node), nrLines));
}
export function endsWithLinebreak(text, nrLines = 1) {
    return new RegExp(`(\\n[\\t\\f\\r ]*){${nrLines}}$`).test(text);
}
export function isTextNodeStartingWithWhitespace(node) {
    return node.type === 'Text' && /^\s/.test(getUnencodedText(node));
}
export function isTextNodeEndingWithWhitespace(node) {
    return node.type === 'Text' && /\s$/.test(getUnencodedText(node));
}
export function trimTextNodeRight(node) {
    node.raw = node.raw && node.raw.trimRight();
    node.data = node.data && node.data.trimRight();
}
export function trimTextNodeLeft(node) {
    node.raw = node.raw && node.raw.trimLeft();
    node.data = node.data && node.data.trimLeft();
}
/**
 * Remove all leading whitespace up until the first non-empty text node,
 * and all trailing whitepsace from the last non-empty text node onwards.
 */
export function trimChildren(children, path) {
    let firstNonEmptyNode = children.findIndex((n) => !isEmptyTextNode(n) && !doesEmbedStartAfterNode(n, path));
    firstNonEmptyNode =
        firstNonEmptyNode === -1 ? children.length - 1 : firstNonEmptyNode;
    let lastNonEmptyNode = findLastIndex((n, idx) => {
        // Last node is ok to end at the start of an embedded region,
        // if it's not a comment (which should stick to the region)
        return (!isEmptyTextNode(n) &&
            ((idx === children.length - 1 && n.type !== 'Comment') ||
                !doesEmbedStartAfterNode(n, path)));
    }, children);
    lastNonEmptyNode = lastNonEmptyNode === -1 ? 0 : lastNonEmptyNode;
    for (let i = 0; i <= firstNonEmptyNode; i++) {
        const n = children[i];
        if (n.type === 'Text') {
            trimTextNodeLeft(n);
        }
    }
    for (let i = children.length - 1; i >= lastNonEmptyNode; i--) {
        const n = children[i];
        if (n.type === 'Text') {
            trimTextNodeRight(n);
        }
    }
}
/**
 * Check if given node's starg tag should hug its first child. This is the case for inline elements when there's
 * no whitespace between the `>` and the first child.
 */
export function shouldHugStart(node, isSupportedLanguage, options) {
    if (!isSupportedLanguage) {
        return true;
    }
    if (isBlockElement(node, options)) {
        return false;
    }
    if (!isNodeWithChildren(node)) {
        return false;
    }
    const children = node.children;
    if (children.length === 0) {
        return true;
    }
    const firstChild = children[0];
    return !isTextNodeStartingWithWhitespace(firstChild);
}
/**
 * Check if given node's end tag should hug its last child. This is the case for inline elements when there's
 * no whitespace between the last child and the `</`.
 */
export function shouldHugEnd(node, isSupportedLanguage, options) {
    if (!isSupportedLanguage) {
        return true;
    }
    if (isBlockElement(node, options)) {
        return false;
    }
    if (!isNodeWithChildren(node)) {
        return false;
    }
    const children = node.children;
    if (children.length === 0) {
        return true;
    }
    const lastChild = children[children.length - 1];
    return !isTextNodeEndingWithWhitespace(lastChild);
}
/**
 * Check for a svelte block if there's whitespace at the start and if it's a space or a line.
 */
export function checkWhitespaceAtStartOfSvelteBlock(node, options) {
    if (!isSvelteBlock(node) || !isNodeWithChildren(node)) {
        return 'none';
    }
    const children = node.children;
    if (children.length === 0) {
        return 'none';
    }
    const firstChild = children[0];
    if (isTextNodeStartingWithLinebreak(firstChild)) {
        return 'line';
    }
    else if (isTextNodeStartingWithWhitespace(firstChild)) {
        return 'space';
    }
    // This extra check is necessary because the Svelte AST might swallow whitespace between
    // the block's starting end and its first child.
    const parentOpeningEnd = options.originalText.lastIndexOf('}', firstChild.start);
    if (parentOpeningEnd > 0 && firstChild.start > parentOpeningEnd + 1) {
        const textBetween = options.originalText.substring(parentOpeningEnd + 1, firstChild.start);
        if (textBetween.trim() === '') {
            return startsWithLinebreak(textBetween) ? 'line' : 'space';
        }
    }
    return 'none';
}
/**
 * Check for a svelte block if there's whitespace at the end and if it's a space or a line.
 */
export function checkWhitespaceAtEndOfSvelteBlock(node, options) {
    if (!isSvelteBlock(node) || !isNodeWithChildren(node)) {
        return 'none';
    }
    const children = node.children;
    if (children.length === 0) {
        return 'none';
    }
    const lastChild = children[children.length - 1];
    if (isTextNodeEndingWithLinebreak(lastChild)) {
        return 'line';
    }
    else if (isTextNodeEndingWithWhitespace(lastChild)) {
        return 'space';
    }
    // This extra check is necessary because the Svelte AST might swallow whitespace between
    // the last child and the block's ending start.
    const parentClosingStart = options.originalText.indexOf('{', lastChild.end);
    if (parentClosingStart > 0 && lastChild.end < parentClosingStart) {
        const textBetween = options.originalText.substring(lastChild.end, parentClosingStart);
        if (textBetween.trim() === '') {
            return endsWithLinebreak(textBetween) ? 'line' : 'space';
        }
    }
    return 'none';
}
export function isInsideQuotedAttribute(path, options) {
    const stack = path.stack;
    return stack.some((node) => node.type === 'Attribute' &&
        (!isLoneMustacheTag(node.value) || options.svelteStrictMode));
}
/**
 * Returns true if the softline between `</tagName` and `>` can be omitted.
 */
export function canOmitSoftlineBeforeClosingTag(node, path, options) {
    return (!options.svelteBracketNewLine &&
        (!hugsStartOfNextNode(node, options) ||
            isLastChildWithinParentBlockElement(path, options)));
}
/**
 * Return true if given node does not hug the next node, meaning there's whitespace
 * or the end of the doc afterwards.
 */
function hugsStartOfNextNode(node, options) {
    if (node.end === options.originalText.length) {
        // end of document
        return false;
    }
    return !options.originalText.substring(node.end).match(/^\s/);
}
function isLastChildWithinParentBlockElement(path, options) {
    const parent = path.getParentNode();
    if (!parent || !isBlockElement(parent, options)) {
        return false;
    }
    const children = getChildren(parent);
    const lastChild = children[children.length - 1];
    return lastChild === path.getNode();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1oZWxwZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibm9kZS1oZWxwZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUF5QmQsT0FBTyxFQUFFLGFBQWEsRUFBVyxNQUFNLGlCQUFpQixDQUFDO0FBRXpELE9BQU8sRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUV0RSxNQUFNLG9CQUFvQixHQUFHO0lBQzNCLFFBQVE7SUFDUixjQUFjO0lBQ2QsS0FBSztJQUNMLE1BQU07SUFDTixRQUFRO0lBQ1IsTUFBTTtDQUNQLENBQUM7QUFFRixNQUFNLFVBQVUsZUFBZSxDQUM3QixJQUFjLEVBQ2QsT0FBc0IsRUFDdEIsSUFBVTtJQUVWLE9BQU8sQ0FDTCxJQUFJO1FBQ0osSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTO1FBQ3ZCLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUM7UUFDOUIsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQ3ZCLENBQUM7QUFDSixDQUFDO0FBRUQsTUFBTSxVQUFVLGNBQWMsQ0FDNUIsSUFBVSxFQUNWLE9BQXNCO0lBRXRCLE9BQU8sQ0FDTCxJQUFJO1FBQ0osSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTO1FBQ3ZCLE9BQU8sQ0FBQyx5QkFBeUIsS0FBSyxRQUFRO1FBQzlDLENBQUMsT0FBTyxDQUFDLHlCQUF5QixLQUFLLFFBQVE7WUFDN0MsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBZSxDQUFDLENBQUMsQ0FDaEQsQ0FBQztBQUNKLENBQUM7QUFFRCxNQUFNLFVBQVUsYUFBYSxDQUMzQixJQUFVO0lBVVYsT0FBTztRQUNMLFNBQVM7UUFDVCxZQUFZO1FBQ1osWUFBWTtRQUNaLFdBQVc7UUFDWCxXQUFXO1FBQ1gsVUFBVTtRQUNWLGNBQWM7UUFDZCxXQUFXO0tBQ1osQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElB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