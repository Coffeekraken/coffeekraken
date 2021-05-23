// @ts-nocheck
import { doc } from 'prettier';
import { findLastIndex } from './helpers';
export function isLine(docToCheck) {
    return (docToCheck === doc.builders.hardline ||
        (typeof docToCheck === 'object' && docToCheck.type === 'line') ||
        (typeof docToCheck === 'object' &&
            docToCheck.type === 'concat' &&
            docToCheck.parts.every(isLine)));
}
/**
 * Check if the doc is empty, i.e. consists of nothing more than empty strings (possibly nested).
 */
export function isEmptyDoc(doc) {
    if (typeof doc === 'string') {
        return doc.length === 0;
    }
    if (doc.type === 'line') {
        return !doc.keepIfLonely;
    }
    // Since Prettier 2.3.0, concats are represented as flat arrays
    if (Array.isArray(doc)) {
        return doc.length === 0;
    }
    const { contents } = doc;
    if (contents) {
        return isEmptyDoc(contents);
    }
    const { parts } = doc;
    if (parts) {
        return isEmptyGroup(parts);
    }
    return false;
}
export function isEmptyGroup(group) {
    return !group.find((doc) => !isEmptyDoc(doc));
}
/**
 * Trims both leading and trailing nodes matching `isWhitespace` independent of nesting level
 * (though all trimmed adjacent nodes need to be a the same level). Modifies the `docs` array.
 */
export function trim(docs, isWhitespace) {
    trimLeft(docs, isWhitespace);
    trimRight(docs, isWhitespace);
    return docs;
}
/**
 * Trims the leading nodes matching `isWhitespace` independent of nesting level (though all nodes need to be a the same level).
 * If there are empty docs before the first whitespace, they are removed, too.
 */
export function trimLeft(group, isWhitespace) {
    let firstNonWhitespace = group.findIndex((doc) => !isEmptyDoc(doc) && !isWhitespace(doc));
    if (firstNonWhitespace < 0 && group.length) {
        firstNonWhitespace = group.length;
    }
    if (firstNonWhitespace > 0) {
        const removed = group.splice(0, firstNonWhitespace);
        if (removed.every(isEmptyDoc)) {
            return trimLeft(group, isWhitespace);
        }
    }
    else {
        const parts = getParts(group[0]);
        if (parts) {
            return trimLeft(parts, isWhitespace);
        }
    }
}
/**
 * Trims the trailing nodes matching `isWhitespace` independent of nesting level (though all nodes need to be a the same level).
 * If there are empty docs after the last whitespace, they are removed, too.
 */
export function trimRight(group, isWhitespace) {
    let lastNonWhitespace = group.length
        ? findLastIndex((doc) => !isEmptyDoc(doc) && !isWhitespace(doc), group)
        : 0;
    if (lastNonWhitespace < group.length - 1) {
        const removed = group.splice(lastNonWhitespace + 1);
        if (removed.every(isEmptyDoc)) {
            return trimRight(group, isWhitespace);
        }
    }
    else {
        const parts = getParts(group[group.length - 1]);
        if (parts) {
            return trimRight(parts, isWhitespace);
        }
    }
}
function getParts(doc) {
    if (typeof doc === 'object') {
        // Since Prettier 2.3.0, concats are represented as flat arrays
        if (Array.isArray(doc)) {
            return doc;
        }
        if (doc.type === 'fill' || doc.type === 'concat') {
            return doc.parts;
        }
        if (doc.type === 'group') {
            return getParts(doc.contents);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jLWhlbHBlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkb2MtaGVscGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxFQUFPLEdBQUcsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNwQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRTFDLE1BQU0sVUFBVSxNQUFNLENBQUMsVUFBZTtJQUNwQyxPQUFPLENBQ0wsVUFBVSxLQUFLLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUTtRQUNwQyxDQUFDLE9BQU8sVUFBVSxLQUFLLFFBQVEsSUFBSSxVQUFVLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQztRQUM5RCxDQUFDLE9BQU8sVUFBVSxLQUFLLFFBQVE7WUFDN0IsVUFBVSxDQUFDLElBQUksS0FBSyxRQUFRO1lBQzVCLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQ2xDLENBQUM7QUFDSixDQUFDO0FBRUQ7O0dBRUc7QUFDSCxNQUFNLFVBQVUsVUFBVSxDQUFDLEdBQVE7SUFDakMsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUU7UUFDM0IsT0FBTyxHQUFHLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztLQUN6QjtJQUVELElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUU7UUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUM7S0FDMUI7SUFFRCwrREFBK0Q7SUFDL0QsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ3RCLE9BQU8sR0FBRyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7S0FDekI7SUFFRCxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsR0FBeUIsQ0FBQztJQUUvQyxJQUFJLFFBQVEsRUFBRTtRQUNaLE9BQU8sVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQzdCO0lBRUQsTUFB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