import "../../../../../../chunk-TD77TI6B.mjs";
const __isTestEnv = require("../testEnv");
describe("sugar.node.is.testEnv", () => {
  it("Should return true on the test", (done) => {
    expect(__isTestEnv()).toBe(true);
    done();
  });
});
