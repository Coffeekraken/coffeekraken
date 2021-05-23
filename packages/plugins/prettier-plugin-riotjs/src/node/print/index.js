// @ts-nocheck
import { doc } from 'prettier';
import { formattableAttributes, selfClosingTags } from '../lib/elements';
import { extractAttributes } from '../lib/extractAttributes';
import { getText } from '../lib/getText';
import { hasSnippedContent, unsnipContent } from '../lib/snipTagContent';
import { parseSortOrder } from '../options';
import { isEmptyDoc, isLine, trim, trimRight } from './doc-helpers';
import { flatten, isASTNode, isPreTagContent, replaceEndOfLineWith } from './helpers';
import { checkWhitespaceAtEndOfSvelteBlock, checkWhitespaceAtStartOfSvelteBlock, doesEmbedStartAfterNode, endsWithLinebreak, getUnencodedText, isBlockElement, isEmptyTextNode, isIgnoreDirective, isInlineElement, isInsideQuotedAttribute, isLoneMustacheTag, isNodeSupportedLanguage, isOrCanBeConvertedToShorthand, isTextNodeEndingWithLinebreak, isTextNodeEndingWithWhitespace, isTextNodeStartingWithLinebreak, isTextNodeStartingWithWhitespace, printRaw, shouldHugEnd, shouldHugStart, startsWithLinebreak, trimChildren, trimTextNodeLeft, trimTextNodeRight, canOmitSoftlineBeforeClosingTag, getNextNode, isIgnoreStartDirective, isIgnoreEndDirective, isNodeTopLevelHTML } from './node-helpers';
const { concat, join, line, group, indent, dedent, softline, hardline, fill, breakParent, literalline } = doc.builders;
let ignoreNext = false;
let ignoreRange = false;
let svelteOptionsDoc;
function groupConcat(contents) {
    return group(concat(contents));
}
export function print(path, options, print) {
    const n = path.getValue();
    if (!n) {
        return '';
    }
    if (isASTNode(n)) {
        return printTopLevelParts(n, options, path, print);
    }
    const [open, close] = options.svelteStrictMode ? ['"{', '}"'] : ['{', '}'];
    const printJsExpression = () => [
        open,
        printJS(path, print, options.svelteStrictMode, false, 'expression'),
        close
    ];
    const node = n;
    if ((ignoreNext || (ignoreRange && !isIgnoreEndDirective(node))) &&
        (node.type !== 'Text' || !isEmptyTextNode(node))) {
        if (ignoreNext) {
            ignoreNext = false;
        }
        return concat(flatten(options.originalText
            .slice(options.locStart(node), options.locEnd(node))
            .split('\n')
            .map((o, i) => (i == 0 ? [o] : [literalline, o]))));
    }
    switch (node.type) {
        case 'Fragment':
            const children = node.children;
            if (children.length === 0 || children.every(isEmptyTextNode)) {
                return '';
            }
            if (!isPreTagContent(path)) {
                trimChildren(node.children, path);
                const output = trim([printChildren(path, print, options)], (n) => isLine(n) ||
                    (typeof n === 'string' && n.trim() === '') ||
                    // Because printChildren may append this at the end and
                    // may hide other lines before it
                    n === breakParent);
                if (output.every((doc) => isEmptyDoc(doc))) {
                    return '';
                }
                return groupConcat([...output, hardline]);
            }
            else {
                return groupConcat(path.map(print, 'children'));
            }
        case 'Text':
            if (!isPreTagContent(path)) {
                if (isEmptyTextNode(node)) {
                    const hasWhiteSpace = getUnencodedText(node).trim().length <
                        getUnencodedText(node).length;
                    const hasOneOrMoreNewlines = /\n/.test(getUnencodedText(node));
                    const hasTwoOrMoreNewlines = /\n\r?\s*\n\r?/.test(getUnencodedText(node));
                    if (hasTwoOrMoreNewlines) {
                        return concat([hardline, hardline]);
                    }
                    if (hasOneOrMoreNewlines) {
                        return hardline;
                    }
                    if (hasWhiteSpace) {
                        return line;
                    }
                    return '';
                }
                /**
                 * For non-empty text nodes each sequence of non-whitespace characters (effectively,
                 * each "word") is joined by a single `line`, which will be rendered as a single space
                 * until this node's current line is out of room, at which `fill` will break at the
                 * most convenient instance of `line`.
                 */
                return fill(splitTextToDocs(node));
            }
            else {
                const rawText = getUnencodedText(node);
                if (path.getParentNode().type === 'Attribute') {
                    // Direct child of attribute value -> add literallines at end of lines
                    // so that other things don't break in unexpected places
                    return concat(replaceEndOfLineWith(rawText, literalline));
                }
                return rawText;
            }
        case 'Element':
        case 'InlineComponent':
        case 'Slot':
        case 'SlotTemplate':
        case 'Window':
        case 'Head':
        case 'Title': {
            const isSupportedLanguage = !(node.name === 'template' && !isNodeSupportedLanguage(node));
            const isEmpty = node.children.every((child) => isEmptyTextNode(child));
            const isSelfClosingTag = isEmpty &&
                (!options.svelteStrictMode ||
                    node.type !== 'Element' ||
                    selfClosingTags.indexOf(node.name) !== -1);
            // Order important: print attributes first
            const attributes = path.map((childPath) => childPath.call(print), 'attributes');
            const possibleThisBinding = node.type === 'InlineComponent' && node.expression
                ? concat([line, 'this=', ...printJsExpression()])
                : '';
            if (isSelfClosingTag) {
                return groupConcat([
                    '<',
                    node.name,
                    indent(groupConcat([
                        possibleThisBinding,
                        ...attributes,
                        options.svelteBracketNewLine ? dedent(line) : ''
                    ])),
                    ...[options.svelteBracketNewLine ? '' : ' ', `/>`]
                ]);
            }
            const children = node.children;
            const firstChild = children[0];
            const lastChild = children[children.length - 1];
            // Is a function which is invoked later because printChildren will manipulate child nodes
            // which would wrongfully change the other checks about hugging etc done beforehand
            let body;
            const hugStart = shouldHugStart(node, isSupportedLanguage, options);
            const hugEnd = shouldHugEnd(node, isSupportedLanguage, options);
            if (isEmpty) {
                body =
                    isInlineElement(path, options, node) &&
                        node.children.length &&
                        isTextNodeStartingWithWhitespace(node.children[0]) &&
                        !isPreTagContent(path)
                        ? () => line
                        : () => (options.svelteBracketNewLine ? '' : softline);
            }
            else if (isPreTagContent(path)) {
                body = () => printRaw(node, options.originalText);
            }
            else if (!isSupportedLanguage) {
                body = () => printRaw(node, options.originalText, true);
            }
            else if (isInlineElement(path, options, node) &&
                !isPreTagContent(path)) {
                body = () => printChildren(path, print, options);
            }
            else {
                body = () => printChildren(path, print, options);
            }
            const openingTag = [
                '<',
                node.name,
                indent(groupConcat([
                    possibleThisBinding,
                    ...attributes,
                    hugStart
                        ? ''
                        : options.svelteBracketNewLine && !isPreTagContent(path)
                            ? dedent(softline)
                            : ''
                ]))
            ];
            if (!isSupportedLanguage && !isEmpty) {
                // Format template tags so that there's a hardline but no intendation.
                // That way the `lang="X"` and the closing `>` of the start tag stay in one line
                // which is the 99% use case.
                return groupConcat([
                    ...openingTag,
                    '>',
                    groupConcat([hardline, body(), hardline]),
                    `</${node.name}>`
                ]);
            }
            if (hugStart && hugEnd) {
                const huggedContent = concat([
                    softline,
                    groupConcat(['>', body(), `</${node.name}`])
                ]);
                const omitSoftlineBeforeClosingTag = (isEmpty && options.svelteBracketNewLine) ||
                    canOmitSoftlineBeforeClosingTag(node, path, options);
                return groupConcat([
                    ...openingTag,
                    isEmpty ? group(huggedContent) : group(indent(huggedContent)),
                    omitSoftlineBeforeClosingTag ? '' : softline,
                    '>'
                ]);
            }
            // No hugging of content means it's either a block element and/or there's whitespace at the start/end
            let noHugSeparatorStart = softline;
            let noHugSeparatorEnd = softline;
            if (isPreTagContent(path)) {
                noHugSeparatorStart = '';
                noHugSeparatorEnd = '';
            }
            else {
                let didSetEndSeparator = false;
                if (!hugStart && firstChild && firstChild.type === 'Text') {
                    if (isTextNodeStartingWithLinebreak(firstChild) &&
                        firstChild !== lastChild &&
                        (!isInlineElement(path, options, node) ||
                            isTextNodeEndingWithWhitespace(lastChild))) {
                        noHugSeparatorStart = hardline;
                        noHugSeparatorEnd = hardline;
                        didSetEndSeparator = true;
                    }
                    else if (isInlineElement(path, options, node)) {
                        noHugSeparatorStart = line;
                    }
                    trimTextNodeLeft(firstChild);
                }
                if (!hugEnd && lastChild && lastChild.type === 'Text') {
                    if (isInlineElement(path, options, node) && !didSetEndSeparator) {
                        noHugSeparatorEnd = line;
                    }
                    trimTextNodeRight(lastChild);
                }
            }
            if (hugStart) {
                return groupConcat([
                    ...openingTag,
                    indent(concat([softline, groupConcat(['>', body()])])),
                    noHugSeparatorEnd,
                    `</${node.name}>`
                ]);
            }
            if (hugEnd) {
                return groupConcat([
                    ...openingTag,
                    '>',
                    indent(concat([
                        noHugSeparatorStart,
                        groupConcat([body(), `</${node.name}`])
                    ])),
                    canOmitSoftlineBeforeClosingTag(node, path, options) ? '' : softline,
                    '>'
                ]);
            }
            if (isEmpty) {
                return groupConcat([...openingTag, '>', body(), `</${node.name}>`]);
            }
            return groupConcat([
                ...openingTag,
                '>',
                indent(concat([noHugSeparatorStart, body()])),
                noHugSeparatorEnd,
                `</${node.name}>`
            ]);
        }
        case 'Options':
            throw new Error('Options tags should have been handled by prepareChildren');
        case 'Body':
            return groupConcat([
                '<',
                node.name,
                indent(groupConcat(path.map((childPath) => childPath.call(print), 'attributes'))),
                ' />'
            ]);
        case 'Identifier':
            return node.name;
        case 'AttributeShorthand': {
            return node.expression.name;
        }
        case 'Attribute': {
            if (isOrCanBeConvertedToShorthand(node)) {
                if (options.svelteStrictMode) {
                    return concat([line, node.name, '="{', node.name, '}"']);
                }
                else if (options.svelteAllowShorthand) {
                    return concat([line, '{', node.name, '}']);
                }
                else {
                    return concat([line, node.name, '={', node.name, '}']);
                }
            }
            else {
                if (node.value === true) {
                    return concat([line, node.name]);
                }
                const quotes = !isLoneMustacheTag(node.value) || options.svelteStrictMode;
                const attrNodeValue = printAttributeNodeValue(path, print, quotes, node);
                if (quotes) {
                    return concat([line, node.name, '=', '"', attrNodeValue, '"']);
                }
                else {
                    return concat([line, node.name, '=', attrNodeValue]);
                }
            }
        }
        case 'MustacheTag':
            return concat([
                '{',
                printJS(path, print, isInsideQuotedAttribute(path, options), false, 'expression'),
                '}'
            ]);
        case 'IfBlock': {
            const def = [
                '{#if ',
                printSvelteBlockJS(path, print, 'expression'),
                '}',
                printSvelteBlockChildren(path, print, options)
            ];
            if (node.else) {
                def.push(path.call(print, 'else'));
            }
            def.push('{/if}');
            return concat([groupConcat(def), breakParent]);
        }
        case 'ElseBlock': {
            // Else if
            const parent = path.getParentNode();
            if (node.children.length === 1 &&
                node.children[0].type === 'IfBlock' &&
                parent.type !== 'EachBlock') {
                const ifNode = node.children[0];
                const def = [
                    '{:else if ',
                    path.map((ifPath) => printSvelteBlockJS(ifPath, print, 'expression'), 'children')[0],
                    '}',
                    path.map((ifPath) => printSvelteBlockChildren(ifPath, print, options), 'children')[0]
                ];
                if (ifNode.else) {
                    def.push(path.map((ifPath) => ifPath.call(print, 'else'), 'children')[0]);
                }
                return concat(def);
            }
            return concat([
                '{:else}',
                printSvelteBlockChildren(path, print, options)
            ]);
        }
        case 'EachBlock': {
            const def = [
                '{#each ',
                printSvelteBlockJS(path, print, 'expression'),
                ' as ',
                printSvelteBlockJS(path, print, 'context')
            ];
            if (node.index) {
                def.push(', ', node.index);
            }
            if (node.key) {
                def.push(' (', printSvelteBlockJS(path, print, 'key'), ')');
            }
            def.push('}', printSvelteBlockChildren(path, print, options));
            if (node.else) {
                def.push(path.call(print, 'else'));
            }
            def.push('{/each}');
            return concat([groupConcat(def), breakParent]);
        }
        case 'AwaitBlock': {
            const hasPendingBlock = node.pending.children.some((n) => !isEmptyTextNode(n));
            const hasThenBlock = node.then.children.some((n) => !isEmptyTextNode(n));
            const hasCatchBlock = node.catch.children.some((n) => !isEmptyTextNode(n));
            let block = [];
            if (!hasPendingBlock && hasThenBlock) {
                block.push(groupConcat([
                    '{#await ',
                    printSvelteBlockJS(path, print, 'expression'),
                    ' then',
                    expandNode(node.value),
                    '}'
                ]), path.call(print, 'then'));
            }
            else {
                block.push(groupConcat([
                    '{#await ',
                    printSvelteBlockJS(path, print, 'expression'),
                    '}'
                ]));
                if (hasPendingBlock) {
                    block.push(path.call(print, 'pending'));
                }
                if (hasThenBlock) {
                    block.push(groupConcat(['{:then', expandNode(node.value), '}']), path.call(print, 'then'));
                }
            }
            if (hasCatchBlock) {
                block.push(groupConcat(['{:catch', expandNode(node.error), '}']), path.call(print, 'catch'));
            }
            block.push('{/await}');
            return groupConcat(block);
        }
        case 'KeyBlock': {
            const def = [
                '{#key ',
                printSvelteBlockJS(path, print, 'expression'),
                '}',
                printSvelteBlockChildren(path, print, options)
            ];
            def.push('{/key}');
            return concat([groupConcat(def), breakParent]);
        }
        case 'ThenBlock':
        case 'PendingBlock':
        case 'CatchBlock':
            return printSvelteBlockChildren(path, print, options);
        case 'EventHandler':
            return concat([
                line,
                'on:',
                node.name,
                node.modifiers && node.modifiers.length
                    ? concat(['|', join('|', node.modifiers)])
                    : '',
                node.expression ? concat(['=', ...printJsExpression()]) : ''
            ]);
        case 'Binding':
            return concat([
                line,
                'bind:',
                node.name,
                node.expression.type === 'Identifier' &&
                    node.expression.name === node.name
                    ? ''
                    : concat(['=', ...printJsExpression()])
            ]);
        case 'Class':
            return concat([
                line,
                'class:',
                node.name,
                node.expression.type === 'Identifier' &&
                    node.expression.name === node.name
                    ? ''
                    : concat(['=', ...printJsExpression()])
            ]);
        case 'Let':
            return concat([
                line,
                'let:',
                node.name,
                // shorthand let directives have `null` expressions
                !node.expression ||
                    (node.expression.type === 'Identifier' &&
                        node.expression.name === node.name)
                    ? ''
                    : concat(['=', ...printJsExpression()])
            ]);
        case 'DebugTag':
            return concat([
                '{@debug',
                node.identifiers.length > 0
                    ? concat([' ', join(', ', path.map(print, 'identifiers'))])
                    : '',
                '}'
            ]);
        case 'Ref':
            return concat([line, 'ref:', node.name]);
        case 'Comment': {
            const nodeAfterComment = getNextNode(path);
            if (isIgnoreStartDirective(node) && isNodeTopLevelHTML(node, path)) {
                ignoreRange = true;
            }
            else if (isIgnoreEndDirective(node) && isNodeTopLevelHTML(node, path)) {
                ignoreRange = false;
            }
            else if (
            // If there is no sibling node that starts right after us but the parent indicates
            // that there used to be, that means that node was actually an embedded `<style>`
            // or `<script>` node that was cut out.
            // If so, the comment does not refer to the next line we will see.
            // The `embed` function handles printing the comment in the right place.
            doesEmbedStartAfterNode(node, path) ||
                (isEmptyTextNode(nodeAfterComment) &&
                    doesEmbedStartAfterNode(nodeAfterComment, path))) {
                return '';
            }
            else if (isIgnoreDirective(node)) {
                ignoreNext = true;
            }
            return printComment(node);
        }
        case 'Transition':
            const kind = node.intro && node.outro ? 'transition' : node.intro ? 'in' : 'out';
            return concat([
                line,
                kind,
                ':',
                node.name,
                node.modifiers && node.modifiers.length
                    ? concat(['|', join('|', node.modifiers)])
                    : '',
                node.expression ? concat(['=', ...printJsExpression()]) : ''
            ]);
        case 'Action':
            return concat([
                line,
                'use:',
                node.name,
                node.expression ? concat(['=', ...printJsExpression()]) : ''
            ]);
        case 'Animation':
            return concat([
                line,
                'animate:',
                node.name,
                node.expression ? concat(['=', ...printJsExpression()]) : ''
            ]);
        case 'RawMustacheTag':
            return concat([
                '{@html ',
                printJS(path, print, false, false, 'expression'),
                '}'
            ]);
        case 'Spread':
            return concat([
                line,
                '{...',
                printJS(path, print, false, false, 'expression'),
                '}'
            ]);
    }
    console.error(JSON.stringify(node, null, 4));
    throw new Error('unknown node type: ' + node.type);
}
function printTopLevelParts(n, options, path, print) {
    const parts = {
        options: [],
        scripts: [],
        markup: [],
        styles: []
    };
    // scripts
    if (n.module) {
        n.module.type = 'Script';
        n.module.attributes = extractAttributes(getText(n.module, options));
        parts.scripts.push(path.call(print, 'module'));
    }
    if (n.instance) {
        n.instance.type = 'Script';
        n.instance.attributes = extractAttributes(getText(n.instance, options));
        parts.scripts.push(path.call(print, 'instance'));
    }
    // styles
    if (n.css) {
        n.css.type = 'Style';
        n.css.content.type = 'StyleProgram';
        parts.styles.push(path.call(print, 'css'));
    }
    // markup
    const htmlDoc = path.call(print, 'html');
    if (htmlDoc) {
        parts.markup.push(htmlDoc);
    }
    if (svelteOptionsDoc) {
        parts.options.push(svelteOptionsDoc);
    }
    const docs = flatten(parseSortOrder(options.svelteSortOrder).map((p) => parts[p]));
    // Need to reset these because they are global and could affect the next formatting run
    ignoreNext = false;
    ignoreRange = false;
    svelteOptionsDoc = undefined;
    // If this is invoked as an embed of markdown, remove the last hardline.
    // The markdown parser tries this, too, but fails because it does not
    // recurse into concats. Doing this will prevent an empty line
    // at the end of the embedded code block.
    if (options.parentParser === 'markdown') {
        const lastDoc = docs[docs.length - 1];
        trimRight([lastDoc], isLine);
    }
    return groupConcat([join(hardline, docs)]);
}
function printAttributeNodeValue(path, print, quotes, node) {
    const valueDocs = path.map((childPath) => childPath.call(print), 'value');
    if (!quotes || !formattableAttributes.includes(node.name)) {
        return concat(valueDocs);
    }
    else {
        return indent(groupConcat(trim(valueDocs, isLine)));
    }
}
function printSvelteBlockChildren(path, print, options) {
    const node = path.getValue();
    const children = node.children;
    if (!children || children.length === 0) {
        return '';
    }
    const whitespaceAtStartOfBlock = checkWhitespaceAtStartOfSvelteBlock(node, options);
    const whitespaceAtEndOfBlock = checkWhitespaceAtEndOfSvelteBlock(node, options);
    const startline = whitespaceAtStartOfBlock === 'none'
        ? ''
        : whitespaceAtEndOfBlock === 'line' || whitespaceAtStartOfBlock === 'line'
            ? hardline
            : line;
    const endline = whitespaceAtEndOfBlock === 'none'
        ? ''
        : whitespaceAtEndOfBlock === 'line' || whitespaceAtStartOfBlock === 'line'
            ? hardline
            : line;
    const firstChild = children[0];
    const lastChild = children[children.length - 1];
    if (isTextNodeStartingWithWhitespace(firstChild)) {
        trimTextNodeLeft(firstChild);
    }
    if (isTextNodeEndingWithWhitespace(lastChild)) {
        trimTextNodeRight(lastChild);
    }
    return concat([
        indent(concat([startline, group(printChildren(path, print, options))])),
        endline
    ]);
}
function printChildren(path, print, options) {
    if (isPreTagContent(path)) {
        return concat(path.map(print, 'children'));
    }
    const childNodes = prepareChildren(path.getValue().children, path, print);
    // modifiy original array because it's accessed later through map(print, 'children', idx)
    path.getValue().children = childNodes;
    if (childNodes.length === 0) {
        return '';
    }
    const childDocs = [];
    let handleWhitespaceOfPrevTextNode = false;
    for (let i = 0; i < childNodes.length; i++) {
        const childNode = childNodes[i];
        if (childNode.type === 'Text') {
            handleTextChild(i, childNode);
        }
        else if (isBlockElement(childNode, options)) {
            handleBlockChild(i);
        }
        else if (isInlineElement(path, options, childNode)) {
            handleInlineChild(i);
        }
        else {
            childDocs.push(printChild(i));
            handleWhitespaceOfPrevTextNode = false;
        }
    }
    // If there's at least one block element and more than one node, break content
    const forceBreakContent = childNodes.length > 1 &&
        childNodes.some((child) => isBlockElement(child, options));
    if (forceBreakContent) {
        childDocs.push(breakParent);
    }
    return concat(childDocs);
    function printChild(idx) {
        return path.call(print, 'children', idx);
    }
    /**
     * Print inline child. Hug whitespace of previous text child if there was one.
     */
    function handleInlineChild(idx) {
        if (handleWhitespaceOfPrevTextNode) {
            childDocs.push(groupConcat([line, printChild(idx)]));
        }
        else {
            childDocs.push(printChild(idx));
        }
        handleWhitespaceOfPrevTextNode = false;
    }
    /**
     * Print block element. Add softlines around it if needed
     * so it breaks into a separate line if children are broken up.
     * Don't add lines at the start/end if it's the first/last child because this
     * kind of whitespace handling is done in the parent already.
     */
    function handleBlockChild(idx) {
        const prevChild = childNodes[idx - 1];
        if (prevChild &&
            !isBlockElement(prevChild, options) &&
            (prevChild.type !== 'Text' ||
                handleWhitespaceOfPrevTextNode ||
                !isTextNodeEndingWithWhitespace(prevChild))) {
            childDocs.push(softline);
        }
        childDocs.push(printChild(idx));
        const nextChild = childNodes[idx + 1];
        if (nextChild &&
            (nextChild.type !== 'Text' ||
                // Only handle text which starts with a whitespace and has text afterwards,
                // or is empty but followed by an inline element. The latter is done
                // so that if the children break, the inline element afterwards is in a seperate line.
                ((!isEmptyTextNode(nextChild) ||
                    (childNodes[idx + 2] &&
                        isInlineElement(path, options, childNodes[idx + 2]))) &&
                    !isTextNodeStartingWithLinebreak(nextChild)))) {
            childDocs.push(softline);
        }
        handleWhitespaceOfPrevTextNode = false;
    }
    /**
     * Print text child. First/last child white space handling
     * is done in parent already. By defintion of the Svelte AST,
     * a text node always is inbetween other tags. Add hardlines
     * if the users wants to have them inbetween.
     * If the text is trimmed right, toggle flag telling
     * subsequent (inline)block element to alter its printing logic
     * to check if they need to hug or print lines themselves.
     */
    function handleTextChild(idx, childNode) {
        handleWhitespaceOfPrevTextNode = false;
        if (idx === 0 || idx === childNodes.length - 1) {
            childDocs.push(printChild(idx));
            return;
        }
        const prevNode = childNodes[idx - 1];
        const nextNode = childNodes[idx + 1];
        if (isTextNodeStartingWithWhitespace(childNode) &&
            // If node is empty, go straight through to checking the right end
            !isEmptyTextNode(childNode)) {
            if (isInlineElement(path, options, prevNode) &&
                !isTextNodeStartingWithLinebreak(childNode)) {
                trimTextNodeLeft(childNode);
                const lastChildDoc = childDocs.pop();
                childDocs.push(groupConcat([lastChildDoc, line]));
            }
            if (isBlockElement(prevNode, options) &&
                !isTextNodeStartingWithLinebreak(childNode)) {
                trimTextNodeLeft(childNode);
            }
        }
        if (isTextNodeEndingWithWhitespace(childNode)) {
            if (isInlineElement(path, options, nextNode) &&
                !isTextNodeEndingWithLinebreak(childNode)) {
                handleWhitespaceOfPrevTextNode =
                    !prevNode || !isBlockElement(prevNode, options);
                trimTextNodeRight(childNode);
            }
            if (isBlockElement(nextNode, options) &&
                !isTextNodeEndingWithLinebreak(childNode, 2)) {
                handleWhitespaceOfPrevTextNode =
                    !prevNode || !isBlockElement(prevNode, options);
                trimTextNodeRight(childNode);
            }
        }
        childDocs.push(printChild(idx));
    }
}
/**
 * `svelte:options` is part of the html part but needs to be snipped out and handled
 * seperately to reorder it as configured. The comment above it should be moved with it.
 * Do that here.
 */
