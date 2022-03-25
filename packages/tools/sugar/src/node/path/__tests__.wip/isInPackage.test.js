import { fileURLToPath } from "url";
import path from "path";
var getFilename = () => fileURLToPath(import.meta.url);
var getDirname = () => path.dirname(getFilename());
var __dirname = /* @__PURE__ */ getDirname();
var __filename = /* @__PURE__ */ getFilename();
const __isInPackage = require("../isInPackage");
describe("sugar.node.path.isInPackage", () => {
  it("Should return true when checking if is in @coffeekraken/sugar package", () => {
    expect(__isInPackage("@coffeekraken/sugar", __dirname)).toBe(true);
  });
});
