import __SClass from "@coffeekraken/s-class";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __deepMap from "@coffeekraken/sugar/shared/object/deepMap";
import __marked from "marked";
import __isPlainObject from "@coffeekraken/sugar/shared/is/plainObject";
import __SPromise from "@coffeekraken/s-promise";
import __SLog from "@coffeekraken/s-log";
import __installTag from "./tags/install";
import __authorTag from "./tags/author";
import __contributorTag from "./tags/contributor";
import __simpleValueTag from "./tags/simpleValue";
import __simpleRepeatableValue from "./tags/simpleRepeatableValue";
import __descriptionTag from "./tags/description";
import __returnTag from "./tags/return";
import __exampleTag from "./tags/example";
import __paramTag from "./tags/param";
import __seeTag from "./tags/see";
import __snippetTag from "./tags/snippet";
import __platformTag from "./tags/platform";
import __namespaceTag from "./tags/namespace";
import __todoTag from "./tags/todo";
import __menuTag from "./tags/menu";
import __cssClass from "./tags/cssClass";
import __interfaceTag from "./tags/interface";
import __supportTag from "./tags/support";
const _SDocblockBlock = class extends __SClass {
  static registerTag(tagName, parser) {
    if (typeof parser !== "function")
      throw new Error(`The "<yellow>parser</yellow>" parameter of the static "<cyan>SDocblockBlock</cyan>" class method needs to be a "<green>Function</green>"`);
    _SDocblockBlock.tagsMap[tagName] = parser;
  }
  get docblockBlockSettings() {
    return this._settings.docblockBlock;
  }
  constructor(source, settings = {}) {
    super(__deepMerge({
      docblockBlock: {
        filepath: null,
        packageJson: null,
        renderMarkdown: false,
        markedOptions: {},
        tags: _SDocblockBlock.tagsMap
      }
    }, settings));
    this._source = source.trim().replace(/\s\*\s/gm, "\n * ").split(/\n/gm).map((l) => l.trim()).filter((l) => l !== "").join("\n").replace(/^\/\*\*/, "/**\n*").replace(/\*\/$/, "\n*/");
  }
  toString() {
    return this._source.trim();
  }
  toObject() {
    if (!this._blockObj) {
      throw new Error(`<red>${this.constructor.name}</red> Before accessing the blocks you'll need to parse the docblocks using "<yellow>await this.parse()</yellow>"`);
    }
    return this._blockObj;
  }
  parse() {
    return new __SPromise(async ({ resolve, reject, emit }) => {
      var _a;
      let currentTag;
      let currentContent = [];
      let currentObj = {};
      let docblockObj = {};
      let finalDocblockObj = {};
      let previousWasEmptyLine = false;
      function add() {
        if (currentContent.length)
          currentObj.content = currentContent;
        if (docblockObj.hasOwnProperty(currentTag) && !Array.isArray(docblockObj[currentTag])) {
          const currentValue = docblockObj[currentTag];
          docblockObj[currentTag] = [currentValue];
        }
        if (!currentObj.value)
          currentObj.value = true;
        if (Array.isArray(docblockObj[currentTag])) {
          docblockObj[currentTag].push(currentObj);
        } else {
          docblockObj[currentTag] = currentObj;
        }
        currentObj = {};
        currentContent = [];
        currentTag = void 0;
      }
      let lines = this._source.trim().split("\n");
      if (!lines || !lines.length)
        return null;
      lines = lines.map((l) => l.trim()).filter((l) => l !== "");
      lines.forEach((line) => {
        const tagNameReg = /\*[\s]?@([a-zA-Z0-9]+)/;
        const tagNameMatch = line.match(tagNameReg);
        if (line.replace("*", "").trim() === "") {
          if (currentContent.length > 0) {
            currentContent.push("");
          } else {
            if (currentTag && currentObj.value) {
              add();
            }
            previousWasEmptyLine = true;
          }
        } else if (tagNameMatch) {
          if (currentTag) {
            add();
          }
          currentTag = tagNameMatch[1];
          line = line.replace(tagNameMatch[0], "").trim();
          if (line.length > 0) {
            currentObj.value = line;
          } else {
            currentObj.value = true;
          }
          previousWasEmptyLine = false;
        } else if (previousWasEmptyLine && !line.trim().match(/^\*\/$/)) {
          currentTag = "description";
          currentContent = [line.replace("*", "")];
          currentObj = {};
          previousWasEmptyLine = false;
        } else {
          line = line.replace("/**", "");
          line = line.replace("*/", "");
          line = line.replace("* ", "");
          line = line.replace("*", "");
          if (line.trim().length) {
            currentContent.push(line);
          }
        }
      });
      add();
      if (this.docblockBlockSettings.renderMarkdown) {
        __marked.setOptions((_a = this.docblockBlockSettings.markedOptions) != null ? _a : {});
      }
      for (let i = 0; i < Object.keys(docblockObj).length; i++) {
        const prop = Object.keys(docblockObj)[i];
        const value = docblockObj[prop];
        if (finalDocblockObj[prop])
          continue;
        if (!prop || prop.length <= 1 || prop.slice(0, 1) === "_")
          continue;
        if (this.docblockBlockSettings.tags[prop] && prop !== "src") {
          let res;
          try {
            res = await this.docblockBlockSettings.tags[prop](value, this.docblockBlockSettings);
          } catch (e) {
            emit("log", {
              type: __SLog.TYPE_WARN,
              value: `<red>[SDocblockBlock]</red> An error occured during the parsing of the docblock bellow on the tag <yellow>${prop}</yellow>:

${this._source}

${e.stack}`
            });
          }
          if (res !== void 0) {
            finalDocblockObj[prop] = res;
          }
        } else {
          finalDocblockObj[prop] = __simpleValueTag(value, this.docblockBlockSettings);
        }
        if (this.docblockBlockSettings.renderMarkdown) {
          let renderMarkdown = function(data) {
            if (data instanceof String && data.render === true) {
              return __marked.parseInline(data.toString());
            } else if (Array.isArray(data)) {
              return data.map((item) => {
                return renderMarkdown(item);
              });
            } else if (__isPlainObject(data)) {
              return __deepMap(data, ({ prop: prop2, value: v }) => {
                return renderMarkdown(v);
              });
            } else {
              return data;
            }
          };
          finalDocblockObj[prop] = renderMarkdown(finalDocblockObj[prop]);
        }
      }
      finalDocblockObj.raw = this._source.toString();
      this._blockObj = finalDocblockObj;
      return resolve(finalDocblockObj);
    });
  }
};
let SDocblockBlock = _SDocblockBlock;
SDocblockBlock.tagsMap = {};
SDocblockBlock.registerTag("author", __authorTag);
SDocblockBlock.registerTag("contributor", __contributorTag);
SDocblockBlock.registerTag("abstract", __simpleValueTag);
SDocblockBlock.registerTag("final", __simpleValueTag);
SDocblockBlock.registerTag("async", __simpleValueTag);
SDocblockBlock.registerTag("generator", __simpleValueTag);
SDocblockBlock.registerTag("global", __simpleValueTag);
SDocblockBlock.registerTag("constructor", __simpleValueTag);
SDocblockBlock.registerTag("hideconstructor", __simpleValueTag);
SDocblockBlock.registerTag("ignore", __simpleValueTag);
SDocblockBlock.registerTag("inheritdoc", __simpleValueTag);
SDocblockBlock.registerTag("inner", __simpleValueTag);
SDocblockBlock.registerTag("instance", __simpleValueTag);
SDocblockBlock.registerTag("mixin", __simpleValueTag);
SDocblockBlock.registerTag("override", __simpleValueTag);
SDocblockBlock.registerTag("access", __simpleValueTag);
SDocblockBlock.registerTag("category", __simpleValueTag);
SDocblockBlock.registerTag("copyright", __simpleValueTag);
SDocblockBlock.registerTag("deprecated", __simpleValueTag);
SDocblockBlock.registerTag("alias", __simpleValueTag);
SDocblockBlock.registerTag("augments", __simpleValueTag);
SDocblockBlock.registerTag("callback", __simpleValueTag);
SDocblockBlock.registerTag("class", __simpleValueTag);
SDocblockBlock.registerTag("classdesc", __simpleValueTag);
SDocblockBlock.registerTag("constant", __simpleValueTag);
SDocblockBlock.registerTag("constructs", __simpleValueTag);
SDocblockBlock.registerTag("copyright", __simpleValueTag);
SDocblockBlock.registerTag("default", __simpleValueTag);
SDocblockBlock.registerTag("deprecated", __simpleValueTag);
SDocblockBlock.registerTag("exports", __simpleValueTag);
SDocblockBlock.registerTag("external", __simpleValueTag);
SDocblockBlock.registerTag("host", __simpleValueTag);
SDocblockBlock.registerTag("file", __simpleValueTag);
SDocblockBlock.registerTag("function", __simpleValueTag);
SDocblockBlock.registerTag("func", __simpleValueTag);
SDocblockBlock.registerTag("method", __simpleValueTag);
SDocblockBlock.registerTag("implements", __simpleValueTag);
SDocblockBlock.registerTag("interface", __simpleValueTag);
SDocblockBlock.registerTag("kind", __simpleValueTag);
SDocblockBlock.registerTag("lends", __simpleValueTag);
SDocblockBlock.registerTag("license", __simpleValueTag);
SDocblockBlock.registerTag("memberof", __simpleValueTag);
SDocblockBlock.registerTag("memberof", __simpleValueTag);
SDocblockBlock.registerTag("mixes", __simpleValueTag);
SDocblockBlock.registerTag("module", __simpleValueTag);
SDocblockBlock.registerTag("name", __simpleValueTag);
SDocblockBlock.registerTag("package", __simpleValueTag);
SDocblockBlock.registerTag("private", __simpleValueTag);
SDocblockBlock.registerTag("protected", __simpleValueTag);
SDocblockBlock.registerTag("public", __simpleValueTag);
SDocblockBlock.registerTag("readonly", __simpleValueTag);
SDocblockBlock.registerTag("requires", __simpleValueTag);
SDocblockBlock.registerTag("since", __simpleValueTag);
SDocblockBlock.registerTag("static", __simpleValueTag);
SDocblockBlock.registerTag("summary", __simpleValueTag);
SDocblockBlock.registerTag("this", __simpleValueTag);
SDocblockBlock.registerTag("tutorial", __simpleValueTag);
SDocblockBlock.registerTag("type", __simpleValueTag);
SDocblockBlock.registerTag("variation", __simpleValueTag);
SDocblockBlock.registerTag("version", __simpleValueTag);
SDocblockBlock.registerTag("enum", __simpleValueTag);
SDocblockBlock.registerTag("src", __simpleValueTag);
SDocblockBlock.registerTag("import", __simpleValueTag);
SDocblockBlock.registerTag("install", __installTag);
SDocblockBlock.registerTag("feature", __simpleRepeatableValue);
SDocblockBlock.registerTag("description", __descriptionTag);
SDocblockBlock.registerTag("desc", __descriptionTag);
SDocblockBlock.registerTag("see", __seeTag);
SDocblockBlock.registerTag("interface", __interfaceTag);
SDocblockBlock.registerTag("return", __returnTag);
SDocblockBlock.registerTag("param", __paramTag);
SDocblockBlock.registerTag("property", __paramTag);
SDocblockBlock.registerTag("prop", __paramTag);
SDocblockBlock.registerTag("setting", __paramTag);
SDocblockBlock.registerTag("platform", __platformTag);
SDocblockBlock.registerTag("namespace", __namespaceTag);
SDocblockBlock.registerTag("menu", __menuTag);
SDocblockBlock.registerTag("cssClass", __cssClass);
SDocblockBlock.registerTag("support", __supportTag);
SDocblockBlock.registerTag("snippet", __snippetTag);
SDocblockBlock.registerTag("example", __exampleTag);
SDocblockBlock.registerTag("todo", __todoTag);
var SDocblockBlock_default = SDocblockBlock;
export {
  SDocblockBlock_default as default
};
