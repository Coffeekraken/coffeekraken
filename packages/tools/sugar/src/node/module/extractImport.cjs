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
var extractImport_exports = {};
__export(extractImport_exports, {
  default: () => extractImport
});
module.exports = __toCommonJS(extractImport_exports);
var import_abstract_syntax_tree = require("abstract-syntax-tree");
var __acorn = __toESM(require("acorn-loose"), 1);
var import_astring = require("astring");
var import_fs = __toESM(require("fs"), 1);
var import_deepMerge = __toESM(require("../../shared/object/deepMerge"), 1);
function extractImport(stringOrFilePath, settings) {
  const set = (0, import_deepMerge.default)({
    import: true
  }, settings || {});
  let content = stringOrFilePath;
  if (import_fs.default.existsSync(stringOrFilePath)) {
    content = import_fs.default.readFileSync(stringOrFilePath);
  }
  const ast = __acorn.parse(content, {
    ecmaVersion: "latest"
  });
  const finalImportsArray = [];
  if (set.import) {
    const importsAst = (0, import_abstract_syntax_tree.find)(ast, "ImportDeclaration");
    importsAst.forEach((importAst) => {
      const raw = (0, import_astring.generate)(importAst).replace(/await;\n/, "await ");
      const importObj = {
        type: "import",
        path: importAst.source.value,
        raw
      };
      if (importAst.specifiers.length) {
        importAst.specifiers.forEach((specifier) => {
          const obj = Object.assign({}, importObj);
          switch (specifier.type) {
            case "ImportSpecifier":
              obj.imported = specifier.imported.name;
              obj.local = specifier.local.name;
              finalImportsArray.push(obj);
              break;
            case "ImportNamespaceSpecifier":
              obj.imported = "*";
              obj.local = specifier.local.name;
              finalImportsArray.push(obj);
              break;
            case "ImportDefaultSpecifier":
              obj.imported = "default";
              obj.local = specifier.local.name;
              finalImportsArray.push(obj);
              break;
          }
        });
      } else {
        importObj.imported = "*";
        importObj.local = void 0;
        finalImportsArray.push(importObj);
      }
    });
    const importExpressions = (0, import_abstract_syntax_tree.find)(ast, "ImportExpression");
    importExpressions.forEach((callObj) => {
      if (!callObj.source.value)
        return;
      let exists = false;
      finalImportsArray.forEach((importsObj) => {
        if (exists)
          return;
        if (importsObj.path === callObj.source.value)
          exists = true;
      });
      if (!exists) {
        const raw = (0, import_astring.generate)(ast).replace(/await;\n/, "await ");
        finalImportsArray.push({
          type: "import",
          path: callObj.source.value,
          raw,
          imported: "*",
          local: void 0
        });
      }
    });
  }
  return finalImportsArray;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