function prepareChildren(children, path, print) {
    let svelteOptionsComment;
    const childrenWithoutOptions = [];
    for (let idx = 0; idx < children.length; idx++) {
        const currentChild = children[idx];
        if (currentChild.type === 'Text' && getUnencodedText(currentChild) === '') {
            continue;
        }
        if (isEmptyTextNode(currentChild) &&
            doesEmbedStartAfterNode(currentChild, path)) {
            continue;
        }
        if (isCommentFollowedByOptions(currentChild, idx)) {
            svelteOptionsComment = printComment(currentChild);
            const nextChild = children[idx + 1];
            idx += nextChild && isEmptyTextNode(nextChild) ? 1 : 0;
            continue;
        }
        if (currentChild.type === 'Options') {
            printSvelteOptions(currentChild, idx, path, print);
            continue;
        }
        childrenWithoutOptions.push(currentChild);
    }
    const mergedChildrenWithoutOptions = [];
    for (let idx = 0; idx < childrenWithoutOptions.length; idx++) {
        const currentChild = childrenWithoutOptions[idx];
        const nextChild = childrenWithoutOptions[idx + 1];
        if (currentChild.type === 'Text' &&
            nextChild &&
            nextChild.type === 'Text') {
            // A tag was snipped out (f.e. svelte:options). Join text
            currentChild.raw += nextChild.raw;
            currentChild.data += nextChild.data;
            idx++;
        }
        mergedChildrenWithoutOptions.push(currentChild);
    }
    return mergedChildrenWithoutOptions;
    function printSvelteOptions(node, idx, path, print) {
        svelteOptionsDoc = groupConcat([
            groupConcat([
                '<',
                node.name,
                indent(groupConcat(path.map(print, 'children', idx, 'attributes'))),
                ' />'
            ]),
            hardline
        ]);
        if (svelteOptionsComment) {
            svelteOptionsDoc = groupConcat([
                svelteOptionsComment,
                hardline,
                svelteOptionsDoc
            ]);
        }
    }
    function isCommentFollowedByOptions(node, idx) {
        if (node.type !== 'Comment' ||
            isIgnoreEndDirective(node) ||
            isIgnoreStartDirective(node)) {
            return false;
        }
        const nextChild = children[idx + 1];
        if (nextChild) {
            if (isEmptyTextNode(nextChild)) {
                const afterNext = children[idx + 2];
                return afterNext && afterNext.type === 'Options';
            }
            return nextChild.type === 'Options';
        }
        return false;
    }
}
/**
 * Split the text into words separated by whitespace. Replace the whitespaces by lines,
 * collapsing multiple whitespaces into a single line.
 *
 * If the text starts or ends with multiple newlines, two of those should be kept.
 */
