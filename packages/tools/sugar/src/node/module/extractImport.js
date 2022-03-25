import { find as __find } from "abstract-syntax-tree";
import * as __acorn from "acorn-loose";
import { generate as __astring } from "astring";
import __fs from "fs";
import __deepMerge from "../../shared/object/deepMerge";
function extractImport(stringOrFilePath, settings) {
  const set = __deepMerge({
    import: true
  }, settings || {});
  let content = stringOrFilePath;
  if (__fs.existsSync(stringOrFilePath)) {
    content = __fs.readFileSync(stringOrFilePath);
  }
  const ast = __acorn.parse(content, {
    ecmaVersion: "latest"
  });
  const finalImportsArray = [];
  if (set.import) {
    const importsAst = __find(ast, "ImportDeclaration");
    importsAst.forEach((importAst) => {
      const raw = __astring(importAst).replace(/await;\n/, "await ");
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
    const importExpressions = __find(ast, "ImportExpression");
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
        const raw = __astring(ast).replace(/await;\n/, "await ");
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
export {
  extractImport as default
};
