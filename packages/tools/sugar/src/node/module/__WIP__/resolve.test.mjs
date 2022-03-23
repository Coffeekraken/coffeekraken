import {
  __dirname
} from "../../../../../../chunk-TD77TI6B.mjs";
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
