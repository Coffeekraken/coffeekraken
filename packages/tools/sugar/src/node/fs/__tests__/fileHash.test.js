import { fileURLToPath } from "url";
import path from "path";
var getFilename = () => fileURLToPath(import.meta.url);
var getDirname = () => path.dirname(getFilename());
var __dirname = /* @__PURE__ */ getDirname();
var __filename = /* @__PURE__ */ getFilename();
import __fileHash from "../fileHash";
describe("sugar.node.fs.fileHash", () => {
  it("Should a simple file correctly", () => {
    const hash = __fileHash(`${__dirname}/data/3cb8876846e7c0e13896d23496ff7ac2.gif`);
    expect(hash).toBe("o8qZgS5PxHPPNasVn3Be0lvxK7mtKaMVgUtTntgS7Pw=");
  });
});
