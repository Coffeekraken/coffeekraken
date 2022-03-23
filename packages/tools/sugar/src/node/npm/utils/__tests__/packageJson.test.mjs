import {
  __dirname
} from "../../../../../../../chunk-TD77TI6B.mjs";
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