function splitTextToDocs(node) {
    const text = getUnencodedText(node);
    let docs = text.split(/[\t\n\f\r ]+/);
    docs = join(line, docs).parts.filter((s) => s !== '');
    if (startsWithLinebreak(text)) {
        docs[0] = hardline;
    }
    if (startsWithLinebreak(text, 2)) {
        docs = [hardline, ...docs];
    }
    if (endsWithLinebreak(text)) {
        docs[docs.length - 1] = hardline;
    }
    if (endsWithLinebreak(text, 2)) {
        docs = [...docs, hardline];
    }
    return docs;
}
function printSvelteBlockJS(path, print, name) {
    return printJS(path, print, false, true, name);
}
function printJS(path, print, forceSingleQuote, forceSingleLine, name) {
    path.getValue()[name].isJS = true;
    path.getValue()[name].forceSingleQuote = forceSingleQuote;
    path.getValue()[name].forceSingleLine = forceSingleLine;
    return path.call(print, name);
}
function expandNode(node) {
    if (node === null) {
        return '';
    }
    if (typeof node === 'string') {
        // pre-v3.20 AST
        return ' ' + node;
    }
    switch (node.type) {
        case 'ArrayPattern':
            return ' [' + node.elements.map(expandNode).join(',').slice(1) + ']';
        case 'AssignmentPattern':
            return expandNode(node.left) + ' =' + expandNode(node.right);
        case 'Identifier':
            return ' ' + node.name;
        case 'Literal':
            return ' ' + node.raw;
        case 'ObjectPattern':
            return ' {' + node.properties.map(expandNode).join(',') + ' }';
        case 'Property':
            if (node.value.type === 'ObjectPattern') {
                return ' ' + node.key.name + ':' + expandNode(node.value);
            }
            else if (node.value.type === 'Identifier' &&
                node.key.name !== node.value.name) {
                return expandNode(node.key) + ':' + expandNode(node.value);
            }
            else {
                return expandNode(node.value);
            }
        case 'RestElement':
            return ' ...' + node.argument.name;
    }
    console.error(JSON.stringify(node, null, 4));
    throw new Error('unknown node type: ' + node.type);
}
function printComment(node) {
    let text = node.data;
    if (hasSnippedContent(text)) {
        text = unsnipContent(text);
    }
    return groupConcat(['<!--', text, '-->']);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxFQUFPLEdBQUcsRUFBMkIsTUFBTSxVQUFVLENBQUM7QUFDN0QsT0FBTyxFQUFFLHFCQUFxQixFQUFFLGVBQWUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzdELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDekUsT0FBTyxFQUFFLGNBQWMsRUFBaUIsTUFBTSxZQUFZLENBQUM7QUFDM0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNwRSxPQUFPLEVBQ0wsT0FBTyxFQUNQLFNBQVMsRUFDVCxlQUFlLEVBQ2Ysb0JBQW9CLEVBQ3JCLE1BQU0sV0FBVyxDQUFDO0FBQ25CLE9BQU8sRUFDTCxpQ0FBaUMsRUFDakMsbUNBQW1DLEVBQ25DLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsZ0JBQWdCLEVBQ2hCLGNBQWMsRUFDZCxlQUFlLEVBQ2YsaUJBQWlCLEVBQ2pCLGVBQWUsRUFDZix1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLHVCQUF1QixFQUN2Qiw2QkFBNkIsRUFDN0IsNkJBQTZCLEVBQzdCLDhCQUE4QixFQUM5QiwrQkFBK0IsRUFDL0IsZ0NBQWdDLEVBQ2hDLFFBQVEsRUFDUixZQUFZLEVBQ1osY0FBYyxFQUNkLG1CQUFtQixFQUNuQixZQUFZLEVBQ1osZ0JBQWdCLEVBQ2hCLGlCQUFpQixFQUNqQiwrQkFBK0IsRUFDL0IsV0FBVyxFQUNYLHNCQUFzQixFQUN0QixvQkFBb0IsRUFDcEIsa0JBQWtCLEVBQ25CLE1B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