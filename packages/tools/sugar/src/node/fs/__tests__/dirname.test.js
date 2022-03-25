import { fileURLToPath } from "url";
import path from "path";
var getFilename = () => fileURLToPath(import.meta.url);
var getDirname = () => path.dirname(getFilename());
var __dirname = /* @__PURE__ */ getDirname();
var __filename = /* @__PURE__ */ getFilename();
import __dn from "../dirname";
describe("sugar.node.fs.dirname", () => {
  it("Should get the dirname correctly", () => {
    expect(__dn()).toBe(__dirname);
  });
});
