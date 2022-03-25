import { fileURLToPath } from "url";
import path from "path";
var getFilename = () => fileURLToPath(import.meta.url);
var getDirname = () => path.dirname(getFilename());
var __dirname = /* @__PURE__ */ getDirname();
var __filename = /* @__PURE__ */ getFilename();
const __packageRoot = require("../packageRoot");
describe("sugar.node.path.packageRoot", () => {
  it("Should return a path when calling it", () => {
    expect(__packageRoot(__dirname).split("/").pop()).toBe("sugar");
    expect(__packageRoot(__dirname, true).split("/").pop()).toBe("coffeekraken");
  });
});
