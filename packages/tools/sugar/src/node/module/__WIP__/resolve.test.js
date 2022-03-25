import { fileURLToPath } from "url";
import path from "path";
var getFilename = () => fileURLToPath(import.meta.url);
var getDirname = () => path.dirname(getFilename());
var __dirname = /* @__PURE__ */ getDirname();
var __filename = /* @__PURE__ */ getFilename();
import __resolve from "../resolve";
import __path from "path";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
describe("sugar.node.module.resolve", () => {
  const settings = {
    dirs: [`${__dirname}`, `${__dirname}/node_modules`]
  };
  it('Should resolve an existing file with a "./" at start correctly', async () => {
    await __SSugarConfig.load();
    const res = __resolve("./pkg/test/test.js", settings);
    expect(res).toBe(__path.resolve(__dirname, "pkg/test/test.js"));
  });
});
