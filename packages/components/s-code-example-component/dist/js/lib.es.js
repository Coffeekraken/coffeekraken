import __SComponentUtils, {SComponentUtilsDefaultInterface, SLitElement} from "@coffeekraken/s-component-utils";
import {css, unsafeCSS, html, property, query, queryAssignedNodes} from "lit-element";
import {webcomponent as webcomponent$1} from "@coffeekraken/s-clipboard-copy-component";
import __SInterface from "@coffeekraken/s-interface";
function wait(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeout);
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
function source$1(re) {
  if (!re)
    return null;
  if (typeof re === "string")
    return re;
  return re.source;
}
function lookahead$1(re) {
  return concat$1("(?=", re, ")");
}
function concat$1(...args) {
  const joined = args.map((x) => source$1(x)).join("");
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
  const joined = "(" + (opts.capture ? "" : "?:") + args.map((x) => source$1(x)).join("|") + ")";
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
    let re = source$1(regex);
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
    opts.begin = concat$1(beginShebang, /.*\b/, opts.binary, /\b.*/);
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
  const ENGLISH_WORD = either("I", "a", "is", "so", "us", "to", "at", "if", "in", "it", "on", /[A-Za-z]+['](d|ve|re|ll|t|s|n)/, /[A-Za-z]+[-][a-z]+/, /[A-Za-z][a-z]{2,}/);
  mode.contains.push({
    begin: concat$1(/[ ]+/, "(", ENGLISH_WORD, /[.]?[:]?([.][ ]|[ ])/, "){3}")
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
var MODES = /* @__PURE__ */ Object.freeze({
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
  mode.illegal = either(...mode.illegal);
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
  mode.begin = concat$1(originalMode.beforeMatch, lookahead$1(originalMode.begin));
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
    return new RegExp(source$1(value), "m" + (language.case_insensitive ? "i" : "") + (global ? "g" : ""));
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
      cmode.terminatorEnd = source$1(mode.end) || "";
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
  for (const key in MODES) {
    if (typeof MODES[key] === "object") {
      deepFreeze$1(MODES[key]);
    }
  }
  Object.assign(hljs, MODES);
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
function javascript(hljs) {
  const hasClosingTag = (match, {after}) => {
    const tag = "</" + match[0].slice(1);
    const pos = match.input.indexOf(tag, after);
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
          concat(IDENT_RE$12, "(", concat(/\./, IDENT_RE$12), ")*")
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
    return concat("(?!", list.join("|"), ")");
  }
  const FUNCTION_CALL = {
    match: concat(/\b/, noneOf([
      ...BUILT_IN_GLOBALS,
      "super"
    ]), IDENT_RE$12, lookahead(/\(/)),
    className: "title.function",
    relevance: 0
  };
  const PROPERTY_ACCESS = {
    begin: concat(/\./, lookahead(concat(IDENT_RE$12, /(?![0-9A-Za-z$_(])/))),
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
      lookahead(FUNC_LEAD_IN_RE)
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
        begin: IDENT_RE$12 + lookahead(":"),
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
var __css = `.hljs {
    display: block;
    overflow: hidden;
    padding: var(--s-theme-space-30, 24px);
    background-color: hsla(calc(var(--s-theme-color-ui-h, 0) + var(--s-theme-color-ui-surface-spin ,0)),calc((var(--s-theme-color-ui-s, 0) + var(--s-theme-color-ui-surface-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-ui-l, 0) + var(--s-theme-color-ui-surface-lightness-offset, 0)) * 1%),var(--s-theme-color-ui-surface-a, 1));
    color: hsla(calc(var(--s-theme-color-ui-h, 0) + var(--s-theme-color-ui-surfaceForeground-spin ,0)),calc((var(--s-theme-color-ui-s, 0) + var(--s-theme-color-ui-surfaceForeground-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-ui-l, 0) + var(--s-theme-color-ui-surfaceForeground-lightness-offset, 0)) * 1%),var(--s-theme-color-ui-surfaceForeground-a, 1));
    line-height: 1.5 !important;
}

    .hljs,
    .hljs.hljs-subst {
        color: hsla(calc(var(--s-theme-color-ui-h, 0) + var(--s-theme-color-ui-surfaceForeground-spin ,0)),calc((var(--s-theme-color-ui-s, 0) + var(--s-theme-color-ui-surfaceForeground-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-ui-l, 0) + var(--s-theme-color-ui-surfaceForeground-lightness-offset, 0)) * 1%),var(--s-theme-color-ui-surfaceForeground-a, 1));
    }

    .hljs .hljs-selector-tag {
        color: hsla(calc(var(--s-theme-color-accent-h, 0) + var(--s-theme-color-accent-spin ,340)),calc((var(--s-theme-color-accent-s, 0) + var(--s-theme-color-accent-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-accent-l, 0) + var(--s-theme-color-accent-lightness-offset, 0)) * 1%),var(--s-theme-color-accent-a, 1));
    }

    .hljs .hljs-selector-id {
        color: hsla(calc(var(--s-theme-color-info-h, 0) + var(--s-theme-color-info-spin ,0)),calc((var(--s-theme-color-info-s, 0) + var(--s-theme-color-info-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-info-l, 0) + var(--s-theme-color-info-lightness-offset, 0)) * 1%),var(--s-theme-color-info-a, 1));
        font-weight: bold;
    }

    .hljs .hljs-selector-class {
        color: hsla(calc(var(--s-theme-color-info-h, 0) + var(--s-theme-color-info-spin ,0)),calc((var(--s-theme-color-info-s, 0) + var(--s-theme-color-info-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-info-l, 0) + var(--s-theme-color-info-lightness-offset, 0)) * 1%),var(--s-theme-color-info-a, 1));
    }

    .hljs .hljs-selector-attr {
        color: hsla(calc(var(--s-theme-color-info-h, 0) + var(--s-theme-color-info-spin ,0)),calc((var(--s-theme-color-info-s, 0) + var(--s-theme-color-info-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-info-l, 0) + var(--s-theme-color-info-lightness-offset, 0)) * 1%),var(--s-theme-color-info-a, 1));
    }

    .hljs .hljs-selector-pseudo {
        color: #88C0D0;
    }

    .hljs .hljs-addition {
        background-color: rgba(163, 190, 140, 0.5);
    }

    .hljs .hljs-deletion {
        background-color: rgba(191, 97, 106, 0.5);
    }

    .hljs .hljs-built_in,
    .hljs .hljs-type {
        color: hsla(calc(var(--s-theme-color-info-h, 0) + var(--s-theme-color-info-spin ,0)),calc((var(--s-theme-color-info-s, 0) + var(--s-theme-color-info-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-info-l, 0) + var(--s-theme-color-info-lightness-offset, 0)) * 1%),var(--s-theme-color-info-a, 1));
    }

    .hljs .hljs-class {
        color: hsla(calc(var(--s-theme-color-info-h, 0) + var(--s-theme-color-info-spin ,0)),calc((var(--s-theme-color-info-s, 0) + var(--s-theme-color-info-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-info-l, 0) + var(--s-theme-color-info-lightness-offset, 0)) * 1%),var(--s-theme-color-info-a, 1));
    }

    .hljs .hljs-function {
        color: #88C0D0;
    }

    .hljs .hljs-function > .hljs-title {
        color: #88C0D0;
    }

    .hljs .hljs-keyword,
    .hljs .hljs-literal,
    .hljs .hljs-symbol {
        color: hsla(calc(var(--s-theme-color-accent-h, 0) + var(--s-theme-color-accent-spin ,340)),calc((var(--s-theme-color-accent-s, 0) + var(--s-theme-color-accent-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-accent-l, 0) + var(--s-theme-color-accent-lightness-offset, 0)) * 1%),var(--s-theme-color-accent-a, 1));
    }

    .hljs .hljs-number {
        color: #B48EAD;
    }

    .hljs .hljs-regexp {
        color: hsla(calc(var(--s-theme-color-accent-h, 0) + var(--s-theme-color-accent-spin ,0)),calc((var(--s-theme-color-accent-s, 0) + var(--s-theme-color-accent-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-accent-l, 0) + var(--s-theme-color-accent-lightness-offset, 0)) * 1%),var(--s-theme-color-accent-a, 1));
    }

    .hljs .hljs-string {
        color: hsla(calc(var(--s-theme-color-accent-h, 0) + var(--s-theme-color-accent-spin ,0)),calc((var(--s-theme-color-accent-s, 0) + var(--s-theme-color-accent-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-accent-l, 0) + var(--s-theme-color-accent-lightness-offset, 0)) * 1%),var(--s-theme-color-accent-a, 1));
    }

    .hljs .hljs-title {
        color: hsla(calc(var(--s-theme-color-info-h, 0) + var(--s-theme-color-info-spin ,0)),calc((var(--s-theme-color-info-s, 0) + var(--s-theme-color-info-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-info-l, 0) + var(--s-theme-color-info-lightness-offset, 0)) * 1%),var(--s-theme-color-info-a, 1));
    }

    .hljs .hljs-params {
        color: hsla(calc(var(--s-theme-color-text-h, 0) + var(--s-theme-color-text-spin ,0)),calc((var(--s-theme-color-text-s, 0) + var(--s-theme-color-text-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-text-l, 0) + var(--s-theme-color-text-lightness-offset, 0)) * 1%),var(--s-theme-color-text-a, 1));
    }

    .hljs .hljs-bullet {
        color: hsla(calc(var(--s-theme-color-accent-h, 0) + var(--s-theme-color-accent-spin ,340)),calc((var(--s-theme-color-accent-s, 0) + var(--s-theme-color-accent-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-accent-l, 0) + var(--s-theme-color-accent-lightness-offset, 0)) * 1%),var(--s-theme-color-accent-a, 1));
    }

    .hljs .hljs-code {
        color: hsla(calc(var(--s-theme-color-info-h, 0) + var(--s-theme-color-info-spin ,0)),calc((var(--s-theme-color-info-s, 0) + var(--s-theme-color-info-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-info-l, 0) + var(--s-theme-color-info-lightness-offset, 0)) * 1%),var(--s-theme-color-info-a, 1));
    }

    .hljs .hljs-emphasis {
        font-style: italic;
    }

    .hljs .hljs-formula {
        color: hsla(calc(var(--s-theme-color-info-h, 0) + var(--s-theme-color-info-spin ,0)),calc((var(--s-theme-color-info-s, 0) + var(--s-theme-color-info-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-info-l, 0) + var(--s-theme-color-info-lightness-offset, 0)) * 1%),var(--s-theme-color-info-a, 1));
    }

    .hljs .hljs-strong {
        font-weight: bold;
    }

    .hljs .hljs-link:hover {
        text-decoration: underline;
    }

    .hljs .hljs-quote {
        color: hsla(calc(var(--s-theme-color-ui-h, 0) + var(--s-theme-color-ui-30-spin ,0)),calc((var(--s-theme-color-ui-s, 0) + var(--s-theme-color-ui-30-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-ui-l, 0) + var(--s-theme-color-ui-30-lightness-offset, 0)) * 1%),var(--s-theme-color-ui-30-a, 1));
    }

    .hljs .hljs-comment {
        color: hsla(calc(var(--s-theme-color-ui-h, 0) + var(--s-theme-color-ui-30-spin ,0)),calc((var(--s-theme-color-ui-s, 0) + var(--s-theme-color-ui-30-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-ui-l, 0) + var(--s-theme-color-ui-30-lightness-offset, 0)) * 1%),var(--s-theme-color-ui-30-a, 1));
    }

    .hljs .hljs-doctag {
        color: hsla(calc(var(--s-theme-color-info-h, 0) + var(--s-theme-color-info-spin ,0)),calc((var(--s-theme-color-info-s, 0) + var(--s-theme-color-info-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-info-l, 0) + var(--s-theme-color-info-lightness-offset, 0)) * 1%),var(--s-theme-color-info-a, 1));
    }

    .hljs .hljs-meta,
    .hljs .hljs-meta-keyword {
        color: #5E81AC;
    }

    .hljs .hljs-meta-string {
        color: hsla(calc(var(--s-theme-color-accent-h, 0) + var(--s-theme-color-accent-spin ,0)),calc((var(--s-theme-color-accent-s, 0) + var(--s-theme-color-accent-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-accent-l, 0) + var(--s-theme-color-accent-lightness-offset, 0)) * 1%),var(--s-theme-color-accent-a, 1));
    }

    .hljs .hljs-attr {
        color: hsla(calc(var(--s-theme-color-info-h, 0) + var(--s-theme-color-info-spin ,0)),calc((var(--s-theme-color-info-s, 0) + var(--s-theme-color-info-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-info-l, 0) + var(--s-theme-color-info-lightness-offset, 0)) * 1%),var(--s-theme-color-info-a, 1));
    }

    .hljs .hljs-attribute {
        color: hsla(calc(var(--s-theme-color-text-h, 0) + var(--s-theme-color-text-30-spin ,0)),calc((var(--s-theme-color-text-s, 0) + var(--s-theme-color-text-30-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-text-l, 0) + var(--s-theme-color-text-30-lightness-offset, 0)) * 1%),var(--s-theme-color-text-30-a, 1));
    }

    .hljs .hljs-builtin-name {
        color: hsla(calc(var(--s-theme-color-accent-h, 0) + var(--s-theme-color-accent-spin ,340)),calc((var(--s-theme-color-accent-s, 0) + var(--s-theme-color-accent-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-accent-l, 0) + var(--s-theme-color-accent-lightness-offset, 0)) * 1%),var(--s-theme-color-accent-a, 1));
    }

    .hljs .hljs-name {
        color: hsla(calc(var(--s-theme-color-accent-h, 0) + var(--s-theme-color-accent-spin ,340)),calc((var(--s-theme-color-accent-s, 0) + var(--s-theme-color-accent-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-accent-l, 0) + var(--s-theme-color-accent-lightness-offset, 0)) * 1%),var(--s-theme-color-accent-a, 1));
    }

    .hljs .hljs-section {
        color: #88C0D0;
    }

    .hljs .hljs-tag {
        color: hsla(calc(var(--s-theme-color-accent-h, 0) + var(--s-theme-color-accent-spin ,340)),calc((var(--s-theme-color-accent-s, 0) + var(--s-theme-color-accent-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-accent-l, 0) + var(--s-theme-color-accent-lightness-offset, 0)) * 1%),var(--s-theme-color-accent-a, 1));
    }

    .hljs .hljs-variable {
        color: hsla(calc(var(--s-theme-color-text-h, 0) + var(--s-theme-color-text-spin ,0)),calc((var(--s-theme-color-text-s, 0) + var(--s-theme-color-text-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-text-l, 0) + var(--s-theme-color-text-lightness-offset, 0)) * 1%),var(--s-theme-color-text-a, 1));
    }

    .hljs .hljs-template-variable {
        color: hsla(calc(var(--s-theme-color-text-h, 0) + var(--s-theme-color-text-spin ,0)),calc((var(--s-theme-color-text-s, 0) + var(--s-theme-color-text-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-text-l, 0) + var(--s-theme-color-text-lightness-offset, 0)) * 1%),var(--s-theme-color-text-a, 1));
    }

    .hljs .hljs-template-tag {
        color: #5E81AC;
    }

    .hljs.abnf .hljs-attribute {
        color: #88C0D0;
    }

    .hljs.abnf .hljs-symbol {
        color: hsla(calc(var(--s-theme-color-accent-h, 0) + var(--s-theme-color-accent-spin ,0)),calc((var(--s-theme-color-accent-s, 0) + var(--s-theme-color-accent-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-accent-l, 0) + var(--s-theme-color-accent-lightness-offset, 0)) * 1%),var(--s-theme-color-accent-a, 1));
    }

    .hljs.apache .hljs-attribute {
        color: #88C0D0;
    }

    .hljs.apache .hljs-section {
        color: hsla(calc(var(--s-theme-color-accent-h, 0) + var(--s-theme-color-accent-spin ,340)),calc((var(--s-theme-color-accent-s, 0) + var(--s-theme-color-accent-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-accent-l, 0) + var(--s-theme-color-accent-lightness-offset, 0)) * 1%),var(--s-theme-color-accent-a, 1));
    }

    .hljs.arduino .hljs-built_in {
        color: #88C0D0;
    }

    .hljs.aspectj .hljs-meta {
        color: #D08770;
    }

    .hljs.aspectj > .hljs-title {
        color: #88C0D0;
    }

    .hljs.bnf .hljs-attribute {
        color: hsla(calc(var(--s-theme-color-info-h, 0) + var(--s-theme-color-info-spin ,0)),calc((var(--s-theme-color-info-s, 0) + var(--s-theme-color-info-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-info-l, 0) + var(--s-theme-color-info-lightness-offset, 0)) * 1%),var(--s-theme-color-info-a, 1));
    }

    .hljs.clojure .hljs-name {
        color: #88C0D0;
    }

    .hljs.clojure .hljs-symbol {
        color: hsla(calc(var(--s-theme-color-accent-h, 0) + var(--s-theme-color-accent-spin ,0)),calc((var(--s-theme-color-accent-s, 0) + var(--s-theme-color-accent-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-accent-l, 0) + var(--s-theme-color-accent-lightness-offset, 0)) * 1%),var(--s-theme-color-accent-a, 1));
    }

    .hljs.coq .hljs-built_in {
        color: #88C0D0;
    }

    .hljs.cpp .hljs-meta-string {
        color: hsla(calc(var(--s-theme-color-info-h, 0) + var(--s-theme-color-info-spin ,0)),calc((var(--s-theme-color-info-s, 0) + var(--s-theme-color-info-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-info-l, 0) + var(--s-theme-color-info-lightness-offset, 0)) * 1%),var(--s-theme-color-info-a, 1));
    }

    .hljs.css .hljs-built_in {
        color: #88C0D0;
    }

    .hljs.css .hljs-keyword {
        color: #D08770;
    }

    .hljs.diff .hljs-meta {
        color: hsla(calc(var(--s-theme-color-info-h, 0) + var(--s-theme-color-info-spin ,0)),calc((var(--s-theme-color-info-s, 0) + var(--s-theme-color-info-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-info-l, 0) + var(--s-theme-color-info-lightness-offset, 0)) * 1%),var(--s-theme-color-info-a, 1));
    }

    .hljs.ebnf .hljs-attribute {
        color: hsla(calc(var(--s-theme-color-info-h, 0) + var(--s-theme-color-info-spin ,0)),calc((var(--s-theme-color-info-s, 0) + var(--s-theme-color-info-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-info-l, 0) + var(--s-theme-color-info-lightness-offset, 0)) * 1%),var(--s-theme-color-info-a, 1));
    }

    .hljs.glsl .hljs-built_in {
        color: #88C0D0;
    }

    .hljs.groovy .hljs-meta:not(:first-child) {
        color: #D08770;
    }

    .hljs.haxe .hljs-meta {
        color: #D08770;
    }

    .hljs.java .hljs-meta {
        color: #D08770;
    }

    .hljs.ldif .hljs-attribute {
        color: hsla(calc(var(--s-theme-color-info-h, 0) + var(--s-theme-color-info-spin ,0)),calc((var(--s-theme-color-info-s, 0) + var(--s-theme-color-info-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-info-l, 0) + var(--s-theme-color-info-lightness-offset, 0)) * 1%),var(--s-theme-color-info-a, 1));
    }

    .hljs.lisp .hljs-name {
        color: #88C0D0;
    }

    .hljs.lua .hljs-built_in {
        color: #88C0D0;
    }

    .hljs.moonscript .hljs-built_in {
        color: #88C0D0;
    }

    .hljs.nginx .hljs-attribute {
        color: #88C0D0;
    }

    .hljs.nginx .hljs-section {
        color: #5E81AC;
    }

    .hljs.pf .hljs-built_in {
        color: #88C0D0;
    }

    .hljs.processing .hljs-built_in {
        color: #88C0D0;
    }

    .hljs.scss .hljs-keyword {
        color: hsla(calc(var(--s-theme-color-accent-h, 0) + var(--s-theme-color-accent-spin ,340)),calc((var(--s-theme-color-accent-s, 0) + var(--s-theme-color-accent-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-accent-l, 0) + var(--s-theme-color-accent-lightness-offset, 0)) * 1%),var(--s-theme-color-accent-a, 1));
    }

    .hljs.stylus .hljs-keyword {
        color: hsla(calc(var(--s-theme-color-accent-h, 0) + var(--s-theme-color-accent-spin ,340)),calc((var(--s-theme-color-accent-s, 0) + var(--s-theme-color-accent-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-accent-l, 0) + var(--s-theme-color-accent-lightness-offset, 0)) * 1%),var(--s-theme-color-accent-a, 1));
    }

    .hljs.swift .hljs-meta {
        color: #D08770;
    }

    .hljs.vim .hljs-built_in {
        color: #88C0D0;
        font-style: italic;
    }

    .hljs.yaml .hljs-meta {
        color: #D08770;
    }

:host {  
    display: block;
    border-radius: var(--s-theme-ui-code-borderRadius, 6px);
    border: hsla(calc(var(--s-theme-color-ui-h, 0) + var(--s-theme-color-ui-border-spin ,0)),calc((var(--s-theme-color-ui-s, 0) + var(--s-theme-color-ui-border-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-ui-l, 0) + var(--s-theme-color-ui-border-lightness-offset, 0)) * 1%),var(--s-theme-color-ui-border-a, 1)) solid 1px;
    overflow: hidden;

}

.s-rhythm--vertical > :host, :host.s-rhythm--vertical {
            margin-bottom: var(--s-theme-margin-40, 36px);
}

s-code-example:not([ready]) > * {
            display: block;
        }

s-code-example:not([ready]):before {
            display: block;
            content: 'Loading example. Please wait...';
            background: hsla(calc(var(--s-theme-color-ui-h, 0) + var(--s-theme-color-ui-surface-spin ,0)),calc((var(--s-theme-color-ui-s, 0) + var(--s-theme-color-ui-surface-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-ui-l, 0) + var(--s-theme-color-ui-surface-lightness-offset, 0)) * 1%),var(--s-theme-color-ui-surface-a, 1));
            color: hsla(calc(var(--s-theme-color-ui-h, 0) + var(--s-theme-color-ui-surfaceForeground-spin ,0)),calc((var(--s-theme-color-ui-s, 0) + var(--s-theme-color-ui-surfaceForeground-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-ui-l, 0) + var(--s-theme-color-ui-surfaceForeground-lightness-offset, 0)) * 1%),var(--s-theme-color-ui-surfaceForeground-a, 1));
            padding: var(--s-theme-padding-40, 36px);box-shadow: var(--s-theme-depth-100, 0);border-radius: 6px;
        }

  .s-code-example__slot {
    display: none;
  }

  .s-code-example__nav {
    position: relative;
  }

  .s-code-example__tabs {
    display: flex;
    list-style: none;
    border-bottom-left-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
  }
  .s-code-example__tab {

  }

  .s-code-example__content {
    overflow: hidden;
    position: relative;
  }

  .s-code-example__code {
    display: none;
    border-top-left-radius: 0 !important;
    border-top-right-radius: 0 !important;
    overflow: hidden;
    line-height: 0;
  }

  .s-code-example__code[active] {
      display: block;
    }

  .s-code-example__code > code {
      line-height: 1;
    }

  .s-code-example__toolbar {
    position: absolute;
    right: var(--s-theme-space-20, 12px);
    top: var(--s-theme-space-20, 12px);
    z-index: 10;
  }

  .s-code-example__toolbar > * {
      font-size: 20px;
      opacity: 0.5;
    }

  .s-code-example__toolbar > *:hover {
        opacity: 1;
      }

  [toolbar-position="nav"] .s-code-example__toolbar {
      right: var(--s-theme-space-20, 12px);
      top: 50%;
      transform: translate(0, -50%);
    }`;
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
  default: "content"
}, defaultStyleClasses: {
  type: "Object",
  default: {
    main: "s-tabs"
  }
}});
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
core.registerLanguage("javascript", javascript);
webcomponent$1();
class SCodeExample extends SLitElement {
  constructor() {
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
  }
  static get properties() {
    return __SComponentUtils.properties({}, SCodeExampleInterface);
  }
  static get styles() {
    return css`
            ${unsafeCSS(__css)}
        `;
  }
  firstUpdated() {
    this.$templates.forEach(($template) => {
      var _a, _b, _c, _d, _e;
      if (!$template.getAttribute)
        return;
      this._items = [
        ...this._items,
        {
          id: (_c = (_b = (_a = $template.getAttribute("id")) !== null && _a !== void 0 ? _a : $template.getAttribute("language")) !== null && _b !== void 0 ? _b : $template.getAttribute("lang")) !== null && _c !== void 0 ? _c : "html",
          lang: (_e = (_d = $template.getAttribute("language")) !== null && _d !== void 0 ? _d : $template.getAttribute("lang")) !== null && _e !== void 0 ? _e : "html",
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
  }
  render() {
    var _a, _b, _c, _d, _e;
    return html`
            <div
                class="${(_a = this._component) === null || _a === void 0 ? void 0 : _a.className()}"
                ?ready="${this.ready}"
                toolbar-position="${(_b = this._component) === null || _b === void 0 ? void 0 : _b.props.toolbarPosition}"
            >
                <div class="templates">
                    <slot></slot>
                </div>

                ${this._component ? html`<header class="${this._component.className("__nav")}">
                          <ol
                              class="${this._component.className("__tabs", this._component.props.defaultStyleClasses.main)}"
                          >
                              ${((_c = this._items) !== null && _c !== void 0 ? _c : []).map((item) => html`
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
                          ${this._component.props.toolbarPosition === "nav" ? html`
                                    <div class="${this._component.className("__toolbar")}">
                                        <s-clipboard-copy @click="${this.copy}"></s-clipboard-copy>
                                    </div>
                                ` : ""}
                      </header>` : ""}
                ${this._component ? html`
                          <div class="${this._component.className("__content")}">
                              ${this._component.props.toolbarPosition !== "nav" ? html`
                                        <div class="${(_d = this._component) === null || _d === void 0 ? void 0 : _d.className("__toolbar")}">
                                            <s-clipboard-copy @click="${this.copy}"></s-clipboard-copy>
                                        </div>
                                    ` : ""}
                              ${((_e = this._items) !== null && _e !== void 0 ? _e : []).map((item) => {
      var _a2, _b2, _c2;
      return html`
                                      <pre
                                          class="${this._component.className("__code")}"
                                          style="line-height:0;"
                                          id="${(_a2 = item.id) !== null && _a2 !== void 0 ? _a2 : item.lang}"
                                          ?active="${this._activeTabId === ((_b2 = item.id) !== null && _b2 !== void 0 ? _b2 : item.lang)}"
                                      >
                            <code class="language-${item.lang} ${item.lang} ${((_c2 = this._component) === null || _c2 === void 0 ? void 0 : _c2.props.defaultStyle) ? "hljs" : ""}">
                                
                                ${item.code}
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
    var _a;
    const $content = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector(`pre#${id} code`);
    if ($content.hasAttribute("inited"))
      return;
    $content.setAttribute("inited", "true");
    const highlightedCode = core.highlight($content === null || $content === void 0 ? void 0 : $content.innerHTML, {language: "js"}).value.trim();
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
  const $tags = document.querySelectorAll(tagName);
  console.log($tags);
  customElements.define(tagName, SCodeExample);
}
export default SCodeExample;
export {webcomponent};
