/**
 * Copyright 2021 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var Comparator;
(function (Comparator) {
    Comparator[Comparator["LESS_THAN"] = 0] = "LESS_THAN";
    Comparator[Comparator["LESS_OR_EQUAL"] = 1] = "LESS_OR_EQUAL";
    Comparator[Comparator["GREATER_THAN"] = 2] = "GREATER_THAN";
    Comparator[Comparator["GREATER_OR_EQUAL"] = 3] = "GREATER_OR_EQUAL";
})(Comparator || (Comparator = {}));
var ContainerConditionType;
(function (ContainerConditionType) {
    ContainerConditionType[ContainerConditionType["SizeQuery"] = 0] = "SizeQuery";
    ContainerConditionType[ContainerConditionType["ContainerConditionConjunction"] = 1] = "ContainerConditionConjunction";
    ContainerConditionType[ContainerConditionType["ContainerConditionDisjunction"] = 2] = "ContainerConditionDisjunction";
    ContainerConditionType[ContainerConditionType["ContainerConditionNegation"] = 3] = "ContainerConditionNegation";
})(ContainerConditionType || (ContainerConditionType = {}));
function uid() {
    return Array.from({ length: 16 }, () => Math.floor(Math.random() * 256).toString(16)).join('');
}
function translateToLogicalProp(feature) {
    switch (feature.toLowerCase()) {
        case 'inlinesize':
            return 'inlineSize';
        case 'blocksize':
            return 'blockSize';
        case 'width':
            return 'inlineSize';
        case 'height':
            return 'blockSize';
        default:
            throw Error(`Unknown feature name ${feature} in container query`);
    }
}
function isSizeQueryFulfilled(condition, borderBox) {
    const value = borderBox[translateToLogicalProp(condition.feature)];
    switch (condition.comparator) {
        case Comparator.GREATER_OR_EQUAL:
            return value >= condition.threshold;
        case Comparator.GREATER_THAN:
            return value > condition.threshold;
        case Comparator.LESS_OR_EQUAL:
            return value <= condition.threshold;
        case Comparator.LESS_THAN:
            return value < condition.threshold;
    }
}
function isQueryFullfilled_internal(condition, borderBox) {
    switch (condition.type) {
        case ContainerConditionType.ContainerConditionConjunction:
            return (isQueryFullfilled_internal(condition.left, borderBox) &&
                isQueryFullfilled_internal(condition.right, borderBox));
        case ContainerConditionType.ContainerConditionDisjunction:
            return (isQueryFullfilled_internal(condition.left, borderBox) ||
                isQueryFullfilled_internal(condition.right, borderBox));
        case ContainerConditionType.ContainerConditionNegation:
            return !isQueryFullfilled_internal(condition.right, borderBox);
        case ContainerConditionType.SizeQuery:
            return isSizeQueryFulfilled(condition, borderBox);
        default:
            throw Error('wtf?');
    }
}
function isQueryFullfilled(condition, entry) {
    var _a, _b;
    let borderBox;
    if ('borderBoxSize' in entry) {
        // At the time of writing, the array will always be length one in Chrome.
        // In Firefox, it won’t be an array, but a single object.
        borderBox = (_b = (_a = entry.borderBoxSize) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : entry.borderBoxSize;
    }
    else {
        // Safari doesn’t have borderBoxSize at all, but only offers `contentRect`,
        // so we have to do some maths ourselves.
        const computed = getComputedStyle(entry.target);
        borderBox = {
            // FIXME: This will if you are not in tblr writing mode
            blockSize: entry.contentRect.height,
            inlineSize: entry.contentRect.width,
        };
        // Cut off the "px" suffix from the computed styles.
        borderBox.blockSize +=
            parseInt(computed.paddingBlockStart.slice(0, -2)) +
                parseInt(computed.paddingBlockEnd.slice(0, -2));
        borderBox.inlineSize +=
            parseInt(computed.paddingInlineStart.slice(0, -2)) +
                parseInt(computed.paddingInlineEnd.slice(0, -2));
    }
    return isQueryFullfilled_internal(condition, borderBox);
}
function findParentContainer(el, name) {
    while (el) {
        el = el.parentElement;
        if (!containerNames.has(el))
            continue;
        if (name) {
            const containerName = containerNames.get(el);
            if (!containerName.includes(name))
                continue;
        }
        return el;
    }
    return null;
}
const containerNames = new WeakMap();
function registerContainer(el, name) {
    containerRO.observe(el);
    if (!containerNames.has(el)) {
        containerNames.set(el, []);
    }
    containerNames.get(el).push(name);
}
const queries = [];
function registerContainerQuery(cqd) {
    queries.push(cqd);
}
const containerRO = new ResizeObserver((entries) => {
    const changedContainers = new Map(entries.map((entry) => [entry.target, entry]));
    for (const query of queries) {
        for (const { selector } of query.rules) {
            const els = document.querySelectorAll(selector);
            for (const el of els) {
                const container = findParentContainer(el, query.name);
                if (!container)
                    continue;
                if (!changedContainers.has(container))
                    continue;
                const entry = changedContainers.get(container);
                el.classList.toggle(query.className, isQueryFullfilled(query.condition, entry));
            }
        }
    }
});
const watchedContainerSelectors = [];
const containerMO = new MutationObserver((entries) => {
    for (const entry of entries) {
        for (const node of entry.removedNodes) {
            if (!(node instanceof HTMLElement))
                continue;
            containerRO.unobserve(node);
        }
        for (const node of entry.addedNodes) {
            if (!(node instanceof HTMLElement))
                continue;
            for (const watchedContainerSelector of watchedContainerSelectors) {
                // Check if the node itself is a container, and if so, start watching it.
                if (node.matches(watchedContainerSelector.selector)) {
                    registerContainer(node, watchedContainerSelector.name);
                }
                // If the node was added with children, the children will NOT get their own
                // MO events, so we need to check the children manually.
                for (const container of node.querySelectorAll(watchedContainerSelector.selector)) {
                    registerContainer(container, watchedContainerSelector.name);
                }
            }
        }
    }
});
containerMO.observe(document.documentElement, {
    childList: true,
    subtree: true,
});
// Loosely inspired by
// https://drafts.csswg.org/css-syntax/#parser-diagrams
export function transpileStyleSheet(sheetSrc, srcUrl) {
    const p = {
        sheetSrc,
        index: 0,
        name: srcUrl,
    };
    // if (sheetSrc.includes('__vite__')) return p.sheetSrc;
    while (p.index < p.sheetSrc.length) {
        eatWhitespace(p);
        if (p.index >= p.sheetSrc.length)
            break;
        if (lookAhead('/*', p)) {
            while (lookAhead('/*', p)) {
                eatComment(p);
                eatWhitespace(p);
            }
            continue;
        }
        if (lookAhead('@container', p)) {
            const { query, startIndex, endIndex } = parseContainerQuery(p);
            const replacement = stringifyContainerQuery(query);
            replacePart(startIndex, endIndex, replacement, p);
            registerContainerQuery(query);
        }
        else {
            const rule = parseQualifiedRule(p);
            if (!rule)
                continue;
            handleContainerProps(rule, p);
        }
    }
    // If this sheet has no srcURL (like from a <style> tag), we are
    // done. Otherwise, we have to find `url()` functions and resolve
    // relative and path-absolute URLs to absolute URLs.
    if (!srcUrl) {
        return p.sheetSrc;
    }
    p.sheetSrc = p.sheetSrc.replace(/url\(["']*([^)"']+)["']*\)/g, (match, url) => {
        return `url(${new URL(url, srcUrl)})`;
    });
    return p.sheetSrc;
}
function handleContainerProps(rule, p) {
    var _a, _b;
    const hasLongHand = rule.block.contents.includes('container-');
    const hasShortHand = rule.block.contents.includes('container:');
    if (!hasLongHand && !hasShortHand)
        return;
    let containerName, containerType;
    if (hasLongHand) {
        containerName = (_a = /container-name\s*:([^;}]+)/
            .exec(rule.block.contents)) === null || _a === void 0 ? void 0 : _a[1].trim();
        rule.block.contents = rule.block.contents.replace('container-type', 'contain');
    }
    if (hasShortHand) {
        const containerShorthand = (_b = /container\s*:([^;}]+)/.exec(rule.block.contents)) === null || _b === void 0 ? void 0 : _b[1];
        [containerType, containerName] = containerShorthand
            .split('/')
            .map((v) => v.trim());
        rule.block.contents = rule.block.contents.replace(/container: ([^;}]+)/, `contain: ${containerType};`);
    }
    if (!containerName) {
        containerName = uid();
    }
    replacePart(rule.block.startIndex, rule.block.endIndex, rule.block.contents, p);
    watchedContainerSelectors.push({
        name: containerName,
        selector: rule.selector,
    });
    for (const el of document.querySelectorAll(rule.selector)) {
        registerContainer(el, containerName);
    }
}
function replacePart(start, end, replacement, p) {
    p.sheetSrc =
        p.sheetSrc.slice(0, start) + replacement + p.sheetSrc.slice(end);
    // If we are pointing past the end of the affected section, we need to
    // recalculate the string pointer. Pointing to something inside the section
    // that’s being replaced is undefined behavior. Sue me.
    if (p.index >= end) {
        const delta = p.index - end;
        p.index = start + replacement.length + delta;
    }
}
function eatComment(p) {
    assertString(p, '/*');
    eatUntil('*/', p);
    assertString(p, '*/');
}
function advance(p) {
    p.index++;
    if (p.index > p.sheetSrc.length) {
        console.log(p);
        throw parseError(p, 'Advanced beyond the end');
    }
}
function eatUntil(s, p) {
    const startIndex = p.index;
    while (!lookAhead(s, p)) {
        advance(p);
    }
    return p.sheetSrc.slice(startIndex, p.index);
}
function lookAhead(s, p) {
    return p.sheetSrc.substr(p.index, s.length) == s;
}
function parseSelector(p) {
    let startIndex = p.index;
    eatUntil('{', p);
    if (startIndex === p.index) {
        throw Error('Empty selector');
    }
    return p.sheetSrc.slice(startIndex, p.index);
}
function parseQualifiedRule(p) {
    const startIndex = p.index;
    const selector = parseSelector(p);
    if (!selector)
        return;
    const block = eatBlock(p);
    const endIndex = p.index;
    return {
        selector,
        block,
        startIndex,
        endIndex,
    };
}
function fileName(p) {
    if (p.name) {
        return p.name;
    }
    return '<anonymous file>';
}
function parseError(p, msg) {
    return Error(`(${fileName(p)}): ${msg}`);
}
function assertString(p, s) {
    if (p.sheetSrc.substr(p.index, s.length) != s) {
        throw parseError(p, `Did not find expected sequence ${s}`);
    }
    p.index += s.length;
}
const whitespaceMatcher = /\s*/g;
function eatWhitespace(p) {
    // Start matching at the current position in the sheet src
    whitespaceMatcher.lastIndex = p.index;
    const match = whitespaceMatcher.exec(p.sheetSrc);
    if (match) {
        p.index += match[0].length;
    }
}
function peek(p) {
    return p.sheetSrc[p.index];
}
const identMatcher = /[\w\\\@_-]+/g;
function parseIdentifier(p) {
    identMatcher.lastIndex = p.index;
    const match = identMatcher.exec(p.sheetSrc);
    if (!match) {
        throw parseError(p, 'Expected an identifier');
    }
    p.index += match[0].length;
    return match[0];
}
function parseMeasurementName(p) {
    return parseIdentifier(p).toLowerCase();
}
const numberMatcher = /[0-9.]*/g;
function parseThreshold(p) {
    numberMatcher.lastIndex = p.index;
    const match = numberMatcher.exec(p.sheetSrc);
    if (!match) {
        throw parseError(p, 'Expected a number');
    }
    p.index += match[0].length;
    // TODO: Support other units?
    assertString(p, 'px');
    const value = parseFloat(match[0]);
    if (Number.isNaN(value)) {
        throw parseError(p, `${match[0]} is not a valid number`);
    }
    return value;
}
function eatBlock(p) {
    const startIndex = p.index;
    assertString(p, '{');
    let level = 1;
    while (level != 0) {
        if (p.sheetSrc[p.index] === '{') {
            level++;
        }
        else if (p.sheetSrc[p.index] === '}') {
            level--;
        }
        advance(p);
    }
    const endIndex = p.index;
    const contents = p.sheetSrc.slice(startIndex, endIndex);
    return { startIndex, endIndex, contents };
}
function parseLegacySizeQuery(p) {
    const measurement = parseMeasurementName(p);
    eatWhitespace(p);
    assertString(p, ':');
    eatWhitespace(p);
    const threshold = parseThreshold(p);
    eatWhitespace(p);
    assertString(p, ')');
    eatWhitespace(p);
    let comparator;
    if (measurement.startsWith('min-')) {
        comparator = Comparator.GREATER_OR_EQUAL;
    }
    else if (measurement.startsWith('max-')) {
        comparator = Comparator.LESS_OR_EQUAL;
    }
    else {
        throw Error(`Unknown legacy container query ${measurement}`);
    }
    return {
        type: ContainerConditionType.SizeQuery,
        feature: translateToLogicalProp(measurement.slice(4)),
        comparator,
        threshold,
    };
}
function parseComparator(p) {
    if (lookAhead('>=', p)) {
        assertString(p, '>=');
        return Comparator.GREATER_OR_EQUAL;
    }
    if (lookAhead('>', p)) {
        assertString(p, '>');
        return Comparator.GREATER_THAN;
    }
    if (lookAhead('<=', p)) {
        assertString(p, '<=');
        return Comparator.LESS_OR_EQUAL;
    }
    if (lookAhead('<', p)) {
        assertString(p, '<');
        return Comparator.LESS_THAN;
    }
    throw Error(`Unknown comparator`);
}
function parseSizeQuery(p) {
    assertString(p, '(');
    if (lookAhead('(', p)) {
        const cond = parseContainerCondition(p);
        assertString(p, ')');
        return cond;
    }
    eatWhitespace(p);
    if (lookAhead('min-', p) || lookAhead('max-', p)) {
        return parseLegacySizeQuery(p);
    }
    const feature = parseIdentifier(p).toLowerCase();
    eatWhitespace(p);
    const comparator = parseComparator(p);
    eatWhitespace(p);
    const threshold = parseThreshold(p);
    eatWhitespace(p);
    assertString(p, ')');
    eatWhitespace(p);
    return {
        type: ContainerConditionType.SizeQuery,
        feature,
        comparator,
        threshold,
    };
}
function parseSizeOrStyleQuery(p) {
    eatWhitespace(p);
    if (lookAhead('(', p))
        return parseSizeQuery(p);
    else if (lookAhead('size', p)) {
        assertString(p, 'size');
        eatWhitespace(p);
        return parseSizeQuery(p);
    }
    else if (lookAhead('style', p)) {
        throw Error(`Style query not implement yet`);
    }
    else {
        throw Error(`Unknown container query type`);
    }
}
function parseNegatedContainerCondition(p) {
    if (lookAhead('not', p)) {
        assertString(p, 'not');
        eatWhitespace(p);
        return {
            type: ContainerConditionType.ContainerConditionNegation,
            right: parseSizeOrStyleQuery(p),
        };
    }
    return parseSizeOrStyleQuery(p);
}
function parseContainerCondition(p) {
    let left = parseNegatedContainerCondition(p);
    while (true) {
        if (lookAhead('and', p)) {
            assertString(p, 'and');
            eatWhitespace(p);
            const right = parseNegatedContainerCondition(p);
            eatWhitespace(p);
            left = {
                type: ContainerConditionType.ContainerConditionConjunction,
                left,
                right,
            };
        }
        else if (lookAhead('or', p)) {
            assertString(p, 'or');
            eatWhitespace(p);
            const right = parseNegatedContainerCondition(p);
            eatWhitespace(p);
            left = {
                type: ContainerConditionType.ContainerConditionDisjunction,
                left,
                right,
            };
        }
        else {
            break;
        }
    }
    return left;
}
function parseContainerQuery(p) {
    const startIndex = p.index;
    assertString(p, '@container');
    eatWhitespace(p);
    let name = '';
    if (peek(p) !== '(' && !lookAhead('size', p) && !lookAhead('style', p)) {
        name = parseIdentifier(p);
        eatWhitespace(p);
    }
    const condition = parseContainerCondition(p);
    eatWhitespace(p);
    assertString(p, '{');
    eatWhitespace(p);
    const rules = [];
    while (peek(p) !== '}') {
        rules.push(parseQualifiedRule(p));
        eatWhitespace(p);
    }
    assertString(p, '}');
    const endIndex = p.index;
    eatWhitespace(p);
    const className = `cq_${uid()}`;
    return {
        query: {
            condition,
            className,
            name,
            rules,
        },
        startIndex,
        endIndex,
    };
}
function stringifyContainerQuery(query) {
    return query.rules
        .map((rule) => `:is(${rule.selector}).${query.className} ${rule.block.contents}`)
        .join('\n');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztHQVdHO0FBRUgsSUFBVyxVQUtWO0FBTEQsV0FBVyxVQUFVO0lBQ2pCLHFEQUFTLENBQUE7SUFDVCw2REFBYSxDQUFBO0lBQ2IsMkRBQVksQ0FBQTtJQUNaLG1FQUFnQixDQUFBO0FBQ3BCLENBQUMsRUFMVSxVQUFVLEtBQVYsVUFBVSxRQUtwQjtBQTBCRCxJQUFLLHNCQUtKO0FBTEQsV0FBSyxzQkFBc0I7SUFDdkIsNkVBQVMsQ0FBQTtJQUNULHFIQUE2QixDQUFBO0lBQzdCLHFIQUE2QixDQUFBO0lBQzdCLCtHQUEwQixDQUFBO0FBQzlCLENBQUMsRUFMSSxzQkFBc0IsS0FBdEIsc0JBQXNCLFFBSzFCO0FBZUQsU0FBUyxHQUFHO0lBQ1IsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUNuQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQy9DLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ2YsQ0FBQztBQUVELFNBQVMsc0JBQXNCLENBQUMsT0FBZTtJQUMzQyxRQUFRLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRTtRQUMzQixLQUFLLFlBQVk7WUFDYixPQUFPLFlBQVksQ0FBQztRQUN4QixLQUFLLFdBQVc7WUFDWixPQUFPLFdBQVcsQ0FBQztRQUN2QixLQUFLLE9BQU87WUFDUixPQUFPLFlBQVksQ0FBQztRQUN4QixLQUFLLFFBQVE7WUFDVCxPQUFPLFdBQVcsQ0FBQztRQUN2QjtZQUNJLE1BQU0sS0FBSyxDQUFDLHdCQUF3QixPQUFPLHFCQUFxQixDQUFDLENBQUM7S0FDekU7QUFDTCxDQUFDO0FBRUQsU0FBUyxv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