import { fileURLToPath } from "url";
import path from "path";
var getFilename = () => fileURLToPath(import.meta.url);
var getDirname = () => path.dirname(getFilename());
var __dirname = /* @__PURE__ */ getDirname();
var __filename = /* @__PURE__ */ getFilename();
import __folderHash from "../folderHash";
describe("sugar.node.fs.folderHash", () => {
  it("Should hash correctly a simple folder", () => {
    const hash = __folderHash(`${__dirname}/data/hashfolder`);
    expect(hash).toBe("0d0cd3c0b84f67987abe33d70abd054d4c30243f28ca7917583e74ebcc29f428");
  });
});
