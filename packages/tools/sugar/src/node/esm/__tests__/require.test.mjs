import "../../../../../../chunk-TD77TI6B.mjs";
import __require from "../require";
describe("sugar.node.esm.require", () => {
  it("Should require correctly the fs package", () => {
    const __fs = __require("fs");
    expect(__fs.readFileSync).not.toBeNull();
  });
});
