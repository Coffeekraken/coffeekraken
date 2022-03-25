import { fileURLToPath } from "url";
import path from "path";
var getFilename = () => fileURLToPath(import.meta.url);
var getDirname = () => path.dirname(getFilename());
var __dirname = /* @__PURE__ */ getDirname();
var __filename = /* @__PURE__ */ getFilename();
import __packageJson from "../packageJson";
import __packageRoot from "../../../path/packageRoot";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
describe("sugar.node.npm.utils.packageJson", () => {
  it('Should fetch the "chokidar" package.json correctly', async () => {
    await __SSugarConfig.load();
    const json = __packageJson("chokidar", {
      rootDir: __packageRoot(__dirname)
    });
    expect(json.name).toBe("chokidar");
  });
});
