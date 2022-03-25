import { fileURLToPath } from "url";
import path from "path";
var getFilename = () => fileURLToPath(import.meta.url);
var getDirname = () => path.dirname(getFilename());
var __dirname = /* @__PURE__ */ getDirname();
var __filename = /* @__PURE__ */ getFilename();
import __folderPath from "../folderPath";
describe("sugar.node.fs.folderPath", () => {
  it("Should get a simple folder path correctly", () => {
    const path2 = __folderPath(`${__dirname}/data/file.jpg`);
    expect(path2).toBe(`${__dirname}/data`);
  });
  it("Should return false when checking for a non existing folder", () => {
    const path2 = __folderPath(`${__dirname}/data/file111.jpg`, true);
    expect(path2).toBe(false);
  });
});
