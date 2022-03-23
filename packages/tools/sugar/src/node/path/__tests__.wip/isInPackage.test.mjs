import {
  __dirname
} from "../../../../../../chunk-TD77TI6B.mjs";
const __isInPackage = require("../isInPackage");
describe("sugar.node.path.isInPackage", () => {
  it("Should return true when checking if is in @coffeekraken/sugar package", () => {
    expect(__isInPackage("@coffeekraken/sugar", __dirname)).toBe(true);
  });
});
