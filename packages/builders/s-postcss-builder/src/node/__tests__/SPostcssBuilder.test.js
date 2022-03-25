import { fileURLToPath } from "url";
import path from "path";
var getFilename = () => fileURLToPath(import.meta.url);
var getDirname = () => path.dirname(getFilename());
var __dirname = /* @__PURE__ */ getDirname();
var __filename = /* @__PURE__ */ getFilename();
import __SPostcssBuilder from "../SPostcssBuilder";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
describe("@coffeekraken.s-postcss-builder", () => {
  it("Should build a pretty complexe postcss file", async () => {
    await __SSugarConfig.load();
    const builder = new __SPostcssBuilder({
      postcssBuilder: {
        purgecss: {
          content: [`${__dirname}/__data__/index.html`]
        }
      }
    });
    const promise = builder.build({
      input: `${__dirname}/__data__/index.css`,
      purge: true,
      minify: true
    });
    const res = await promise;
    expect(res.map).toEqual(null);
    expect(res.css).not.toBeNull();
  });
});
