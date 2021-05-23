// @ts-nocheck

import { Doc, doc } from 'prettier';
import { findLastIndex } from './helpers';

export function isLine(docToCheck: Doc): boolean {
  return (
    docToCheck === doc.builders.hardline ||
    (typeof docToCheck === 'object' && docToCheck.type === 'line') ||
    (typeof docToCheck === 'object' &&
      docToCheck.type === 'concat' &&
      docToCheck.parts.every(isLine))
  );
}

/**
 * Check if the doc is empty, i.e. consists of nothing more than empty strings (possibly nested).
 */
export function isEmptyDoc(doc: Doc): boolean {
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

  const { contents } = doc as { contents?: Doc };

  if (contents) {
    return isEmptyDoc(contents);
  }

  const { parts } = doc as { parts?: Doc[] };

  if (parts) {
    return isEmptyGroup(parts);
  }

  return false;
}

export function isEmptyGroup(group: Doc[]): boolean {
  return !group.find((doc) => !isEmptyDoc(doc));
}

/**
 * Trims both leading and trailing nodes matching `isWhitespace` independent of nesting level
 * (though all trimmed adjacent nodes need to be a the same level). Modifies the `docs` array.
 */
export function trim(docs: Doc[], isWhitespace: (doc: Doc) => boolean): Doc[] {
  trimLeft(docs, isWhitespace);
  trimRight(docs, isWhitespace);

  return docs;
}

/**
 * Trims the leading nodes matching `isWhitespace` independent of nesting level (though all nodes need to be a the same level).
 * If there are empty docs before the first whitespace, they are removed, too.
 */
export function trimLeft(
  group: Doc[],
  isWhitespace: (doc: Doc) => boolean
): void {
  let firstNonWhitespace = group.findIndex(
    (doc) => !isEmptyDoc(doc) && !isWhitespace(doc)
  );

  if (firstNonWhitespace < 0 && group.length) {
    firstNonWhitespace = group.length;
  }

  if (firstNonWhitespace > 0) {
    const removed = group.splice(0, firstNonWhitespace);
    if (removed.every(isEmptyDoc)) {
      return trimLeft(group, isWhitespace);
    }
  } else {
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
export function trimRight(
  group: Doc[],
  isWhitespace: (doc: Doc) => boolean
): void {
  let lastNonWhitespace = group.length
    ? findLastIndex((doc) => !isEmptyDoc(doc) && !isWhitespace(doc), group)
    : 0;

  if (lastNonWhitespace < group.length - 1) {
    const removed = group.splice(lastNonWhitespace + 1);
    if (removed.every(isEmptyDoc)) {
      return trimRight(group, isWhitespace);
    }
  } else {
    const parts = getParts(group[group.length - 1]);

    if (parts) {
      return trimRight(parts, isWhitespace);
    }
  }
}

function getParts(doc: Doc): Doc[] | undefined {
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
