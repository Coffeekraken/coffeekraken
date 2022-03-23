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
var import_downloadRepository = __toESM(require("../downloadRepository"), 1);
var import_systemTmpDir = __toESM(require("../../path/systemTmpDir"), 1);
describe("sugar.node.github.downloadRepository", () => {
  it("Should download a repository successfully", async () => {
    const repo = await (0, import_downloadRepository.default)("Coffeekraken/download-test-repo", {
      branch: "main"
    });
    expect(repo).toEqual({
      dest: `${(0, import_systemTmpDir.default)()}/downloads/coffeekraken-download-test-repo-main.zip`
    });
  }, 999999);
  it("Should download a repository and unzip it successfully", async () => {
    const repo = await (0, import_downloadRepository.default)("Coffeekraken/download-test-repo", {
      branch: "main",
      unzip: true
    });
    expect(repo).toEqual({
      dest: `${(0, import_systemTmpDir.default)()}/downloads/coffeekraken-download-test-repo-main`
    });
  }, 999999);
});
