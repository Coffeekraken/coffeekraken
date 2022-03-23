import {
  __dirname
} from "../../../../../../chunk-TD77TI6B.mjs";
const __packageRoot = require("../packageRoot");
describe("sugar.node.path.packageRoot", () => {
  it("Should return a path when calling it", () => {
    expect(__packageRoot(__dirname).split("/").pop()).toBe("sugar");
    expect(__packageRoot(__dirname, true).split("/").pop()).toBe("coffeekraken");
  });
});
