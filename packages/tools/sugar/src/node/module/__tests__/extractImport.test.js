var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var import_extractImport = __toESM(require("../extractImport"), 1);
describe("sugar.node.module.extractImport", () => {
  it("Should extract correctly a very simple import statement", () => {
    const str = 'import lodash from "dependency-tree"';
    const imports = (0, import_extractImport.default)(str);
    expect(imports[0]).toEqual({
      type: "import",
      path: "dependency-tree",
      raw: 'import lodash from "dependency-tree";',
      imported: "default",
      local: "lodash"
    });
  });
  it("Should extract correctly a simple * as import statement", () => {
    const str = 'import * as name1 from "module-name";';
    const imports = (0, import_extractImport.default)(str);
    expect(imports[0]).toEqual({
      type: "import",
      path: "module-name",
      raw: 'import * as name1 from "module-name";',
      imported: "*",
      local: "name1"
    });
  });
  it("Should extract correctly a simple scoped import statement", () => {
    const str = 'import { export1 } from "module-name";';
    const imports = (0, import_extractImport.default)(str);
    expect(imports[0]).toEqual({
      type: "import",
      path: "module-name",
      raw: 'import {export1} from "module-name";',
      imported: "export1",
      local: "export1"
    });
  });
  it("Should extract correctly a simple scoped as import statement", () => {
    const str = 'import { export1 as alias1 } from "module-name";';
    const imports = (0, import_extractImport.default)(str);
    expect(imports[0]).toEqual({
      type: "import",
      path: "module-name",
      raw: 'import {export1 as alias1} from "module-name";',
      imported: "export1",
      local: "alias1"
    });
  });
  it("Should extract correctly a multiple scoped import statement", () => {
    const str = 'import { foo, bar } from "module-name/path/to/specific/un-exported/file";';
    const imports = (0, import_extractImport.default)(str);
    expect(imports[0]).toEqual({
      type: "import",
      path: "module-name/path/to/specific/un-exported/file",
      raw: 'import {foo, bar} from "module-name/path/to/specific/un-exported/file";',
      imported: "foo",
      local: "foo"
    });
    expect(imports[1]).toEqual({
      type: "import",
      path: "module-name/path/to/specific/un-exported/file",
      raw: 'import {foo, bar} from "module-name/path/to/specific/un-exported/file";',
      imported: "bar",
      local: "bar"
    });
  });
  it("Should extract correctly a default and a scoped import statement", () => {
    const str = 'import defaultExport1, { export18 } from "module-name";';
    const imports = (0, import_extractImport.default)(str);
    expect(imports[0]).toEqual({
      type: "import",
      path: "module-name",
      raw: 'import defaultExport1, {export18} from "module-name";',
      imported: "default",
      local: "defaultExport1"
    });
    expect(imports[1]).toEqual({
      type: "import",
      path: "module-name",
      raw: 'import defaultExport1, {export18} from "module-name";',
      imported: "export18",
      local: "export18"
    });
  });
  it("Should extract correctly a default and a scoped import statement", () => {
    const str = 'import defaultExport2, * as name2 from "module-name";';
    const imports = (0, import_extractImport.default)(str);
    expect(imports[0]).toEqual({
      type: "import",
      path: "module-name",
      raw: 'import defaultExport2, * as name2 from "module-name";',
      imported: "default",
      local: "defaultExport2"
    });
    expect(imports[1]).toEqual({
      type: "import",
      path: "module-name",
      raw: 'import defaultExport2, * as name2 from "module-name";',
      imported: "*",
      local: "name2"
    });
  });
  it("Should extract correctly a no variable import statement", () => {
    const str = 'import "module-name";';
    const imports = (0, import_extractImport.default)(str);
    expect(imports[0]).toEqual({
      type: "import",
      path: "module-name",
      raw: 'import "module-name";',
      imported: "*",
      local: void 0
    });
  });
});
