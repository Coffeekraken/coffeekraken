import { fileURLToPath } from "url";
import path from "path";
var getFilename = () => fileURLToPath(import.meta.url);
var getDirname = () => path.dirname(getFilename());
var __dirname = /* @__PURE__ */ getDirname();
var __filename = /* @__PURE__ */ getFilename();
import __SViewRenderer from "../SViewRenderer";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
describe("s-view.blade", () => {
  it("Should compile the passed blade view correctly", async () => {
    await __SSugarConfig.load();
    const view = new __SViewRenderer("default", {
      viewRenderer: {
        rootDirs: [`${__dirname}/views`]
      }
    });
    const res = await view.render({});
    expect(res.value).not.toBeUndefined();
    expect(res.value.includes("<title>Smoth</title>")).toBe(true);
    expect(res.view).not.toBeUndefined();
    expect(res.startTime).not.toBeUndefined();
    expect(res.endTime).not.toBeUndefined();
    expect(res.duration).not.toBeUndefined();
    expect(res.formatedDuration).not.toBeUndefined();
  });
});
