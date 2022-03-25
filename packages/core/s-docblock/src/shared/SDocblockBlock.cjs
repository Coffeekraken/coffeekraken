var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var SDocblockBlock_exports = {};
__export(SDocblockBlock_exports, {
  default: () => SDocblockBlock_default
});
module.exports = __toCommonJS(SDocblockBlock_exports);
var import_s_class = __toESM(require("@coffeekraken/s-class"));
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"));
var import_deepMap = __toESM(require("@coffeekraken/sugar/shared/object/deepMap"));
var import_marked = __toESM(require("marked"));
var import_plainObject = __toESM(require("@coffeekraken/sugar/shared/is/plainObject"));
var import_s_promise = __toESM(require("@coffeekraken/s-promise"));
var import_s_log = __toESM(require("@coffeekraken/s-log"));
var import_install = __toESM(require("./tags/install"));
var import_author = __toESM(require("./tags/author"));
var import_contributor = __toESM(require("./tags/contributor"));
var import_simpleValue = __toESM(require("./tags/simpleValue"));
var import_simpleRepeatableValue = __toESM(require("./tags/simpleRepeatableValue"));
var import_description = __toESM(require("./tags/description"));
var import_return = __toESM(require("./tags/return"));
var import_example = __toESM(require("./tags/example"));
var import_param = __toESM(require("./tags/param"));
var import_see = __toESM(require("./tags/see"));
var import_snippet = __toESM(require("./tags/snippet"));
var import_platform = __toESM(require("./tags/platform"));
var import_namespace = __toESM(require("./tags/namespace"));
var import_todo = __toESM(require("./tags/todo"));
var import_menu = __toESM(require("./tags/menu"));
var import_cssClass = __toESM(require("./tags/cssClass"));
var import_interface = __toESM(require("./tags/interface"));
var import_support = __toESM(require("./tags/support"));
const _SDocblockBlock = class extends import_s_class.default {
  static registerTag(tagName, parser) {
    if (typeof parser !== "function")
      throw new Error(`The "<yellow>parser</yellow>" parameter of the static "<cyan>SDocblockBlock</cyan>" class method needs to be a "<green>Function</green>"`);
    _SDocblockBlock.tagsMap[tagName] = parser;
  }
  get docblockBlockSettings() {
    return this._settings.docblockBlock;
  }
  constructor(source, settings = {}) {
    super((0, import_deepMerge.default)({
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
    return new import_s_promise.default(async ({ resolve, reject, emit }) => {
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
        import_marked.default.setOptions((_a = this.docblockBlockSettings.markedOptions) != null ? _a : {});
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
              type: import_s_log.default.TYPE_WARN,
              value: `<red>[SDocblockBlock]</red> An error occured during the parsing of the docblock bellow on the tag <yellow>${prop}</yellow>:

${this._source}

${e.stack}`
            });
          }
          if (res !== void 0) {
            finalDocblockObj[prop] = res;
          }
        } else {
          finalDocblockObj[prop] = (0, import_simpleValue.default)(value, this.docblockBlockSettings);
        }
        if (this.docblockBlockSettings.renderMarkdown) {
          let renderMarkdown = function(data) {
            if (data instanceof String && data.render === true) {
              return import_marked.default.parseInline(data.toString());
            } else if (Array.isArray(data)) {
              return data.map((item) => {
                return renderMarkdown(item);
              });
            } else if ((0, import_plainObject.default)(data)) {
              return (0, import_deepMap.default)(data, ({ prop: prop2, value: v }) => {
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
SDocblockBlock.registerTag("author", import_author.default);
SDocblockBlock.registerTag("contributor", import_contributor.default);
SDocblockBlock.registerTag("abstract", import_simpleValue.default);
SDocblockBlock.registerTag("final", import_simpleValue.default);
SDocblockBlock.registerTag("async", import_simpleValue.default);
SDocblockBlock.registerTag("generator", import_simpleValue.default);
SDocblockBlock.registerTag("global", import_simpleValue.default);
SDocblockBlock.registerTag("constructor", import_simpleValue.default);
SDocblockBlock.registerTag("hideconstructor", import_simpleValue.default);
SDocblockBlock.registerTag("ignore", import_simpleValue.default);
SDocblockBlock.registerTag("inheritdoc", import_simpleValue.default);
SDocblockBlock.registerTag("inner", import_simpleValue.default);
SDocblockBlock.registerTag("instance", import_simpleValue.default);
SDocblockBlock.registerTag("mixin", import_simpleValue.default);
SDocblockBlock.registerTag("override", import_simpleValue.default);
SDocblockBlock.registerTag("access", import_simpleValue.default);
SDocblockBlock.registerTag("category", import_simpleValue.default);
SDocblockBlock.registerTag("copyright", import_simpleValue.default);
SDocblockBlock.registerTag("deprecated", import_simpleValue.default);
SDocblockBlock.registerTag("alias", import_simpleValue.default);
SDocblockBlock.registerTag("augments", import_simpleValue.default);
SDocblockBlock.registerTag("callback", import_simpleValue.default);
SDocblockBlock.registerTag("class", import_simpleValue.default);
SDocblockBlock.registerTag("classdesc", import_simpleValue.default);
SDocblockBlock.registerTag("constant", import_simpleValue.default);
SDocblockBlock.registerTag("constructs", import_simpleValue.default);
SDocblockBlock.registerTag("copyright", import_simpleValue.default);
SDocblockBlock.registerTag("default", import_simpleValue.default);
SDocblockBlock.registerTag("deprecated", import_simpleValue.default);
SDocblockBlock.registerTag("exports", import_simpleValue.default);
SDocblockBlock.registerTag("external", import_simpleValue.default);
SDocblockBlock.registerTag("host", import_simpleValue.default);
SDocblockBlock.registerTag("file", import_simpleValue.default);
SDocblockBlock.registerTag("function", import_simpleValue.default);
SDocblockBlock.registerTag("func", import_simpleValue.default);
SDocblockBlock.registerTag("method", import_simpleValue.default);
SDocblockBlock.registerTag("implements", import_simpleValue.default);
SDocblockBlock.registerTag("interface", import_simpleValue.default);
SDocblockBlock.registerTag("kind", import_simpleValue.default);
SDocblockBlock.registerTag("lends", import_simpleValue.default);
SDocblockBlock.registerTag("license", import_simpleValue.default);
SDocblockBlock.registerTag("memberof", import_simpleValue.default);
SDocblockBlock.registerTag("memberof", import_simpleValue.default);
SDocblockBlock.registerTag("mixes", import_simpleValue.default);
SDocblockBlock.registerTag("module", import_simpleValue.default);
SDocblockBlock.registerTag("name", import_simpleValue.default);
SDocblockBlock.registerTag("package", import_simpleValue.default);
SDocblockBlock.registerTag("private", import_simpleValue.default);
SDocblockBlock.registerTag("protected", import_simpleValue.default);
SDocblockBlock.registerTag("public", import_simpleValue.default);
SDocblockBlock.registerTag("readonly", import_simpleValue.default);
SDocblockBlock.registerTag("requires", import_simpleValue.default);
SDocblockBlock.registerTag("since", import_simpleValue.default);
SDocblockBlock.registerTag("static", import_simpleValue.default);
SDocblockBlock.registerTag("summary", import_simpleValue.default);
SDocblockBlock.registerTag("this", import_simpleValue.default);
SDocblockBlock.registerTag("tutorial", import_simpleValue.default);
SDocblockBlock.registerTag("type", import_simpleValue.default);
SDocblockBlock.registerTag("variation", import_simpleValue.default);
SDocblockBlock.registerTag("version", import_simpleValue.default);
SDocblockBlock.registerTag("enum", import_simpleValue.default);
SDocblockBlock.registerTag("src", import_simpleValue.default);
SDocblockBlock.registerTag("import", import_simpleValue.default);
SDocblockBlock.registerTag("install", import_install.default);
SDocblockBlock.registerTag("feature", import_simpleRepeatableValue.default);
SDocblockBlock.registerTag("description", import_description.default);
SDocblockBlock.registerTag("desc", import_description.default);
SDocblockBlock.registerTag("see", import_see.default);
SDocblockBlock.registerTag("interface", import_interface.default);
SDocblockBlock.registerTag("return", import_return.default);
SDocblockBlock.registerTag("param", import_param.default);
SDocblockBlock.registerTag("property", import_param.default);
SDocblockBlock.registerTag("prop", import_param.default);
SDocblockBlock.registerTag("setting", import_param.default);
SDocblockBlock.registerTag("platform", import_platform.default);
SDocblockBlock.registerTag("namespace", import_namespace.default);
SDocblockBlock.registerTag("menu", import_menu.default);
SDocblockBlock.registerTag("cssClass", import_cssClass.default);
SDocblockBlock.registerTag("support", import_support.default);
SDocblockBlock.registerTag("snippet", import_snippet.default);
SDocblockBlock.registerTag("example", import_example.default);
SDocblockBlock.registerTag("todo", import_todo.default);
var SDocblockBlock_default = SDocblockBlock;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
