import "../../../../../../chunk-TD77TI6B.mjs";
import __copy from "../copy";
import __read from "../read";
describe("sugar.node.clipboad", () => {
  it("Should copy and past a text value correctly", async () => {
    const text = "hello world";
    __copy(text);
    expect(text).toBe(__read());
  });
});
