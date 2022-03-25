import { fileURLToPath } from "url";
import path from "path";
var getFilename = () => fileURLToPath(import.meta.url);
var getDirname = () => path.dirname(getFilename());
var __dirname = /* @__PURE__ */ getDirname();
var __filename = /* @__PURE__ */ getFilename();
import __unzip from "../unzip";
import __tmpDir from "../../path/systemTmpDir";
describe("sugar.node.zip.unzip", () => {
  it("Should unzip a simple file correctly at the same destination folder", async () => {
    const result = await __unzip(`${__dirname}/data/coffeekraken-new-logo.zip`, {
      dest: __tmpDir() + "/downloads"
    });
    expect(result.dest).toBe(`${__tmpDir()}/downloads/coffeekraken-new-logo`);
  });
});
