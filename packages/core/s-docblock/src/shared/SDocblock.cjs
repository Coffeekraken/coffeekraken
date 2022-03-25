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
var SDocblock_exports = {};
__export(SDocblock_exports, {
  default: () => SDocblock_default
});
module.exports = __toCommonJS(SDocblock_exports);
var import_s_class = __toESM(require("@coffeekraken/s-class"));
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"));
var import_SDocblockBlock = __toESM(require("./SDocblockBlock"));
var import_node = __toESM(require("@coffeekraken/sugar/shared/is/node"));
var import_isPath = __toESM(require("@coffeekraken/sugar/node/fs/isPath"));
var import_jsonSync = __toESM(require("@coffeekraken/sugar/node/package/jsonSync"));
var import_require = __toESM(require("@coffeekraken/sugar/node/esm/require"));
var import_s_promise = __toESM(require("@coffeekraken/s-promise"));
class SDocblock extends import_s_class.default {
  constructor(source, settings) {
    super((0, import_deepMerge.default)({
      docblock: {
        filter: void 0,
        filterByTag: void 0,
        sortFunction: (a, b) => {
          var _a, _b, _c, _d;
          let res = 0;
          if (!b || !a)
            return res;
          const aObj = a.toObject(), bObj = b.toObject();
          if (bObj.namespace)
            res += 1;
          if (((_a = bObj.type) == null ? void 0 : _a.toLowerCase()) === "class")
            res += 1;
          if (bObj.constructor)
            res += 1;
          if (bObj.private)
            res += 1;
          if (((_b = bObj.type) == null ? void 0 : _b.toLowerCase()) === "function")
            res += 1;
          if (((_c = bObj.name) == null ? void 0 : _c.length) > ((_d = aObj.name) == null ? void 0 : _d.length))
            res += 1;
          return res;
        },
        filepath: null,
        renderMarkdown: false,
        markedOptions: {},
        to: {}
      }
    }, settings || {}));
    this._source = "";
    this._blocks = [];
    if ((0, import_isPath.default)(source)) {
      if (!(0, import_node.default)())
        throw new Error(`Sorry but in a none node environement the SDocblock class can take only a String to parse and not a file path like "<yellow>${source}</yellow>"...`);
      const __fs = (0, import_require.default)("fs");
      if (!__fs.existsSync(source))
        throw new Error(`Sorry but the passed source path "<yellow>${source}</yellow>" does not exists on the filesystem...`);
      this.docblockSettings.filepath = source;
      this._source = __fs.readFileSync(source, "utf8");
      this._packageJson = (0, import_jsonSync.default)(source);
    } else {
      this._source = source;
    }
  }
  get docblockSettings() {
    return this._settings.docblock;
  }
  sort(sortFunction) {
    if (!sortFunction)
      sortFunction = this.docblockSettings.sortFunction;
    this._blocks = this._blocks.sort(sortFunction);
    return this;
  }
  get blocks() {
    if (!this._blocks) {
      throw new Error(`<red>${this.constructor.name}</red> Before accessing the blocks you'll need to parse the docblocks using "<yellow>await this.parse()</yellow>"`);
    }
    return this._blocks;
  }
  parse(string = this._source) {
    return new import_s_promise.default(async ({ resolve, reject, emit, pipe }) => {
      const regDefault = /(['"`\s]+)?(\/\*{2})([\s\S]+?)(\*\/)/g;
      let blocksArrayStr = [];
      let regDefaultMatches = string.match(regDefault);
      if (regDefaultMatches == null ? void 0 : regDefaultMatches.length) {
        regDefaultMatches = regDefaultMatches.filter((match) => {
          if (match.trim().match(/^['`"]/))
            return false;
          return true;
        }).map((match) => {
          return match.trim();
        });
        blocksArrayStr = [...regDefaultMatches];
      }
      let blocks = [];
      if (!Array.isArray(blocksArrayStr)) {
        blocksArrayStr = [];
      } else if (Array.isArray(blocksArrayStr) && blocksArrayStr.length) {
        blocksArrayStr = blocksArrayStr.map((t) => t.trim());
        if (!blocksArrayStr || !blocksArrayStr.length)
          return [];
        blocksArrayStr = blocksArrayStr.filter((blockStr) => {
          const lines = blockStr.split("\n");
          for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            if (line.trim().slice(0, 2) === "//")
              return false;
          }
          if (this.docblockSettings.filterByTag) {
            let isBlockMatchFilter = true;
            for (let i = 0; i < Object.keys(this.docblockSettings.filterByTag).length; i++) {
              const tagName = Object.keys(this.docblockSettings.filterByTag)[i];
              const tagFilter = this.docblockSettings.filterByTag[tagName];
              const tagValueReg = new RegExp(`@${tagName}([^
]+)`);
              const tagValue = blockStr.match(tagValueReg);
              const tagFilterArray = Array.isArray(tagFilter) ? tagFilter : [tagFilter];
              let isMatchOrCondition = false;
              if (tagValue && tagValue[1]) {
                const tagValueValue = tagValue[1].trim();
                for (let j = 0; j < tagFilterArray.length; j++) {
                  const tagFilterFilter = tagFilterArray[j];
                  if (typeof tagFilterFilter === "string") {
                    if (tagValueValue === tagFilterFilter) {
                      isMatchOrCondition = true;
                      break;
                    }
                  } else if (tagFilterFilter instanceof RegExp) {
                    if (tagValueValue.trim().match(tagFilterFilter)) {
                      isMatchOrCondition = true;
                      break;
                    }
                  } else if (typeof tagFilterFilter === "function") {
                    if (tagFilterFilter(tagValueValue.trim())) {
                      isMatchOrCondition = true;
                      break;
                    }
                  } else {
                    throw new Error(`<red>[${this.constructor.name}]</red> Sorry but the passed "<yellow>${tagName}</yellow>" filterByTag filter can be only a RegExp or a function`);
                  }
                }
              }
              if (!isMatchOrCondition)
                isBlockMatchFilter = false;
            }
            if (isBlockMatchFilter)
              return true;
            return false;
          }
          return true;
        });
      }
      for (let i = 0; i < blocksArrayStr.length; i++) {
        const block = blocksArrayStr[i];
        const docblockBlock = new import_SDocblockBlock.default(block || " ", {
          docblockBlock: {
            packageJson: this._packageJson,
            filepath: this.docblockSettings.filepath || "",
            renderMarkdown: this.docblockSettings.renderMarkdown,
            markedOptions: this.docblockSettings.markedOptions
          }
        });
        await pipe(docblockBlock.parse());
        blocks[i] = docblockBlock;
      }
      if (blocks && blocks.length) {
        this._blocks = blocks;
      }
      if (typeof this.docblockSettings.filter === "function") {
        this._blocks = this._blocks.filter((docblockBlock) => {
          return this.docblockSettings.filter(docblockBlock.toObject(), docblockBlock);
        });
      }
      this.sort();
      resolve(this._blocks);
    });
  }
  toObject() {
    return this.blocks.map((block) => {
      return block.toObject();
    });
  }
  toString() {
    return this.blocks.map((block) => {
      return block.toString();
    }).join("\n");
  }
}
var SDocblock_default = SDocblock;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
